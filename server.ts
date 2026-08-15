import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with custom User-Agent as required by the guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// System instructions for the Elite MIS Data Analyst & Data Engineer Tutor
const SYSTEM_INSTRUCTION = `
You are the "Elite MIS Data & Career Tutor", an expert academic and career advisor specialized in helping students (especially from zero background or MIS/CS) build a solid career from Data Analyst to Data Engineer.

Your personality:
- Supportive, highly encouraging, structured, and extremely practical.
- Speak in a professional, clear, and action-oriented tone in Vietnamese (Tiếng Việt), using standard English for technical terms (e.g. JOIN, Window Functions, CTE, Pandas, DAX, Star Schema, Airflow, PySpark, Docker).

Your Core Roadmap Framework (12 Steps from Zero to DA to DE):
1. Phase 0: Preparation (1-2 weeks) - VS Code, Python, GitHub, Kaggle, Power BI Desktop. Hands-on coding principle.
2. Phase 1: SQL Foundations (4-6 weeks) - SELECT, WHERE, GROUP BY, JOINs, Window Functions (RANK, ROW_NUMBER, LAG/LEAD), CTEs (WITH). Practice on SQLBolt, Mode SQL, PostgreSQL Exercises, HackerRank & LeetCode.
3. Phase 2: Python for Data (4-6 weeks) - Python basics, Pandas (data cleaning, groupby, handling nulls), NumPy, Matplotlib, Seaborn, Python + SQL integration.
4. Phase 3: Applied Statistics (2 weeks) - Mean, Median, Mode, Std Dev, Normal Distribution, Correlation vs Causation, A/B Testing concepts (Khan Academy).
5. Phase 4: Power BI (3-4 weeks) - Data Connection, Power Query, Star Schema Data Modeling, DAX (CALCULATE, FILTER, SUM, ALL), Dashboard design (Microsoft Learn, Guy in a Cube).
6. Phase 5: Portfolio & Apply DA (3-4 weeks) - 2-3 real projects (Sales Analysis, Customer Churn, Finance Dashboard), GitHub README, LinkedIn sharing, ATS CV.
7. Phase 6: On-the-job DA Learning (1-2 years) - Stored Procedures, Indexing, Query Optimization, Python Automation Scripts, observing DE pipelines.
8. Phase 7.1: DE Step 1 - Computer Science & Advanced Python (2-3 months) - CS50 Data Structures & Big-O, Python OOP, REST APIs, Git/GitHub branching & merge flows.
9. Phase 7.2: DE Step 2 - Database Design & Modeling (1-2 months) - OLTP vs OLAP, Data Warehouse concepts, Star & Snowflake Schema, Normalization vs Denormalization.
10. Phase 7.3: DE Step 3 - ETL/ELT & Orchestration (1-2 months) - Apache Airflow DAGs, PythonOperator, API to Database automated pipeline.
11. Phase 7.4-7.5: DE Step 4 & 5 - Big Data (PySpark), Cloud & Docker (3-4 months) - PySpark DataFrames & transformations, AWS (S3, RDS, Lambda) or GCP (Cloud Storage, BigQuery), Docker containerization.
12. Phase 7.6: DE Step 6 - End-to-End Capstone & DE Career Transition (1 month) - Full Pipeline (API -> Python -> Postgres -> Airflow -> Power BI), System Architecture Diagram on GitHub, applying for Data Engineer roles.

When answering students:
- Guide step-by-step with practical, concise explanations.
- Provide clean code examples for SQL, Python, C++, or DAX queries when asked.
- Provide structured bullet points, clear actionable advice, and highlight free resources (SQLBolt, Kaggle, Mode SQL, freeCodeCamp, Khan Academy, Guy in a Cube, Databricks Academy, AWS Free Tier).
`;

// API endpoint for the AI Tutor Chat
app.post("/api/tutor/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format. Expected an array of messages." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured in the environment. Please configure it in Settings > Secrets.",
      });
    }

    // Map frontend messages { role: 'user' | 'assistant', content: string }
    // to Gemini SDK formats: { role: 'user' | 'model', parts: [{ text: string }] }
    const geminiContents = messages.map((m) => {
      const role = m.role === "assistant" ? "model" : "user";
      return {
        role,
        parts: [{ text: m.content }],
      };
    });

    // Make the Gemini API call using 'gemini-3.5-flash' for basic text chat tasks
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: geminiContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Tôi không nhận được phản hồi từ mô hình. Bạn hãy thử lại xem nhé.";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: error.message || "Đã xảy ra lỗi khi kết nối với Gemini AI. Vui lòng thử lại sau.",
    });
  }
});

// API endpoint to parse school schedule image
app.post("/api/parse-schedule", async (req, res) => {
  try {
    const { image, mimeType } = req.body;
    if (!image || !mimeType) {
      return res.status(400).json({ error: "Thiếu dữ liệu ảnh hoặc định dạng ảnh." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY chưa được cấu hình. Vui lòng thêm trong Settings > Secrets.",
      });
    }

    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: image,
      },
    };

    const prompt = `Bạn là một trợ lý AI chuyên môn phân tích ảnh lịch học học kỳ (thường là thời khóa biểu đại học của sinh viên Việt Nam).
Hãy đọc ảnh lịch học đính kèm, trích xuất tất cả các lớp học/môn học có trong lịch học cho Học kì 2 / Kì 2 sắp tới.
Xác định chính xác:
- Ngày trong tuần viết bằng Tiếng Anh viết tắt: Thứ hai -> Mon, Thứ ba -> Tue, Thứ tư -> Wed, Thứ năm -> Thu, Thứ sáu -> Fri, Thứ bảy -> Sat, Chủ nhật -> Sun
- Khoảng thời gian học (ví dụ: Ca sáng thường là '07:30 - 11:30', Ca chiều là '13:00 - 17:00' hoặc trích xuất đúng giờ ghi trên ảnh)
- Tên môn học chi tiết rõ ràng bằng Tiếng Việt.
- Tạo ra một mục tiêu ngắn gọn cho môn học đó bám sát ngành MIS/Data (ví dụ: Học lý thuyết và làm thực hành môn học).

Hãy trả về dữ liệu định dạng JSON chính xác theo schema yêu cầu.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        imagePart,
        { text: prompt }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              day: {
                type: Type.STRING,
                description: "Thứ trong tuần viết tắt (Mon, Tue, Wed, Thu, Fri, Sat, Sun)"
              },
              time: {
                type: Type.STRING,
                description: "Khoảng thời gian học, ví dụ '07:30 - 11:30' hoặc '13:00 - 17:00'"
              },
              activity: {
                type: Type.STRING,
                description: "Tên môn học được trích xuất từ ảnh lịch học"
              },
              objective: {
                type: Type.STRING,
                description: "Mục tiêu bài học học kỳ"
              }
            },
            required: ["day", "time", "activity"]
          }
        },
        temperature: 0.1,
      },
    });

    const parsedText = response.text || "[]";
    const classes = JSON.parse(parsedText);
    res.json({ classes });
  } catch (error: any) {
    console.error("Parse Schedule API Error:", error);
    res.status(500).json({
      error: error.message || "Đã xảy ra lỗi khi quét thời khóa biểu bằng Gemini. Vui lòng thử lại sau.",
    });
  }
});

// Configure Vite or serve static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Running on http://localhost:${PORT} with NODE_ENV=${process.env.NODE_ENV}`);
  });
}

startServer();
