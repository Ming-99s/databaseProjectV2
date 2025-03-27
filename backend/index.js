import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rithyreach@6780",
  database: "quiz_app",
  authPlugins: {
    mysql_native_password: () => require('mysql2/auth/mysql_native_password')
  }
});

app.use(express.json());
app.use(cors());

// Endpoint to fetch all users
app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data);
  });
});

// Endpoint to register a new user
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  // Check if the email already exists
  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length > 0) return res.status(400).json({ error: 'Email already exists' });

    // Check if the username already exists
    const checkUsernameQuery = "SELECT * FROM users WHERE username = ?";
    db.query(checkUsernameQuery, [username], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.length > 0) return res.status(400).json({ error: 'Username already exists' });

      // Insert the user into the database
      const insertUserQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
      db.query(insertUserQuery, [username, email, password], (err, data) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({
          message: "User has been registered successfully!",
          userId: data.insertId,
        });
      });
    });
  });
});


app.post("/login", (req, res) => {
  const { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).json({ error: "Please provide both username and password" });
  }

  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [user], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const userData = result[0];

    // Make sure password matches correctly
    if (password !== userData.password) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    return res.status(200).json({
      message: "Login successful",
      role: userData.role,
    });
  });
});



app.get('/categories', (req, res) => {
  const sql = "SELECT id, name FROM categories";
  db.query(sql, (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
  });
});

// Endpoint to add a quiz question
app.post("/add-quiz", (req, res) => {
  const { type, difficulty, category_id, question, correct_answer, incorrect_answers } = req.body;

  const sql = "INSERT INTO quiz_questions (type, difficulty, category_id, question, correct_answer, incorrect_answers) VALUES (?, ?, ?, ?, ?, JSON_ARRAY(?))";

  db.query(sql, [type, difficulty, category_id, question, correct_answer, incorrect_answers.join(', ')], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Quiz question added successfully!" });
  });
});

app.get('/question', (req, res) => {
  const { amount, category, difficulty, type } = req.query;

  // Build the SQL query dynamically based on the filters provided
  let sql = "SELECT q.id, q.question, q.correct_answer, q.incorrect_answers, q.type, q.difficulty, q.category_id FROM quiz_questions q";
  
  const conditions = [];
  const params = [];

  // Filter by category
  if (category) {
      conditions.push("q.category_id = ?");
      params.push(category); // category should be passed as category_id
  }

  // Filter by difficulty
  if (difficulty) {
      conditions.push("q.difficulty = ?");
      params.push(difficulty);
  }

  // Filter by type
  if (type) {
      conditions.push("q.type = ?");
      params.push(type);
  }

  // Add conditions to SQL if any exist
  if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
  }

  // Limit the number of questions returned based on `amount`
  sql += " LIMIT ?";

  // Add the `amount` to params
  params.push(parseInt(amount));

  // Execute the query with the conditions
  db.query(sql, params, (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);  // Return the questions to the client
  });
});


app.listen(8800, () => {
  console.log('Connected to backend!');
});
