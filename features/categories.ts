import "server-only";
import { getCategories as _getCategories } from "@/services/categories.service";

export const getCategories = async () => {
  const categories = await _getCategories();
  return {
    categories,
  };
};
