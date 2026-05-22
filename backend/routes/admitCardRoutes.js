import express from "express";
import AdmitCard from "../models/AdmitCard.js";

const router =
  express.Router();


// Add Admit Card
router.post(
  "/",
  async (req, res) => {
    try {
      const newCard =
        new AdmitCard(
          req.body
        );

      await newCard.save();

      res.status(201)
      .json(newCard);
    } catch (error) {
      res.status(500)
      .json({
        message:
          error.message,
      });
    }
  }
);


// Get All Admit Cards
router.get(
  "/",
  async (req, res) => {
    try {
      const cards =
        await AdmitCard.find();

      res.json(cards);
    } catch (error) {
      res.status(500)
      .json({
        message:
          error.message,
      });
    }
  }
);


// Get Single Admit Card
router.get(
  "/:id",
  async (req, res) => {
    try {
      const card =
        await AdmitCard.findById(
          req.params.id
        );

      res.json(card);
    } catch (error) {
      res.status(500)
      .json({
        message:
          error.message,
      });
    }
  }
);


// UPDATE Admit Card
router.put(
  "/:id",
  async (req, res) => {
    try {
      const updatedCard =
        await AdmitCard.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(
        updatedCard
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


// DELETE Admit Card
router.delete(
  "/:id",
  async (req, res) => {
    try {
      await AdmitCard.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Admit Card Deleted Successfully",
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