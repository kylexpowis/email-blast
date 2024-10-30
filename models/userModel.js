const supabase = require('../supabase');

const createUser = async (username, email, hashedPassword) => {
  const { data, error } = await supabase
    .from('users')
    .insert([{ username, email, password: hashedPassword }]);

  if (error) throw new Error(error.message); 
  return data[0];
};

module.exports = { createUser };
