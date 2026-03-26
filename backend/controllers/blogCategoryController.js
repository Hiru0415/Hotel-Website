const BlogCategory = require("../models/BlogCategory");
const { sendSuccess } = require("../utils/responseHandler");

// @desc    Get all blog categories
// @route   GET /api/v1/blog-categories
// @access  Public
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await BlogCategory.find({})
      .populate("postsCount")
      .sort({ name: 1 });

    sendSuccess(res, categories, "Blog categories fetched successfully");
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog category by ID
// @route   GET /api/v1/blog-categories/:id
// @access  Public
exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await BlogCategory.findById(id).populate("postsCount");

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Blog category not found",
      });
    }

    sendSuccess(res, category, "Blog category fetched successfully");
  } catch (error) {
    next(error);
  }
};

// @desc    Create new blog category
// @route   POST /api/v1/blog-categories
// @access  Private (Admin)
exports.createCategory = async (req, res, next) => {
  try {
    const category = await BlogCategory.create(req.body);

    sendSuccess(res, category, "Blog category created successfully", 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog category
// @route   PUT /api/v1/blog-categories/:id
// @access  Private (Admin)
exports.updateCategory = async (req, res, next) => {
  try {
    const category = await BlogCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Blog category not found",
      });
    }

    category.name = req.body.name ?? category.name;
    category.description = req.body.description ?? category.description;

    await category.save();

    sendSuccess(res, category, "Blog category updated successfully");
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blog category
// @route   DELETE /api/v1/blog-categories/:id
// @access  Private (Admin)
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await BlogCategory.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Blog category not found",
      });
    }

    sendSuccess(res, null, "Blog category deleted successfully");
  } catch (error) {
    next(error);
  }
};
