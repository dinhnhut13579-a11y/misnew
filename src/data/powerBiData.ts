export interface SQLTopicAnalysis {
  id: string;
  topic: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  daImportance: number; // 1-100 score
  deImportance: number; // 1-100 score
  estHoursToMaster: number;
  keyKeywords: string[];
  description: string;
  practicePlatforms: { name: string; url: string }[];
  sampleQuery: string;
  commonInterviewQuestions: string[];
}

export interface SkillRequirement {
  id: string;
  name: string;
  category: "Database & SQL" | "Programming" | "BI & Visualization" | "Data Engineering" | "Cloud & DevOps" | "AI & Analytics";
  daWeight: number; // Weight % for DA role
  deWeight: number; // Weight % for DE role
  demandScore: number; // Market demand 1-100
  learningHours: number;
  priorityLevel: "P0 (Must Have)" | "P1 (High)" | "P2 (Medium)" | "P3 (Advanced)";
  description: string;
  bestResources: string[];
}

export const SQL_TOPICS_ANALYSIS: SQLTopicAnalysis[] = [
  {
    id: "sql-1",
    topic: "Cú Pháp Cơ Bản & Lọc Dữ Liệu (SELECT, WHERE, ORDER BY, LIMIT)",
    difficulty: "Beginner",
    daImportance: 95,
    deImportance: 80,
    estHoursToMaster: 10,
    keyKeywords: ["SELECT", "WHERE", "ORDER BY", "DISTINCT", "AND/OR/NOT", "IN", "BETWEEN", "LIKE"],
    description: "Nền tảng đầu tiên để truy vấn và trích xuất dữ liệu từ các bảng quan hệ.",
    practicePlatforms: [
      { name: "SQLBolt (Bài 1-5)", url: "https://sqlbolt.com/" },
      { name: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial/" }
    ],
    sampleQuery: `SELECT product_name, category, price 
FROM products 
WHERE price > 100 AND category IN ('Electronics', 'Mobile')
ORDER BY price DESC 
LIMIT 10;`,
    commonInterviewQuestions: [
      "Khác biệt giữa WHERE và HAVING trong SQL?",
      "Làm sao lọc chuỗi chứa từ 'Data' bằng toán tử LIKE?"
    ]
  },
  {
    id: "sql-2",
    topic: "Gom Nhóm & Tổng Hợp Dữ Liệu (GROUP BY, HAVING, Aggregate Functions)",
    difficulty: "Beginner",
    daImportance: 100,
    deImportance: 85,
    estHoursToMaster: 15,
    keyKeywords: ["GROUP BY", "HAVING", "COUNT()", "SUM()", "AVG()", "MAX/MIN", "COUNT(DISTINCT)"],
    description: "Tính toán các chỉ số kinh doanh (KPI, doanh thu, số lượng đơn hàng) theo từng phân khúc.",
    practicePlatforms: [
      { name: "HackerRank SQL Basic", url: "https://www.hackerrank.com/domains/sql" },
      { name: "SQLBolt (Bài 6-7)", url: "https://sqlbolt.com/" }
    ],
    sampleQuery: `SELECT customer_id, COUNT(order_id) AS total_orders, SUM(total_amount) AS revenue
FROM orders
GROUP BY customer_id
HAVING SUM(total_amount) > 5000
ORDER BY revenue DESC;`,
    commonInterviewQuestions: [
      "COUNT(*) khác COUNT(column_name) như thế nào?",
      "Tại sao không thể dùng hàm tổng hợp SUM trong mệnh đề WHERE?"
    ]
  },
  {
    id: "sql-3",
    topic: "Liên Kết Nhiều Bảng Dữ Liệu (INNER, LEFT, RIGHT, FULL OUTER, CROSS JOIN)",
    difficulty: "Intermediate",
    daImportance: 100,
    deImportance: 95,
    estHoursToMaster: 25,
    keyKeywords: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN", "SELF JOIN", "ON vs WHERE"],
    description: "Kết nối dữ liệu khách hàng, đơn hàng, sản phẩm từ kiến trúc cơ sở dữ liệu quan hệ.",
    practicePlatforms: [
      { name: "LeetCode SQL Easy", url: "https://leetcode.com/problemset/database/" },
      { name: "PostgreSQL Exercises", url: "https://pgexercises.com/" }
    ],
    sampleQuery: `SELECT c.customer_name, o.order_id, p.product_name, o.amount
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
LEFT JOIN products p ON o.product_id = p.product_id
WHERE o.order_date >= '2026-01-01';`,
    commonInterviewQuestions: [
      "Trường hợp nào kết quả LEFT JOIN bị suy biến thành INNER JOIN?",
      "Giải thích hiện tượng x2/x3 bản ghi khi JOIN do vướng duplicate keys?"
    ]
  },
  {
    id: "sql-4",
    topic: "Hàm Phân Tích Cửa Sổ (Window Functions: ROW_NUMBER, RANK, DENSE_RANK, LAG/LEAD)",
    difficulty: "Intermediate",
    daImportance: 95,
    deImportance: 95,
    estHoursToMaster: 30,
    keyKeywords: ["OVER(PARTITION BY... ORDER BY)", "ROW_NUMBER()", "RANK()", "DENSE_RANK()", "LAG()", "LEAD()", "SUM() OVER"],
    description: "Tuyệt chiêu hàng đầu trong phỏng vấn DA/DE: Phân hạng, tính doanh thu lũy kế (running total), so sánh MoM/YoY.",
    practicePlatforms: [
      { name: "LeetCode SQL Medium", url: "https://leetcode.com/problemset/database/" },
      { name: "StrataScratch SQL", url: "https://www.stratascratch.com/" }
    ],
    sampleQuery: `SELECT employee_id, department_id, salary,
       RANK() OVER(PARTITION BY department_id ORDER BY salary DESC) AS salary_rank,
       LAG(salary) OVER(PARTITION BY department_id ORDER BY salary DESC) AS prev_higher_salary
FROM employees;`,
    commonInterviewQuestions: [
      "Phân biệt RANK() và DENSE_RANK() khi có 2 giá trị bằng nhau?",
      "Cách dùng LAG() để tính tốc độ tăng trưởng doanh thu so với tháng trước?"
    ]
  },
  {
    id: "sql-5",
    topic: "Bảng Tạm & Bảng Zize Tái Sử Dụng (CTE - Common Table Expressions & Subqueries)",
    difficulty: "Intermediate",
    daImportance: 90,
    deImportance: 90,
    estHoursToMaster: 20,
    keyKeywords: ["WITH cte_name AS ()", "Subquery in SELECT/FROM/WHERE", "Recursive CTE", "Modular SQL"],
    description: "Chia nhỏ câu truy vấn phức tạp thành các bước logic rõ ràng, dễ bảo trì và tối ưu.",
    practicePlatforms: [
      { name: "Mode SQL Advanced", url: "https://mode.com/sql-tutorial/sql-business-analytics-training/" },
      { name: "LeetCode Database", url: "https://leetcode.com/" }
    ],
    sampleQuery: `WITH monthly_sales AS (
  SELECT DATE_TRUNC('month', order_date) AS month, SUM(total_amount) AS revenue
  FROM orders
  GROUP BY 1
),
sales_growth AS (
  SELECT month, revenue,
         LAG(revenue) OVER(ORDER BY month) AS prev_month_revenue
  FROM monthly_sales
)
SELECT month, revenue, 
       ROUND((revenue - prev_month_revenue) * 100.0 / prev_month_revenue, 2) AS growth_pct
FROM sales_growth;`,
    commonInterviewQuestions: [
      "Subquery và CTE khác nhau thế nào về hiệu năng và readability?",
      "Ứng dụng Recursive CTE để truy vấn cây tổ chức nhân sự hoặc phân cấp danh mục?"
    ]
  },
  {
    id: "sql-6",
    topic: "Tối Ưu Hóa Câu Truy Vấn & Chỉ Mục (Query Optimization, Indexing, EXPLAIN ANALYZE)",
    difficulty: "Advanced",
    daImportance: 70,
    deImportance: 100,
    estHoursToMaster: 35,
    keyKeywords: ["CREATE INDEX", "EXPLAIN ANALYZE", "B-Tree Index", "Composite Index", "Sequential Scan vs Index Scan"],
    description: "Kỹ năng sinh tử của Data Engineer: Tăng tốc câu lệnh truy vấn từ 10 phút xuống vài giây trên cơ sở dữ liệu lớn.",
    practicePlatforms: [
      { name: "Use The Index, Luke!", url: "https://use-the-index-luke.com/" },
      { name: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/" }
    ],
    sampleQuery: `CREATE INDEX idx_orders_customer_date 
ON orders (customer_id, order_date DESC);

EXPLAIN ANALYZE 
SELECT * FROM orders WHERE customer_id = 1052 ORDER BY order_date DESC;`,
    commonInterviewQuestions: [
      "B-Tree Index hoạt động như thế nào? Tại sao tạo quá nhiều INDEX lại làm chậm câu lệnh INSERT/UPDATE?",
      "Cách đọc Query Execution Plan (EXPLAIN) để phát hiện nguyên nhân nghẽn cổ chai?"
    ]
  }
];

export const ALL_SKILLS_REQUIREMENTS: SkillRequirement[] = [
  {
    id: "sk-sql",
    name: "SQL & Query Optimization",
    category: "Database & SQL",
    daWeight: 35,
    deWeight: 25,
    demandScore: 99,
    learningHours: 120,
    priorityLevel: "P0 (Must Have)",
    description: "Kỹ năng số 1 bắt buộc cho mọi vị trí Data. Cần thành thạo từ SELECT cơ bản đến Window Functions, CTEs & Indexing.",
    bestResources: ["SQLBolt", "Mode SQL", "Data Engineering Zoomcamp", "LeetCode Database"]
  },
  {
    id: "sk-python",
    name: "Python (Pandas, NumPy, OOP, APIs)",
    category: "Programming",
    daWeight: 25,
    deWeight: 25,
    demandScore: 98,
    learningHours: 140,
    priorityLevel: "P0 (Must Have)",
    description: "Ngôn ngữ lập trình phổ biến nhất cho Data: Xử lý làm sạch bảng dữ liệu (Pandas), viết script tự động & kết nối API.",
    bestResources: ["Kaggle Python", "Corey Schafer YouTube", "Real Python", "Automate the Boring Stuff"]
  },
  {
    id: "sk-powerbi",
    name: "Power BI & DAX Data Modeling",
    category: "BI & Visualization",
    daWeight: 30,
    deWeight: 10,
    demandScore: 92,
    learningHours: 90,
    priorityLevel: "P0 (Must Have)",
    description: "Xây dựng Báo cáo & Dashboard tương tác, thiết kế Star Schema, viết công thức DAX tính toán chỉ số kinh doanh.",
    bestResources: ["Microsoft Learn Power BI", "Guy in a Cube YouTube", "SQLBI (Marco Russo)"]
  },
  {
    id: "sk-data-modeling",
    name: "Data Warehouse & Dimensional Modeling",
    category: "Data Engineering",
    daWeight: 10,
    deWeight: 20,
    demandScore: 95,
    learningHours: 100,
    priorityLevel: "P0 (Must Have)",
    description: "Thiết kế kho dữ liệu doanh nghiệp theo chuẩn Kimball: Bảng Fact, Bảng Dimension, Star Schema, Snowflake Schema.",
    bestResources: ["The Data Warehouse Toolkit Book", "DataTalks.Club", "dbt Learn"]
  },
  {
    id: "sk-airflow",
    name: "ETL / ELT & Apache Airflow",
    category: "Data Engineering",
    daWeight: 5,
    deWeight: 20,
    demandScore: 90,
    learningHours: 110,
    priorityLevel: "P1 (High)",
    description: "Lập lịch & tự động hóa dòng chảy dữ liệu (Orchestration). Xây dựng Airflow DAGs cào và nạp dữ liệu định kỳ.",
    bestResources: ["Astronomer Airflow Guides", "Data Engineering Zoomcamp", "Apache Airflow Docs"]
  },
  {
    id: "sk-spark",
    name: "Big Data & PySpark / Delta Lake",
    category: "Data Engineering",
    daWeight: 0,
    deWeight: 18,
    demandScore: 88,
    learningHours: 130,
    priorityLevel: "P1 (High)",
    description: "Xử lý tính toán phân tán dữ liệu lớn hàng trăm GB / Terabytes trên cụm máy chủ với PySpark & Lakehouse Architecture.",
    bestResources: ["Databricks Academy Free", "Spark Official Docs", "Zach Wilson DataExpert"]
  },
  {
    id: "sk-cloud",
    name: "Cloud Platforms (AWS / GCP / Azure) & Docker",
    category: "Cloud & DevOps",
    daWeight: 5,
    deWeight: 18,
    demandScore: 94,
    learningHours: 120,
    priorityLevel: "P1 (High)",
    description: "Đóng gói ứng dụng container với Docker, triển khai Data Pipeline trên AWS (S3, RDS, EC2) hoặc GCP (BigQuery, GCS).",
    bestResources: ["AWS Free Tier", "Google Cloud Skills Boost", "Docker Docs"]
  },
  {
    id: "sk-genai",
    name: "GenAI & Vector DB Pipelines",
    category: "AI & Analytics",
    daWeight: 5,
    deWeight: 14,
    demandScore: 89,
    learningHours: 80,
    priorityLevel: "P2 (Medium)",
    description: "Xu hướng mới: Xây dựng RAG Ingestion Pipeline, nhúng Embeddings & lưu trữ trên Vector DB (Milvus/Pinecone) cho AI Agent.",
    bestResources: ["Pinecone Learn", "LangChain Docs", "LlamaIndex Tutorials"]
  }
];
