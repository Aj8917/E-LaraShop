# 🛍️ E-larashop

E-larashop is a full-stack e-commerce web application built with **Laravel** (PHP) for the backend and **React** for the frontend. 
It provides a modern shopping experience with API-driven architecture and a responsive UI.

---

## 🚀 Tech Stack

### Backend (Laravel)
- Laravel 10+
- MySQL 
- Sanctum (for API authentication)
- Eloquent ORM
- RESTful API

### Frontend (React)
- React 18+
- Axios (for API calls)
- React Router
- Tailwind CSS / Bootstrap
- Redux

 
---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Aj8917/E-larashop.git
cd E-larashop

##Backend Setup (Laravel)
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

## Frontend Setup (React)
npm install
npm run watch



