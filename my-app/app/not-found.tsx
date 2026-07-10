import Link from "next/link";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-slate-50 p-6 text-center"><div><p className="text-sm font-black text-emerald-700">404</p><h1 className="mt-3 text-4xl font-black tracking-[-.05em]">Page not found</h1><p className="mt-3 text-slate-500">That route does not exist in this demo.</p><Link className="button-primary mt-6" href="/">Return home</Link></div></main>;
}
