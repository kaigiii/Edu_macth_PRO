import { useState } from 'react';
import type { ImpactStory } from '../types';

interface StoryCardProps {
  story: ImpactStory;
}

const StoryCard = ({ story }: StoryCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="rounded-lg border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
      {/* Image */}
      <div className="h-48 overflow-hidden rounded-t-lg relative">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
            <div className="text-gray-400 text-sm">載入中...</div>
          </div>
        )}
        <img 
          src={story.imageUrl} 
          alt={story.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(false);
          }}
        />
        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-brand-orange/20 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">📸</div>
              <div className="text-sm">圖片載入失敗</div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-lg mb-3 line-clamp-2">
          {story.title}
        </h3>

        {/* Summary */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {story.summary}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            <span className="font-medium">由 {story.companyName}</span>
            <br />
            <span>捐贈給 {story.schoolName}</span>
          </div>
          <div className="text-sm text-gray-400">
            {story.storyDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
