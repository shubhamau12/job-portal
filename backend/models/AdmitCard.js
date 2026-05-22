import mongoose from "mongoose";

const admitCardSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        default: "",
      },

      applicationStartDate: {
        type: String,
        default: "",
      },

      examDate: {
        type: String,
        default: "",
      },

      examCityDetails: {
        type: String,
        default: "",
      },

      admitCard: {
        type: String,
        default: "",
      },

      downloadAdmitCard: {
        type: String,
        default: "",
      },

      downloadExamCityDetails: {
        type: String,
        default: "",
      },

      downloadExamCityNotice: {
        type: String,
        default: "",
      },

      howToCheckAdmitCard: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "AdmitCard",
  admitCardSchema
);