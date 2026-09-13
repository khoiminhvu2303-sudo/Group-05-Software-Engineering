interface Error403Props {
  onGoBack: () => void;
  userName?: string;
}

export default function Error403Page({ onGoBack, userName }: Error403Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #1d4ed8, transparent)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
      </div>

      <div className="relative text-center max-w-lg">
        {/* 403 number */}
        <div className="relative mb-6">
          <div className="text-[120px] font-black leading-none select-none" style={{
            background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>403</div>
          {/* Lock icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg border border-slate-200 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-5">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          <span className="text-red-700 text-sm font-semibold">Access Denied</span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-3">
          You Don't Have Access
        </h1>
        <p className="text-slate-500 text-base leading-relaxed mb-2">
          This admin page is for <strong className="text-slate-700">Administrators</strong> only.
        </p>
        {userName && (
          <p className="text-slate-400 text-sm mb-6">
            You are signed in as <span className="font-semibold text-slate-600">{userName}</span> (Librarian) — this role is not permitted to access this page.
          </p>
        )}
        {!userName && <p className="text-slate-400 text-sm mb-6">Contact an administrator if you need access.</p>}

        {/* What you can do */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6 text-left shadow-sm">
          <p className="text-sm font-bold text-slate-700 mb-3">What Can You Do?</p>
          <div className="space-y-2">
            {[
              { icon: "📋", text: "Go back to the Librarian Dashboard" },
              { icon: "📚", text: "Process book borrowing and returns" },
              { icon: "✅", text: "Approve reader card requests" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2.5 text-sm text-slate-600">
                <span className="text-base">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button className="btn-primary" style={{ padding: "12px 24px", fontSize: 15 }} onClick={onGoBack}>
            ← Go Back
          </button>
          <button className="btn-secondary" style={{ padding: "12px 24px" }}
            onClick={() => window.location.reload()}>
            Sign In Again
          </button>
        </div>

        <p className="text-slate-400 text-xs mt-8">
          HTTP 403 Forbidden · LibraVN Library Management System
        </p>
      </div>
    </div>
  );
}
