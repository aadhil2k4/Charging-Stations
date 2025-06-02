import mongoose from "mongoose";

const StationSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
      min: 3,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    },
    powerOutput: {
        type: Number,
        required: true,
    },
    connectorType: {
        type: String,
        required: true,
    },
    latitude: {
        type:Number,
        require: true,
    },
    longitude: {
        type: Number,
        require: true,
    }
  },
  { timestamps: true }
);

export const Station = mongoose.model('Station', StationSchema);
