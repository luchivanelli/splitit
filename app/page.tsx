import { PeopleSection } from "@/components/sections/PeopleSection"
import { ResultsSection } from "@/components/sections/ResultsSection"

export default function Home() {
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 pt-10 pb-24">
      {/* Header */}
      <header className="mb-12">
        <h1 className="font-bebas text-[clamp(64px,18vw,108px)] leading-[0.88] tracking-tight text-text-primary">
          Split<span className="text-accent">It</span>
        </h1>
        <div className="flex items-center gap-2.5 mt-3">
          <span className="block w-7 h-px bg-accent" />
          <p className="font-mono text-[11px] md:text-lg text-muted tracking-[0.12em] uppercase">
            División automática de gastos grupales
          </p>
        </div>
      </header>

      {/* Sections */}
      <PeopleSection />
      <ResultsSection />
    </div>
  )
}
