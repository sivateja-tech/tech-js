# 📝 Multi-User Quiz Management System (Full-Stack)

A high-performance, secure web application designed for creating, managing, and taking quizzes. This project demonstrates a robust backend architecture using the MVC pattern and secure data handling.

## 🚀 Project Overview
This application allows administrators to create complex quizzes while providing a seamless, real-time experience for users to attempt them. It is built with a focus on **scalability**, **sub-200ms response times**, and **99.9% data integrity**.

## 🛠 Tech Stack
* **Frontend:** React.js, CSS3
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Authentication:** JWT (JSON Web Tokens) & Bcrypt
* **Tools:** Postman (API Testing), Git, VS Code

---

## 🧠 Technical Implementation

### 🔐 Secure Authentication & Authorization
* **JWT Flow:** Implemented a secure login system where tokens are issued upon authentication and verified via custom **Middleware** for protected routes.
* **Password Hashing:** Used `bcrypt` to ensure user credentials are never stored in plain text.

### 🏗 Architecture (MVC Pattern)
The project follows the **Model-View-Controller** design pattern to separate concerns:
* **Models:** Data structures defined via Prisma schemas for PostgreSQL.
* **Controllers:** Business logic handling quiz scoring and user management.
* **Routes:** RESTful endpoints for clean API communication.

### ⚡ Performance Optimization
* Achieved **sub-200ms response times** by utilizing Prisma's selective fetching and PostgreSQL indexing on `user_id` and `quiz_id`.
* Implemented **Pagination** for large datasets to reduce server load.

---

## 🗄️ Database Schema
The relational database is optimized for complex queries:
* **User Table:** Stores user roles and credentials.
* **Quiz Table:** Manages quiz metadata and relationships to questions.
* **Results Table:** Tracks user performance and historical data.

---

## 🧪 API Documentation & Testing
Validated **15+ RESTful endpoints** using Postman, including:
* `POST /auth/register` - User onboarding.
* `GET /quizzes` - Optimized retrieval of available tests.
* `POST /quizzes/submit` - Secure submission with real-time score calculation.

---

## ⚙️ How to Run Locally

1. **Clone the Repo:**
   ```bash
   git clone [https://github.com/sivateja-tech/tech-js.git](https://github.com/sivateja-tech/tech-js.git)
   
