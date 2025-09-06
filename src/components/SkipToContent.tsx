"use client";

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      style={{
        position: "absolute",
        left: "-9999px",
        top: "auto",
        width: 1,
        height: 1,
        overflow: "hidden",
      }}
      onFocus={(e) => {
        // make visible on focus
        Object.assign(e.currentTarget.style, {
          left: "1rem",
          top: "1rem",
          width: "auto",
          height: "auto",
          background: "#111827",
          color: "#fff",
          padding: "0.5rem 0.75rem",
          borderRadius: "0.375rem",
          zIndex: 1000,
        });
      }}
      onBlur={(e) => {
        // hide again when not focused
        Object.assign(e.currentTarget.style, {
          left: "-9999px",
          top: "auto",
          width: 1,
          height: 1,
          background: "transparent",
          color: "inherit",
          padding: 0,
        });
      }}
    >
      Skip to main content
    </a>
  );
}
