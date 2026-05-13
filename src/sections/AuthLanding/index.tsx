import { AuthActions } from "@/components/auth/AuthActions";

export const AuthLanding = () => {
  return (
    <main className="min-h-screen bg-neutral-900 text-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.18em] text-green-400 font-semibold">
          Welcome
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-white">
          Login or register to open your dashboard
        </h1>
        <p className="mt-4 text-sm text-gray-300 leading-6">
          Mock login works with demo credentials or any fake account you register.
          Demo: demo@betwin.com / 12345678
        </p>
        <div className="mt-8">
          <AuthActions redirectOnSuccess="/dashboard" />
        </div>
      </div>
    </main>
  );
};
