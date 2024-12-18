import React from 'react';
import { Manga } from '../../../types/manga';
import { MangaCard } from '../../manga/MangaCard';

interface SearchResultsGridProps {
  results: Manga[];
  onMangaSelect: (manga: Manga) => void;
}

export const SearchResultsGrid: React.FC<SearchResultsGridProps> = ({
  results,
  onMangaSelect,
}) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {results.map((manga) => (
      <MangaCard
        key={manga.mal_id}
        manga={manga}
        onMoreInfo={() => onMangaSelect(manga)}
      />
    ))}
  </div>
);