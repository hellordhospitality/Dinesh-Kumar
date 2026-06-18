import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser limit increased for base64 audits or uploads
  app.use(express.json({ limit: "15mb" }));

  // Shared Gemini client setup
  const apiKey = process.env.GEMINI_API_KEY || "";
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // --- API ROUTES ---

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "RD Hospitality Marketing Core" });
  });

  // AI Content Generator endpoint
  app.post("/api/ai/generate", async (req, res) => {
    try {
      const { type, hotelName, hotelType, topic, keyword, platform, tone } = req.body;

      if (!ai) {
        return res.status(400).json({ 
          error: "Gemini API client not initialized. Please ensure GEMINI_API_KEY is configured in Settings > Secrets." 
        });
      }

      let systemPrompt = "You are an elite hospitality marketing strategist working for RD Hospitality Marketing agency, crafting custom content for luxury resorts, boutique villas, and camps.";
      let contentPrompt = "";

      const selectedTone = tone || "luxurious, appealing, professional";

      switch (type) {
        case "social":
          contentPrompt = `Generate a captivating ${platform || "Instagram"} caption for "${hotelName}" (a ${hotelType || "boutique resort"}).
          Theme/Topic: ${topic || "A serene sunset experience with custom artisan mocktails by the infinity pool"}.
          Tone: ${selectedTone}.
          Target audience: Premium travelers, family vacations, couples, luxury escapists.
          Keywords to include: ${keyword || "luxury travel, serene escape, hospitality"}.
          Include:
          1. A highly engaging Hook line
          2. Elegant narrative with luxurious detail
          3. A strong, elegant Call To Action (CTA) pointing to the link in bio for direct booking benefits (e.g. comp breakfast or spa credits)
          4. Fully tailored, non-generic hashtags.
          Format the output beautiful with spacing and bullet points.`;
          break;

        case "blog":
          contentPrompt = `Generate an SEO-optimized travel blog or destination guide article for "${hotelName}" (a ${hotelType || "boutique resort"}).
          Topic/Focus: ${topic || "Top 5 Hidden Gems to Discover near our villa"}.
          Key Target Concept: ${keyword || "boutique villa experience, weekend getaway"}.
          Tone: ${selectedTone}.
          Please return:
          - A catchy, click-worthy search engine optimized Title
          - A high-level introductory paragraph capturing the essence of local wonder
          - 3 structured subtopics with bullet points or concise paragraphs
          - An inviting, warm conclusion with a booking call-to-action details (such as direct web discount for best available rate).`;
          break;

        case "gmb":
          contentPrompt = `Create a compelling Google Business Profile (GMB) Post for "${hotelName}" to capture local search visibility.
          Topic/Announcement: ${topic || "Seasonal Summer Retreat Package including exclusive spa therapies"}.
          Tone: ${selectedTone}.
          Target keywords: ${keyword || "hotel packages, local sightseeing"}.
          Format as:
          - Announcement header
          - Body content (with bullet points of the inclusion parameters)
          - Button Recommendation: 'Book Now' / 'Learn More' with custom website tracking URL recommendation.`;
          break;

        case "email":
          contentPrompt = `Create an exceptional Email Newsletter or Promotional Campaign sequence for "${hotelName}".
          Offer/Topic: ${topic || "Exclusive early bird 20% discount on villa bookings with gourmet chef table inclusions"}.
          Tone: ${selectedTone}.
          Please output:
          - 3 high-performance Subject Lines (with high open rate potential using personalization tags)
          - A beautiful email body content with elegant greeting, enticing hospitality description, booking CTA block, and email footer.`;
          break;

        case "whatsapp":
          contentPrompt = `Create a brief, high-conversion WhatsApp Broadcast message for "${hotelName}" group CRM list.
          Context: ${topic || "Last-minute weekend villa vacancy alerts with free organic farm-to-table lunch package"}.
          Include emoji formatting to make it scannable, a custom booking link placeholder, and a clear 'Reply with 1 to have sales call back' instructions. Keep it compact, elite, conversational, and direct.`;
          break;

        case "reply_generator":
          const { reviewAuthor, reviewText, starRating } = req.body;
          contentPrompt = `Draft a warm, professional, personalized response from the General Manager of "${hotelName}" to a guest Google/Tripadvisor review:
          Guest Name: "${reviewAuthor || "Guest"}"
          Star Rating: ${starRating || 5}/5 stars
          Review Content: "${reviewText || "Amazing stay! The hospitality was world-class, clean suites, and spectacular beach dinner."}"
          Tone: ${selectedTone}.
          Guidelines:
          - Acknowledge their feedback directly with deep gratitude.
          - Call out their specific callouts (e.g., mention food, cleanliness, or scenic sunsets depending on their review content).
          - Invite them to return soon.
          - Maintain elite, high-touch hospitality standards. Avoid generic formulas.`;
          break;

        default:
          contentPrompt = `Write an inspiring hospitality summary overview for ${hotelName} focusing on ${topic || "sustainable luxury"}.`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contentPrompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.8,
        },
      });

      const text = response.text || "No response generated by Gemini AI.";
      res.json({ output: text });
    } catch (error: any) {
      console.error("Gemini formulation error:", error);
      res.status(500).json({ error: error.message || "An error occurred with Gemini AI." });
    }
  });

  // Website Audit calculation endpoint
  app.post("/api/audit", (req, res) => {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "Website URL is required for audit" });
    }

    // Seed realistic audit score based on hash of URL
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
      hash = url.charCodeAt(i) + ((hash << 5) - hash);
    }
    const seed = Math.abs(hash);

    const seoScore = 70 + (seed % 25); // 70 - 95
    const speedScore = 65 + ((seed >> 2) % 30); // 65 - 95
    const mobileScore = 72 + ((seed >> 4) % 24); // 72 - 96

    const issues = [];
    if (seoScore < 90) {
      issues.push({
        category: "SEO",
        message: "Missing 'h1' on hompage landing view. Search bots require strict structured heading trees.",
        severity: "critical"
      });
      issues.push({
        category: "SEO",
        message: "Alt attributes missing on 8 luxury slider photos. Pinterest/Google Image traffic will fail to rank.",
        severity: "warning"
      });
    } else {
      issues.push({
        category: "SEO",
        message: "No canonical tags declared on individual room package pages.",
        severity: "info"
      });
    }

    if (speedScore < 85) {
      issues.push({
        category: "Performance",
        message: "4MB hero background JPEG detected. Recommend WebP compression and lazy-loading or dynamic CDN.",
        severity: "critical"
      });
      issues.push({
        category: "Performance",
        message: "Unused CSS modules imported via PMS booking engine widget block page-rendering.",
        severity: "warning"
      });
    }

    if (mobileScore < 88) {
      issues.push({
        category: "Mobile",
        message: "The 'Book Now' quick bar overflows screen borders on iPhone 13 Safari viewports.",
        severity: "critical"
      });
    }

    // Static responsive tags parsed mock
    const metaTags = {
      title: `${url.replace(/https?:\/\/(www\.)?/, "").split(".")[0].toUpperCase()} | Luxury Stay Resort Bookings`,
      description: "Experience boutique luxury rooms with five-star amenities, chef table fine dining, nature wilderness treks, and customized butler assistance. Book direct only.",
      ogImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      schemaValid: seed % 2 === 0
    };

    res.json({
      url,
      seoScore,
      speedScore,
      mobileScore,
      issues,
      metaTags
    });
  });

  // --- DEV & PRODUCTION SETUP ---

  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite development server middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA Fallback for client side routes
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[RD Growth System Server] listening on http://localhost:${PORT}`);
  });
}

startServer();
