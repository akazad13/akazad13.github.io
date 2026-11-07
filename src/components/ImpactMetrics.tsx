import { ImpactMetric } from '../types/portfolio';
import { IconTile } from './Icons';

interface ImpactMetricsProps {
  metrics: ImpactMetric[];
}

export function ImpactMetrics({ metrics }: ImpactMetricsProps) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section aria-label="Key Impact & Leadership Metrics" className="border-t border-line/60">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 md:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-5">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="group flex flex-col justify-between rounded-2xl border border-line bg-surface p-5 transition-all duration-200 hover:border-accent/40 hover:shadow-sm sm:p-6"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[0.78rem] font-semibold uppercase tracking-wider text-muted">
                  {metric.label}
                </span>
                <IconTile name={metric.icon} size="sm" />
              </div>
              <div className="mt-4">
                <div className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-[2rem]">
                  {metric.value}
                </div>
                <p className="mt-1.5 text-[0.88rem] leading-snug text-muted">
                  {metric.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
