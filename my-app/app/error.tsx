"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="grid min-h-screen place-items-center bg-slate-50 p-6 text-center"><div className="max-w-md"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-red-100 text-xl text-red-800">!</div><h1 className="mt-5 text-3xl font-black tracking-[-.04em]">Something went wrong</h1><p className="mt-3 text-sm leading-6 text-slate-500">The demo could not load this view. Your saved workflow data is still stored locally.</p><button className="button-primary mt-6" onClick={reset}>Try again</button></div></main>;
}
