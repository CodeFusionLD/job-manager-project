const mongoose = require("mongoose");
const Position = require("../models/Position.model");
const Company = require("../models/Company.model");

async function seedData() {
  try {
    // CONNECTION
    const MONGO_URI =
      process.env.MONGODB_URI ||
      "mongodb://127.0.0.1:27017/job-manager-project";
    const conn = await mongoose.connect(MONGO_URI);
    console.log(
      `Connected to Mongo! Database name: "${conn.connections[0].name}"`
    );

    // DELETE DATA
    const deletedPositions = await Position.deleteMany({});
    const deletedCompanies = await Company.deleteMany({});
    console.log(deletedPositions, deletedCompanies);

    // SEED COMPANIES
    const companyCreated = await Company.insertMany(company);
    console.log(`Number of companies created... ${companiesCreated.length} `);

    const positionsWithIds = [];

    for (const positionObj of positions) {
      const companyName = positionObj.company;
      const companyDetails = await Company.findOne({ name: companyName });
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
    console.log(`Number of positions created... ${positionsCreated.length} `);

    mongoose.connection.close();
  } catch (e) {
    console.log("error seeding data in DB....", e);
  }
}

seedData();
