import { useState } from "react";
import PortalPage from "./pages/PortalPage";
import LibrarianPage from "./pages/LibrarianPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import Error403Page from "./pages/Error403Page";

type Subsystem = "portal" | "librarian" | "admin";
type Role = "staff" | "admin";

interface AuthState {
  loggedIn: boolean;
  role: Role | null;
  name: string;
}

export interface StaffPortalUser {
  name: string;
  cardId: string;
  initials: string;
  role: Role;
  email: string;
}

const STAFF_PORTAL_USERS: Record<Role, StaffPortalUser> = {
  staff: { name: "Tran Van Lam", cardId: "DR-STAFF-001", initials: "VL", role: "staff", email: "lam.tran@library.vn" },
  admin: { name: "Pham Trung Kien", cardId: "DR-ADMIN-001", initials: "TK", role: "admin", email: "kien.pham@library.vn" },
};

export default function App() {
  const [subsystem, setSubsystem] = useState<Subsystem>("portal");
  const [auth, setAuth] = useState<AuthState>({ loggedIn: false, role: null, name: "" });
  const [show403, setShow403] = useState(false);
  const [librarianInitView, setLibrarianInitView] = useState<import("./pages/LibrarianPage").LibView | undefined>(undefined);

  const handleLogin = (role: Role, _username: string) => {
    const name = role === "staff" ? "Tran Van Lam" : "Pham Trung Kien";
    setAuth({ loggedIn: true, role, name });
    setSubsystem(role === "admin" ? "admin" : "librarian");
    setShow403(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("library_access_token");
    setAuth({ loggedIn: false, role: null, name: "" });
    setSubsystem("portal");
    setShow403(false);
  };

  const handleSwitchSubsystem = (target: Subsystem) => {
    if (target === "admin" && auth.role !== "admin") {
      setShow403(true);
      return;
    }
    setShow403(false);
    setSubsystem(target);
  };

  const needsLogin = (subsystem === "librarian" || subsystem === "admin") && !auth.loggedIn;

  if (needsLogin) {
    return <LoginPage onLogin={handleLogin} onBackToPortal={() => setSubsystem("portal")} />;
  }

  if (show403) {
    return <Error403Page onGoBack={() => { setShow403(false); setSubsystem("librarian"); }} userName={auth.name} />;
  }

  // Tabs visible based on auth role:
  // - unauthenticated / reader → only portal
  // - staff → portal + librarian + locked admin
  // - admin → all 3
  const ALL_TABS = [
    { key: "portal"    as Subsystem, label: "Reader Portal",        icon: "🌐", desc: "Web/Mobile",  adminOnly: false },
    { key: "librarian" as Subsystem, label: "Librarian Dashboard",  icon: "📋", desc: "Front Desk",   adminOnly: false },
    { key: "admin"     as Subsystem, label: "System Administration",icon: "⚙️", desc: "Admin",        adminOnly: true  },
  ];

  const visibleTabs = auth.loggedIn ? ALL_TABS : ALL_TABS.filter(s => s.key === "portal");
  const activeIdx = visibleTabs.findIndex(s => s.key === subsystem && !show403);
  const tabWidthPct = 100 / visibleTabs.length;

  // staffUser: non-null when a staff/admin is logged in (used by PortalPage to load their reader data)
  const staffUser: StaffPortalUser | null = auth.loggedIn && auth.role ? STAFF_PORTAL_USERS[auth.role] : null;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-100">
      {/* Top navigation bar */}
      <header className="flex-shrink-0 bg-[#0f172a] border-b border-slate-800">
        <div className="flex items-center h-12 px-4 gap-0">
          {/* Brand */}
          <div className="flex items-center gap-2.5 pr-6 border-r border-slate-700 mr-4 flex-shrink-0">
            <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </div>
            <span className="text-white font-bold text-sm tracking-tight">LibraVN</span>
          </div>

          {/* Subsystem tabs — only role-appropriate ones */}
          <div className="flex items-center gap-1">
            {visibleTabs.map((s) => (
              <button
                key={s.key}
                onClick={() => handleSwitchSubsystem(s.key)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  subsystem === s.key && !show403
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <span>{s.icon}</span>
                <span className="hidden sm:inline">{s.label}</span>
                <span className={`text-xs font-normal hidden lg:inline ${subsystem === s.key ? "text-blue-200" : "text-slate-600"}`}>· {s.desc}</span>
                {s.adminOnly && auth.role !== "admin" && (
                  <span className="text-slate-600 text-xs">🔒</span>
                )}
              </button>
            ))}
          </div>

          {/* Right: auth status */}
          <div className="ml-auto flex items-center gap-3">
            {auth.loggedIn ? (
              <>
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${auth.role === "admin" ? "bg-violet-600" : "bg-indigo-600"}`}>
                    {auth.name.split(" ").pop()?.charAt(0)}
                  </div>
                  <div className="hidden md:block">
                    <p className="text-slate-200 text-xs font-semibold leading-tight">{auth.name}</p>
                    <p className="text-slate-500 text-xs">{auth.role === "admin" ? "Administrator" : "Librarian"}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-slate-500 hover:text-slate-300 text-xs border border-slate-700 rounded-md px-2 py-1 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                <span className="text-slate-400 text-xs hidden md:inline">System running normally</span>
                <button
                  onClick={() => setSubsystem("librarian")}
                  className="text-slate-400 hover:text-slate-200 text-xs border border-slate-700 rounded-md px-2.5 py-1 transition-colors ml-2"
                >
                  Staff Login
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Active indicator strip — adapts to number of visible tabs */}
        <div className="h-0.5 bg-slate-800 relative">
          {activeIdx >= 0 && (
            <div
              className={`absolute top-0 h-full transition-all duration-300 ${
                subsystem === "admin" ? "bg-violet-500" : subsystem === "librarian" ? "bg-indigo-500" : "bg-blue-500"
              }`}
              style={{ width: `${tabWidthPct}%`, left: `${activeIdx * tabWidthPct}%` }}
            />
          )}
        </div>
      </header>

      {/* Subsystem content — PortalPage stays mounted to preserve reader session state */}
      <div className="flex-1 overflow-hidden relative">
        <div className={`absolute inset-0 ${subsystem === "portal" ? "" : "hidden"}`}>
          <PortalPage staffUser={staffUser} />
        </div>
        {subsystem === "librarian" && auth.loggedIn && <LibrarianPage initialView={librarianInitView} onViewConsumed={() => setLibrarianInitView(undefined)} staffName={auth.name} staffRole={auth.role ?? undefined} />}
        {subsystem === "admin" && auth.loggedIn && auth.role === "admin" && <AdminPage onNavigateToCatalog={() => { setLibrarianInitView("catalog"); setSubsystem("librarian"); }} />}
      </div>
    </div>
  );
}
