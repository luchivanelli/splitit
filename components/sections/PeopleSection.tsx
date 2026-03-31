"use client"

import { useAppDispatch, useAppSelector } from "@/store"
import { addPerson, calculate } from "@/store/splitSlice"
import { PersonCard } from "@/components/PersonCard"
import { MoveRight } from 'lucide-react';

export function PeopleSection() {
  const dispatch = useAppDispatch()
  const people = useAppSelector((s) => s.split.people)
  const result = useAppSelector((s) => s.split.result)

  const validCount = people.filter((p) => p.name.trim() !== "").length
  const canCalculate = validCount >= 2

  return (
    <section>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="block w-5 h-px bg-accent flex-shrink-0" />
        <span className="font-mono text-[10px] md:text-sm text-accent tracking-[0.15em] uppercase">
          Participantes
        </span>
      </div>

      <h2 className="font-bebas text-3xl md:text-4xl tracking-wide mb-5 text-text-primary">
        ¿Quiénes están en el grupo?
      </h2>

      {/* Cards */}
      <div className="flex flex-col gap-2.5 mb-4">
        {people.map((person, index) => (
          <PersonCard key={person.id} person={person} index={index} />
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => dispatch(addPerson())}
          className="flex items-center gap-2 bg-surface2 border border-border text-text-primary text-sm md:text-base font-medium px-4 py-2.5 rounded-xl hover:bg-border transition-colors"
        >
          <span className="text-accent text-base leading-none">+</span>
          Agregar persona
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-border to-transparent my-8" />

      {/* Calculate */}
      {!result && (
        <button
          disabled={!canCalculate}
          onClick={() => dispatch(calculate())}
          className="w-full bg-accent text-bg font-bold text-base md:text-lg py-4 rounded-2xl tracking-wide disabled:opacity-25 disabled:cursor-not-allowed hover:not-disabled:opacity-90 transition-all active:scale-[0.98]"
        >
          Calcular división
          <MoveRight className="inline-block w-5 h-5 md:w-6 md:h-6 ml-0.5 pb-0.5"/>
        </button>
      )}
    </section>
  )
}
