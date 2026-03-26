import { useState, useEffect } from "react";
import { offersApi, roomsApi } from "../../api/adminApi";
import { FiGift, FiEdit2, FiTrash2 } from "react-icons/fi";
import ConfirmModal from "./ConfirmModal";

const offerTypes = [
  "percentage",
  "fixed_amount",
  "special_package",
  "seasonal",
  "early_bird",
  "last_minute",
];
const statuses = ["draft", "active", "inactive", "expired"];

const emptyOffer = {
  title: "",
  description: "",
  offerType: "percentage",
  discountPercentage: "",
  discountAmount: "",
  validFrom: "",
  validTo: "",
  termsAndConditions: "",
  code: "",
  status: "draft",
  isFeatured: false,
  imageUrl: "",
  priority: 0,
  usageLimit: "",
  minBookingDays: 1,
  maxBookingDays: "",
  applicableRooms: [],
  usageCount: 0,
};

function OffersManagement() {
  const [offers, setOffers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ ...emptyOffer });
  const [alert, setAlert] = useState(null);
  const [filter, setFilter] = useState("all");
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    action: null,
    data: null,
  });

  const fetchOffers = async () => {
    try {
      const res = await offersApi.getAll();
      const data = res.data.data;
      setOffers(Array.isArray(data) ? data : data?.docs || []);
    } catch (err) {
      console.error("Failed to fetch offers:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await roomsApi.getAll();
      setRooms(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch rooms:", err);
      setRooms([]);
    }
  };

  useEffect(() => {
    fetchOffers();
    fetchRooms();
  }, []);

  const showAlertMsg = (msg, type = "success") => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const openCreate = () => {
    setForm({ ...emptyOffer });
    setEditId(null);
    setShowForm(true);
  };

  const openEdit = (offer) => {
    setForm({
      title: offer.title || "",
      description: offer.description || "",
      offerType: offer.offerType || "percentage",
      discountPercentage: offer.discountPercentage ?? "",
      discountAmount: offer.discountAmount ?? "",
      validFrom: offer.validFrom ? offer.validFrom.split("T")[0] : "",
      validTo: offer.validTo ? offer.validTo.split("T")[0] : "",
      termsAndConditions: offer.termsAndConditions || "",
      code: offer.code || "",
      status: offer.status || "draft",
      isFeatured: offer.isFeatured || false,
      imageUrl: offer.imageUrl || "",
      priority: offer.priority || 0,
      usageLimit: offer.usageLimit ?? "",
      minBookingDays: offer.minBookingDays || 1,
      maxBookingDays: offer.maxBookingDays ?? "",
      applicableRooms: (offer.applicableRooms || []).map((room) =>
        typeof room === "string" ? room : room._id,
      ),
      usageCount: offer.usageCount ?? 0,
    });
    setEditId(offer._id);
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setConfirmModal({ isOpen: true, action: "update", data: form });
    } else {
      performFormAction(form);
    }
  };

  const validateForm = (data) => {
    if (!data.validFrom || !data.validTo) {
      return "Please provide both valid from and valid to dates";
    }

    if (new Date(data.validTo) <= new Date(data.validFrom)) {
      return "Valid to date must be after valid from date";
    }

    if (data.offerType === "percentage" && !data.discountPercentage) {
      return "Discount percentage is required for percentage offers";
    }

    if (data.offerType === "fixed_amount" && !data.discountAmount) {
      return "Discount amount is required for fixed amount offers";
    }

    if (
      data.maxBookingDays &&
      Number(data.maxBookingDays) < Number(data.minBookingDays)
    ) {
      return "Max booking days must be greater than or equal to min booking days";
    }

    return null;
  };

  const buildPayload = (formData) => {
    const payload = { ...formData };

    payload.title = payload.title.trim();
    payload.description = payload.description.trim();
    payload.termsAndConditions = payload.termsAndConditions.trim();

    payload.code = payload.code?.trim().toUpperCase();
    if (!payload.code) delete payload.code;

    payload.priority = Number(payload.priority) || 0;
    payload.minBookingDays = Number(payload.minBookingDays) || 1;

    if (payload.discountPercentage !== "") {
      payload.discountPercentage = Number(payload.discountPercentage);
    } else {
      delete payload.discountPercentage;
    }

    if (payload.discountAmount !== "") {
      payload.discountAmount = Number(payload.discountAmount);
    } else {
      delete payload.discountAmount;
    }

    if (payload.usageLimit !== "") {
      payload.usageLimit = Number(payload.usageLimit);
    } else {
      delete payload.usageLimit;
    }

    if (payload.maxBookingDays !== "") {
      payload.maxBookingDays = Number(payload.maxBookingDays);
    } else {
      delete payload.maxBookingDays;
    }

    if (payload.offerType === "percentage") {
      delete payload.discountAmount;
    }

    if (payload.offerType === "fixed_amount") {
      delete payload.discountPercentage;
    }

    if (
      payload.offerType !== "percentage" &&
      payload.offerType !== "fixed_amount"
    ) {
      delete payload.discountPercentage;
      delete payload.discountAmount;
    }

    payload.applicableRooms = (payload.applicableRooms || []).filter(Boolean);
    if (!payload.applicableRooms.length) {
      delete payload.applicableRooms;
    }

    delete payload.usageCount;

    return payload;
  };

  const performFormAction = async (formData) => {
    const formError = validateForm(formData);
    if (formError) {
      showAlertMsg(formError, "error");
      return;
    }

    const payload = buildPayload(formData);

    try {
      if (editId) {
        await offersApi.update(editId, payload);
        showAlertMsg("Offer updated");
      } else {
        await offersApi.create(payload);
        showAlertMsg("Offer created");
      }
      setShowForm(false);
      fetchOffers();
    } catch (err) {
      showAlertMsg(err.response?.data?.message || "Operation failed", "error");
    }
  };

  const handleDeleteClick = (id) => {
    setConfirmModal({ isOpen: true, action: "delete", data: id });
  };

  const handleConfirmAction = async () => {
    const { action, data } = confirmModal;
    if (!action) return;

    if (action === "delete") {
      try {
        await offersApi.delete(data);
        showAlertMsg("Offer deleted");
        fetchOffers();
      } catch (err) {
        showAlertMsg(
          err.response?.data?.message || "Failed to delete",
          "error",
        );
      } finally {
        setConfirmModal({ isOpen: false, action: null, data: null });
      }
    } else if (action === "update") {
      await performFormAction(data);
      setConfirmModal({ isOpen: false, action: null, data: null });
    }
  };

  const filtered =
    filter === "all" ? offers : offers.filter((o) => o.status === filter);

  const getStatusCount = (status) =>
    status === "all"
      ? offers.length
      : offers.filter((offer) => offer.status === status).length;

  const activeRooms = rooms.filter((room) => room.isActive !== false);
  const deactivatedRooms = rooms.filter((room) => room.isActive === false);

  const toggleApplicableRoom = (roomId) => {
    setForm((prev) => {
      const selected = new Set(prev.applicableRooms || []);
      if (selected.has(roomId)) {
        selected.delete(roomId);
      } else {
        selected.add(roomId);
      }
      return { ...prev, applicableRooms: Array.from(selected) };
    });
  };

  if (loading) {
    return (
      <div
        className="admin-loading-screen"
        style={{ height: "50vh", background: "transparent" }}
      >
        <div className="admin-spinner" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="admin-page-title">Offers</h1>
      {alert && (
        <div className={`admin-alert admin-alert-${alert.type}`}>
          {alert.msg}
        </div>
      )}

      <div className="admin-tabs">
        {["all", ...statuses].map((f) => (
          <button
            key={f}
            className={`admin-tab ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1).replace("_", " ")} (
            {getStatusCount(f)})
          </button>
        ))}
      </div>

      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h3>{filtered.length} offer(s)</h3>
          <button className="admin-btn admin-btn-primary" onClick={openCreate}>
            + Add Offer
          </button>
        </div>
        <div className="table-overflow">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Discount</th>
                <th>Valid</th>
                <th>Code</th>
                <th>Usage</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="8">
                    <div className="admin-empty-state">
                      <div className="empty-icon">
                        <FiGift />
                      </div>
                      <p>No offers found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((o) => (
                  <tr key={o._id}>
                    <td style={{ fontWeight: 500 }}>
                      {o.title}
                      {o.isFeatured && (
                        <span
                          style={{
                            marginLeft: 6,
                            fontSize: "0.7rem",
                            background: "#cda92f",
                            color: "#111",
                            padding: "2px 6px",
                            borderRadius: 4,
                          }}
                        >
                          Featured
                        </span>
                      )}
                    </td>
                    <td style={{ textTransform: "capitalize" }}>
                      {o.offerType?.replace("_", " ")}
                    </td>
                    <td>
                      {o.discountPercentage
                        ? `${o.discountPercentage}%`
                        : o.discountAmount
                          ? `LKR ${o.discountAmount}`
                          : "—"}
                    </td>
                    <td style={{ fontSize: "0.8rem" }}>
                      {o.validFrom &&
                        new Date(o.validFrom).toLocaleDateString()}{" "}
                      → {o.validTo && new Date(o.validTo).toLocaleDateString()}
                    </td>
                    <td>{o.code || "—"}</td>
                    <td>
                      {o.usageCount || 0}
                      {o.usageLimit ? ` / ${o.usageLimit}` : ""}
                    </td>
                    <td>
                      <span className={`status-badge ${o.status}`}>
                        {o.status}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button
                          className="admin-btn-icon"
                          title="Edit"
                          onClick={() => openEdit(o)}
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="admin-btn-icon"
                          title="Delete"
                          onClick={() => handleDeleteClick(o._id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {showForm && (
        <div className="admin-modal-overlay" onClick={() => setShowForm(false)}>
          <div
            className="admin-modal wide"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h3>{editId ? "Edit Offer" : "Create Offer"}</h3>
              <button
                className="admin-modal-close"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Title</label>
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    required
                    maxLength={150}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Offer Type</label>
                    <select
                      value={form.offerType}
                      onChange={(e) =>
                        setForm({ ...form, offerType: e.target.value })
                      }
                    >
                      {offerTypes.map((t) => (
                        <option key={t} value={t}>
                          {t.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label>Status</label>
                    <select
                      value={form.status}
                      onChange={(e) =>
                        setForm({ ...form, status: e.target.value })
                      }
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Discount Percentage (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={form.discountPercentage}
                      onChange={(e) =>
                        setForm({ ...form, discountPercentage: e.target.value })
                      }
                      disabled={form.offerType !== "percentage"}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Discount Amount (LKR)</label>
                    <input
                      type="number"
                      min="0"
                      value={form.discountAmount}
                      onChange={(e) =>
                        setForm({ ...form, discountAmount: e.target.value })
                      }
                      disabled={form.offerType !== "fixed_amount"}
                    />
                  </div>
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Valid From</label>
                    <input
                      type="date"
                      value={form.validFrom}
                      onChange={(e) =>
                        setForm({ ...form, validFrom: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Valid To</label>
                    <input
                      type="date"
                      value={form.validTo}
                      onChange={(e) =>
                        setForm({ ...form, validTo: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Promo Code</label>
                    <input
                      value={form.code}
                      onChange={(e) =>
                        setForm({ ...form, code: e.target.value.toUpperCase() })
                      }
                      placeholder="e.g. SUMMER25"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Usage Limit</label>
                    <input
                      type="number"
                      min="0"
                      value={form.usageLimit}
                      onChange={(e) =>
                        setForm({ ...form, usageLimit: e.target.value })
                      }
                      placeholder="Unlimited"
                    />
                  </div>
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Min Booking Days</label>
                    <input
                      type="number"
                      min="1"
                      value={form.minBookingDays}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          minBookingDays: parseInt(e.target.value) || 1,
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Max Booking Days</label>
                    <input
                      type="number"
                      min={form.minBookingDays || 1}
                      value={form.maxBookingDays}
                      onChange={(e) =>
                        setForm({ ...form, maxBookingDays: e.target.value })
                      }
                      placeholder="No maximum"
                    />
                  </div>
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Priority</label>
                    <input
                      type="number"
                      min="0"
                      value={form.priority}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          priority: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Usage Count</label>
                    <input type="number" value={form.usageCount} disabled />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Applicable Rooms</label>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(160px, 1fr))",
                      gap: "8px",
                    }}
                  >
                    {activeRooms.length === 0 ? (
                      <div style={{ color: "#999", fontSize: "0.9rem" }}>
                        No active rooms available. Leave blank for all rooms.
                      </div>
                    ) : (
                      activeRooms.map((room) => {
                        const isChecked = (form.applicableRooms || []).includes(
                          room._id,
                        );
                        return (
                          <label
                            key={room._id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              cursor: "pointer",
                              fontSize: "0.9rem",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleApplicableRoom(room._id)}
                              style={{ width: "auto" }}
                            />
                            {room.roomType}
                          </label>
                        );
                      })
                    )}
                  </div>
                  {deactivatedRooms.length > 0 && (
                    <>
                      <div
                        style={{
                          marginTop: "10px",
                          fontSize: "0.82rem",
                          color: "#777",
                          fontWeight: 500,
                        }}
                      >
                        Deactivated Rooms (read-only)
                      </div>
                      <div
                        style={{
                          marginTop: "8px",
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(160px, 1fr))",
                          gap: "8px",
                        }}
                      >
                        {deactivatedRooms.map((room) => {
                          const isChecked = (
                            form.applicableRooms || []
                          ).includes(room._id);

                          return (
                            <label
                              key={room._id}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                fontSize: "0.9rem",
                                opacity: 0.7,
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                disabled
                                readOnly
                                style={{ width: "auto" }}
                              />
                              {room.roomType} (deactivated)
                            </label>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
                <div className="admin-form-group">
                  <label>Image URL</label>
                  <input
                    value={form.imageUrl}
                    onChange={(e) =>
                      setForm({ ...form, imageUrl: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
                <div className="admin-form-group">
                  <label>Terms & Conditions</label>
                  <textarea
                    value={form.termsAndConditions}
                    onChange={(e) =>
                      setForm({ ...form, termsAndConditions: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={form.isFeatured}
                      onChange={(e) =>
                        setForm({ ...form, isFeatured: e.target.checked })
                      }
                      style={{ width: "auto" }}
                    />
                    Featured Offer
                  </label>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  {editId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={
          confirmModal.action === "update" ? "Confirm Update" : "Delete Offer"
        }
        message={
          confirmModal.action === "update"
            ? "Are you sure you want to update this offer's details?"
            : "Are you sure you want to delete this offer? This action cannot be undone."
        }
        onConfirm={handleConfirmAction}
        onCancel={() =>
          setConfirmModal({ isOpen: false, action: null, data: null })
        }
        confirmText={confirmModal.action === "update" ? "Update" : "Delete"}
        intent={confirmModal.action === "update" ? "info" : "danger"}
      />
    </div>
  );
}

export default OffersManagement;
