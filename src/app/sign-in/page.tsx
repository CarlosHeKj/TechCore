import { SignIn } from "@clerk/nextjs";

type SignInPageProps = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const resolvedSearchParams = await searchParams; // Resolve a promise, se necessário
  const redirectUrl = resolvedSearchParams.redirectUrl || "/"; // Define um valor padrão

  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <SignIn signUpUrl="/sign-up" fallbackRedirectUrl={redirectUrl} />
        </div>
      </div>
    </section>
  );
}
