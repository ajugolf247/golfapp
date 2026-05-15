import { useState, useMemo } from 'react';
import StatusBar from '../components/ui/StatusBar';

// ── Card data ────────────────────────────────────────────────────────────────
const CARDS = [
  {
    id: 'comenity',
    name: 'AAA Travel Visa',
    issuer: 'Comenity',
    ending: '5729',
    balance: 17190.39,
    apr: 25.49,
    minPayment: 544.00,
    creditLimit: 22000.00,
    cashBack: 792.90,
    color: '#e8341c',
    recurringCharge: { merchant: 'Rentokil', amount: 64.70 },
  },
  {
    id: 'capitalone',
    name: 'Cash Mastercard',
    issuer: 'Capital One',
    ending: '5692',
    balance: 9784.32,
    apr: 21.40,
    minPayment: 275.00,
    creditLimit: 10250.00,
    cashBack: 0,
    color: '#f07428',
    recurringCharge: { merchant: 'SiriusXM', amount: 31.99 },
  },
  {
    id: 'barclays',
    name: 'JetBlue Mastercard',
    issuer: 'Barclays',
    ending: '1578',
    balance: 10489.46,
    apr: 18.74,
    minPayment: 266.80,
    creditLimit: 16850.00,
    cashBack: 0,
    color: '#5b8aff',
    recurringCharge: { merchant: 'GEICO', amount: 263.68 },
  },
];

const TOTAL_BALANCE = CARDS.reduce((s, c) => s + c.balance, 0);
const TOTAL_MIN = CARDS.reduce((s, c) => s + c.minPayment, 0);
const MONTHLY_INTEREST = CARDS.reduce((s, c) => s + (c.balance * c.apr) / 100 / 12, 0);

// ── Math helpers ─────────────────────────────────────────────────────────────
function monthlyRate(apr) { return apr / 100 / 12; }

function breakEvenPayment(balance, apr) {
  return balance * monthlyRate(apr);
}

function simulatePayoff(cards, totalBudget, strategy) {
  // Sort cards by strategy: 'avalanche' = highest APR first, 'snowball' = lowest balance first
  const sorted = strategy === 'avalanche'
    ? [...cards].sort((a, b) => b.apr - a.apr)
    : [...cards].sort((a, b) => a.balance - b.balance);

  let balances = Object.fromEntries(cards.map(c => [c.id, c.balance]));
  const history = [{ month: 0, balances: { ...balances }, totalBalance: TOTAL_BALANCE }];

  let month = 0;
  const maxMonths = 600;

  while (month < maxMonths) {
    const anyPositive = Object.values(balances).some(b => b > 0.01);
    if (!anyPositive) break;
    month++;

    // Apply interest
    for (const card of cards) {
      if (balances[card.id] > 0) {
        balances[card.id] *= (1 + monthlyRate(card.apr));
      }
    }

    // Distribute payments: pay minimums first, then avalanche/snowball extra
    let remaining = totalBudget;
    const mins = {};
    for (const card of cards) {
      const min = Math.min(card.minPayment, balances[card.id]);
      mins[card.id] = min;
    }
    const totalMins = Object.values(mins).reduce((s, v) => s + v, 0);

    if (remaining < totalMins) {
      // Only pay minimums proportionally if budget is tight
      for (const card of cards) {
        const pay = Math.min(remaining * (mins[card.id] / totalMins), balances[card.id]);
        balances[card.id] = Math.max(0, balances[card.id] - pay);
        remaining -= pay;
      }
    } else {
      // Pay minimums first
      for (const card of cards) {
        const pay = mins[card.id];
        balances[card.id] = Math.max(0, balances[card.id] - pay);
        remaining -= pay;
      }
      // Apply extra to priority card
      for (const card of sorted) {
        if (remaining <= 0) break;
        if (balances[card.id] > 0) {
          const extra = Math.min(remaining, balances[card.id]);
          balances[card.id] = Math.max(0, balances[card.id] - extra);
          remaining -= extra;
        }
      }
    }

    const total = Object.values(balances).reduce((s, v) => s + v, 0);
    history.push({ month, balances: { ...balances }, totalBalance: Math.max(0, total) });
    if (total < 0.01) break;
  }

  const totalPaid = cards.reduce((s, c) => s + c.balance, 0) + (month * totalBudget);
  const totalInterest = totalPaid - TOTAL_BALANCE;

  return { months: month, history, totalInterest: Math.max(0, totalInterest) };
}

function fmt(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function fmtExact(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ── Sub-components ────────────────────────────────────────────────────────────
function SectionHeader({ label }) {
  return (
    <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#555] px-5 pt-5 pb-2">
      {label}
    </div>
  );
}

function StatRow({ label, value, sub, valueColor }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[#1a1a1a]">
      <div>
        <div className="text-[12px] text-[#aaa]">{label}</div>
        {sub && <div className="text-[10px] text-[#555] mt-0.5">{sub}</div>}
      </div>
      <div className="text-[13px] font-bold" style={{ color: valueColor || '#f5f5f5' }}>{value}</div>
    </div>
  );
}

function CardBadge({ card }) {
  const util = ((card.balance / card.creditLimit) * 100).toFixed(1);
  return (
    <div className="rounded-xl p-3.5 mb-3" style={{ background: '#111', border: `1px solid ${card.color}22` }}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-[11px] font-semibold" style={{ color: card.color }}>{card.issuer} ···{card.ending}</div>
          <div className="text-[10px] text-[#555]">{card.name}</div>
        </div>
        <div className="text-right">
          <div className="text-[15px] font-black text-[#f5f5f5]">{fmtExact(card.balance)}</div>
          <div className="text-[10px] text-[#555]">{card.apr}% APR</div>
        </div>
      </div>
      <div className="w-full h-1.5 rounded-full bg-[#1e1e1e] overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${Math.min(util, 100)}%`, background: card.color, opacity: 0.8 }} />
      </div>
      <div className="flex justify-between mt-1">
        <div className="text-[9px] text-[#444]">Utilization</div>
        <div className="text-[9px] font-semibold" style={{ color: parseFloat(util) > 80 ? '#ff4444' : '#888' }}>{util}%</div>
      </div>
    </div>
  );
}

// ── Tab: Overview ─────────────────────────────────────────────────────────────
function OverviewTab() {
  const be = CARDS.map(c => ({ ...c, breakEven: breakEvenPayment(c.balance, c.apr) }));

  return (
    <div className="px-5">
      <div className="text-center py-5 mb-2">
        <div className="text-[10px] text-[#555] uppercase tracking-widest mb-1">Combined Balance</div>
        <div className="text-[38px] font-black gradient-text leading-none">{fmtExact(TOTAL_BALANCE)}</div>
        <div className="text-[11px] text-[#555] mt-1">as of May 14, 2026 · 3 cards</div>
      </div>

      {CARDS.map(c => <CardBadge key={c.id} card={c} />)}

      <SectionHeader label="Current Monthly Snapshot" />
      <div className="rounded-xl bg-[#111] p-4 mb-3">
        <StatRow label="Combined minimum payment" value={fmtExact(TOTAL_MIN)} />
        <StatRow label="Monthly interest cost" value={fmtExact(MONTHLY_INTEREST)} valueColor="#ff4444" />
        <StatRow label="Going to principal" value={fmtExact(TOTAL_MIN - MONTHLY_INTEREST)} />
        <StatRow label="Effective principal reduction" value={((TOTAL_MIN - MONTHLY_INTEREST) / TOTAL_BALANCE * 100).toFixed(2) + '%'} sub="of total balance per month" />
      </div>

      <SectionHeader label="Break-Even Payments" />
      <div className="rounded-xl bg-[#111] p-4 mb-3">
        <div className="text-[10px] text-[#555] mb-3">Minimum monthly payment needed to stop each balance from growing</div>
        {be.map(c => (
          <div key={c.id} className="flex items-center justify-between py-2.5 border-b border-[#1a1a1a] last:border-0">
            <div>
              <div className="text-[12px] text-[#aaa]">{c.issuer} ···{c.ending}</div>
              <div className="text-[10px] text-[#555]">{c.apr}% APR</div>
            </div>
            <div className="text-right">
              <div className="text-[13px] font-bold text-[#f5f5f5]">{fmtExact(c.breakEven)}/mo</div>
              <div className="text-[10px]" style={{ color: c.minPayment > c.breakEven ? '#22c55e' : '#ff4444' }}>
                {c.minPayment > c.breakEven ? `✓ Min $${c.minPayment} covers it` : `✗ Min $${c.minPayment} is not enough`}
              </div>
            </div>
          </div>
        ))}
      </div>

      <SectionHeader label="Payoff at Minimum Only" />
      <div className="rounded-xl bg-[#111] p-4 mb-5">
        <StatRow label="Comenity ···5729" value="28 years · $52,007 total" sub="At $544/month minimum" valueColor="#ff4444" />
        <StatRow label="Capital One ···5692" value="30 years · $26,860 total" sub="At $275/month minimum" valueColor="#ff4444" />
        <StatRow label="Barclays ···1578" value="23 years · $25,614 total" sub="At $267/month minimum" valueColor="#ff4444" />
        <div className="mt-3 pt-3 border-t border-[#222]">
          <div className="flex justify-between">
            <div className="text-[12px] font-semibold text-[#aaa]">Combined lifetime cost</div>
            <div className="text-[14px] font-black text-[#ff4444]">~$104,481</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Tab: Payoff Plan ──────────────────────────────────────────────────────────
function PayoffTab() {
  const [budget, setBudget] = useState(1500);
  const [strategy, setStrategy] = useState('avalanche');

  const result = useMemo(() => simulatePayoff(CARDS, budget, strategy), [budget, strategy]);
  const altResult = useMemo(() => simulatePayoff(CARDS, budget, strategy === 'avalanche' ? 'snowball' : 'avalanche'), [budget, strategy]);

  const years = Math.floor(result.months / 12);
  const months = result.months % 12;
  const totalPaid = budget * result.months;

  const budgetOptions = [1086, 1200, 1441, 1500, 2000, 2500];

  return (
    <div className="px-5">
      <SectionHeader label="Monthly Budget" />
      <div className="flex gap-2 flex-wrap mb-4">
        {budgetOptions.map(b => (
          <button
            key={b}
            onClick={() => setBudget(b)}
            className="px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all"
            style={{
              background: budget === b ? 'linear-gradient(135deg,#e8341c,#f07428)' : '#1a1a1a',
              color: budget === b ? 'white' : '#666',
            }}
          >
            {b === 1086 ? `$1,086 (min)` : fmt(b)}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-5">
        {['avalanche', 'snowball'].map(s => (
          <button
            key={s}
            onClick={() => setStrategy(s)}
            className="flex-1 py-2 rounded-xl text-[11px] font-semibold capitalize transition-all"
            style={{
              background: strategy === s ? 'linear-gradient(135deg,#e8341c,#f07428)' : '#111',
              color: strategy === s ? 'white' : '#666',
              border: strategy === s ? 'none' : '1px solid #222',
            }}
          >
            {s} {s === 'avalanche' ? '(Highest APR first)' : '(Lowest balance first)'}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-[#111] p-4 mb-4">
        <div className="text-center mb-4">
          <div className="text-[10px] text-[#555] uppercase tracking-widest mb-1">Time to Debt-Free</div>
          <div className="text-[36px] font-black gradient-text leading-none">
            {years > 0 ? `${years}y ${months}m` : `${months}mo`}
          </div>
          <div className="text-[11px] text-[#666] mt-1">{result.months} payments · {fmt(budget)}/month</div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#0d0d0d] rounded-lg p-3 text-center">
            <div className="text-[10px] text-[#555] mb-1">Total Paid</div>
            <div className="text-[14px] font-black text-[#f5f5f5]">{fmt(totalPaid)}</div>
          </div>
          <div className="bg-[#0d0d0d] rounded-lg p-3 text-center">
            <div className="text-[10px] text-[#555] mb-1">Interest Paid</div>
            <div className="text-[14px] font-black text-[#ff4444]">{fmt(result.totalInterest)}</div>
          </div>
        </div>

        <div className="text-[10px] text-[#555] mb-2 uppercase tracking-widest">Payoff Order ({strategy})</div>
        {(strategy === 'avalanche' ? ['Comenity 25.49%', 'Capital One 21.40%', 'Barclays 18.74%'] : ['Capital One $9,784', 'Barclays $10,489', 'Comenity $17,190'])
          .map((label, i) => (
            <div key={i} className="flex items-center gap-2 mb-1.5">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white heat-gradient flex-shrink-0">{i + 1}</div>
              <div className="text-[11px] text-[#aaa]">{label}</div>
            </div>
          ))}
      </div>

      {budget > 1086 && (
        <div className="rounded-xl bg-[#0d1a0d] border border-[#1e3d1e] p-4 mb-4">
          <div className="text-[11px] font-semibold text-[#4ade80] mb-1">Savings vs. Minimum Payments Only</div>
          <div className="text-[10px] text-[#555]">
            Paying {fmt(budget)}/month saves you{' '}
            <span className="text-[#4ade80] font-bold">
              {fmt(104481 - (budget * result.months))} in total cost
            </span>{' '}
            and eliminates debt{' '}
            <span className="text-[#4ade80] font-bold">
              {Math.round(((28 * 12) - result.months) / 12 * 10) / 10} years sooner
            </span>
          </div>
        </div>
      )}

      <div className="rounded-xl bg-[#111] p-4 mb-5">
        <div className="text-[10px] text-[#555] uppercase tracking-widest mb-3">vs. {strategy === 'avalanche' ? 'Snowball' : 'Avalanche'} Strategy</div>
        <StatRow
          label={`${strategy === 'avalanche' ? 'Snowball' : 'Avalanche'} time to payoff`}
          value={`${Math.floor(altResult.months / 12)}y ${altResult.months % 12}m`}
        />
        <StatRow
          label="Interest difference"
          value={fmt(Math.abs(result.totalInterest - altResult.totalInterest))}
          sub={result.totalInterest < altResult.totalInterest ? `${strategy} saves more` : `${strategy === 'avalanche' ? 'snowball' : 'avalanche'} saves more`}
          valueColor={result.totalInterest < altResult.totalInterest ? '#4ade80' : '#ff4444'}
        />
      </div>
    </div>
  );
}

// ── Tab: Scenarios ────────────────────────────────────────────────────────────
function ScenariosTab() {
  const scenarios = [1200, 1500, 2000, 2500].map(budget => {
    const r = simulatePayoff(CARDS, budget, 'avalanche');
    return { budget, ...r, totalPaid: budget * r.months };
  });

  return (
    <div className="px-5">
      <SectionHeader label="Payment Scenario Comparison" />
      <div className="text-[10px] text-[#555] mb-4">All scenarios use avalanche strategy (highest APR first). Current minimum is $1,086/month.</div>

      {scenarios.map(s => {
        const years = Math.floor(s.months / 12);
        const mo = s.months % 12;
        const savedVsMin = 104481 - s.totalPaid;
        return (
          <div key={s.budget} className="rounded-xl bg-[#111] p-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[18px] font-black gradient-text">{fmt(s.budget)}/mo</div>
              <div className="text-right">
                <div className="text-[15px] font-bold text-[#f5f5f5]">{years}y {mo}m</div>
                <div className="text-[10px] text-[#555]">to debt-free</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#0d0d0d] rounded-lg p-2 text-center">
                <div className="text-[9px] text-[#555] mb-1">Total Paid</div>
                <div className="text-[11px] font-bold text-[#f5f5f5]">{fmt(s.totalPaid)}</div>
              </div>
              <div className="bg-[#0d0d0d] rounded-lg p-2 text-center">
                <div className="text-[9px] text-[#555] mb-1">Interest</div>
                <div className="text-[11px] font-bold text-[#ff4444]">{fmt(s.totalInterest)}</div>
              </div>
              <div className="bg-[#0d0d0d] rounded-lg p-2 text-center">
                <div className="text-[9px] text-[#555] mb-1">Saved vs Min</div>
                <div className="text-[11px] font-bold text-[#4ade80]">{savedVsMin > 0 ? fmt(savedVsMin) : '—'}</div>
              </div>
            </div>
          </div>
        );
      })}

      <SectionHeader label="3-Year Payoff Target" />
      <div className="rounded-xl bg-[#111] p-4 mb-3">
        <div className="text-[10px] text-[#555] mb-3">Monthly payments needed to eliminate all debt by May 2029</div>
        <StatRow label="Comenity ···5729" value="$688/mo" sub="Saves $27,242 vs. minimum" />
        <StatRow label="Capital One ···5692" value="$371/mo" sub="Saves $13,517 vs. minimum" />
        <StatRow label="Barclays ···1578" value="$382/mo" sub="Saves $11,862 vs. minimum" />
        <div className="mt-3 pt-3 border-t border-[#222] flex justify-between">
          <div className="text-[12px] font-semibold text-[#aaa]">Combined 3-year payment</div>
          <div className="text-[14px] font-black gradient-text">$1,441/mo</div>
        </div>
      </div>
    </div>
  );
}

// ── Tab: Utilization & Opportunities ─────────────────────────────────────────
function OpportunityTab() {
  const co = CARDS[1]; // Capital One
  const cm = CARDS[0]; // Comenity
  const bk = CARDS[2]; // Barclays

  const utilTargets = [
    { pct: 90, label: '90% — Urgent threshold', paydown: Math.max(0, co.balance - co.creditLimit * 0.90) },
    { pct: 70, label: '70% — Good credit range', paydown: Math.max(0, co.balance - co.creditLimit * 0.70) },
    { pct: 30, label: '30% — Excellent range', paydown: Math.max(0, co.balance - co.creditLimit * 0.30) },
  ];

  const cmTargets = [
    { pct: 70, label: '70%', paydown: Math.max(0, cm.balance - cm.creditLimit * 0.70) },
    { pct: 50, label: '50%', paydown: Math.max(0, cm.balance - cm.creditLimit * 0.50) },
    { pct: 30, label: '30%', paydown: Math.max(0, cm.balance - cm.creditLimit * 0.30) },
  ];

  // Comenity cash back applied as statement credit
  const newComenityBalance = cm.balance - cm.cashBack;
  const interestSavedPerMonth = (cm.cashBack * cm.apr / 100 / 12);
  const interestSaved12mo = interestSavedPerMonth * 12;

  // Recurring charge interest analysis
  const geicoAnnualInterest = bk.recurringCharge.amount * bk.apr / 100;
  const rentokil = cm.recurringCharge;
  const rentokilAnnualInterest = rentokil.amount * cm.apr / 100;

  return (
    <div className="px-5">
      <SectionHeader label="Capital One Utilization Targets" />
      <div className="rounded-xl bg-[#111] p-4 mb-3">
        <div className="text-[11px] text-[#888] mb-1">Capital One ···5692 — currently at <span className="text-[#ff4444] font-bold">95.5%</span></div>
        <div className="text-[10px] text-[#555] mb-3">$9,784 balance / $10,250 limit — most damaging to credit score</div>
        {utilTargets.map(t => (
          <div key={t.pct} className="flex items-center justify-between py-2.5 border-b border-[#1a1a1a] last:border-0">
            <div>
              <div className="text-[12px] text-[#aaa]">{t.label}</div>
              <div className="text-[10px] text-[#555]">${(co.creditLimit * t.pct / 100).toFixed(0)} target balance</div>
            </div>
            <div className="text-right">
              <div className="text-[13px] font-bold" style={{ color: t.paydown === 0 ? '#4ade80' : '#f07428' }}>
                {t.paydown === 0 ? 'Already there' : `Pay ${fmtExact(t.paydown)}`}
              </div>
            </div>
          </div>
        ))}
      </div>

      <SectionHeader label="Comenity Utilization Targets" />
      <div className="rounded-xl bg-[#111] p-4 mb-3">
        <div className="text-[11px] text-[#888] mb-1">Comenity ···5729 — currently at <span className="font-bold" style={{ color: '#f07428' }}>78.1%</span></div>
        <div className="text-[10px] text-[#555] mb-3">$17,190 balance / $22,000 limit</div>
        {cmTargets.map(t => (
          <div key={t.pct} className="flex items-center justify-between py-2.5 border-b border-[#1a1a1a] last:border-0">
            <div>
              <div className="text-[12px] text-[#aaa]">{t.pct}% utilization</div>
              <div className="text-[10px] text-[#555]">${(cm.creditLimit * t.pct / 100).toFixed(0)} target balance</div>
            </div>
            <div className="text-right">
              <div className="text-[13px] font-bold text-[#f07428]">Pay {fmtExact(t.paydown)}</div>
            </div>
          </div>
        ))}
      </div>

      <SectionHeader label="Opportunity: Comenity Cash Back" />
      <div className="rounded-xl bg-[#0d1a0d] border border-[#1e3d1e] p-4 mb-3">
        <div className="text-[13px] font-bold text-[#4ade80] mb-1">$792.90 unredeemed cash back</div>
        <div className="text-[10px] text-[#555] mb-3">Applying as a statement credit on Comenity immediately:</div>
        <StatRow label="Current balance" value={fmtExact(cm.balance)} />
        <StatRow label="After cash back applied" value={fmtExact(newComenityBalance)} valueColor="#4ade80" />
        <StatRow label="Instant effective return" value={`${cm.apr.toFixed(2)}% APR`} sub="Same as avoiding new 25.49% interest charges" valueColor="#4ade80" />
        <StatRow label="Monthly interest savings" value={fmtExact(interestSavedPerMonth)} sub="Ongoing, every month" valueColor="#4ade80" />
        <StatRow label="12-month interest savings" value={fmtExact(interestSaved12mo)} valueColor="#4ade80" />
      </div>

      <SectionHeader label="Recurring Charge Interest Cost" />
      <div className="rounded-xl bg-[#111] p-4 mb-3">
        <div className="text-[10px] text-[#555] mb-3">Annual interest cost if each charge continues to revolve at current APR</div>
        <div className="py-2.5 border-b border-[#1a1a1a]">
          <div className="flex justify-between items-start mb-1">
            <div className="text-[12px] text-[#aaa]">GEICO auto insurance</div>
            <div className="text-[13px] font-bold text-[#ff4444]">{fmtExact(geicoAnnualInterest)}/yr</div>
          </div>
          <div className="text-[10px] text-[#555]">$263.68/mo on Barclays at 18.74% APR — mandatory, on revolving balance</div>
        </div>
        <div className="py-2.5">
          <div className="flex justify-between items-start mb-1">
            <div className="text-[12px] text-[#aaa]">Rentokil pest control</div>
            <div className="text-[13px] font-bold text-[#ff4444]">{fmtExact(rentokilAnnualInterest)}/yr</div>
          </div>
          <div className="text-[10px] text-[#555]">$64.70/mo on Comenity at 25.49% APR — highest-rate card</div>
        </div>
        <div className="mt-3 pt-3 border-t border-[#222]">
          <div className="flex justify-between">
            <div className="text-[12px] font-semibold text-[#aaa]">Combined annual interest on recurrings</div>
            <div className="text-[13px] font-black text-[#ff4444]">{fmtExact(geicoAnnualInterest + rentokilAnnualInterest)}</div>
          </div>
          <div className="text-[10px] text-[#555] mt-1">Moving GEICO to a card with 0% intro APR or paying cash would save ~{fmtExact(geicoAnnualInterest)}/year</div>
        </div>
      </div>
    </div>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'payoff', label: 'Payoff Plan' },
  { id: 'scenarios', label: 'Scenarios' },
  { id: 'opportunities', label: 'Opportunities' },
];

export default function DebtPayoffScreen({ onBack }) {
  const [tab, setTab] = useState('overview');

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <StatusBar />

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 flex-shrink-0">
        {onBack ? (
          <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1e1e1e] text-[#888]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15,18 9,12 15,6"/></svg>
          </button>
        ) : <div className="w-8" />}
        <div className="text-center">
          <div className="text-[13px] font-bold text-[#f5f5f5]">Debt Payoff Plan</div>
          <div className="text-[10px] text-[#555]">Aaron J. Ungvarsky · May 2026</div>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#111] border border-[#222] flex items-center justify-center">
          <span className="text-[9px] font-black gradient-text">3</span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex px-4 gap-1 flex-shrink-0 overflow-x-auto pb-2">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all whitespace-nowrap"
            style={{
              background: tab === t.id ? 'linear-gradient(135deg,#e8341c,#f07428)' : '#111',
              color: tab === t.id ? 'white' : '#555',
              border: tab === t.id ? 'none' : '1px solid #1e1e1e',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {tab === 'overview' && <OverviewTab />}
        {tab === 'payoff' && <PayoffTab />}
        {tab === 'scenarios' && <ScenariosTab />}
        {tab === 'opportunities' && <OpportunityTab />}
        <div className="h-8" />
      </div>
    </div>
  );
}
