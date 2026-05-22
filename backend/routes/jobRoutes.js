import express from "express";
import Job from "../models/Job.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router =
  express.Router();

/* ======================
   GET ALL JOBS
====================== */
router.get(
  "/",
  async (req, res) => {

    try {

      const jobs =
        await Job.find()
        .sort({
          createdAt: -1,
        });

      res.json(jobs);

    } catch (error) {

      console.log(
        "Get Jobs Error:",
        error
      );

      res.status(500)
      .json({
        message:
          error.message,
      });
    }
  }
);

/* ======================
   GET CS JOBS
====================== */
router.get(
  "/category/CS",
  async (req, res) => {

    try {

      const jobs =
        await Job.find({
          category:
            "CS",
        }).sort({
          createdAt: -1,
        });

      res.json(jobs);

    } catch (error) {

      console.log(
        "CS Jobs Error:",
        error
      );

      res.status(500)
      .json({
        message:
          error.message,
      });
    }
  }
);

/* ======================
   GET SINGLE JOB
====================== */
router.get(
  "/:id",
  async (req, res) => {

    try {

      const job =
        await Job.findById(
          req.params.id
        );

      if (!job) {

        return res
          .status(404)
          .json({
            message:
              "Job not found",
          });
      }

      res.json(job);

    } catch (error) {

      console.log(
        "Get Job Error:",
        error
      );

      res.status(500)
      .json({
        message:
          error.message,
      });
    }
  }
);

/* ======================
   ADD JOB
====================== */
router.post(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      console.log(
        "Request Body:",
        req.body
      );

      const job =
        new Job({
          postName:
            req.body.postName,

          totalVacancies:
            req.body
              .totalVacancies,

          ageLimit:
            req.body
              .ageLimit,

          minimumQualification:
            req.body
              .minimumQualification,

          selectionProcess:
            req.body
              .selectionProcess,

          location:
            req.body
              .location,

          lastDate:
            req.body
              .lastDate,

          eligibilityCriteria:
            req.body
              .eligibilityCriteria,

          category:
            req.body
              .category,

          // Dates
          notificationDate:
            req.body
              .notificationDate,

          applicationStartDate:
            req.body
              .applicationStartDate,

          applicationLastDate:
            req.body
              .applicationLastDate,

          examDate:
            req.body
              .examDate,

          admitCardDate:
            req.body
              .admitCardDate,

          // Fees
          generalFee:
            req.body
              .generalFee,

          obcFee:
            req.body
              .obcFee,

          scstFee:
            req.body
              .scstFee,

          pwdFee:
            req.body
              .pwdFee,

          // Links
          applyOnlineLink:
            req.body
              .applyOnlineLink,

          notificationPdf:
            req.body
              .notificationPdf,

          // Dynamic Positions
          positions:
            req.body
              .positions,
        });

      const savedJob =
        await job.save();

      res.status(201)
      .json(savedJob);

    } catch (error) {

      console.log(
        "Add Job Error:",
        error
      );

      res.status(500)
      .json({
        message:
          error.message,
      });
    }
  }
);

/* ======================
   UPDATE JOB
====================== */
router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const updatedJob =
        await Job.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
            runValidators:
              true,
          }
        );

      if (
        !updatedJob
      ) {

        return res
          .status(404)
          .json({
            message:
              "Job not found",
          });
      }

      res.json(
        updatedJob
      );

    } catch (error) {

      console.log(
        "Update Job Error:",
        error
      );

      res.status(500)
      .json({
        message:
          error.message,
      });
    }
  }
);

/* ======================
   DELETE JOB
====================== */
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const deletedJob =
        await Job.findByIdAndDelete(
          req.params.id
        );

      if (
        !deletedJob
      ) {

        return res
          .status(404)
          .json({
            message:
              "Job not found",
          });
      }

      res.json({
        message:
          "Job deleted successfully",
      });

    } catch (error) {

      console.log(
        "Delete Error:",
        error
      );

      res.status(500)
      .json({
        message:
          error.message,
      });
    }
  }
);

export default router;