const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const mongoosePaginate = require("mongoose-paginate-v2");

const project_schema = mongoose.Schema(
  {
    project_name: { type: String },
    area: { type: String },
    sub_heading: { type: String },
    // length: { type: Number },
    // width: { type: Number },
    city: { type: String },
    posted_on: { type: Date },
    status: { type: String },
    configuration: [{ bedrooms: Number, balcony: Number, total_size: Number }],
    images: [{ data: Buffer, mimeType: String }],
    full_address: { type: String },
    number_of_floores: { type: String },
    facing: { type: String },
    overlooking: { type: String },
    posess_in: { type: Date },
    iframe_url: { type: String },
    places_nearby: [{ icon: String, label: String, icon_type: String }],
    about_propoerty: { type: String },
  },
  { timestamps: true }
);

project_schema.plugin(aggregatePaginate);
project_schema.plugin(mongoosePaginate);
module.exports = mongoose.model("projects", project_schema);
