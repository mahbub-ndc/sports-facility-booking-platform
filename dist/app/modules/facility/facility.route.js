"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityRoute = void 0;
const express_1 = __importDefault(require("express"));
const facility_controller_1 = require("./facility.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_contstant_1 = require("../user/user.contstant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const facility_validation_1 = require("./facility.validation");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(user_contstant_1.USER_ROLE.admin), (0, validateRequest_1.default)(facility_validation_1.facilityValidationZodSchema), facility_controller_1.facilityController.createFacility);
router.get("/", facility_controller_1.facilityController.getAllfacilities);
router.put("/:id", (0, auth_1.default)(user_contstant_1.USER_ROLE.admin), (0, validateRequest_1.default)(facility_validation_1.updateFacilityValidationSchema), facility_controller_1.facilityController.updateSingleFacility);
router.delete("/:id", (0, auth_1.default)(user_contstant_1.USER_ROLE.admin), facility_controller_1.facilityController.deleteSingleFacility);
exports.facilityRoute = router;
