const bcrypt = require('bcrypt');
const { getContainer } = require('./config/cosmosClient'); // Adjusted path

/**
 * Create a new user with hashed password
 * @param {string} username
 * @param {string} email
 * @param {string} password
 */
async function createUser(username, email, password) {
  try {
    const container = await getContainer();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, email, password: hashedPassword };
    const { resource } = await container.items.create(user);
    console.log('User created:', resource);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

createUser('shihab', 'shihab@brodmann10.com', 'Enas@1994');
