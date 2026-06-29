# 🛍️ MERN Cosmetic Shop Website

A full-stack cosmetic e-commerce website built using **MongoDB, Express.js, React, and Node.js** with a responsive modern UI and product management features.

> ⚠️ This project is currently under active development. The backend is being built first; the frontend (React) will follow.

---

## 📌 Current Progress

This project is being built as part of a structured backend learning journey. So far, the **backend** includes:

- ✅ Express server setup with middleware (`app.use()`, `app.listen()`)
- ✅ MongoDB connection via Mongoose
- ✅ MVC architecture (Model – Controller – Route)
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Password security with `bcrypt` (hashing & comparing)
- ✅ JWT-based authentication (`jwt.sign()`, `jwt.verify()`)
- ✅ Role-based authorization (admin-only routes)
- ✅ Proper HTTP status codes (200, 201, 401, 404, 500)
- ✅ Environment variables via `.env`
- ✅ API testing with Postman
- ✅ Auto-restart in development using `nodemon`

---

## 🛠️ Tech Stack

| Layer        | Technology              |
|--------------|--------------------------|
| Database     | MongoDB (Mongoose)       |
| Backend      | Node.js, Express.js      |
| Auth         | JWT, bcrypt               |
| Frontend     | React *(coming soon)*    |
| Dev Tools    | Nodemon, Postman, Git    |

---

## 📁 Project Structure

```
backend/
├── controllers/      # Request handling logic
├── models/           # Mongoose schemas
├── routes/           # API endpoint definitions
├── middleware/        # Auth & validation middleware
├── .env               # Environment variables (not committed)
├── index.js           # App entry point
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- A [MongoDB Atlas](https://www.mongodb.com/atlas) connection string (or local MongoDB)

### 1. Clone the repository

```bash
git clone https://github.com/HMSSKHerath/mern-cosmetic-shop-website.git
cd mern-cosmetic-shop-website/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file inside the `backend` folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Run the server

For development (auto-restart on changes):

```bash
npm run dev
```

Or run it normally:

```bash
npm start
```

The server should now be running at `http://localhost:5000`.

### 5. Testing the API

Use [Postman](https://www.postman.com/) to test endpoints. For protected routes, add the JWT token to the request header:

```
Authorization: Bearer <your_token_here>
```

---

## 🗺️ Roadmap

- [ ] Input validation
- [ ] Model relationships (`populate()`)
- [ ] Centralized error-handling middleware
- [ ] React frontend
- [ ] Deployment

---

## 👤 Author

**H.M.S.S.K. Herath**
Built as part of MERN stack learning and internship preparation.

---

## 📄 License

This project is **proprietary**. All rights reserved.
See [LICENSE](./LICENSE) for details — copying, modifying, or distributing this code without permission is not allowed.