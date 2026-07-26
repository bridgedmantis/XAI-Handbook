"use client";

interface MathBlockProps {
  children: string;
}

export default function MathBlock({ children }: MathBlockProps) {
  return (
    <div className="math-block">
      {children}
    </div>
  );
}
