import prisma from "@/libs/prisma";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import {Webhook, WebhookRequiredHeaders} from "svix";

const webhookSecret = process.env.WEBHOOK_SECRET || '';

type EventType = 'user.created' | 'user.updated' | '*';

type Event ={
    data: EventDataType;
    object: 'event';
    type: EventType
}
type EventDataType = {
    id: string;
    first_name: string;
    last_name: string;
    email_addresses: EmailAddressType[];
    primary_email_address_id: string;
    attributes: Record<string, string | number >;
};

type EmailAddressType = {
    id: string;
    email_address: string;
}
async function handler(request: Request){

    const payload = await request.json();
    const headersList = headers();
    const heads = {
        'svix-id': (await headersList).get('svix-id'),
        'svix-timestamp': (await headersList).get('svix-timestamp'),
        'svix-signature': (await headersList).get('svix-signature'),
    };
    const wh = new Webhook(webhookSecret);
    let evt: Event | null = null;
    try{
        evt = wh.verify(
            JSON.stringify(payload),
            heads as IncomingHttpHeaders & WebhookRequiredHeaders
        ) as Event;
    }catch(err)
    {
        console.error((err as Error).message);
        return NextResponse.json({}, {status: 400});
    }
    const eventType: EventType = evt.type;
    if(eventType === 'user.created' || eventType === 'user.updated'){
       const {
        id,
        first_name,
        last_name,
        email_addresses,
        primary_email_address_id,
        ...attributes
       } = 
        evt.data;
        await prisma.user.upsert({
            where: {
                externalId: id as string, // Verifique se `id` é um campo de tipo `string`
            },
            create: {
                externalId: id as string,
                attributes: attributes, // Certifique-se de que `attributes` é um objeto JSON válido
                stripeCustomerId: 'default_stripe_id', // Se necessário, adicione o stripeCustomerId
            },
            update: {
                attributes: attributes, // Atualize os atributos com o objeto JSON
            },
        });
        
    }
    return NextResponse.json({}, {status: 200});
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;