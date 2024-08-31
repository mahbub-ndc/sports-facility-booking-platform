"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const user_validation_1 = require("../user/user.validation");
const user_controller_1 = require("../user/user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post("/create-user", (0, validateRequest_1.default)(user_validation_1.userZodValidationSchema), user_controller_1.userController.createUser);
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.loginValidationSchema), auth_controller_1.authController.loginUser);
exports.authRoute = router;
