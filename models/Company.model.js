const { Schema, model } = require('mongoose');

const companySchema = new Schema(
    {
        name: String,
        adress: {
        type: String,
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