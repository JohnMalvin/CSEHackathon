"use client";

export const validationItems = ["Official manufacturer verified", "Warranty verified", "Repair policy verified", "Replacement parts verified", "Expected lifespan reasonably supported", "Product information accurate", "Sustainability claims verified"];

export default function ValidationChecklist({ checked, onChange }: { checked: Record<string, boolean>; onChange: (item: string, value: boolean) => void }) {
  return <fieldset><legend className="text-sm font-black">Verification checklist</legend><div className="mt-4 grid gap-2">{validationItems.map((item) => <label key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold"><input className="mt-1 accent-emerald-700" type="checkbox" checked={Boolean(checked[item])} onChange={(e) => onChange(item, e.target.checked)} />{item}</label>)}</div></fieldset>;
}
