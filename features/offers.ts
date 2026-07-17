import "server-only";
import {
  getOffers as _getOffers,
  getOffersByCategory as _getOffersByCategory,
} from "@/services/offers.service";

export const getOffersByCategory = async (categorySlug: string) => {
  const offers = await _getOffersByCategory(categorySlug);
  return { offers };
};

export const getOffers = async () => {
  const offers = await _getOffers();
  return { offers };
};
