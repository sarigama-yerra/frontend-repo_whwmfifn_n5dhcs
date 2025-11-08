import React from 'react';

function formatCurrency(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number.isFinite(n) ? n : 0);
}

function QuoteList({ quotes = [], onRemove }) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Saved Quotes</h3>
      </div>
      <div className="rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left px-3 py-2">Principal</th>
              <th className="text-left px-3 py-2">Rate</th>
              <th className="text-left px-3 py-2">Months</th>
              <th className="text-left px-3 py-2">Doc Fee</th>
              <th className="text-left px-3 py-2">Monthly</th>
              <th className="text-left px-3 py-2">Interest</th>
              <th className="text-left px-3 py-2">Total</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {quotes.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-3 py-6 text-center text-slate-500">No quotes saved.</td>
              </tr>
            ) : (
              quotes.map((q) => (
                <tr key={q.createdAt} className="border-t border-slate-200">
                  <td className="px-3 py-2">{formatCurrency(q.principal)}</td>
                  <td className="px-3 py-2">{q.rate}%</td>
                  <td className="px-3 py-2">{q.months}</td>
                  <td className="px-3 py-2">{formatCurrency(q.docFee)}</td>
                  <td className="px-3 py-2">{formatCurrency(q.monthlyPayment)}</td>
                  <td className="px-3 py-2">{formatCurrency(q.totalInterest)}</td>
                  <td className="px-3 py-2">{formatCurrency(q.totalCost)}</td>
                  <td className="px-3 py-2 text-center">
                    <button onClick={() => onRemove?.(q.createdAt)} className="text-red-600 hover:underline">Remove</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QuoteList;
