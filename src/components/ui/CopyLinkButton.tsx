import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from './Button';

interface CopyLinkButtonProps {
  pageId: string;
}

export default function CopyLinkButton({ pageId }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = `${window.location.origin}/promo/${pageId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className={`w-10 h-10 p-0 flex items-center justify-center ${copied ? 'text-emerald-500' : 'text-gray-400 hover:text-gray-300'}`}
      title={copied ? 'Copied!' : 'Copy public link'}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </Button>
  );
}