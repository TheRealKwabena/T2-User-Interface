"use strict";
exports.__esModule = true;
exports.convertToLocalTime = void 0;
function convertToLocalTime(date, timeZone) {
    return new Date(date).toLocaleString();
}
exports.convertToLocalTime = convertToLocalTime;
