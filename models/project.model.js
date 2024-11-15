const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const mongoosePaginate = require("mongoose-paginate-v2");

const project_schema = mongoose.Schema(
  {
    project_name: { type: String },
    sub_heading: { type: String },
    area: { type: String },
    city: { type: String },
    posted_on: { type: Date },
    status: { type: String },
    configuration: [{ bedrooms: Number, balcony: Number }],
    images: [{ data: Buffer, mimeType: String }],
    full_address: { type: String },
    number_of_floores: { type: String },
    facing: { type: String },
    overlooking: { type: String },
    posess_in: { type: Date },
    iframe_url: { type: String },
    places_nearby: [{ icon: String, label: String }],
    about_propoerty: { type: String },
  },
  { timestamps: true }
);

project_schema.plugin(aggregatePaginate);
project_schema.plugin(mongoosePaginate);
module.exports = mongoose.model("projects", project_schema);
