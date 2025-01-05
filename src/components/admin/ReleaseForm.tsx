import ImageUpload from './ImageUpload';

interface ReleaseFormProps {
  initialData?: {
    title: string;
    description: string;
    image: string;
  };
  onChange: (data: { title: string; description: string; image: string }) => void;
}

export default function ReleaseForm({ initialData, onChange }: ReleaseFormProps) {
  const handleChange = (field: string, value: string) => {
    onChange({
      title: field === 'title' ? value : initialData?.title || '',
      description: field === 'description' ? value : initialData?.description || '',
      image: field === 'image' ? value : initialData?.image || ''
    });
  };

  return (
    <section className="space-y-6">
      <h3 className="text-xl font-semibold tracking-wider text-gray-400">Latest Release</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Release Title
          </label>
          <input
            type="text"
            value={initialData?.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
            placeholder="Enter release title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Release Description
          </label>
          <textarea
            rows={4}
            value={initialData?.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300 resize-none"
            placeholder="Enter release description"
          />
        </div>

        <ImageUpload 
          label="Cover Image URL"
          description="Recommended size: 1000x1000px"
          initialValue={initialData?.image}
          onChange={(url) => handleChange('image', url)}
        />
      </div>
    </section>
  );
}