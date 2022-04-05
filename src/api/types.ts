// export type Brand = {
//   id: number | string;
//   name: string;
//   slug: string;
//   [key: string]: unknown;
// };

export type Product = {
  id: number | string;
  name: string;
  img: string;
  price: number;
  [key: string]: unknown;
};

export type Category = {
  id: number | string;
  name: string;
  img?: string;
  products?: Product[];
};
