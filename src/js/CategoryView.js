// title, description => get it in an obj => give it to save category
import Storage from "./storage";

const title = document.querySelector("#category-title");
const description = document.querySelector("#category-discription");
const addNewCategoryBtn = document.querySelector("#add-new-category");

export default class CategoryView {
  constructor() {
    //This ensures that whenever you create a new instance of CategoryView, the button will be ready to trigger the addNewCategory method.
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    this.categories = [];
  }
  addNewCategory(e) {
    // to not refresh the page when clicking the btn
    e.preventDefault();
    const title = title.value;
    const description = description.value;
    if (!title || !description) return; //If each was empty don't continue the program
    //save to local storage
    Storage.saveNewCategory({ title, description });
    this.categories = Storage.getAllCategories();

    //Update select category option in DOM
  }
}
