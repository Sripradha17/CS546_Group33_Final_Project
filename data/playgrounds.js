const { ObjectId } = require("mongodb");
const { playground: Playground } = require("../config/mongoCollections")

const getPlaygroundById = async (id) => {
    const playgroundsCollection = await Playground();
    const playground = await playgroundsCollection.findOne({ _id: ObjectId(id) });
    if (playground === null) throw "Playground not found";
    return playground;
}

const searchPlaygrounds = async (params) => {
    const playgroundsCollection = await Playground();
    const filter = {};
    if (params?.searchTerm) {
        filter.$text = { $search: params.searchTerm };
    }
    if (params?.date) {
        const _date = new Date(params.date);
        const day = _date.getDate();
        const month = _date.getMonth();
        const year = _date.getFullYear();

        filter.schedule = {
            $gte: new Date(year, month, day + 1),
            $lte: new Date(year, month, day + 2)
        }
    }

    if (params?.minPlaygroundSize) {
        filter.playgroundSize = { $gte: Number(params.minPlaygroundSize) };
    }

    if (params?.maxPlaygroundSize) {
        filter.playgroundSize = { $lte: Number(params.maxPlaygroundSize) };
    }

    if(params?.maxPlaygroundSize && params?.minPlaygroundSize) {
        filter.playgroundSize = { $gte: Number(params.minPlaygroundSize), $lte: Number(params.maxPlaygroundSize) };
    }

    if (params?.amenities) {
        const regex = new RegExp(params.amenities, "i");
        filter.amenities = { 
            $elemMatch: {
                $regex: regex,
            }
        };
    }

    const playgrounds = await playgroundsCollection.find(filter).toArray();
    return playgrounds;
}

module.exports = {
    getPlaygroundById,
    searchPlaygrounds
}