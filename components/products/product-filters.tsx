"use client";

import { IFilterOptions } from "@/types/products";
import { formatPrice } from "@/utils/helper";

interface ProductFiltersPanelProps {
  filters: IFilterOptions;
  filterOptions: IFilterOptions;
  onChange: (filters: IFilterOptions) => void;
}

// function toggleValue(values: { id?: string , _id?: string , slug: string , label: string }[], value: string) {
//   return values.some((v1)=>v1.id && (v1.id === value) || v1._id && (v1.slug === value))
//     ? values.filter((item) => item.id && item.id !== value || item._id && value)
//     : [...values, value];
// }

type ToggleItem = {
  id?: string;
  _id?: string;
};

const toggleValue = <T extends ToggleItem>(values: T[], value: T): T[] => {
  const key = value.id ?? value._id;

  const exists = values.some((item) => (item.id ?? item._id) === key);

  return exists
    ? values.filter((item) => (item.id ?? item._id) !== key)
    : [...values, value];
};

export default function ProductFiltersPanel({
  filters,
  filterOptions,
  onChange,
}: ProductFiltersPanelProps) {
  const update = (patch: Partial<IFilterOptions>) => {
    onChange({ ...filters, ...patch });
  };

  return (
    <div className="space-y-6">
      <FilterSection title="Category">
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {filterOptions.categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.categories.some(
                  (item) => item.id === category.id,
                )}
                onChange={() =>
                  update({
                    categories: toggleValue(filters.categories, category),
                  })
                }
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              {category.label}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Brand">
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {filterOptions.brands.map((brand) => (
            <label
              key={brand.id}
              className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.brands.some((item) => item.id === brand.id)}
                onChange={() =>
                  update({
                    brands: toggleValue(filters.brands, brand),
                  })
                }
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              {brand.label}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{formatPrice(filters.minPrice)}</span>
            <span>{formatPrice(filters.maxPrice)}</span>
          </div>
          <input
            type="range"
            min={filterOptions.minPrice}
            max={filterOptions.maxPrice}
            step={1000}
            value={filters.minPrice}
            onChange={(event) =>
              update({
                minPrice: Math.min(
                  Number(event.target.value),
                  filters.maxPrice,
                ),
              })
            }
            className="w-full accent-primary"
          />
          <input
            type="range"
            min={filterOptions.minPrice}
            max={filterOptions.maxPrice}
            step={1000}
            value={filters.maxPrice}
            onChange={(event) =>
              update({
                maxPrice: Math.max(
                  Number(event.target.value),
                  filters.minPrice,
                ),
              })
            }
            className="w-full accent-primary"
          />
        </div>
      </FilterSection>

      <FilterSection title="Customer Rating">
        <div className="space-y-2">
          {[4.5, 4, 3.5, 3].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
            >
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === rating}
                onChange={() => update({ minRating: rating })}
                className="border-gray-300 text-primary focus:ring-primary"
              />
              {rating}+ Stars
            </label>
          ))}
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === 0}
              onChange={() => update({ minRating: 0 })}
              className="border-gray-300 text-primary focus:ring-primary"
            />
            All ratings
          </label>
        </div>
      </FilterSection>

      <FilterSection title="Discount">
        <div className="space-y-2">
          {[20, 10, 5].map((discount) => (
            <label
              key={discount}
              className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
            >
              <input
                type="radio"
                name="discount"
                checked={filters.minDiscount === discount}
                onChange={() => update({ minDiscount: discount })}
                className="border-gray-300 text-primary focus:ring-primary"
              />
              {discount}% or more
            </label>
          ))}
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="radio"
              name="discount"
              checked={filters.minDiscount === 0}
              onChange={() => update({ minDiscount: 0 })}
              className="border-gray-300 text-primary focus:ring-primary"
            />
            Any discount
          </label>
        </div>
      </FilterSection>
    </div>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
      {children}
    </div>
  );
}
