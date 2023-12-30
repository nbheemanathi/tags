// import { ApolloServer } from "apollo-server";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import schema from "./graphql/schema.js";
import * as dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
const server = new ApolloServer({
  schema,
});
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    return {
      req,
    };
  },
  listen: { port: PORT },
});

mongoose
  .connect(process.env.MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("data connected");
    return url;
  })
  .then((res) => {
    console.log(res.url);
  })
  .catch((err) => {
    console.error(err);
  });
