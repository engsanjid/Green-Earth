# 🌿 Green Earth — Plant a Tree Campaign

A responsive web application built with vanilla HTML, CSS, and JavaScript that enables users to explore trees by category, view detailed plant information, and contribute to a reforestation campaign.

---

## 🚀 Live Demo

> `aquamarine-cactus-845014.netlify.app`

---

## 📡 API Reference

Base URL: `https://openapi.programming-hero.com/api`

| Endpoint | Description |
|---|---|
| `GET /plants` | Fetch all plants |
| `GET /categories` | Fetch all plant categories |
| `GET /category/:id` | Fetch plants by category ID |
| `GET /plant/:id` | Fetch detailed info for a specific plant |

**Examples:**
```
GET https://openapi.programming-hero.com/api/category/1
GET https://openapi.programming-hero.com/api/plant/1
```

---

## ✅ Core Features

### Layout & UI
- **Navbar** — Logo/name on the left, navigation links in the center, and a "Plant a Tree" CTA button on the right
- **Banner** — Full-width background image with a title, subtitle, and centered call-to-action button
- **About Section** — Section heading with image on the left and descriptive text on the right
- **Impact Section** — Three statistics cards showcasing campaign milestones
- **Plant a Tree Form** — Input fields for Name, Email, and Number of Trees with a submission button
- **Footer** — Copyright information and site credits

### Functionality
- **Dynamic Category Loading** — Tree categories are fetched from the API and rendered in the sidebar
- **Category Filtering** — Clicking a category loads the corresponding trees in a 3-column card grid
- **Tree Cards** — Each card displays: Plant Image, Name, Short Description, Category, Price, and an "Add to Cart" button
- **Detail Modal** — Clicking a tree name opens a modal with the full plant details

### Challenges Implemented
- **Add to Cart** — Trees are added to a cart list showing the tree name
- **Total Price Calculation** — Cart dynamically calculates and displays the total cost
- **Remove from Cart** — Clicking ❌ removes an item and updates the total price accordingly
- **Loading Spinner** — A spinner is shown while API data is being fetched
- **Active Category Highlight** — The currently selected category button is visually highlighted

### Responsiveness
- Fully mobile-responsive layout across all screen sizes

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and markup |
| CSS3 / Tailwind CSS / DaisyUI | Styling and responsive design |
| JavaScript (Vanilla) | Logic, DOM manipulation, API calls |

> ⚠️ No JavaScript frameworks were used. This project is built with vanilla JS only.

---

## 📁 Project Structure

```
green-earth/
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 💡 JavaScript Concepts Used

### 1. `var`, `let`, and `const`

| Keyword | Scope | Re-declarable | Re-assignable |
|---|---|---|---|
| `var` | Function-scoped | ✅ Yes | ✅ Yes |
| `let` | Block-scoped | ❌ No | ✅ Yes |
| `const` | Block-scoped | ❌ No | ❌ No |

`var` is the old way of declaring variables and can lead to unexpected behavior due to hoisting. `let` and `const` were introduced in ES6 and are block-scoped, making them safer and more predictable. Use `const` by default; switch to `let` only when reassignment is needed.

---

### 2. `map()`, `forEach()`, and `filter()`

| Method | Returns | Use Case |
|---|---|---|
| `map()` | New transformed array | Transform each element |
| `forEach()` | `undefined` | Side effects (e.g., DOM updates) |
| `filter()` | New filtered array | Select elements matching a condition |

```js
const prices = [10, 20, 30];

// map — double each price
const doubled = prices.map(p => p * 2); // [20, 40, 60]

// filter — only prices above 15
const expensive = prices.filter(p => p > 15); // [20, 30]

// forEach — log each price
prices.forEach(p => console.log(p)); // no return value
```

---

### 3. Arrow Functions (ES6)

Arrow functions provide a shorter syntax for writing functions. They do not have their own `this` — they inherit it from the surrounding lexical scope, which makes them ideal for callbacks.

```js
// Traditional function
function greet(name) {
  return `Hello, ${name}!`;
}

// Arrow function equivalent
const greet = (name) => `Hello, ${name}!`;
```

---

### 4. Destructuring Assignment (ES6)

Destructuring allows unpacking values from arrays or objects into individual variables in a concise syntax.

```js
// Array destructuring
const [first, second] = [1, 2];

// Object destructuring
const { name, price } = plant;

// With default values
const { category = "Unknown" } = plant;
```

---

### 5. Template Literals (ES6)

Template literals use backticks (`` ` ``) instead of quotes and support embedded expressions via `${}`. They also preserve line breaks natively.

```js
const name = "Oak";
const price = 25;

// Old string concatenation
const msg1 = "Plant: " + name + ", Price: $" + price;

// Template literal
const msg2 = `Plant: ${name}, Price: $${price}`;
```

**Key advantages over string concatenation:**
- No need for `+` operators
- Supports multi-line strings naturally
- Allows any JavaScript expression inside `${}`

---


## 👤 Author

> Md Sanjid Islam
> 01745532902

---

