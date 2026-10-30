import { cn } from "@/lib/utils";

// The </> bolt symbol from the brand sheet, drawn as paths so it stays sharp at any size.
export const LogoSymbol = ({ className }: { className?: string }) => (
  <svg viewBox="-2 -2 108 84" fill="#FF2D2D" aria-hidden="true" className={className}>
    <path d="M0 40 L26 19.5 L26 34 L15.5 40 L26 46 L26 60.5 Z" />
    <path d="M104 40 L78 19.5 L78 34 L88.5 40 L78 46 L78 60.5 Z" />
    <path d="M75 0 L58 32 L76 34 L30 81 L50 42 L29 47 Z" />
  </svg>
);

const Logo = ({ tagline = false, className }: { tagline?: boolean; className?: string }) => (
  <span className={cn("flex items-center gap-2.5 font-logo text-white", className)} aria-label="JadrDev">
    <LogoSymbol className="h-[1.25em] w-auto" />
    <span className="flex flex-col items-start text-left leading-none">
      <span className="font-extrabold tracking-tight">JadrDev</span>
      {tagline && (
        <span className="mt-1.5 text-[0.28em] font-medium tracking-[0.3em]">BUILD. INNOVATE. EVOLVE.</span>
      )}
    </span>
  </span>
);

export default Logo;
