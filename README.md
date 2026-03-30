# 🚀 Mtaa Market (MtaaThrifting)

A full-stack e-commerce platform that connects vendors and customers for buying and selling thrifted items locally.

---

## 📌 Features

- User authentication (Signup/Login with JWT)
- Role-based access (Customer & Vendor)
- Product listing and browsing
- Cart and wishlist functionality
- Vendor product posting
- Notifications system (in progress)

---

## 🛠️ Tech Stack

### Frontend

- React (TypeScript)
- React Router
- Axios

### Backend

- Django
- Django REST Framework
- Simple JWT Authentication
- SQLite (development)

---

## 📁 Project Structure

Mtaathrifting/
│
├── backend/
│   ├── accounts/
│   ├── authapp/
│   ├── products/
│   ├── cart/
│   ├── wishlist/
│   └── manage.py
│
├── mtaathriftfront/
│   ├── src/
│   ├── pages/
│   ├── services/
│   └── App.tsx

---

## ⚙️ Backend Setup (Django)

cd backend
python -m venv .venv

Windows:
.venv\Scripts\activate

Mac/Linux:
source .venv/bin/activate

pip install django djangorestframework djangorestframework-simplejwt pillow

python manage.py makemigrations
python manage.py migrate

python manage.py createsuperuser

python manage.py runserver

Backend: <http://127.0.0.1:8000>

---

## ⚙️ Frontend Setup (React)

cd mtaathriftfront
npm install
npm run dev

Frontend: <http://localhost:5173>

---

## 🔐 Authentication

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

## ⚠️ Common Errors

Invalid login → check credentials  
400 error → check request body  
Token error → clear localStorage  

---

## 👩‍💻 Author

Leila Omol
