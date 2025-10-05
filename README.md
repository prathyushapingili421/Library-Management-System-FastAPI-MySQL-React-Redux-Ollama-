
# Library Management System (FastAPI + MySQL + React + Redux + Ollama)

A full-stack CRUD app to manage **Books** and **Authors** with an **LLM Chat** assistant.
Backend: **FastAPI** + **SQLAlchemy** + **MySQL**.
Frontend: **React** + **Redux Toolkit** + **Vite**.
LLM: **Ollama** (e.g., `llama3.1`).

---

## ✨ Features

* **Books**: list, create, update, delete
* **Authors**: list, create, update, delete (FK with books)
* **AI Chat**: conversations + messages stored in DB; replies via Ollama
* **Modern UI** with React Router and Redux Toolkit
* **Typed APIs** with Pydantic (v2)

---

## 🧱 Tech Stack

**Frontend:** React 18, Redux Toolkit, React Router, Vite, Axios
**Backend:** FastAPI, SQLAlchemy 2.x, Pydantic v2, httpx
**Database:** MySQL 8 (Docker)
**LLM:** Ollama (`ollama serve`, model `llama3.1`)

---

## 📂 Project Structure

```
library-management-system/
├── backend/
│   ├── app/
│   │   ├── database/connection.py
│   │   ├── models/models.py
│   │   ├── routers/{authors.py, books.py, ai.py}
│   │   ├── schemas/schemas.py
│   │   └── main.py
│   ├── .env                 
│   └── requirements.txt
├── docker-compose.yml       # MySQL service
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── .env                 
│   └── src/
│       ├── index.css
│       ├── main.jsx
│       ├── services/api.js
│       ├── redux/{store.js, booksSlice.js, authorsSlice.js, chatSlice.js}
│       └── pages/{Home.jsx, Home.css, CreateBook.jsx, UpdateBook.jsx, Chat.jsx, Chat.css}
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### 0) Prerequisites

* Node.js 18+ and npm
* Python 3.9+
* Docker & Docker Compose
* Ollama installed (`ollama serve`)

### 1) Start MySQL (Docker)

```bash
docker-compose up -d
# Default: service name library_mysql exposed on localhost:3306
```

### 2) Backend (FastAPI)

```bash
cd backend
python -m venv venv
# macOS/Linux:
source venv/bin/activate
# Windows:
# venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env     # edit if needed
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Open Swagger: **[http://localhost:8000/docs](http://localhost:8000/docs)**

> **CORS:** In `app/main.py`, ensure `allow_origins=["http://localhost:5173"]` during development.

### 3) Ollama (LLM)

```bash
# in another terminal
ollama serve
ollama pull llama3.1
```

### 4) Frontend (Vite)

```bash
cd frontend
npm install
cp .env.example .env   # VITE_API_BASE_URL=http://localhost:8000
npm run dev
```

Open UI: **[http://localhost:5173](http://localhost:5173)**

---

## 🌱 Sample Seed Data

```bash
# Create an author
curl -X POST http://localhost:8000/authors \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Jane","last_name":"Austen","email":"jane@example.com"}'

# Create a book
curl -X POST http://localhost:8000/books \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Pride and Prejudice",
    "isbn":"9780141439518",
    "publication_year":1813,
    "available_copies":3,
    "author_id":1
  }'
```

---

## 🧪 API Smoke Tests

Start a new chat:

```bash
curl -s -X POST http://localhost:8000/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"user_id":"user123","message":"Recommend a fantasy book"}'
```

Continue the same conversation:

```bash
# replace <id> with the returned conversation_id
curl -s -X POST http://localhost:8000/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"user_id":"user123","conversation_id":<id>,"message":"Something like Harry Potter?"}'
```

Get messages:

```bash
curl "http://localhost:8000/ai/messages/<id>"
```

---


## ⚙️ Environment Files

**`backend/.env.example`**

```
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=appuser
MYSQL_PASSWORD=app_password
MYSQL_DB=library_db
OLLAMA_API_URL=http://localhost:11434
```

**`frontend/.env.example`**

```
VITE_API_BASE_URL=http://localhost:8000
```

Copy each to `.env` and adjust to your machine if needed.

---

## 🧰 Troubleshooting

* **Blank frontend**
  Ensure `frontend/index.html` includes:

  ```html
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
  ```

  Start Vite from `frontend/` and hard refresh (Cmd/Ctrl+Shift+R).

* **CORS errors**
  In `app/main.py`, add `http://localhost:5173` in `allow_origins`.

* **`ModuleNotFoundError: app`**
  Run `uvicorn` **from `backend/`**:
  `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`

* **Ollama 503 / timeouts**
  `ollama serve` in one terminal and `ollama pull llama3.1` beforehand.



