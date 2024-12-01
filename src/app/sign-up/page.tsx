import { SignUp } from "@clerk/nextjs";

type SignUpPageProps = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const resolvedSearchParams = await searchParams; // Resolve a promise, se necessário
  const redirectUrl = resolvedSearchParams.redirectUrl || "/"; // Define um valor padrão

  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <SignUp signInUrl="/sign-in" fallbackRedirectUrl={redirectUrl} />
        </div>
      </div>
    </section>
  );
}
