import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./BlogDetails.css";

import logo from "../assets/logo.png";
import hero from "../assets/home.png";
import Footer from "../components/Footer";

const API_BASE_URL = "http://localhost:5000/api/v1";

function BlogDetails() {
  const navigate = useNavigate();
  const { identifier } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/blogs/${identifier}`);
        setBlog(response.data?.data || null);
      } catch (error) {
        console.error("Failed to fetch blog details:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [identifier]);

  return (
    <div className="blog-details-page">
      <section className="blog-details-hero">
        <img
          src={blog?.featuredImageUrl || hero}
          alt={blog?.title || "Blog"}
          className="blog-details-hero-bg"
        />
        <div className="blog-details-hero-overlay" />

        <header className="blog-details-top-bar">
          <img src={logo} alt="Logo" className="blog-details-logo" />
          <button
            className="blog-details-menu-btn"
            type="button"
            onClick={() => navigate("/menu")}
          >
            &#9776;
          </button>
        </header>

        <div className="blog-details-hero-content">
          <p>{blog?.category?.name || "Blog"}</p>
          <h1>{loading ? "Loading..." : blog?.title || "Blog Not Found"}</h1>
        </div>
      </section>

      <section className="blog-details-content">
        {loading ? (
          <div className="blog-details-empty">Loading blog details...</div>
        ) : !blog ? (
          <div className="blog-details-empty">Blog post not found.</div>
        ) : (
          <div className="blog-details-card">
            <div className="blog-details-meta">
              <span>
                {blog.author?.name ? `By ${blog.author.name}` : "By Admin"}
              </span>
              <span>
                {blog.publishedAt
                  ? new Date(blog.publishedAt).toLocaleDateString()
                  : new Date(blog.createdAt).toLocaleDateString()}
              </span>
              <span>{blog.viewsCount} views</span>
            </div>

            <h2>{blog.title}</h2>
            <p className="blog-details-excerpt">{blog.excerpt}</p>

            <div className="blog-details-body">
              {blog.content?.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {blog.tags?.length > 0 && (
              <div className="blog-details-section">
                <h3>Tags</h3>
                <div className="blog-details-tags">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="blog-details-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {blog.seo && (
              <div className="blog-details-section">
                <h3>SEO Information</h3>
                <div className="blog-details-seo-box">
                  {blog.seo.metaTitle && (
                    <p>
                      <strong>Meta Title:</strong> {blog.seo.metaTitle}
                    </p>
                  )}
                  {blog.seo.metaDescription && (
                    <p>
                      <strong>Meta Description:</strong>{" "}
                      {blog.seo.metaDescription}
                    </p>
                  )}
                  {blog.seo.keywords?.length > 0 && (
                    <p>
                      <strong>Keywords:</strong> {blog.seo.keywords.join(", ")}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="blog-details-actions">
              <button type="button" onClick={() => navigate("/blog")}>
                Back to Blog
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default BlogDetails;