const bcrypt = require('bcryptjs');
const { getContainer } = require('./config/cosmosClient'); // Adjust the path as necessary
require('dotenv').config();

let container;

(async () => {
  container = await getContainer();
  await createUser({
    username: 'testuser',
    email: 'testuser@brodmann10.com',
    password: 'Test@1234',
  });
})();

const createUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = { ...user, password: hashedPassword };
  const { resource: createdUser } = await container.items.create(newUser);
  console.log('User created:', createdUser);
};
