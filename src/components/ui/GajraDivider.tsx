interface Props {
  className?: string
}

export default function GajraDivider({ className = "" }: Props) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="w-5 h-5 rounded-full 
                     bg-gradient-to-br 
                     from-white to-pink-100
                     shadow-md border border-pink-200"
        />
      ))}
    </div>
  )
}
