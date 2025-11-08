import React from 'react';

function formatCurrency(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number.isFinite(n) ? n : 0);
}

function TransactionTable({ transactions = [], onAdd, onDelete }) {
  const [form, setForm] = React.useState({ date: '', type: 'disbursement', amount: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!form.date || !amount) return;
    onAdd?.({ id: crypto.randomUUID(), ...form, amount });
    setForm({ date: '', type: 'repayment', amount: '' });
  };

  const balance = transactions.reduce((acc, t) => acc + (t.type === 'disbursement' ? t.amount : -t.amount), 0);

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Day-to-Day Transactions</h3>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          required
        />
        <select
          value={form.type}
          onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          <option value="disbursement">Disbursement</option>
          <option value="repayment">Repayment</option>
          <option value="fee">Fee</option>
        </select>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          required
        />
        <div className="col-span-2 sm:col-span-1 flex items-stretch">
          <button
            type="submit"
            className="w-full rounded-md bg-slate-900 text-white text-sm px-3 py-2 hover:bg-slate-800"
          >
            Add
          </button>
        </div>
        <div className="col-span-2 sm:col-span-1 flex items-center justify-end text-sm text-slate-700">
          <span className="font-medium">Balance:</span>
          <span className="ml-2 font-semibold">{formatCurrency(balance)}</span>
        </div>
      </form>

      <div className="rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left px-3 py-2">Date</th>
              <th className="text-left px-3 py-2">Type</th>
              <th className="text-right px-3 py-2">Amount</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-3 py-6 text-center text-slate-500">No transactions yet.</td>
              </tr>
            ) : (
              transactions.map((t) => (
                <tr key={t.id} className="border-t border-slate-200">
                  <td className="px-3 py-2">{t.date}</td>
                  <td className="px-3 py-2 capitalize">{t.type}</td>
                  <td className="px-3 py-2 text-right">{formatCurrency(t.amount)}</td>
                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={() => onDelete?.(t.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
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

export default TransactionTable;
