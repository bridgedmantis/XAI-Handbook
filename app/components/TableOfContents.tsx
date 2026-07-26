"use client";
import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (items.length === 0) return null;

  return (
    <aside className="toc-sidebar" dir="rtl">
      <div className="toc-title">در این صفحه</div>
      <ul className="toc-list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              className={`toc-link h${item.level} ${activeId === item.id ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.id);
              }}
              style={{ cursor: "pointer" }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
