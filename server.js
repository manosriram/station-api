// Core Imports.
const express = require("express");
const app = express();
const PORT = 5050; // PORT

// Redirect "/" requests to "/api".
app.use("/", require("./Controllers/api"));

// Listen to PORT.
app.listen(PORT, () => {
    console.log(`Server at ${PORT}`);
});
