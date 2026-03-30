export interface Person {
  id: string
  name: string
  amount: number
}

export interface Balance extends Person {
  balance: number      // positivo = recibe, negativo = debe pagar
  share: number        // lo que le corresponde
  colorIndex: number
}

export interface Transaction {
  from: string
  to: string
  amount: number
  fromColorIndex: number
  toColorIndex: number
}

export interface SplitResult {
  total: number
  share: number
  balances: Balance[]
  transactions: Transaction[]
}
