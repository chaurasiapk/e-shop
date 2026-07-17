import "server-only";
import { getBrands } from "@/services/brands.service";

export const getAllBrands = async () => {
  const brands = await getBrands();
  return {
    brands,
  };
};

export const getBrandsByCategory = async (category: string) => {
  const { brands } = await getAllBrands();

  const categoryBrands = brands.filter((brand) =>
    brand.productCategories.some((categoryItem) => categoryItem === category),
  );
  
  return { 
    categoryBrands
  }
};
