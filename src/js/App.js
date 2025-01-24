// target:
// 1- Create a category
// 2- Create product based on a category
// 3- Edit product
// 4- Remove Product
// 5- sort product
// 6- search product
// 7- save products in local storage
//class:
// Storage for handling application methods related to local storage
// Main and App for running the app
// UI (ProductView CategoryView)

import CategoryView from "./CategoryView.js"; //This is the instance, not the class
import ProductView from "./ProductView.js";

document.addEventListener("DOMContentLoaded", () => {
  //Set App
  CategoryView.setApp();
  //   console.log(CategoryView);
  // create categories options
  CategoryView.createCategoryList();

  ProductView.setApp();
  ProductView.createProductList(ProductView.products);
});
