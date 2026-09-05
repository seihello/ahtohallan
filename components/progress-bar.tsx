type Props = {
  value: number;
};

export default function ProgressBar({ value }: Props) {
  return (
    <div className="h-px w-full overflow-hidden rounded-full bg-frost-200/12">
      <div
        className="h-full bg-gradient-to-r from-gold-500 via-gold-300 to-ice-200 shadow-[0_0_12px_rgba(247,194,44,0.8)] transition-[width] duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
