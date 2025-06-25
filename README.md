# 🍽️ Full-Stack Restaurant Ordering System

This is a full-stack restaurant ordering system built with **Next.js (App Router)**, **MySQL**, and **Tailwind CSS**. It allows customers to browse a menu, add items to a cart, and place orders — while providing a simple admin panel to manage incoming orders.

> ⚠️ This project is for learning and portfolio purposes — not production-ready yet.

---

## 🚀 Features

### 👨‍🍳 Customer View
- View menu items (fetched from MySQL)
- Add items to cart
- View order summary
- Submit order with your name

### 🔐 Admin View
- Simple password-protected dashboard
- View live orders (`pending`)
- Mark orders as ✅ Served or ❌ Cancelled
- Automatically hides completed orders

### 🧠 Technical Highlights
- Built with **Next.js App Router** (`app/` folder structure)
- Uses **API Routes** for full backend logic (POST/GET/UPDATE)
- Pure **MySQL (raw queries)** for hands-on database learning
- **Enum-based order status** (`pending`, `served`, `cancelled`, etc.)
- Styled with **Tailwind CSS**
- Admin login state stored in-memory (no NextAuth yet)

---

## 🛠️ Tech Stack

| Frontend      | Backend        | Database |
|---------------|----------------|----------|
| Next.js 14    | Next.js API Routes | MySQL    |
| React / TSX   | Raw SQL Queries |          |
| Tailwind CSS  |                |          |

---

## 📂 Folder Structure

```bash
app/
├── menu/         # Customer menu
├── cart/         # Shopping cart view
├── checkout/     # (Optional) extra checkout screen
├── admin/        # Admin dashboard (protected)
├── api/          # All backend logic (menu, orders)
components/
├── Navbar.tsx
├── AdminLogin.tsx
├── AdminPanel.tsx
lib/
├── db.ts         # MySQL connection helper
```

## 🧪 Local Setup
Clone this repo

```bash
git clone https://github.com/yourusername/restaurant-ordering-app
cd restaurant-ordering-app
```

Install dependencies
```bash
npm install
```
Configure your .env
```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=restaurant
```
Set up MySQL tables
```bash
-- orders table
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending', 'preparing', 'ready', 'served', 'cancelled') NOT NULL DEFAULT 'pending'
);

-- order_items table
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  menu_item_id INT,
  quantity INT,
  price DECIMAL(10,2),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- menu_items table
CREATE TABLE menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  price DECIMAL(10,2)
);
```

Run the app
```bash
npm run dev
```