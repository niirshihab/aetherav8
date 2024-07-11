const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getContainer } = require('../config/supabaseClient');

const login = async (email, password) => {
  try {
    const container = await getContainer();
    const { resources: users } = await container.items.query({
      query: "SELECT * FROM c WHERE c.email = @email",
      parameters: [{ name: "@email", value: email }]
    }).fetchAll();

    if (users.length === 0) {
      throw new Error('User not found');
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Incorrect password');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  } catch (error) {
    throw error;
  }
};

const setupPassword = async (userId, newPassword) => {
  try {
    const container = await getContainer();
    const { resource: user } = await container.item(userId).read();
    user.password = await bcrypt.hash(newPassword, 10);
    await container.item(userId).replace(user);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
  setupPassword
};
