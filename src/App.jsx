
import { useState } from "react";
import "./App.css";

function App() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Fashion");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setProduct(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productName,
            category,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate details");
      }

      setProduct(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <h1>AI Product Card Generator</h1>
      <p>Generate product content using AI.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="productName">Product Name</label>

        <input
          id="productName"
          type="text"
          placeholder="Enter product name"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
          required
        />

        <label htmlFor="category">Category</label>

        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="Fashion">Fashion</option>
          <option value="Electronics">Electronics</option>
          <option value="Home & Living">Home & Living</option>
          <option value="Beauty">Beauty</option>
          <option value="Sports">Sports</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Generating with AI..." : "Generate Details"}
        </button>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>AI is creating your product details. Please wait...</p>
          </div>
        )}
      </form>

      {error && <p className="error">{error}</p>}

      {product && (
        <div className="product-card">
          <span className="category">{category}</span>

          <h2>{product.title}</h2>

          <p>{product.description}</p>

          <h3>Keywords</h3>

          <div className="tags">
            {product.keywords.map((keyword, index) => (
              <span className="tag" key={`${keyword}-${index}`}>
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
