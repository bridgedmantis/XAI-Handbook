"use client";

interface FigureProps {
  src: string;
  caption: string;
  label?: string;
}

export default function Figure({ src, caption, label }: FigureProps) {
  return (
    <div className="figure-block">
      <div className="figure-placeholder">
        <div className="figure-icon">🖼️</div>
        <div className="figure-path">{src}</div>
        {label && (
          <div style={{ 
            fontSize: "10px", 
            color: "var(--accent-gold)", 
            marginTop: "8px",
            fontFamily: "'JetBrains Mono', monospace",
            opacity: 0.7
          }}>
            {label}
          </div>
        )}
      </div>
      <div className="figure-caption">
        {label && <strong>{label}: </strong>}
        {caption}
      </div>
    </div>
  );
}
