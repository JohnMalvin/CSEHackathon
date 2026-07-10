import React from "react";

export type Product = {
  name: string;
  type: string;
  price: string;
  color: string;
  accent: string;
  label: string;
};

type ItemCardProps = {
  product: Product;
  isBestseller?: boolean;
  icon?: "leaf" | "sparkles";
};

function CardIcon({ name, className }: { name: "heart" | "leaf" | "sparkles"; className: string }) {
  const paths = {
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    leaf: <><path d="M20 4c-8 0-14 4-14 10 0 3 2 5 5 5 6 0 9-7 9-15Z" /><path d="M4 21c2-5 6-9 12-12" /></>,
    sparkles: <><path d="m12 3 1.3 3.7L17 8l-3.7 1.3L12 13l-1.3-3.7L7 8l3.7-1.3L12 3Z" /><path d="m19 14 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14Z" /></>,
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export default function ItemCard({ product, isBestseller = false, icon = "leaf" }: ItemCardProps) {
  return (
    <article className="group rounded-[2rem] border border-[#173d2b]/[.07] bg-white p-3 shadow-[0_12px_40px_rgba(23,61,43,.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(23,61,43,.12)]">
      <div className={`relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[1.45rem] ${product.color}`}>
        {isBestseller && (
          <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-wider">
            Bestseller
          </span>
        )}
        <button className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/80 transition hover:bg-white" aria-label={`Save ${product.name}`}>
          <CardIcon name="heart" className="h-4 w-4" />
        </button>
        <div className={`flex h-[65%] w-[35%] rotate-6 flex-col items-center rounded-2xl ${product.accent} p-4 text-white shadow-2xl transition duration-500 group-hover:-rotate-3 group-hover:scale-105`}>
          <span className="text-[8px] font-bold tracking-[.2em]">{product.label}</span>
          <CardIcon name={icon} className="my-auto h-10 w-10" />
          <span className="text-sm font-black">{product.name.toUpperCase()}</span>
        </div>
      </div>
      <div className="flex items-start justify-between p-4">
        <div>
          <p className="text-xs font-semibold text-[#173d2b]/50">{product.type}</p>
          <h3 className="mt-1 text-lg font-black">{product.name}</h3>
        </div>
        <span className="text-sm font-black">{product.price}</span>
      </div>
    </article>
  );
}
