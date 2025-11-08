import React, { useMemo, useState } from 'react';

function formatCurrency(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number.isFinite(n) ? n : 0);
}

function LoanCalculator({ onQuote }) {
  const [principal, setPrincipal] = useState(5000);
  const [rate, setRate] = useState(18); // APR %
  const [months, setMonths] = useState(12);
  const [docFee, setDocFee] = useState(99);

  const { monthlyPayment, totalInterest, totalCost } = useMemo(() => {
    const P = Number(principal) || 0;
    const r = (Number(rate) || 0) / 100 / 12;
    const n = Number(months) || 0;
    const fee = Number(docFee) || 0;

    if (P <= 0 || n <= 0) {
      return { monthlyPayment: 0, totalInterest: 0, totalCost: fee };
    }

    const payment = r === 0 ? P / n : (P * r) / (1 - Math.pow(1 + r, -n));
    const total = payment * n + fee;
    const interest = total - P - fee;

    return { monthlyPayment: payment, totalInterest: interest, totalCost: total };
  }, [principal, rate, months, docFee]);

  const handleCreateQuote = () => {
    const quote = {
      principal: Number(principal),
      rate: Number(rate),
      months: Number(months),
      docFee: Number(docFee),
      monthlyPayment: Number(monthlyPayment.toFixed(2)),
      totalInterest: Number(totalInterest.toFixed(2)),
      totalCost: Number(totalCost.toFixed(2)),
      createdAt: new Date().toISOString(),
    };
    onQuote?.(quote);
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Loan Calculator</h3>
        <button
          onClick={handleCreateQuote}
          className="px-3 py-1.5 rounded-md bg-slate-900 text-white text-sm hover:bg-slate-800 active:scale-[0.99]"
        >
          Save Quote
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-slate-600">Principal</span>
          <input
            type="number"
            value={principal}
            min={0}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-slate-600">Interest Rate (APR %)</span>
          <input
            type="number"
            value={rate}
            min={0}
            step="0.1"
            onChange={(e) => setRate(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-slate-600">Term (Months)</span>
          <input
            type="number"
            value={months}
            min={1}
            onChange={(e) => setMonths(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-slate-600">Document Fee</span>
          <input
            type="number"
            value={docFee}
            min={0}
            onChange={(e) => setDocFee(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </label>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
          <div className="text-xs text-slate-600">Monthly Payment</div>
          <div className="text-lg font-semibold">{formatCurrency(monthlyPayment)}</div>
        </div>
        <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
          <div className="text-xs text-slate-600">Total Interest</div>
          <div className="text-lg font-semibold">{formatCurrency(totalInterest)}</div>
        </div>
        <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
          <div className="text-xs text-slate-600">Total Cost</div>
          <div className="text-lg font-semibold">{formatCurrency(totalCost)}</div>
        </div>
      </div>
    </div>
  );
}

export default LoanCalculator;
