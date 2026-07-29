import { useState } from 'react';
import type { WeeklyTrendPoint } from '../api/dashboard';

interface Props {
  data: WeeklyTrendPoint[];
}

const SERIES = [
  { key: 'creatorSignups' as const, label: 'New creators', color: '#FF962D' },
  { key: 'bookings' as const, label: 'Bookings', color: '#2F6FED' },
];

const WIDTH = 680;
const HEIGHT = 240;
const PAD = { top: 16, right: 34, bottom: 28, left: 30 };
const PLOT_W = WIDTH - PAD.left - PAD.right;
const PLOT_H = HEIGHT - PAD.top - PAD.bottom;

function niceCeil(n: number): number {
  if (n <= 0) return 4;
  const magnitude = Math.pow(10, Math.floor(Math.log10(n)));
  const residual = n / magnitude;
  const steps = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
  const step = steps.find((s) => s >= residual) ?? 10;
  return step * magnitude;
}

function formatWeekLabel(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export default function WeeklyTrendChart({ data }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (!data.length) return null;

  const n = data.length;
  const xStep = n > 1 ? PLOT_W / (n - 1) : 0;
  const xAt = (i: number) => PAD.left + i * xStep;

  const maxVal = Math.max(1, ...data.flatMap((d) => [d.creatorSignups, d.bookings]));
  const niceMax = niceCeil(maxVal);
  const yAt = (v: number) => PAD.top + PLOT_H - (v / niceMax) * PLOT_H;

  const yTicks = [0, niceMax / 2, niceMax];

  const paths = SERIES.map((s) => ({
    ...s,
    d: data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i)},${yAt(d[s.key])}`).join(' '),
    last: data[data.length - 1][s.key],
  }));

  const hoveredPoint = hovered !== null ? data[hovered] : null;
  const bandWidth = n > 1 ? PLOT_W / (n - 1) : PLOT_W;

  return (
    <div className="admin-chart-card">
      <div className="admin-chart-head">
        <div className="admin-chart-title">Weekly activity</div>
        <div className="admin-chart-legend">
          {SERIES.map((s) => (
            <span key={s.key} className="admin-chart-legend-item">
              <span className="admin-chart-swatch" style={{ background: s.color }} />
              {s.label}
            </span>
          ))}
        </div>
      </div>

      <div className="admin-chart-svg-wrap">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="admin-chart-svg" role="img" aria-label="New creators and bookings per week, last 8 weeks">
          {yTicks.map((t, i) => (
            <g key={i}>
              <line x1={PAD.left} x2={WIDTH - PAD.right} y1={yAt(t)} y2={yAt(t)} className="admin-chart-grid" />
              <text x={PAD.left - 8} y={yAt(t)} className="admin-chart-tick" textAnchor="end" dominantBaseline="middle">
                {Math.round(t)}
              </text>
            </g>
          ))}

          {data.map((d, i) => (
            <text
              key={i}
              x={xAt(i)}
              y={HEIGHT - 6}
              className="admin-chart-tick"
              textAnchor={i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'}
            >
              {formatWeekLabel(d.weekEnd)}
            </text>
          ))}

          {hoveredPoint && (
            <line x1={xAt(hovered!)} x2={xAt(hovered!)} y1={PAD.top} y2={HEIGHT - PAD.bottom} className="admin-chart-crosshair" />
          )}

          {paths.map((p) => (
            <path key={p.key} d={p.d} fill="none" stroke={p.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          ))}

          {paths.map((p) =>
            data.map((d, i) => (
              <circle
                key={`${p.key}-${i}`}
                cx={xAt(i)}
                cy={yAt(d[p.key])}
                r={hovered === i ? 6 : 4}
                fill={p.color}
                stroke="#fff"
                strokeWidth={2}
              />
            ))
          )}

          {paths.map((p) => (
            <g key={`${p.key}-end`}>
              <circle cx={xAt(n - 1) + 12} cy={yAt(p.last)} r={3} fill={p.color} />
              <text x={xAt(n - 1) + 18} y={yAt(p.last)} className="admin-chart-endlabel" dominantBaseline="middle">
                {p.last}
              </text>
            </g>
          ))}

          {data.map((_, i) => (
            <rect
              key={i}
              x={xAt(i) - bandWidth / 2}
              y={PAD.top}
              width={bandWidth}
              height={PLOT_H}
              fill="transparent"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
        </svg>

        {hoveredPoint && (
          <div
            className="admin-chart-tooltip"
            style={{ left: `${(xAt(hovered!) / WIDTH) * 100}%` }}
          >
            <b>
              {formatWeekLabel(hoveredPoint.weekStart)} – {formatWeekLabel(hoveredPoint.weekEnd)}
            </b>
            {SERIES.map((s) => (
              <div key={s.key} className="admin-chart-tooltip-row">
                <span className="admin-chart-key" style={{ background: s.color }} />
                <strong>{hoveredPoint[s.key]}</strong> {s.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
