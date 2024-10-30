const supabase = require("../supabase");

const createUser = async (username, email, hashedPassword) => {
  const { data, error } = await supabase
    .from("users")
    .insert([{ username, email, password: hashedPassword }]);

  if (error) throw new Error(error.message);
  return data[0];
};

const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error("Login failed: " + error.message);
  return data;
};

module.exports = { createUser, loginUser };
