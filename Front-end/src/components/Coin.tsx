export function CoinMascot({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-sm"
      aria-label="Coin Mascot"
    >
      {/* Coin Body */}
      <circle cx="50" cy="50" r="48" fill="#FCD34D" />
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="#F59E0B"
        strokeWidth="4"
        strokeOpacity="0.5"
      />

      {/* Shine/Highlight */}
      <path
        d="M25 25 Q 40 15 60 20"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Eyes */}
      <circle cx="35" cy="45" r="5" fill="#4B5563" />
      <circle cx="65" cy="45" r="5" fill="#4B5563" />

      {/* Smile */}
      <path
        d="M35 60 Q 50 70 65 60"
        stroke="#4B5563"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Cheeks */}
      <circle cx="28" cy="55" r="4" fill="#F87171" opacity="0.4" />
      <circle cx="72" cy="55" r="4" fill="#F87171" opacity="0.4" />
    </svg>
  )
}
