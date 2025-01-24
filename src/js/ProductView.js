const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const addNewProductBtn = document.querySelector("#add-new-product");
const categoryList = document.querySelector("#product-category");
const productList = document.querySelector("#products-list");

const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-products");

import Storage from "./Storage.js";

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    this.products = [];
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.sortProducts(e));
  }

  setApp() {
    this.products = Storage.getAllProducts();
  }

  addNewProduct(e) {
    e.preventDefault();
    const title = productTitle.value.trim();
    const quantity = productQuantity.value.trim();
    const category = categoryList.value;
    if (!title || !quantity || !category) return;

    Storage.saveNewProduct({ title, category, quantity });
    this.products = Storage.getAllProducts();
    //Show in DOM
    this.createProductList();

    productTitle.value = "";
    productQuantity.value = "";
  }

  createProductList(products = this.products) {
    let result = "";

    products.forEach((p) => {
      const selectedCategory = Storage.getAllCategories().find((c) => {
        return c.id == p.category;
      });

      result += `<div class="flex items-center justify-between mb-4">
        <span class="text-slate-400">${p.title}</span>
        <div class="flex items-center gap-x-3">
          <span class="text-slate-400 text-sm">${new Date().toLocaleDateString(
            "en-US"
          )}</span>
          <span
            class="block px-3 py-0.5 text-slate-400 border border-slate-400 text-sm rounded-2xl"
            >${selectedCategory.title}</span
          >
          <span
            class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 border-2 border-slate-300 text-slate-300"
            >${p.quantity}</span
          >
          <button
            class="border px-2 py-0.5 rounded-2xl border-red-400 text-sm text-red-400 delete-product" data-product-id=${
              p.id
            }
          >
            Delete
          </button>
        </div>
      </div>`;
    });

    productList.innerHTML = result;

    const deleteBtns = [...document.querySelectorAll(".delete-product")];
    deleteBtns.forEach((item) => {
      item.addEventListener("click", (e) => this.deleteProduct(e));
    });

    const numberOfProducts = document.querySelector("#number-of-products");
    numberOfProducts.textContent = products.length;
  }

  searchProducts(e) {
    const value = e.target.value.trim().toLowerCase();
    const filteredProducts = this.products.filter((p) =>
      p.title.toLowerCase().includes(value)
    );
    // console.log(filteredProducts);
    this.createProductList(filteredProducts);
  }

  sortProducts(e) {
    const value = e.target.value;
    //default => nwest
    this.products = Storage.getAllProducts(value);
    this.createProductList(this.products);
  }

  deleteProduct(e) {
    const productId = e.target.dataset.productId;
    Storage.deleteProduct(productId);
    this.products = Storage.getAllProducts();
    this.createProductList(this.products);
  }
}

export default new ProductView();
