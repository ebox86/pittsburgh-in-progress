type PermitTypeFiltersProps = {
  types: string[];
  isTypeVisible: (type: string) => boolean;
  onToggleType: (type: string) => void;
};

export default function PermitTypeFilters({
  types,
  isTypeVisible,
  onToggleType,
}: PermitTypeFiltersProps) {
  if (types.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {types.map((type) => (
        <label
          key={type}
          className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-3 py-2 text-sm text-white transition hover:border-[var(--color-gold)]"
        >
          <span className="text-left text-sm">{type}</span>
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-white/40 bg-black text-[var(--color-gold)] accent-[var(--color-gold)]"
            checked={isTypeVisible(type)}
            onChange={() => onToggleType(type)}
            aria-label={`Show ${type}`}
          />
        </label>
      ))}
    </div>
  );
}
