import express from "express";
import { authRoute } from "../modules/auth/auth.route";
import { facilityRoute } from "../modules/facility/facility.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/facility",
    route: facilityRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
