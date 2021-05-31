const express = require("express");
const path = require("path");
const mongo_client = require("mongodb").MongoClient;
const cors = require ("cors"); 
const db_name = "web_application";
const exp = express();
const parser = express.json();
const PORT = process.env.npm_package_config_port_backend || 1272;
const dir_proj = path.join(__dirname, "/../../");
const dir_back = __dirname;
const dir_views = path.join(dir_back, "/views");
const mongo = new mongo_client("mongodb://localhost:27017/", { useUnifiedTopology: true });let db_client;
exp.use(cors());
exp.use(express.static(dir_proj));
exp.set("view engine", "ejs");
exp.set("views", dir_views);
mongo.connect((error, client) => {
    if (error) { return console.log(error); }
    db_client = client;
    exp.locals.hospitals      = client.db(db_name).collection("hospitals");
    exp.locals.doctors        = client.db(db_name).collection("doctors");
    exp.locals.patients       = client.db(db_name).collection("patients");
    exp.locals.identificators = client.db(db_name).collection("identificators");
  
    exp.listen(PORT, () => {
  
    console.log(`Backend server is started on ${PORT} port`);
    console.log(`Url: http://localhost:${PORT}`);
  
    });
});
exp.get(["/", "/index"], (req, res) => {
    res.render("pages/index", { title: "/index",
                                port: PORT });
});
  exp.get("/get_executors", (req, res) => {
  
    collection = req.app.locals.executors;
    collection.find({}).toArray((error, result) => {
  
      if (error) { console.log(error);
                   res.sendStatus(500); }
      else       { res.send(result); }
  
    });
});
  exp.get("/get_customers", (req, res) => {
  
    collection = req.app.locals.customers;
    collection.find({}).toArray((error, result) => {
  
      if (error) { console.log(error);
                   res.sendStatus(500); }
      else       { res.send(result); }
  
    });
});
  exp.get("/get_projects", (req, res) => {
  
    collection = req.app.locals.projects;
    collection.find({}).toArray((error, result) => {
  
      if (error) { console.log(error);
                   res.sendStatus(500); }
      else       { res.send(result); }
  
    });
});
exp.get("/get_last_executor_id", (req, res) => {

    collection = req.app.locals.identificators;
    collection.find({name: "last_executor_id"}).toArray((error, result) => {
  
      if (error) { console.log(error);
                   res.sendStatus(500); }
      else       { res.send(result); }
  
    });
});
  exp.get("/get_last_customer_id", (req, res) => {
  
    collection = req.app.locals.identificators;
    collection.find({name: "last_customer_id"}).toArray((error, result) => {
  
      if (error) { console.log(error);
                   res.sendStatus(500); }
      else       { res.send(result); }
  
    });
});
  exp.get("/get_last_project_id", (req, res) => {
  
    collection = req.app.locals.identificators;
    collection.find({name: "last_project_id"}).toArray((error, result) => {
  
      if (error) { console.log(error);
                   res.sendStatus(500); }
      else       { res.send(result); }
  
    });
});
exp.put(["/set_executors",
         "/set_customers",
         "/set_projects",
         "/set_identificators"], parser, async (req, res) => {

  if (!req.body) { return res.sendStatus(400); }

  let array      = req.body.array;
  let collection = req.body.collection;

  switch (collection) {
    case 1: collection = req.app.locals.executors;      break;
    case 2: collection = req.app.locals.customers;      break;
    case 3: collection = req.app.locals.projects;       break;
    case 5: collection = req.app.locals.identificators; break;
  }

  try {

    let result;
    await collection.deleteMany({});

    if (array.length === 0) { result = array; }
    else                    { result = await collection.insertMany(array); }

    return res.send(result);

  }
  catch (error) {

    console.log(error);
    return res.sendStatus(500);

  }
});
exp.use((req, res) => {

    res.sendStatus(400);
  
});
process.on("SIGINT", () => {

    console.log("\n" + "Server is stopped");
    db_client.close();  
    process.exit();
  
});
  