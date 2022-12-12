"use strict";
exports.__esModule = true;
let userId = '' // here is where we need to pass the user Id that is looged in
var MQTTController_1 = require("./MQTTController");
new MQTTController_1.MQTTController(userId).connect();
