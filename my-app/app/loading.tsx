import { LoadingSkeleton } from "@/components/ui";

export default function Loading() {
  return <div className="page-shell py-16"><div className="mb-10 h-12 w-72 animate-pulse rounded-xl bg-slate-200" /><LoadingSkeleton /></div>;
}
