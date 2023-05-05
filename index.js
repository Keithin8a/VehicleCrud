const getVehicleHandler = require("./src/handlers/getVehicle");
const postVehicleHandler = require("./src/handlers/postVehicle");

/*
ideally what I would do here is create the DB client here or in some middleware function using something like middyjs
and dependency inject it into each handler. That way we can truely test each lambda in isolation.
*/

module.exports = {
    getVehicleHandler,
    postVehicleHandler
}