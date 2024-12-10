import Link from "next/link";
import RegisterForm from "./components/register-form";

const LoginPage = () => {
  return (
    <div className="w-full">
      <header>
        <div className="text-2xl text-main-2 font-bold mb-5">Absensi</div>

        <div>
          <h1 className="font-bold text-lg text-zinc-900">
            Register to Absensi.
          </h1>
          <p className="text-[0.8rem]">
            Already have an account?{" "}
            <Link href="/login" className="text-main-1">
              Login
            </Link>
          </p>
        </div>
      </header>
      <main className="mt-6">
        <RegisterForm />
      </main>
    </div>
  );
};

export default LoginPage;
