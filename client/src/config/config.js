// export const registerFormControl = [
//   {
//     name: "username",
//     label: "User Name",
//     placeholder: "Enter your username",
//     componentType: "input",
//     type: "text",
//   },
//   {
//     name: "email",
//     label: "Email",
//     placeholder: "Enter your email",
//     componentType: "input",
//     type: "email",
//   },
//   {
//     name: "password",
//     label: "Password",
//     placeholder: "Enter your password",
//     componentType: "input",
//     type: "password",
//   },
// ];

export const addProductFormElement = [
  {
    label: "Title",
    name: "title",
    componentType: "text",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter your product description",
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Regular price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter regular price here",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price here",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock here",
  },
];
