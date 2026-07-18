"use client";

import { IFilterOptions, IProducts } from "@/types/products";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/home/product-card";
import {
  createDefaultFilters,
  createFiltersFromParams,
  filterCatalogProducts,
} from "@/features/product-filters";
import ProductFiltersPanel from "./product-filters";

interface ProductsListingProps {
  products: IProducts;
  filterOptions: IFilterOptions;
  initialParams?: {
    category?: string | string[];
    brand?: string | string[];
    search?: string | string[];
  };
}

function countActiveFilters(
  filters: IFilterOptions,
  defaults: IFilterOptions,
): number {
  let count = 0;
  if (filters.categories.length > 0) count += 1;
  if (filters.brands.length > 0) count += 1;
  if (
    filters.minPrice !== defaults.minPrice ||
    filters.maxPrice !== defaults.maxPrice
  ) {
    count += 1;
  }
  if (filters?.minRating && filters?.minRating > 0) count += 1;
  if (filters?.minDiscount && filters?.minDiscount > 0) count += 1;
  if (filters.search && filters.search.trim()) count += 1;
  return count;
}

export default function ProductsListing({
  products,
  filterOptions,
  initialParams,
}: ProductsListingProps) {
  const defaultFilters = useMemo(
    () => createDefaultFilters(filterOptions),
    [filterOptions],
  );
  const [filters, setFilters] = useState<IFilterOptions>(() =>
    createFiltersFromParams(filterOptions, initialParams),
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(
    () => filterCatalogProducts(products, filters),
    [products, filters],
  );

  const activeFilterCount = countActiveFilters(filters, defaultFilters);

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="">
          <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
          <p className="text-sm text-gray-500 mt-1">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          </div>
         
          {activeFilterCount > 0 && (
        <div className="flex gap-2  items-center justify-between bg-primary-light/50 border border-primary/10 rounded-lg px-4 py-3">
          <p className="text-sm text-gray-700">
            {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} applied
          </p>
          <button
            onClick={clearFilters}
            className="text-sm font-medium text-primary hover:underline cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <input
            type="search"
            value={filters.search}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                search: event.target.value,
              }))
            }
            placeholder="Search products or brands..."
            className="w-full sm:w-72 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />

          <select
            value={filters.sort}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                sort: event.target.value as IFilterOptions["sort"],
              }))
            }
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="relevance">Sort: Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating: High to Low</option>
            <option value="discount">Discount: High to Low</option>
          </select>

          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden inline-flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-primary text-white text-xs rounded-full px-2 py-0.5">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

      
      </div>
      <div className="flex gap-8">
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-36 bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Filters</h2>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            <ProductFiltersPanel
              filters={filters}
              filterOptions={filterOptions}
              onChange={setFilters}
            />
          </div>
        </aside>
        <div className="flex-1 min-w-0">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  {...product}
                  className="w-full"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-gray-200 rounded-xl">
              <p className="text-lg font-medium text-gray-900">
                No products found
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Try adjusting your filters or search term.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-sm font-medium text-primary hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>


      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
            aria-label="Close filters"
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
              <h2 className="font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <ProductFiltersPanel
                filters={filters}
                filterOptions={filterOptions}
                onChange={setFilters}
              />
            </div>
            <div className="border-t border-gray-200 p-4 space-y-2">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-primary text-white py-3 rounded-lg font-medium"
              >
                Show {filteredProducts.length} products
              </button>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="w-full border border-gray-300 py-3 rounded-lg font-medium"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>
      )} 
    </div>
  );
}
