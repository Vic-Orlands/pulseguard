export const PulseGuardLogo = () => (
  <div
    className="mr-2 relative"
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <svg
      viewBox="0 0 200 60"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: "60px", width: "200px" }}
    >
      <path
        d="M8 16 L20 12 L32 16 L32 28 C32 36 20 44 20 44 C20 44 8 36 8 28 Z"
        fill="currentColor"
        className="text-primary"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 28 L15 28 L17 22 L19 34 L22 20 L24 32 L26 28 L28 28"
        fill="none"
        stroke="var(--background)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <text
        x="45"
        y="30"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="18"
        fontWeight="700"
        fill="currentColor"
        className="text-foreground"
      >
        PulseGuard
      </text>
      <text
        x="45"
        y="45"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="9"
        fontWeight="400"
        fill="currentColor"
        className="text-muted-foreground"
        letterSpacing="0.5px"
      >
        MONITORING • OBSERVABILITY
      </text>
    </svg>
  </div>
);
