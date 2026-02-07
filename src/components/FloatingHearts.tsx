const hearts = Array.from({ length: 18 }, (_, i) => {
  const size = 8 + Math.random() * 12
  const opacity = 0.1 + Math.random() * 0.2
  const duration = 15 + Math.random() * 10
  const delay = Math.random() * duration
  const left = Math.random() * 100

  return (
    <svg
      key={i}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="fixed text-accent pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        bottom: '-20px',
        zIndex: 0,
        ['--heart-opacity' as string]: opacity,
        animation: `float-up ${duration}s linear ${delay}s infinite`,
        opacity: 0,
      }}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
})

export default function FloatingHearts() {
  return <>{hearts}</>
}
