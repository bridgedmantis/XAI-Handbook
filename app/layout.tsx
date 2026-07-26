"use client";
import "./globals.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "./components/Sidebar";
import ProgressBar from "./components/ProgressBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof document === "undefined") return;
    try {
      const saved = localStorage.getItem("xai-theme");
      if (saved === "dark" || saved === "light") {
        setTheme(saved);
      } else if (typeof window !== "undefined" && window.matchMedia &&
                 window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      try {
        localStorage.setItem("xai-theme", theme);
      } catch {
        /* ignore */
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <html lang="fa" dir="rtl">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('xai-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ProgressBar />

        <header className="site-header">
          <div className="site-header-inner">
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <button
                className="mobile-menu-btn"
                onClick={() => setSidebarOpen(true)}
                aria-label="باز کردن منو"
                style={{ marginRight: -8 }}
              >
                ☰
              </button>

              <Link href="/" className="logo">
                <span className="logo-mark">X</span>
                <span>
                  <span className="logo-text-accent">XAI</span>Handbook
                </span>
              </Link>
            </div>

            <div className="header-right">
              <nav className="header-nav" dir="rtl">
                <Link href="/">خانه</Link>
                <Link href="/chapter/1">مستندات</Link>
                <Link href="/formulas">فرمول‌ها</Link>
              </nav>

              <a
                className="btn-download"
                href="https://christophm.github.io/interpretable-ml-book/"
                target="_blank"
                rel="noreferrer"
                style={{ direction: "ltr" }}
              >
                <span>دانلود</span>
                <span style={{ fontSize: 11 }}>↗</span>
              </a>

              <button
                className="theme-toggle"
                aria-label="تغییر تم"
                onClick={toggleTheme}
                title={theme === "dark" ? "حالت روشن" : "حالت تیره"}
              >
                {theme === "dark" ? "☀" : "☾"}
              </button>
            </div>
          </div>
        </header>

        <div className="app-layout">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="main-wrapper">
            <main className="main-content">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
