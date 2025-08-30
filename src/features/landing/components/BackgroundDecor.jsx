// /src/features/landing/components/BackgroundDecor.jsx
export default function BackgroundDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    >
      {/* Base brand radial (centered behind content) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 50% 20%, rgba(79,70,229,0.15) 0%, rgba(99,102,241,0.08) 45%, rgba(15,23,42,0.02) 100%)",
        }}
      />

      {/* Diagonal brand beam (indigo → purple) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(79,70,229,0.18) 0%, rgba(109,40,217,0.14) 40%, rgba(124,58,237,0.08) 70%, transparent 85%)",
          mask: "linear-gradient(to bottom, rgba(0,0,0,0.10), rgba(0,0,0,0.5))",
          WebkitMask: "linear-gradient(to bottom, rgba(0,0,0,0.10), rgba(0,0,0,0.5))",
        }}
      />

      {/* Soft grid (only visible where content isn’t) */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.06]">
        <defs>
          <pattern id="psm-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path
              d="M48 0H0V48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#psm-grid)" className="text-indigo-800" />
      </svg>

      {/* Very light grain/noise for depth (masked) */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2248%22 height=%2248%22 viewBox=%220 0 48 48%22><filter id=%22n%22 x=%22-20%25%22 y=%22-20%25%22 width=%22140%25%22 height=%22140%25%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%2248%22 height=%2248%22 filter=%22url(%23n)%22 opacity=%220.35%22/></svg>')",
          mixBlendMode: "soft-light",
        }}
      />
    </div>
  );
}

