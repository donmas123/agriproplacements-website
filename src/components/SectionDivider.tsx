interface SectionDividerProps {
  from?: string;
  to?: string;
  flip?: boolean;
}

export default function SectionDivider({ from = '#ffffff', to = '#f7f5f0', flip = false }: SectionDividerProps) {
  return (
    <div className={`relative w-full h-16 sm:h-24 -mt-px ${flip ? 'rotate-180' : ''}`} style={{ background: to }}>
      <svg
        viewBox="0 0 1440 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 96V0C240 64 480 96 720 80C960 64 1200 16 1440 0V96H0Z"
          fill={from}
        />
      </svg>
    </div>
  );
}
