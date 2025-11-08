import React from 'react';
import { Rocket } from 'lucide-react';
import Hero from './components/Hero';
import LoanCalculator from './components/LoanCalculator';
import TransactionTable from './components/TransactionTable';
import QuoteList from './components/QuoteList';

function App() {
  const [transactions, setTransactions] = React.useState([]);
  const [quotes, setQuotes] = React.useState([]);

  const handleAddTx = (tx) => setTransactions((list) => [tx, ...list]);
  const handleDeleteTx = (id) => setTransactions((list) => list.filter((t) => t.id !== id));

  const handleAddQuote = (q) => setQuotes((list) => [q, ...list]);
  const handleRemoveQuote = (createdAt) => setQuotes((list) => list.filter((q) => q.createdAt !== createdAt));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-white text-slate-900">
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-slate-900 text-white"><Rocket size={16} /></div>
            <span className="font-semibold">LendFlow</span>
          </div>
          <nav className="text-sm text-slate-600 hidden sm:flex gap-5">
            <a href="#calculator" className="hover:text-slate-900">Calculator</a>
            <a href="#transactions" className="hover:text-slate-900">Transactions</a>
            <a href="#quotes" className="hover:text-slate-900">Quotes</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <Hero />

        <section id="calculator" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><LoanCalculator onQuote={handleAddQuote} /></div>
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-xl p-5 shadow-lg h-full">
              <h3 className="text-lg font-semibold mb-3">Overview</h3>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>Set document fees, interest rates, and terms.</li>
                <li>Save quotes to compare scenarios.</li>
                <li>Track disbursements and repayments daily.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="transactions" className="grid grid-cols-1 gap-6">
          <TransactionTable transactions={transactions} onAdd={handleAddTx} onDelete={handleDeleteTx} />
        </section>

        <section id="quotes" className="grid grid-cols-1 gap-6">
          <QuoteList quotes={quotes} onRemove={handleRemoveQuote} />
        </section>
      </main>

      <footer className="py-8 text-center text-xs text-slate-500">
        Built for modern peer-to-peer lending operations.
      </footer>
    </div>
  );
}

export default App;
