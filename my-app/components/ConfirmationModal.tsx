"use client";

import { useState } from "react";
import type { ProductStatus } from "@/types";

export default function ConfirmationModal({ action, productName, onClose, onConfirm }: { action: Exclude<ProductStatus, "draft" | "pending">; productName: string; onClose: () => void; onConfirm: (reason?: string) => void }) {
  const [reason, setReason] = useState("");
  const needsReason = action !== "approved";
  const labels = { approved: "Approve product", rejected: "Reject product", more_evidence_required: "Request more evidence" };
  return <div className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-wider text-emerald-700">Confirm decision</p><h2 id="modal-title" className="mt-2 text-2xl font-black">{labels[action]}</h2></div><button onClick={onClose} className="focus-ring rounded-lg p-2 text-slate-500" aria-label="Close">✕</button></div><p className="mt-4 text-sm leading-6 text-slate-600">You are about to update <strong>{productName}</strong>. This will be reflected across the demo workflow.</p>{needsReason && <label className="mt-5 grid gap-2 text-sm font-bold">Written reason<textarea autoFocus className="input font-normal" value={reason} onChange={(e) => setReason(e.target.value)} placeholder={action === "rejected" ? "Explain why the claims cannot be approved…" : "Specify the evidence that is still needed…"} /></label>}<div className="mt-6 flex justify-end gap-3"><button onClick={onClose} className="button-secondary">Cancel</button><button disabled={needsReason && !reason.trim()} onClick={() => onConfirm(reason.trim() || undefined)} className={`button-primary ${action === "rejected" ? "!bg-red-700 hover:!bg-red-800" : ""}`}>Confirm</button></div></div></div>;
}
