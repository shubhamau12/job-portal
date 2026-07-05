import express from "express";
import AnswerKey from "../models/AnswerKey.js";

const router =
  express.Router();


// Add Answer Key
router.post(
  "/",
  async (
    req,
    res
  ) => {
    try {

      const answerKey =
        new AnswerKey(
          req.body
        );

      await answerKey.save();

      res.status(201)
        .json(
          answerKey
        );

    } catch (error) {

      res.status(500)
        .json({
          message:
            error.message,
        });
    }
  }
);


// Get All Answer Keys
router.get(
  "/",
  async (
    req,
    res
  ) => {
    try {

      const answerKeys =
        await AnswerKey.find()
          .sort({
            createdAt:
              -1,
          });

      res.json(
        answerKeys
      );

    } catch (error) {

      res.status(500)
        .json({
          message:
            error.message,
        });
    }
  }
);


// Get Answer Key By ID
router.get(
  "/:id",
  async (
    req,
    res
  ) => {
    try {

      const answerKey =
        await AnswerKey.findById(
          req.params.id
        );

      res.json(
        answerKey
      );

    } catch (error) {

      res.status(500)
        .json({
          message:
            error.message,
        });
    }
  }
);


// Update Answer Key
router.put(
  "/:id",
  async (
    req,
    res
  ) => {
    try {

      const updated =
        await AnswerKey.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(
        updated
      );

    } catch (error) {

      res.status(500)
        .json({
          message:
            error.message,
        });
    }
  }
);


// Delete Answer Key
router.delete(
  "/:id",
  async (
    req,
    res
  ) => {
    try {

      await AnswerKey.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Answer Key Deleted Successfully",
      });

    } catch (error) {

      res.status(500)
        .json({
          message:
            error.message,
        });
    }
  }
);

export default router;