const express = require("express");
const { body } = require("express-validator");
const { validate } = require("../middlewares/validator");
const { protect } = require("../middlewares/auth");
const {
  getBlogs,
  getBlogByIdOrSlug,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogStats,
} = require("../controllers/blogController");
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/blogCategoryController");

const router = express.Router();

// Validation rules
const blogValidation = [
  body("title")
    .notEmpty()
    .withMessage("Blog title is required")
    .isLength({ max: 200 })
    .withMessage("Title cannot exceed 200 characters")
    .trim(),
  body("excerpt")
    .notEmpty()
    .withMessage("Excerpt is required")
    .isLength({ max: 500 })
    .withMessage("Excerpt cannot exceed 500 characters")
    .trim(),
  body("content").notEmpty().withMessage("Blog content is required"),
  body("category").notEmpty().withMessage("Category is required"),
];

const categoryValidation = [
  body("name").notEmpty().withMessage("Category name is required").trim(),
];

// Category routes — MUST come before /:identifier wildcard
router.get("/categories/all", getCategories);
router.get("/categories/:id", getCategoryById);
router.post(
  "/categories",
  protect,
  categoryValidation,
  validate,
  createCategory,
);
router.put(
  "/categories/:id",
  protect,
  categoryValidation,
  validate,
  updateCategory,
);
router.delete("/categories/:id", protect, deleteCategory);

// Blog routes
router.get("/stats/overview", protect, getBlogStats);
router.get("/", getBlogs);
router.get("/:identifier", getBlogByIdOrSlug);
router.post("/", protect, blogValidation, validate, createBlog);
router.put("/:id", protect, blogValidation, validate, updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;
