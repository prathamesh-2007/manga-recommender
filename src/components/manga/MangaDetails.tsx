import React from 'react';
import { X, Star, Calendar, BookOpen } from 'lucide-react';
import { Manga } from '../../types/manga';

interface MangaDetailsProps {
  manga: Manga;
  onClose: () => void;
}

export const MangaDetails: React.FC<MangaDetailsProps> = ({ manga, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-zinc-800">{manga.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <img
              src={manga.images.jpg.large_image_url}
              alt={manga.title}
              className="w-full md:w-48 h-72 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">Score: {manga.score}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">
                    {manga.chapters ? `${manga.chapters} chapters` : 'Ongoing'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-500" />
                  <span className="text-sm">
                    {new Date(manga.published.from).getFullYear()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm capitalize">{manga.status.toLowerCase()}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {manga.genres.map(genre => (
                    <span
                      key={genre.name}
                      className="px-3 py-1 bg-gray-100 rounded-full text-xs"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">Synopsis</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{manga.synopsis}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-2">Authors</h3>
              <p className="text-sm text-gray-700">
                {manga.authors.map(a => a.name).join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}