// OrderTimeline.tsx
const STEPS = [
  { key: "pending", label: "Menunggu" },
  { key: "processing", label: "Diproses" },
  { key: "shipped", label: "Dikirim" },
  { key: "done", label: "Selesai" },
];

const DOT = 14; // ukuran titik (px)

export const OrderTimeline = ({ status }: { status: string }) => {
  if (status === "cancelled" || status === "failed") {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
        Pesanan dibatalkan
      </div>
    );
  }

  const current = Math.max(
    0,
    STEPS.findIndex((s) => s.key === status),
  );
  const last = STEPS.length - 1;

  return (
    <div className="relative h-14 w-full">
      {/* garis abu-abu (dari tengah titik pertama ke tengah titik terakhir) */}
      <div
        className="absolute h-0.5 rounded bg-stone-200"
        style={{ top: DOT / 2 - 1, left: DOT / 2, right: DOT / 2 }}
      />
      {/* garis oranye = progres */}
      <div
        className="absolute h-0.5 rounded bg-orange-600 transition-all duration-500"
        style={{
          top: DOT / 2 - 1,
          left: DOT / 2,
          width: `calc((100% - ${DOT}px) * ${current / last})`,
        }}
      />

      {STEPS.map((step, i) => {
        const reached = i <= current;
        const isLast = i === last;

        return (
          <div
            key={step.key}
            className={`absolute top-0 flex flex-col gap-2 ${isLast ? "items-end" : "items-start"}`}
            style={
              isLast
                ? { right: 0 }
                : { left: `calc((100% - ${DOT}px) * ${i / last})` }
            }>
            <span
              className={`block rounded-full ${reached ? "bg-orange-600" : "bg-stone-200"}`}
              style={{ width: DOT, height: DOT }}
            />
            <span
              className={`whitespace-nowrap text-sm ${
                reached ? "text-stone-700" : "text-stone-400"
              }`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
