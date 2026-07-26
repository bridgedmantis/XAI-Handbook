"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="home-hero">
        <div className="home-hero-badge">📖 گزارش علمی جامع</div>
        <h1 className="home-hero-title">
          راهنمای جامع<br />
          <span>یادگیری ماشین تفسیرپذیر</span>
        </h1>
        <p className="home-hero-subtitle">
          درک درونی مدل‌های هوش مصنوعی — از مفاهیم پایه و رگرسیون خطی
          تا مقادیر شاپلی و روش‌های پیشرفته توضیح پیش‌بینی‌ها.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/chapter/1"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 20px",
              background: "var(--accent-primary)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              borderRadius: 10,
              textDecoration: "none",
              transition: "all 0.15s ease",
            }}
          >
            شروع مطالعه →
          </Link>
          <Link
            href="/formulas"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 20px",
              background: "transparent",
              color: "var(--text-primary)",
              fontWeight: 600,
              fontSize: 14,
              borderRadius: 10,
              textDecoration: "none",
              border: "1px solid var(--border)",
              transition: "all 0.15s ease",
            }}
          >
            📐 مرور فرمول‌ها
          </Link>
        </div>
      </section>

      {/* Sandocs-style cards */}
      <div className="home-cards">
        <Link href="/chapter/3" className="home-card">
          <div className="home-card-icon">🧮</div>
          <div className="home-card-title">مدل‌های تفسیرپذیر</div>
          <p className="home-card-desc">
            رگرسیون خطی، لجستیک، درخت تصمیم و قوانین — مدل‌هایی که ساختارشان
            به‌تنهایی قابل درک و تفسیر است.
          </p>
          <div className="home-card-link">مشاهده فصل ←</div>
        </Link>

        <Link href="/chapter/4" className="home-card">
          <div className="home-card-icon">🔍</div>
          <div className="home-card-title">روش‌های مستقل از مدل</div>
          <p className="home-card-desc">
            PDP، مدل جایگزین، LIME و SHAP — روش‌هایی که پس از آموزش برای هر مدل
            دلخواهی توضیح تولید می‌کنند.
          </p>
          <div className="home-card-link">مشاهده فصل ←</div>
        </Link>
      </div>

      {/* Quick Start Section (like Sandocs) */}
      <h2
        style={{
          fontSize: 26,
          fontWeight: 800,
          margin: "56px 0 16px",
          color: "var(--text-primary)",
        }}
      >
        شروع سریع
      </h2>
      <p className="para" style={{ marginBottom: 28 }}>
        یادگیری ماشین تفسیرپذیر (XAI) به روش‌ها و مدل‌هایی اشاره دارد که
        پیش‌بینی‌های سیستم‌های یادگیری ماشین را برای انسان‌ها قابل درک می‌کنند.
        در ادامه، ساختار این گزارش را به‌صورت خلاصه مرور می‌کنیم:
      </p>

      {/* Steps grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {[
          {
            num: "۱",
            title: "فصل ۱ — مقدمه",
            desc: "یادگیری ماشین چیست، مزایا و معایب، فرآیند ۳ مرحله‌ای و اصطلاحات تخصصی.",
            href: "/chapter/1",
            color: "#F59E0B",
          },
          {
            num: "۲",
            title: "فصل ۲ — تفسیرپذیری",
            desc: "اهمیت، طبقه‌بندی روش‌ها، محدوده‌ها، ارزیابی و ویژگی‌های توضیحات.",
            href: "/chapter/2",
            color: "#8B5CF6",
          },
          {
            num: "۳",
            title: "فصل ۳ — مدل‌های تفسیرپذیر",
            desc: "رگرسیون خطی و لجستیک، درخت تصمیم، قوانین تصمیم و مدل‌های ساده دیگر.",
            href: "/chapter/3",
            color: "#10B981",
          },
          {
            num: "۴",
            title: "فصل ۴ — روش‌های مستقل از مدل",
            desc: "PDP، Global Surrogate، LIME، SHAP و اهمیت ویژگی با جایگشت.",
            href: "/chapter/4",
            color: "#EC4899",
          },
          {
            num: "۵",
            title: "فصل ۵ — توضیحات مبتنی بر نمونه",
            desc: "نمونه‌های اولیه، توضیحات خلاف‌واقع و نمونه‌های متخاصم.",
            href: "/chapter/5",
            color: "#06B6D4",
          },
        ].map((step) => (
          <Link
            key={step.num}
            href={step.href}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
              padding: 18,
              border: "1px solid var(--border)",
              borderRadius: 12,
              background: "#fff",
              textDecoration: "none",
              transition: "all 0.15s ease",
              color: "inherit",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: `${step.color}15`,
                color: step.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 15,
                flexShrink: 0,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {step.num}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: 15 }}>
                {step.title}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4, lineHeight: 1.7 }}>
                {step.desc}
              </div>
            </div>
            <div style={{ color: "var(--accent-primary)", fontWeight: 700, fontSize: 13 }}>
              ←
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
