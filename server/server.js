/*eslint-disable no-undef */
import http from "http";
import pg from "pg";
import "dotenv/config";

const client = new pg.Client(
  process.env.PGUSER
    ? {
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDB,
        password: process.env.PGPWD,
        port: process.env.PGPORT,
      }
    : "postgres://admin:1G7IwIVcEnaPoTYw1Mf8wbXK3IuvAnh5@dpg-ckbl91ciibqc73afpk9g-a/kanban_pmd1"
);
await client.connect();

async function queryDb(query) {
  try {
    const res = await client.query(query);
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
        occupation: "software developer",
      })
    );
  } else if (req.url === "/boards") {
    let data = await queryDb("select * from board;"); // Await the query result
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.write(JSON.stringify(data)); // Write the data returned from the database
  } else if (req.url === "/user/1") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.write(
      JSON.stringify({
        name: "Theo Breaux",
        occupation: "software developer",
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
