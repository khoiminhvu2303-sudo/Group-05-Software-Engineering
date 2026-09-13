import { useState, useEffect, type ReactNode } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";

type AdminView = "dashboard" | "staff" | "readers" | "reports";

const borrowData = [
  { month: "Mar", muon: 138, tra: 125 },
  { month: "Apr", muon: 151, tra: 143 },
  { month: "May", muon: 163, tra: 158 },
  { month: "Jun", muon: 174, tra: 169 },
  { month: "Jul", muon: 158, tra: 152 },
  { month: "Aug", muon: 172, tra: 165 },
];

const fineData = [
  { month: "Mar", tienPhat: 380000 },
  { month: "Apr", tienPhat: 520000 },
  { month: "May", tienPhat: 710000 },
  { month: "Jun", tienPhat: 890000 },
  { month: "Jul", tienPhat: 640000 },
  { month: "Aug", tienPhat: 820000 },
];

const genreData = [
  { name: "Life Skills", value: 287, color: "#1d4ed8" },
  { name: "Fiction", value: 198, color: "#7c3aed" },
  { name: "History", value: 143, color: "#0891b2" },
  { name: "Education", value: 187, color: "#059669" },
  { name: "Technology", value: 118, color: "#d97706" },
  { name: "Economics", value: 76, color: "#dc2626" },
];

const OVERDUE_LIST = [
  { reader: "Le Van Binh", readerCode: "DR-2022-0089", book: "Người Đua Diều", dueDate: "10/08/2026", daysLate: 16, fine: 32000 },
  { reader: "Tran Thi Cuc", readerCode: "DR-2023-0201", book: "Rừng Na-Uy", dueDate: "15/08/2026", daysLate: 11, fine: 72000 },
  { reader: "Nguyen Duc Tuan", readerCode: "DR-2021-0055", book: "Homo Deus", dueDate: "05/08/2026", daysLate: 21, fine: 42000 },
  { reader: "Pham Hai Yen", readerCode: "DR-2024-0302", book: "Thép Đã Tôi Thế Đấy", dueDate: "18/08/2026", daysLate: 8, fine: 16000 },
];

const PENDING_REQUESTS = [
  { name: "Tran Minh Khoa", initials: "MK", type: "Book Reservation", timeAgo: "5 minutes ago" },
  { name: "Pham Thi Lan", initials: "TL", type: "Renewal", timeAgo: "18 minutes ago" },
  { name: "Nguyen Duc Nam", initials: "DN", type: "Book Suggestion", timeAgo: "1 hour ago" },
  { name: "Le Van Binh", initials: "VB", type: "Book Reservation", timeAgo: "2 hours ago" },
];

const STAFF_LIST_INIT = [
  { id: "NV001", name: "Tran Van Lam", email: "lam.tran@library.vn", role: "Librarian", department: "Checkout Counter", status: "Active", lastLogin: "26/08/2026" },
  { id: "NV002", name: "Nguyen Thi Mai", email: "mai.nguyen@library.vn", role: "Librarian", department: "Book Classification", status: "Active", lastLogin: "25/08/2026" },
  { id: "NV003", name: "Pham Trung Kien", email: "kien.pham@library.vn", role: "Administrator", department: "IT & Systems", status: "Active", lastLogin: "26/08/2026" },
  { id: "NV004", name: "Le Thi Huong", email: "huong.le@library.vn", role: "Librarian", department: "Checkout Counter", status: "Locked", lastLogin: "10/08/2026" },
];

const READER_LIST_INIT = [
  { id: "DR-2024-0142", name: "Nguyen Thi An", email: "an.nguyen@email.com", borrowing: 2, overdue: 0, status: "Active", joinDate: "01/01/2024" },
  { id: "DR-2022-0089", name: "Le Van Binh", email: "binh.le@email.com", borrowing: 3, overdue: 1, status: "Active", joinDate: "15/03/2022" },
  { id: "DR-2023-0201", name: "Tran Thi Cuc", email: "cuc.tran@email.com", borrowing: 2, overdue: 1, status: "Active", joinDate: "20/07/2023" },
  { id: "DR-2021-0055", name: "Nguyen Duc Tuan", email: "tuan.nd@email.com", borrowing: 1, overdue: 1, status: "Locked", joinDate: "05/01/2021" },
  { id: "DR-2024-0302", name: "Pham Hai Yen", email: "yen.ph@email.com", borrowing: 1, overdue: 1, status: "Active", joinDate: "10/06/2024" },
];

const READER_BORROW_HISTORY: Record<string, { book: string; borrowDate: string; returnDate: string; status: string }[]> = {
  "DR-2024-0142": [
    { book: "Đắc Nhân Tâm", borrowDate: "01/08/2026", returnDate: "15/08/2026", status: "Returned" },
    { book: "Tư Duy Nhanh và Chậm", borrowDate: "10/08/2026", returnDate: "—", status: "Borrowing" },
  ],
  "DR-2022-0089": [
    { book: "Người Đua Diều", borrowDate: "20/07/2026", returnDate: "—", status: "Overdue" },
    { book: "Nhà Giả Kim", borrowDate: "05/08/2026", returnDate: "—", status: "Borrowing" },
    { book: "Sapiens", borrowDate: "01/07/2026", returnDate: "20/07/2026", status: "Returned" },
  ],
  "DR-2023-0201": [
    { book: "Rừng Na-Uy", borrowDate: "05/08/2026", returnDate: "—", status: "Overdue" },
    { book: "Kafka Bên Bờ Biển", borrowDate: "12/08/2026", returnDate: "—", status: "Borrowing" },
  ],
  "DR-2021-0055": [
    { book: "Homo Deus", borrowDate: "01/08/2026", returnDate: "—", status: "Overdue" },
  ],
  "DR-2024-0302": [
    { book: "Thép Đã Tôi Thế Đấy", borrowDate: "10/08/2026", returnDate: "—", status: "Overdue" },
  ],
};

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div
      className="fixed bottom-6 left-1/2 z-50 flex items-center gap-3 px-5 py-3 bg-green-600 text-white text-sm font-semibold rounded-xl shadow-xl"
      style={{ transform: "translateX(-50%)" }}
    >
      <span>✅</span>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">✕</button>
    </div>
  );
}

// ─── Modal wrapper ────────────────────────────────────────────────────────────
function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center"
      style={{ background: "rgba(15,23,42,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

// ─── StatCard ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, trend, trendUp, color, icon }: {
  label: string; value: string; trend: string; trendUp: boolean; color: string; icon: string;
}) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${color}`}>{icon}</div>
      </div>
      <p className="text-2xl font-bold text-slate-900 mb-1">{value}</p>
      <p className={`text-xs font-semibold ${trendUp ? "text-green-600" : "text-red-600"}`}>{trend}</p>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ onNavigateToCatalog }: { onNavigateToCatalog?: () => void }) {
  const [approvedReqs, setApprovedReqs] = useState<string[]>([]);
  const [approveToast, setApproveToast] = useState<string | null>(null);

  const handleApprove = (name: string) => {
    setApprovedReqs(p => [...p, name]);
    setApproveToast(`Request from ${name} approved successfully`);
    setTimeout(() => setApproveToast(null), 4000);
  };

  const pendingCount = PENDING_REQUESTS.filter(r => !approvedReqs.includes(r.name)).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Overview Dashboard</h1>
        <p className="text-slate-500 text-sm">August 2026 · Library Management System</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Books" value="1.567" trend="+3.2% vs. last month" trendUp={true} color="bg-blue-50" icon="📚" />
        <StatCard label="Active Readers" value="369" trend="+5.1% vs. last month" trendUp={true} color="bg-violet-50" icon="👥" />
        <StatCard label="Currently Borrowed" value="172" trend="+8.9% vs. last month" trendUp={true} color="bg-teal-50" icon="📖" />
        <StatCard label="Pending Actions" value="4" trend="-20% vs. last month" trendUp={false} color="bg-red-50" icon="🔔" />
      </div>

      {/* Charts row + Book Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Borrow/Return trend */}
        <div className="card p-5 lg:col-span-2">
          <h3 className="font-bold text-slate-800 mb-1">Borrow / Return Statistics (Last 6 Months)</h3>
          <p className="text-xs text-slate-400 mb-4">Monthly borrow and return activity</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={borrowData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="colorMuon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorTra" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13 }} />
              <Legend wrapperStyle={{ fontSize: 13 }} />
              <Area type="monotone" dataKey="muon" name="Borrows" stroke="#1d4ed8" strokeWidth={2.5} fill="url(#colorMuon)" dot={{ r: 3, fill: "#1d4ed8" }} />
              <Area type="monotone" dataKey="tra" name="Returns" stroke="#059669" strokeWidth={2.5} fill="url(#colorTra)" dot={{ r: 3, fill: "#059669" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Book Inventory Status */}
        <div className="rounded-2xl p-5 flex flex-col" style={{ background: "#0f5c4a" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white text-sm">Today's Update</h3>
            <span className="text-white text-opacity-60 text-xs opacity-70">29/08/2026</span>
          </div>
          <p className="text-white text-lg font-bold mb-5">Book Inventory Status</p>

          <div className="space-y-4 flex-1">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-white text-sm font-medium">Available</span>
                <span className="text-white font-bold text-sm">86%</span>
              </div>
              <div className="w-full rounded-full h-2" style={{ background: "rgba(255,255,255,0.2)" }}>
                <div className="h-2 rounded-full bg-green-400" style={{ width: "86%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-white text-sm font-medium">Currently Borrowed</span>
                <span className="text-white font-bold text-sm">11%</span>
              </div>
              <div className="w-full rounded-full h-2" style={{ background: "rgba(255,255,255,0.2)" }}>
                <div className="h-2 rounded-full bg-amber-400" style={{ width: "11%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-white text-sm font-medium">Needs Inventory Check</span>
                <span className="text-white font-bold text-sm">3%</span>
              </div>
              <div className="w-full rounded-full h-2" style={{ background: "rgba(255,255,255,0.2)" }}>
                <div className="h-2 rounded-full bg-red-400" style={{ width: "3%" }} />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
            <button className="text-green-300 text-sm font-semibold hover:text-white transition-colors" onClick={onNavigateToCatalog}>
              Manage Book Inventory →
            </button>
          </div>
        </div>
      </div>

      {/* Fine revenue + Pending requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <h3 className="font-bold text-slate-800 mb-1">Fine Revenue</h3>
          <p className="text-xs text-slate-400 mb-4">Last 6 months (VND)</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={fineData} margin={{ top: 0, right: 5, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} formatter={(v) => [`${Number(v).toLocaleString()}đ`, "Fines"]} />
              <Bar dataKey="tienPhat" name="Fines" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Requests Pending Today */}
        <div className="card overflow-hidden">
          {approveToast && (
            <div className="fixed top-16 right-4 z-50 bg-blue-700 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-2xl">
              ✓ {approveToast}
            </div>
          )}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Requests Pending Today</h3>
            <span className="badge badge-red">{pendingCount} requests</span>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: 220 }}>
            {PENDING_REQUESTS.map((item, i) => {
              const isApproved = approvedReqs.includes(item.name);
              return (
                <div key={i} className={`flex items-center gap-3 px-4 py-3 border-b border-slate-50 hover:bg-slate-50 ${isApproved ? "opacity-60" : ""}`}>
                  <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {item.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.type} · {item.timeAgo}</p>
                  </div>
                  {isApproved ? (
                    <span className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-green-100 text-green-700 border border-green-300">
                      ✓ Approved
                    </span>
                  ) : (
                    <button
                      className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-80"
                      style={{ background: "#0f5c4a" }}
                      onClick={() => handleApprove(item.name)}
                    >
                      Approve
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="pb-10" />
    </div>
  );
}

// ─── StaffManagement ──────────────────────────────────────────────────────────
function StaffManagement({ showToast }: { showToast: (msg: string) => void }) {
  const [staff, setStaff] = useState(STAFF_LIST_INIT);
  const [showAdd, setShowAdd] = useState(false);
  const [newForm, setNewForm] = useState({ name: "", email: "", department: "", role: "Librarian" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Edit modal state
  const [editTarget, setEditTarget] = useState<typeof STAFF_LIST_INIT[0] | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", department: "", role: "Librarian", status: "Active" });

  // Lock modal state
  const [lockTarget, setLockTarget] = useState<typeof STAFF_LIST_INIT[0] | null>(null);
  const [lockReason, setLockReason] = useState("");

  // Delete modal state (step 1: reason, step 2: confirm)
  const [deleteTarget, setDeleteTarget] = useState<typeof STAFF_LIST_INIT[0] | null>(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [deleteStep, setDeleteStep] = useState<1 | 2>(1);
  const [deleteCountdown, setDeleteCountdown] = useState(5);

  useEffect(() => {
    if (deleteTarget && deleteStep === 2) {
      setDeleteCountdown(5);
      const iv = setInterval(() => setDeleteCountdown(c => { if (c <= 1) { clearInterval(iv); return 0; } return c - 1; }), 1000);
      return () => clearInterval(iv);
    }
  }, [deleteTarget?.id, deleteStep]);

  const openEdit = (s: typeof STAFF_LIST_INIT[0]) => {
    setEditTarget(s);
    setEditForm({ name: s.name, email: s.email, department: s.department, role: s.role, status: s.status });
  };

  const saveEdit = () => {
    if (!editTarget) return;
    setStaff(staff.map(s => s.id === editTarget.id ? { ...s, ...editForm } : s));
    setEditTarget(null);
    showToast("Changes saved successfully!");
  };

  const openLock = (s: typeof STAFF_LIST_INIT[0]) => {
    setLockTarget(s);
    setLockReason("");
  };

  const confirmLock = () => {
    if (!lockTarget) return;
    setStaff(staff.map(s => s.id === lockTarget.id ? { ...s, status: "Locked" } : s));
    setLockTarget(null);
    showToast("Account locked successfully!");
  };

  const openDelete = (s: typeof STAFF_LIST_INIT[0]) => {
    setDeleteTarget(s);
    setDeleteReason("");
    setDeleteStep(1);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setStaff(staff.filter(s => s.id !== deleteTarget.id));
    setDeleteTarget(null);
    showToast("Account permanently deleted!");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Staff Account Management</h1>
          <p className="text-slate-500 text-sm">Grant permissions and assign roles to library staff</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAdd(true)}>+ Add Staff</button>
      </div>

      {showAdd && (
        <div className="card p-5 mb-5 border-blue-200 ring-2 ring-blue-100">
          <h3 className="font-bold text-slate-800 mb-4">Add Staff Account</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name <span className="text-red-500">*</span></label>
              <input className="input-field" placeholder="Nguyen Van X" value={newForm.name} onChange={e => { setNewForm(f => ({ ...f, name: e.target.value })); setFormErrors(err => ({ ...err, name: "" })); }} />
              {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email <span className="text-red-500">*</span></label>
              <input className="input-field" type="email" placeholder="email@library.vn" value={newForm.email} onChange={e => { setNewForm(f => ({ ...f, email: e.target.value })); setFormErrors(err => ({ ...err, email: "" })); }} />
              {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Department <span className="text-red-500">*</span></label>
              <input className="input-field" placeholder="Checkout Counter" value={newForm.department} onChange={e => { setNewForm(f => ({ ...f, department: e.target.value })); setFormErrors(err => ({ ...err, department: "" })); }} />
              {formErrors.department && <p className="text-red-500 text-xs mt-1">{formErrors.department}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Role</label>
              <select className="input-field" value={newForm.role} onChange={e => setNewForm(f => ({ ...f, role: e.target.value }))}>
                <option>Librarian</option>
                <option>Administrator</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn-primary" onClick={() => {
              const errors: Record<string, string> = {};
              if (!newForm.name.trim()) errors.name = "Please fill in all required information";
              if (!newForm.email.trim()) errors.email = "Please fill in all required information";
              if (!newForm.department.trim()) errors.department = "Please fill in all required information";
              if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
              const nextId = `NV${String(staff.length + 1).padStart(3, "0")}`;
              setStaff(prev => [...prev, { id: nextId, name: newForm.name.trim(), email: newForm.email.trim(), role: newForm.role, department: newForm.department.trim(), status: "Active", lastLogin: "Just now" }]);
              showToast(`✅ Account created successfully for ${newForm.name.trim()}!`);
              setNewForm({ name: "", email: "", department: "", role: "Librarian" });
              setFormErrors({});
              setShowAdd(false);
            }}>Create Account</button>
            <button className="btn-secondary" onClick={() => { setNewForm({ name: "", email: "", department: "", role: "Librarian" }); setFormErrors({}); setShowAdd(false); }}>Cancel</button>
          </div>
        </div>
      )}

      <div className="card overflow-hidden">
        <table>
          <thead>
            <tr>
              <th>Staff ID</th><th>Full Name</th><th>Email</th><th>Role</th><th>Department</th>
              <th>Status</th><th>Last Login</th><th style={{ textAlign: "center", width: "160px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr key={s.id}>
                <td className="font-mono text-xs text-blue-600">{s.id}</td>
                <td className="font-semibold">{s.name}</td>
                <td className="text-slate-500 text-sm">{s.email}</td>
                <td><span className={`badge ${s.role === "Administrator" ? "badge-blue" : "badge-gray"}`}>{s.role}</span></td>
                <td>{s.department}</td>
                <td><span className={`badge ${s.status === "Active" ? "badge-green" : "badge-red"}`}>{s.status}</span></td>
                <td className="text-slate-500 text-sm">{s.lastLogin}</td>
                <td style={{ textAlign: "center" }}>
                  <div className="inline-flex gap-1">
                    <button className="btn-secondary" style={{ fontSize: 12, padding: "4px 10px" }} onClick={() => openEdit(s)}>Edit</button>
                    <button
                      className={s.status === "Active" ? "btn-danger" : "btn-success"}
                      style={{ fontSize: 12, padding: "4px 10px" }}
                      onClick={() => {
                        if (s.status === "Active") openLock(s);
                        else {
                          setStaff(staff.map(x => x.id === s.id ? { ...x, status: "Active" } : x));
                          showToast("Account unlocked successfully!");
                        }
                      }}
                    >
                      {s.status === "Active" ? "Lock" : "Unlock"}
                    </button>
                    <button
                      style={{ fontSize: 12, padding: "4px 10px", background: "#fee2e2", color: "#b91c1c", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}
                      onClick={() => openDelete(s)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editTarget && (
        <Modal onClose={() => setEditTarget(null)}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Edit Staff Information</h3>
            <button onClick={() => setEditTarget(null)} className="text-slate-400 hover:text-slate-700 text-lg font-bold">✕</button>
          </div>
          <div className="p-6 space-y-4">
            {[
              { label: "Full Name", key: "name" as const, type: "text" },
              { label: "Email", key: "email" as const, type: "email" },
              { label: "Department", key: "department" as const, type: "text" },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>
                <input
                  className="input-field w-full"
                  type={type}
                  value={editForm[key]}
                  onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Role</label>
              <select className="input-field w-full" value={editForm.role} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}>
                <option>Librarian</option>
                <option>Administrator</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
              <select className="input-field w-full" value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}>
                <option>Active</option>
                <option>Locked</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 px-6 pb-6 justify-end">
            <button className="btn-secondary" onClick={() => setEditTarget(null)}>Cancel</button>
            <button className="btn-primary" onClick={saveEdit}>Save Changes</button>
          </div>
        </Modal>
      )}

      {/* Lock Modal */}
      {lockTarget && (
        <Modal onClose={() => setLockTarget(null)}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Confirm Account Lock</h3>
            <button onClick={() => setLockTarget(null)} className="text-slate-400 hover:text-slate-700 text-lg font-bold">✕</button>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-600 mb-4">
              You are locking the account of <span className="font-semibold text-slate-900">{lockTarget.name}</span>. This staff member will not be able to log in until unlocked.
            </p>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Reason for locking <span className="text-red-500">*</span></label>
            <textarea className="input-field w-full" rows={2} placeholder="Enter reason for locking account..." value={lockReason} onChange={(e) => setLockReason(e.target.value)} />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {["Policy violation", "Account suspected compromised", "Personal request", "Other"].map(tag => (
                <button key={tag} type="button" onClick={() => setLockReason(tag)}
                  className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${lockReason === tag ? "bg-red-100 border-red-400 text-red-700" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-600"}`}>{tag}</button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 px-6 pb-6 justify-end">
            <button className="btn-secondary" onClick={() => setLockTarget(null)}>Cancel</button>
            <button disabled={!lockReason.trim()} onClick={confirmLock}
              style={{ fontSize: 13, padding: "7px 18px", borderRadius: 8, border: "none", cursor: lockReason.trim() ? "pointer" : "not-allowed", background: lockReason.trim() ? "#dc2626" : "#fca5a5", color: "white", fontWeight: 700 }}>
              Confirm Lock
            </button>
          </div>
        </Modal>
      )}

      {/* Delete Modal Step 1 */}
      {deleteTarget && deleteStep === 1 && (
        <Modal onClose={() => setDeleteTarget(null)}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Delete Staff Account</h3>
            <button onClick={() => setDeleteTarget(null)} className="text-slate-400 hover:text-slate-700 text-lg font-bold">✕</button>
          </div>
          <div className="p-6">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Reason for deletion <span className="text-red-500">*</span></label>
            <textarea className="input-field w-full" rows={2} placeholder="Enter reason for account deletion..." value={deleteReason} onChange={(e) => setDeleteReason(e.target.value)} />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {["Member resigned / Graduated", "Duplicate / Ghost account", "Serious policy violation", "Other"].map(tag => (
                <button key={tag} type="button" onClick={() => setDeleteReason(tag)}
                  className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${deleteReason === tag ? "bg-red-100 border-red-400 text-red-700" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-600"}`}>{tag}</button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 px-6 pb-6 justify-end">
            <button className="btn-secondary" onClick={() => setDeleteTarget(null)}>Cancel</button>
            <button disabled={!deleteReason.trim()} onClick={() => setDeleteStep(2)}
              style={{ fontSize: 13, padding: "7px 18px", borderRadius: 8, border: "none", cursor: deleteReason.trim() ? "pointer" : "not-allowed", background: deleteReason.trim() ? "#dc2626" : "#fca5a5", color: "white", fontWeight: 700 }}>
              Next
            </button>
          </div>
        </Modal>
      )}

      {/* Delete Modal Step 2 — countdown */}
      {deleteTarget && deleteStep === 2 && (
        <Modal onClose={() => setDeleteTarget(null)}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 className="font-bold text-red-700">Confirm Permanent Deletion</h3>
            <button onClick={() => setDeleteTarget(null)} className="text-slate-400 hover:text-slate-700 text-lg font-bold">✕</button>
          </div>
          <div className="p-6 text-center">
            <div className="text-4xl mb-3">⚠️</div>
            <p className="text-slate-800 font-semibold mb-2">Are you sure you want to permanently delete the account of <span className="text-red-600">{deleteTarget.name}</span>?</p>
            <p className="text-sm text-slate-500">This action cannot be undone. All associated data will be deleted.</p>
          </div>
          <div className="flex gap-3 px-6 pb-6 justify-center">
            <button className="btn-secondary" onClick={() => setDeleteStep(1)}>Back</button>
            <button disabled={deleteCountdown > 0} onClick={confirmDelete}
              style={{ fontSize: 13, padding: "7px 18px", borderRadius: 8, border: "none", cursor: deleteCountdown === 0 ? "pointer" : "not-allowed", background: deleteCountdown === 0 ? "#dc2626" : "#fca5a5", color: "white", fontWeight: 700 }}>
              Delete Permanently{deleteCountdown > 0 ? ` (${deleteCountdown}s)` : ""}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── ReaderManagement ─────────────────────────────────────────────────────────
function ReaderManagement({ showToast }: { showToast: (msg: string) => void }) {
  const [readers, setReaders] = useState(READER_LIST_INIT);

  // Detail modal
  const [detailTarget, setDetailTarget] = useState<typeof READER_LIST_INIT[0] | null>(null);

  // Lock modal
  const [lockTarget, setLockTarget] = useState<typeof READER_LIST_INIT[0] | null>(null);
  const [lockReason, setLockReason] = useState("");

  // Delete modal
  const [deleteTarget, setDeleteTarget] = useState<typeof READER_LIST_INIT[0] | null>(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [deleteStep, setDeleteStep] = useState<1 | 2>(1);
  const [deleteCountdown, setDeleteCountdown] = useState(5);

  useEffect(() => {
    if (deleteTarget && deleteStep === 2) {
      setDeleteCountdown(5);
      const iv = setInterval(() => setDeleteCountdown(c => { if (c <= 1) { clearInterval(iv); return 0; } return c - 1; }), 1000);
      return () => clearInterval(iv);
    }
  }, [deleteTarget?.id, deleteStep]);

  const openLock = (r: typeof READER_LIST_INIT[0]) => {
    setLockTarget(r);
    setLockReason("");
  };

  const confirmLock = () => {
    if (!lockTarget) return;
    setReaders(readers.map(r => r.id === lockTarget.id ? { ...r, status: "Locked" } : r));
    setLockTarget(null);
    showToast("Account locked successfully!");
  };

  const openDelete = (r: typeof READER_LIST_INIT[0]) => {
    setDeleteTarget(r);
    setDeleteReason("");
    setDeleteStep(1);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setReaders(readers.filter(r => r.id !== deleteTarget.id));
    setDeleteTarget(null);
    showToast("Account permanently deleted!");
  };

  const totalFine = (id: string) => {
    const overdueFine = OVERDUE_LIST.find(o => o.readerCode === id);
    return overdueFine ? overdueFine.fine : 0;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Reader Account Management</h1>
          <p className="text-slate-500 text-sm">View, lock/unlock reader accounts</p>
        </div>
        <div className="flex gap-2">
          <input className="input-field w-60" placeholder="Search readers..." />
        </div>
      </div>

      <div className="card overflow-hidden">
        <table>
          <thead>
            <tr>
              <th>Card ID</th><th>Full Name</th><th>Email</th><th>Borrowing</th><th>Overdue</th>
              <th>Status</th><th>Join Date</th><th style={{ textAlign: "center", width: "160px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {readers.map((r) => (
              <tr key={r.id}>
                <td className="font-mono text-xs text-blue-600">{r.id}</td>
                <td className="font-semibold">{r.name}</td>
                <td className="text-slate-500 text-sm">{r.email}</td>
                <td className="text-center">{r.borrowing}</td>
                <td className="text-center">{r.overdue > 0 ? <span className="text-red-600 font-bold">{r.overdue}</span> : "0"}</td>
                <td><span className={`badge ${r.status === "Active" ? "badge-green" : "badge-red"}`}>{r.status}</span></td>
                <td className="text-slate-500 text-sm">{r.joinDate}</td>
                <td style={{ textAlign: "center" }}>
                  <div className="inline-flex gap-1">
                    <button className="btn-secondary" style={{ fontSize: 12, padding: "4px 10px" }} onClick={() => setDetailTarget(r)}>Details</button>
                    <button
                      className={r.status === "Active" ? "btn-danger" : "btn-success"}
                      style={{ fontSize: 12, padding: "4px 10px" }}
                      onClick={() => {
                        if (r.status === "Active") openLock(r);
                        else {
                          setReaders(readers.map(x => x.id === r.id ? { ...x, status: "Active" } : x));
                          showToast("Account unlocked successfully!");
                        }
                      }}
                    >
                      {r.status === "Active" ? "Lock" : "Unlock"}
                    </button>
                    <button
                      style={{ fontSize: 12, padding: "4px 10px", background: "#fee2e2", color: "#b91c1c", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}
                      onClick={() => openDelete(r)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {detailTarget && (
        <Modal onClose={() => setDetailTarget(null)}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Reader Details</h3>
            <button onClick={() => setDetailTarget(null)} className="text-slate-400 hover:text-slate-700 text-lg font-bold">✕</button>
          </div>
          <div className="p-6">
            {/* Card info */}
            <div className="bg-slate-50 rounded-xl p-4 mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Card ID</span>
                <span className="font-mono text-blue-600 font-semibold">{detailTarget.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Full Name</span>
                <span className="font-semibold text-slate-900">{detailTarget.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Email</span>
                <span className="text-slate-700">{detailTarget.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Join Date</span>
                <span className="text-slate-700">{detailTarget.joinDate}</span>
              </div>
            </div>
            {/* Borrow history */}
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Recent Borrow History</h4>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left px-3 py-2 font-semibold text-slate-600">Book Title</th>
                    <th className="text-left px-3 py-2 font-semibold text-slate-600">Borrow Date</th>
                    <th className="text-left px-3 py-2 font-semibold text-slate-600">Return Date</th>
                    <th className="text-left px-3 py-2 font-semibold text-slate-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(READER_BORROW_HISTORY[detailTarget.id] || []).map((h, i) => (
                    <tr key={i} className="border-t border-slate-100">
                      <td className="px-3 py-2 text-slate-800 font-medium">{h.book}</td>
                      <td className="px-3 py-2 text-slate-500">{h.borrowDate}</td>
                      <td className="px-3 py-2 text-slate-500">{h.returnDate}</td>
                      <td className="px-3 py-2">
                        <span className={`badge ${h.status === "Returned" ? "badge-green" : h.status === "Overdue" ? "badge-red" : "badge-blue"}`}>{h.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Fine */}
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
              <span className="text-sm font-semibold text-red-700">Total outstanding fines</span>
              <span className="text-sm font-bold text-red-700">
                {totalFine(detailTarget.id) > 0 ? `${totalFine(detailTarget.id).toLocaleString()}đ` : "None"}
              </span>
            </div>
          </div>
          <div className="px-6 pb-6 flex justify-end">
            <button className="btn-secondary" onClick={() => setDetailTarget(null)}>Close</button>
          </div>
        </Modal>
      )}

      {/* Lock Modal */}
      {lockTarget && (
        <Modal onClose={() => setLockTarget(null)}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Confirm Account Lock</h3>
            <button onClick={() => setLockTarget(null)} className="text-slate-400 hover:text-slate-700 text-lg font-bold">✕</button>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-600 mb-4">
              You are locking the account of <span className="font-semibold text-slate-900">{lockTarget.name}</span>. This reader will not be able to borrow books until unlocked.
            </p>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Reason for locking <span className="text-red-500">*</span></label>
            <textarea className="input-field w-full" rows={2} placeholder="Enter reason for locking account..." value={lockReason} onChange={(e) => setLockReason(e.target.value)} />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {["Policy violation", "Account suspected compromised", "Personal request", "Other"].map(tag => (
                <button key={tag} type="button" onClick={() => setLockReason(tag)}
                  className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${lockReason === tag ? "bg-red-100 border-red-400 text-red-700" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-600"}`}>{tag}</button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 px-6 pb-6 justify-end">
            <button className="btn-secondary" onClick={() => setLockTarget(null)}>Cancel</button>
            <button disabled={!lockReason.trim()} onClick={confirmLock}
              style={{ fontSize: 13, padding: "7px 18px", borderRadius: 8, border: "none", cursor: lockReason.trim() ? "pointer" : "not-allowed", background: lockReason.trim() ? "#dc2626" : "#fca5a5", color: "white", fontWeight: 700 }}>
              Confirm Lock
            </button>
          </div>
        </Modal>
      )}

      {/* Delete Modal Step 1 */}
      {deleteTarget && deleteStep === 1 && (
        <Modal onClose={() => setDeleteTarget(null)}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Delete Reader Account</h3>
            <button onClick={() => setDeleteTarget(null)} className="text-slate-400 hover:text-slate-700 text-lg font-bold">✕</button>
          </div>
          <div className="p-6">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Reason for deletion <span className="text-red-500">*</span></label>
            <textarea className="input-field w-full" rows={2} placeholder="Enter reason for account deletion..." value={deleteReason} onChange={(e) => setDeleteReason(e.target.value)} />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {["Member resigned / Graduated", "Duplicate / Ghost account", "Serious policy violation", "Other"].map(tag => (
                <button key={tag} type="button" onClick={() => setDeleteReason(tag)}
                  className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${deleteReason === tag ? "bg-red-100 border-red-400 text-red-700" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-600"}`}>{tag}</button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 px-6 pb-6 justify-end">
            <button className="btn-secondary" onClick={() => setDeleteTarget(null)}>Cancel</button>
            <button disabled={!deleteReason.trim()} onClick={() => setDeleteStep(2)}
              style={{ fontSize: 13, padding: "7px 18px", borderRadius: 8, border: "none", cursor: deleteReason.trim() ? "pointer" : "not-allowed", background: deleteReason.trim() ? "#dc2626" : "#fca5a5", color: "white", fontWeight: 700 }}>
              Next
            </button>
          </div>
        </Modal>
      )}

      {/* Delete Modal Step 2 — countdown */}
      {deleteTarget && deleteStep === 2 && (
        <Modal onClose={() => setDeleteTarget(null)}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 className="font-bold text-red-700">Confirm Permanent Deletion</h3>
            <button onClick={() => setDeleteTarget(null)} className="text-slate-400 hover:text-slate-700 text-lg font-bold">✕</button>
          </div>
          <div className="p-6 text-center">
            <div className="text-4xl mb-3">⚠️</div>
            <p className="text-slate-800 font-semibold mb-2">Are you sure you want to permanently delete the account of <span className="text-red-600">{deleteTarget.name}</span>?</p>
            <p className="text-sm text-slate-500">This action cannot be undone. All associated data will be deleted.</p>
          </div>
          <div className="flex gap-3 px-6 pb-6 justify-center">
            <button className="btn-secondary" onClick={() => setDeleteStep(1)}>Back</button>
            <button disabled={deleteCountdown > 0} onClick={confirmDelete}
              style={{ fontSize: 13, padding: "7px 18px", borderRadius: 8, border: "none", cursor: deleteCountdown === 0 ? "pointer" : "not-allowed", background: deleteCountdown === 0 ? "#dc2626" : "#fca5a5", color: "white", fontWeight: 700 }}>
              Delete Permanently{deleteCountdown > 0 ? ` (${deleteCountdown}s)` : ""}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Reports ──────────────────────────────────────────────────────────────────
function Reports() {
  const [period, setPeriod] = useState("August 2026");
  const [exported, setExported] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Statistics & Reports</h1>
          <p className="text-slate-500 text-sm">Export reports and analyze library data</p>
        </div>
        <div className="flex gap-2 items-center">
          <select className="input-field w-auto text-sm" value={period} onChange={(e) => setPeriod(e.target.value)}>
            {["August 2026", "July 2026", "Q3 2026", "Year 2026"].map(p => <option key={p}>{p}</option>)}
          </select>
          <button className="btn-primary" onClick={() => setExported("PDF")}>⬇️ Export PDF</button>
          <button className="btn-secondary" onClick={() => setExported("Excel")}>📊 Export Excel</button>
        </div>
      </div>

      {exported && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl mb-5">
          <span className="text-xl">✅</span>
          <p className="text-green-800 font-semibold text-sm">{period} report exported as {exported} successfully!</p>
          <button className="ml-auto text-slate-400 hover:text-slate-600" onClick={() => setExported(null)}>✕</button>
        </div>
      )}

      {/* Summary cards — same 4 as dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Books" value="1.567" trend="+3.2% vs. last month" trendUp={true} color="bg-blue-50" icon="📚" />
        <StatCard label="Active Readers" value="369" trend="+5.1% vs. last month" trendUp={true} color="bg-violet-50" icon="👥" />
        <StatCard label="Currently Borrowed" value="172" trend="+8.9% vs. last month" trendUp={true} color="bg-teal-50" icon="📖" />
        <StatCard label="Pending Actions" value="4" trend="-20% vs. last month" trendUp={false} color="bg-red-50" icon="🔔" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <div className="card p-5">
          <h3 className="font-bold text-slate-800 mb-4">Monthly Borrow/Return Activity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={borrowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="muon" name="Borrows" fill="#1d4ed8" radius={[3, 3, 0, 0]} />
              <Bar dataKey="tra" name="Returns" fill="#059669" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-slate-800 mb-4">Fine Revenue</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={fineData}>
              <defs>
                <linearGradient id="fineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} formatter={(v) => [`${Number(v).toLocaleString()}đ`, "Fines"]} />
              <Area type="monotone" dataKey="tienPhat" name="Fines" stroke="#f59e0b" strokeWidth={2.5} fill="url(#fineGrad)" dot={{ r: 3, fill: "#f59e0b" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Overdue detail table */}
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Detailed Overdue Books List</h3>
        </div>
        <table>
          <thead>
            <tr><th>Reader</th><th>Card ID</th><th>Book Title</th><th>Due Date</th><th>Days Overdue</th><th>Fine</th></tr>
          </thead>
          <tbody>
            {OVERDUE_LIST.map((item, i) => (
              <tr key={i}>
                <td className="font-semibold">{item.reader}</td>
                <td className="font-mono text-xs text-blue-600">{item.readerCode}</td>
                <td>{item.book}</td>
                <td>{item.dueDate}</td>
                <td><span className="badge badge-red">{item.daysLate} days</span></td>
                <td className="font-bold text-red-600">{item.fine.toLocaleString()}đ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pb-10" />
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
const NAV_ITEMS: { key: AdminView; label: string; icon: string; group: string }[] = [
  { key: "dashboard", label: "Overview", icon: "📊", group: "Dashboard" },
  { key: "reports", label: "Statistics & Reports", icon: "📈", group: "Dashboard" },
  { key: "staff", label: "Staff Accounts", icon: "👥", group: "Account Management" },
  { key: "readers", label: "Reader Accounts", icon: "🪪", group: "Account Management" },
];

// ─── AdminPage ────────────────────────────────────────────────────────────────
export default function AdminPage({ onNavigateToCatalog }: { onNavigateToCatalog?: () => void } = {}) {
  const [view, setView] = useState<AdminView>("dashboard");
  const [toast, setToast] = useState<string | null>(null);
  const groups = ["Dashboard", "Account Management"];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-60 bg-[#0f172a] flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-violet-600 rounded-lg flex items-center justify-center text-white text-sm">⚙️</div>
            <div>
              <p className="text-white text-sm font-bold leading-tight">System Administration</p>
              <p className="text-slate-500 text-xs">Admin</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {groups.map((group) => (
            <div key={group}>
              <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider px-3 py-2 mt-3">{group}</p>
              {NAV_ITEMS.filter(n => n.group === group).map((item) => (
                <button key={item.key} onClick={() => setView(item.key)} className={`sidebar-link w-full ${view === item.key ? "active" : ""}`}>
                  <span>{item.icon}</span> {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-violet-700 flex items-center justify-center text-white text-xs font-bold">AD</div>
            <div>
              <p className="text-slate-200 text-xs font-semibold">Pham Trung Kien</p>
              <p className="text-slate-500 text-xs">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Admin</span><span>›</span>
            <span className="text-slate-800 font-medium">{NAV_ITEMS.find(n => n.key === view)?.label}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge badge-amber">🔔 4 pending requests</span>
          </div>
        </div>
        <div className="p-6">
          {view === "dashboard" && <Dashboard onNavigateToCatalog={onNavigateToCatalog} />}
          {view === "staff" && <StaffManagement showToast={showToast} />}
          {view === "readers" && <ReaderManagement showToast={showToast} />}
          {view === "reports" && <Reports />}
        </div>
      </main>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
