"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { mockSubmissions } from "@/data/mock-products";
import type { Product, ProductStatus, UserRole } from "@/types";

type Toast = { id: number; message: string; tone: "success" | "info" | "danger" };
type DemoContextValue = {
  role: UserRole;
  setRole: (role: UserRole) => void;
  products: Product[];
  addProduct: (product: Product) => void;
  updateStatus: (id: string, status: ProductStatus, reason?: string) => void;
  notify: (message: string, tone?: Toast["tone"]) => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);
const PRODUCTS_KEY = "evermark-demo-products";
const ROLE_KEY = "evermark-demo-role";

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("consumer");
  const [products, setProducts] = useState<Product[]>(mockSubmissions);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const savedProducts = localStorage.getItem(PRODUCTS_KEY);
        const savedRole = localStorage.getItem(ROLE_KEY) as UserRole | null;
        if (savedProducts) setProducts(JSON.parse(savedProducts) as Product[]);
        if (savedRole && ["consumer", "company", "validator"].includes(savedRole)) setRoleState(savedRole);
      } catch {
        // Keep deterministic mock state if persisted demo data is invalid.
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }, [hydrated, products]);

  const setRole = (nextRole: UserRole) => {
    setRoleState(nextRole);
    localStorage.setItem(ROLE_KEY, nextRole);
  };

  const notify = (message: string, tone: Toast["tone"] = "success") => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, tone }]);
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 3800);
  };

  const value = useMemo<DemoContextValue>(() => ({
    role,
    setRole,
    products,
    addProduct: (product) => setProducts((current) => [product, ...current]),
    updateStatus: (id, status, reason) => setProducts((current) => current.map((product) => product.id === id ? {
      ...product,
      status,
      statusReason: reason,
      ...(status === "approved" && !product.longevityScore ? {
        longevityScore: 78,
        repairabilityScore: product.repairAvailable ? 82 : 55,
        sustainabilityScore: product.certifications.length ? 76 : 58,
        evidenceConfidence: "Medium" as const,
        scoreBreakdown: { lifespan: 80, warranty: 76, repairability: product.repairAvailable ? 82 : 55, replacementParts: product.replacementPartsAvailable ? 84 : 50, materials: 74, sustainability: product.certifications.length ? 76 : 58 },
      } : {}),
    } : product)),
    notify,
  }), [products, role]);

  return (
    <DemoContext.Provider value={value}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex w-[min(92vw,380px)] flex-col gap-3" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`rounded-2xl border px-5 py-4 text-sm font-bold shadow-2xl ${toast.tone === "danger" ? "border-red-200 bg-red-50 text-red-900" : toast.tone === "info" ? "border-sky-200 bg-sky-50 text-sky-900" : "border-emerald-200 bg-emerald-50 text-emerald-900"}`}>
            {toast.message}
          </div>
        ))}
      </div>
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo must be used within DemoProvider");
  return context;
}
