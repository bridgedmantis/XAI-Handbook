"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navGroups = [
  {
    title: "شروع کار",
    items: [
      { href: "/", title: "مقدمه و معرفی", icon: "🏠" },
    ],
  },
  {
    title: "فصل‌های کتاب",
    items: [
      { href: "/chapter/1", title: "۱. مقدمه", chapter: "ch1" },
      { href: "/chapter/2", title: "۲. تفسیرپذیری", chapter: "ch2" },
      { href: "/chapter/3", title: "۳. مدل‌های تفسیرپذیر", chapter: "ch3" },
      { href: "/chapter/4", title: "۴. روش‌های مستقل از مدل", chapter: "ch4" },
      { href: "/chapter/5", title: "۵. توضیحات مبتنی بر نمونه", chapter: "ch5" },
    ],
  },
  {
    title: "منابع",
    items: [
      { href: "/formulas", title: "فرمول‌های کلیدی", icon: "📐" },
    ],
  },
];

const chapterSubsections: Record<string, { id: string; title: string }[]> = {
  "ch1": [
    { id: "s1", title: "یادگیری ماشین چیست؟" },
    { id: "s2", title: "فرآیند ۳ مرحله‌ای" },
    { id: "s3", title: "مزایا و معایب" },
    { id: "s4", title: "اصطلاحات تخصصی" },
  ],
  "ch2": [
    { id: "s1", title: "اهمیت تفسیرپذیری" },
    { id: "s2", title: "چه زمانی نیاز نداریم؟" },
    { id: "s3", title: "طبقه‌بندی روش‌ها" },
    { id: "s4", title: "محدوده تفسیرپذیری" },
    { id: "s5", title: "ارزیابی تفسیرپذیری" },
    { id: "s6", title: "ویژگی‌های توضیحات" },
  ],
  "ch3": [
    { id: "s1", title: "رگرسیون خطی" },
    { id: "s2", title: "رگرسیون لجستیک" },
    { id: "s3", title: "درخت تصمیم" },
    { id: "s4", title: "قوانین تصمیم" },
    { id: "s5", title: "سایر مدل‌ها" },
  ],
  "ch4": [
    { id: "s1", title: "نمودار وابستگی جزئی (PDP)" },
    { id: "s2", title: "مدل جایگزین سراسری" },
    { id: "s3", title: "مدل جایگزین محلی (LIME)" },
    { id: "s4", title: "مقادیر شاپلی (SHAP)" },
    { id: "s5", title: "اهمیت ویژگی" },
  ],
  "ch5": [
    { id: "s1", title: "نمونه‌های اولیه و استثناها" },
    { id: "s2", title: "توضیحات خلاف‌واقع" },
    { id: "s3", title: "نمونه‌های متخاصم" },
  ],
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  const currentChapterId = (() => {
    for (const g of navGroups) {
      for (const it of g.items) {
        if ("chapter" in it && it.chapter && pathname?.startsWith(it.href)) {
          return it.chapter;
        }
      }
    }
    return null;
  })();

  const subsections = currentChapterId ? chapterSubsections[currentChapterId] : [];

  const handleSubClick = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 10);
    }
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? "active" : ""}`} onClick={onClose} />

      <aside className={`nav-sidebar ${isOpen ? "open" : ""}`} dir="rtl">
        <div className="nav-sidebar-inner">
          {navGroups.map((group, gi) => (
            <div key={gi} className="nav-group">
              <div className="nav-group-title">{group.title}</div>

              {group.items.map((item, ii) => {
                const act = isActive(item.href);
                const hasChapter = "chapter" in item && !!item.chapter;
                const showSubs = act && hasChapter && subsections.length > 0;

                return (
                  <div key={ii}>
                    <Link
                      href={item.href}
                      className={`nav-item ${act ? "active" : ""}`}
                      onClick={() => onClose()}
                    >
                      {"icon" in item && item.icon ? (
                        <span style={{ fontSize: 14 }}>{item.icon}</span>
                      ) : null}
                      <span>{item.title}</span>
                    </Link>

                    {showSubs && (
                      <div className="nav-subgroup">
                        <div className="nav-sub-items">
                          {subsections.map((sub) => (
                            <a
                              key={sub.id}
                              className="nav-item"
                              style={{
                                padding: "5px 12px 5px 12px",
                                marginInlineStart: "18px",
                                fontSize: 13,
                                color: "var(--text-muted)",
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                handleSubClick(sub.id);
                              }}
                              href={`#${sub.id}`}
                            >
                              <span
                                style={{
                                  width: 4,
                                  height: 4,
                                  borderRadius: "50%",
                                  background: "var(--text-subtle)",
                                  marginInlineEnd: 8,
                                  display: "inline-block",
                                }}
                              />
                              {sub.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          <div className="sidebar-footer">
            ساخته‌شده با 💜 توسط<br />
            <a href="https://momehmandoost-eight.vercel.app/" target="_blank" rel="noreferrer">
              محمد مهماندوست
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
