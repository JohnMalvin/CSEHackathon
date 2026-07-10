"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import ItemCard, { type Product } from "@/components/Itemcard";



type IconName =
  | "arrow"
  | "bag"
  | "heart"
  | "leaf"
  | "menu"
  | "search"
  | "shield"
  | "sparkles"
  | "star"
  | "user";

function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    bag: <path d="M6 8h12l-1 12H7L6 8Zm3 0V6a3 3 0 0 1 6 0v2" />,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    leaf: <><path d="M20 4c-8 0-14 4-14 10 0 3 2 5 5 5 6 0 9-7 9-15Z" /><path d="M4 21c2-5 6-9 12-12" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-3-10 2 2 4-4" />,
    sparkles: <><path d="m12 3 1.3 3.7L17 8l-3.7 1.3L12 13l-1.3-3.7L7 8l3.7-1.3L12 3Z" /><path d="m19 14 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14ZM5 14l.7 1.3L7 16l-1.3.7L5 18l-.7-1.3L3 16l1.3-.7L5 14Z" /></>,
    star: <path d="m12 2 3 6.1 6.7 1-4.8 4.7 1.1 6.7-6-3.2-6 3.2 1.1-6.7-4.8-4.7 6.7-1L12 2Z" />,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const categories = ["Supplements", "Nutrition", "Sleep", "Fitness", "Mindfulness"];

const products: Product[] = [
  { name: "Daily Greens", type: "Daily nutrition", price: "$44", color: "bg-[#dbe8c9]", accent: "bg-[#78945b]", label: "VITA / 01" },
  { name: "Deep Sleep", type: "Nightly support", price: "$38", color: "bg-[#d9dcef]", accent: "bg-[#626b96]", label: "VITA / 02" },
  { name: "Focus Flow", type: "Clarity blend", price: "$42", color: "bg-[#f3d9bd]", accent: "bg-[#cf815d]", label: "VITA / 03" },
];

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return products;

    return products.filter((product) =>
      [product.name, product.type, product.label].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [searchQuery]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f5ef] text-[#173d2b]">
      <div className="bg-[#173d2b] px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white sm:text-xs">
        Free shipping on orders over $60 · New members save 15%
      </div>

      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <Link href="#" className="flex items-center gap-2 text-xl font-black tracking-[-0.04em]" aria-label="Vita home">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#dfff71]">
            <Icon name="leaf" className="h-4 w-4" />
          </span>
          VITA
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold lg:flex" aria-label="Main navigation">
          <Link href="#shop" className="transition hover:text-[#e45e3b]">Shop</Link>
          <Link href="#categories" className="transition hover:text-[#e45e3b]">Categories</Link>
          <Link href="#why-vita" className="transition hover:text-[#e45e3b]">Why VITA</Link>
          <Link href="#journal" className="transition hover:text-[#e45e3b]">Journal</Link>
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <Link href="#product-search" className="rounded-full p-2.5 transition hover:bg-white" aria-label="Search"><Icon name="search" /></Link>
          <button className="hidden rounded-full p-2.5 transition hover:bg-white sm:block" aria-label="Account"><Icon name="user" /></button>
          <button className="relative rounded-full p-2.5 transition hover:bg-white" aria-label="Shopping bag">
            <Icon name="bag" />
            <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-[#e45e3b] text-[9px] font-bold text-white">2</span>
          </button>
          <button className="rounded-full p-2.5 transition hover:bg-white lg:hidden" aria-label="Open menu"><Icon name="menu" /></button>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-8 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:px-12 lg:pb-28 lg:pt-14">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#173d2b]/15 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em]">
            <Icon name="sparkles" className="h-4 w-4 text-[#e45e3b]" /> Curated for a better you
          </div>
          <h1 className="text-[clamp(3.5rem,8vw,7.4rem)] font-black leading-[0.83] tracking-[-0.075em]">
            Feel good.<br />
            <span className="relative inline-block text-[#e45e3b]">
              Live more.
              <svg className="absolute -bottom-5 left-0 w-full" viewBox="0 0 430 24" fill="none" aria-hidden="true"><path d="M3 17C110 3 302 3 427 15" stroke="#e45e3b" strokeWidth="5" strokeLinecap="round" /></svg>
            </span>
          </h1>
          <p className="mt-12 max-w-lg text-base leading-7 text-[#173d2b]/70 sm:text-lg">
            Discover science-backed essentials for energy, sleep, focus, and everyday wellbeing—all vetted by experts and made to fit real life.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#shop" className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#173d2b] px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#24563e]">
              Explore the marketplace <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link href="#why-vita" className="inline-flex items-center justify-center rounded-full border border-[#173d2b]/25 px-7 py-4 text-sm font-bold transition hover:bg-white">How we curate</Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[#173d2b]/15 pt-6">
            <div className="flex -space-x-2">
              {["#e7b48f", "#829f7a", "#d6a58a", "#8095af"].map((color, i) => <span key={color} className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#f7f5ef] text-[10px] font-bold text-white" style={{ backgroundColor: color }}>V{i + 1}</span>)}
            </div>
            <div><div className="flex gap-0.5 text-[#e45e3b]">{Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" className="h-3.5 w-3.5 fill-current" />)}</div><p className="mt-1 text-xs font-semibold">Loved by 12,000+ members</p></div>
          </div>
        </div>

        <div className="relative mx-auto h-[500px] w-full max-w-[570px] sm:h-[620px]">
          <div className="absolute inset-x-2 top-12 h-[88%] rounded-[3rem] bg-[#dfff71] sm:inset-x-8" />
          <div className="absolute left-0 top-0 rounded-full bg-white px-4 py-2.5 text-xs font-bold shadow-[0_10px_40px_rgba(23,61,43,.12)] sm:left-3 sm:top-8">100% feel-good finds</div>
          <div className="absolute -right-1 top-24 z-20 flex h-24 w-24 rotate-12 items-center justify-center rounded-full bg-[#e45e3b] text-center text-xs font-black uppercase leading-4 tracking-wider text-white sm:right-0 sm:h-28 sm:w-28">New<br />drops<br />weekly</div>

          <div className="absolute left-[12%] top-[22%] z-10 h-[58%] w-[34%] -rotate-12 rounded-[1.8rem] bg-[#efe6ce] p-4 shadow-[0_30px_70px_rgba(23,61,43,.2)] sm:left-[14%]">
            <div className="flex h-full flex-col items-center rounded-[1.2rem] border border-[#173d2b]/15 px-3 py-5 text-center">
              <Icon name="leaf" className="h-7 w-7" /><span className="mt-4 text-[9px] font-bold tracking-[.3em]">VITA DAILY</span>
              <div className="my-auto grid h-24 w-24 place-items-center rounded-full bg-[#cfdfaf]"><span className="text-4xl font-black">01</span></div>
              <span className="text-lg font-black">GREENS</span><span className="text-[9px] uppercase tracking-widest">30 daily serves</span>
            </div>
          </div>
          <div className="absolute right-[12%] top-[15%] z-[5] h-[62%] w-[34%] rotate-[10deg] rounded-[1.8rem] bg-[#d8dcef] p-4 shadow-[0_30px_70px_rgba(23,61,43,.2)] sm:right-[15%]">
            <div className="flex h-full flex-col items-center rounded-[1.2rem] border border-[#173d2b]/15 px-3 py-5 text-center">
              <Icon name="sparkles" className="h-7 w-7" /><span className="mt-4 text-[9px] font-bold tracking-[.3em]">VITA NIGHT</span>
              <div className="my-auto grid h-24 w-24 place-items-center rounded-full bg-[#bfc6e2]"><span className="text-4xl font-black">02</span></div>
              <span className="text-lg font-black">SLEEP</span><span className="text-[9px] uppercase tracking-widest">Rest & reset</span>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 z-20 max-w-[220px] rounded-2xl bg-white p-4 shadow-[0_20px_50px_rgba(23,61,43,.15)] sm:bottom-8 sm:right-0">
            <div className="flex items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f3d9bd]"><Icon name="shield" className="h-5 w-5" /></span><p className="text-xs font-bold leading-5">Every product independently reviewed by our wellness team.</p></div>
          </div>
        </div>
      </section>

      <section id="categories" className="border-y border-[#173d2b]/10 bg-white py-6">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-5 [scrollbar-width:none] sm:px-8 lg:px-12">
          <span className="shrink-0 py-3 text-xs font-black uppercase tracking-[.18em] text-[#173d2b]/45">Shop by need</span>
          {categories.map((category) => <Link key={category} href="#shop" className="shrink-0 rounded-full bg-[#f7f5ef] px-5 py-3 text-sm font-bold transition hover:bg-[#dfff71]">{category}</Link>)}
        </div>
      </section>

      <section id="shop" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div><p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-[#e45e3b]">Community favourites</p><h2 className="text-4xl font-black tracking-[-.045em] sm:text-5xl">Start feeling better</h2></div>
          <Link href="#" className="hidden items-center gap-2 text-sm font-bold sm:flex">Shop all <Icon name="arrow" className="h-4 w-4" /></Link>
        </div>

        <div className="relative mb-8 max-w-2xl">
          <Icon name="search" className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#173d2b]/45" />
          <input
            id="product-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search products, benefits, or categories..."
            className="w-full rounded-full border border-[#173d2b]/15 bg-white py-4 pl-14 pr-6 text-sm font-semibold text-[#173d2b] shadow-[0_10px_35px_rgba(23,61,43,.06)] outline-none transition placeholder:font-medium placeholder:text-[#173d2b]/40 focus:border-[#173d2b]/40 focus:ring-4 focus:ring-[#dfff71]/60"
            aria-label="Search products"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {filteredProducts.map((product) => {
            const productIndex = products.findIndex((item) => item.name === product.name);

            return (
              <ItemCard
                key={product.name}
                product={product}
                isBestseller={productIndex === 0}
                icon={productIndex === 1 ? "sparkles" : "leaf"}
              />
            );
          })}
        </div>
        {filteredProducts.length === 0 && (
          <div className="rounded-[2rem] border border-dashed border-[#173d2b]/20 bg-white/60 px-6 py-14 text-center">
            <p className="text-lg font-black">No products found</p>
            <p className="mt-2 text-sm text-[#173d2b]/60">Try a different product name or benefit.</p>
            <button type="button" onClick={() => setSearchQuery("")} className="mt-5 rounded-full bg-[#173d2b] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#24563e]">Clear search</button>
          </div>
        )}
      </section>

      <section id="why-vita" className="bg-[#173d2b] px-5 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.1fr_1fr_1fr_1fr] md:items-center">
          <h2 className="max-w-xs text-3xl font-black tracking-[-.04em]">Wellness without the guesswork.</h2>
          {[{ icon: "shield" as const, title: "Expert vetted", text: "Every claim and ingredient reviewed." }, { icon: "leaf" as const, title: "Better choices", text: "Clean, transparent and responsible." }, { icon: "sparkles" as const, title: "Made for you", text: "Find what fits your real routine." }].map((item) => <div key={item.title} className="flex gap-4 md:block"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#dfff71] text-[#173d2b]"><Icon name={item.icon} className="h-5 w-5" /></span><div><h3 className="mt-0 font-bold md:mt-4">{item.title}</h3><p className="mt-1 text-sm leading-6 text-white/60">{item.text}</p></div></div>)}
        </div>
      </section>
    </main>
  );
}
