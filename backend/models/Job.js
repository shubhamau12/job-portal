import mongoose from "mongoose";

const positionSchema =
  new mongoose.Schema({
    positionName: {
      type: String,
      default: "",
    },

    qualification: {
      type: String,
      default: "",
    },

    numberOfPosts: {
      type: String,
      default: "",
    },
  });

const jobSchema =
  new mongoose.Schema(
    {
      // Basic Details
      postName: {
        type: String,
        default: "",
      },

      totalVacancies: {
        type: String,
        default: "",
      },

      ageLimit: {
        type: String,
        default: "",
      },

      minimumQualification: {
        type: String,
        default: "",
      },

      selectionProcess: {
        type: String,
        default: "",
      },

      location: {
        type: String,
        default: "",
      },

      lastDate: {
        type: String,
        default: "",
      },

      eligibilityCriteria: {
        type: String,
        default: "",
      },

      category: {
        type: String,
        default: "All",
      },

      // Important Dates
      notificationDate: {
        type: String,
        default: "",
      },

      applicationStartDate: {
        type: String,
        default: "",
      },

      applicationLastDate: {
        type: String,
        default: "",
      },

      examDate: {
        type: String,
        default:
          "Coming Soon",
      },

      admitCardDate: {
        type: String,
        default:
          "Coming Soon",
      },

      // Fee Details
      generalFee: {
        type: String,
        default: "",
      },

      obcFee: {
        type: String,
        default: "",
      },

      scstFee: {
        type: String,
        default: "",
      },

      pwdFee: {
        type: String,
        default: "",
      },

      // Important Links
      applyOnlineLink: {
        type: String,
        default: "",
      },

      notificationPdf: {
        type: String,
        default: "",
      },

      // Dynamic Positions
      positions: {
        type: [
          positionSchema,
        ],
        default: [],
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Job",
  jobSchema
);