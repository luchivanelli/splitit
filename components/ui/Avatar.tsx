import { AVATAR_COLORS } from "@/lib/splitAlgorithm"
import clsx from "clsx"

interface AvatarProps {
  name: string
  colorIndex: number
  size?: "sm" | "md"
  className?: string
}

const sizes = {
  sm: "w-7 h-7 md:h-9 md:w-9 text-base md:text-lg",
  md: "w-9 h-9 md:h-11 md:w-11 text-lg md:text-xl",
}

export function Avatar({ name, colorIndex, size = "md", className }: AvatarProps) {
  const color = AVATAR_COLORS[colorIndex % AVATAR_COLORS.length]
  const initial = name.trim().charAt(0).toUpperCase() || "?"

  return (
    <div
      className={clsx(
        "rounded-full flex items-center justify-center font-bebas flex-shrink-0 leading-none",
        className,
        size === "sm" ? sizes.sm : sizes.md
      )}
      style={{ background: color.bg, color: color.text }}
    >
      {initial}
    </div>
  )
}
