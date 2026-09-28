export const TLDS = ["shop", "space", "club", "store"] as const;
export type Tld = (typeof TLDS)[number];

export const SHOP_THREAD = "https://news.ycombinator.com/item?id=49833541";
export const SPACE_THREAD = "https://news.ycombinator.com/item?id=45359627";
