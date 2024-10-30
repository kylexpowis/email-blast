const supabase = require('../supabase');

const createUser = async (username, email, hashedPassword) => {
  const { data, error } = await supabase
    .from('users')
    .insert([{ username, email, password: hashedPassword }]);

  if (error) throw new Error(error.message);  // Explicitly throw the error if it exists
  return data[0];
};

module.exports = { createUser };
