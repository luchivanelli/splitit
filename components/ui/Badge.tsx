import clsx from "clsx"

type BadgeVariant = "positive" | "negative" | "neutral"

interface BadgeProps {
  variant: BadgeVariant
  children: React.ReactNode
}

const variants: Record<BadgeVariant, string> = {
  positive: "bg-accent/10 text-accent",
  negative: "bg-danger/10 text-danger",
  neutral: "bg-surface2 text-muted",
}

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-block px-2.5 py-1 rounded-full text-[11px] md:text-sm font-semibold whitespace-nowrap",
        variants[variant]
      )}
    >
      {children}
    </span>
  )
}
