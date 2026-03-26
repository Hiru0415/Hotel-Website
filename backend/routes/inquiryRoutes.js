const express = require("express");
const {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} = require("../controllers/inquiryController");
const { protect, authorize } = require("../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .get(protect, authorize("admin", "super_admin"), getInquiries) // Admin: View all
  .post(createInquiry); // Public: People filling the form

router
  .route("/:id/status")
  .put(protect, authorize("admin", "super_admin"), updateInquiryStatus); // Admin: Update status

router
  .route("/:id")
  .delete(protect, authorize("admin", "super_admin"), deleteInquiry); // Admin: Delete resolved inquiry

module.exports = router;
