import { ProductPrice } from "@/types";

/**
 * Formats a price object or number into a human-readable string.
 * Currently defaults to PKR for Quill.
 */
export const formatPrice = (price: ProductPrice | number | undefined): string => {
    if (price === undefined) return "N/A";

    const amount = typeof price === "number" ? price : price.amount;
    const currency = typeof price === "object" ? price.currency : "PKR";

    return `${currency} ${amount.toLocaleString()}`;
};

/**
 * Gets the numeric value of a price, handling both object and number types.
 */
export const getNumericPrice = (price: ProductPrice | number | undefined): number => {
    if (price === undefined) return 0;
    return typeof price === "number" ? price : price.amount;
};
