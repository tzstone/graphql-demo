const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const cors = require("cors");

// 解决跨域
app.use(cors());

const { schema, rootValue } = require("./schema");
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

app.get("/", (req, res) => res.end("index"));

app.listen(8000, (err) => {
  if (err) {
    throw new Error(err);
  }
  console.log("*** server started ***");
});
