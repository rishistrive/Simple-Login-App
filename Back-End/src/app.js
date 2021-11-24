const express = require("express");
const path = require("path");
require("../src/db/conn");
const app = express();
const port = process.env.PORT || 3000;
var cors = require("cors");
const routerUsers = require("./routers/usersRouter");
app.use(cors());
app.use(express.json());
app.use(routerUsers);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`connection is live at port ${port}`);
});
