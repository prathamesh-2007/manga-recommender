import React, { useState } from 'react';
import { SearchInput } from './SearchInput';
import { SearchSuggestions } from './SearchSuggestions';
import { useSearchBar } from './useSearchBar';
import { SearchResultsPage } from '../SearchResultsPage';
import { MangaDetails } from '../../manga/MangaDetails';
import { Manga } from '../../../types/manga';

export const SearchBar: React.FC = () => {
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  
  const {
    query,
    results,
    isLoading,
    isExpanded,
    showResults,
    showSuggestions,
    inputRef,
    setQuery,
    handlers
  } = useSearchBar();

  const handleMangaSelect = (manga: Manga) => {
    setSelectedManga(manga);
    handlers.onHideSuggestions();
  };

  return (
    <div className="relative">
      <SearchInput
        query={query}
        isExpanded={isExpanded}
        isLoading={isLoading}
        inputRef={inputRef}
        onQueryChange={setQuery}
        onExpand={handlers.onExpand}
        onCollapse={handlers.onCollapse}
        onClear={handlers.onClear}
        onKeyDown={handlers.onKeyDown}
      />

      {showSuggestions && (
        <SearchSuggestions
          results={results}
          onSelect={handleMangaSelect}
          isVisible={showSuggestions}
        />
      )}

      {showResults && (
        <SearchResultsPage
          query={query}
          results={results}
          isLoading={isLoading}
          onBack={handlers.onHideResults}
          onMangaSelect={handleMangaSelect}
        />
      )}

      {selectedManga && (
        <MangaDetails
          manga={selectedManga}
          onClose={() => setSelectedManga(null)}
        />
      )}
    </div>
  );
};