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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const facility_model_1 = require("../facility/facility.model");
const bookingSchema = new mongoose_1.Schema({
    facility: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Facility",
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    payableAmount: {
        type: Number,
    },
    isBooked: {
        type: String,
        enum: ["confirmed", "unconfirmed", "canceled"],
        required: true,
        default: "confirmed",
    },
});
//calculate payable amount
bookingSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const facilityData = yield facility_model_1.Facility.findById(this.facility);
        const [startHours, startMinutes] = this.startTime.split(":").map(Number);
        const [endHours, endMinutes] = this.endTime.split(":").map(Number);
        const startTotalMinutes = startHours * 60 + startMinutes;
        const endTotalMinutes = endHours * 60 + endMinutes;
        // Calculate the difference in minutes
        const differenceInHours = (endTotalMinutes - startTotalMinutes) / 60;
        this.payableAmount =
            (facilityData === null || facilityData === void 0 ? void 0 : facilityData.pricePerHour) * differenceInHours;
        next();
    });
});
exports.Booking = (0, mongoose_1.model)("Booking", bookingSchema);
