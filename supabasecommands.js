// Tables generated within supabase SQL Editor

// CREATE TABLE users (
//     id serial PRIMARY KEY,
//     username VARCHAR(50) UNIQUE NOT NULL,
//     email VARCHAR(100) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   );

//   CREATE TABLE contacts (
//     id serial PRIMARY KEY,
//     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
//     name VARCHAR(100),
//     phone_number VARCHAR(15),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   );

//   CREATE TABLE sms_logs (
//     id serial PRIMARY KEY,
//     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
//     contact_id INTEGER REFERENCES contacts(id) ON DELETE CASCADE,
//     message TEXT NOT NULL,
//     status VARCHAR(20),
//     sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   );
