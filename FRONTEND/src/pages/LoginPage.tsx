import { useState } from "react";
import { api } from "../service/apis";

type Role = "staff" | "admin";

interface LoginPageProps {
  onLogin: (role: Role, username: string) => void;
  onBackToPortal?: () => void;
}

export default function LoginPage({ onLogin, onBackToPortal }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post<{
        success: boolean;
        message: string;
        data: { token: string; username: string; role: string };
      }>("/auth/login", { username: email.trim(), password });
      const { token, username, role } = response.data.data;
      localStorage.setItem("library_access_token", token);
      const normalizedRole = role?.replace("ROLE_", "").toLowerCase();
      if (normalizedRole !== "staff" && normalizedRole !== "admin") {
        throw new Error("This account does not have staff access.");
      }
      onLogin(normalizedRole, username);
    } catch (requestError) {
      const message = requestError instanceof Error
        ? requestError.message
        : "Incorrect username or password. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%)" }}>
      {/* Left — branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #60a5fa, transparent)" }} />
        <div className="absolute -bottom-32 -right-16 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #818cf8, transparent)" }} />

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
          </div>
          <span className="text-white text-xl font-bold tracking-tight">LibraVN</span>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Modern Library<br />Management System
          </h1>
          <p className="text-blue-200 text-lg leading-relaxed mb-8">
            A comprehensive digital platform for library management — from borrowing and returns to collection management and real-time analytics.
          </p>
          <div className="space-y-3">
            {[
              { icon: "📚", text: "Online book catalog management" },
              { icon: "🔄", text: "Fast borrow and return processing at the front desk" },
              { icon: "📊", text: "Real-time visual analytics and reports" },
              { icon: "🔐", text: "Role-based access control" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-blue-100 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-blue-400 text-xs relative z-10">© 2026 LibraVN · Library Management System</p>
      </div>

      {/* Right — login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header strip */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <div className="lg:hidden flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                </div>
                <span className="text-white font-bold">LibraVN</span>
              </div>
              <h2 className="text-white text-xl font-bold">Sign In</h2>
              <p className="text-blue-200 text-sm mt-1">For Staff & Administrators</p>
            </div>

            <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </span>
                  <input className="input-field pl-10" type="email" placeholder="email@library.vn" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </span>
                  <input className="input-field pl-10 pr-10" type={showPass ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" onClick={() => setShowPass(!showPass)}>
                    {showPass
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full justify-center" style={{ padding: "12px", fontSize: 15 }} disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    Signing in...
                  </span>
                ) : "Sign In"}
              </button>

              {/* Demo accounts */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500 mb-2 font-semibold">Demo accounts:</p>
                <div className="space-y-1.5">
                  {[
                    { email: "thuthu@library.vn", label: "Librarian", color: "bg-indigo-50 border-indigo-200 text-indigo-700" },
                    { email: "admin@library.vn", label: "Administrator", color: "bg-violet-50 border-violet-200 text-violet-700" },
                  ].map((acc) => (
                    <button key={acc.email} type="button"
                      className={`w-full text-left px-3 py-2 rounded-lg border text-xs font-medium transition-colors hover:opacity-80 ${acc.color}`}
                      onClick={() => { setEmail(acc.email); setPassword("123456"); }}>
                      <span className="font-bold">{acc.label}</span> — {acc.email} / 123456
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>

          {onBackToPortal && (
            <button onClick={onBackToPortal} className="mt-4 flex items-center gap-1.5 text-blue-300 hover:text-blue-100 text-sm transition-colors mx-auto">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              Back to Main Screen
            </button>
          )}
          <p className="text-center text-blue-300 text-xs mt-4">This system is for authorized staff only</p>
        </div>
      </div>
    </div>
  );
}
