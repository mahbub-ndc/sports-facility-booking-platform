"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const facility_constant_1 = require("./facility.constant");
const facility_model_1 = require("./facility.model");
const createFacility = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.create(payload);
    return result;
});
const getAllfacilities = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const facilityQuery = new QueryBuilder_1.default(facility_model_1.Facility.find(), query)
        .search(facility_constant_1.facilitySearchItem)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield facilityQuery.modelQuery;
    const meta = yield facilityQuery.countTotal();
    return {
        meta,
        result,
    };
});
const updateSingleFacility = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteSingleFacility = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
exports.facilityService = {
    createFacility,
    getAllfacilities,
    updateSingleFacility,
    deleteSingleFacility,
};
