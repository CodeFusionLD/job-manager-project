const mongoose = require("mongoose");
const Position = require("../models/Position.model");
const Company = require("../models/Company.model");

const companies = [
  {
    name: "Twitch",
    address: {
      street: "32 IronStreet",
      postCode: 96684,
      city: "Manchester"
    }, 
    country: "UK"
  },
  {
    name: "IronHack",
    address: {
      street: "3 rue Maillard",
      postCode: 75011,
      city: "Paris",
    }, 
    country: "France"
  },
  {
    name: "Microsoft",
    address: {
      street: "Walter-Gropius-Straße 5",
      postCode: 80807,
      city: "München"
    }, 
    country: "Germany"
  },
  {
    name: "IBM",
    address: {
    street: "Computer Road 231",
    postCode: 90027,
    city: "Los Angeles",
    },
    country: "USA",
  },
  {
    name: "Google",
    address: {
    street: "Google Road 1",
    postCode: 98927,
    city: "San Francisco",
    },
    country: "USA",
  },
  {
    name: "Meta",
    address: {
    street: "Meta Road 1",
    postCode: 99023,
    city: "San Francisco",
    },
    country: "USA",
  },
  {
    name: "Space X",
    address: {
    street: "Rocket Road 1",
    postCode: 99023,
    city: "Los Angeles",
    },
    country: "USA",
  }
];


async function seedData() {
  try {
    // CONNECTION
    const MONGO_URI =
      process.env.MONGODB_URI ||
      "mongodb://127.0.0.1:27017/job-ninja";
    const conn = await mongoose.connect(MONGO_URI);
    console.log(
      `Connected to Mongo! Database name: "${conn.connections[0].name}"`
    );

    // DELETE DATA
    const deletedPositions = await Position.deleteMany({});
    const deletedCompanies = await Company.deleteMany({});
    console.log(deletedPositions, deletedCompanies);

    // SEED COMPANIES
    const companiesCreated = await Company.insertMany(companies);
    console.log(`Number of companies created... ${companiesCreated.length}`);

    const positionsWithIds = [];

    for (const positionObj of positions) {
      const companyName = positionObj.company;
      const companyDetails = await Company.findOne({ name: companyName });
      if (!companyDetails) {
        throw new Error(`Company '${companyName}' not found`);
      }
      const companyId = companyDetails._id;

      const newPosition = {
        title: positionObj.title,
        description: positionObj.description,
        rating: positionObj.rating,
        company: companyId,
      };

      positionsWithIds.push(newPosition);
    }

    const positionsCreated = await Position.insertMany(positionsWithIds);
    console.log(`Number of positions created... ${positionsCreated.length}`);

    // close connection after all operations are complete
    mongoose.connection.close();
  } catch (e) {
    console.log("error seeding data in DB....", e);
  }
}

seedData();