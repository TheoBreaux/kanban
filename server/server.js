/*eslint-disable no-undef */

import http from "http";
import pg from "pg";
import "dotenv/config";

const client = new pg.Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDB,
  password: process.env.PGPWD,
  port: process.env.PGPORT,
});

await client.connect();

async function queryDb() {
  try {
    const res = await client.query("SELECT * FROM board;");
    return res.rows;
  } catch (err) {
    console.error(err);
    return [];
  } finally {
    await client.end();
  }
}

const server = http.createServer(async (req, res) => {
  console.log(req.url);
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

  if (req.url === "/") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.write(
      JSON.stringify({
        name: "Theo Ashley Breaux",
        age: 44,
        occupation: "software developer",
        salary: 325000,
      })
    );
  } else if (req.url === "/boards") {
    const data = await queryDb("SELECT * FROM board;"); // Await the query result
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.write(JSON.stringify(data)); // Write the data returned from the database
  } else if (req.url === "/user/1") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.write(
      JSON.stringify({
        name: "Theo Breaux",
        age: 44,
      })
    );
  } else if (req.url === "/group/1") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.write(
      JSON.stringify({
        name: "friends",
        members: 441,
      })
    );
  } else {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 404;
    res.write(
      JSON.stringify({
        error: true,
        message: "endpoint does not exist",
      })
    );
  }

  res.end(); // End the response
});

server.listen(5030, () => {
  console.log("listening for requests on port 5030");
});