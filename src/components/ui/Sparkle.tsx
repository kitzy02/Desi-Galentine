interface SparkleProps {
    className?: string
    size?: number
  }
  
  export default function Sparkle({ className = '', size = 20 }: SparkleProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
          fill="currentColor"
        />
      </svg>
    )
  }