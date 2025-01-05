import { useState } from 'react';
import { Copy, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';

export default function PreviewActions() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = `${window.location.origin}/artist`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleOpen = () => {
    window.open('/artist', '_blank');
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className={`w-10 h-10 p-0 flex items-center justify-center ${
          copied ? 'text-emerald-500' : 'text-gray-400 hover:text-white'
        }`}
        title={copied ? 'Copied!' : 'Copy page URL'}
      >
        <Copy className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleOpen}
        className="w-10 h-10 p-0 flex items-center justify-center text-gray-400 hover:text-white"
        title="Open in new tab"
      >
        <ExternalLink className="w-4 h-4" />
      </Button>
    </div>
  );
}