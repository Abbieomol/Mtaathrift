# Mtaa Market (MtaaThrifting)

A full-stack e-commerce platform that connects vendors and customers for buying and selling thrifted items locally. Built with Django REST Framework and React + TypeScript. It is a local thrifting marketplace where customers can browse, search, and purchase second-hand items from vendors in their area. The platform supports two user roles — **customers** and **vendors** — each with their own dashboard and features.

---

## Features

### Customer

- Browse and search products
- Add items to cart and checkout
- Save items to wishlist
- View order history
- Receive notifications
- Customize app settings (theme, language, layout)

### Vendor

- Dashboard with product and sales overview
- Add, edit, and manage product listings
- Receive order and messaging notifications
- Customize app settings

### General

- JWT-based authentication (login, signup, token refresh)
- Role-based protected routes
- Multi-language support (English, French, Spanish, Swahili, Arabic)
- Dark / Light / Multicolor themes
- Responsive design with mobile sidebar

---

## Tech Stack

### Backend

- Python 3
- Django & Django REST Framework
- SimpleJWT for authentication
- SQLite (development)

### Frontend

- React 18 + TypeScript
- Vite
- React Router v6
- Axios
- React Icons / Lucide React
- React Toastify

---

## Project Structure

Mtaathrift/
├── backend/
│   ├── accounts/        # User auth and profiles
│   ├── products/        # Product listings
│   ├── cart/            # Cart management
│   ├── wishlist/        # Wishlist management
│   ├── orders/          # Order processing
│   ├── notifications/   # Notification system
│   ├── follow/          # Vendor following
│   └── backend/         # Django project settings
│
└── mtaathriftfront/
    ├── src/
    │   ├── components/  # Navbar, Sidebar
    │   ├── pages/       # Home, Customer, Vendor, Cart, Wishlist, etc.
    │   ├── routes/      # ProtectedRoute
    │   ├── services/    # API calls (api.ts)
    │   ├── context/     # LanguageContext
    │   ├── types/       # TypeScript types
    │   └── App.tsx
    └── index.html

---

## Backend Setup (Django)

**Clone the repo**
git clone <https://github.com/Abbieomol/Mtaathrift.git>
cd backend

**Create and activate a virtual environment**
python -m venv .venv

Windows:
.venv\Scripts\activate

Mac/Linux:
source .venv/bin/activate

**Install dependencies**
pip install -r requirements.txt

**Run migrations**
python manage.py makemigrations
python manage.py migrate

**Create superuser**
python manage.py createsuperuser

**Start the development server**
python manage.py runserver

Backend will be running at: <http://127.0.0.1:8000>

---

## Frontend Setup (React)

**Navigate to the frontend folder**
cd mtaathriftfront

**Install dependencies**
npm install or yarn

**Start the development server**
npm run dev or yarn dev

Frontend will be running at: <http://localhost:5173>

---

## Authentication

POST /auth/signup/
POST /auth/login/

Response:
{
  "user": {
    "id": 1,
    "username": "user",
    "email": "<user@example.com>",
    "role": "customer"
  },
  "token": "your_jwt_token"
}

---

## Common Errors

Invalid login → check credentials  
400 error → check request body  
Token error → clear localStorage  

---

## Author

Leila Omol
