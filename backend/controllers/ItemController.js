import Item from "../model/Item.js";
import { getBackendResponse } from "../server.js";

export const getAllItems = async (request, response) => {
  try {
    const { rarity, type, status, minPower, maxPower, power } = request.query;
    let filter = {};

    if (rarity) filter.rarity = rarity;
    if (type) filter.type = type;
    if (status) filter.status = status;

    if (minPower || maxPower) {
      filter.power = {};
      if (minPower) filter.power.$gte = Math.max(1, Number(minPower));
      if (maxPower) filter.power.$lte = Math.min(100, Number(maxPower));
    }

    if (power) filter.power = power;

    console.log("Filter used: ", filter);
    const items = await Item.find(filter);
    response
      .status(200)
      .jsonp(
        getBackendResponse(200, "All the items fetched successfully.", items),
      );
  } catch (error) {
    response
      .status(500)
      .jsonp(
        getBackendResponse(
          500,
          "Error while fetching all the items: " + error.message,
        ),
      );
  }
};

export const addItem = async (request, response) => {
  try {
    const { name, type, element, power, rarity, description, status } =
      request.body;

    const existingItem = await Item.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
    if (existingItem)
      throw new Error("An item with the same name already exists.");

    const item = new Item({
      name,
      type,
      element,
      power,
      rarity,
      description,
      status,
    });
    await item.save();
    response
      .status(200)
      .jsonp(getBackendResponse(200, "Item added successfully.", item));
  } catch (error) {
    response
      .status(500)
      .jsonp(
        getBackendResponse(500, "Error while adding item: " + error.message),
      );
  }
};

export const deleteItem = async (request, response) => {
  try {
    const { name } = request.params;
    const item = await Item.findOneAndDelete({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
    if (item == null) throw new Error("Item not found.");
    response
      .status(200)
      .jsonp(getBackendResponse(200, "Item deleted successfully.", item));
  } catch (error) {
    response
      .status(500)
      .jsonp(
        getBackendResponse(500, "Error while deleting item: " + error.message),
      );
  }
};

export const updateItem = async (request, response) => {
  try {
    const { name } = request.params;
    const item = await Item.findOneAndUpdate(
      { name: { $regex: new RegExp(`^${name}$`, "i") } },
      request.body,
      { returnDocument: "after", runValidators: true },
    );

    if (!item) {
      return response
        .status(404)
        .jsonp(getBackendResponse(404, "Item not found."));
    }

    response
      .status(200)
      .jsonp(getBackendResponse(200, "Item updated successfully.", item));
  } catch (error) {
    response
      .status(500)
      .jsonp(
        getBackendResponse(500, "Error while updating item: " + error.message),
      );
  }
};
