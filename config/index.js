const { game_hosted: GameHost, playgrounds: Playgrounds } = require("./mongoCollections");
const faker = require("faker");

exports.createTextIndexes = async () => {
    const playgroundsCollection = await Playgrounds();
    const game_hostedCollection = await GameHost();

    await playgroundsCollection.createIndex({
        playgroundName: "text",
        location: "text",
    });

    await game_hostedCollection.createIndex({
        playgroundName: "text",
        hostName: "text",
        player: "text",
    });
}

exports.createFakeData = async () => {
    const playgroundsCollection = await Playgrounds();
    const game_hostedCollection = await GameHost();

    const game_hosted = new Array(10).fill(0).map(() => ({
        playgroundName: faker.lorem.word(),
        hostName: faker.name.findName(),
        players: new Array(faker.datatype.number({ min: 1, max: 5 })).fill(0).map(() => ({
            _id: faker.datatype.uuid(),
            name: faker.name.findName(),
        })),
        sport: faker.lorem.word(),
        location: faker.address.city(),
        timing: faker.date.future(),
        image: faker.image.imageUrl(),
    }));

    const playgrounds = new Array(10).fill(0).map(() => ({
        playgroundName: faker.lorem.word(),
        schedule: faker.date.future(),
        amenities: new Array(5).fill(0).map(() => faker.lorem.word()),
        playgroundSize: faker.datatype.number(),
        location: faker.address.city(),
        image: faker.image.imageUrl(),
    }))

    await game_hostedCollection.insertMany(game_hosted);
    await playgroundsCollection.insertMany(playgrounds);
}