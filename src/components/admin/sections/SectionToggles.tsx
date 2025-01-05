import Toggle from '../../ui/Toggle';
import type { SectionVisibility } from '../../../lib/types/promo';

interface SectionTogglesProps {
  sections: SectionVisibility;
  onChange: (key: keyof SectionVisibility) => void;
}

const SECTION_LABELS: Record<keyof SectionVisibility, string> = {
  latestRelease: 'Latest Release',
  platformLinks: 'Platform Links',
  otherReleases: 'Other Releases',
  socialLinks: 'Social Links'
};

export default function SectionToggles({ sections, onChange }: SectionTogglesProps) {
  return (
    <section className="space-y-6">
      <h3 className="text-xl font-semibold tracking-wider text-gray-400">Section Visibility</h3>
      <div className="space-y-4">
        {(Object.keys(sections) as Array<keyof SectionVisibility>).map((key) => (
          <div key={key} className="bg-zinc-900/30 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-300">{SECTION_LABELS[key]}</h4>
              <Toggle
                checked={sections[key]}
                onChange={() => onChange(key)}
                label={sections[key] ? 'Visible' : 'Hidden'}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}