import "server-only";
import { getProducts } from "@/services/product.service";
import { IProducts } from "@/types/products";
import { getCategories } from "./categories";
import { getAllBrands } from "./brands";
import { getProductsDetails as _getProductsDetails } from "@/services/product.service";

export const getAllProducts = async () => {
  const products = await getProducts();
  return { products };
};

export const getProductsByCategory = async (category: string) => {
  const { products } = await getAllProducts();

  const categoryProducts = products.filter(
    (product) => product.category === category,
  );

  return {
    categoryProducts,
  };
};

export async function getFilterOptions(products: IProducts) {
  const prices = products.map((product) => product.price);
  const { categories } = await getCategories();
  const { brands } = await getAllBrands();

  return {
    brands: brands.map((brand) => ({
      id: brand.slug,
      label: brand.name,
    })),
    categories: categories.map((category) => ({
      id: category.slug,
      label: category.name,
    })),
    minPrice: prices.length ? Math.min(...prices) : 0,
    maxPrice: prices.length ? Math.max(...prices) : 0,
  };
}

export const getProductsDetails = async (productId: string) => {
  const product = await _getProductsDetails(productId);
  return { product };
};
