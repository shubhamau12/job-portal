import mongoose from "mongoose";

const resultSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
      },

      aboutExam: {
        type: String,
      },

      examDate: {
        type: String,
      },

      resultDate: {
        type: String,
      },

      examResult: {
        type: String,
      },

      cutoffList: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Result",
  resultSchema
);