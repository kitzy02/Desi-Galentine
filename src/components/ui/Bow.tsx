interface BowProps extends React.SVGProps<SVGSVGElement> {
    size?: number
  }
  
  export default function Bow({ className = '', size = 40, ...props }: BowProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        {/* SVG content unchanged */}
      </svg>
    )
  }
  