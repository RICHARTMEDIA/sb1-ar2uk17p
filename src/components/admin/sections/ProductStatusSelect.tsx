import type { ProductStatus } from '../../../lib/types/artist';

interface ProductStatusSelectProps {
  value: ProductStatus;
  onChange: (value: ProductStatus) => void;
}

export default function ProductStatusSelect({ value, onChange }: ProductStatusSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as ProductStatus)}
      className="p-2 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
    >
      <option value="sale">For Sale</option>
      <option value="soldout">Sold Out</option>
      <option value="hidden">Hidden</option>
    </select>
  );
}