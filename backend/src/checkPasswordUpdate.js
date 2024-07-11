const { getContainer } = require('./config/cosmosClient');

async function checkPasswordUpdate(email) {
  try {
    const container = await getContainer();

    // Fetch user by email
    const { resources: users } = await container.items
      .query({
        query: "SELECT * FROM c WHERE c.email = @email",
        parameters: [{ name: '@email', value: email }],
      })
      .fetchAll();

    if (users.length === 0) {
      console.log('User not found');
      return;
    }

    const user = users[0];
    console.log('User found:', user);
    console.log('Updated password hash:', user.password);
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}

// Replace with the email of the user you want to check
checkPasswordUpdate('testuser@brodmann10.com');
