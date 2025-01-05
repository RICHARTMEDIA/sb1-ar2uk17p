import { type ChangeEvent } from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange();
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={handleChange}
        />
        <div className={`
          w-10 h-6 rounded-full transition-colors duration-200 ease-in-out
          ${checked ? 'bg-emerald-500' : 'bg-zinc-700'}
        `}>
          <div className={`
            absolute top-1 left-1 w-4 h-4 rounded-full transition-transform duration-200 ease-in-out bg-white
            ${checked ? 'translate-x-4' : 'translate-x-0'}
          `} />
        </div>
      </div>
      {label && (
        <span className="ml-3 text-sm font-medium text-gray-300">{label}</span>
      )}
    </label>
  );
}

export default Toggle;