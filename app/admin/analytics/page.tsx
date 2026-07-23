"use client";
import { SeoHead } from '@/components/SeoHead';
import { TrendingUp, ShoppingBag, Users, DollarSign } from 'lucide-react';

const stats = [
  { label: "Total Sales", value: "12,340 DA", change: "+18%", icon: DollarSign, color: "text-primary", bg: "bg-primary/10" },
  { label: "Orders Today", value: "58", change: "+12%", icon: ShoppingBag, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "New Users", value: "14", change: "+7%", icon: Users, color: "text-violet-400", bg: "bg-violet-500/10" },
  { label: "Avg. Order", value: "4,250 DA", change: "+3%", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10" },
];

const weeklyData = [40, 65, 50, 80, 55, 90, 75];
const maxVal = Math.max(...weeklyData);
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function AdminAnalyticsPage() {
  return (
    <>
      <SeoHead title="Analytics" description="Analytics dashboard for NovaTech admin panel." />
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Insights</p>
          <h1 className="font-display text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1 text-sm">Performance overview — last 30 days.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map(({ label, value, change, icon: Icon, color, bg }) => (
            <div
              key={label}
              className="relative overflow-hidden bg-card border border-border/50 rounded-xl p-6 flex flex-col gap-4"
            >
              <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center border border-white/5 shadow-inner`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <span className="text-[10px] font-bold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.1)]">
                  {change}
                </span>
              </div>
              <div className="relative z-10 mt-2">
                <p className="text-xs text-muted-foreground mb-1.5 tracking-wide uppercase">{label}</p>
                <p className="font-display text-3xl font-bold tracking-tight text-foreground">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Area */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Weekly Bar Chart */}
          <div className="xl:col-span-2 relative overflow-hidden bg-card border border-border/50 rounded-xl p-8">
            <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-base font-bold text-foreground">Weekly Revenue</h2>
                <p className="text-xs text-muted-foreground mt-1">Orders placed per day</p>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-muted/40 px-2.5 py-1 rounded border border-border/50">This week</span>
            </div>

            {/* Bar chart */}
            <div className="relative z-10 flex items-end gap-4 h-48">
              {weeklyData.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                  <div
                    className="w-full rounded-t-sm bg-primary/10 hover:bg-primary/20 transition-colors relative group border border-b-0 border-primary/20"
                    style={{ height: `${(val / maxVal) * 100}%` }}
                  >
                    <div
                      className="absolute inset-x-0 bottom-0 rounded-t-sm bg-primary transition-all duration-500 shadow-[0_0_15px_rgba(232,255,71,0.4)] group-hover:shadow-[0_0_25px_rgba(232,255,71,0.6)]"
                      style={{ height: `${(val / maxVal) * 30}%` }}
                    />
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono font-bold text-primary whitespace-nowrap bg-background border border-primary/20 px-1.5 py-0.5 rounded shadow-glow-sm">
                      {val}
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground">{days[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Summary */}
          <div className="relative overflow-hidden bg-card border border-border/50 rounded-xl p-8">
            <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
            <h2 className="relative z-10 font-display text-base font-bold text-foreground mb-8">Top Metrics</h2>
            <div className="relative z-10 flex flex-col gap-6">
              {[
                { label: "Conversion Rate", value: "3.24%", pct: 32 },
                { label: "Return Rate", value: "1.8%", pct: 18 },
                { label: "Avg. Session", value: "4m 12s", pct: 55 },
                { label: "Cart Abandonment", value: "68%", pct: 68 },
              ].map(({ label, value, pct }) => (
                <div key={label} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
                    <span className="text-sm font-display font-bold tabular-nums text-foreground">{value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-border/50 overflow-hidden relative">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-primary/80 group-hover:bg-primary transition-colors shadow-[0_0_10px_rgba(232,255,71,0.5)]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
