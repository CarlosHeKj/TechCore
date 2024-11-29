import { NextResponse } from 'next/server';
import { stripe } from '@/libs/stripe'; // Certifique-se de que esta importação está configurada corretamente
import { auth } from '@clerk/nextjs/server'; // Para obter o 'userId' do Clerk
import { ProductType } from '@/types/ProductType';
import prisma from '@/libs/prisma'


const calculateOrderAmount = (items: ProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    return acc + (item.price * item.quantity!);
  }, 0);
  return totalPrice;
}

export async function POST(req: Request) {
  try {
    // Autentica o usuário usando Clerk
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { items, payment_intent_id } = await req.json();
    console.log('items', items);

    const total = calculateOrderAmount(items);

    const orderData = {
      userId: parseInt(userId), // Aqui conectamos o `userId` corretamente (assumindo que o `userId` é um string)
      amount: total,
      currency: 'brl',
      status: 'pending',
      paymentIntentID: payment_intent_id,
      products: {
        create: items.map((item: ProductType) => ({
          name: item.name,
          description: item.description,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
      },
    };

    if (payment_intent_id) {
      // Atualizando o Payment Intent se o payment_intent_id já existir
      const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);
      if (current_intent) {
        const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {
          amount: total,
        });

        const [existing_order, updated_order] = await Promise.all([
          prisma.order.findFirst({
            where: {
              paymentIntentID: payment_intent_id,
            },
            include: {
              products: true,
            },
          }),
          prisma.order.update({
            where: {
              paymentIntentID: payment_intent_id,
            },
            data: {
              amount: total,
              products: {
                deleteMany: {},
                create: items.map((item: ProductType) => ({
                  name: item.name,
                  description: item.description,
                  price: item.price,
                  quantity: item.quantity,
                  image: item.image,
                })),
              },
            },
          }),
        ]);

        if (!existing_order) {
          return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ paymentIntent: updated_intent }, { status: 200 });
      }
    } else {
      // Criando um novo Payment Intent se não houver um existente
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'brl',
        automatic_payment_methods: {
          enabled: true,
        },
      });

      orderData.paymentIntentID = paymentIntent.id;

      const newOrder = await prisma.order.create({ data: orderData });

      return NextResponse.json({ paymentIntent }, { status: 200 });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
