"use client";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "Python" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      <div className="code-header">
        <div className="code-dots">
          <div className="code-dot" style={{ background: "#FF5F57" }} />
          <div className="code-dot" style={{ background: "#FFBD2E" }} />
          <div className="code-dot" style={{ background: "#28CA41" }} />
        </div>
        <span className="code-lang">{language}</span>
        <button
          onClick={handleCopy}
          style={{
            background: copied ? "rgba(45,212,191,0.15)" : "rgba(255,255,255,0.05)",
            border: `1px solid ${copied ? "rgba(45,212,191,0.3)" : "var(--border)"}`,
            borderRadius: "5px",
            color: copied ? "var(--accent-teal)" : "var(--text-muted)",
            fontSize: "11px",
            padding: "3px 10px",
            cursor: "pointer",
            fontFamily: "'JetBrains Mono', monospace",
            transition: "all 0.2s ease",
          }}
        >
          {copied ? "✓ کپی شد" : "کپی"}
        </button>
      </div>
      <div className="code-body">
        <pre>{code}</pre>
      </div>
    </div>
  );
}
