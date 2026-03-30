import type { Person, Balance, Transaction, SplitResult } from "@/types"

const EPSILON = 0.005

// ─── Avatar colors ───────────────────────────────────────────────────────────

export const AVATAR_COLORS: { bg: string; text: string }[] = [
  { bg: "#c8f135", text: "#0e0e0e" },
  { bg: "#5cb8ff", text: "#0e0e0e" },
  { bg: "#ff5c5c", text: "#ffffff" },
  { bg: "#c084fc", text: "#0e0e0e" },
  { bg: "#fb923c", text: "#0e0e0e" },
  { bg: "#34d399", text: "#0e0e0e" },
  { bg: "#f9a8d4", text: "#0e0e0e" },
  { bg: "#facc15", text: "#0e0e0e" },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function formatMoney(amount: number): string {
  return (
    "$" +
    Math.abs(amount).toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  )
}

// ─── Core algorithm ──────────────────────────────────────────────────────────

/*
 * Asigna a cada persona su balance respecto a la parte equitativa.
 */
export function calculateBalances(people: Person[]): Balance[] {
  const total = people.reduce((sum, p) => sum + p.amount, 0)
  const share = total / people.length

  return people.map((person, index) => ({
    ...person,
    balance: person.amount - share,
    share,
    colorIndex: index % AVATAR_COLORS.length,
  }))
}

/*
 * Algoritmo greedy de flujo de caja mínimo.
 * Genera la menor cantidad de transferencias posibles para saldar todas las deudas.
 */
export function computeTransactions(balances: Balance[]): Transaction[] {
  type Mutable = Balance & { remaining: number }

  const debtors: Mutable[] = balances
    .filter((b) => b.balance < -EPSILON)
    .map((b) => ({ ...b, remaining: b.balance }))

  const creditors: Mutable[] = balances
    .filter((b) => b.balance > EPSILON)
    .map((b) => ({ ...b, remaining: b.balance }))

  const transactions: Transaction[] = []
  let i = 0
  let j = 0

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i]
    const creditor = creditors[j]

    const amount = Math.min(-debtor.remaining, creditor.remaining)

    transactions.push({
      from: debtor.name,
      to: creditor.name,
      amount,
      fromColorIndex: debtor.colorIndex,
      toColorIndex: creditor.colorIndex,
    })

    debtor.remaining += amount
    creditor.remaining -= amount

    if (Math.abs(debtor.remaining) < EPSILON) i++
    if (Math.abs(creditor.remaining) < EPSILON) j++
  }

  return transactions
}

/**
 * Punto de entrada principal.
 * Lanza error si hay menos de 2 personas válidas.
 */
export function calculateSplit(people: Person[]): SplitResult {
  const valid = people.filter((p) => p.name.trim() !== "")

  if (valid.length < 2) {
    throw new Error("Se necesitan al menos 2 personas para dividir gastos.")
  }

  const total = valid.reduce((sum, p) => sum + p.amount, 0)
  const share = total / valid.length
  const balances = calculateBalances(valid)
  const transactions = computeTransactions(balances)

  return { total, share, balances, transactions }
}
