// export const color = [
//   "Trắng",
//   "Đen",
//   "Đỏ",
//   "marun",
//   "Being",
//   "Pink",
//   "Green",
//   "Yellow",
// ];

export const filters = [
  {
    id: "color",
    name: "Màu",
    options: [
      { value: "white", label: "Trắng" },
      { value: "black", label: "Đen" },
      { value: "blue", label: "Xanh dương" },
      { value: "red", label: "Đỏ" },
      { value: "green", label: "Xanh lá" },
      { value: "purple", label: "Tím" },
      { value: "yellow", label: "Vàng" },
    ],
  },

];

export const singleFilter = [
  {
    id: "price",
    name: "Giá",
    options: [
      { value: "159-399", label: "0 - 100.000" },
      { value: "399-999", label: "100.000 - 500.000" },
      { value: "999-1999", label: "500.000 - 1000.000" },
      { value: "1999-2999", label: "1000.000 - 5.000.000" },
      { value: "3999-4999", label: "5000.000 - 10.000.000" },
    ],
  },
  {
    id: "disccout",
    name: "Giảm giá",
    options: [
      { value: "10", label: "10% trở lên" },
      { value: "30", label: "30% trở lên" },
      { value: "50", label: "50% trở lên" },
      { value: "70", label: "70% trở lên" },
      { value: "90", label: "90% trở lên" },
    ],
  },
  {
    id: "stock",
    name: "Trạng thái sản phẩm",
    options: [
      { value: "in_stock", label: "Còn hàng" },
      { value: "out_of_stock", label: "Hết hàng" },
    ],
  },
];

export const sortOptions = [
  { name: "Price: Low to High", query: "price_low", current: false },
  { name: "Price: High to Low", query: "price_high", current: false },
];
