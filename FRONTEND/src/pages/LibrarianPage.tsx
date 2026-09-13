import { useState, useEffect } from "react";
import { api } from "../service/apis";

export type LibView = "borrow" | "return" | "fine" | "renew" | "catalog" | "approve" | "requests";

// ── QR Placeholder ────────────────────────────────────────────────────────────
function QRPlaceholder({ size = 80, value }: { size?: number; value: string }) {
  const cells = 9;
  const cell = size / cells;
  const pattern = [
    [1,1,1,1,1,1,1,0,0],[1,0,0,0,0,0,1,0,1],[1,0,1,1,1,0,1,0,0],
    [1,0,1,1,1,0,1,0,1],[1,0,1,1,1,0,1,0,0],[1,0,0,0,0,0,1,0,1],
    [1,1,1,1,1,1,1,0,1],[0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1],
  ];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
      <rect width={size} height={size} fill="white" rx="4" />
      {pattern.map((row, r) => row.map((v, c) => v ? <rect key={`${r}-${c}`} x={c*cell} y={r*cell} width={cell} height={cell} fill="#0f172a" /> : null))}
      <title>{value}</title>
    </svg>
  );
}

// ── VietQR Mock ───────────────────────────────────────────────────────────────
function VietQR({ amount, reason }: { amount: number; reason: string }) {
  const cells = 13;
  const size = 140;
  const cell = size / cells;
  // Simple pseudo-random pattern seeded by amount
  const seed = amount % 97;
  const pattern = Array.from({ length: cells }, (_, r) =>
    Array.from({ length: cells }, (_, c) => {
      if (r < 4 && c < 4) return 1; // top-left finder
      if (r < 4 && c > cells - 5) return 1; // top-right finder
      if (r > cells - 5 && c < 4) return 1; // bottom-left finder
      return (r * 7 + c * 11 + seed) % 3 === 0 ? 1 : 0;
    })
  );
  return (
    <div className="flex flex-col items-center">
      <div className="p-2 bg-white rounded-xl border-2 border-slate-200 shadow-sm">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <rect width={size} height={size} fill="white" />
          {pattern.map((row, r) => row.map((v, c) => v ? <rect key={`${r}-${c}`} x={c*cell} y={r*cell} width={cell} height={cell} fill="#0f172a" /> : null))}
          {/* VietQR logo area */}
          <rect x={size/2-14} y={size/2-10} width={28} height={20} fill="white" rx="3" />
          <text x={size/2} y={size/2+4} textAnchor="middle" fontSize="7" fontWeight="bold" fill="#d4163c">VietQR</text>
        </svg>
      </div>
      <p className="text-xs text-slate-500 mt-1.5 text-center">Scan to pay</p>
      <p className="text-sm font-bold text-red-600 mt-0.5">{amount.toLocaleString()}đ</p>
      <p className="text-xs text-slate-400 text-center">{reason}</p>
    </div>
  );
}

// ── Borrow Process — 3-column layout ─────────────────────────────────────────
function BorrowProcess() {
  const [readerCode, setReaderCode] = useState("");
  const [readerVerified, setReaderVerified] = useState(false);
  const [bookInput, setBookInput] = useState("");
  const [scannedBooks, setScannedBooks] = useState<{ code: string; title: string; author: string; status: string }[]>([]);
  const [printed, setPrinted] = useState(false);

  const BOOK_DB: Record<string, { title: string; author: string }> = {
    "SKU001": { title: "Đắc Nhân Tâm", author: "Dale Carnegie" },
    "SKU003": { title: "Tư Duy Phản Biện", author: "Richard Paul" },
    "SKU005": { title: "Atomic Habits", author: "James Clear" },
    "SKU014": { title: "Lập Trình Python Cơ Bản", author: "Nguyen Thanh Tung" },
  };

  const addBook = () => {
    const code = bookInput.trim().toUpperCase();
    if (!code || scannedBooks.find(b => b.code === code)) { setBookInput(""); return; }
    const found = BOOK_DB[code] || { title: `Book ${code}`, author: "Unknown" };
    setScannedBooks(prev => [...prev, { code, ...found, status: "Available" }]);
    setBookInput("");
  };

  const removeBook = (code: string) => setScannedBooks(prev => prev.filter(b => b.code !== code));

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Process Borrowing</h1>
        <p className="text-slate-500 text-sm">Verify reader and scan books to create a borrow record</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ─── LEFT: Reader Card ──────────────────────────────── */}
        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
              Reader Card
            </h3>
            <div className="flex gap-2 mb-3">
              <input className="input-field text-sm" placeholder="Scan or enter card ID..." value={readerCode}
                onChange={(e) => { setReaderCode(e.target.value); setReaderVerified(false); }} />
              <button className="btn-primary flex-shrink-0 text-sm" style={{ padding: "8px 14px" }}
                onClick={() => readerCode && setReaderVerified(true)}>Verify</button>
            </div>

            {readerVerified ? (
              <div className="space-y-3">
                {/* Avatar */}
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                  <div className="relative">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&auto=format&face" alt="Reader photo" className="w-14 h-14 rounded-lg object-cover border-2 border-green-400" />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 text-sm">Nguyen Thi An</p>
                    <p className="text-xs text-slate-500 font-mono">DR-2024-0142</p>
                    <p className="text-xs text-green-700 font-semibold mt-0.5">✓ Valid card · Active</p>
                  </div>
                </div>
                {/* Info chips */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 rounded-lg p-2"><p className="text-slate-400">On Loan</p><p className="font-bold text-slate-800">2 / 5 books</p></div>
                  <div className="bg-slate-50 rounded-lg p-2"><p className="text-slate-400">Fine</p><p className="font-bold text-green-600">None</p></div>
                  <div className="bg-slate-50 rounded-lg p-2 col-span-2"><p className="text-slate-400">Card Expiry</p><p className="font-bold text-slate-800">01/01/2026</p></div>
                </div>
                {/* Library card QR */}
                <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-xs font-semibold text-slate-500 mb-2">Library Card QR Code</p>
                  <QRPlaceholder size={96} value="DR-2024-0142" />
                  <p className="font-mono text-xs text-slate-600 mt-2">DR-2024-0142</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center py-6 text-slate-300">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                <p className="text-sm mt-2 text-slate-400">Card not verified</p>
              </div>
            )}
          </div>
        </div>

        {/* ─── MIDDLE: Book Scanning ──────────────────────────── */}
        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${readerVerified ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-400"}`}>2</span>
              Scan Book Barcode
            </h3>
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <input className="input-field text-sm pr-10" placeholder="Enter or scan book code..." value={bookInput}
                  onChange={(e) => setBookInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && readerVerified && addBook()}
                  disabled={!readerVerified} />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors" title="Scan with camera">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                </button>
              </div>
              <button className="btn-primary flex-shrink-0 text-sm" style={{ padding: "8px 14px" }}
                onClick={addBook} disabled={!readerVerified}>Add</button>
            </div>

            {/* Hint chips */}
            {readerVerified && scannedBooks.length === 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {["SKU001","SKU003","SKU005","SKU014"].map(c => (
                  <button key={c} className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 font-mono" onClick={() => { setBookInput(c); }}>
                    {c}
                  </button>
                ))}
                <span className="text-xs text-slate-400 self-center">↑ sample codes</span>
              </div>
            )}

            {/* Scanned books table */}
            {scannedBooks.length > 0 ? (
              <div className="rounded-xl overflow-hidden border border-slate-200">
                <table className="w-full">
                  <thead><tr><th style={{ padding: "8px 10px", fontSize: 11 }}>Book ID</th><th style={{ padding: "8px 10px", fontSize: 11 }}>Book Title</th><th style={{ padding: "8px 10px", fontSize: 11 }}>Status</th><th style={{ padding: "8px 10px", fontSize: 11 }}>Remove</th></tr></thead>
                  <tbody>
                    {scannedBooks.map(b => (
                      <tr key={b.code}>
                        <td className="font-mono text-xs text-blue-600" style={{ padding: "8px 10px" }}>{b.code}</td>
                        <td style={{ padding: "8px 10px" }}>
                          <p className="text-sm font-semibold text-slate-900 leading-tight">{b.title}</p>
                          <p className="text-xs text-slate-400">{b.author}</p>
                        </td>
                        <td style={{ padding: "8px 10px" }}><span className="badge badge-green" style={{ fontSize: 11 }}>Available</span></td>
                        <td style={{ padding: "8px 10px" }}>
                          <button onClick={() => removeBook(b.code)} className="text-red-400 hover:text-red-600">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center py-8 text-slate-300 border-2 border-dashed border-slate-200 rounded-xl">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9H21M3 15H21M9 3V21M15 3V21"/></svg>
                <p className="text-sm mt-2 text-slate-400">No books added yet</p>
              </div>
            )}
          </div>

          {/* Confirm button */}
          {scannedBooks.length > 0 && readerVerified && (
            <div className="card p-4">
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="text-slate-600">Books:</span><span className="font-bold">{scannedBooks.length} books</span>
              </div>
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="text-slate-600">Due Date:</span><span className="font-bold text-blue-600">21/09/2026 (20 days)</span>
              </div>
              <div className="mb-4 p-2.5 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs font-bold text-blue-700">Expected due date: +20 days (auto-calculated)</p>
              </div>
              {!printed ? (
                <button className="w-full justify-center py-2.5 rounded-xl text-white font-semibold text-sm flex items-center gap-2" style={{ background: "#1d4ed8" }} onClick={() => setPrinted(true)}>
                  🖨️ Confirm & Print Receipt
                </button>
              ) : (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl">
                  <span className="text-green-600 text-lg">✅</span>
                  <div className="flex-1"><p className="font-bold text-green-800 text-sm">Borrow record created!</p><p className="text-green-600 text-xs">Printing receipt...</p></div>
                  <button className="btn-secondary text-xs" style={{ padding: "5px 10px" }} onClick={() => { setScannedBooks([]); setReaderVerified(false); setReaderCode(""); setPrinted(false); }}>New Record</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ─── RIGHT: Return + Fine + VietQR ─────────────────── */}
        <div className="space-y-4 border-l-2 border-slate-200 pl-5">
          <div className="card p-5">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">↩</span>
              Receive Returns & Calculate Fines
            </h3>
            <ReturnWidget />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Return Widget (inside borrow page right col) ──────────────────────────────
function ReturnWidget() {
  const [returnCode, setReturnCode] = useState("");
  const [book, setBook] = useState<{ title: string; reader: string; daysLate: number } | null>(null);
  const [condition, setCondition] = useState("Intact");
  const [confirmed, setConfirmed] = useState(false);

  const CONDITIONS = [
    { label: "Intact", multiplier: 0 },
    { label: "Torn Cover", multiplier: 1 },
    { label: "Missing Pages", multiplier: 2 },
    { label: "Lost Book", multiplier: 5 },
  ];

  const findCondition = CONDITIONS.find(c => c.label === condition) || CONDITIONS[0];
  const daysLateFine = (book?.daysLate || 0) * 2000;
  const conditionFine = findCondition.multiplier * 50000;
  const totalFine = daysLateFine + conditionFine;

  const lookup = () => {
    if (!returnCode) return;
    setBook({ title: "Người Đua Diều", reader: "Le Van Binh", daysLate: 16 });
    setCondition("Intact");
    setConfirmed(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input className="input-field text-sm" placeholder="Record ID / book code..." value={returnCode}
          onChange={(e) => setReturnCode(e.target.value)} />
        <button className="btn-primary flex-shrink-0 text-sm" style={{ padding: "8px 12px" }} onClick={lookup}>Look Up</button>
      </div>

      {book && !confirmed && (
        <div className="space-y-3">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
            <p className="text-xs text-slate-400 mb-1">Return book details</p>
            <p className="font-bold text-slate-900 text-sm">{book.title}</p>
            <p className="text-xs text-slate-500">Reader: {book.reader}</p>
            {book.daysLate > 0 && <p className="text-xs text-red-500 font-semibold mt-1">⚠️ Overdue by {book.daysLate} days</p>}
          </div>

          {/* Condition selector */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-2">Actual book condition</p>
            <div className="grid grid-cols-2 gap-1.5">
              {CONDITIONS.map(c => (
                <button key={c.label} onClick={() => setCondition(c.label)}
                  className={`text-xs py-2 px-3 rounded-lg border font-semibold transition-all text-left ${condition === c.label ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"}`}>
                  {c.label === "Intact" ? "✅" : c.label === "Torn Cover" ? "📄" : c.label === "Missing Pages" ? "⚠️" : "❌"} {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fine breakdown */}
          {totalFine > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 space-y-1.5 text-xs">
              <p className="font-bold text-red-700 mb-2">Automatic fine</p>
              {daysLateFine > 0 && <div className="flex justify-between"><span className="text-slate-600">Overdue by {book.daysLate} days × 2,000đ</span><span className="font-semibold">{daysLateFine.toLocaleString()}đ</span></div>}
              {conditionFine > 0 && <div className="flex justify-between"><span className="text-slate-600">{condition}</span><span className="font-semibold">{conditionFine.toLocaleString()}đ</span></div>}
              <div className="border-t border-red-200 pt-1.5 flex justify-between font-bold text-red-700 text-sm">
                <span>Total Fine</span><span>{totalFine.toLocaleString()}đ</span>
              </div>
            </div>
          )}

          {/* VietQR payment */}
          {totalFine > 0 && (
            <div className="flex flex-col items-center p-3 bg-white border border-slate-200 rounded-xl">
              <VietQR amount={totalFine} reason="Library fine" />
              <p className="text-xs text-slate-400 mt-2">MB Bank · 0908 xxx xxx</p>
            </div>
          )}

          <button className="btn-primary w-full justify-center" style={{ padding: "10px" }}
            onClick={() => setConfirmed(true)}>
            ✓ Confirm Book Return
          </button>
        </div>
      )}

      {confirmed && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl">
          <span className="text-lg">✅</span>
          <div className="flex-1"><p className="font-bold text-green-800 text-sm">Return received successfully!</p>{totalFine > 0 && <p className="text-xs text-green-600">Fine of {totalFine.toLocaleString()}đ has been created.</p>}</div>
          <button className="text-xs btn-secondary" style={{ padding: "4px 10px" }} onClick={() => { setBook(null); setReturnCode(""); setConfirmed(false); }}>New</button>
        </div>
      )}

      {!book && (
        <div className="flex flex-col items-center py-6 text-slate-300">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 14l-4-4 4-4M5 10h11a4 4 0 0 1 0 8H4"/></svg>
          <p className="text-sm mt-2 text-slate-400">Enter a record ID to look up</p>
        </div>
      )}
    </div>
  );
}

// ── Other views (return standalone, fine, renew, catalog, approve) ─────────────
function ReturnProcess({ onFineCreated }: { onFineCreated: (reader: string, amount: number) => void }) {
  const OVERDUE = [
    { id:"PM010", reader:"Le Van Binh", readerCode:"DR-2022-0089", title:"Người Đua Diều", dueDate:"10/08/2026", daysLate:16, condition:"Good" },
    { id:"PM011", reader:"Tran Thi Cuc", readerCode:"DR-2023-0201", title:"Rừng Na-Uy", dueDate:"15/08/2026", daysLate:11, condition:"Slightly Damaged" },
  ];
  const [returned, setReturned] = useState<string[]>([]);
  const [fineCreated, setFineCreated] = useState<string[]>([]);
  const [damagedItems, setDamagedItems] = useState<string[]>([]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Return Books</h1>
      <p className="text-slate-500 text-sm mb-6">Process book returns, check condition, and create fine records if needed</p>
      <div className="card p-5 mb-5"><div className="flex gap-3"><input className="input-field" placeholder="Enter record ID or book barcode..." /><button className="btn-primary flex-shrink-0">Look Up</button></div></div>
      <div className="space-y-3">
        {OVERDUE.map(item => {
          const isReturned = returned.includes(item.id);
          const hasFine = fineCreated.includes(item.id);
          const isDamaged = damagedItems.includes(item.id);
          const fine = item.daysLate * 2000 + (isDamaged ? 50000 : 0);
          return (
            <div key={item.id} className={`card p-4 transition-opacity ${hasFine?"opacity-70":""}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-mono text-xs text-blue-600">{item.id}</span>
                    <span className="badge badge-red">Overdue {item.daysLate} days</span>
                    <span className={`badge ${item.condition==="Good"?"badge-green":"badge-amber"}`}>{item.condition}</span>
                    {isDamaged && <span className="badge badge-red">+ Reported damaged/lost</span>}
                  </div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-500">Reader: <span className="text-slate-700">{item.reader}</span> · {item.readerCode}</p>
                  <p className="text-sm text-slate-500">Estimated fine: <span className="font-bold text-red-600">{fine.toLocaleString()}đ</span>{isDamaged && <span className="text-xs text-red-400 ml-1">(includes damage/loss compensation)</span>}</p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  {!isReturned ? (
                    <div className="flex gap-1.5">
                      {item.condition !== "Good" && (
                        <button
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg border-2 border-orange-300 bg-orange-50 text-orange-700 hover:bg-orange-100 transition-colors"
                          onClick={()=>setDamagedItems(p=>isDamaged?p.filter(x=>x!==item.id):[...p,item.id])}
                        >
                          {isDamaged?"✓ Reported damaged":"⚠️ Report damaged/lost"}
                        </button>
                      )}
                      <button className="btn-primary" style={{fontSize:13,padding:"7px 14px"}} onClick={()=>setReturned(p=>[...p,item.id])}>✓ Accept Return</button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 flex-wrap justify-end">
                      <span className="badge badge-green">Returned</span>
                      {!hasFine && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-300">
                          ⚠️ Fine not collected
                        </span>
                      )}
                    </div>
                  )}
                  {isReturned && !hasFine && (
                    <button className="btn-danger text-xs" style={{fontSize:12,padding:"5px 12px"}} onClick={()=>{ setFineCreated(p=>[...p,item.id]); onFineCreated(item.reader, fine); }}>
                      📋 Create Fine Record
                    </button>
                  )}
                  {hasFine && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-300">✅ Fine record created</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700">
        💡 After creating the fine record, go to <strong>Collect Fine</strong> to collect payment from the reader.
      </div>
    </div>
  );
}

function FineCollection({ onFinePaid }: { onFinePaid?: () => void }) {
  const fines = [
    { id:"PF001", reader:"Le Van Binh", title:"Người Đua Diều", reason:"Overdue 16 days", amount:32000 },
    { id:"PF002", reader:"Tran Thi Cuc", title:"Rừng Na-Uy", reason:"Overdue 11 days", amount:72000 },
    { id:"PF003", reader:"Nguyen Duc Tuan", title:"Homo Deus", reason:"Lost book", amount:220000 },
  ];
  const [paid, setPaid] = useState<string[]>([]);
  const [confirmFine, setConfirmFine] = useState<typeof fines[0] | null>(null);
  const [payMethod, setPayMethod] = useState<"cash" | "qr">("cash");
  const [toast, setToast] = useState<string | null>(null);

  const handleConfirmPay = () => {
    if (!confirmFine) return;
    setPaid(p => [...p, confirmFine.id]);
    setToast(`Collected ${confirmFine.amount.toLocaleString()}đ from ${confirmFine.reader} successfully`);
    setTimeout(() => setToast(null), 4000);
    onFinePaid?.();
    setConfirmFine(null);
    setPayMethod("cash");
  };

  return (
    <div>
      {toast && (
        <div className="fixed top-16 right-4 z-50 bg-blue-700 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-2xl">
          ✓ {toast}
        </div>
      )}

      {/* Confirm payment modal */}
      {confirmFine && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4" onClick={() => setConfirmFine(null)}>
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600" onClick={() => setConfirmFine(null)}>✕</button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl">💰</div>
              <h3 className="font-bold text-slate-900">Confirm Fine Collection</h3>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 mb-4 text-sm space-y-1.5">
              <div className="flex justify-between"><span className="text-slate-500">Reader</span><span className="font-semibold">{confirmFine.reader}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Record ID</span><span className="font-mono text-blue-600">{confirmFine.id}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Reason</span><span className="text-slate-700">{confirmFine.reason}</span></div>
              <div className="flex justify-between border-t border-slate-200 pt-1.5"><span className="font-bold text-slate-700">Amount</span><span className="font-bold text-red-600 text-base">{confirmFine.amount.toLocaleString()}đ</span></div>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold text-slate-700 mb-2">Payment method</p>
              <div className="flex gap-3">
                {[{ v: "cash", label: "💵 Cash" }, { v: "qr", label: "📱 QR Transfer" }].map(opt => (
                  <label key={opt.v} className={`flex-1 flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${payMethod === opt.v ? "border-green-500 bg-green-50" : "border-slate-200 hover:border-slate-300"}`}>
                    <input type="radio" name="payMethod" value={opt.v} checked={payMethod === opt.v as "cash"|"qr"} onChange={() => setPayMethod(opt.v as "cash"|"qr")} className="accent-green-600" />
                    <span className="text-sm font-medium">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary flex-1 justify-center" style={{ padding: "10px" }} onClick={() => setConfirmFine(null)}>Cancel</button>
              <button className="btn-success flex-1 justify-center" style={{ padding: "10px" }} onClick={handleConfirmPay}>Confirm Payment</button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold text-slate-900 mb-1">Collect Fine</h1>
      <p className="text-slate-500 text-sm mb-6">List of fines to collect</p>
      <div className="card overflow-hidden">
        <table>
          <thead><tr><th>Record ID</th><th>Reader</th><th>Book</th><th>Reason</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>{fines.map(f=>(
            <tr key={f.id}>
              <td className="font-mono text-xs text-blue-600">{f.id}</td>
              <td className="font-medium">{f.reader}</td>
              <td>{f.title}</td>
              <td className="text-slate-500">{f.reason}</td>
              <td className="font-bold text-red-600">{f.amount.toLocaleString()}đ</td>
              <td>{paid.includes(f.id)?<span className="badge badge-green">Collected</span>:<span className="badge badge-red">Pending</span>}</td>
              <td>{!paid.includes(f.id)&&<button className="btn-success" style={{fontSize:12,padding:"5px 12px"}} onClick={()=>{ setConfirmFine(f); setPayMethod("cash"); }}>Collect</button>}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
        <span className="text-sm font-medium text-slate-600">Total amount remaining to collect:</span>
        <span className="text-xl font-bold text-red-600">{fines.filter(f=>!paid.includes(f.id)).reduce((s,f)=>s+f.amount,0).toLocaleString()}đ</span>
      </div>
    </div>
  );
}

const RENEW_DB: Record<string, {
  title: string; author: string; reader: string; readerCode: string;
  currentDue: string; renewCount: number; status: "On Loan" | "Due Soon" | "Overdue"; fine?: number;
}> = {
  "PM002": { title: "Sapiens: Lược Sử Loài Người", author: "Yuval Noah Harari", reader: "Nguyen Thi An", readerCode: "DR-2024-0142", currentDue: "30/07/2026", renewCount: 1, status: "On Loan" },
  "PM004": { title: "Nhà Giả Kim", author: "Paulo Coelho", reader: "Nguyen Thi An", readerCode: "DR-2024-0142", currentDue: "04/09/2026", renewCount: 4, status: "Due Soon" },
  "PM003": { title: "Atomic Habits", author: "James Clear", reader: "Nguyen Thi An", readerCode: "DR-2024-0142", currentDue: "25/06/2026", renewCount: 2, status: "Overdue", fine: 9000 },
};

function addDays14(dmy: string): string {
  const [d, m, y] = dmy.split("/").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + 20);
  return `${String(date.getDate()).padStart(2,"0")}/${String(date.getMonth()+1).padStart(2,"0")}/${date.getFullYear()}`;
}

function RenewCounter() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<typeof RENEW_DB[string] | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [renewed, setRenewed] = useState(false);
  const [inputKey, setInputKey] = useState("");

  const lookup = () => {
    const key = code.trim().toUpperCase();
    setInputKey(key);
    setRenewed(false);
    if (RENEW_DB[key]) { setResult(RENEW_DB[key]); setNotFound(false); }
    else { setResult(null); setNotFound(true); }
  };

  const canRenew = result && result.renewCount < 4 && result.status !== "Overdue";
  const newDue = result ? addDays14(result.currentDue) : "--/--/----";

  const renewCountBadge = (n: number) => {
    if (n >= 4) return "bg-red-100 text-red-600 border border-red-200";
    if (n >= 3) return "bg-amber-100 text-amber-700 border border-amber-200";
    return "bg-amber-50 text-amber-600 border border-amber-200";
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Renew Borrow Record</h1>
      <p className="text-slate-500 text-sm mb-6">Renew book borrow records directly for readers at the front desk</p>

      {/* Search */}
      <div className="card p-5 mb-5 max-w-2xl">
        <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">🔍</span>
          Look up borrow record
        </h3>
        <div className="flex gap-2">
          <input
            className="input-field"
            placeholder="Enter record ID (PM002, PM003, PM004)..."
            value={code}
            onChange={e => setCode(e.target.value)}
            onKeyDown={e => e.key === "Enter" && lookup()}
          />
          <button className="btn-primary flex-shrink-0" onClick={lookup}>Look Up</button>
        </div>
        {/* Sample codes */}
        <div className="flex gap-1.5 mt-2.5 flex-wrap">
          {["PM002", "PM003", "PM004"].map(c => (
            <button key={c} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 font-mono transition-colors" onClick={() => setCode(c)}>{c}</button>
          ))}
          <span className="text-xs text-slate-400 self-center">↑ sample codes</span>
        </div>
      </div>

      {/* Not found */}
      {notFound && (
        <div className="max-w-2xl card p-5 flex items-center gap-3 border-amber-200 bg-amber-50">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-semibold text-amber-800">Borrow record not found</p>
            <p className="text-sm text-amber-600">Code "{inputKey}" does not exist in the system. Please check again.</p>
          </div>
        </div>
      )}

      {/* Result */}
      {result && !renewed && (
        <div className="max-w-2xl space-y-4">
          {/* Book info card */}
          <div className="card p-5">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">📖</div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900">{result.title}</h3>
                <p className="text-sm text-slate-500">{result.author}</p>
                <p className="text-sm text-slate-600 mt-0.5">Reader: <span className="font-semibold text-slate-800">{result.reader}</span> · <span className="font-mono text-blue-600 text-xs">{result.readerCode}</span></p>
              </div>
              <span className={`badge text-xs ${result.status === "Overdue" ? "badge-red" : result.status === "Due Soon" ? "badge-amber" : "badge-blue"}`}>
                {result.status}
              </span>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-400 mb-1">Renewals</p>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${renewCountBadge(result.renewCount)}`}>
                  {result.renewCount}/4
                </span>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-400 mb-1">Current Due Date</p>
                <p className={`font-bold text-sm ${result.status === "Overdue" ? "text-red-600" : "text-slate-800"}`}>{result.currentDue}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-400 mb-1">New Due Date After Renewal</p>
                <p className={`font-bold text-sm ${canRenew ? "text-green-600" : "text-slate-400"}`}>
                  {canRenew ? newDue : "--/--/----"}
                </p>
              </div>
            </div>

            {/* Fine info */}
            {result.fine && result.fine > 0 && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl mb-3 text-sm">
                <span>💰</span>
                <span className="text-red-700">Fine incurred: <strong>{result.fine.toLocaleString()}đ</strong></span>
              </div>
            )}

            {/* Warning for blocked cases */}
            {result.renewCount >= 4 && (
              <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-300 rounded-xl mb-4 text-sm">
                <span className="text-base mt-0.5">⚠️</span>
                <p className="text-red-700 font-medium">Reader has used all renewal allowances. Please bring the book to the front desk to process the return.</p>
              </div>
            )}
            {result.status === "Overdue" && (
              <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-300 rounded-xl mb-4 text-sm">
                <span className="text-base mt-0.5">⛔</span>
                <p className="text-red-700 font-medium">Borrow record is overdue and a fine has been incurred. Please collect the fine and process the book return at the <strong>Collect Fine</strong> counter.</p>
              </div>
            )}

            {/* Action button */}
            {canRenew ? (
              <button
                className="w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
                style={{ background: "#1d4ed8" }}
                onClick={() => setRenewed(true)}
              >
                🔄 Confirm Renewal for 20 More Days
              </button>
            ) : (
              <button disabled className="w-full py-3 rounded-xl text-slate-400 font-semibold text-sm flex items-center justify-center gap-2 bg-slate-200 cursor-not-allowed border border-slate-300">
                {result.renewCount >= 4 ? "Cannot renew (Maximum 4/4 renewals reached)" : "Cannot renew (Borrow record is overdue)"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Success */}
      {renewed && result && (
        <div className="max-w-2xl card p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">✅</div>
            <div>
              <p className="font-bold text-green-800 text-lg">Renewal successful!</p>
              <p className="text-green-600 text-sm">{result.title} — {result.reader}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="bg-slate-50 rounded-xl p-3"><p className="text-slate-400 text-xs mb-1">Previous Due Date</p><p className="font-semibold text-amber-600 line-through">{result.currentDue}</p></div>
            <div className="bg-green-50 rounded-xl p-3 border border-green-200"><p className="text-slate-400 text-xs mb-1">New Due Date</p><p className="font-bold text-green-700">{newDue}</p></div>
          </div>
          <button className="btn-secondary w-full justify-center" onClick={() => { setResult(null); setCode(""); setRenewed(false); setNotFound(false); }}>
            ← Renew Another Record
          </button>
        </div>
      )}
    </div>
  );
}

const BOOKS_CATALOG = [
  { id:"SKU001", title:"Đắc Nhân Tâm", author:"Dale Carnegie", genre:"Self-Improvement", copies:3, available:2, isbn:"978-604-1-09857-1" },
  { id:"SKU002", title:"Nhà Giả Kim", author:"Paulo Coelho", genre:"Fiction", copies:5, available:0, isbn:"978-604-77-2543-9" },
  { id:"SKU003", title:"Tư Duy Phản Biện", author:"Richard Paul", genre:"Education", copies:4, available:4, isbn:"978-604-1-11234-0" },
  { id:"SKU004", title:"Sapiens", author:"Yuval Noah Harari", genre:"History", copies:6, available:1, isbn:"978-604-77-3891-0" },
  { id:"SKU005", title:"Atomic Habits", author:"James Clear", genre:"Self-Improvement", copies:3, available:3, isbn:"978-604-1-12000-1" },
];

const CATALOG_GENRES = ["Self-Improvement","Fiction","Education","History","Vietnamese Literature","Technology","Economics"];

function BookCatalog() {
  type CatalogBook = typeof BOOKS_CATALOG[0];
  const [books, setBooks] = useState<CatalogBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newBook, setNewBook] = useState({ title:"", author:"", genre:"Self-Improvement", copies:"", isbn:"" });
  // Edit modal
  const [editTarget, setEditTarget] = useState<CatalogBook|null>(null);
  const [editDraft, setEditDraft] = useState({ title:"", author:"", genre:"", copies:"", isbn:"" });
  // Delete modal
  const [deleteTarget, setDeleteTarget] = useState<CatalogBook|null>(null);
  const [deleteReason, setDeleteReason] = useState("");
  // Toast
  const [toast, setToast] = useState<string|null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(()=>setToast(null), 3500);
  };

  useEffect(() => {
    let active = true;
    api.get<{ data: { content: Array<{
      bookId: string;
      title: string;
      authorName: string;
      categoryName: string;
      stockQuantity: number;
      status: string;
    }> } }>("/books/search?page=0&size=100")
      .then(response => {
        if (!active) return;
        setBooks(response.data.data.content.map(book => ({
          id: book.bookId,
          title: book.title,
          author: book.authorName,
          genre: book.categoryName || "Other",
          copies: book.stockQuantity,
          available: book.status.toLowerCase() === "available" ? book.stockQuantity : 0,
          isbn: book.bookId,
        })));
      })
      .catch(() => {
        if (active) setLoadError("Unable to load catalog from the library server.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const openEdit = (b: CatalogBook) => {
    setEditTarget(b);
    setEditDraft({ title:b.title, author:b.author, genre:b.genre, copies:String(b.copies), isbn:b.isbn });
  };
  const saveEdit = () => {
    if (!editTarget) return;
    setBooks(p=>p.map(b=>b.id===editTarget.id?{...b,...editDraft,copies:parseInt(editDraft.copies)||b.copies,available:parseInt(editDraft.copies)||b.available}:b));
    setEditTarget(null);
    showToast("Book information updated successfully!");
  };
  const confirmDelete = () => {
    if (!deleteTarget||!deleteReason.trim()) return;
    setBooks(p=>p.filter(b=>b.id!==deleteTarget.id));
    setDeleteTarget(null);
    setDeleteReason("");
    showToast("Book deleted successfully!");
  };

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-green-700 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
          {toast}
          <button className="ml-2 text-green-200 hover:text-white text-base leading-none" onClick={()=>setToast(null)}>✕</button>
        </div>
      )}

      {/* Edit modal */}
      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={()=>setEditTarget(null)}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Update Book Information</h3>
                <p className="text-xs text-slate-500">{editTarget.id}</p>
              </div>
              <button onClick={()=>setEditTarget(null)} className="ml-auto w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200">✕</button>
            </div>
            <div className="space-y-3">
              <div><label className="block text-xs font-semibold text-slate-600 mb-1">Book Title</label><input className="input-field" value={editDraft.title} onChange={e=>setEditDraft({...editDraft,title:e.target.value})} /></div>
              <div><label className="block text-xs font-semibold text-slate-600 mb-1">Author</label><input className="input-field" value={editDraft.author} onChange={e=>setEditDraft({...editDraft,author:e.target.value})} /></div>
              <div><label className="block text-xs font-semibold text-slate-600 mb-1">Genre</label>
                <select className="input-field" value={editDraft.genre} onChange={e=>setEditDraft({...editDraft,genre:e.target.value})}>
                  {CATALOG_GENRES.map(g=><option key={g}>{g}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-semibold text-slate-600 mb-1">ISBN</label><input className="input-field font-mono text-sm" value={editDraft.isbn} onChange={e=>setEditDraft({...editDraft,isbn:e.target.value})} /></div>
                <div><label className="block text-xs font-semibold text-slate-600 mb-1">Copies</label><input type="number" className="input-field" value={editDraft.copies} onChange={e=>setEditDraft({...editDraft,copies:e.target.value})} /></div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button className="btn-secondary flex-1 justify-center" onClick={()=>setEditTarget(null)}>Cancel</button>
              <button className="btn-primary flex-1 justify-center" onClick={saveEdit}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={()=>{setDeleteTarget(null);setDeleteReason("");}}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Delete Book</h3>
                <p className="text-xs text-slate-500">Are you sure you want to delete this book?</p>
              </div>
              <button onClick={()=>{setDeleteTarget(null);setDeleteReason("");}} className="ml-auto w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200">✕</button>
            </div>
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="font-semibold text-slate-900 text-sm">{deleteTarget.title}</p>
              <p className="text-xs text-slate-500">{deleteTarget.author} · {deleteTarget.id}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Delete reason <span className="text-red-500">*</span></label>
              <textarea className="input-field resize-none" rows={2} placeholder="Enter reason for deletion..." value={deleteReason} onChange={e=>setDeleteReason(e.target.value)} autoFocus />
              <div className="flex flex-wrap gap-1.5 mt-2 mb-1">
                {["Torn/damaged book", "Decommissioned old book", "Lost book", "Incorrect information entered"].map(tag => (
                  <button
                    key={tag}
                    type="button"
                    className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${deleteReason === tag ? "bg-red-100 border-red-400 text-red-700" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-600"}`}
                    onClick={() => setDeleteReason(tag)}
                  >{tag}</button>
                ))}
              </div>
              {!deleteReason.trim() && <p className="text-red-500 text-xs mt-1">Please enter a reason for deletion.</p>}
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary flex-1 justify-center" onClick={()=>{setDeleteTarget(null);setDeleteReason("");}}>Cancel</button>
              <button
                className={`flex-1 py-2.5 rounded-xl text-white font-semibold text-sm transition-all ${deleteReason.trim()?"bg-red-600 hover:bg-red-700":"bg-red-300 cursor-not-allowed"}`}
                onClick={confirmDelete} disabled={!deleteReason.trim()}
              >Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-slate-900 mb-1">Book Catalog Management</h1><p className="text-slate-500 text-sm">Add, edit, and delete book information in the catalog</p></div>
        <button className="btn-primary" onClick={()=>setShowAdd(true)}>+ Add New Book</button>
      </div>
      {showAdd && (
        <div className="card p-5 mb-5 border-blue-200 ring-2 ring-blue-100">
          <h3 className="font-bold text-slate-800 mb-4">Add New Book</h3>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Book Title</label><input className="input-field" placeholder="Enter book title..." value={newBook.title} onChange={e=>setNewBook({...newBook,title:e.target.value})} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Author</label><input className="input-field" placeholder="Author name..." value={newBook.author} onChange={e=>setNewBook({...newBook,author:e.target.value})} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Genre</label><select className="input-field" value={newBook.genre} onChange={e=>setNewBook({...newBook,genre:e.target.value})}>{CATALOG_GENRES.map(g=><option key={g}>{g}</option>)}</select></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">ISBN</label><input className="input-field" placeholder="978-..." value={newBook.isbn} onChange={e=>setNewBook({...newBook,isbn:e.target.value})} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Copies</label><input type="number" className="input-field" placeholder="0" value={newBook.copies} onChange={e=>setNewBook({...newBook,copies:e.target.value})} /></div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="btn-primary" onClick={()=>{if(newBook.title){setBooks(p=>[...p,{id:`SKU${String(p.length+1).padStart(3,"0")}`,title:newBook.title,author:newBook.author,genre:newBook.genre,isbn:newBook.isbn,copies:parseInt(newBook.copies)||1,available:parseInt(newBook.copies)||1}]);setShowAdd(false);setNewBook({title:"",author:"",genre:"Self-Improvement",copies:"",isbn:""});showToast("New book added successfully!")}}}>Save Book</button>
            <button className="btn-secondary" onClick={()=>setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}
      <div className="card overflow-hidden">
        {loading && <p className="p-5 text-sm text-slate-500">Loading catalog...</p>}
        {loadError && <p className="p-5 text-sm text-red-600">{loadError}</p>}
        <table>
          <thead><tr><th>Book ID</th><th>Book Title</th><th>Author</th><th>Genre</th><th>ISBN</th><th>Total/Available</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>{books.map(b=>(
            <tr key={b.id}>
              <td className="font-mono text-xs text-blue-600">{b.id}</td>
              <td className="font-semibold">{b.title}</td>
              <td>{b.author}</td>
              <td><span className="badge badge-blue">{b.genre}</span></td>
              <td className="font-mono text-xs text-slate-500">{b.isbn}</td>
              <td>{b.copies}/{b.available}</td>
              <td>{b.available>0?<span className="badge badge-green">In Stock</span>:<span className="badge badge-red">Out of Stock</span>}</td>
              <td><div className="flex gap-1">
                <button className="btn-secondary" style={{fontSize:12,padding:"4px 10px"}} onClick={()=>openEdit(b)}>Edit</button>
                <button className="btn-danger" style={{fontSize:12,padding:"4px 10px"}} onClick={()=>{setDeleteTarget(b);setDeleteReason("");}}>Delete</button>
              </div></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

const REQUESTS = [
  { id:"REQ001", name:"Tran Minh Khoa", email:"khoa.tran@email.com", phone:"0901234567", cccd:"079123456001", submittedDate:"24/08/2026", status:"Pending" },
  { id:"REQ002", name:"Le Thi Hong", email:"hong.le@email.com", phone:"0912345678", cccd:"079123456002", submittedDate:"25/08/2026", status:"Pending" },
  { id:"REQ003", name:"Pham Quoc Hung", email:"hung.pham@email.com", phone:"0923456789", cccd:"079123456003", submittedDate:"25/08/2026", status:"Approved" },
];

function ApproveCards() {
  const [reqs, setReqs] = useState(REQUESTS);
  const [loading, setLoading] = useState(true);
  const [rejectTarget, setRejectTarget] = useState<string|null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [approveTarget, setApproveTarget] = useState<typeof REQUESTS[0] | null>(null);
  const [toast, setToast] = useState<{ msg: string; color: "green" | "red" } | null>(null);

  const showToast = (msg: string, color: "green" | "red" = "green") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    let active = true;
    api.get<{ data: { content: Array<{
      readerId: string;
      fullName: string;
      email: string;
      phone: string;
      cccd?: string;
      status: string;
    }> } }>("/readers/requests?page=0&size=100")
      .then(response => {
        if (!active) return;
        setReqs(response.data.data.content.map(reader => ({
          id: reader.readerId,
          name: reader.fullName,
          email: reader.email,
          phone: reader.phone,
          cccd: reader.cccd ?? "-",
          submittedDate: "Pending",
          status: reader.status.toLowerCase() === "pending" ? "Pending" : "Approved",
        })));
      })
      .catch(() => {
        if (active) showToast("Unable to load reader requests", "red");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const confirmApprove = () => {
    if (!approveTarget) return;
    api.post(`/readers/${approveTarget.id}/approve`, { note: "Approved by staff" })
      .then(() => {
        setReqs(p => p.map(x => x.id === approveTarget.id ? { ...x, status: "Approved" } : x));
        showToast(`Card issued successfully for ${approveTarget.name}`, "green");
        setApproveTarget(null);
      })
      .catch(() => showToast("Unable to approve this reader card", "red"));
  };

  const confirmReject = () => {
    if (!rejectReason.trim() || !rejectTarget) return;
    const name = reqs.find(r => r.id === rejectTarget)?.name ?? "";
    setReqs(p => p.map(x => x.id === rejectTarget ? { ...x, status: "Rejected" } : x));
    showToast(`Card request rejected for ${name}`, "red");
    setRejectTarget(null);
    setRejectReason("");
  };

  // Expiry: 1 year from today
  const cardExpiry = (() => { const d = new Date(); d.setFullYear(d.getFullYear() + 1); return d.toLocaleDateString("en-US"); })();

  return (
    <div>
      {toast && (
        <div className={`fixed top-16 right-4 z-50 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-2xl ${toast.color === "red" ? "bg-red-600" : "bg-green-600"}`}>
          {toast.color === "red" ? "✕" : "✓"} {toast.msg}
        </div>
      )}

      {/* Approve confirm modal */}
      {approveTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setApproveTarget(null)}>
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600" onClick={() => setApproveTarget(null)}>✕</button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl">✅</div>
              <h3 className="font-bold text-slate-900">Confirm Reader Card Issuance</h3>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 mb-5 text-sm space-y-1.5">
              <div className="flex justify-between"><span className="text-slate-500">Full Name</span><span className="font-semibold">{approveTarget.name}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">National ID</span><span className="font-mono text-slate-700">{approveTarget.cccd}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Card Expiry Date</span><span className="font-semibold text-blue-700">{cardExpiry}</span></div>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary flex-1 justify-center" style={{ padding: "10px" }} onClick={() => setApproveTarget(null)}>Cancel</button>
              <button className="btn-success flex-1 justify-center" style={{ padding: "10px" }} onClick={confirmApprove}>Confirm Issuance</button>
            </div>
          </div>
        </div>
      )}

      {/* Reject modal */}
      {rejectTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={()=>{setRejectTarget(null);setRejectReason("");}}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Reject Card Request</h3>
                <p className="text-slate-500 text-xs">Code: {rejectTarget}</p>
              </div>
              <button onClick={()=>{setRejectTarget(null);setRejectReason("");}} className="ml-auto w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 text-sm">✕</button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Reason for rejection <span className="text-red-500">*</span></label>
              <textarea
                className="input-field resize-none"
                rows={3}
                placeholder="Enter reason for rejection (required)..."
                value={rejectReason}
                onChange={e=>setRejectReason(e.target.value)}
                autoFocus
              />
              <div className="flex flex-wrap gap-1.5 mt-2 mb-1">
                {["Outstanding fine overdue", "Damaged/lost book", "Invalid information", "Multiple violations"].map(tag => (
                  <button
                    key={tag}
                    type="button"
                    className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${rejectReason === tag ? "bg-red-100 border-red-400 text-red-700" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-600"}`}
                    onClick={() => setRejectReason(tag)}
                  >{tag}</button>
                ))}
              </div>
              {!rejectReason.trim() && <p className="text-red-500 text-xs mt-1">Please enter a reason for rejection before confirming.</p>}
            </div>
            <div className="flex gap-3">
              <button className="btn-secondary flex-1 justify-center" onClick={()=>{setRejectTarget(null);setRejectReason("");}}>Cancel</button>
              <button
                className={`flex-1 py-2.5 rounded-xl text-white font-semibold text-sm transition-all ${rejectReason.trim()?"bg-red-600 hover:bg-red-700":"bg-red-300 cursor-not-allowed"}`}
                onClick={confirmReject}
                disabled={!rejectReason.trim()}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-slate-900 mb-1">Approve Reader Card Applications</h1><p className="text-slate-500 text-sm">Review and approve new card registration requests</p></div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-center"><p className="text-xl font-bold text-amber-600">{reqs.filter(r=>r.status==="Pending").length}</p><p className="text-xs text-amber-500">Pending</p></div>
      </div>
      <div className="card overflow-hidden">
        {loading && <p className="p-5 text-sm text-slate-500">Loading reader requests...</p>}
        <table>
          <thead><tr><th>Req. ID</th><th>Full Name</th><th>Email</th><th>Phone</th><th>National ID</th><th>Submitted Date</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>{reqs.map(r=>(
            <tr key={r.id}>
              <td className="font-mono text-xs text-blue-600">{r.id}</td>
              <td className="font-semibold">{r.name}</td>
              <td className="text-slate-500 text-sm">{r.email}</td>
              <td>{r.phone}</td>
              <td className="font-mono text-xs">{r.cccd}</td>
              <td>{r.submittedDate}</td>
              <td><span className={`badge ${r.status==="Approved"?"badge-green":r.status==="Rejected"?"badge-red":"badge-amber"}`}>{r.status}</span></td>
              <td>{r.status==="Pending"&&<div className="flex gap-1"><button className="btn-success" style={{fontSize:12,padding:"5px 10px"}} onClick={()=>setApproveTarget(r)}>✓ Approve</button><button className="btn-danger" style={{fontSize:12,padding:"5px 10px"}} onClick={()=>setRejectTarget(r.id)}>✗ Reject</button></div>}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

// ── Approve Requests ───────────────────────────────────────────────────────────
const APPROVAL_REQUESTS_INIT = [
  { id:"RQ001", reader:"Tran Minh Khoa", readerCode:"DR-2023-0415", type:"Book Reservation", book:"Atomic Habits", timeAgo:"5 minutes ago", initials:"MK" },
  { id:"RQ002", reader:"Pham Thi Lan", readerCode:"DR-2024-0221", type:"Online Renewal", book:"Tư Duy Phản Biện", timeAgo:"18 minutes ago", initials:"TL" },
  { id:"RQ003", reader:"Nguyen Duc Nam", readerCode:"DR-2022-0108", type:"Book Suggestion", book:"Clean Code", timeAgo:"1 hour ago", initials:"DN" },
  { id:"RQ004", reader:"Le Van Binh", readerCode:"DR-2022-0089", type:"Book Reservation", book:"Sapiens: Lược Sử Loài Người", timeAgo:"2 hours ago", initials:"VB" },
];

function ApproveRequests({ onDecrement }: { onDecrement: () => void }) {
  const [approved, setApproved] = useState<string[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);
  const [rejectTarget, setRejectTarget] = useState<typeof APPROVAL_REQUESTS_INIT[0] | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [toast, setToast] = useState<{ msg: string; type: "green" | "red" } | null>(null);

  const showToast = (msg: string, type: "green" | "red") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleApprove = (req: typeof APPROVAL_REQUESTS_INIT[0]) => {
    setApproved(p => [...p, req.id]);
    showToast(`Request approved successfully for ${req.reader}`, "green");
    onDecrement();
  };

  const handleConfirmReject = () => {
    if (!rejectTarget || !rejectReason.trim()) return;
    setRejected(p => [...p, rejectTarget.id]);
    showToast(`Request rejected for ${rejectTarget.reader}`, "red");
    onDecrement();
    setRejectTarget(null);
    setRejectReason("");
  };

  const pending = APPROVAL_REQUESTS_INIT.filter(r => !approved.includes(r.id) && !rejected.includes(r.id));
  const processed = APPROVAL_REQUESTS_INIT.filter(r => approved.includes(r.id) || rejected.includes(r.id));

  return (
    <div>
      {toast && (
        <div className={`fixed top-16 right-4 z-50 px-5 py-3 rounded-xl shadow-2xl text-sm text-white font-semibold ${toast.type === "green" ? "bg-green-600" : "bg-red-600"}`}>
          {toast.msg}
        </div>
      )}

      {/* Reject modal */}
      {rejectTarget && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4" onClick={() => setRejectTarget(null)}>
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600" onClick={() => setRejectTarget(null)}>✕</button>
            <h3 className="font-bold text-slate-900 mb-1">Reject request from {rejectTarget.reader}</h3>
            <p className="text-sm text-slate-500 mb-4">{rejectTarget.type} — {rejectTarget.book}</p>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Reason for rejection <span className="text-red-500">*</span>
            </label>
            <textarea
              className="input-field min-h-[80px] mb-3"
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder="Enter reason for rejection..."
            />
            <div className="flex flex-wrap gap-2 mb-4">
              {["Damaged/lost book", "Outstanding fine overdue", "Book held at front desk"].map(tag => (
                <button
                  key={tag}
                  className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${rejectReason === tag ? "bg-red-100 border-red-400 text-red-700" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-red-300"}`}
                  onClick={() => setRejectReason(tag)}
                >{tag}</button>
              ))}
            </div>
            <div className="flex gap-2 justify-end">
              <button className="btn-secondary" style={{ padding: "8px 18px" }} onClick={() => setRejectTarget(null)}>Cancel</button>
              <button
                className="btn-danger"
                style={{ padding: "8px 18px" }}
                disabled={!rejectReason.trim()}
                onClick={handleConfirmReject}
              >Confirm Rejection</button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold text-slate-900 mb-1">Approve Requests</h1>
      <p className="text-slate-500 text-sm mb-6">List of book reservation and online renewal requests from readers</p>

      {pending.length === 0 ? (
        <div className="card p-12 text-center text-slate-400">
          <div className="text-4xl mb-3">✅</div>
          <p>All requests have been processed</p>
        </div>
      ) : (
        <div className="space-y-3 mb-6">
          {pending.map(req => (
            <div key={req.id} className="card p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold flex-shrink-0">{req.initials}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className="font-semibold text-slate-900">{req.reader}</span>
                  <span className="text-xs text-slate-400 font-mono">{req.readerCode}</span>
                </div>
                <p className="text-sm text-slate-600">
                  <span className="badge badge-blue text-xs mr-1.5">{req.type}</span>{req.book}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">⏱ {req.timeAgo}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button className="btn-success text-xs" style={{ padding: "6px 14px" }} onClick={() => handleApprove(req)}>✓ Approve</button>
                <button className="btn-danger text-xs" style={{ padding: "6px 14px" }} onClick={() => { setRejectTarget(req); setRejectReason(""); }}>✕ Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {processed.length > 0 && (
        <div>
          <h3 className="font-semibold text-slate-700 mb-3 text-sm">Processed ({processed.length})</h3>
          <div className="space-y-2">
            {processed.map(req => (
              <div key={req.id} className="card p-4 flex items-center gap-4 opacity-60">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-sm font-bold flex-shrink-0">{req.initials}</div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-700 text-sm">{req.reader} — {req.book}</p>
                  <p className="text-xs text-slate-400">{req.type}</p>
                </div>
                {approved.includes(req.id)
                  ? <span className="badge badge-green">✓ Approved</span>
                  : <span className="badge badge-red">✕ Rejected</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const NAV_ITEMS: { key: LibView; label: string; icon: string; group: string }[] = [
  { key:"borrow", label:"Process Borrowing", icon:"📥", group:"Operations" },
  { key:"return", label:"Return Books", icon:"📤", group:"Operations" },
  { key:"fine", label:"Collect Fine", icon:"💰", group:"Operations" },
  { key:"renew", label:"Renew Borrow Record", icon:"🔄", group:"Operations" },
  { key:"requests", label:"Approve Requests", icon:"📋", group:"Operations" },
  { key:"catalog", label:"Book Catalog", icon:"📚", group:"Management" },
  { key:"approve", label:"Approve Cards", icon:"✅", group:"Management" },
];

export default function LibrarianPage({ initialView, onViewConsumed, staffName, staffRole }: { initialView?: LibView; onViewConsumed?: () => void; staffName?: string; staffRole?: "staff" | "admin" } = {}) {
  const [view, setView] = useState<LibView>(initialView ?? "borrow");
  const [newFineCount, setNewFineCount] = useState(0);
  const [pendingRequestCount, setPendingRequestCount] = useState(4);

  // Consume initialView after first render so remounting doesn't re-apply a stale value
  useEffect(() => { if (initialView) onViewConsumed?.(); }, []);
  // Toast for fine creation
  const [fineToast, setFineToast] = useState<{ reader: string; amount: number } | null>(null);
  const showFineToast = (reader: string, amount: number) => {
    setFineToast({ reader, amount });
    setNewFineCount(c => c + 1);
    setTimeout(() => setFineToast(null), 5000);
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Fine created toast — top-right */}
      {fineToast && (
        <div className="fixed top-16 right-4 z-50 flex flex-col gap-1 bg-blue-700 text-white px-5 py-3 rounded-xl shadow-2xl text-sm max-w-xs">
          <div className="flex items-center gap-2 font-semibold">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
            Fine record created for {fineToast.reader} ({fineToast.amount.toLocaleString()}đ)
          </div>
          <button
            className="text-blue-200 hover:text-white text-xs underline text-left mt-1"
            onClick={() => { setView("fine"); setFineToast(null); }}
          >
            Go to Collect Fine →
          </button>
          <button className="absolute top-2 right-2 text-blue-300 hover:text-white text-sm" onClick={() => setFineToast(null)}>✕</button>
        </div>
      )}

      <aside className="w-60 bg-[#0f172a] flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm">📋</div>
            <div><p className="text-white text-sm font-bold leading-tight">Dashboard</p><p className="text-slate-500 text-xs">Librarian</p></div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {["Operations","Management"].map(group=>(
            <div key={group}>
              <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider px-3 py-2 mt-3">{group}</p>
              {NAV_ITEMS.filter(n=>n.group===group).map(item=>(
                <button key={item.key} onClick={()=>setView(item.key)} className={`sidebar-link w-full ${view===item.key?"active":""}`}>
                  <span>{item.icon}</span> {item.label}
                  {item.key==="fine" && newFineCount>0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 leading-none">{newFineCount}</span>
                  )}
                  {item.key==="requests" && pendingRequestCount>0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 leading-none">{pendingRequestCount}</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${staffRole === "admin" ? "bg-violet-700" : "bg-indigo-700"}`}>
              {staffName ? staffName.split(" ").filter((_,i,a)=>i===0||i===a.length-1).map(w=>w[0]).join("") : "TL"}
            </div>
            <div>
              <p className="text-slate-200 text-xs font-semibold">{staffName ?? "Tran Van Lam"}</p>
              <p className="text-slate-500 text-xs">{staffRole === "admin" ? "Administrator" : "Librarian"}</p>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Librarian</span><span>›</span>
            <span className="text-slate-800 font-medium">{NAV_ITEMS.find(n=>n.key===view)?.label}</span>
          </div>
          <span className="text-xs text-slate-500">{new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</span>
        </div>
        <div className="p-6">
          {view==="borrow" && <BorrowProcess />}
          {view==="return" && <ReturnProcess onFineCreated={showFineToast} />}
          {view==="fine" && <FineCollection onFinePaid={() => setNewFineCount(c => Math.max(0, c-1))} />}
          {view==="renew" && <RenewCounter />}
          {view==="requests" && <ApproveRequests onDecrement={()=>setPendingRequestCount(c=>Math.max(0,c-1))} />}
          {view==="catalog" && <BookCatalog />}
          {view==="approve" && <ApproveCards />}
        </div>
      </main>
    </div>
  );
}
