const express = require("express");
const user = require("../src/routes/user");
const car = require("../src/routes/car");

module.exports = function (app) 
{
  app
    .use(express.json())
    .use("/user", user)
    .use("/car", car)
};
