const categories = [
  {
    id: 1,
    title: "Mug",
    description: "Mugs, with handles or without.",
    createdAt: "2021-01-23T09:07:19.838Z",
  },
  {
    id: 2,
    title: "Plate",
    description: "Plates for dining and serving purposes.",
    createdAt: "2022-01-23T09:07:19.838Z",
  },
  {
    id: 3,
    title: "Bowl",
    description: "Bowls for serving soups, salads, or snacks.",
    createdAt: "2023-01-23T09:07:19.838Z",
  },
  {
    id: 4,
    title: "Decor",
    description: "Decorative items for enhancing interior spaces. e.g: Watches",
    createdAt: "2025-01-23T09:07:19.838Z",
  },
  {
    id: 5,
    title: "Vase",
    description: "Vases for holding flowers or as standalone decor.",
    createdAt: "2024-01-23T09:07:19.838Z",
  },
];

const products = [
  {
    id: 1,
    title: "Eleanor Mug",
    category: "Mug",
    price: 67.99,
    imageUrl: "assets/images/products/cup.jpeg",
    isNew: true,
    createdAt: "2021-07-15T08:23:45.123Z",
    quantity: 12,
  },
  {
    id: 2,
    title: "Timeless Harmony",
    category: "Decore",
    price: 100.99,
    imageUrl: "assets/images/products/green clock.jpeg",
    isNew: true,
    createdAt: "2022-04-02T10:12:30.456Z",
    quantity: 5,
  },
  {
    id: 3,
    title: "Crescent Comfort",
    category: "Mug",
    price: 89.5,
    imageUrl: "assets/images/products/mug to color.avif",
    isNew: false,
    createdAt: "2023-11-01T14:18:22.789Z",
    quantity: 8,
  },
  {
    id: 4,
    title: "Aurora Sip",
    category: "Mug",
    price: 45.99,
    imageUrl: "assets/images/products/mug.jpeg",
    isNew: false,
    createdAt: "2020-12-10T09:45:10.321Z",
    quantity: 15,
  },
  {
    id: 5,
    title: "Orchid Charm",
    category: "Plate",
    price: 65.99,
    imageUrl: "assets/images/products/plate 2colors.jpeg",
    isNew: false,
    createdAt: "2021-09-25T17:29:00.654Z",
    quantity: 7,
  },
  {
    id: 6,
    title: "Bag Vessel",
    category: "Vase",
    price: 65.99,
    imageUrl: "assets/images/products/pot.jpeg",
    isNew: false,
    createdAt: "2022-03-13T11:05:33.987Z",
    quantity: 10,
  },
  {
    id: 7,
    title: "Pinky Plate",
    category: "Plate",
    price: 59.99,
    imageUrl: "assets/images/products/plate pink.jpeg",
    isNew: false,
    createdAt: "2021-11-20T13:22:11.234Z",
    quantity: 6,
  },
  {
    id: 8,
    title: "Line Nest",
    category: "Bowl",
    price: 80.99,
    imageUrl: "assets/images/products/Bowl.jpeg",
    isNew: false,
    createdAt: "2023-06-09T15:35:47.765Z",
    quantity: 9,
  },
  {
    id: 9,
    title: "Echo Dial",
    category: "Decor",
    price: 205.5,
    imageUrl: "assets/images/products/red clock.jpeg",
    isNew: false,
    createdAt: "2024-01-04T16:55:01.432Z",
    quantity: 3,
  },
];

export default class Storage {
  static getAllCategories() {
    const savedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];
    //sort categories , desc (newst first)
    const sortedCategories = savedCategories.sort((a, b) =>
      new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
    );
    return sortedCategories;
  }

  static saveNewCategory(categoryToSave) {
    const savedCategories = this.getAllCategories();

    const existedItem = savedCategories.find((c) => c.id === categoryToSave.id);
    if (existedItem) {
      //edit
      existedItem.title = categoryToSave.title;
      existedItem.description = categoryToSave.description;
    } else {
      //new
      const newCategory = {
        ...categoryToSave,
        id: new Date().getTime(),
        createdAt: new Date().toISOString(),
      };
      savedCategories.push(newCategory);
    }
    localStorage.setItem("categories", JSON.stringify(savedCategories));
  }

  static getAllProducts(sort = "newest") {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    //sort categories , desc (newst first)
    const sortedProducts = savedProducts.sort((a, b) => {
      if (sort === "newest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sort === "oldest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    });
    return sortedProducts;
  }

  static saveNewProduct(productToSave) {
    const savedProducts = this.getAllProducts();

    const existedItem = savedProducts.find((c) => c.id === productToSave.id);
    if (existedItem) {
      //edit
      existedItem.title = productToSave.title;
      existedItem.category = productToSave.category;
      existedItem.quantity = productToSave.quantity;
    } else {
      //new
      const newProduct = {
        ...productToSave,
        id: new Date().getTime(),
        createdAt: new Date().toISOString(),
      };
      savedProducts.push(newProduct);
    }
    localStorage.setItem("products", JSON.stringify(savedProducts));
  }

  static deleteProduct(id) {
    const savedProdocuts = Storage.getAllProducts();
    const filteredProducts = savedProdocuts.filter(
      (p) => p.id !== parseInt(id)
    );
    localStorage.setItem("products", JSON.stringify(filteredProducts));
  }
}
