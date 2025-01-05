import { Toggle } from '../../ui/Toggle';

interface SectionHeaderProps {
  title: string;
  visible: boolean;
  onVisibilityChange: () => void;
}

export default function SectionHeader({
  title,
  visible,
  onVisibilityChange
}: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-semibold tracking-wider text-gray-400">{title}</h3>
      <Toggle
        checked={visible}
        onChange={onVisibilityChange}
        label={visible ? 'Visible' : 'Hidden'}
      />
    </div>
  );
}