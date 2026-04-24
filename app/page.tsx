"use client";

import { useState } from "react";
import {
  ChefHat,
  Clock,
  Loader2,
  ShoppingBasket,
  Sparkles,
  Utensils,
  Wallet,
} from "lucide-react";

type MealPlan = {
  title: string;
  estimatedBudget: string;
  meals: string[];
  shoppingList: string[];
  reasoning: string;
  tips: string[];
};

const fallbackPlan: MealPlan = {
  title: "Menu Hemat Anak Kos",
  estimatedBudget: "Rp75.000",
  meals: [
    "Nasi telur kecap + tumis tahu",
    "Mie kuah sayur + telur rebus",
    "Nasi tahu crispy + sambal kecap",
  ],
  shoppingList: ["Telur", "Tahu", "Sayur hijau", "Bawang", "Cabai", "Mie instan"],
  reasoning:
    "Menu awal ini memakai bahan murah yang mudah dikombinasikan dan bisa dimasak dengan rice cooker atau teflon.",
  tips: ["Gunakan satu bahan untuk beberapa menu.", "Masak nasi sekaligus untuk 2 kali makan."],
};

export default function Home() {
  const [ingredients, setIngredients] = useState("nasi, telur, tahu, kecap");
  const [budget, setBudget] = useState("75000");
  const [tools, setTools] = useState("rice cooker, teflon");
  const [goal, setGoal] = useState("hemat, kenyang, mudah dimasak");
  const [plan, setPlan] = useState<MealPlan>(fallbackPlan);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateMenu() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients, budget, tools, goal }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal generate menu.");
      }

      setPlan(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <nav className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20">
              <ChefHat size={26} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight">KosMenu AI</h1>
              <p className="text-xs text-slate-400">Komi si koki hemat</p>
            </div>
          </div>
          <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">
            AI meal planner
          </span>
        </nav>

        <section className="grid gap-10 py-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
              <Sparkles size={16} /> AI sebagai inti produk, bukan chatbot tempelan
            </div>
            <h2 className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-6xl">
              Ubah bahan seadanya jadi rencana makan hemat.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              KosMenu AI menganalisis bahan, budget, alat masak, dan tujuan makanmu.
              Hasilnya berupa menu 3 hari, daftar belanja, estimasi biaya, dan alasan keputusan AI.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Feature icon={<Wallet size={22} />} title="Budget-aware" />
              <Feature icon={<Clock size={22} />} title="Cepat dimasak" />
              <Feature icon={<ShoppingBasket size={22} />} title="Shopping list" />
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur">
            <div className="rounded-[1.5rem] bg-slate-900 p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-300 text-2xl text-slate-900">
                  🍳
                </div>
                <div>
                  <h3 className="font-bold">Komi AI Engine</h3>
                  <p className="text-sm text-slate-400">Input kondisi nyata, hasil praktis.</p>
                </div>
              </div>

              <label className="mb-2 block text-sm text-slate-300">Bahan yang tersedia</label>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="mb-4 h-20 w-full rounded-2xl border border-white/10 bg-slate-950 p-4 text-sm outline-none ring-emerald-400/40 focus:ring-4"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">Budget</label>
                  <input
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950 p-4 text-sm outline-none ring-emerald-400/40 focus:ring-4"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-slate-300">Alat masak</label>
                  <input
                    value={tools}
                    onChange={(e) => setTools(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950 p-4 text-sm outline-none ring-emerald-400/40 focus:ring-4"
                  />
                </div>
              </div>

              <label className="mb-2 mt-4 block text-sm text-slate-300">Tujuan makan</label>
              <input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950 p-4 text-sm outline-none ring-emerald-400/40 focus:ring-4"
              />

              <button
                onClick={generateMenu}
                disabled={loading}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-4 font-bold text-slate-950 shadow-lg shadow-emerald-400/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                {loading ? "Komi sedang menyusun menu..." : "Generate Menu AI"}
              </button>

              {error && <p className="mt-4 rounded-xl bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
            </div>
          </div>
        </section>

        <section className="grid gap-6 pb-10 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 lg:col-span-2">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-emerald-200">AI Plan Result</p>
                <h3 className="text-3xl font-black">{plan.title}</h3>
              </div>
              <div className="rounded-2xl bg-white/10 px-4 py-3 text-right">
                <p className="text-xs text-slate-300">Estimasi</p>
                <p className="font-bold text-emerald-200">{plan.estimatedBudget}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {plan.meals?.map((meal, index) => (
                <div key={`${meal}-${index}`} className="rounded-2xl bg-slate-950/70 p-5">
                  <p className="mb-3 text-sm text-slate-400">Hari {index + 1}</p>
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                    <Utensils size={20} />
                  </div>
                  <p className="font-semibold leading-6">{meal}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6">
            <h3 className="mb-4 text-xl font-bold">Daftar Belanja</h3>
            <ul className="space-y-3">
              {plan.shoppingList?.map((item, index) => (
                <li key={`${item}-${index}`} className="flex items-center gap-3 text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" /> {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl bg-slate-950/70 p-4">
              <p className="text-sm font-semibold text-orange-200">Alasan AI</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{plan.reasoning}</p>
            </div>
          </div>
        </section>

        <section className="mb-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <h3 className="text-2xl font-black">AI Narrative</h3>
          <p className="mt-3 max-w-4xl leading-7 text-slate-300">
            KosMenu AI memakai AI sebagai decision engine. User tidak hanya bertanya ke chatbot,
            tetapi memberi constraint nyata: bahan, budget, alat masak, dan tujuan. AI lalu mengambil
            keputusan produk: menyusun menu, menentukan daftar belanja, dan menjelaskan alasan rekomendasi.
          </p>
        </section>
      </div>
    </main>
  );
}

function Feature({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-slate-200">
      <div className="mb-3 text-emerald-300">{icon}</div>
      <p className="font-semibold">{title}</p>
    </div>
  );
}
