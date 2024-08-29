import QueryBuilder from "../../builder/QueryBuilder";
import { facilitySearchItem } from "./facility.constant";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFacility = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

const getAllfacilities = async (query: Record<string, unknown>) => {
  const facilityQuery = new QueryBuilder(Facility.find(), query)
    .search(facilitySearchItem)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await facilityQuery.modelQuery;
  const meta = await facilityQuery.countTotal();
  return {
    meta,
    result,
  };
};

const updateSingleFacility = async (
  id: string,
  payload: Partial<TFacility>
) => {
  const result = await Facility.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSingleFacility = async (id: string) => {
  const result = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const facilityService = {
  createFacility,
  getAllfacilities,
  updateSingleFacility,
  deleteSingleFacility,
};
