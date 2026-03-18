import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, User, ArrowLeft } from 'lucide-react';

interface LoginViewProps {
  emailInput: string;
  setEmailInput: (val: string) => void;
  passwordInput: string;
  setPasswordInput: (val: string) => void;
  handleLogin: (e: React.FormEvent) => void;
  loginError: string | null;
  isLoginLoading: boolean;
}

const LoginView: React.FC<LoginViewProps> = ({
  emailInput,
  setEmailInput,
  passwordInput,
  setPasswordInput,
  handleLogin,
  loginError,
  isLoginLoading
}) => {
  return (
    <div className="min-h-screen bg-navy-darker flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md animate-scaleIn relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-3xl bg-primary/10 mb-6 relative">
            <ShieldCheck className="w-12 h-12 text-primary relative z-10" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
          </div>
          <h1 className="text-3xl font-black text-white mb-2 leading-tight">Admin Portal</h1>
          <p className="text-slate-400 font-medium">Silakan masuk menggunakan akun resmi Anda</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest ml-1">Work Email</label>
            <div className="relative">
              <input
                type="email"
                className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 pl-12 outline-none"
                placeholder="name@gmail.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest ml-1">Secure Password</label>
            <div className="relative">
              <input
                type="password"
                className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 pl-12 outline-none"
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
              />
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            </div>
          </div>

          {loginError && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold animate-shake text-center mb-4">
              {loginError}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoginLoading}
            className="group relative w-full p-4 bg-primary text-navy font-black rounded-2xl hover:translate-y-[-4px] active:translate-y-0 transition-all shadow-xl hover:shadow-primary/30 flex items-center justify-center gap-2 overflow-hidden"
          >
            {isLoginLoading ? (
              <div className="h-5 w-5 border-2 border-navy border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>MASUK DASHBOARD</span>
                <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
          <div className="text-center mt-6">
            <Link to="/" className="text-[10px] uppercase font-black text-slate-500 hover:text-primary transition-colors flex items-center justify-center gap-2 tracking-[0.2em]">
              <ArrowLeft className="w-3 h-3" />
              Kembali ke Beranda
            </Link>
          </div>
        </form>

        <p className="text-center mt-12 text-[10px] text-slate-600 uppercase font-bold tracking-[0.3em]">
          &copy; 2026 PPNH Management System
        </p>
      </div>
    </div>
  );
};

export default LoginView;
