import { useState } from "react";
import dfd1 from "@/imports/image-1.png";
import dfd2 from "@/imports/image-2.png";
import dfd3 from "@/imports/image-3.png";
import dfd4 from "@/imports/image-4.png";
import dfd5 from "@/imports/image-5.png";
import dfd6 from "@/imports/image-6.png";
import dfd7 from "@/imports/image-7.png";
import dfd8 from "@/imports/image-8.png";
import dfd9 from "@/imports/image-9.png";

const DIAGRAMS = [
  {
    id: "dfd0",
    level: "DFD Mức 0",
    code: "0.0",
    title: "Hệ thống Quản lý Thư viện",
    subtitle: "Sơ đồ tổng quan — Context Diagram",
    desc: "Mô tả toàn bộ hệ thống như một tiến trình duy nhất và mối quan hệ dữ liệu với các tác nhân bên ngoài: Độc giả, Nhân viên và Quản trị viên.",
    actors: ["Độc giả (Reader)", "Nhân viên (Staff)", "Quản trị viên (Admin)"],
    flows: ["Registration Request", "Membership Card", "Borrow Receipt", "Fine Payment", "Barcode Scan Data", "Operational Reports", "System Configuration", "Management & Analytical Reports"],
    img: dfd1,
    dark: true,
    tag: "Level 0",
    tagColor: "bg-violet-100 text-violet-700",
  },
  {
    id: "dfd1",
    level: "DFD Mức 1",
    code: "1.0 – 7.0",
    title: "Phân rã tiến trình hệ thống",
    subtitle: "7 tiến trình nghiệp vụ chính",
    desc: "Phân rã toàn bộ hệ thống thành 7 tiến trình nghiệp vụ chính, với 4 kho dữ liệu: D1 Catalog, D2 Reader_DB, D3 Borrow_Records, D4 Fine_Records.",
    actors: ["Reader", "Staff", "Admin"],
    flows: ["Reader Card Details", "Issue Borrow Slip", "Book Barcode", "Borrow Receipt", "Return Book", "Issue Receipt", "System Reports", "Report Query"],
    img: dfd2,
    dark: false,
    tag: "Level 1",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "dfd1x",
    level: "DFD Mức 2",
    code: "1.1 – 1.3",
    title: "Quản lý Độc giả",
    subtitle: "Tiến trình 1.0 — Reader Management",
    desc: "Chi tiết luồng xử lý đăng ký thẻ: Tiếp nhận & Xác minh thông tin → Phê duyệt tài khoản → Cấp thẻ & Lưu dữ liệu vào Reader_DB.",
    actors: ["Độc giả"],
    flows: ["Reader Information", "Registration Application", "Account Information", "Account Data → D2: Reader_DB", "Reader Card Details"],
    img: dfd3,
    dark: true,
    tag: "Level 2 · P1",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "dfd2x",
    level: "DFD Mức 2",
    code: "2.1 – 2.3",
    title: "Quản lý Tài liệu & Kho sách",
    subtitle: "Tiến trình 2.0 — Document & Inventory Management",
    desc: "Luồng nhập sách vào hệ thống: Tiếp nhận & Phân loại → Tạo mã vạch & Dán nhãn → Lưu thông tin vào D1: Catalog.",
    actors: ["Nhân viên"],
    flows: ["Book Information", "New Book Data → D1: Catalog", "Book Copy Details", "Book Barcode", "Label Code & Location", "Update Inventory Data"],
    img: dfd4,
    dark: true,
    tag: "Level 2 · P2",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "dfd3x",
    level: "DFD Mức 2",
    code: "3.1 – 3.3",
    title: "Tra cứu & Đặt giữ sách",
    subtitle: "Tiến trình 3.0 — Search & Book Reservation",
    desc: "Luồng tra cứu OPAC: Tìm kiếm tài liệu → Kiểm tra điều kiện đặt giữ (trạng thái thẻ, tình trạng sách) → Tạo & Cập nhật phiếu đặt giữ.",
    actors: ["Độc giả"],
    flows: ["Search Request", "Search Results", "Check Book Status ← D1", "Check Card Status ← D2", "Reservation Request", "Valid Request", "Save Reservation Slip → D3"],
    img: dfd5,
    dark: true,
    tag: "Level 2 · P3",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "dfd4x",
    level: "DFD Mức 2",
    code: "4.1 – 4.3",
    title: "Quản lý Lưu thông (Mượn sách)",
    subtitle: "Tiến trình 4.0 — Circulation Management",
    desc: "Luồng lập phiếu mượn: Kiểm tra điều kiện mượn (hết hạn thẻ, vi phạm) → Tạo bản ghi mượn → Cập nhật trạng thái sách & Bàn giao sách.",
    actors: ["Độc giả", "Nhân viên"],
    flows: ["Book Borrowing Request", "Check Card Expiry / Violations ← D2", "Check Book Availability ← D1", "Eligibility Confirmed", "Save BorrowRecord → D3", "Update Book Status = 'Borrowed' → D1", "Print / Hand Over Borrow Receipt & Book"],
    img: dfd6,
    dark: true,
    tag: "Level 2 · P4",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "dfd5x",
    level: "DFD Mức 2",
    code: "5.1 – 5.3",
    title: "Quản lý Trả & Gia hạn",
    subtitle: "Tiến trình 5.0 — Return & Renewal Management",
    desc: "Luồng trả/gia hạn: Tiếp nhận & Xác minh phiếu ← D3 Loan_Record → Gia hạn (cập nhật ngày hạn) hoặc Xử lý trả & Kiểm tra vi phạm → Cập nhật D1 Catalog.",
    actors: ["Độc giả", "Nhân viên"],
    flows: ["Return/Renewal Request", "Borrowing Slip Details ← D3", "Renewal Request → 5.2", "Due Date", "Success Notification", "Return Request → 5.3", "Update 'Returned' Status → D3", "Available → D1 Catalog", "Overdue"],
    img: dfd7,
    dark: false,
    tag: "Level 2 · P5",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "dfd6x",
    level: "DFD Mức 2",
    code: "6.1 – 6.3",
    title: "Quản lý Phạt & Thanh toán",
    subtitle: "Tiến trình 6.0 — Fine & Payment Management",
    desc: "Luồng xử lý phạt: Tra cứu & Xác định mức phạt (từ D4 Fine_Record) → Xử lý thanh toán (Pay Fine) → Cấp biên lai → Cập nhật bản ghi vi phạm.",
    actors: ["Độc giả", "Nhân viên"],
    flows: ["Violation Details ← D4 Fine_Record", "Fine Amount", "Pay Fine", "Payment Confirmation", "Issue Receipt", "Update Status → D4"],
    img: dfd8,
    dark: false,
    tag: "Level 2 · P6",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "dfd7x",
    level: "DFD Mức 2",
    code: "7.1 – 7.3",
    title: "Quản lý Nhân viên & Báo cáo",
    subtitle: "Tiến trình 7.0 — Staff & Report Management",
    desc: "Luồng tạo báo cáo: Tiếp nhận & Phân loại yêu cầu → Truy vấn dữ liệu từ D1–D4 (Catalog, Reader_DB, Loan_Record, Fine_Record) → Thu thập & Tổng hợp → Xuất System Report.",
    actors: ["Admin", "Nhân viên"],
    flows: ["Report Request", "Query Data → D1, D2, D3, D4", "Aggregated Data", "Raw Data", "System Report"],
    img: dfd9,
    dark: false,
    tag: "Level 2 · P7",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
];

// ── Data Store Reference ──────────────────────────────────────────────────────
const DATA_STORES = [
  { id: "D1", name: "D1: Catalog", desc: "Thông tin sách, trạng thái tồn kho, vị trí kệ", color: "bg-blue-50 border-blue-200 text-blue-700" },
  { id: "D2", name: "D2: Reader_DB", desc: "Thông tin độc giả, thẻ thư viện, tài khoản", color: "bg-indigo-50 border-indigo-200 text-indigo-700" },
  { id: "D3", name: "D3: Borrow_Records", desc: "Lịch sử mượn/trả, phiếu mượn, ngày hạn", color: "bg-amber-50 border-amber-200 text-amber-700" },
  { id: "D4", name: "D4: Fine_Records", desc: "Hồ sơ vi phạm, phiếu phạt, trạng thái thanh toán", color: "bg-red-50 border-red-200 text-red-700" },
];

const PROCESSES = [
  { code: "1.0", name: "Reader Management", vi: "Quản lý Độc giả", icon: "🪪" },
  { code: "2.0", name: "Document & Inventory", vi: "Quản lý Tài liệu & Kho", icon: "📚" },
  { code: "3.0", name: "Search & Reservation", vi: "Tra cứu & Đặt giữ sách", icon: "🔍" },
  { code: "4.0", name: "Circulation", vi: "Quản lý Lưu thông (Mượn)", icon: "📥" },
  { code: "5.0", name: "Return & Renewal", vi: "Trả sách & Gia hạn", icon: "🔄" },
  { code: "6.0", name: "Fine & Payment", vi: "Phạt & Thanh toán", icon: "💰" },
  { code: "7.0", name: "Staff & Reports", vi: "Nhân viên & Báo cáo", icon: "📊" },
];

export default function DFDPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "level0" | "level1" | "level2">("all");

  const filtered = DIAGRAMS.filter((d) => {
    if (filter === "all") return true;
    if (filter === "level0") return d.level === "DFD Mức 0";
    if (filter === "level1") return d.level === "DFD Mức 1";
    if (filter === "level2") return d.level === "DFD Mức 2";
    return true;
  });

  const selectedDiagram = selected ? DIAGRAMS.find((d) => d.id === selected) : null;

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f172a] flex flex-col flex-shrink-0 overflow-y-auto">
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-sm">📐</div>
            <div>
              <p className="text-white text-sm font-bold leading-tight">Sơ đồ DFD</p>
              <p className="text-slate-500 text-xs">Data Flow Diagrams</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3">
          <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider px-3 py-2 mt-1">Tổng quan</p>
          {DIAGRAMS.slice(0, 2).map((d) => (
            <button key={d.id} onClick={() => setSelected(d.id)}
              className={`sidebar-link w-full text-left ${selected === d.id ? "active" : ""}`}>
              <span className="font-mono text-xs opacity-60">{d.code.split("–")[0].trim()}</span>
              <span className="flex-1 truncate text-sm">{d.title}</span>
            </button>
          ))}

          <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider px-3 py-2 mt-3">Chi tiết tiến trình</p>
          {DIAGRAMS.slice(2).map((d) => (
            <button key={d.id} onClick={() => setSelected(d.id)}
              className={`sidebar-link w-full text-left ${selected === d.id ? "active" : ""}`}>
              <span className="font-mono text-xs opacity-60">{d.code.split("–")[0].trim()}</span>
              <span className="flex-1 truncate text-sm">{d.title.split(" ").slice(0, 3).join(" ")}</span>
            </button>
          ))}

          <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider px-3 py-2 mt-3">Kho dữ liệu</p>
          {DATA_STORES.map((ds) => (
            <div key={ds.id} className="px-3 py-1.5">
              <p className="text-slate-400 text-xs font-mono">{ds.name}</p>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto bg-slate-50">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Tài liệu phân tích</span><span>›</span>
            <span className="text-slate-800 font-medium">Sơ đồ Luồng Dữ liệu (DFD)</span>
          </div>
          <div className="flex gap-1.5">
            {(["all","level0","level1","level2"] as const).map((f) => (
              <button key={f} onClick={() => { setFilter(f); setSelected(null); }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${filter === f ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"}`}>
                {f === "all" ? "Tất cả" : f === "level0" ? "Mức 0" : f === "level1" ? "Mức 1" : "Mức 2"}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Full-screen diagram view */}
          {selectedDiagram ? (
            <div>
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`badge ${selectedDiagram.tagColor} text-xs`}>{selectedDiagram.tag}</span>
                    <span className="badge badge-gray text-xs font-mono">{selectedDiagram.code}</span>
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900 mb-1">{selectedDiagram.title}</h1>
                  <p className="text-slate-500 text-sm">{selectedDiagram.subtitle}</p>
                </div>
                <button onClick={() => setSelected(null)} className="btn-secondary text-sm">← Quay lại</button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
                {/* Diagram */}
                <div className="lg:col-span-2">
                  <div className={`rounded-2xl overflow-hidden border-2 border-slate-200 shadow-lg ${selectedDiagram.dark ? "bg-slate-900" : "bg-white"}`}>
                    <div className={`px-4 py-2.5 border-b flex items-center gap-2 ${selectedDiagram.dark ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-slate-50"}`}>
                      <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-amber-400" /><div className="w-3 h-3 rounded-full bg-green-400" /></div>
                      <span className={`text-xs font-mono ml-2 ${selectedDiagram.dark ? "text-slate-400" : "text-slate-500"}`}>DFD {selectedDiagram.code} — {selectedDiagram.title}</span>
                    </div>
                    <img src={selectedDiagram.img} alt={selectedDiagram.title} className="w-full object-contain" style={{ maxHeight: 520 }} />
                  </div>
                </div>

                {/* Details panel */}
                <div className="space-y-4">
                  <div className="card p-5">
                    <h3 className="font-bold text-slate-800 mb-3 text-sm">Mô tả tiến trình</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{selectedDiagram.desc}</p>
                  </div>

                  <div className="card p-5">
                    <h3 className="font-bold text-slate-800 mb-3 text-sm">Tác nhân liên quan</h3>
                    <div className="space-y-1.5">
                      {selectedDiagram.actors.map((a) => (
                        <div key={a} className="flex items-center gap-2 text-sm">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">👤</div>
                          <span className="text-slate-700">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card p-5">
                    <h3 className="font-bold text-slate-800 mb-3 text-sm">Luồng dữ liệu chính</h3>
                    <div className="space-y-1.5">
                      {selectedDiagram.flows.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          <span className="text-slate-300 mt-0.5 flex-shrink-0">→</span>
                          <span className="text-slate-600 font-mono leading-snug">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation between diagrams */}
              <div className="flex gap-3">
                {DIAGRAMS.map((d) => (
                  <button key={d.id} onClick={() => setSelected(d.id)}
                    className={`px-3 py-2 rounded-lg border text-xs font-semibold transition-all ${d.id === selectedDiagram.id ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-500 border-slate-200 hover:border-blue-300"}`}>
                    {d.code.length > 7 ? d.code.slice(0, 7) + ".." : d.code}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Overview header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 mb-1">Sơ đồ Luồng Dữ liệu — DFD</h1>
                <p className="text-slate-500 text-sm">Tài liệu phân tích hệ thống Quản lý Thư viện LibraVN · {DIAGRAMS.length} sơ đồ</p>
              </div>

              {/* Processes overview */}
              <div className="card p-5 mb-6">
                <h2 className="font-bold text-slate-800 mb-4 text-sm flex items-center gap-2">
                  <span className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">7</span>
                  Tiến trình nghiệp vụ chính (DFD Level 1)
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {PROCESSES.map((p) => (
                    <div key={p.code} className="text-center p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer" onClick={() => setSelected(DIAGRAMS[PROCESSES.indexOf(p) + 2]?.id)}>
                      <div className="text-2xl mb-1">{p.icon}</div>
                      <p className="font-mono text-xs text-blue-600 font-bold">{p.code}</p>
                      <p className="text-xs text-slate-700 font-semibold leading-snug mt-0.5">{p.vi}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data stores */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {DATA_STORES.map((ds) => (
                  <div key={ds.id} className={`p-4 rounded-xl border-2 ${ds.color}`}>
                    <p className="font-mono text-sm font-bold mb-1">{ds.name}</p>
                    <p className="text-xs leading-relaxed opacity-80">{ds.desc}</p>
                  </div>
                ))}
              </div>

              {/* Diagram grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((d) => (
                  <div key={d.id} className="card overflow-hidden cursor-pointer group hover:shadow-md hover:border-blue-200 transition-all" onClick={() => setSelected(d.id)}>
                    {/* Diagram thumbnail */}
                    <div className={`relative overflow-hidden ${d.dark ? "bg-slate-900" : "bg-slate-50"}`} style={{ height: 200 }}>
                      <img src={d.img} alt={d.title} className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300 p-2" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <span className="text-white text-xs font-semibold">Xem chi tiết →</span>
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className={`badge text-xs ${d.tagColor}`}>{d.tag}</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <p className="font-mono text-xs text-blue-600 font-bold mb-0.5">{d.code}</p>
                          <h3 className="font-bold text-slate-900 text-sm leading-snug">{d.title}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">{d.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{d.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {d.actors.map((a) => (
                          <span key={a} className="badge badge-gray" style={{ fontSize: 10, padding: "2px 8px" }}>{a}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* DFD Legend */}
              <div className="mt-6 card p-5">
                <h3 className="font-bold text-slate-800 mb-4 text-sm">Chú thích ký hiệu DFD</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { shape: "○", name: "Tiến trình (Process)", desc: "Vòng tròn — Xử lý hoặc biến đổi dữ liệu", color: "text-blue-600" },
                    { shape: "□", name: "Tác nhân ngoại (Entity)", desc: "Hình chữ nhật — Nguồn/đích dữ liệu bên ngoài", color: "text-slate-600" },
                    { shape: "⊏⊐", name: "Kho dữ liệu (Data Store)", desc: "Hai đường song song — Nơi lưu trữ dữ liệu", color: "text-amber-600" },
                    { shape: "→", name: "Luồng dữ liệu (Data Flow)", desc: "Mũi tên — Hướng di chuyển của dữ liệu", color: "text-green-600" },
                  ].map((item) => (
                    <div key={item.name} className="flex items-start gap-3">
                      <div className={`text-2xl font-bold flex-shrink-0 ${item.color}`}>{item.shape}</div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                        <p className="text-xs text-slate-500 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
