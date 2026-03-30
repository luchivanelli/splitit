import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { nanoid } from "nanoid"
import type { Person, SplitResult } from "@/types"
import { calculateSplit } from "@/lib/splitAlgorithm"

interface SplitState {
  people: Person[]
  result: SplitResult | null
  error: string | null
}

const makePerson = (): Person => ({ id: nanoid(), name: "", amount: 0 })

const initialState: SplitState = {
  people: [makePerson(), makePerson(), makePerson()],
  result: null,
  error: null,
}

export const splitSlice = createSlice({
  name: "split",
  initialState,
  reducers: {
    addPerson(state) {
      state.people.push(makePerson())
    },

    removePerson(state, action: PayloadAction<string>) {
      state.people = state.people.filter((p) => p.id !== action.payload)
    },

    updatePerson(
      state,
      action: PayloadAction<{ id: string; patch: Partial<Omit<Person, "id">> }>
    ) {
      const person = state.people.find((p) => p.id === action.payload.id)
      if (person) Object.assign(person, action.payload.patch)
    },

    calculate(state) {
      try {
        state.result = calculateSplit(state.people)
        state.error = null
      } catch (e) {
        state.error = (e as Error).message
        state.result = null
      }
    },

    reset(state) {
      state.people = [makePerson(), makePerson(), makePerson()]
      state.result = null
      state.error = null
    },
  },
})

export const { addPerson, removePerson, updatePerson, calculate, reset } = splitSlice.actions
export default splitSlice.reducer