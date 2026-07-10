"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDemo } from "@/components/DemoProvider";
import { AppShell, CategoryChip, LongevityScore, ProductCard } from "@/components/ui";
import { categories } from "@/data/mock-products";

export default function HomePage() {
  const router = useRouter();
  const { products } = useDemo();
  const [query, setQuery] = useState("");
  const featured = products.filter((product) => product.status === "approved").sort((a, b) => (b.longevityScore ?? 0) - (a.longevityScore ?? 0)).slice(0, 3);

  const submitSearch = (event: React.FormEvent) => { event.preventDefault(); router.push(`/search${query ? `?q=${encodeURIComponent(query)}` : ""}`); };

  return (
    <AppShell>
      <section className="overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_85%_15%,#d1fae5_0,transparent_28%),linear-gradient(180deg,#fbfcf9,#f2f7f2)]">
        <div className="page-shell grid min-h-[680px] items-center gap-14 py-20 lg:grid-cols-[1.08fr_.92fr] lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[.14em] text-emerald-800"><span>✓</span> Evidence-led product discovery</div>
            <h1 className="max-w-3xl text-5xl font-black leading-[.98] tracking-[-.06em] text-slate-950 sm:text-6xl lg:text-7xl">Buy products<br /><span className="text-emerald-700">designed to last.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">Compare lifespan, warranties, repairability, replacement parts, and the evidence behind every claim—before you buy.</p>
            <form onSubmit={submitSearch} className="mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-emerald-950/5 sm:flex-row">
              <label className="sr-only" htmlFor="hero-search">Search products</label><input id="hero-search" value={query} onChange={(event) => setQuery(event.target.value)} className="min-h-12 flex-1 rounded-xl px-4 outline-none" placeholder="Search laptops, furniture, tools…" /><button className="button-primary px-6" type="submit">Explore products →</button>
            </form>
            <div className="mt-5 flex flex-wrap items-center gap-4"><Link href="/company" className="button-secondary">Submit a product</Link><span className="text-xs leading-5 text-slate-500">For companies with durability<br className="hidden sm:block" /> and repair evidence</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -left-10 -top-8 h-32 w-32 rounded-full bg-lime-200 blur-2xl" />
            <div className="card relative p-5 sm:p-7">
              <div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">Verified profile</p><h2 className="mt-2 text-2xl font-black">Modular Laptop 13</h2><p className="mt-1 text-sm text-slate-500">Framework · Electronics</p></div><LongevityScore score={92} size="lg" /></div>
              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">{[["8 yrs", "Expected life"], ["96/100", "Repairability"], ["Available", "Parts"]].map(([value, label]) => <div key={label} className="rounded-2xl bg-slate-50 p-4"><strong className="block text-lg">{value}</strong><span className="text-xs text-slate-500">{label}</span></div>)}</div>
              <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-6 text-emerald-950"><strong>High evidence confidence.</strong> Repair guides, parts catalogue, and material claims are supported by submitted sources.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-20 lg:py-28">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-black uppercase tracking-[.17em] text-emerald-700">Durability shortlist</p><h2 className="mt-3 text-3xl font-black tracking-[-.04em] sm:text-4xl">Featured products built for the long run</h2></div><Link className="font-bold text-emerald-700" href="/search">Browse all products →</Link></div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featured.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>

      <section className="border-y border-slate-200 bg-white"><div className="page-shell py-16"><h2 className="text-2xl font-black tracking-[-.03em]">Explore by category</h2><div className="mt-7 flex flex-wrap gap-3">{categories.map((category) => <Link href={`/search?category=${encodeURIComponent(category)}`} key={category}><CategoryChip label={category} /></Link>)}</div></div></section>

      <section id="how-it-works" className="page-shell py-20 lg:py-28"><div className="max-w-2xl"><p className="text-xs font-black uppercase tracking-[.17em] text-emerald-700">Transparent by design</p><h2 className="mt-3 text-4xl font-black tracking-[-.04em]">From claim to credible comparison</h2></div><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{[
        ["01", "Companies submit", "Product details and durability evidence enter a structured review queue."], ["02", "Claims are reviewed", "A validator checks warranty, repair, parts, lifespan, and sustainability sources."], ["03", "A score is issued", "Approved products receive an evidence-weighted Longevity Score."], ["04", "Consumers compare", "Clear signals help people choose products with longer useful lives."],
      ].map(([number, title, text]) => <article key={number} className="card p-6"><span className="text-xs font-black text-emerald-700">{number}</span><h3 className="mt-8 text-lg font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{text}</p></article>)}</div></section>

      <section className="bg-emerald-950 text-white"><div className="page-shell grid gap-12 py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div><p className="text-xs font-black uppercase tracking-[.17em] text-emerald-300">Better signals, less guesswork</p><h2 className="mt-4 text-4xl font-black tracking-[-.04em]">Durability should be visible at the point of choice.</h2></div><div className="grid gap-4 sm:grid-cols-2">{[["Evidence over marketing", "See the source and confidence behind key claims."], ["Repair as a feature", "Compare service access and replacement-parts support."], ["Whole-life value", "Look beyond ticket price to expected useful life."], ["Accountable claims", "Companies receive clear review outcomes and next steps."]].map(([title, text]) => <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5"><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-emerald-100/65">{text}</p></div>)}</div></div></section>
    </AppShell>
  );
}
