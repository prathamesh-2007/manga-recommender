import React from 'react';
import { FilterSelect } from '../../common/FilterSelect';
import { DECADES } from '../../../constants/decades';
import { RATINGS } from '../../../constants/ratings';
import { RecommendationFilters } from '../../../types/filters';
import { Genre } from '../../../types/manga';

interface FilterSectionProps {
  filters: RecommendationFilters;
  genres: Genre[];
  onFilterChange: (filters: RecommendationFilters) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  genres,
  onFilterChange,
}) => {
  const genreOptions = genres.map(genre => ({
    id: `genre-${genre.mal_id}`,
    value: genre.mal_id.toString(),
    label: genre.name,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2 japanese-text">
          ジャンル (Genre)
        </label>
        <FilterSelect
          value={filters.genre}
          onChange={(value) => onFilterChange({ ...filters, genre: value })}
          options={genreOptions}
          placeholder="Select Genre"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2 japanese-text">
          年代 (Decade)
        </label>
        <FilterSelect
          value={filters.decade}
          onChange={(value) => onFilterChange({ ...filters, decade: value })}
          options={DECADES}
          placeholder="Select Decade"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2 japanese-text">
          評価 (Rating)
        </label>
        <FilterSelect
          value={filters.rating}
          onChange={(value) => onFilterChange({ ...filters, rating: value })}
          options={RATINGS}
          placeholder="Select Rating"
        />
      </div>
    </div>
  );
};