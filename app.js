require("dotenv").config();
require("./db");
const express = require("express");
const hbs = require("hbs");
const app = express();

require("./config")(app);

require("./config/session.config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "job-ninja";

app.locals.appTitle = `${capitalize(projectName)}`;

app.use("/", require("./routes/index.routes"));
app.use("/", require("./routes/auth.routes"));
app.use("/", require("./routes/position.routes"));
app.use("/", require("./routes/company.routes"));

require("./error-handling")(app);

module.exports = app;
