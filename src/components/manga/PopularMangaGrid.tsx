import React from 'react';
import { Manga } from '../../types/manga';
import { MangaCard } from './MangaCard';
import { LoadingCards } from '../common/LoadingCards';

interface PopularMangaGridProps {
  manga: Manga[];
  isLoading: boolean;
  onMoreInfo: (manga: Manga) => void;
}

export const PopularMangaGrid: React.FC<PopularMangaGridProps> = ({
  manga,
  isLoading,
  onMoreInfo
}) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-zinc-800">
          Most Popular
          <span className="text-sm text-gray-500 ml-2 japanese-text">今週の人気マンガ</span>
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {isLoading ? (
          <LoadingCards count={10} />
        ) : manga.length > 0 ? (
          manga.map(manga => (
            <MangaCard
              key={manga.mal_id}
              manga={manga}
              onMoreInfo={onMoreInfo}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-8">
            No popular manga available at the moment
          </p>
        )}
      </div>
    </section>
  );
}