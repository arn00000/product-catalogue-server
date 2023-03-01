const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Product = require("../models/Product");

//get products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    if (!products) return res.status(404).json({ msg: "Product not found" });
    else return res.json(products);
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);

    if (!products) return res.status(404).json({ msg: "Product not found" });

    let product = await Product.findByIdAndDelete(req.params.id);

    return res.json({
      product,
      msg: "Product deleted successfully",
    });
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: "Product not found" });

    await Product.findByIdAndUpdate(req.params.id, req.body);

    return res.json({
      product,
      msg: "Product updated successfully",
    });
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      title,
      brand,
      category,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      thumbnail,
    } = req.body;

    if (title.length === 0) {
      return res.status(400).json({
        msg: "Please fill in all",
      });
    }

    if (brand.length === 0) {
      return res.status(400).json({
        msg: "Please fill in all",
      });
    }
    if (category.length === 0) {
      return res.status(400).json({
        msg: "Please fill in all",
      });
    }

    if (description.length === 0) {
      return res.status(400).json({
        msg: "Please fill in all",
      });
    }
    if (price.length === 0) {
      return res.status(400).json({
        msg: "Please fill in all",
      });
    }
    if (discountPercentage.length === 0) {
      return res.status(400).json({
        msg: "Please fill in all",
      });
    }
    if (rating.length === 0) {
      return res.status(400).json({
        msg: "Please fill in all",
      });
    }
    if (stock.length === 0) {
      return res.status(400).json({
        msg: "Please fill in all",
      });
    }

    const product = new Product({
      title,
      brand,
      category,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      thumbnail,
    });

    await product.save();
    return res
      .status(200)
      .json({ product, msg: "New product added successfully" });
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
