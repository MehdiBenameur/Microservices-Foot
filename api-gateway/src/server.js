const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const playerRoutes = require("./routes/playerRoutes");
const matchRoutes = require("./routes/matchRoutes");
const scoreRoutes = require("./routes/scoreRoutes");


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes REST
app.use("/api", playerRoutes);
app.use("/api", matchRoutes);
app.use("/api", scoreRoutes);



// GraphQL Server
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  const PORT = process.env.GATEWAY_PORT;
  app.listen(PORT, () => {
    console.log(`🚀 API Gateway REST on http://localhost:${PORT}/api`);
    console.log(`🚀 API Gateway GraphQL on http://localhost:${PORT}/graphql`);
  });
}

startApolloServer();
