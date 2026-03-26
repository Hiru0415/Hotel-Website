import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { blogApi } from "../api/api";
import "./Blog.css";

import logo from "../assets/logo.png";
import hero from "../assets/home.png";
import Footer from "../components/Footer";

function BlogCard({ blog, onClick }) {
  return (
    <div className="blog-card" onClick={onClick}>
      {blog.featuredImageUrl ? (
        <img
          src={blog.featuredImageUrl}
          alt={blog.title}
          className="blog-card-image"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      ) : null}
      <div
        className="blog-card-image-placeholder"
        style={{ display: blog.featuredImageUrl ? "none" : "flex" }}
      >
        No Image
      </div>

      <div className="blog-card-body">
        <div className="blog-card-top">
          <span className="blog-category">
            {blog.category?.name || "Uncategorized"}
          </span>
          {blog.isFeatured && (
            <span className="blog-featured-badge">Featured</span>
          )}
        </div>

        <h2>{blog.title}</h2>
        <p>{blog.excerpt}</p>

        <div className="blog-meta">
          <span>
            {blog.authorName || blog.author?.name
              ? `By ${blog.authorName || blog.author.name}`
              : "By Admin"}
          </span>
          <span>
            {blog.publishedAt
              ? new Date(blog.publishedAt).toLocaleDateString()
              : new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

function Blog() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await blogApi.getCategories();
      setCategories(response.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const params = {
        page,
        limit: 6,
      };

      if (search.trim()) params.search = search.trim();
      if (selectedCategory) params.category = selectedCategory;
      if (featuredOnly) params.isFeatured = true;

      const response = await blogApi.getAll(params);

      const blogData = response.data?.data;
      setBlogs(blogData?.docs || []);
      setTotalPages(blogData?.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [page, selectedCategory, featuredOnly]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchBlogs();
  };

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setFeaturedOnly(false);
    setPage(1);
  };

  const handleOpenBlog = (blog) => {
    navigate(`/blog/${blog.slug || blog._id}`);
  };

  return (
    <div className="blog-page">
      <section className="blog-hero">
        <img src={hero} alt="Blog" className="blog-hero-bg" />
        <div className="blog-hero-overlay" />

        <header className="blog-top-bar">
          <img src={logo} alt="Logo" className="blog-logo" />
          <button
            className="blog-menu-btn"
            type="button"
            onClick={() => navigate("/menu")}
          >
            &#9776;
          </button>
        </header>

        <div className="blog-hero-content">
          <p>Stories, updates & insights</p>
          <h1>Blog</h1>
        </div>
      </section>

      <section className="blog-filter-section">
        <form className="blog-filter-bar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <label className="featured-toggle">
            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={(e) => {
                setFeaturedOnly(e.target.checked);
                setPage(1);
              }}
            />
            Featured only
          </label>

          <button type="submit">Search</button>
          <button
            type="button"
            className="reset-btn"
            onClick={handleResetFilters}
          >
            Reset
          </button>
        </form>
      </section>

      <section className="blog-content">
        {loading ? (
          <div className="blog-empty-state">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="blog-empty-state">No blog posts found.</div>
        ) : (
          <div className="blog-grid">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                onClick={() => handleOpenBlog(blog)}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="blog-pagination">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Blog;
