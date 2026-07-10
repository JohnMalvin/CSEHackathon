import type { Product } from "@/types";

const breakdown = (lifespan: number, warranty: number, repairability: number, replacementParts: number, materials: number, sustainability: number) => ({ lifespan, warranty, repairability, replacementParts, materials, sustainability });

export const mockProducts: Product[] = [
  {
    id: "framework-laptop-13", name: "Modular Laptop 13", brand: "Framework", company: "Framework Computer", category: "Electronics",
    description: "A modular notebook designed around replaceable ports, upgradeable internals, and published repair guides.", price: 1649, imageUrls: ["front", "open", "parts"], visual: "▰", visualTone: "from-sky-100 to-slate-200", officialUrl: "https://frame.work", expectedLifespanYears: 8, warrantyYears: 1,
    warrantyUrl: "https://frame.work/warranty", repairPolicyUrl: "https://guides.frame.work", repairAvailable: true, replacementPartsAvailable: true,
    materials: ["Recycled aluminium", "Post-consumer plastics"], certifications: ["EPEAT Gold", "ENERGY STAR"], longevityScore: 92, repairabilityScore: 96, sustainabilityScore: 86, evidenceConfidence: "High",
    scoreBreakdown: breakdown(92, 72, 98, 97, 88, 86), evidence: [
      { id: "e1", type: "Repair guide", title: "Official repair documentation", sourceUrl: "https://guides.frame.work", verified: true },
      { id: "e2", type: "Parts catalogue", title: "Replacement parts marketplace", sourceUrl: "https://frame.work/marketplace", verified: true },
    ], status: "approved", submittedAt: "2026-06-14",
  },
  {
    id: "terra-pack-32", name: "Terra Pack 32L", brand: "Northway", company: "Northway Gear Co.", category: "Bags",
    description: "A reinforced everyday backpack with replaceable buckles, repair patches, and a lifetime workmanship guarantee.", price: 249, imageUrls: ["front", "back"], visual: "▥", visualTone: "from-amber-100 to-orange-200", officialUrl: "https://example.com/terra-pack", expectedLifespanYears: 15, warrantyYears: 25,
    repairAvailable: true, replacementPartsAvailable: true, materials: ["1000D recycled nylon", "Aluminium hardware"], certifications: ["Global Recycled Standard"], longevityScore: 89, repairabilityScore: 88, sustainabilityScore: 90, evidenceConfidence: "High",
    scoreBreakdown: breakdown(94, 98, 88, 84, 86, 90), evidence: [{ id: "e3", type: "Warranty", title: "Lifetime repair commitment", sourceUrl: "https://example.com/warranty", verified: true }], status: "approved", submittedAt: "2026-05-22",
  },
  {
    id: "renew-shell-jacket", name: "Renew Shell Jacket", brand: "Cirrus", company: "Cirrus Outdoor", category: "Clothing",
    description: "A weatherproof shell supported by panel repairs, zip replacement, and an end-of-life take-back program.", price: 385, imageUrls: ["front", "detail"], visual: "♙", visualTone: "from-emerald-100 to-teal-200", officialUrl: "https://example.com/renew-shell", expectedLifespanYears: 10, warrantyYears: 10,
    repairAvailable: true, replacementPartsAvailable: true, materials: ["Recycled nylon", "PFC-free membrane"], certifications: ["bluesign®", "Fair Wear"], longevityScore: 86, repairabilityScore: 90, sustainabilityScore: 94, evidenceConfidence: "High",
    scoreBreakdown: breakdown(86, 90, 92, 78, 88, 94), evidence: [{ id: "e4", type: "Policy", title: "Repair service terms", sourceUrl: "https://example.com/repairs", verified: true }], status: "approved", submittedAt: "2026-06-02",
  },
  {
    id: "axis-task-chair", name: "Axis Task Chair", brand: "Formstead", company: "Formstead Studio", category: "Furniture",
    description: "A commercial-grade office chair with replaceable upholstery, castors, arms, and gas lift.", price: 1090, imageUrls: ["front", "side"], visual: "♜", visualTone: "from-violet-100 to-indigo-200", officialUrl: "https://example.com/axis-chair", expectedLifespanYears: 20, warrantyYears: 12,
    repairAvailable: true, replacementPartsAvailable: true, materials: ["Powder-coated steel", "Recycled mesh"], certifications: ["GECA", "BIFMA LEVEL 2"], longevityScore: 91, repairabilityScore: 91, sustainabilityScore: 84, evidenceConfidence: "High",
    scoreBreakdown: breakdown(96, 94, 91, 92, 87, 84), evidence: [{ id: "e5", type: "Test report", title: "Commercial durability test summary", filename: "axis-bifma-test.pdf", verified: true }], status: "approved", submittedAt: "2026-04-18",
  },
  {
    id: "modumix-kitchen", name: "ModuMix Kitchen System", brand: "Hearthlab", company: "Hearthlab Appliances", category: "Appliances",
    description: "A single motor base with serviceable controls and interchangeable cooking modules.", price: 529, imageUrls: ["system", "modules"], visual: "◉", visualTone: "from-rose-100 to-red-200", officialUrl: "https://example.com/modumix", expectedLifespanYears: 12, warrantyYears: 7,
    repairAvailable: true, replacementPartsAvailable: true, materials: ["Stainless steel", "Borosilicate glass"], certifications: ["ENERGY STAR"], longevityScore: 84, repairabilityScore: 82, sustainabilityScore: 78, evidenceConfidence: "Medium",
    scoreBreakdown: breakdown(86, 88, 82, 86, 84, 78), evidence: [{ id: "e6", type: "Service manual", title: "Authorised service manual", filename: "modumix-service.pdf", verified: true }], status: "approved", submittedAt: "2026-06-28",
  },
  {
    id: "forge-driver-18v", name: "ForgeDriver 18V", brand: "Redgum Tools", company: "Redgum Toolworks", category: "Tools",
    description: "A jobsite drill with a metal gearbox, replaceable motor brushes, and a battery platform designed for long support.", price: 319, imageUrls: ["tool", "kit"], visual: "⌁", visualTone: "from-yellow-100 to-lime-200", officialUrl: "https://example.com/forge-driver", expectedLifespanYears: 15, warrantyYears: 6,
    repairAvailable: true, replacementPartsAvailable: true, materials: ["Cast aluminium", "Glass-filled nylon"], certifications: [], longevityScore: 88, repairabilityScore: 89, sustainabilityScore: 71, evidenceConfidence: "High",
    scoreBreakdown: breakdown(91, 89, 89, 93, 84, 71), evidence: [{ id: "e7", type: "Parts diagram", title: "Exploded parts catalogue", filename: "forge-parts.pdf", verified: true }], status: "approved", submittedAt: "2026-05-07",
  },
];

export const mockSubmissions: Product[] = [
  ...mockProducts,
  { id: "mendable-kettle", name: "Mendable Kettle", brand: "Element", company: "Element Home", category: "Appliances", description: "A stainless kettle with replaceable heating element and switch assembly.", price: 189, imageUrls: ["front"], visual: "◒", visualTone: "from-cyan-100 to-blue-200", officialUrl: "https://example.com/mendable-kettle", expectedLifespanYears: 12, warrantyYears: 5, repairAvailable: true, replacementPartsAvailable: true, materials: ["Stainless steel", "Bakelite"], certifications: [], longevityScore: 83, repairabilityScore: 87, sustainabilityScore: 76, evidenceConfidence: "Medium", scoreBreakdown: breakdown(86, 82, 87, 90, 84, 76), evidence: [{ id: "e8", type: "Test report", title: "Switch cycle test", filename: "cycle-test.pdf" }], status: "pending", submittedAt: "2026-07-08" },
  { id: "harbour-desk", name: "Harbour Standing Desk", brand: "Common Form", company: "Common Form Pty Ltd", category: "Furniture", description: "A solid timber sit-stand desk with replaceable lift columns.", price: 1450, imageUrls: ["front"], visual: "▱", visualTone: "from-stone-100 to-amber-200", officialUrl: "https://example.com/harbour-desk", expectedLifespanYears: 18, warrantyYears: 10, repairAvailable: true, replacementPartsAvailable: true, materials: ["FSC ash", "Steel"], certifications: ["FSC"], longevityScore: 87, repairabilityScore: 84, sustainabilityScore: 88, evidenceConfidence: "Medium", scoreBreakdown: breakdown(92, 91, 84, 85, 89, 88), evidence: [{ id: "e9", type: "Warranty", title: "Warranty terms", sourceUrl: "https://example.com/desk-warranty" }], status: "more_evidence_required", statusReason: "Please provide lift-column cycle testing and parts availability terms.", submittedAt: "2026-07-01" },
  { id: "everstep-runner", name: "Everstep Runner", brand: "Motion Kind", company: "Motion Kind", category: "Clothing", description: "A running shoe marketed with a replaceable outsole.", price: 220, imageUrls: ["front"], visual: "⌇", visualTone: "from-pink-100 to-fuchsia-200", officialUrl: "https://example.com/everstep", expectedLifespanYears: 5, warrantyYears: 2, repairAvailable: false, replacementPartsAvailable: false, materials: ["Polyester mesh", "EVA"], certifications: [], longevityScore: 54, repairabilityScore: 35, sustainabilityScore: 46, evidenceConfidence: "Low", scoreBreakdown: breakdown(60, 58, 35, 30, 55, 46), evidence: [], status: "rejected", statusReason: "The replaceable outsole claim could not be substantiated.", submittedAt: "2026-06-20" },
];

export const categories = ["Electronics", "Bags", "Clothing", "Furniture", "Appliances", "Tools"];
