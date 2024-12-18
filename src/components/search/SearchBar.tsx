import React, { useState, useRef, useEffect } from 'react';
import { useSearch } from '../../hooks/useSearch';
import { SearchInput } from './SearchInput';
import { SearchResults } from './SearchResults';
import { MangaDetails } from '../manga/MangaDetails';
import { Manga } from '../../types/manga';

export const SearchBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const {
    query,
    results,
    isLoading,
    setQuery,
    clearSearch
  } = useSearch();

  const handleExpand = () => {
    setIsExpanded(true);
    if (query.length >= 3) {
      setShowResults(true);
    }
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleCollapse = () => {
    setTimeout(() => {
      if (!searchRef.current?.contains(document.activeElement)) {
        setIsExpanded(false);
        setShowResults(false);
      }
    }, 200);
  };

  const handleClear = () => {
    clearSearch();
    setShowResults(false);
    setIsExpanded(false);
    inputRef.current?.blur();
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (value.length >= 3) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClear();
    } else if (e.key === 'Enter' && query.length >= 3) {
      setShowResults(true);
    }
  };

  const handleSelectManga = (manga: Manga) => {
    setSelectedManga(manga);
    handleClear();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        if (!query) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [query]);

  return (
    <div ref={searchRef} className="relative z-50">
      <SearchInput
        query={query}
        isExpanded={isExpanded}
        isLoading={isLoading}
        inputRef={inputRef}
        onQueryChange={handleQueryChange}
        onExpand={handleExpand}
        onCollapse={handleCollapse}
        onClear={handleClear}
        onKeyDown={handleKeyDown}
      />

      {showResults && results.length > 0 && (
        <SearchResults
          results={results}
          onSelectManga={handleSelectManga}
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