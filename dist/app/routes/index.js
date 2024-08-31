"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const facility_route_1 = require("../modules/facility/facility.route");
const booking_route_1 = require("../modules/bookings/booking.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.authRoute,
    },
    {
        path: "/facility",
        route: facility_route_1.facilityRoute,
    },
    {
        path: "/",
        route: booking_route_1.bookingRoute,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
