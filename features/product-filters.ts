import type { IFilterOptions, IProducts } from "@/types/products";

export function createDefaultFilters(options: IFilterOptions): IFilterOptions {
  return {
    categories: [],
    brands: [],
    minPrice: options.minPrice,
    maxPrice: options.maxPrice,
    minRating: 0,
    minDiscount: 0,
    sort: "relevance",
    search: "",
  };
}

export function createFiltersFromParams(
  options: IFilterOptions,
  params?: {
    category?: string | string[];
    brand?: string | string[];
    search?: string | string[];
  },
): IFilterOptions {
  const filters = createDefaultFilters(options);

  const categorySlugs = normalizeParam(params?.category);
  const brandSlugs = normalizeParam(params?.brand);
  const search = Array.isArray(params?.search)
    ? params.search[0]
    : params?.search;

  if (categorySlugs.length > 0) {
    filters.categories = options.categories.filter((category) =>
      categorySlugs.includes(category.id),
    );
  }

  if (brandSlugs.length > 0) {
    filters.brands = options.brands.filter((brand) =>
      brandSlugs.includes(brand.id),
    );
  }

  if (search?.trim()) {
    filters.search = search.trim();
  }

  return filters;
}

function normalizeParam(value?: string | string[]) {
  if (!value) return [];
  const values = Array.isArray(value) ? value : value.split(",");
  return values.map((item) => item.trim().toLowerCase()).filter(Boolean);
}

export function filterCatalogProducts(
  products: IProducts,
  filters: IFilterOptions,
) {
  const search = filters?.search?.trim()?.toLowerCase();

  let result = products.filter((product) => {
    if (
      filters.categories.length > 0 &&
      !filters.categories.some((item) => item.id === product.category)
    ) {
      return false;
    }
    if (
      filters.brands.length > 0 &&
      !filters.brands.some((item) => item.id === product.brand.toLowerCase())
    ) {
      return false;
    }
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }
    if (
      (filters.minRating ?? 0) > 0 &&
      product.rating < (filters.minRating ?? 0)
    ) {
      return false;
    }
    if (
      search &&
      !product.name.toLowerCase().includes(search) &&
      !product.brand.toLowerCase().includes(search)
    ) {
      return false;
    }
    return true;
  });

  switch (filters.sort) {
    case "price-asc":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result = [...result].sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return result;
}
