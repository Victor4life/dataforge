'use client';

import { useState } from 'react';

export function DatasetFilters() {
  const [filters, setFilters] = useState({
    search: '',
    sortBy: 'newest',
    tags: [] as string[],
    priceRange: [0, 500],
  });

  const tags = ['AI', 'Images', 'Text', 'Audio', 'Video', 'Healthcare', 'Finance', 'Vision', 'NLP', 'Speech'];

  return (
    <div className="bg-card border border-border rounded-lg shadow-lg p-6 h-fit sticky top-20">
      <h3 className="font-semibold mb-4">Filters</h3>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Search</label>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="bg-card border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-full text-sm"
          placeholder="Search datasets..."
        />
      </div>

      {/* Sort */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          className="bg-card border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-full text-sm"
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popular">Most Popular</option>
          <option value="verified">Verified First</option>
        </select>
      </div>

      {/* Tags */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Tags</label>
        <div className="space-y-2">
          {tags.map((tag) => (
            <label key={tag} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.tags.includes(tag)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({ ...filters, tags: [...filters.tags, tag] });
                  } else {
                    setFilters({ ...filters, tags: filters.tags.filter((t) => t !== tag) });
                  }
                }}
                className="w-4 h-4 rounded bg-card border border-border accent-primary"
              />
              <span className="text-sm">{tag}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            max="500"
            value={filters.priceRange[0]}
            onChange={(e) => setFilters({ ...filters, priceRange: [parseInt(e.target.value), filters.priceRange[1]] })}
            className="bg-card border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-20 text-sm"
            placeholder="Min"
          />
          <span className="self-center">-</span>
          <input
            type="number"
            min="0"
            max="500"
            value={filters.priceRange[1]}
            onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)] })}
            className="bg-card border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-20 text-sm"
            placeholder="Max"
          />
        </div>
      </div>

      <button className="px-4 py-2 rounded-lg font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity w-full text-sm">Apply Filters</button>
    </div>
  );
}
