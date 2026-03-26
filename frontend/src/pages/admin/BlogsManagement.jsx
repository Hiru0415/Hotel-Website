import { useState, useEffect } from "react";
import { blogsApi } from "../../api/adminApi";
import { useAuth } from "../../context/AuthContext";
import { FiFileText, FiFolder, FiEdit2, FiTrash2, FiLock } from "react-icons/fi";
import ConfirmModal from "./ConfirmModal";

const emptyBlog = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  authorName: "",
  category: "",
  tags: "",
  status: "draft",
  featuredImageUrl: "",
  isFeatured: false,
  seoMetaTitle: "",
  seoMetaDescription: "",
  seoKeywords: "",
};

function BlogsManagement() {
  const { admin } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("blogs");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ ...emptyBlog });
  const [catForm, setCatForm] = useState({
    name: "",
    description: "",
  });
  const [showCatForm, setShowCatForm] = useState(false);
  const [editCatId, setEditCatId] = useState(null);
  const [createCatFromBlogForm, setCreateCatFromBlogForm] = useState(false);
  const [isBlogSlugManuallyEdited, setIsBlogSlugManuallyEdited] =
    useState(false);
  const [alert, setAlert] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null, type: null, action: null, data: null });

  const slugify = (value) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const fetchData = async () => {
    try {
      const [blogsRes, catsRes] = await Promise.allSettled([
        blogsApi.getAll(),
        blogsApi.getCategories(),
      ]);
      const blogsData =
        blogsRes.status === "fulfilled" ? blogsRes.value.data.data : [];
      setBlogs(Array.isArray(blogsData) ? blogsData : blogsData?.docs || []);
      setCategories(
        catsRes.status === "fulfilled" ? catsRes.value.data.data || [] : [],
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showAlertMsg = (msg, type = "success") => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };

  // Blog CRUD
  const openCreateBlog = () => {
    setForm({ ...emptyBlog });
    setEditId(null);
    setIsBlogSlugManuallyEdited(false);
    setShowForm(true);
  };

  const openEditBlog = (blog) => {
    setForm({
      title: blog.title || "",
      slug: blog.slug || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      authorName: blog.authorName || "",
      category: blog.category?._id || blog.category || "",
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
      status: blog.status || "draft",
      featuredImageUrl: blog.featuredImageUrl || "",
      isFeatured: blog.isFeatured || false,
      seoMetaTitle: blog.seo?.metaTitle || "",
      seoMetaDescription: blog.seo?.metaDescription || "",
      seoKeywords: Array.isArray(blog.seo?.keywords)
        ? blog.seo.keywords.join(", ")
        : "",
    });
    setEditId(blog._id);
    setIsBlogSlugManuallyEdited(false);
    setShowForm(true);
  };

  const handleBlogFormSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setConfirmModal({ isOpen: true, action: "update_blog", data: form });
    } else {
      performBlogFormAction(form);
    }
  };

  const performBlogFormAction = async (formData) => {
    const seo = {
      metaTitle: formData.seoMetaTitle.trim(),
      metaDescription: formData.seoMetaDescription.trim(),
      keywords: formData.seoKeywords
        ? formData.seoKeywords.split(",").map((k) => k.trim()).filter(Boolean)
        : [],
    };

    const payload = {
      ...formData,
      slug: slugify(formData.slug),
      tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      authorName: formData.authorName.trim() || undefined,
      seo,
    };

    if (!payload.slug) delete payload.slug;
    delete payload.seoMetaTitle;
    delete payload.seoMetaDescription;
    delete payload.seoKeywords;

    try {
      if (editId) {
        await blogsApi.update(editId, payload);
        showAlertMsg("Blog updated");
      } else {
        await blogsApi.create(payload);
        showAlertMsg("Blog created");
      }
      setShowForm(false);
      fetchData();
    } catch (err) {
      showAlertMsg(err.response?.data?.message || "Operation failed", "error");
    }
  };

  const handleDeleteClick = (id, type) => {
    setConfirmModal({ isOpen: true, id, type, action: "delete" });
  };

  const handleConfirmAction = async () => {
    const { id, type, action, data } = confirmModal;

    if (action === "update_blog") {
      await performBlogFormAction(data);
      setConfirmModal({ isOpen: false, id: null, type: null, action: null, data: null });
      return;
    }
    if (action === "update_cat") {
      await performCatFormAction(data);
      setConfirmModal({ isOpen: false, id: null, type: null, action: null, data: null });
      return;
    }

    if (!id || !type) return;

    try {
      if (type === "blog") {
        await blogsApi.delete(id);
        showAlertMsg("Blog deleted");
      } else if (type === "category") {
        await blogsApi.deleteCategory(id);
        showAlertMsg("Category deleted");
      }
      fetchData();
    } catch (err) {
      showAlertMsg(err.response?.data?.message || "Failed to delete", "error");
    } finally {
      setConfirmModal({ isOpen: false, id: null, type: null, action: null, data: null });
    }
  };

  // Category CRUD
  const openCreateCat = () => {
    setCatForm({ name: "", description: "" });
    setEditCatId(null);
    setCreateCatFromBlogForm(false);
    setShowCatForm(true);
  };

  const openCreateCatFromBlog = () => {
    setCatForm({ name: "", description: "" });
    setEditCatId(null);
    setCreateCatFromBlogForm(true);
    setShowCatForm(true);
  };

  const openEditCat = (cat) => {
    setCatForm({
      name: cat.name || "",
      description: cat.description || "",
    });
    setEditCatId(cat._id);
    setCreateCatFromBlogForm(false);
    setShowCatForm(true);
  };

  const handleCatFormSubmit = (e) => {
    e.preventDefault();
    if (editCatId) {
      setConfirmModal({ isOpen: true, action: "update_cat", data: catForm });
    } else {
      performCatFormAction(catForm);
    }
  };

  const performCatFormAction = async (formData) => {
    const payload = {
      ...formData,
    };

    try {
      if (editCatId) {
        await blogsApi.updateCategory(editCatId, payload);
        showAlertMsg("Category updated");
      } else {
        const res = await blogsApi.createCategory(payload);
        const createdCategoryId = res.data?.data?._id;

        if (createCatFromBlogForm && createdCategoryId) {
          setForm((prev) => ({ ...prev, category: createdCategoryId }));
        }

        showAlertMsg("Category created");
      }
      setCreateCatFromBlogForm(false);
      setShowCatForm(false);
      fetchData();
    } catch (err) {
      showAlertMsg(err.response?.data?.message || "Operation failed", "error");
    }
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
      <h1 className="admin-page-title">Blog Management</h1>
      {alert && (
        <div className={`admin-alert admin-alert-${alert.type}`}>
          {alert.msg}
        </div>
      )}

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === "blogs" ? "active" : ""}`}
          onClick={() => setActiveTab("blogs")}
        >
          Blog Posts ({blogs.length})
        </button>
        <button
          className={`admin-tab ${activeTab === "categories" ? "active" : ""}`}
          onClick={() => setActiveTab("categories")}
        >
          Categories ({categories.length})
        </button>
      </div>

      {activeTab === "blogs" && (
        <div className="admin-table-wrapper">
          <div className="admin-table-header">
            <h3>{blogs.length} post(s)</h3>
            <button
              className="admin-btn admin-btn-primary"
              onClick={openCreateBlog}
            >
              + New Post
            </button>
          </div>
          <div className="table-overflow">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Views</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.length === 0 ? (
                  <tr>
                    <td colSpan="6">
                      <div className="admin-empty-state">
                        <div className="empty-icon">
                          <FiFileText />
                        </div>
                        <p>No blog posts yet</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  blogs.map((b) => (
                    <tr key={b._id}>
                      <td style={{ fontWeight: 500 }}>
                        {b.title}
                        {b.isFeatured && (
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
                      <td>{b.category?.name || "—"}</td>
                      <td>
                        <span className={`status-badge ${b.status}`}>
                          {b.status}
                        </span>
                      </td>
                      <td>{b.viewsCount || 0}</td>
                      <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="admin-actions">
                          <button
                            className="admin-btn-icon"
                            title="Edit"
                            onClick={() => openEditBlog(b)}
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            className="admin-btn-icon"
                            title="Delete"
                            onClick={() => handleDeleteClick(b._id, "blog")}
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
      )}

      {activeTab === "categories" && (
        <div className="admin-table-wrapper">
          <div className="admin-table-header">
            <h3>{categories.length} category(ies)</h3>
            <button
              className="admin-btn admin-btn-primary"
              onClick={openCreateCat}
            >
              + Add Category
            </button>
          </div>
          <div className="table-overflow">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan="5">
                      <div className="admin-empty-state">
                        <div className="empty-icon">
                          <FiFolder />
                        </div>
                        <p>No categories yet</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  categories.map((c) => (
                    <tr key={c._id}>
                      <td style={{ fontWeight: 500 }}>{c.name}</td>
                      <td>{c.description || "—"}</td>
                      <td>
                        <div className="admin-actions">
                          <button
                            className="admin-btn-icon"
                            title="Edit"
                            onClick={() => openEditCat(c)}
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            className="admin-btn-icon"
                            title="Delete"
                            onClick={() => handleDeleteClick(c._id, "category")}
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
      )}

      {/* Blog Form Modal */}
      {showForm && (
        <div className="admin-modal-overlay" onClick={() => setShowForm(false)}>
          <div
            className="admin-modal wide"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h3>{editId ? "Edit Blog Post" : "Create Blog Post"}</h3>
              <button
                className="admin-modal-close"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleBlogFormSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Title</label>
                  <input
                    value={form.title}
                    onChange={(e) => {
                      const nextTitle = e.target.value;
                      setForm((prev) => ({
                        ...prev,
                        title: nextTitle,
                        slug: isBlogSlugManuallyEdited
                          ? prev.slug
                          : slugify(nextTitle),
                      }));
                    }}
                    required
                    maxLength={200}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Slug</label>
                  <input
                    value={form.slug}
                    onChange={(e) => {
                      setIsBlogSlugManuallyEdited(true);
                      setForm({ ...form, slug: e.target.value });
                    }}
                    placeholder="Optional (auto-generated from title if empty)"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Excerpt</label>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) =>
                      setForm({ ...form, excerpt: e.target.value })
                    }
                    required
                    maxLength={500}
                    style={{ minHeight: 60 }}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Content</label>
                  <textarea
                    value={form.content}
                    onChange={(e) =>
                      setForm({ ...form, content: e.target.value })
                    }
                    required
                    style={{ minHeight: 200 }}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Author</label>
                  {/* Read-only info row: shows who is accountable */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "7px 12px",
                      marginBottom: 8,
                      background: "var(--admin-bg-secondary, #1e2130)",
                      border: "1px solid var(--admin-border, #2d3148)",
                      borderRadius: 6,
                      fontSize: "0.8rem",
                      color: "var(--admin-text-muted, #8b92b8)",
                    }}
                  >
                    <FiLock size={12} style={{ flexShrink: 0 }} />
                    <span>Logged in as&nbsp;</span>
                    <strong style={{ color: "var(--admin-text, #e2e8f0)" }}>
                      {admin?.name || "—"}
                    </strong>
                    <span style={{ opacity: 0.55 }}>({admin?.email || admin?.role})</span>
                  </div>
                  {/* Editable custom display name */}
                  <input
                    value={form.authorName}
                    onChange={(e) =>
                      setForm({ ...form, authorName: e.target.value })
                    }
                    placeholder={`Display name (leave blank to use "${admin?.name || "admin name"}")`}
                    maxLength={100}
                  />
                  <p style={{ margin: "4px 0 0", fontSize: "0.72rem", color: "var(--admin-text-muted, #8b92b8)" }}>
                    Optional — enter a custom display name to show on the post (e.g. a pen name or guest author).
                  </p>
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <span>Category</span>
                      <button
                        type="button"
                        className="admin-btn admin-btn-secondary"
                        style={{ padding: "4px 10px", fontSize: "0.75rem" }}
                        onClick={openCreateCatFromBlog}
                      >
                        + New Category
                      </button>
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                      }
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
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
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Tags (comma separated)</label>
                  <input
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    placeholder="hotel, travel, luxury"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Featured Image URL</label>
                  <input
                    value={form.featuredImageUrl}
                    onChange={(e) =>
                      setForm({ ...form, featuredImageUrl: e.target.value })
                    }
                    placeholder="https://images.unsplash.com/photo-xxx.jpg"
                  />
                  <p style={{ margin: "4px 0 6px", fontSize: "0.72rem", color: "var(--admin-text-muted, #8b92b8)" }}>
                    Must be a <strong>direct image link</strong> ending in .jpg, .jpeg, .png, .webp, etc.
                    &nbsp;Not a webpage URL (e.g. unsplash.com/photos/... will not work — use the download/share link instead).
                  </p>
                  {form.featuredImageUrl && (
                    <img
                      src={form.featuredImageUrl}
                      alt="Preview"
                      onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                      onLoad={(e) => { e.target.style.display = "block"; e.target.nextSibling.style.display = "none"; }}
                      style={{
                        width: "100%",
                        height: 160,
                        objectFit: "cover",
                        borderRadius: 8,
                        border: "1px solid var(--admin-border, #2d3148)",
                        display: "block",
                      }}
                    />
                  )}
                  {form.featuredImageUrl && (
                    <div
                      style={{
                        display: "none",
                        height: 60,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 8,
                        border: "1px dashed #e53e3e",
                        color: "#e53e3e",
                        fontSize: "0.8rem",
                        gap: 6,
                      }}
                    >
                      ⚠️ Image failed to load — check the URL is a direct image link
                    </div>
                  )}
                </div>
                <div className="admin-form-group">
                  <label>SEO Meta Title</label>
                  <input
                    value={form.seoMetaTitle}
                    onChange={(e) =>
                      setForm({ ...form, seoMetaTitle: e.target.value })
                    }
                    maxLength={70}
                    placeholder="Optional meta title (max 70 chars)"
                  />
                </div>
                <div className="admin-form-group">
                  <label>SEO Meta Description</label>
                  <textarea
                    value={form.seoMetaDescription}
                    onChange={(e) =>
                      setForm({ ...form, seoMetaDescription: e.target.value })
                    }
                    maxLength={160}
                    placeholder="Optional meta description (max 160 chars)"
                    style={{ minHeight: 70 }}
                  />
                </div>
                <div className="admin-form-group">
                  <label>SEO Keywords (comma separated)</label>
                  <input
                    value={form.seoKeywords}
                    onChange={(e) =>
                      setForm({ ...form, seoKeywords: e.target.value })
                    }
                    placeholder="hotel, beach, luxury stay"
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
                    Featured Post
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
                  {editId ? "Update" : "Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Form Modal */}
      {showCatForm && (
        <div
          className="admin-modal-overlay"
          onClick={() => setShowCatForm(false)}
        >
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editCatId ? "Edit Category" : "Add Category"}</h3>
              <button
                className="admin-modal-close"
                onClick={() => setShowCatForm(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCatFormSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Category Name</label>
                  <input
                    value={catForm.name}
                    onChange={(e) => {
                      setCatForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }));
                    }}
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label>Description</label>
                  <textarea
                    value={catForm.description}
                    onChange={(e) =>
                      setCatForm({ ...catForm, description: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setShowCatForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  {editCatId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={
          confirmModal.action === "update_blog" ? "Confirm Update" :
          confirmModal.action === "update_cat" ? "Confirm Update" :
          confirmModal.type === "category" ? "Delete Category" : "Delete Blog Post"
        }
        message={
          confirmModal.action === "update_blog" ? "Are you sure you want to update this blog post?" :
          confirmModal.action === "update_cat" ? "Are you sure you want to update this category?" :
          confirmModal.type === "category" ? "Are you sure you want to delete this category?" : "Are you sure you want to delete this blog post? This action cannot be undone."
        }
        onConfirm={handleConfirmAction}
        onCancel={() => setConfirmModal({ isOpen: false, id: null, type: null, action: null, data: null })}
        confirmText={
          confirmModal.action === "update_blog" || confirmModal.action === "update_cat" ? "Update" : "Delete"
        }
        intent={
          confirmModal.action === "update_blog" || confirmModal.action === "update_cat" ? "info" : "danger"
        }
      />
    </div>
  );
}

export default BlogsManagement;
