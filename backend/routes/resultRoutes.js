import express from "express";
import Result from "../models/Result.js";

const router =
  express.Router();


// Add Result
router.post(
  "/",
  async (
    req,
    res
  ) => {
    try {

      const result =
        new Result(
          req.body
        );

      await result.save();

      res.status(201)
        .json(result);

    } catch (error) {

      res.status(500)
        .json({
          message:
            error.message,
        });
    }
  }
);


// Get All Results
router.get(
  "/",
  async (
    req,
    res
  ) => {
    try {

      const results =
        await Result.find()
          .sort({
            createdAt:
              -1,
          });

      res.json(
        results
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


// Get Result By ID
router.get(
  "/:id",
  async (
    req,
    res
  ) => {
    try {

      const result =
        await Result.findById(
          req.params.id
        );

      res.json(
        result
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


// UPDATE Result
router.put(
  "/:id",
  async (
    req,
    res
  ) => {
    try {

      const updatedResult =
        await Result.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(
        updatedResult
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


// DELETE Result
router.delete(
  "/:id",
  async (
    req,
    res
  ) => {
    try {

      await Result.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Result deleted successfully",
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