const { CosmosClient } = require('@azure/cosmos');
require('dotenv').config();

const endpoint = process.env.COSMOS_DB_CONNECTION_STRING;
const key = process.env.COSMOS_DB_KEY;

if (!endpoint || !key) {
    throw new Error("Cosmos DB endpoint and key must be defined in environment variables");
}

const client = new CosmosClient({ endpoint, key });

const databaseId = process.env.COSMOS_DB_ID || 'aetherabrodmann';
const containerId = process.env.COSMOS_DB_CONTAINER_ID || 'aetheracontainer';

/**
 * Get or create the Cosmos DB database.
 * @returns {Promise<Database>}
 */
async function getDatabase() {
  try {
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    return database;
  } catch (error) {
    console.error("Error creating or getting database:", error);
    throw error;
  }
}

/**
 * Get or create the Cosmos DB container.
 * @returns {Promise<Container>}
 */
async function getContainer() {
  try {
    const database = await getDatabase();
    const { container } = await database.containers.createIfNotExists(
      {
        id: containerId,
        partitionKey: { paths: ['/username'] },
        indexingPolicy: {
          indexingMode: 'consistent',
          includedPaths: [
            { path: '/username/?' },
            { path: '/email/?' }
          ],
          excludedPaths: [
            { path: '/*' }
          ]
        }
      },
      { offerThroughput: 400 } // Adjust this value to fit within your limits
    );
    return container;
  } catch (error) {
    console.error("Error creating or getting container:", error);
    throw error;
  }
}

module.exports = {
  client,
  getDatabase,
  getContainer,
};