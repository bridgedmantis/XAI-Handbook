"use client";
import TableOfContents, { TocItem } from "./TableOfContents";
import Link from "next/link";

interface DocLayoutProps {
  children: React.ReactNode;
  toc: TocItem[];
  prev?: { href: string; title: string; label?: string };
  next?: { href: string; title: string; label?: string };
}

export default function DocLayout({ children, toc, prev, next }: DocLayoutProps) {
  return (
    <div style={{ display: "flex", width: "100%", minWidth: 0 }}>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      <TableOfContents items={toc} />

      {(prev || next) && (
        <div style={{ display: "none" }}>{/* hidden, render footer below */}</div>
      )}
    </div>
  );
}

export function PageFooter({
  prev,
  next,
}: {
  prev?: { href: string; title: string; label?: string };
  next?: { href: string; title: string; label?: string };
}) {
  return (
    <footer className="page-footer" style={{ marginTop: 80 }}>
      {prev ? (
        <div className="footer-nav">
          <div className="footer-nav-label">
            {prev.label || "← فصل قبلی"}
          </div>
          <Link href={prev.href} className="footer-nav-link">
            {prev.title}
          </Link>
        </div>
      ) : (
        <div style={{ flex: 1 }} />
      )}
      {next ? (
        <div className="footer-nav next">
          <div className="footer-nav-label">
            {next.label || "فصل بعدی →"}
          </div>
          <Link href={next.href} className="footer-nav-link">
            {next.title}
          </Link>
        </div>
      ) : null}
    </footer>
  );
}
