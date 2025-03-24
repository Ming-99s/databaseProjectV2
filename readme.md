# Quiz App Database Project

This project is a database project for a quiz application built using **Node.js**, **Express**, and **MySQL**. It provides API endpoints for **user authentication, quiz questions management, and category handling**.

---
## 🚀 Features
- **User Authentication** (Signup & Login)
- **Fetch Quiz Categories**
- **Select Quiz Type Questions**
- **Retrieve Quiz Questions with Filters**

---
## 📌 Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [MySQL](https://www.mysql.com/) Database
- [Git](https://git-scm.com/)

---
## 🔧 Installation Guide  

### 1️⃣ Clone the Repository
```sh
git clone <repository-url>
cd quiz-app-backend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up the MySQL Database
- Open MySQL and execute the SQL script:
  ```sql
  SOURCE script/script.sql;
  ```
- Update **backend/index.js** if your database credentials are different:
  ```js
  const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Change if necessary
    password: "1234", // Change if necessary
    database: "quiz_app",
  });
  ```

---
## ▶ Running the Server
Start the backend server:
```sh
node backend/index.js
```
The server will start on **http://localhost:8800**.

---
## 🔥 API Endpoints

### 🧑‍💻 User Authentication
- `GET /users` - Fetch all users
- `POST /signup` - Register a new user
- `POST /login` - Authenticate a user

### 🎯 Quiz Management
- `GET /categories` - Get all quiz categories
- `POST /add-quiz` - Add a new quiz question
- `GET /question` - Fetch quiz questions with filters

---
## 🛠 Notes
- Ensure **MySQL is running** before starting the server.
- Modify **database credentials** in `index.js` if needed.
- Use **Postman** or a similar tool to test API endpoints.

---
## 📜 License
This project is for educational purposes.

---
### 💡 Need Help?
If you face any issues, feel free to open an **issue** or reach out to the project maintainers!

