"use client"

import { useRef } from "react"
import { useAppDispatch } from "@/store"
import { removePerson, updatePerson } from "@/store/splitSlice"
import { AVATAR_COLORS } from "@/lib/splitAlgorithm"
import type { Person } from "@/types"

interface PersonCardProps {
  person: Person
  index: number
}

export function PersonCard({ person, index }: PersonCardProps) {
  const dispatch = useAppDispatch()
  const nameRef = useRef<HTMLInputElement>(null)

  const color = AVATAR_COLORS[index % AVATAR_COLORS.length]
  const initial = person.name.trim().charAt(0).toUpperCase() || "?"
  const hasName = person.name.trim() !== ""

  return (
    <div className="flex items-center gap-3 md:gap-4 bg-surface border border-border rounded-2xl px-4 py-3.5 focus-within:border-accent transition-colors duration-200">
      {/* Avatar */}
      <div
        className="w-9 h-9 md:h-11 md:w-11 rounded-full flex items-center justify-center font-bebas text-lg md:text-xl flex-shrink-0 transition-all duration-200"
        style={
          hasName
            ? { background: color.bg, color: color.text }
            : { background: "#242424", color: "#6b6b6b" }
        }
      >
        {initial}
      </div>

      {/* Inputs */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <input
          ref={nameRef}
          type="text"
          value={person.name}
          onChange={(e) =>
            dispatch(updatePerson({ id: person.id, patch: { name: e.target.value } }))
          }
          placeholder="Nombre"
          autoComplete="off"
          className="bg-transparent border-none outline-none text-text-primary text-[15px] md:text-lg font-medium placeholder:text-muted placeholder:font-normal w-full"
        />
        <div className="h-px bg-border" />
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-xs md:text-base text-muted">$</span>
          <input
            type="number"
            inputMode="decimal"
            value={person.amount === 0 ? "" : person.amount}
            onChange={(e) =>
              dispatch(
                updatePerson({
                  id: person.id,
                  patch: { amount: parseFloat(e.target.value) || 0 },
                })
              )
            }
            placeholder="0.00"
            min={0}
            step={0.01}
            className="bg-transparent border-none outline-none text-muted font-mono text-sm md:text-lg placeholder:text-[#444] focus:text-text-primary transition-colors w-full"
          />
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={() => dispatch(removePerson(person.id))}
        aria-label="Quitar persona"
        className="w-8 h-8 md:h-9 md:w-9 rounded-lg flex items-center justify-center text-[#3a3a3a] text-lg md:text-xl transition-colors duration-150 hover:text-danger hover:bg-danger/10 flex-shrink-0"
      >
        ✕
      </button>
    </div>
  )
}
