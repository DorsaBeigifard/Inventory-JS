import Storage from "./Storage.js";

const titleInput = document.querySelector("#category-title");
const descriptionInput = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");

const toggleCategoryBtn = document.querySelector("#toggle-add-category");

const categoryWrapper = document.querySelector("#category-wrapper");

const cancleAddNewCategory = document.querySelector("#cancle-new-category");

class CategoryView {
  constructor() {
    // Attach event listener for the add button
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    toggleCategoryBtn.addEventListener("click", (e) =>
      this.toggleAddNewCategory(e)
    );
    cancleAddNewCategory.addEventListener("click", (e) =>
      this.cancleAddNewCategory(e)
    );
    this.categories = [];
  }

  setApp() {
    //to get categories when refreshed in the property
    this.categories = Storage.getAllCategories();
  }

  addNewCategory(e) {
    e.preventDefault();
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    if (!title || !description) return; // Do nothing if fields are empty

    // Save new category to storage
    Storage.saveNewCategory({ title, description });

    // update the DOM
    this.categories = Storage.getAllCategories();
    this.createCategoryList();

    //refresh title and description
    titleInput.value = "";
    descriptionInput.value = "";
  }

  createCategoryList() {
    let result = `<option value="default" selected disabled>Select a category</option>`;
    this.categories.forEach((c) => {
      result += `<option class="bg-slate-500 text-slate-400" value="${c.id}">${c.title}</option>`;
    });

    const categoryList = document.querySelector("#product-category");
    categoryList.innerHTML = result;
  }

  toggleAddNewCategory(e) {
    categoryWrapper.classList.remove("hidden");
    toggleCategoryBtn.classList.add("hidden");
  }

  cancleAddNewCategory(e) {
    categoryWrapper.classList.add("hidden");
    toggleCategoryBtn.classList.remove("hidden");
  }
}

// Instantiate the class if needed
export default new CategoryView();
