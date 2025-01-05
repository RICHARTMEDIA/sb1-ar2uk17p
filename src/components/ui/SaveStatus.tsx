import { CheckCircle2, AlertCircle } from 'lucide-react';

interface SaveStatusProps {
  status: 'saved' | 'unsaved' | 'saving' | 'error';
}

export default function SaveStatus({ status }: SaveStatusProps) {
  if (status === 'saved') {
    return (
      <div className="flex items-center gap-2 text-emerald-500">
        <CheckCircle2 className="w-5 h-5" />
        <span>Changes saved</span>
      </div>
    );
  }

  if (status === 'saving') {
    return (
      <div className="flex items-center gap-2 text-emerald-500">
        <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span>Saving changes...</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex items-center gap-2 text-red-500">
        <AlertCircle className="w-5 h-5" />
        <span>Failed to save changes</span>
      </div>
    );
  }

  if (status === 'unsaved') {
    return (
      <div className="flex items-center gap-2 text-amber-500">
        <AlertCircle className="w-5 h-5" />
        <span>You have unsaved changes</span>
      </div>
    );
  }

  return null;
}