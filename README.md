# Mini Job Board – Backend

This is the **backend** for the Mini Job Board project.  
Built with **Express.js** and **MongoDB**, it provides REST APIs for jobs, applications and authentication.

---

## 🚀 Live API

Backend: **[https://mini-job-board-backend-production.up.railway.app/](https://mini-job-board-backend-production.up.railway.app/)**

---

## ✨ API Endpoints

### Jobs

- `GET /jobs` – Fetch all jobs
- `GET /jobs/:id` – Fetch job details
- `POST /jobs` – Create a job (requires JWT)

### Applications

- `POST /applications` – Submit a job application

### Auth

- `POST /register` – Register user
- `POST /login` – Login user

---

## 🛠 Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication

---

## 📦 Installation

### 1. Clone & Install

```bash
git clone https://github.com/SiamAnzir/mini-job-board-backend.git
cd mini-job-board-backend
npm install

### 2. Set Environment Variables

Create a .env file in the root directory and add:
PORT=5000
MONGO_URI=mongodb+srv://siamanzir:5YT4OsTzd6vozFgh@assignment8.b7ccebw.mongodb.net/mini_job_board?retryWrites=true&w=majority&appName=assignment8
JWT_SECRET=b95ef55438a208df577e19b343b8a2f1bc6073426500f8b18b448888c1d3c93da7f2bcce840c39ef593e6574375d37d5216097ae1d95632c161ebd1ddc977378

### 3. Start the development server:

npm run start

Open [http://localhost:5000](http://localhost:5000) with your browser to see the result.

```
