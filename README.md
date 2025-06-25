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
├── db.ts        
```

## 🧪 Local Setup
Clone this repo

```bash
git clone https://github.com/Vtolin/ngodingv1
cd ngodingv1
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
-- Create the database
CREATE DATABASE restaurant_orders;
USE restaurant_orders;

-- Categories table
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu items table
CREATE TABLE menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id INT,
  image_url VARCHAR(500),
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Orders table
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(20),
  table_number INT,
  status ENUM('pending', 'preparing', 'ready', 'served', 'cancelled') DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Order items table (junction table)
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  menu_item_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  price DECIMAL(10,2) NOT NULL,
  notes TEXT,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Main Course', 'Primary dishes and entrees'),
('Pizza', 'Various pizza selections'),
('Pasta', 'Italian pasta dishes'),
('Beverages', 'Drinks and refreshments'),
('Desserts', 'Sweet treats and desserts');

-- Insert sample menu items
INSERT INTO menu_items (name, description, price, category_id, is_available) VALUES
('Spaghetti Carbonara', 'Classic creamy pasta with pancetta and egg', 45000.00, 3, TRUE),
('Margherita Pizza', 'Fresh basil, mozzarella & tomato sauce', 60000.00, 2, TRUE),
('Beef Rendang', 'Slow-cooked Indonesian beef curry', 85000.00, 1, TRUE),
('Nasi Goreng Special', 'Indonesian fried rice with chicken and prawns', 35000.00, 1, TRUE),
('Es Teh Manis', 'Sweet iced tea', 8000.00, 4, TRUE),
('Tiramisu', 'Classic Italian coffee-flavored dessert', 25000.00, 5, TRUE);
```

Run the app
```bash
npm run dev
```

##🙋‍♂️ About Me
I'm a junior developer learning full-stack development by building real-world projects from scratch. This project helped me understand how databases, backend logic, and frontend interactivity all come together in a real application.

##🧩 Future Improvements (stretch goals)
✅ Add order filtering (status tabs)

🔐 Use real authentication (NextAuth)

💾 Store admin sessions with cookies

📈 Add order statistics

💬 Live updates with WebSockets or polling

🌐 Deployment (Vercel + Railway or PlanetScale)

##📄 License
MIT — free to use, fork, and learn from.