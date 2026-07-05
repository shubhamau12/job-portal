import mongoose from "mongoose";

const answerKeySchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
      },

      aboutExam: {
        type: String,
      },

      notificationLink: {
        type: String,
      },

      answerKeyLink: {
        type: String,
      },

      answerKeyNotification: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "AnswerKey",
  answerKeySchema
);