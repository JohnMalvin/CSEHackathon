"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useDemo } from "@/components/DemoProvider";
import type { Evidence, Product, ProductStatus, ScoreBreakdown as ScoreBreakdownType, UserRole } from "@/types";

export function Navbar() {
  const pathname = usePathname();
  const { role, setRole } = useDemo();
  const [open, setOpen] = useState(false);
  const links = [{ href: "/", label: "Home" }, { href: "/search", label: "Browse Products" }, { href: "/company", label: "Company Portal" }, { href: "/validator", label: "Validator Portal" }];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#fbfcf9]/95 backdrop-blur">
      <div className="page-shell flex min-h-18 items-center justify-between gap-5 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 font-black tracking-[-.03em] text-slate-950">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-900 text-sm text-white">E</span>
          <span className="text-lg">Evermark</span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {links.map((link) => <Link key={link.href} href={link.href} className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition ${pathname === link.href ? "bg-emerald-50 text-emerald-900" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`}>{link.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-2 sm:flex">
          <label htmlFor="role" className="text-xs font-bold uppercase tracking-wider text-slate-500">Demo as</label>
          <select id="role" value={role} onChange={(event) => setRole(event.target.value as UserRole)} className="input !w-auto !py-2 text-sm font-semibold">
            <option value="consumer">Consumer</option><option value="company">Company</option><option value="validator">Validator</option>
          </select>
        </div>
        <button onClick={() => setOpen(!open)} className="focus-ring rounded-xl border border-slate-200 p-2.5 lg:hidden" aria-expanded={open} aria-label="Toggle navigation">☰</button>
      </div>
      {open && <nav className="page-shell grid gap-1 border-t border-slate-200 py-3 lg:hidden">{links.map((link) => <Link onClick={() => setOpen(false)} key={link.href} href={link.href} className="rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-slate-100">{link.label}</Link>)}<label className="mt-2 text-xs font-bold text-slate-500 sm:hidden">DEMO ROLE<select value={role} onChange={(event) => setRole(event.target.value as UserRole)} className="input mt-2"><option value="consumer">Consumer</option><option value="company">Company</option><option value="validator">Validator</option></select></label></nav>}
    </header>
  );
}

export function Footer() {
  return <footer className="border-t border-slate-200 bg-slate-950 text-slate-300"><div className="page-shell grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4"><div className="lg:col-span-2"><p className="text-lg font-black text-white">Evermark</p><p className="mt-3 max-w-md text-sm leading-6 text-slate-400">Independent durability evidence, made easier to understand. Demo scores are illustrative and are not verified real-world claims.</p></div><div><p className="font-bold text-white">Explore</p><div className="mt-3 grid gap-2 text-sm"><Link href="/search">Browse products</Link><Link href="/company">Submit a product</Link></div></div><div><p className="font-bold text-white">Method</p><div className="mt-3 grid gap-2 text-sm"><a href="#how-it-works">How it works</a><Link href="/validator">Verification portal</Link></div></div></div><div className="border-t border-slate-800 py-5 text-center text-xs text-slate-500">Hackathon MVP · Built for transparent product longevity</div></footer>;
}

export function AppShell({ children }: { children: React.ReactNode }) { return <><Navbar /><main className="min-h-[70vh]">{children}</main><Footer /></>; }

export function RoleNotice({ allowed, children }: { allowed: UserRole[]; children: React.ReactNode }) {
  const { role } = useDemo();
  if (allowed.includes(role)) return null;
  return <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-950"><strong>Demo access:</strong> {children} You can still explore this page as a judge.</div>;
}

export function LongevityScore({ score, size = "md" }: { score?: number; size?: "sm" | "md" | "lg" }) {
  const value = score ?? 0;
  const label = value >= 90 ? "Excellent" : value >= 80 ? "Good" : value >= 65 ? "Fair" : "Poor";
  const dimensions = size === "lg" ? "h-32 w-32" : size === "sm" ? "h-14 w-14" : "h-20 w-20";
  return <div className={`grid ${dimensions} shrink-0 place-items-center rounded-full p-[5px]`} style={{ background: `conic-gradient(#047857 ${value * 3.6}deg, #dbe4df 0deg)` }} aria-label={`Longevity Score ${value}, ${label}`}><div className="grid h-full w-full place-items-center rounded-full bg-white text-center"><div><strong className={size === "lg" ? "text-4xl" : size === "sm" ? "text-lg" : "text-2xl"}>{value}</strong><span className="block text-[9px] font-bold uppercase tracking-wide text-slate-500">{label}</span></div></div></div>;
}

export function StatusBadge({ status }: { status: ProductStatus }) {
  const labels: Record<ProductStatus, string> = { draft: "Draft", pending: "Pending Review", more_evidence_required: "More Evidence Required", approved: "Approved", rejected: "Rejected" };
  const tones: Record<ProductStatus, string> = { draft: "bg-slate-100 text-slate-700", pending: "bg-amber-100 text-amber-800", more_evidence_required: "bg-orange-100 text-orange-800", approved: "bg-emerald-100 text-emerald-800", rejected: "bg-red-100 text-red-800" };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${tones[status]}`}>{labels[status]}</span>;
}

export function StatusExplanation({ product }: { product: Product }) {
  const text: Record<ProductStatus, string> = { draft: "Finish the missing fields, then submit when ready.", pending: "Our validation team is reviewing the submitted evidence.", more_evidence_required: product.statusReason || "Upload the requested supporting evidence to continue.", approved: "Verified for this demo and visible in public search results.", rejected: product.statusReason || "This submission did not provide enough support for its claims." };
  return <p className="mt-2 max-w-lg text-xs leading-5 text-slate-500">{text[product.status]}</p>;
}

export function RepairabilityBadge({ score }: { score?: number }) { const good = (score ?? 0) >= 80; return <span className={`badge ${good ? "bg-teal-50 text-teal-800" : "bg-slate-100 text-slate-700"}`}>{good ? "Highly repairable" : "Limited repair"}</span>; }
export function SustainabilityBadge() { return <span className="badge bg-lime-50 text-lime-800">Sustainability evidence</span>; }
export function CategoryChip({ label, active = false, onClick }: { label: string; active?: boolean; onClick?: () => void }) { return <button type="button" onClick={onClick} className={`focus-ring rounded-full border px-4 py-2 text-sm font-bold transition ${active ? "border-emerald-900 bg-emerald-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400"}`}>{label}</button>; }

export function ProductVisual({ product, compact = false }: { product: Product; compact?: boolean }) {
  return <div className={`relative grid overflow-hidden bg-gradient-to-br ${product.visualTone} ${compact ? "h-28" : "aspect-[4/3]"} place-items-center rounded-2xl`}><span className="absolute left-4 top-4 text-[10px] font-black uppercase tracking-[.18em] text-slate-600">{product.category}</span><span className={`${compact ? "text-5xl" : "text-7xl"} font-black text-slate-800/70`}>{product.visual}</span><span className="absolute bottom-3 right-4 text-[10px] font-bold text-slate-600">ILLUSTRATIVE</span></div>;
}

export function ProductCard({ product }: { product: Product }) {
  return <article className="card group flex h-full flex-col p-3 transition duration-300 hover:-translate-y-1 hover:shadow-xl"><ProductVisual product={product} /><div className="flex flex-1 flex-col p-3 pt-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">{product.brand}</p><h3 className="mt-1 text-xl font-black tracking-[-.03em] text-slate-950">{product.name}</h3></div><LongevityScore score={product.longevityScore} size="sm" /></div><div className="mt-4 flex flex-wrap gap-2"><RepairabilityBadge score={product.repairabilityScore} />{product.certifications.length > 0 && <SustainabilityBadge />}</div><dl className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-sm"><div><dt className="text-xs text-slate-500">Expected life</dt><dd className="font-bold">{product.expectedLifespanYears} years</dd></div><div><dt className="text-xs text-slate-500">Warranty</dt><dd className="font-bold">{product.warrantyYears} years</dd></div></dl><Link href={`/product/${product.id}`} className="button-secondary mt-5 w-full">View details <span aria-hidden="true">→</span></Link></div></article>;
}

export function SearchBar({ value, onChange, placeholder = "Search products or brands…" }: { value: string; onChange: (value: string) => void; placeholder?: string }) { return <div className="relative"><span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">⌕</span><input type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="input pl-11" aria-label="Search products" /></div>; }

export function EmptyState({ title, text, action }: { title: string; text: string; action?: React.ReactNode }) { return <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-xl">⌕</div><h3 className="mt-4 text-lg font-black">{title}</h3><p className="mx-auto mt-2 max-w-md text-sm text-slate-500">{text}</p>{action && <div className="mt-5">{action}</div>}</div>; }

export function ScoreBreakdown({ scores }: { scores: ScoreBreakdownType }) {
  const labels: [keyof ScoreBreakdownType, string][] = [["lifespan", "Lifespan"], ["warranty", "Warranty"], ["repairability", "Repairability"], ["replacementParts", "Replacement parts"], ["materials", "Materials"], ["sustainability", "Sustainability"]];
  return <div className="grid gap-4">{labels.map(([key, label]) => <div key={key}><div className="mb-1.5 flex justify-between text-sm"><span className="font-semibold">{label}</span><strong>{scores[key]}</strong></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-700" style={{ width: `${scores[key]}%` }} /></div></div>)}</div>;
}

export function EvidenceCard({ evidence }: { evidence: Evidence }) { return <div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="flex items-start justify-between gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100">▤</span>{evidence.verified && <span className="badge bg-emerald-50 text-emerald-800">Verified</span>}</div><p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">{evidence.type}</p><p className="mt-1 font-bold">{evidence.title}</p>{evidence.sourceUrl && <a className="mt-3 inline-block text-xs font-bold text-emerald-700 hover:underline" href={evidence.sourceUrl} target="_blank" rel="noreferrer">Open source ↗</a>}{evidence.filename && <p className="mt-3 text-xs text-slate-500">File: {evidence.filename}</p>}</div>; }

export function LoadingSkeleton() { return <div className="grid animate-pulse gap-5 md:grid-cols-3">{[1,2,3].map((n) => <div key={n} className="h-96 rounded-3xl bg-slate-200" />)}</div>; }
