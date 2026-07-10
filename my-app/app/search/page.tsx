"use client";

import { use, useMemo, useState } from "react";
import { useDemo } from "@/components/DemoProvider";
import { AppShell, CategoryChip, EmptyState, ProductCard, SearchBar } from "@/components/ui";
import { categories } from "@/data/mock-products";

type SortOption = "score" | "repair" | "warranty" | "lifespan" | "price";

export default function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const initial = use(searchParams);
  const { products } = useDemo();
  const [query, setQuery] = useState(initial.q ?? "");
  const [category, setCategory] = useState(initial.category ?? "All");
  const [minScore, setMinScore] = useState(0);
  const [minWarranty, setMinWarranty] = useState(0);
  const [repairOnly, setRepairOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("score");

  const results = useMemo(() => products.filter((product) => product.status === "approved")
    .filter((product) => `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(query.toLowerCase()))
    .filter((product) => category === "All" || product.category === category)
    .filter((product) => (product.longevityScore ?? 0) >= minScore && (product.warrantyYears ?? 0) >= minWarranty)
    .filter((product) => !repairOnly || (product.repairabilityScore ?? 0) >= 80)
    .sort((a, b) => sort === "score" ? (b.longevityScore ?? 0) - (a.longevityScore ?? 0) : sort === "repair" ? (b.repairabilityScore ?? 0) - (a.repairabilityScore ?? 0) : sort === "warranty" ? (b.warrantyYears ?? 0) - (a.warrantyYears ?? 0) : sort === "lifespan" ? (b.expectedLifespanYears ?? 0) - (a.expectedLifespanYears ?? 0) : (a.price ?? 0) - (b.price ?? 0)), [products, query, category, minScore, minWarranty, repairOnly, sort]);

  const clear = () => { setQuery(""); setCategory("All"); setMinScore(0); setMinWarranty(0); setRepairOnly(false); setSort("score"); };

  return <AppShell><section className="border-b border-slate-200 bg-white"><div className="page-shell py-12"><p className="text-xs font-black uppercase tracking-[.17em] text-emerald-700">Product directory</p><h1 className="mt-3 text-4xl font-black tracking-[-.05em] sm:text-5xl">Find products made to endure</h1><p className="mt-4 max-w-2xl text-slate-500">Search approved demo products and compare their evidence-led durability profile.</p><div className="mt-8 max-w-3xl"><SearchBar value={query} onChange={setQuery} /></div></div></section>
    <div className="page-shell py-10"><div className="grid gap-8 lg:grid-cols-[260px_1fr]"><aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24"><div className="flex items-center justify-between"><h2 className="font-black">Filters</h2><button onClick={clear} className="text-xs font-bold text-emerald-700 hover:underline">Clear all</button></div><div className="mt-6 border-t border-slate-100 pt-5"><label className="text-sm font-bold" htmlFor="score">Minimum score: {minScore || "Any"}</label><input id="score" className="mt-3 w-full accent-emerald-700" type="range" min="0" max="95" step="5" value={minScore} onChange={(e) => setMinScore(Number(e.target.value))} /></div><div className="mt-5"><label className="text-sm font-bold" htmlFor="warranty">Minimum warranty</label><select id="warranty" className="input mt-2 text-sm" value={minWarranty} onChange={(e) => setMinWarranty(Number(e.target.value))}><option value="0">Any warranty</option><option value="5">5+ years</option><option value="10">10+ years</option></select></div><label className="mt-5 flex items-start gap-3 rounded-xl bg-slate-50 p-3 text-sm font-semibold"><input className="mt-1 accent-emerald-700" type="checkbox" checked={repairOnly} onChange={(e) => setRepairOnly(e.target.checked)} />Highly repairable only</label></aside>
      <div><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><p className="text-sm text-slate-500"><strong className="text-slate-950">{results.length}</strong> approved products</p><label className="flex items-center gap-3 text-sm font-bold">Sort by<select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className="input !w-auto py-2 text-sm"><option value="score">Highest Longevity Score</option><option value="repair">Best Repairability</option><option value="warranty">Longest Warranty</option><option value="lifespan">Expected Lifespan</option><option value="price">Price: Low to High</option></select></label></div><div className="mt-5 flex flex-wrap gap-2"><CategoryChip label="All" active={category === "All"} onClick={() => setCategory("All")} />{categories.map((item) => <CategoryChip key={item} label={item} active={category === item} onClick={() => setCategory(item)} />)}</div>{results.length > 0 ? <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{results.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="mt-8"><EmptyState title="No products match those filters" text="Try lowering the score or warranty threshold, or search another category." action={<button className="button-primary" onClick={clear}>Clear filters</button>} /></div>}</div></div></div></AppShell>;
}
