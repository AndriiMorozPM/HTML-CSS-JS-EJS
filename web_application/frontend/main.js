const express = require("express");
const path = require("path");
const exp = express();
const PORT = process.env.PORT || 1271;
const USE_DB = process.argv[2] === "use_db=true" ? true : false;
const SERVER_PORT = process.env.npm_package_config_port_backend || 1272;
const dir_proj = path.join(__dirname, "/../../");
const dir_front = __dirname;
const dir_views = path.join(dir_front, "/views");
exp.use(express.static(dir_proj));
exp.set("view engine", "ejs");
exp.set("views", dir_views);
exp.get(["/", "/main"], function (request, response) {
    response.render("pages/main", { title: "Головна сторінка",
                                        use_db: USE_DB,
                                        server_port: SERVER_PORT,
                                        page_id: "0" });
  });
  exp.get(["/executors"], function (request, response) {
    response.render("pages/executors", { title: "Виконавці",
                                        use_db: USE_DB,
                                        server_port: SERVER_PORT,
                                        add_button: "Додати нового виконавця",
                                        page_id: "1" });
  });
  exp.get(["/customers"], function (request, response) {
    response.render("pages/customers", { title: "Замовники",
                                        use_db: USE_DB,
                                        server_port: SERVER_PORT,
                                        add_button: "Додати нового замовника",
                                        page_id: "2" });
  });
  exp.get(["/projects"], function (request, response) {
    response.render("pages/projects", { title: "Проекти",
                                        use_db: USE_DB,
                                        server_port: SERVER_PORT,
                                        add_button: "Додати новий проект",
                                        page_id: "3" });
  });
  exp.use((req, res) => {
    res.status(404);
    res.render("pages/404", { title: "Error 404",
                              use_db: USE_DB,
                              server_port: SERVER_PORT,
                              page_id: "-1",
                              path: req.path });
  });

exp.listen(PORT);
console.log(`Frontend server is started on ${PORT} port`);
console.log(`Url: http://localhost:${PORT}`);