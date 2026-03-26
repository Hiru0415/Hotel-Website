const mongoose = require("mongoose");

const blogCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide category name"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// No slug generation needed

// Virtual for posts count
blogCategorySchema.virtual("postsCount", {
  ref: "Blog",
  localField: "_id",
  foreignField: "category",
  count: true,
});

module.exports = mongoose.model("BlogCategory", blogCategorySchema);
