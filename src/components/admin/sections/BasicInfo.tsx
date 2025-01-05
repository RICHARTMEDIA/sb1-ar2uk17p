import { type ChangeEvent } from 'react';
import ImageUpload from '../ImageUpload';

interface BasicInfoProps {
  name: string;
  bio: string;
  image: string;
  onNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBioChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onImageChange: (url: string) => void;
}

export default function BasicInfo({ 
  name, 
  bio, 
  image, 
  onNameChange, 
  onBioChange, 
  onImageChange 
}: BasicInfoProps) {
  return (
    <section className="space-y-6">
      <h3 className="text-xl font-semibold tracking-wider text-gray-400">Basic Info</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Artist Name
          </label>
          <input
            type="text"
            value={name}
            onChange={onNameChange}
            className="w-full p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
            placeholder="Enter artist name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Bio
          </label>
          <textarea
            rows={4}
            value={bio}
            onChange={onBioChange}
            className="w-full p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300 resize-none"
            placeholder="Enter artist bio"
          />
        </div>

        <ImageUpload 
          label="Profile Image"
          description="Recommended size: 1920x1080px"
          initialValue={image}
          onChange={onImageChange}
        />
      </div>
    </section>
  );
}