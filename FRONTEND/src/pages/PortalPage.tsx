import { useState, useRef, useEffect } from "react";
import { api } from "../service/apis";

type PortalView = "opac" | "login" | "register" | "forgot" | "profile" | "history" | "wishlist";

interface ToastItem { id: number; title: string; sub?: string; }

const BOOKS = [
  { id: 1,  title: "Đắc Nhân Tâm", author: "Dale Carnegie", genre: "Self-Help", year: 2020, copies: 3, available: 2, shelf: "Shelf B2 - Floor 1", isbn: "978-604-1-09857-1", desc: "The classic book on the art of communication and human influence. Carnegie shares golden principles to help you win people over, build lasting relationships, and succeed in life.", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=420&fit=crop&auto=format" },
  { id: 2,  title: "Nhà Giả Kim", author: "Paulo Coelho", genre: "Fiction", year: 2018, copies: 5, available: 0, shelf: "Shelf A1 - Floor 2", isbn: "978-604-77-2543-9", desc: "The journey of Santiago — a Spanish shepherd boy — searching for treasure, discovering the secrets of the universe and the true meaning of life through extraordinary experiences.", cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=420&fit=crop&auto=format" },
  { id: 3,  title: "Tư Duy Phản Biện", author: "Richard Paul", genre: "Education", year: 2021, copies: 4, available: 4, shelf: "Shelf C4 - Floor 1", isbn: "978-604-1-11234-0", desc: "A comprehensive guide to critical thinking skills — the ability to analyze, evaluate, and reason logically. This book helps readers identify reasoning errors and make wiser decisions.", cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=420&fit=crop&auto=format" },
  { id: 4,  title: "Sapiens: Lược Sử Loài Người", author: "Yuval Noah Harari", genre: "History", year: 2019, copies: 6, available: 1, shelf: "Shelf D1 - Floor 3", isbn: "978-604-77-3891-0", desc: "A 70,000-year journey of humanity from prehistoric times to the modern world. Harari explains how humans conquered Earth through language, agriculture, science, and capitalism.", cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=420&fit=crop&auto=format" },
  { id: 5,  title: "Atomic Habits", author: "James Clear", genre: "Self-Help", year: 2022, copies: 3, available: 3, shelf: "Shelf B3 - Floor 1", isbn: "978-604-1-12000-1", desc: "A practical framework for building good habits and breaking bad ones. Clear demonstrates that tiny 1% improvements each day produce remarkable results over time.", cover: "https://images.unsplash.com/photo-1509266272358-7701da638078?w=300&h=420&fit=crop&auto=format" },
  { id: 6,  title: "Người Đua Diều", author: "Khaled Hosseini", genre: "Fiction", year: 2017, copies: 2, available: 0, shelf: "Shelf A2 - Floor 2", isbn: "978-604-77-1823-3", desc: "A moving story of friendship, betrayal, and redemption set in Afghanistan. Amir and Hassan — two boys of contrasting fates — are separated by violence and time.", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=420&fit=crop&auto=format" },
  { id: 7,  title: "Homo Deus: Lược Sử Tương Lai", author: "Yuval Noah Harari", genre: "History", year: 2020, copies: 4, available: 2, shelf: "Shelf D2 - Floor 3", isbn: "978-604-77-4201-6", desc: "Continuing from Sapiens, Harari explores the future of humanity as artificial intelligence and biotechnology raise a new question: What happens when humans become obsolete?", cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=420&fit=crop&auto=format" },
  { id: 8,  title: "Rừng Na-Uy", author: "Haruki Murakami", genre: "Fiction", year: 2016, copies: 3, available: 1, shelf: "Shelf A3 - Floor 2", isbn: "978-604-77-0912-5", desc: "Murakami's coming-of-age novel about youth, love, and loss in 1960s Japan. Toru Watanabe looks back on his memories of Naoko and friends who have passed.", cover: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=300&h=420&fit=crop&auto=format" },
  { id: 9,  title: "Thép Đã Tôi Thế Đấy", author: "Nikolai Ostrovsky", genre: "Fiction", year: 2015, copies: 2, available: 2, shelf: "Shelf A4 - Floor 2", isbn: "978-604-77-0203-4", desc: "A great revolutionary novel about Pavel Korchagin — a resolute young man who overcomes illness and war to dedicate himself to an ideal. A symbol of human willpower and perseverance.", cover: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=420&fit=crop&auto=format" },
  { id: 10, title: "Nghĩ Giàu Làm Giàu", author: "Napoleon Hill", genre: "Self-Help", year: 2019, copies: 5, available: 0, shelf: "Shelf B1 - Floor 1", isbn: "978-604-1-09001-8", desc: "A distillation of 20 years of research into the secrets of 500 American millionaires. Hill explores 13 principles of wealth-building mindset, from burning desire to the power of the subconscious.", cover: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=420&fit=crop&auto=format" },
  { id: 11, title: "Dế Mèn Phiêu Lưu Ký", author: "To Hoai", genre: "Vietnamese Literature", year: 2018, copies: 7, available: 5, shelf: "Shelf E1 - Floor 1", isbn: "978-604-1-05432-7", desc: "A Vietnamese children's literary masterpiece about the adventures of Dế Mèn through the insect world. The work contains many profound life lessons about courage and friendship.", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=420&fit=crop&auto=format" },
  { id: 12, title: "Số Đỏ", author: "Vu Trong Phung", genre: "Vietnamese Literature", year: 2017, copies: 4, available: 3, shelf: "Shelf E2 - Floor 1", isbn: "978-604-1-04321-5", desc: "A classic satirical novel of modern Vietnamese literature. The story of Xuân Tóc Đỏ — an opportunist climbing to the heights of society — exposes the moral decay of the upper class.", cover: "https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?w=300&h=420&fit=crop&auto=format" },
  { id: 13, title: "Tắt Đèn", author: "Ngo Tat To", genre: "Vietnamese Literature", year: 2016, copies: 3, available: 0, shelf: "Shelf E3 - Floor 1", isbn: "978-604-1-03210-3", desc: "A vivid portrait of Vietnamese rural society under French colonial rule. Chị Dậu — a symbol of a woman who endures and resists — becomes an icon of unyielding struggle.", cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&h=420&fit=crop&auto=format" },
  { id: 14, title: "Lập Trình Python Cơ Bản", author: "Nguyen Thanh Tung", genre: "Technology", year: 2023, copies: 6, available: 4, shelf: "Shelf F1 - Floor 2", isbn: "978-604-1-14000-5", desc: "A comprehensive Python textbook from basic syntax to object-oriented programming. Suitable for beginners with many hands-on exercises and practical demonstration projects.", cover: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=420&fit=crop&auto=format" },
  { id: 15, title: "Trí Tuệ Nhân Tạo: Một Góc Nhìn Mới", author: "Stuart Russell", genre: "Technology", year: 2022, copies: 3, available: 2, shelf: "Shelf F2 - Floor 2", isbn: "978-604-1-13500-1", desc: "A comprehensive overview of artificial intelligence from its history to modern applications. Russell analyzes machine learning, neural networks, and the ethical challenges of AI.", cover: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=420&fit=crop&auto=format" },
  { id: 16, title: "Bắt Trẻ Đồng Xanh", author: "J.D. Salinger", genre: "Fiction", year: 2014, copies: 2, available: 1, shelf: "Shelf A5 - Floor 2", isbn: "978-604-77-0112-9", desc: "A legendary novel about Holden Caulfield — a rebellious teenager wandering New York after being expelled from school. A classic about alienation and the search for youthful identity.", cover: "https://images.unsplash.com/photo-1474366521628-c0ea16c3a3a1?w=300&h=420&fit=crop&auto=format" },
  { id: 17, title: "Toán Cao Cấp Tập 1", author: "Nguyen Dinh Tri", genre: "Education", year: 2021, copies: 10, available: 7, shelf: "Shelf C1 - Floor 1", isbn: "978-604-1-11000-1", desc: "A fundamental mathematics textbook for university students. Covers calculus, linear algebra, and differential equations with a rich system of exercises from basic to advanced.", cover: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=420&fit=crop&auto=format" },
  { id: 18, title: "Lịch Sử Việt Nam Toàn Tập", author: "Various Authors", genre: "History", year: 2020, copies: 5, available: 3, shelf: "Shelf D3 - Floor 3", isbn: "978-604-1-10500-0", desc: "A comprehensive historical work on Vietnam's 4,000-year journey of nation-building and defense. From the Hùng Kings era to the August Revolution, it faithfully records historical events.", cover: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=300&h=420&fit=crop&auto=format" },
  { id: 19, title: "Kinh Tế Học Vi Mô", author: "N. Gregory Mankiw", genre: "Economics", year: 2022, copies: 4, available: 0, shelf: "Shelf G1 - Floor 2", isbn: "978-604-1-13200-0", desc: "The world's leading microeconomics textbook. Mankiw presents supply and demand, market structure, and policy analysis in accessible language with vivid real-world examples.", cover: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=420&fit=crop&auto=format" },
  { id: 20, title: "Cây Cam Ngọt Của Tôi", author: "José Mauro de Vasconcelos", genre: "Fiction", year: 2021, copies: 6, available: 4, shelf: "Shelf A6 - Floor 2", isbn: "978-604-1-12500-6", desc: "A touching story about 5-year-old Zezé, a poor boy in Brazil with a rich imagination and sensitive soul. A moving work about love and the pain of childhood.", cover: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=420&fit=crop&auto=format" },
  { id: 21, title: "Đất Rừng Phương Nam", author: "Doan Gioi", genre: "Vietnamese Literature", year: 2019, copies: 5, available: 3, shelf: "Shelf E4 - Floor 1", isbn: "978-604-1-05980-4", desc: "A classic adventure novel of Vietnamese children's literature. Young An wanders into the wild southern region, discovering its majestic nature and honest-hearted people.", cover: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=300&h=420&fit=crop&auto=format" },
  { id: 22, title: "Chí Phèo", author: "Nam Cao", genre: "Vietnamese Literature", year: 2018, copies: 4, available: 2, shelf: "Shelf E5 - Floor 1", isbn: "978-604-1-04567-7", desc: "Nam Cao's finest short story about the tragedy of moral degradation. Chí Phèo — transformed from an honest farmer into a villain — is a cry of anguish for the right to be human.", cover: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=300&h=420&fit=crop&auto=format" },
  { id: 23, title: "Mắt Biếc", author: "Nguyen Nhat Anh", genre: "Fiction", year: 2020, copies: 7, available: 5, shelf: "Shelf A7 - Floor 2", isbn: "978-604-1-12890-8", desc: "A pure and yearning love story from school days. Ngạn loves Hà Lan with innocent devotion that is never returned — a sad, poetic love story.", cover: "https://images.unsplash.com/photo-1530435460869-d13625c69bbf?w=300&h=420&fit=crop&auto=format" },
  { id: 24, title: "Binh Pháp Ton Tu", author: "Ton Tu", genre: "History", year: 2017, copies: 3, available: 1, shelf: "Shelf D4 - Floor 3", isbn: "978-604-77-4890-2", desc: "The greatest classical military treatise of all time. Its 13 concise chapters contain profound tactical philosophy, widely applied in business, management, and everyday life.", cover: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=300&h=420&fit=crop&auto=format" },
  { id: 25, title: "Tôi Tài Giỏi, Bạn Cũng Thế!", author: "Adam Khoo", genre: "Self-Help", year: 2022, copies: 8, available: 6, shelf: "Shelf B4 - Floor 1", isbn: "978-604-1-09500-6", desc: "The best-selling inspirational book on smart learning methods. Adam Khoo — from a poor student to a millionaire — shares the secrets to unlocking personal potential.", cover: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=300&h=420&fit=crop&auto=format" },
  { id: 26, title: "Clean Code", author: "Robert C. Martin", genre: "Technology", year: 2023, copies: 4, available: 3, shelf: "Shelf F3 - Floor 2", isbn: "978-604-1-14500-0", desc: "The definitive guide to writing clean code for professional developers. Uncle Bob teaches how to name variables, organize functions, and build sustainable, maintainable software architecture.", cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=420&fit=crop&auto=format" },
  { id: 27, title: "Kinh Tế Học Vĩ Mô", author: "N. Gregory Mankiw", genre: "Economics", year: 2022, copies: 5, available: 0, shelf: "Shelf G2 - Floor 2", isbn: "978-604-1-13300-9", desc: "The globally standard macroeconomics textbook. Mankiw analyzes GDP, inflation, unemployment, and monetary-fiscal policy in clear language with rich practical examples.", cover: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=420&fit=crop&auto=format" },
  { id: 28, title: "Vợ Nhặt", author: "Kim Lan", genre: "Vietnamese Literature", year: 2016, copies: 3, available: 2, shelf: "Shelf E6 - Floor 1", isbn: "978-604-1-03890-7", desc: "An outstanding short story about the 1945 famine. Through the story of Tràng taking a wife, Kim Lan portrays an intense will to live and warm humanity in the most tragic of circumstances.", cover: "https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?w=300&h=420&fit=crop&auto=format" },
  { id: 29, title: "Xứ Cát (Dune)", author: "Frank Herbert", genre: "Fiction", year: 2021, copies: 3, available: 1, shelf: "Shelf A8 - Floor 2", isbn: "978-604-1-12800-7", desc: "The greatest science fiction epic of the 20th century. On the barren planet Arrakis — sole source of the powerful spice — Paul Atreides becomes the leader who shapes the fate of the entire universe.", cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=420&fit=crop&auto=format" },
  { id: 30, title: "Nhà Lãnh Đạo Không Chức Danh", author: "Robin Sharma", genre: "Self-Help", year: 2023, copies: 6, available: 4, shelf: "Shelf B5 - Floor 1", isbn: "978-604-1-09800-7", desc: "A book about the art of leading without a title. Sharma shares the philosophy that anyone can create great influence from any position through ethics and mindset.", cover: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300&h=420&fit=crop&auto=format" },
];

type BorrowRecord = { id: string; title: string; borrowDate: string; dueDate: string; returnDate: string | null; status: string; fine: number; renewCount: number };

interface UserProfile {
  name: string; initials: string; cardId: string; email: string;
  phone: string; cccd: string; dob: string; address: string;
  cardIssued: string; cardExpiry: string;
  borrowHistory: BorrowRecord[]; wishlistIds: number[];
}

const USER_PROFILES: Record<string, UserProfile> = {
  default: {
    name: "Nguyen Thi An", initials: "NA", cardId: "DR-2024-0142",
    email: "an.nguyen@email.com", phone: "0912 345 678", cccd: "079 123 456 789",
    dob: "15/03/1998", address: "123 Nguyen Trai, Ward Binh Tri Dong, Binh Tan District, HCMC",
    cardIssued: "01/01/2024", cardExpiry: "01/01/2026",
    borrowHistory: [
      { id: "PM001", title: "Đắc Nhân Tâm", borrowDate: "01/07/2026", dueDate: "21/07/2026", returnDate: "19/07/2026", status: "Returned", fine: 0, renewCount: 0 },
      { id: "PM002", title: "Sapiens: Lược Sử Loài Người", borrowDate: "10/07/2026", dueDate: "30/07/2026", returnDate: null, status: "On Loan", fine: 0, renewCount: 1 },
      { id: "PM003", title: "Atomic Habits", borrowDate: "05/06/2026", dueDate: "25/06/2026", returnDate: "28/06/2026", status: "Overdue", fine: 9000, renewCount: 2 },
      { id: "PM004", title: "Nhà Giả Kim", borrowDate: "15/08/2026", dueDate: "04/09/2026", returnDate: null, status: "Due Soon", fine: 0, renewCount: 4 },
    ],
    wishlistIds: [2, 4, 6],
  },
  staff: {
    name: "Tran Van Lam", initials: "VL", cardId: "DR-STAFF-001",
    email: "lam.tran@library.vn", phone: "0901 234 567", cccd: "001 234 567 890",
    dob: "12/05/1988", address: "456 Dinh Bo Linh, Ward 26, Binh Thanh District, HCMC",
    cardIssued: "15/01/2020", cardExpiry: "15/01/2027",
    borrowHistory: [
      { id: "ST001", title: "Đắc Nhân Tâm", borrowDate: "05/06/2026", dueDate: "25/06/2026", returnDate: "22/06/2026", status: "Returned", fine: 0, renewCount: 0 },
      { id: "ST002", title: "Lập Trình Python Cơ Bản", borrowDate: "10/08/2026", dueDate: "30/08/2026", returnDate: null, status: "On Loan", fine: 0, renewCount: 1 },
    ],
    wishlistIds: [3, 7],
  },
  admin: {
    name: "Pham Trung Kien", initials: "TK", cardId: "DR-ADMIN-001",
    email: "kien.pham@library.vn", phone: "0909 876 543", cccd: "074 111 222 333",
    dob: "28/11/1985", address: "789 Le Van Sy, Ward 14, District 3, HCMC",
    cardIssued: "01/09/2018", cardExpiry: "01/09/2028",
    borrowHistory: [
      { id: "AD001", title: "Homo Deus: Lược Sử Tương Lai", borrowDate: "01/06/2026", dueDate: "21/06/2026", returnDate: "20/06/2026", status: "Returned", fine: 0, renewCount: 0 },
      { id: "AD002", title: "Kinh Tế Học Vi Mô", borrowDate: "15/07/2026", dueDate: "04/08/2026", returnDate: "06/08/2026", status: "Overdue", fine: 4000, renewCount: 1 },
      { id: "AD003", title: "Trí Tuệ Nhân Tạo: Một Góc Nhìn Mới", borrowDate: "01/08/2026", dueDate: "21/08/2026", returnDate: null, status: "On Loan", fine: 0, renewCount: 2 },
    ],
    wishlistIds: [1, 5, 15],
  },
};

const GENRES = ["All", "Self-Help", "Fiction", "Education", "History", "Vietnamese Literature", "Technology", "Economics"];

const CATALOG_COVERS = [
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=420&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=420&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=420&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1509266272358-7701da638078?w=300&h=420&fit=crop&auto=format",
];

type BackendBook = {
  bookId: string;
  title: string;
  description: string;
  publication: string;
  stockQuantity: number;
  status: string;
  authorName: string;
  publisherName: string;
  categoryName: string;
};

function mapBackendBook(book: BackendBook, index: number): typeof BOOKS[0] {
  const id = Number(book.bookId.replace(/\D/g, "")) || index + 1;
  const available = book.status.toLowerCase() === "available" ? book.stockQuantity : 0;
  return {
    id,
    title: book.title,
    author: book.authorName,
    genre: book.categoryName || "Other",
    year: Number(book.publication?.slice(0, 4)) || new Date().getFullYear(),
    copies: book.stockQuantity,
    available,
    shelf: "Library collection",
    isbn: book.bookId,
    desc: book.description,
    cover: CATALOG_COVERS[index % CATALOG_COVERS.length],
  };
}

// ── Date utilities ─────────────────────────────────────────────────────────────
function parseDMY(dmy: string): Date {
  const [d, m, y] = dmy.split("/").map(Number);
  return new Date(y, m - 1, d);
}
function formatDMY(date: Date): string {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}
function addDays(dmy: string, days: number): string {
  const d = parseDMY(dmy);
  d.setDate(d.getDate() + days);
  return formatDMY(d);
}
function todayDMY(): string {
  return formatDMY(new Date());
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ toasts, onDismiss }: { toasts: ToastItem[]; onDismiss: (id: number) => void }) {
  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2" style={{ minWidth: 280, maxWidth: 360 }}>
      {toasts.map(t => (
        <div
          key={t.id}
          className="bg-green-600 text-white rounded-xl shadow-2xl px-4 py-3 flex items-start gap-3"
          style={{ animation: "fadeInSlide 0.25s ease" }}
        >
          <div className="flex-1">
            <p className="font-semibold text-sm leading-snug">{t.title}</p>
            {t.sub && <p className="text-green-100 text-xs mt-0.5 whitespace-pre-line leading-snug">{t.sub}</p>}
          </div>
          <button onClick={() => onDismiss(t.id)} className="text-green-200 hover:text-white text-lg leading-none mt-0.5">✕</button>
        </div>
      ))}
      <style>{`@keyframes fadeInSlide { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}

// ── QR placeholder ────────────────────────────────────────────────────────────
function QRPlaceholder({ size = 96, value }: { size?: number; value: string }) {
  const cells = 9; const cell = size / cells;
  const pattern = [[1,1,1,1,1,1,1,0,0],[1,0,0,0,0,0,1,0,1],[1,0,1,1,1,0,1,0,0],[1,0,1,1,1,0,1,0,1],[1,0,1,1,1,0,1,0,0],[1,0,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0,1],[0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1]];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
      <rect width={size} height={size} fill="white" />
      {pattern.map((row, r) => row.map((v, c) => v ? <rect key={`${r}-${c}`} x={c*cell} y={r*cell} width={cell} height={cell} fill="#0f172a" /> : null))}
      <title>{value}</title>
    </svg>
  );
}

// ── Book Detail Modal ─────────────────────────────────────────────────────────
function BookModal({ book, onClose, onReserve, onToggleWishlist, reserved, inWishlist, loggedIn, onLoginRequest }: {
  book: typeof BOOKS[0]; onClose: () => void;
  onReserve: (id: number) => void;
  onToggleWishlist: (book: typeof BOOKS[0]) => void;
  reserved: boolean; inWishlist: boolean; loggedIn: boolean;
  onLoginRequest: () => void;
}) {
  const today = new Date();
  const reserveDate = today.toLocaleDateString("en-GB");
  const dueDate = new Date(today.getTime() + 7 * 86400000).toLocaleDateString("en-GB");
  const [loginHint, setLoginHint] = useState(false);
  const [showReserveConfirm, setShowReserveConfirm] = useState(false);
  const [reserveSuccessToast, setReserveSuccessToast] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
      {/* Login hint toast inside modal */}
      {loginHint && (
        <div className="absolute top-4 left-1/2 z-50 flex items-center gap-3 bg-amber-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-2xl" style={{ transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
          <span>❤️ Please sign in to save books to your wishlist!</span>
          <button
            className="flex-shrink-0 bg-white text-amber-700 rounded-lg px-2.5 py-1 text-xs font-bold hover:bg-amber-50 transition-colors"
            onClick={() => { setLoginHint(false); onLoginRequest(); }}
          >
            Sign In
          </button>
        </div>
      )}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex gap-0">
          {/* Cover + heart */}
          <div className="w-44 flex-shrink-0 relative">
            <img src={book.cover} alt={book.title} className="w-full h-full object-cover" style={{ minHeight: 360 }} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (loggedIn) { onToggleWishlist(book); }
                else {
                  setLoginHint(true);
                  setTimeout(() => setLoginHint(false), 5000);
                }
              }}
              className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all ${inWishlist ? "bg-red-500" : "bg-white/80 hover:bg-white"}`}
              title={loggedIn ? (inWishlist ? "Remove from wishlist" : "Add to wishlist") : "Sign in to save to wishlist"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={inWishlist ? "white" : "none"} stroke={inWishlist ? "white" : "#ef4444"} strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 p-6 flex flex-col overflow-y-auto" style={{ maxHeight: 520 }}>
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors text-sm">✕</button>

            <div className="mb-3">
              <span className="badge badge-blue text-xs mb-2">{book.genre}</span>
              <h2 className="text-xl font-bold text-slate-900 leading-tight mt-1">{book.title}</h2>
              <p className="text-slate-500 text-sm mt-1">Author: <span className="font-semibold text-slate-700">{book.author}</span> · {book.year}</p>
            </div>

            <div className="flex items-center gap-3 mb-3">
              {book.available > 0 ? <span className="badge badge-green">{book.available} of {book.copies} available</span> : <span className="badge badge-red">Unavailable</span>}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">{book.desc}</p>

            <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
              <div className="bg-slate-50 rounded-lg p-2.5">
                <p className="text-slate-400 mb-0.5">Shelf Location</p>
                <p className="font-bold text-slate-800">📍 {book.shelf}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2.5">
                <p className="text-slate-400 mb-0.5">ISBN</p>
                <p className="font-mono font-semibold text-slate-700 text-xs">{book.isbn}</p>
              </div>
            </div>

            {reserved && (
              <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1.5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="badge badge-amber text-xs">⏳ Pending Approval</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Reserved On:</span>
                  <span className="font-semibold text-slate-700">{reserveDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Expected Pickup:</span>
                  <span className="font-semibold text-blue-700">{dueDate}</span>
                </div>
                <p className="text-amber-600 text-xs">The library will notify you when your request is confirmed</p>
              </div>
            )}

            <div className="flex items-center gap-4 mb-4 p-3 bg-slate-50 rounded-xl">
              <QRPlaceholder size={64} value={book.isbn} />
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-1">Book copy barcode</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div key={i} className="w-0.5 bg-slate-800 rounded-full" style={{ height: i%3===0?26:i%5===0?18:22 }} />
                  ))}
                </div>
                <p className="font-mono text-xs text-slate-500 mt-1">SKU{String(book.id).padStart(3,"0")}-{book.available>0?"01":"—"}</p>
              </div>
            </div>

            <div className="mt-auto flex gap-2">
              {!loggedIn ? (
                <button
                  className="btn-primary flex-1 justify-center"
                  style={{ padding: "10px 16px" }}
                  onClick={() => { onClose(); onLoginRequest(); }}
                >
                  🔐 Sign In to Reserve
                </button>
              ) : reserved ? (
                <button className="btn-secondary flex-1 justify-center" style={{ padding: "10px 16px" }} disabled>
                  ⌛ Pending Approval
                </button>
              ) : book.available > 0 ? (
                <button className="btn-primary flex-1 justify-center" style={{ padding: "10px 16px" }} onClick={() => setShowReserveConfirm(true)}>
                  Reserve Book
                </button>
              ) : (
                <button className="btn-secondary flex-1 justify-center" style={{ padding: "10px 16px" }} disabled>
                  Unavailable
                </button>
              )}
              <button className="btn-secondary" style={{ padding: "10px 16px" }} onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* Reserve confirmation modal */}
      {reserveSuccessToast && (
        <div className="fixed top-16 right-4 z-[70] bg-blue-700 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-2xl">
          ✓ Reservation request sent successfully!
        </div>
      )}

      {showReserveConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={() => setShowReserveConfirm(false)}>
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl">📚</div>
              <div>
                <h3 className="font-bold text-slate-900">Reserve Book</h3>
                <p className="text-slate-500 text-xs">{book.title}</p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 mb-4 space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Book</span><span className="font-semibold text-slate-800">{book.title}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Reserve Date</span><span className="font-semibold">{reserveDate}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Expected Pickup</span><span className="font-semibold text-blue-700">{dueDate}</span></div>
            </div>
            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-4">The library will notify you when your request is confirmed. Please pick up the book before the expected date.</p>
            <div className="flex gap-2">
              <button className="btn-secondary flex-1 justify-center" style={{ padding: "10px" }} onClick={() => setShowReserveConfirm(false)}>← Go Back</button>
              <button className="btn-primary flex-1 justify-center" style={{ padding: "10px" }} onClick={() => { onReserve(book.id); setShowReserveConfirm(false); setReserveSuccessToast(true); setTimeout(() => setReserveSuccessToast(false), 4000); }}>Confirm Reservation</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── AI Chatbot ────────────────────────────────────────────────────────────────
const BOT_REPLIES: Record<string,string> = {
  default: "I can help you find books by topic, author, or genre. Tell me what you're looking for!",
  sach: "What type of book are you looking for? The library has: Fiction, History, Self-Help, Technology, Vietnamese Literature...",
  ky_nang: "Recommended self-help books: 📚 Đắc Nhân Tâm (Dale Carnegie), Atomic Habits (James Clear), Nghĩ Giàu Làm Giàu (Napoleon Hill).",
  lich_su: "Great history books: 📖 Sapiens & Homo Deus (Yuval Harari), Lịch Sử Việt Nam Toàn Tập — all available at Shelf D.",
  tieu_thuyet: "Featured fiction: Nhà Giả Kim, Rừng Na-Uy, Cây Cam Ngọt Của Tôi, Người Đua Diều. Some titles are currently unavailable — you can reserve a copy!",
  cong_nghe: "Technology books: Lập Trình Python Cơ Bản (Shelf F1) and Trí Tuệ Nhân Tạo (Shelf F2) are currently available.",
  muon: "To borrow a book, you need a valid reader card. Visit the librarian's desk with your card ID!",
  gia_han: "You can renew books online in the Borrow History section (sign-in required), or visit the librarian's desk.",
};
function getChatReply(msg: string) {
  const m = msg.toLowerCase();
  if (m.includes("self-help")||m.includes("habit")||m.includes("wealth")||m.includes("rich")||m.includes("skill")) return BOT_REPLIES.ky_nang;
  if (m.includes("history")||m.includes("harari")||m.includes("sapiens")) return BOT_REPLIES.lich_su;
  if (m.includes("fiction")||m.includes("novel")||m.includes("story")) return BOT_REPLIES.tieu_thuyet;
  if (m.includes("technology")||m.includes("tech")||m.includes("python")||m.includes("programming")||m.includes("code")||m.includes("ai")) return BOT_REPLIES.cong_nghe;
  if (m.includes("borrow")||m.includes("card")||m.includes("reader")) return BOT_REPLIES.muon;
  if (m.includes("renew")||m.includes("due")||m.includes("extend")) return BOT_REPLIES.gia_han;
  if (m.includes("book")||m.includes("find")||m.includes("search")||m.includes("look")) return BOT_REPLIES.sach;
  return BOT_REPLIES.default;
}
function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role:"bot", text:"Hello! I'm the AI book search assistant. What type of book are you looking for?" }]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs]);
  const send = () => {
    if (!input.trim()) return;
    const u = input.trim(); setInput("");
    setMsgs(p=>[...p,{role:"user",text:u}]);
    setTimeout(()=>setMsgs(p=>[...p,{role:"bot",text:getChatReply(u)}]),600);
  };
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="card w-80 shadow-2xl flex flex-col" style={{ height:380 }}>
          <div className="flex items-center gap-2 px-4 py-3 bg-blue-600 rounded-t-xl">
            <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-sm">🤖</div>
            <div className="flex-1"><p className="text-white text-sm font-bold">AI Book Assistant</p><div className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span><span className="text-blue-200 text-xs">Online</span></div></div>
            <button onClick={()=>setOpen(false)} className="text-white/70 hover:text-white text-lg leading-none">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-50">
            {msgs.map((m,i)=>(
              <div key={i} className={`flex ${m.role==="user"?"justify-end":"justify-start"}`}>
                {m.role==="bot"&&<div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs mr-1.5 mt-0.5 flex-shrink-0">🤖</div>}
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${m.role==="user"?"bg-blue-600 text-white rounded-br-sm":"bg-white text-slate-700 border border-slate-200 rounded-bl-sm"}`}>{m.text}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className="p-3 border-t border-slate-200 flex gap-2 bg-white rounded-b-xl">
            <input className="input-field text-sm flex-1" placeholder="Type your question..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} />
            <button className="btn-primary flex-shrink-0" style={{padding:"8px 14px"}} onClick={send}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg></button>
          </div>
        </div>
      )}
      <button onClick={()=>setOpen(o=>!o)} className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl flex items-center justify-center text-2xl transition-all hover:scale-105 active:scale-95">
        {open?"✕":"🤖"}
      </button>
      {!open&&<span className="text-xs text-slate-500 bg-white border border-slate-200 rounded-full px-2 py-0.5 shadow-sm">Book search assistant</span>}
    </div>
  );
}

// ── OPAC Grid ─────────────────────────────────────────────────────────────────
function OPACSearch({ loggedIn, wishlist, onToggleWishlist, onLoginRequest, readerId }: { loggedIn: boolean; wishlist: number[]; onToggleWishlist: (id: number) => void; onLoginRequest: () => void; readerId: string | null }) {
  const [query, setQuery] = useState("");
  const [filterGenre, setFilterGenre] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [reservedBooks, setReservedBooks] = useState<number[]>([]);
  const [selectedBook, setSelectedBook] = useState<typeof BOOKS[0]|null>(null);
  const [books, setBooks] = useState<typeof BOOKS>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;
    api.get<{ data: { content: BackendBook[] } }>("/books/search?page=0&size=100")
      .then(response => {
        if (active) setBooks(response.data.data.content.map(mapBackendBook));
      })
      .catch(() => {
        if (active) setLoadError("Unable to load books from the library server.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const filtered = books.filter(b=>{
    const q = query.toLowerCase();
    return (!q||b.title.toLowerCase().includes(q)||b.author.toLowerCase().includes(q)||b.genre.toLowerCase().includes(q))
      && (filterGenre==="All"||b.genre===filterGenre)
      && (filterStatus==="All"||(filterStatus==="Available"&&b.available>0)||(filterStatus==="Unavailable"&&b.available===0));
  });
  const hasFilters = query||filterGenre!=="All"||filterStatus!=="All";

  return (
    <>
      <div>
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Book Catalog</h1>
          <p className="text-slate-500 text-sm">Click on a book cover to view details, reserve a copy, or save to your wishlist</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-5 shadow-sm">
          <div className="flex gap-2 mb-3">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></span>
              <input className="input-field pl-9" placeholder="Search by title, author, or keyword..." value={query} onChange={e=>setQuery(e.target.value)} />
            </div>
            <button className="btn-primary">Search</button>
            {hasFilters&&<button className="btn-secondary text-red-500 border-red-200 hover:bg-red-50" onClick={()=>{setQuery("");setFilterGenre("All");setFilterStatus("All");}}>✕ Clear Filters</button>}
          </div>
          <div className="flex gap-2 flex-wrap justify-between">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold text-slate-500">Genre:</span>
              {GENRES.map(g=>(
                <button key={g} onClick={()=>setFilterGenre(g)} className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${filterGenre===g?"bg-blue-600 text-white border-blue-600":"bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600"}`}>{g}</button>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-500">Status:</span>
              {["All","Available","Unavailable"].map(s=>(
                <button key={s} onClick={()=>setFilterStatus(s)} className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${filterStatus===s?"bg-slate-800 text-white border-slate-800":"bg-white text-slate-500 border-slate-200 hover:border-slate-400"}`}>{s}</button>
              ))}
            </div>
          </div>
        </div>
        {loading && <p className="text-sm text-slate-500 mb-4">Loading books...</p>}
        {loadError && <p className="text-sm text-red-600 mb-4">{loadError}</p>}
        {!loading && !loadError && <p className="text-sm text-slate-500 mb-4">Found <span className="text-blue-600 font-bold">{filtered.length}</span> results</p>}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(book=>(
            <div key={book.id} className="group cursor-pointer" onClick={()=>setSelectedBook(book)}>
              <div className="relative overflow-hidden rounded-xl bg-slate-100 mb-2 shadow-sm group-hover:shadow-md transition-shadow" style={{aspectRatio:"3/4"}}>
                <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2"><span className="text-white text-xs font-semibold">View Details →</span></div>
                <div className="absolute top-2 right-2">{book.available>0?<span className="badge badge-green" style={{fontSize:10,padding:"2px 7px"}}>{book.available} left</span>:<span className="badge badge-red" style={{fontSize:10,padding:"2px 7px"}}>Out</span>}</div>
                {wishlist.includes(book.id)&&<div className="absolute top-2 left-2"><span className="text-red-500 text-base drop-shadow">♥</span></div>}
                {reservedBooks.includes(book.id)&&<div className="absolute bottom-2 left-2"><span className="badge" style={{fontSize:10,padding:"2px 7px",background:"#7c3aed",color:"#fff"}}>Reserved</span></div>}
              </div>
              <h3 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">{book.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5 truncate">{book.author}</p>
              <span className="text-xs text-slate-400">{book.genre}</span>
            </div>
          ))}
        </div>
        {filtered.length===0&&<div className="text-center py-16 text-slate-400"><div className="text-5xl mb-3">🔍</div><p className="text-lg font-semibold">No matching books found</p><p className="text-sm">Try a different keyword or clear filters</p></div>}
      </div>

      {selectedBook&&(
        <BookModal
          book={selectedBook}
          onClose={()=>setSelectedBook(null)}
          onReserve={async id=>{
            if (!readerId) return;
            const copyResponse = await api.get<{ data: Array<{ copyId: string; status: string }> }>(`/books/${selectedBook.isbn}/copies`);
            const availableCopy = copyResponse.data.data.find(copy => copy.status.toLowerCase() === "available");
            if (!availableCopy) return;
            await api.post("/reservations", { readerId, copyId: availableCopy.copyId });
            setReservedBooks(p=>[...p,id]);
          }}
          onToggleWishlist={book=>{
            if (readerId && !wishlist.includes(book.id)) {
              api.post("/wishlist", { readerId, bookId: book.isbn }).catch(() => undefined);
            }
            onToggleWishlist(book.id);
          }}
          reserved={reservedBooks.includes(selectedBook.id)}
          inWishlist={wishlist.includes(selectedBook.id)}
          loggedIn={loggedIn}
          onLoginRequest={() => { setSelectedBook(null); onLoginRequest(); }}
        />
      )}
      <ChatbotWidget />
    </>
  );
}

// ── 2-Step Registration Form ──────────────────────────────────────────────────
function RegisterForm({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1);
  const [step1, setStep1] = useState({ name:"", dob:"", gender:"Male", phone:"", email:"", cccd:"", address:"" });
  const [step2, setStep2] = useState({ password:"", confirm:"", captchaInput:"" });
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const CAPTCHA = "K7M2P";

  const passwordStrength = (pw: string) => {
    if (!pw) return 0;
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };
  const strength = passwordStrength(step2.password);
  const strengthColors = ["bg-red-400","bg-red-400","bg-amber-400","bg-yellow-400","bg-green-500"];
  const strengthLabels = ["","Weak","Fair","Good","Strong"];
  const mismatch = step2.confirm && step2.password !== step2.confirm;
  const captchaWrong = step2.captchaInput && step2.captchaInput.toUpperCase() !== CAPTCHA;

  if (success) return (
    <div className="max-w-md mx-auto mt-10 card p-8 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">Registration successful!</h2>
      <p className="text-slate-500 text-sm mb-6">Your account is pending approval from the library. We will notify you by email.</p>
      <button className="btn-primary w-full justify-center" onClick={onBack}>Back to Sign In</button>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto mt-6">
      {/* Card with gradient header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Gradient header bar */}
        <div className="px-8 py-6" style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)" }}>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Create Account</h2>
              <p className="text-blue-200 text-xs">For New Readers</p>
            </div>
          </div>
          <p className="text-blue-100 text-sm mt-2">LibraVN</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-4 pt-5 px-8">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${step>=1?"bg-blue-600 text-white":"bg-slate-200 text-slate-500"}`}>1</div>
          <div className={`h-0.5 w-20 transition-colors ${step>=2?"bg-blue-600":"bg-slate-300"}`} />
          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${step>=2?"bg-blue-600 text-white":"bg-slate-200 text-slate-500"}`}>2</div>
        </div>

        <div className="p-6">
          {step===1 ? (
            <>
              <h3 className="font-bold text-slate-800 mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                  <input className="input-field" placeholder="John Smith" value={step1.name} onChange={e=>setStep1({...step1,name:e.target.value})} required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth <span className="text-red-500">*</span></label>
                    <input type="date" className="input-field" value={step1.dob} onChange={e=>setStep1({...step1,dob:e.target.value})} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Gender <span className="text-red-500">*</span></label>
                    <select className="input-field" value={step1.gender} onChange={e=>setStep1({...step1,gender:e.target.value})}>
                      <option>Male</option><option>Female</option><option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                    <input className="input-field" placeholder="0901 234 567" value={step1.phone} onChange={e=>setStep1({...step1,phone:e.target.value})} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email <span className="text-red-500">*</span></label>
                    <input type="email" className="input-field" placeholder="email@example.com" value={step1.email} onChange={e=>setStep1({...step1,email:e.target.value})} required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">National ID Number <span className="text-red-500">*</span></label>
                  <input className="input-field" placeholder="012345678901" value={step1.cccd} onChange={e=>setStep1({...step1,cccd:e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Permanent Address <span className="text-red-500">*</span></label>
                  <input className="input-field" placeholder="123 Main Street, District 3, Ho Chi Minh City" value={step1.address} onChange={e=>setStep1({...step1,address:e.target.value})} required />
                </div>
                <button
                  className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all btn-primary justify-center"
                  onClick={()=>{if(step1.name&&step1.dob&&step1.phone&&step1.email&&step1.cccd&&step1.address)setStep(2);}}
                >
                  Next →
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className="font-bold text-slate-800 mb-4">Account Setup</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password <span className="text-red-500">*</span></label>
                  <input type="password" className="input-field" placeholder="Enter password..." value={step2.password} onChange={e=>setStep2({...step2,password:e.target.value})} required />
                  {step2.password && (
                    <div className="mt-2">
                      <div className="flex gap-1">
                        {[1,2,3,4].map(i=>(
                          <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${strength>=i?strengthColors[strength]:"bg-slate-200"}`} />
                        ))}
                      </div>
                      <p className={`text-xs mt-1 font-medium ${strength<=1?"text-red-500":strength<=2?"text-amber-500":"text-green-600"}`}>{strengthLabels[strength]}</p>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password <span className="text-red-500">*</span></label>
                  <input type="password" className={`input-field ${mismatch?"border-red-400 ring-2 ring-red-100":""}`} placeholder="Re-enter password..." value={step2.confirm} onChange={e=>setStep2({...step2,confirm:e.target.value})} required />
                  {mismatch&&<p className="text-red-500 text-xs mt-1 font-medium">Passwords do not match</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Verification Code (Captcha) <span className="text-red-500">*</span></label>
                  <div className="flex gap-3 items-center">
                    <div className="px-4 py-2.5 bg-slate-100 border-2 border-slate-300 rounded-lg font-mono font-black text-slate-800 tracking-[0.3em] text-lg select-none" style={{ letterSpacing: "0.35em", textDecoration: "line-through", textDecorationStyle: "wavy", textDecorationColor: "#94a3b8" }}>
                      {CAPTCHA}
                    </div>
                    <input className={`input-field flex-1 font-mono tracking-widest ${captchaWrong?"border-red-400":""}`} placeholder="Enter code..." value={step2.captchaInput} onChange={e=>setStep2({...step2,captchaInput:e.target.value})} required />
                  </div>
                  {captchaWrong&&<p className="text-red-500 text-xs mt-1">Incorrect verification code</p>}
                </div>
                <div className="flex gap-3 pt-1">
                  <button className="flex-1 py-3 rounded-xl text-slate-700 font-semibold text-sm border-2 border-slate-300 hover:bg-slate-50 transition-all" onClick={()=>setStep(1)}>← Back</button>
                  <button
                    className="flex-1 py-3 rounded-xl text-white font-semibold text-sm transition-all btn-primary justify-center"
                    disabled={submitting}
                    onClick={async ()=>{
                      if (!step2.password || mismatch || step2.captchaInput.toUpperCase() !== CAPTCHA) return;
                      setSubmitting(true);
                      setError("");
                      try {
                        await api.post("/readers/register", {
                          fullName: step1.name,
                          username: step1.email,
                          password: step2.password,
                          email: step1.email,
                          phone: step1.phone,
                          gender: step1.gender,
                          dob: step1.dob,
                          address: step1.address,
                          cccd: step1.cccd,
                        });
                        setSuccess(true);
                      } catch {
                        setError("Registration failed. Please check your information and try again.");
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                  >
                    {submitting ? "Registering..." : "Register"}
                  </button>
                </div>
                {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
              </div>
            </>
          )}

          <div className="mt-4 text-center text-sm">
            <span className="text-slate-500">Already have an account? <button className="text-blue-600 font-semibold hover:underline" onClick={onBack}>Sign In</button></span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Login Form ────────────────────────────────────────────────────────────────
function LoginForm({ setView, onLogin }: { setView: (v: PortalView) => void; onLogin: (userId: string) => void }) {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    setError("");
    try {
      const response = await api.post<{ data: { token: string; role: string; userId: string } }>("/auth/login", {
        username: email.trim(),
        password,
      });
      const role = response.data.data.role?.replace("ROLE_", "");
      if (role !== "READER") throw new Error("Please use the staff login for this account.");
      localStorage.setItem("library_access_token", response.data.data.token);
      onLogin(response.data.data.userId);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Incorrect email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="card overflow-hidden p-0">
        {/* Gradient header */}
        <div className="px-8 py-6" style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Sign In</h2>
              <p className="text-blue-200 text-xs">LibraVN</p>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label><input className="input-field" type="email" placeholder="email@example.com" value={email} onChange={e=>setEmail(e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label><input className="input-field" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} /></div>
            <div className="text-right"><button className="text-sm text-blue-600 font-medium hover:underline" onClick={()=>setView("forgot")}>Forgot your password?</button></div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button className="btn-primary w-full justify-center" style={{padding:"12px 20px"}} onClick={handleLogin} disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>
          </div>
          <div className="mt-5 text-center text-sm"><span className="text-slate-500">Don&apos;t have an account? <button className="text-blue-600 font-semibold hover:underline" onClick={()=>setView("register")}>Register now</button></span></div>
        </div>
      </div>
      <div className="max-w-md mx-auto mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">Use your registered reader account to sign in.</div>
    </div>
  );
}

function ForgotForm({ setView }: { setView: (v: PortalView) => void }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSend = () => {
    if (!email) return;
    setShowToast(true);
    setTimeout(() => { setShowToast(false); setSent(true); }, 2800);
  };

  if (sent) return (
    <div className="max-w-md mx-auto mt-10 card p-8 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg></div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">Email sent!</h2>
      <p className="text-slate-500 text-sm mb-6">Please check your inbox to reset your password.</p>
      <button className="btn-primary w-full justify-center" onClick={()=>setView("login")}>Back to Sign In</button>
    </div>
  );

  return (
    <>
      {/* Toast — top-right */}
      {showToast && (
        <div
          className="fixed top-5 right-5 z-50 flex items-start gap-3 px-4 py-3.5 shadow-2xl"
          style={{ background: "#1E293B", borderRadius: 8, minWidth: 320, maxWidth: 400, animation: "slideInRight 0.3s ease" }}
        >
          {/* Checkmark */}
          <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ background: "#22c55e" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold leading-snug">Verification code sent!</p>
            <p className="text-slate-300 text-xs mt-0.5 leading-snug">Please check your email to continue.</p>
          </div>
          {/* Close */}
          <button
            onClick={() => { setShowToast(false); setSent(true); }}
            className="flex-shrink-0 text-slate-400 hover:text-white transition-colors mt-0.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      )}

      <div className="max-w-md mx-auto mt-8 card p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Reset Password</h2>
        <p className="text-slate-500 text-sm mb-5">Enter your email to receive a password reset link</p>
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label><input className="input-field" type="email" placeholder="email@example.com" value={email} onChange={e=>setEmail(e.target.value)} /></div>
          <button className="btn-primary w-full justify-center" style={{padding:"12px"}} onClick={handleSend} disabled={showToast}>Send Recovery Email</button>
          <button className="btn-secondary w-full justify-center" onClick={()=>setView("login")}>← Back to Sign In</button>
        </div>
      </div>
    </>
  );
}

// ── Reader Profile ────────────────────────────────────────────────────────────
function ReaderProfile({
  wishlist, onToggleWishlist,
  view, setView,
  addToast,
  userProfile,
  readerId,
}: {
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
  view: PortalView;
  setView: (v: PortalView) => void;
  addToast: (title: string, sub?: string) => void;
  userProfile: UserProfile;
  readerId: string | null;
}) {
  type EditFields = { name: string; email: string; phone: string; cccd: string; dob: string; address: string };
  const initialEdit: EditFields = { name: userProfile.name, email: userProfile.email, phone: userProfile.phone, cccd: userProfile.cccd, dob: userProfile.dob, address: userProfile.address };
  // Info tab edit mode
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<EditFields>(initialEdit);
  const [editDraft, setEditDraft] = useState<EditFields>(initialEdit);

  // History tab
  const [renewedIds, setRenewedIds] = useState<Set<string>>(new Set());
  const [renewModal, setRenewModal] = useState<{ id: string; title: string; currentDue: string; newDue: string; renewCount: number } | null>(null);
  const [showSapiensQR, setShowSapiensQR] = useState(false);
  const [borrowHistory, setBorrowHistory] = useState(userProfile.borrowHistory);

  // Wishlist tab
  const [reservedWishlistIds, setReservedWishlistIds] = useState<Set<number>>(new Set());
  const [reserveWishlistModal, setReserveWishlistModal] = useState<number | null>(null);

  const today = todayDMY();

  useEffect(() => {
    if (!readerId) return;
    api.get<{ data: { content: Array<{ transactionId: string; dateBorrow: string; dueDate: string }> } }>(`/readers/${readerId}/borrow-history?page=0&size=100`)
      .then(response => setBorrowHistory(response.data.data.content.map(record => ({
        id: record.transactionId,
        title: "Borrow transaction",
        borrowDate: record.dateBorrow,
        dueDate: record.dueDate,
        returnDate: null,
        status: "On Loan",
        fine: 0,
        renewCount: 0,
      }))));
  }, [readerId]);

  const handleRenew = async (id: string, dueDate: string) => {
    const newDueDate = new Date(dueDate);
    newDueDate.setDate(newDueDate.getDate() + 20);
    await api.put(`/borrows/${id}/renew`, { newDueDate: newDueDate.toISOString().slice(0, 10) });
    setRenewedIds(prev => new Set(prev).add(id));
  };

  const handleReserveWishlist = (bookId: number) => {
    setReservedWishlistIds(prev => new Set(prev).add(bookId));
    addToast("✅ Reservation request sent successfully!");
  };

  const todayPlusDays = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return formatDMY(d);
  };

  const tabLabel = (v: PortalView) => {
    if (v === "profile") return "Personal Information";
    if (v === "history") return "Borrow History";
    return "Wishlist";
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-xl font-bold">{userProfile.initials}</div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">{userProfile.name}</h1>
          <p className="text-slate-500 text-sm">Reader · Reader ID: <span className="font-mono text-blue-600">{userProfile.cardId}</span></p>
        </div>
        <div className="ml-auto"><span className="badge badge-green">Active Card</span></div>
      </div>

      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-xl w-fit">
        {(["profile","history","wishlist"] as PortalView[]).map(t=>(
          <button key={t} onClick={()=>setView(t)} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${view===t?"bg-white text-blue-700 shadow-sm":"text-slate-500 hover:text-slate-700"}`}>
            {tabLabel(t)}
          </button>
        ))}
      </div>

      {view==="profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Info card */}
          <div className="lg:col-span-2 card p-6">
            <h3 className="font-bold text-slate-800 mb-4">Account Information</h3>
            {!editMode ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  {([
                    ["Full Name", editData.name],
                    ["Email", editData.email],
                    ["Phone Number", editData.phone],
                    ["National ID", editData.cccd],
                    ["Date of Birth", editData.dob],
                    ["Permanent Address", editData.address],
                  ] as [string, string][]).map(([l,v])=>(
                    <div key={l} className="bg-slate-50 rounded-lg p-3"><p className="text-xs text-slate-500 mb-0.5">{l}</p><p className="text-sm font-semibold text-slate-800">{v}</p></div>
                  ))}
                  {/* Non-editable fields */}
                  {([
                    ["Card Issue Date", userProfile.cardIssued],
                    ["Card Expiry Date", userProfile.cardExpiry],
                  ] as [string, string][]).map(([l,v])=>(
                    <div key={l} className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-500 mb-0.5">{l}</p>
                      <p className="text-sm font-semibold text-slate-800">{v}</p>
                    </div>
                  ))}
                </div>
                <button className="btn-secondary mt-4" onClick={()=>{ setEditDraft(editData); setEditMode(true); }}>Edit Information</button>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <label className="text-xs text-slate-500 mb-1 block">Full Name</label>
                    <input className="input-field text-sm" value={editDraft.name} onChange={e=>setEditDraft({...editDraft,name:e.target.value})} />
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <label className="text-xs text-slate-500 mb-1 block">Email</label>
                    <input type="email" className="input-field text-sm" value={editDraft.email} onChange={e=>setEditDraft({...editDraft,email:e.target.value})} />
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <label className="text-xs text-slate-500 mb-1 block">Phone Number</label>
                    <input className="input-field text-sm" value={editDraft.phone} onChange={e=>setEditDraft({...editDraft,phone:e.target.value})} />
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <label className="text-xs text-slate-500 mb-1 block">National ID</label>
                    <input className="input-field text-sm" value={editDraft.cccd} onChange={e=>setEditDraft({...editDraft,cccd:e.target.value})} />
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <label className="text-xs text-slate-500 mb-1 block">Date of Birth</label>
                    <input className="input-field text-sm" value={editDraft.dob} onChange={e=>setEditDraft({...editDraft,dob:e.target.value})} />
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <label className="text-xs text-slate-500 mb-1 block">Permanent Address</label>
                    <input className="input-field text-sm" value={editDraft.address} onChange={e=>setEditDraft({...editDraft,address:e.target.value})} />
                  </div>
                  {/* Non-editable */}
                  {([
                    ["Card Issue Date", userProfile.cardIssued],
                    ["Card Expiry Date", userProfile.cardExpiry],
                  ] as [string, string][]).map(([l,v])=>(
                    <div key={l} className="bg-slate-100 rounded-lg p-3 opacity-70">
                      <p className="text-xs text-slate-500 mb-0.5">{l} <span className="text-slate-400">(read only)</span></p>
                      <p className="text-sm font-semibold text-slate-600">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  <button className="btn-primary" style={{padding:"9px 20px"}} onClick={()=>{ setEditData(editDraft); setEditMode(false); }}>Save Changes</button>
                  <button className="btn-secondary" style={{padding:"9px 20px"}} onClick={()=>setEditMode(false)}>Cancel</button>
                </div>
              </>
            )}
          </div>

          {/* QR card */}
          <div className="card p-5 flex flex-col items-center justify-center text-center">
            <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Library Card QR Code</p>
            <p className="text-xs text-slate-400 mb-3">Scan at the loan desk</p>
            <div className="p-3 bg-white border-2 border-slate-200 rounded-2xl shadow-inner mb-3">
              <QRPlaceholder size={140} value={userProfile.cardId} />
            </div>
            <p className="font-mono text-sm font-bold text-slate-800 tracking-widest">{userProfile.cardId}</p>
            <p className="text-xs text-slate-400 mt-1">{userProfile.name} · Expires: {userProfile.cardExpiry}</p>
            <div className="mt-3 flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              <span className="text-xs text-green-600 font-medium">Active</span>
            </div>
            <button className="btn-secondary mt-3 w-full text-xs" style={{padding:"7px 14px"}} onClick={() => {
              addToast("📥 Downloading QR code...");
              setTimeout(() => addToast("✅ Library card QR code downloaded successfully!"), 1500);
            }}>⬇️ Download QR</button>
          </div>
        </div>
      )}

      {view==="history" && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Borrow History</h3>
            <span className="text-sm text-slate-500">Total: {borrowHistory.length} records</span>
          </div>
          <table>
            <thead>
              <tr><th>Record ID</th><th>Title</th><th>Borrow Date</th><th>Due Date</th><th>Renewals</th><th>Return Date</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {borrowHistory.map(r=>{
                const renewed = renewedIds.has(r.id);
                const effectiveRenewCount = r.renewCount + (renewed ? 1 : 0);
                const maxed = effectiveRenewCount >= 4;
                const newDueDate = renewed ? addDays(r.dueDate, 20) : r.dueDate;
                const canRenew = (r.status==="On Loan"||r.status==="Due Soon") && !renewed && !maxed;
                return (
                  <tr key={r.id}>
                    <td className="font-mono text-xs text-blue-600">{r.id}</td>
                    <td className="font-medium">{r.title}</td>
                    <td>{r.borrowDate}</td>
                    <td>
                      {renewed ? (
                        <div>
                          <span>{newDueDate}</span>
                          <div className="text-blue-500 text-xs">(Estimated)</div>
                        </div>
                      ) : r.dueDate}
                    </td>
                    <td className="text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${maxed ? "bg-red-100 text-red-600 border border-red-200" : effectiveRenewCount > 0 ? "bg-amber-100 text-amber-700 border border-amber-200" : "bg-slate-100 text-slate-500 border border-slate-200"}`}>
                        {effectiveRenewCount}/4
                      </span>
                    </td>
                    <td>{r.returnDate||<span className="text-slate-400">—</span>}</td>
                    <td>
                      <span className={`badge ${r.status==="Returned"?"badge-gray":r.status==="On Loan"?"badge-blue":r.status==="Due Soon"?"badge-amber":"badge-red"}`}>{r.status}</span>
                    </td>
                    <td>
                      {(r.status==="On Loan"||r.status==="Due Soon") && (
                        renewed ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-300">⏳ Renewal pending</span>
                        ) : maxed ? (
                          <button
                            className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-slate-200 text-slate-400 border border-slate-300 hover:bg-slate-300 transition-colors cursor-pointer"
                            onClick={() => setRenewModal({ id: r.id, title: r.title, currentDue: r.dueDate, newDue: addDays(r.dueDate, 20), renewCount: effectiveRenewCount })}
                          >Renew</button>
                        ) : (
                          <button className="btn-success" style={{fontSize:12,padding:"5px 12px"}} onClick={()=>setRenewModal({ id: r.id, title: r.title, currentDue: r.dueDate, newDue: addDays(r.dueDate, 20), renewCount: effectiveRenewCount })}>Renew</button>
                        )
                      )}
                      {r.fine>0&&<span className="text-red-600 font-semibold text-sm ml-2">{r.fine.toLocaleString()}đ</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {view==="wishlist" && (
        <div>
          <p className="text-sm text-slate-500 mb-4">Books you&apos;re interested in ({wishlist.length} books)</p>
          <div className="space-y-3">
            {BOOKS.filter(b=>wishlist.includes(b.id)).map(book=>{
              const reserved = reservedWishlistIds.has(book.id);
              return (
                <div key={book.id} className="card p-4 flex gap-4 items-start">
                  <img src={book.cover} alt={book.title} className="w-14 object-cover rounded bg-slate-100 flex-shrink-0" style={{height:80}} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{book.title}</h3>
                    <p className="text-sm text-slate-500">{book.author} · {book.genre}</p>
                    {book.available>0?<span className="badge badge-green mt-1">{book.available} copies available</span>:<span className="badge badge-red mt-1">Unavailable</span>}
                  </div>
                  <div className="flex flex-col gap-2 items-end flex-shrink-0">
                    {book.id === 4 ? (
                      <>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">✅ Approved</span>
                        <button className="btn-primary" style={{fontSize:13,padding:"7px 14px"}} onClick={()=>setShowSapiensQR(true)}>View QR Code</button>
                      </>
                    ) : book.available>0 && (
                      reserved ? (
                        <div className="text-right">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-300">⏳ Pending Approval</span>
                          <div className="text-xs text-slate-500 mt-1">Reserved On: {today}</div>
                          <div className="text-xs text-slate-500">Pickup Deadline: {todayPlusDays(3)}</div>
                        </div>
                      ) : (
                        <button className="btn-primary" style={{fontSize:13,padding:"7px 14px"}} onClick={()=>setReserveWishlistModal(book.id)}>Reserve</button>
                      )
                    )}
                    <button className="btn-danger" style={{fontSize:13,padding:"7px 14px"}} onClick={()=>onToggleWishlist(book.id)}>Remove</button>
                  </div>
                </div>
              );
            })}
            {wishlist.length===0&&<div className="card p-12 text-center text-slate-400"><div className="text-4xl mb-3">📚</div><p>Your wishlist is empty</p></div>}
          </div>
        </div>
      )}

      {/* Renew confirmation modal */}
      {renewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setRenewModal(null)}>
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl">🔄</div>
              <h3 className="font-bold text-slate-900">Confirm Book Renewal</h3>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 mb-4 space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Book</span><span className="font-semibold text-slate-800 text-right max-w-[60%]">{renewModal.title}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Current Due Date</span><span className="font-semibold text-amber-600">{renewModal.currentDue}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">New Due Date (estimated)</span><span className="font-semibold text-green-600">{renewModal.newDue}</span></div>
              {renewModal.renewCount >= 4 ? (
                <div className="flex justify-between items-center border-t border-slate-200 pt-1.5 mt-1.5">
                  <span className="text-slate-500">Current Renewals</span>
                  <span className="font-bold px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-600 border border-red-200">4/4</span>
                </div>
              ) : (
                <div className="flex justify-between items-center border-t border-slate-200 pt-1.5 mt-1.5">
                  <span className="text-slate-500">Renewals</span>
                  <span className={`font-bold px-2 py-0.5 rounded-full text-xs ${renewModal.renewCount >= 3 ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
                    {renewModal.renewCount + 1}/4
                  </span>
                </div>
              )}
            </div>
            {renewModal.renewCount >= 4 && (
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-300 rounded-xl p-3 mb-4">
                <span className="text-base">⚠️</span>
                <p className="text-sm font-semibold text-red-700">Maximum renewal limit reached (4 times).</p>
              </div>
            )}
            <div className="flex gap-2">
              <button className="btn-secondary flex-1 justify-center" style={{ padding: "10px" }} onClick={() => setRenewModal(null)}>
                {renewModal.renewCount >= 4 ? "Go Back" : "Cancel"}
              </button>
              {renewModal.renewCount >= 4 ? (
                <button className="flex-1 py-2.5 rounded-xl text-slate-400 font-semibold text-sm bg-slate-200 cursor-not-allowed border border-slate-300" disabled>
                  Confirm Renewal
                </button>
              ) : (
                <button className="btn-success flex-1 justify-center" style={{ padding: "10px" }} onClick={() => {
                  handleRenew(renewModal.id, renewModal.currentDue)
                    .then(() => {
                      addToast("✅ Renewal request sent successfully!", `New due date: ${renewModal.newDue}`);
                      setRenewModal(null);
                    })
                    .catch(() => addToast("Renewal failed", "Please try again later."));
                }}>Confirm Renewal</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sapiens QR pickup modal */}
      {showSapiensQR && (() => {
        const deadline = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const hhmm = deadline.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
        const dd = String(deadline.getDate()).padStart(2, "0");
        const mm = String(deadline.getMonth() + 1).padStart(2, "0");
        const yy = String(deadline.getFullYear()).slice(-2);
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowSapiensQR(false)}>
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowSapiensQR(false)} className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 text-sm">✕</button>
              {/* Title */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center text-lg">✅</div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">Sapiens: Lược Sử Loài Người Reserved Successfully!</h3>
              </div>
              {/* QR section */}
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center mb-3">Reservation QR Code</p>
              <div className="flex justify-center mb-3">
                <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl shadow-inner">
                  <QRPlaceholder size={160} value="RESERVE-SAPIENS-DR2024-0142" />
                </div>
              </div>
              <p className="text-center text-xs font-semibold text-blue-600 mb-4">Reservation QR code — present at the desk</p>
              {/* Deadline box */}
              <div className="bg-amber-50 border border-amber-300 rounded-xl px-4 py-3 flex items-center gap-3">
                <span className="text-xl">⏰</span>
                <div>
                  <p className="text-amber-800 font-bold text-sm">Pickup deadline: 24 hours</p>
                  <p className="text-amber-600 text-xs">By {hhmm} on {dd}/{mm}/{yy}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Reserve wishlist confirmation modal */}
      {reserveWishlistModal !== null && (() => {
        const book = BOOKS.find(b => b.id === reserveWishlistModal)!;
        const pickupDate = todayPlusDays(3);
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setReserveWishlistModal(null)}>
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl">📚</div>
                <div>
                  <h3 className="font-bold text-slate-900">Reserve Book</h3>
                  <p className="text-slate-500 text-xs">{book.title}</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 mb-4 space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Book</span><span className="font-semibold text-slate-800 text-right max-w-[60%]">{book.title}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Reserve Date</span><span className="font-semibold">{today}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Expected Pickup</span><span className="font-semibold text-blue-700">{pickupDate}</span></div>
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary flex-1 justify-center" style={{ padding: "10px" }} onClick={() => setReserveWishlistModal(null)}>← Go Back</button>
                <button className="btn-primary flex-1 justify-center" style={{ padding: "10px" }} onClick={() => { handleReserveWishlist(reserveWishlistModal); setReserveWishlistModal(null); }}>Confirm</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ── Portal Shell ──────────────────────────────────────────────────────────────
interface PortalPageProps {
  staffUser?: { name: string; cardId: string; initials: string; role: "staff"|"admin"; email: string } | null;
}

export default function PortalPage({ staffUser }: PortalPageProps) {
  // When staffUser is provided (staff/admin viewing portal), use their profile; else reader
  const profileKey = staffUser?.role ?? "default";
  const activeProfile = USER_PROFILES[profileKey];

  const [view, setView] = useState<PortalView>("opac");
  const [loggedIn, setLoggedIn] = useState(false);
  const [readerId, setReaderId] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<number[]>(activeProfile.wishlistIds);

  // Reset wishlist and login state when the active profile changes (staff login/logout)
  useEffect(() => {
    setWishlist(USER_PROFILES[profileKey].wishlistIds);
    if (!staffUser) {
      setLoggedIn(false);
      setReaderId(null);
    }
  }, [profileKey]);
  // When staffUser changes (staff → admin), re-sync wishlist — handled via key in App.tsx
  const effectiveLoggedIn = staffUser ? true : loggedIn;
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastIdRef = useRef(0);

  const addToast = (title: string, sub?: string) => {
    const id = ++toastIdRef.current;
    setToasts(prev => [...prev, { id, title, sub }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const dismissToast = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  };

  const handleSetView = (v: PortalView | "profile") => {
    if (v === "profile") { setLoggedIn(true); setView("profile"); }
    else setView(v as PortalView);
  };
  const handleReaderLogin = (userId: string) => {
    setReaderId(userId);
    setLoggedIn(true);
    setView("profile");
  };
  const currentUserName = effectiveLoggedIn ? activeProfile.name : "";
  const currentInitials = effectiveLoggedIn ? activeProfile.initials : "";

  const breadcrumbLabel = () => {
    if (view === "opac") return "Book Catalog";
    if (view === "login") return "Sign In";
    if (view === "register") return "Register";
    if (view === "forgot") return "Forgot Password";
    if (view === "profile") return "Personal Information";
    if (view === "history") return "Borrow History";
    return "Wishlist";
  };

  return (
    <div className="flex h-full overflow-hidden">
      <Toast toasts={toasts} onDismiss={dismissToast} />

      <aside className="w-60 bg-[#0f172a] flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div>
            <div><p className="text-white text-sm font-bold leading-tight">Library</p><p className="text-slate-500 text-xs">Reader Portal</p></div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider px-3 py-2 mt-2">Services</p>
          <button onClick={()=>setView("opac")} className={`sidebar-link w-full ${view==="opac"?"active":""}`}>🔍 Book Catalog</button>
          {effectiveLoggedIn&&(<>
            <button onClick={()=>setView("profile")} className={`sidebar-link w-full ${view==="profile"?"active":""}`}>👤 Personal Information</button>
            <button onClick={()=>setView("history")} className={`sidebar-link w-full ${view==="history"?"active":""}`}>📋 Borrow History</button>
            <button onClick={()=>setView("wishlist")} className={`sidebar-link w-full ${view==="wishlist"?"active":""}`}>❤️ Wishlist {wishlist.length>0&&<span className="ml-auto bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{wishlist.length}</span>}</button>
          </>)}
          <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider px-3 py-2 mt-3">Account</p>
          {!effectiveLoggedIn?(<>
            <button onClick={()=>setView("login")} className={`sidebar-link w-full ${view==="login"?"active":""}`}>🔐 Sign In</button>
            <button onClick={()=>setView("register")} className={`sidebar-link w-full ${view==="register"?"active":""}`}>✏️ Register</button>
          </>):(
            !staffUser && <button onClick={()=>{setLoggedIn(false);setView("opac");}} className="sidebar-link w-full">🚪 Sign Out</button>
          )}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Reader Portal</span><span>›</span>
            <span className="text-slate-800 font-medium">{breadcrumbLabel()}</span>
          </div>
          {!effectiveLoggedIn
            ?<button className="btn-primary" style={{padding:"8px 16px",fontSize:13}} onClick={()=>setView("login")}>Sign In</button>
            :<div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-xs font-bold">{currentInitials}</div><span className="text-sm font-medium text-slate-700">{currentUserName}</span></div>}
        </div>

        <div className="p-6">
          {view==="opac" && <OPACSearch loggedIn={effectiveLoggedIn} wishlist={wishlist} readerId={readerId} onToggleWishlist={toggleWishlist} onLoginRequest={()=>setView("login")} />}
          {view==="login" && !staffUser && <LoginForm setView={v=>handleSetView(v as PortalView)} onLogin={handleReaderLogin} />}
          {view==="register" && !staffUser && <RegisterForm onBack={()=>setView("login")} />}
          {view==="forgot" && !staffUser && <ForgotForm setView={setView} />}
          {(view==="profile"||view==="history"||view==="wishlist") && effectiveLoggedIn && (
            <ReaderProfile
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              view={view}
              setView={setView}
              addToast={addToast}
              userProfile={activeProfile}
              readerId={readerId}
            />
          )}
        </div>
      </main>
    </div>
  );
}
