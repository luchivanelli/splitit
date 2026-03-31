"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { useAppDispatch, useAppSelector } from "@/store"
import { reset } from "@/store/splitSlice"
import { Avatar } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import { formatMoney } from "@/lib/splitAlgorithm"
import type { Balance, Transaction } from "@/types"
import { MoveLeft } from "lucide-react"

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  highlight,
  full,
}: {
  label: string
  value: string
  highlight?: boolean
  full?: boolean
}) {
  return (
    <div
      className={[
        "rounded-2xl p-4 md:p-5 border stat-card",
        highlight
          ? "bg-accent border-accent"
          : "bg-surface border-border",
        full ? "col-span-2 md:col-span-1" : "",
      ].join(" ")}
    >
      <p
        className={`text-[10px] md:text-sm font-medium uppercase tracking-[0.12em] mb-1.5 ${
          highlight ? "text-bg/70" : "text-muted"
        }`}
      >
        {label}
      </p>
      <p
        className={`font-bebas text-3xl md:text-4xl leading-none ${
          highlight ? "text-bg" : "text-text-primary"
        }`}
      >
        {value}
      </p>
    </div>
  )
}

// ─── Balance Card ─────────────────────────────────────────────────────────────

function BalanceCard({ balance }: { balance: Balance }) {
  const isPositive = balance.balance > 0.005
  const isNegative = balance.balance < -0.005

  const badgeVariant = isPositive ? "positive" : isNegative ? "negative" : "neutral"
  const badgeText = isPositive ? "Recibe" : isNegative ? "Debe pagar" : "En cero"
  const sign = isPositive ? "+" : isNegative ? "−" : ""
  const balanceColor = isPositive
    ? "text-accent"
    : isNegative
    ? "text-danger"
    : "text-muted"

  return (
    <div className="breakdown-card bg-surface border border-border rounded-2xl p-4 md:p-5">
      {/* Header */}
      <div className="flex items-center gap-3 md:gap-4 mb-3.5 md:mb-6">
        <Avatar name={balance.name} colorIndex={balance.colorIndex} />
        <span className="font-semibold text-[15px] md:text-lg flex-1">{balance.name}</span>
        <Badge variant={badgeVariant}>{badgeText}</Badge>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div>
          <p className="text-[10px] md:text-sm uppercase tracking-[0.1em] text-muted mb-1">Gastó</p>
          <p className="font-mono text-sm md:text-xl text-text-primary">{formatMoney(balance.amount)}</p>
        </div>
        <div>
          <p className="text-[10px] md:text-sm uppercase tracking-[0.1em] text-muted mb-1">Le corresponde</p>
          <p className="font-mono text-sm md:text-xl text-text-primary">{formatMoney(balance.share)}</p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="text-[10px] md:text-sm uppercase tracking-[0.1em] text-muted mb-1">Balance</p>
          <p className={`font-mono text-base md:text-xl font-medium ${balanceColor}`}>
            {sign}{formatMoney(Math.abs(balance.balance))}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Transaction Card ─────────────────────────────────────────────────────────

function TransactionCard({ tx }: { tx: Transaction }) {
  return (
    <div className="tx-card bg-surface border border-border rounded-2xl p-4 md:p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 text-sm md:text-lg font-medium leading-snug">
          <span className="text-danger">{tx.from}</span>
          {" le paga a "}
          <span className="text-info">{tx.to}</span>
        </div>
        <span className="font-bebas text-[26px] md:text-3xl leading-none text-text-primary">
          {formatMoney(tx.amount)}
        </span>
      </div>

      <div className="flex items-center gap-2 pt-3 md:pt-4 border-t border-border">
        <Avatar name={tx.from} colorIndex={tx.fromColorIndex} size="sm" />
        <span className="text-accent text-xs">→</span>
        <Avatar name={tx.to} colorIndex={tx.toColorIndex} size="sm" />
        <span className="text-muted text-xs md:text-sm ml-auto">transferencia</span>
      </div>
    </div>
  )
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="block w-4 h-px bg-accent flex-shrink-0" />
      <span className="font-mono text-[10px] md:text-sm text-accent tracking-[0.15em] uppercase">
        {children}
      </span>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ResultsSection() {
  const dispatch = useAppDispatch()
  const result = useAppSelector((s) => s.split.result)
  const containerRef = useRef<HTMLDivElement>(null)
  const prevResultRef = useRef<typeof result>(null)

  useEffect(() => {
    if (!result || !containerRef.current) return
    // Only animate when result freshly arrives (not on re-renders)
    if (prevResultRef.current === result) return
    prevResultRef.current = result

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      // Container fade in
      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5 }
      )

      // Stat cards stagger
      tl.fromTo(
        ".stat-card",
        { opacity: 0, y: 16, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.07 },
        "-=0.25"
      )

      // Breakdown cards stagger
      tl.fromTo(
        ".breakdown-card",
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.08 },
        "-=0.2"
      )

      // Transaction cards stagger with slight bounce
      tl.fromTo(
        ".tx-card",
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.09,
          ease: "back.out(1.4)",
        },
        "-=0.15"
      )
    }, containerRef)

    // Scroll into view after animation starts
    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)

    return () => ctx.revert()
  }, [result])

  if (!result) return null

  const { total, share, balances, transactions } = result

  return (
    <div ref={containerRef} className="opacity-0">

      {/* Stats */}
      <SectionLabel>Resultado</SectionLabel>
      <h2 className="font-bebas text-3xl md:text-4xl tracking-wide mb-4 text-text-primary">
        Resumen
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 mb-8">
        <StatCard label="Total gastado" value={formatMoney(total)} highlight full />
        <StatCard label="Participantes" value={String(balances.length)} />
        <StatCard label="Parte de cada uno" value={formatMoney(share)} />
      </div>

      {/* Breakdown */}
      <SectionLabel>Desglose</SectionLabel>
      <div className="flex flex-col gap-2.5 mb-8">
        {balances.map((b) => (
          <BalanceCard key={b.id} balance={b} />
        ))}
      </div>

      {/* Transactions */}
      <SectionLabel>Transacciones</SectionLabel>
      <p className="text-muted text-xs md:text-sm mb-3 tracking-wide">
        Quién le paga a quién para quedar a mano:
      </p>

      {transactions.length === 0 ? (
        <div className="text-center py-8 text-muted text-sm md:text-lg bg-surface rounded-2xl border border-dashed border-border">
          🎉 ¡Todos gastaron lo mismo! No hay transferencias necesarias.
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {transactions.map((tx, i) => (
            <TransactionCard key={i} tx={tx} />
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => dispatch(reset())}
          className="text-muted text-sm md:text-base px-4 py-2.5 rounded-xl border border-border hover:text-text-primary hover:border-text-primary transition-colors"
        >
          <MoveLeft className="inline-block w-5 h-5 md:w-6 md:h-6 mr-0.5 pb-0.5"/>
          Empezar de nuevo
        </button>
      </div>
    </div>
  )
}
