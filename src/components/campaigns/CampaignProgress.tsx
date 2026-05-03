interface CampaignProgressProps {
  title: string;
  raised: number;
  goal: number;
  variant?: "card" | "detail";
  className?: string;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
  }).format(amount);

const getProgress = (raised: number, goal: number) => {
  if (goal <= 0) {
    return 0;
  }

  return Math.min((raised / goal) * 100, 100);
};

export default function CampaignProgress({
  title,
  raised,
  goal,
  variant = "card",
  className = "",
}: CampaignProgressProps) {
  const progress = getProgress(raised, goal);
  const roundedProgress = Math.round(progress);
  const isDetail = variant === "detail";
  const containerClassName = [className, isDetail ? "" : "space-y-2"].filter(Boolean).join(" ");

  return (
    <div
      className={containerClassName}
      role="region"
      aria-label={`${title} fundraising progress`}
    >
      {isDetail ? (
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-account-black/60">Raised</p>
            <p className="text-2xl font-bold text-akhirah-teal">
              {formatCurrency(raised)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-account-black/60">Goal</p>
            <p className="text-lg font-bold text-account-black">
              {formatCurrency(goal)}
            </p>
          </div>
        </div>
      ) : null}

      <div
        className={[
          "overflow-hidden rounded-sm border border-akhirah-teal/10",
          isDetail ? "h-3 bg-purity-white" : "h-2 bg-mercy-mint",
        ].join(" ")}
        role="progressbar"
        aria-valuenow={roundedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${roundedProgress}% of goal reached`}
      >
        <div
          className="h-full rounded-sm bg-eternal-gold transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {isDetail ? (
        <p className="mt-2 text-sm font-semibold text-account-black/65">
          {roundedProgress}% funded
        </p>
      ) : (
        <div className="flex justify-between text-sm">
          <span className="font-bold text-akhirah-teal">
            {formatCurrency(raised)} raised
          </span>
          <span className="text-account-black/55">of {formatCurrency(goal)}</span>
        </div>
      )}
    </div>
  );
}
