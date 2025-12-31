const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;
const dbname = process.env.DBNAME;
export const collections = {
  PRODUCTS: "products",
  USERS: "users",
  CART: "cart",
  ORDERS: "orders",
};
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
export const dbConnect = async (collection) => {
  return client.db(dbname).collection(collection);
};
