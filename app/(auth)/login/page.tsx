import Link from "next/link";
import LoginForm from "./components/login-form";

const LoginPage = () => {
  return (
    <div className="w-full">
      <header>
        <div className="text-2xl text-main-2 font-bold mb-5">Absensi</div>

        <div>
          <h1 className="font-bold text-lg text-zinc-900">
            Welcome back to Absensi.
          </h1>
          <p className="text-[0.8rem]">
            New here?{" "}
            <Link href="/register" className="text-main-1">
              Create an account
            </Link>
          </p>
        </div>
      </header>
      <main className="mt-6">
        <LoginForm />
      </main>
    </div>
  );
};

export default LoginPage;
