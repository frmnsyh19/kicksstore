"use client";

import { useEffect, useState } from "react";

type SneakerLoaderProps = {
  /** Pesan yang berganti-ganti di bawah animasi. */
  messages?: string[];
  /** 0–100. Kalau diisi, bar jadi determinate; kalau tidak, bar berjalan terus. */
  progress?: number;
  /** true = menutup seluruh layar, false = mengisi container induk. */
  fullScreen?: boolean;
  className?: string;
};

const DEFAULT_MESSAGES = [
  "Menyiapkan koleksi terbaru",
  "Mengikat tali sepatu",
  "Mengecek stok ukuran",
];

const SOLE_PATH = "M14 94H228V104Q228 112 220 112H24Q14 112 14 102Z";
const UPPER_PATH =
  "M22 94V54Q22 44 32 44H54Q62 44 68 52Q76 62 92 60L88 36Q88 32 94 32L106 34L112 52L150 68Q176 76 200 80Q222 84 226 94";
const LACES = ["M120 51L127 63", "M132 56L139 68", "M144 62L151 74"];

export default function SneakerLoader({
  messages = DEFAULT_MESSAGES,
  progress,
  fullScreen = true,
  className = "",
}: SneakerLoaderProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (messages.length < 2) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % messages.length),
      2400,
    );
    return () => clearInterval(id);
  }, [messages.length]);

  const determinate = typeof progress === "number";
  const pct = determinate ? Math.min(100, Math.max(0, progress)) : 0;

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "grid place-items-center bg-[#EEF1F4] text-[#0E1A2B] dark:bg-[#0B1220] dark:text-[#E8EDF3]",
        fullScreen ? "fixed inset-0 z-50" : "min-h-[260px] w-full rounded-2xl",
        className,
      ].join(" ")}>
      <style>{`
        @keyframes sl-draw {
          0%   { stroke-dashoffset: 1; opacity: 1; }
          55%  { stroke-dashoffset: 0; opacity: 1; }
          88%  { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes sl-lace {
          0%, 35% { stroke-dashoffset: 1; opacity: 1; }
          60%     { stroke-dashoffset: 0; opacity: 1; }
          88%     { stroke-dashoffset: 0; opacity: 1; }
          100%    { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes sl-fill {
          0%, 45% { opacity: 0; }
          62%     { opacity: 1; }
          88%     { opacity: 1; }
          100%    { opacity: 0; }
        }
        @keyframes sl-shadow {
          0%, 100% { transform: scaleX(.6); opacity: .15; }
          55%      { transform: scaleX(1);  opacity: .4; }
        }
        @keyframes sl-msg {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes sl-bar {
          from { transform: translateX(-100%); }
          to   { transform: translateX(260%); }
        }
        .sl-draw, .sl-lace {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: sl-draw 2.6s cubic-bezier(.65,0,.35,1) infinite;
        }
        .sl-lace { animation-name: sl-lace; }
        .sl-fill { animation: sl-fill 2.6s ease-in-out infinite; }
        .sl-shadow {
          transform-origin: center;
          transform-box: fill-box;
          animation: sl-shadow 2.6s ease-in-out infinite;
        }
        .sl-msg { animation: sl-msg .4s ease-out both; }
        .sl-bar-run { animation: sl-bar 1.3s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .sl-draw, .sl-lace { animation: none; stroke-dashoffset: 0; }
          .sl-fill { animation: none; opacity: 1; }
          .sl-shadow { animation: none; opacity: .3; }
          .sl-bar-run { animation: none; transform: none; width: 100%; }
        }
      `}</style>

      <div className="flex flex-col items-center gap-8 px-6">
        <svg
          viewBox="0 0 240 124"
          className="w-60 sm:w-80"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true">
          <ellipse
            className="sl-shadow"
            cx="120"
            cy="120"
            rx="92"
            ry="3"
            fill="currentColor"
            stroke="none"
          />
          <path
            className="sl-fill"
            d={SOLE_PATH}
            fill="#FF5A1F"
            stroke="none"
          />
          <path className="sl-draw" pathLength={1} d={SOLE_PATH} />
          <path className="sl-draw" pathLength={1} d={UPPER_PATH} />
          {LACES.map((d, i) => (
            <path
              key={d}
              className="sl-lace"
              pathLength={1}
              d={d}
              stroke="#FF5A1F"
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
        </svg>

        <div className="flex flex-col items-center gap-4">
          <p
            key={index}
            className="sl-msg text-base font-semibold tracking-tight">
            {messages[index] ?? ""}
          </p>

          <div
            className="h-1 w-44 overflow-hidden rounded-full bg-[#0E1A2B]/15 dark:bg-white/15"
            {...(determinate && {
              role: "progressbar",
              "aria-valuemin": 0,
              "aria-valuemax": 100,
              "aria-valuenow": Math.round(pct),
            })}>
            {determinate ? (
              <div
                className="h-full rounded-full bg-[#FF5A1F] transition-[width] duration-300 ease-out"
                style={{ width: `${pct}%` }}
              />
            ) : (
              <div className="sl-bar-run h-full w-1/3 rounded-full bg-[#FF5A1F]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
