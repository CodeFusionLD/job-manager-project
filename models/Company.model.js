const { Schema, model } = require('mongoose');

const companySchema = new Schema(
    {
        name: String,
        address: {
        street: String,
        postCode: Number,
        city: String,
        },
        country: String,
    },
    {
      timestamps: true
    }
);

module.exports = model('Company', companySchema);