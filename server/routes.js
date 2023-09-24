const path = require("path");

const routes = (app, fs) => {
  const dataPath = path.resolve(__dirname, "./data/events.json");

  app.get("/events", (req, res) => {
    console.log("GET /events");
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) throw err;
      console.log("data", data);
      res.send(JSON.parse(data));
    });
  });

  app.post("/checkout", (req, res) => {
    console.log("POST /checkout");
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) throw err;
      console.log("data", data);
      res.send(JSON.parse(data));
    });
  });
};

module.exports = routes;
