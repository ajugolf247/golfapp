import { useState } from 'react';
import { ANALYTICS } from '../data/pinnedData';

function MetricTile({ label, value, change, sub, accent }) {
  const up = change >= 0;
  return (
    <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4">
      <div className="text-[9px] text-[#555] font-semibold uppercase tracking-widest mb-2">{label}</div>
      <div className={`text-[28px] font-black leading-none mb-1 ${accent ? 'gradient-text' : 'text-white'}`}>
        {typeof value === 'number' && value > 999 ? value.toLocaleString() : value}
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-[11px] font-bold ${up ? 'text-emerald-400' : 'text-[#e8341c]'}`}>
          {up ? '▲' : '▼'} {Math.abs(change)}% MoM
        </span>
        {sub && <span className="text-[10px] text-[#444]">{sub}</span>}
      </div>
    </div>
  );
}

function FunnelBar({ label, value, pct, max }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="text-[11px] text-[#888]">{label}</span>
          <span className="text-[11px] font-bold text-white">{value.toLocaleString()}</span>
        </div>
        <div className="h-1.5 bg-[#1e1e1e] rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-[#e8341c] to-[#f07428]" style={{ width: `${(value / max) * 100}%` }} />
        </div>
      </div>
      <span className="text-[11px] text-[#555] w-8 text-right">{pct}%</span>
    </div>
  );
}

export default function AnalyticsScreen({ onBack }) {
  const [page, setPage] = useState('overview');
  const a = ANALYTICS;

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <div className="px-5 pt-12 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[10px] text-[#e8341c] font-semibold uppercase tracking-widest mb-1">Internal</div>
            <h1 className="text-[22px] font-black text-white leading-tight">Analytics</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#141414] border border-[#1e1e1e] rounded-xl px-3 py-1.5 flex items-center gap-1.5">
              <span className="text-[11px] text-[#888]">Last 30 Days</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round"><polyline points="6,9 12,15 18,9"/></svg>
            </div>
            <button onClick={onBack} className="w-8 h-8 bg-[#1e1e1e] rounded-full flex items-center justify-center tap-feedback">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round"><polyline points="15,18 9,12 15,6"/></svg>
            </button>
          </div>
        </div>

        {/* Data freshness */}
        <div className="bg-[#0f0f10] border border-[#1e1e1e] rounded-xl px-3 py-2 mb-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#f07428]" />
          <span className="text-[10px] text-[#555]">Caddie sync lag: avg {a.syncHealth.avg} days · {a.syncHealth.last48h}% synced in 48h</span>
          <span className="text-[10px] text-emerald-400 ml-auto">Mobile: Live</span>
        </div>

        {/* Page tabs */}
        <div className="flex gap-1 bg-[#111] border border-[#1e1e1e] rounded-xl p-1">
          {[['overview','Overview'],['growth','Growth'],['engagement','Engagement']].map(([id, label]) => (
            <button key={id} onClick={() => setPage(id)}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-semibold transition-all ${page === id ? 'bg-gradient-to-r from-[#e8341c] to-[#f07428] text-white' : 'text-[#555]'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {page === 'overview' && (
          <div className="flex flex-col gap-3 stagger">
            <div className="grid grid-cols-2 gap-3">
              <MetricTile label="Rounds Tracked" value={a.northStar.totalRounds.value} change={a.northStar.totalRounds.change} accent />
              <MetricTile label="Monthly Active Users" value={a.northStar.mau.value} change={a.northStar.mau.change} />
              <MetricTile label="Rounds / User" value={a.northStar.roundsPerUser.value} change={a.northStar.roundsPerUser.change} sub="avg" />
              <MetricTile label="Active Caddies" value={a.northStar.activeCaddies.value} change={a.northStar.activeCaddies.change} />
            </div>

            {/* GHIN */}
            <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest">GHIN Integrated</div>
                <span className="text-emerald-400 text-[11px] font-bold">▲ {a.northStar.ghinUsers.change}% MoM</span>
              </div>
              <div className="flex items-end gap-3">
                <div className="text-[28px] font-black text-white">{a.northStar.ghinUsers.value.toLocaleString()}</div>
                <div className="text-[#555] text-[13px] mb-1">users · {a.northStar.ghinUsers.pct}% of MAU</div>
              </div>
              <div className="h-1.5 bg-[#1e1e1e] rounded-full mt-2 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#e8341c] to-[#f07428]" style={{ width: `${a.northStar.ghinUsers.pct}%` }} />
              </div>
            </div>

            {/* Device split */}
            <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4">
              <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-3">Device Split · MAU</div>
              <div className="flex flex-col gap-2.5">
                {a.deviceSplit.map((d, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-[11px] text-[#888]">{d.label}</span>
                        <span className="text-[11px] font-bold text-white">{d.count.toLocaleString()}</span>
                      </div>
                      <div className="h-1.5 bg-[#1e1e1e] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${d.value}%`, backgroundColor: d.color }} />
                      </div>
                    </div>
                    <span className="text-[11px] text-[#555] w-8 text-right">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sync health */}
            <div className="bg-[#140808] border border-[#e8341c]/20 rounded-2xl p-4">
              <div className="text-[10px] text-[#e8341c] font-semibold uppercase tracking-widest mb-3">Caddie Sync Health</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Synced < 24h', value: `${a.syncHealth.last24h}%`, ok: true },
                  { label: 'Synced < 48h', value: `${a.syncHealth.last48h}%`, ok: true },
                  { label: 'Synced < 7d', value: `${a.syncHealth.last7d}%`, ok: true },
                  { label: 'Not synced 30d+', value: `${a.syncHealth.inactive30d}%`, ok: false },
                ].map(item => (
                  <div key={item.label} className="bg-[#1a1a1a] rounded-xl p-2.5 text-center">
                    <div className={`text-[18px] font-black ${item.ok ? 'text-emerald-400' : 'text-[#e8341c]'}`}>{item.value}</div>
                    <div className="text-[9px] text-[#555] mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {page === 'growth' && (
          <div className="flex flex-col gap-4 stagger">
            {/* Activation funnel */}
            <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4">
              <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-4">Activation Funnel · This Month</div>
              <div className="flex flex-col gap-3.5">
                {a.activationFunnel.map((step, i) => (
                  <FunnelBar key={i} label={step.label} value={step.value} pct={step.pct} max={1000} />
                ))}
              </div>
            </div>

            {/* Cohort table */}
            <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4">
              <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-3">Cohort Retention</div>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead>
                    <tr className="text-[#444] font-semibold uppercase tracking-wider">
                      <td className="pb-2 pr-2">Month</td>
                      <td className="pb-2 pr-2 text-right">Users</td>
                      <td className="pb-2 pr-2 text-right">D30</td>
                      <td className="pb-2 pr-2 text-right">D90</td>
                      <td className="pb-2 text-right">Active</td>
                    </tr>
                  </thead>
                  <tbody>
                    {a.cohortRetention.map((row, i) => (
                      <tr key={i} className="border-t border-[#1e1e1e]">
                        <td className="py-2 pr-2 text-[#888]">{row.month}</td>
                        <td className="py-2 pr-2 text-right text-white font-semibold">{row.signups}</td>
                        <td className="py-2 pr-2 text-right font-bold" style={{ color: row.d30 >= 70 ? '#4ade80' : '#f07428' }}>{row.d30}%</td>
                        <td className="py-2 pr-2 text-right font-bold" style={{ color: row.d90 ? (row.d90 >= 50 ? '#4ade80' : '#f07428') : undefined }}>
                          {row.d90 ? `${row.d90}%` : '—'}
                        </td>
                        <td className="py-2 text-right text-[#555]">{row.active ? `${row.active}%` : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Klaviyo segments */}
            <div className="bg-[#0f0f14] border border-[#2a2a3a] rounded-2xl p-4">
              <div className="text-[10px] text-[#4a9fd5] font-semibold uppercase tracking-widest mb-3">Klaviyo Segment Exports</div>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Power Users (8+ rounds)', count: 312, status: 'Exported daily', color: '#4ade80' },
                  { label: 'At-Risk / Dormant', count: 148, status: 'Exported daily', color: '#f07428' },
                  { label: 'New Users (< 7 days)', count: 89, status: 'Exported daily', color: '#4a9fd5' },
                  { label: 'Caddies Not Syncing 30d+', count: 103, status: 'Action needed', color: '#e8341c' },
                ].map((seg, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#141414] rounded-xl px-3 py-2.5">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
                    <div className="flex-1">
                      <div className="text-[12px] text-white font-medium">{seg.label}</div>
                      <div className="text-[10px] text-[#444]">{seg.status}</div>
                    </div>
                    <div className="text-[14px] font-black" style={{ color: seg.color }}>{seg.count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {page === 'engagement' && (
          <div className="flex flex-col gap-4 stagger">
            {/* Rounds/user */}
            <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4">
              <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-3">Rounds Per User / Month</div>
              <div className="grid grid-cols-3 gap-2">
                {[{l:'Mean',v:'2.1'},{l:'Median',v:'2.0'},{l:'Top 25%',v:'8+'}].map(item => (
                  <div key={item.l} className="bg-[#1a1a1a] rounded-xl p-2.5 text-center">
                    <div className="text-[20px] font-black gradient-text">{item.v}</div>
                    <div className="text-[9px] text-[#555] mt-0.5">{item.l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex flex-col gap-1.5">
                {[{label:'Caddie Owners', v:'5.2', color:'#e8341c'},{label:'Mobile Only', v:'2.9', color:'#4a9fd5'}].map(d => (
                  <div key={d.label} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-[11px] text-[#888] flex-1">{d.label}</span>
                    <span className="text-[12px] font-bold" style={{ color: d.color }}>{d.v} rounds/mo</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature adoption */}
            <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4">
              <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-3">Feature Adoption · % of MAU</div>
              <div className="flex flex-col gap-3">
                {a.featureAdoption.map((feat, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[12px] text-[#888]">{feat.feature}</span>
                      <span className="text-[12px] font-bold" style={{ color: feat.color }}>{feat.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-[#1e1e1e] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${feat.pct}%`, backgroundColor: feat.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Group play signal */}
            <div className="bg-[#0f0a08] border border-[#f07428]/20 rounded-2xl p-4">
              <div className="text-[10px] text-[#f07428] font-semibold uppercase tracking-widest mb-2">Social Signal</div>
              <div className="text-white font-bold text-[15px] mb-1">18% of rounds include 2+ players</div>
              <div className="text-[#555] text-[12px] leading-relaxed">Virality / social proxy. Grows with Friends feature launch.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
