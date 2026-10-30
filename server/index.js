
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/generate", async (req, res) => {
  try {
    const { productName, category } = req.body;

    if (
      typeof productName !== "string" ||
      typeof category !== "string" ||
      !productName.trim() ||
      !category.trim() ||
      productName.length > 150 ||
      category.length > 100
    ) {
      return res.status(400).json({
        error: "Please provide a valid product name and category.",
      });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        error: "Groq API key is not configured.",
      });
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: `You generate product marketing content.
Return only valid JSON with:
- title: a catchy product title that includes the original product name
- description: a short description of two sentences
- keywords: an array of 4 to 6 short keywords
Do not invent unsupported product specifications.`,
            },
            {
              role: "user",
              content: `Product name: ${productName.trim()}
Category: ${category.trim()}`,
            },
          ],
          response_format: { type: "json_object" },
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API status:", response.status);
      console.error("Groq API error:", data);

      return res.status(502).json({
        error: "AI generation failed. Check the backend terminal.",
      });
    }

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content returned by AI.");
    }

    const details = JSON.parse(content);

    if (
      typeof details.title !== "string" ||
      typeof details.description !== "string" ||
      !Array.isArray(details.keywords) ||
      !details.keywords.every(
        (keyword) => typeof keyword === "string"
      )
    ) {
      throw new Error("Invalid AI response format.");
    }

    res.json({
      title: details.title,
      description: details.description,
      keywords: details.keywords.slice(0, 8),
    });
  } catch (error) {
    console.error("Generation error:", error.message);

    res.status(500).json({
      error: "Could not generate product details. Please try again.",
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend running on http://localhost:5000");
});
