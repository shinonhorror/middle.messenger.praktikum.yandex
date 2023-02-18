const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

app.use(express.static(`${__dirname}/dist`));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/dist/index.html`));
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
