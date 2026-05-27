import { useState } from 'react'

export interface CalculatorItem {
  name: string
  gold: number
  copper: number
  aluminum: number
  co2: number
  image: string
}

interface ImpactCalculatorProps {
  title?: string
  description?: string
  items: CalculatorItem[]
}

function formatValue(value: number): string {
  if (value >= 1000) return (value / 1000).toFixed(1)
  if (value >= 1) return value.toFixed(1)
  if (value >= 0.01) return value.toFixed(2)
  if (value > 0) return value.toFixed(3)
  return '0'
}

interface MetricConfig {
  label: string
  unit: string
  icon: string
  colorClass: 'primary' | 'secondary' | 'accent' | 'success'
}

const metrics: Record<string, MetricConfig> = {
  gold: {
    label: 'Gold',
    unit: 'g',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    colorClass: 'accent',
  },
  copper: {
    label: 'Copper',
    unit: 'g',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    colorClass: 'secondary',
  },
  aluminum: {
    label: 'Aluminum',
    unit: 'g',
    icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
    colorClass: 'primary',
  },
  co2: {
    label: 'CO\u2082 Prevented',
    unit: 'kg',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    colorClass: 'success',
  },
}

function MetricCard({ metric, value }: { metric: MetricConfig; value: number }) {
  const colorMap = {
    primary: {
      bg: 'bg-primary/5',
      border: 'border-primary/10',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      valueClass: 'text-primary',
      ring: 'ring-primary/20',
    },
    secondary: {
      bg: 'bg-secondary/5',
      border: 'border-secondary/10',
      iconBg: 'bg-secondary/10',
      iconColor: 'text-secondary',
      valueClass: 'text-secondary',
      ring: 'ring-secondary/20',
    },
    accent: {
      bg: 'bg-accent/5',
      border: 'border-accent/10',
      iconBg: 'bg-accent/10',
      iconColor: 'text-accent',
      valueClass: 'text-accent',
      ring: 'ring-accent/20',
    },
    success: {
      bg: 'bg-success/5',
      border: 'border-success/10',
      iconBg: 'bg-success/10',
      iconColor: 'text-success',
      valueClass: 'text-success',
      ring: 'ring-success/20',
    },
  }

  const c = colorMap[metric.colorClass]

  return (
    <div
      className={`${c.bg} rounded-xl sm:rounded-2xl p-4 sm:p-5 border ${c.border} transition-all duration-500 hover:shadow-lg hover:scale-[1.02] motion-preset-slide-up`}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <div className={`w-9 h-9 rounded-xl ${c.iconBg} flex items-center justify-center ring-1 ${c.ring} transition-all duration-300`}>
          <svg className={`w-4 h-4 ${c.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d={metric.icon} />
          </svg>
        </div>
        <span className="text-[11px] font-semibold text-text/40 uppercase tracking-[0.08em]">{metric.label}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span
          className={`font-title text-2xl sm:text-3xl font-bold ${c.valueClass} transition-all duration-300`}
        >
          {formatValue(value)}
        </span>
        <span className="text-xs text-text/30 font-medium">{metric.unit}</span>
      </div>
    </div>
  )
}

export function ImpactCalculator({
  title = 'E-Waste Impact Calculator',
  description = 'Select the devices you\'ve recycled and see the environmental impact of your contribution.',
  items = [],
}: ImpactCalculatorProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const clearAll = () => setSelected(new Set())

  const totals = { gold: 0, copper: 0, aluminum: 0, co2: 0 }
  selected.forEach((index) => {
    const item = items[index]
    if (item) {
      totals.gold += item.gold
      totals.copper += item.copper
      totals.aluminum += item.aluminum
      totals.co2 += item.co2
    }
  })

  const hasSelection = selected.size > 0
  const itemCounts = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.name] = (acc[item.name] || 0) + 1
    return acc
  }, {})
  const hasDuplicates = Object.values(itemCounts).some((c) => c > 1)

  return (
    <div className="relative">
      {/* Floating decorative blobs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-secondary/8 rounded-full blur-3xl -z-10 motion-preset-float motion-duration-4000" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/8 rounded-full blur-3xl -z-10 motion-preset-float motion-duration-5000 motion-delay-1000" />
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 motion-preset-pulse motion-duration-6000" />

      {/* Header */}
      <div className="text-center mb-10 motion-preset-slide-up motion-duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4">
          <span className="w-2 h-2 rounded-full bg-primary motion-preset-pulse" />
          Calculate Your Impact
        </div>
        <h2 className="font-title text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-base sm:text-lg text-text/60 max-w-2xl mx-auto font-light">{description}</p>
        )}
      </div>

      {/* Device Grid */}
      {items.length === 0 ? (
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl border border-primary/10 p-12 text-center motion-preset-pop">
          <p className="text-text/40 font-light">No devices available to calculate impact.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {items.map((item, index) => {
            const isSelected = selected.has(index)
            return (
              <button
                key={hasDuplicates ? `${item.name}-${index}` : index}
                onClick={() => toggleItem(index)}
                className={`relative group bg-white/40 backdrop-blur-sm rounded-2xl border p-4 sm:p-5 text-center transition-all duration-300 card-hover motion-preset-slide-up motion-duration-500 ${
                  isSelected
                    ? 'border-primary/30 shadow-lg shadow-primary/10 bg-white/60 ring-2 ring-primary/20'
                    : 'border-primary/10 hover:border-primary/20 hover:bg-white/60 hover:shadow-md'
                }`}
              >
                {/* Emoji */}
                <div
                  className={`text-3xl sm:text-4xl mb-2.5 transition-all duration-300 ${
                    isSelected ? 'scale-110' : 'group-hover:scale-105'
                  }`}
                  aria-hidden="true"
                >
                  {item.image}
                </div>

                {/* Name */}
                <p className="font-title text-sm sm:text-base font-bold text-text mb-2 leading-tight">
                  {item.name}
                </p>

                {/* Badge */}
                <span
                  className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full transition-all duration-300 ${
                    isSelected
                      ? 'bg-primary/15 text-primary shadow-sm'
                      : 'bg-accent/10 text-accent group-hover:bg-accent/15'
                  }`}
                >
                  {isSelected ? 'Added' : '+ Add'}
                </span>

                {/* Selection check indicator */}
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-sm motion-preset-pop motion-duration-200">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      )}

      {/* Total Impact Panel */}
      <div
        className={`bg-white/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl border p-6 sm:p-8 transition-all duration-500 motion-preset-slide-up motion-duration-700 ${
          hasSelection
            ? 'border-primary/20 shadow-xl shadow-primary/5'
            : 'border-primary/10'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-title text-xl sm:text-2xl font-bold text-text flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center ring-1 ring-primary/10">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            Your Total Impact
          </h3>

          {hasSelection && (
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm text-text/40 font-medium hidden sm:block">
                {selected.size} {selected.size === 1 ? 'device' : 'devices'}
              </span>
              <button
                onClick={clearAll}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-text/5 text-text/40 hover:bg-error/10 hover:text-error transition-all duration-300"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {!hasSelection ? (
          <div className="text-center py-10 sm:py-14">
            <div className="w-16 h-16 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-text/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <p className="text-text/40 font-light text-sm sm:text-base">
              Select devices above to calculate your environmental impact
            </p>
          </div>
        ) : (
          <>
            {/* Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <MetricCard metric={metrics.gold} value={totals.gold} />
              <MetricCard metric={metrics.copper} value={totals.copper} />
              <MetricCard metric={metrics.aluminum} value={totals.aluminum} />
              <MetricCard metric={metrics.co2} value={totals.co2} />
            </div>

            {/* Visual breakdown bar */}
            <div className="bg-white/30 rounded-xl p-4 sm:p-5 border border-primary/5 transition-all duration-300">
              <p className="text-xs font-semibold text-text/40 uppercase tracking-[0.06em] mb-3">
                Material Recovery Breakdown
              </p>
              <div className="flex h-3 sm:h-4 rounded-full overflow-hidden bg-primary/5 ring-1 ring-primary/5">
                {totals.gold > 0 && (
                  <div
                    className="bg-accent transition-all duration-700 ease-out rounded-l-full"
                    style={{
                      width: `${(totals.gold / (totals.gold + totals.copper + totals.aluminum)) * 100}%`,
                      minWidth: totals.gold > 0 ? '4px' : '0',
                    }}
                  />
                )}
                {totals.copper > 0 && (
                  <div
                    className="bg-secondary transition-all duration-700 ease-out"
                    style={{
                      width: `${(totals.copper / (totals.gold + totals.copper + totals.aluminum)) * 100}%`,
                      minWidth: totals.copper > 0 ? '4px' : '0',
                    }}
                  />
                )}
                {totals.aluminum > 0 && (
                  <div
                    className="bg-primary transition-all duration-700 ease-out rounded-r-full"
                    style={{
                      width: `${(totals.aluminum / (totals.gold + totals.copper + totals.aluminum)) * 100}%`,
                      minWidth: totals.aluminum > 0 ? '4px' : '0',
                    }}
                  />
                )}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
                <LegendDot color="bg-accent" label="Gold" />
                <LegendDot color="bg-secondary" label="Copper" />
                <LegendDot color="bg-primary" label="Aluminum" />
              </div>
            </div>

            {/* CO₂ equivalence callout */}
            {totals.co2 > 0 && (
              <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-text/50 font-light motion-preset-slide-up motion-duration-500">
                <svg className="w-4 h-4 text-success shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>
                  That&apos;s <strong className="text-success font-semibold">{formatValue(totals.co2)} kg</strong> of CO
                  <sub className="text-[0.6em]">2</sub> emissions prevented — equivalent to planting{' '}
                  <strong className="text-primary font-semibold">
                    {totals.co2 >= 20 ? Math.round(totals.co2 / 20) : '<1'}
                  </strong>{' '}
                  tree{Math.round(totals.co2 / 20) !== 1 ? 's' : ''} this year.
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-text/40 font-medium">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      {label}
    </span>
  )
}
