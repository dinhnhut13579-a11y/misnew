import { Milestone, AgeGoal, TimeBlock, WeeklyKPI, PortfolioProject, Certificate, DADEPhase, DEResourceCategory, ModernDataTrend } from "../types";


export const DA_DE_DETAILED_ROADMAP: DADEPhase[] = [
  {
    id: "phase-0",
    phaseNum: "0",
    title: "Chuẩn Bị Môi Trường & Tư Duy Học Tập",
    category: "Preparation",
    timeframe: "1 - 2 tuần",
    goal: "Chuẩn bị đầy đủ tư duy, cài đặt công cụ & sẵn sàng môi trường thực hành.",
    outcome: "Máy tính sẵn sàng với VS Code, Python, GitHub, Kaggle & Power BI Desktop.",
    weeklySteps: [
      {
        period: "Tuần 1",
        topic: "Cài đặt phần mềm & Công cụ",
        platforms: ["VS Code", "Python", "Power BI Desktop"],
        details: "Cài đặt VS Code (code.visualstudio.com), Python bản mới nhất (python.org), Power BI Desktop (Windows/Mac VM).",
      },
      {
        period: "Tuần 2",
        topic: "Tạo tài khoản & Tư duy thực hành",
        platforms: ["GitHub", "Kaggle"],
        details: "Tạo tài khoản GitHub (github.com) & Kaggle (kaggle.com). Nguyên tắc: Học đến đâu thực hành ngay đến đó, không xem suông.",
      },
    ],
    checkpoints: [
      "Đã gõ lệnh Python thành công trong VS Code",
      "Đã tạo tài khoản GitHub & Kaggle cá nhân",
      "Đã mở Power BI Desktop kết nối thành công dữ liệu thử",
    ],
    recommendedProjects: ["Tạo repository GitHub đầu tiên lưu trữ ghi chú học tập"],
    keyResources: [
      { name: "VS Code Download", url: "https://code.visualstudio.com/", note: "Trình soạn thảo code miễn phí phổ biến nhất" },
      { name: "Python Official", url: "https://www.python.org/", note: "Tải bản Python mới nhất" },
      { name: "GitHub", url: "https://github.com/", note: "Nơi lưu trữ Portfolio tuyển dụng" },
      { name: "Kaggle", url: "https://www.kaggle.com/", note: "Cộng đồng Data & Datasets lớn nhất" },
      { name: "Power BI Desktop", url: "https://powerbi.microsoft.com/", note: "Công cụ Business Intelligence từ Microsoft" },
    ],
  },
  {
    id: "phase-1",
    phaseNum: "1",
    title: "Nền Tảng SQL — Kỹ Năng Quan Trọng Nhất",
    category: "Data Analyst Foundations",
    timeframe: "4 - 6 tuần",
    goal: "Làm chủ ngôn ngữ SQL để truy vấn mọi dạng dữ liệu từ cơ bản đến nâng cao.",
    outcome: "Tự viết thành thạo các câu lệnh SQL phức tạp có JOIN, GROUP BY, Window Functions & CTEs.",
    weeklySteps: [
      {
        period: "Tuần 1 - 2",
        topic: "SQL Cơ bản & Nhóm dữ liệu",
        platforms: ["SQLBolt", "W3Schools SQL"],
        details: "Luyện tập SELECT, WHERE, ORDER BY, LIMIT, GROUP BY, HAVING, Aggregate functions (COUNT, SUM, AVG).",
      },
      {
        period: "Tuần 3",
        topic: "Kỹ năng JOIN nhiều bảng",
        platforms: ["SQLBolt (Bài 13-16)", "Mode SQL Tutorial"],
        details: "Thành thạo INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN. Mẹo: Vẽ tay 2 bảng ra giấy trước khi run query.",
      },
      {
        period: "Tuần 4 - 5",
        topic: "SQL Trung bình & Nâng cao",
        platforms: ["Mode SQL Advanced", "PostgreSQL Exercises"],
        details: "Luyện Subqueries, Window Functions (RANK, ROW_NUMBER, LAG/LEAD), CTEs (WITH) cho các bài toán doanh nghiệp.",
      },
      {
        period: "Tuần 6",
        topic: "Luyện tập thực chiến & Kiểm tra",
        platforms: ["HackerRank", "LeetCode Database"],
        details: "Giải 20 - 30 bài tập SQL từ mức Easy đến Medium trên HackerRank & LeetCode.",
      },
    ],
    checkpoints: [
      "Tự viết query JOIN 2-3 bảng + GROUP BY + Window function không cần tra Google",
      "Hiểu rõ sự khác biệt giữa WHERE và HAVING",
      "Làm chủ cú pháp CTE (WITH) để cấu trúc query sạch sẽ",
    ],
    recommendedProjects: [
      "SQL Case Study: Phân tích hành vi mua hàng & Doanh thu thương mại điện tử (300+ Queries)",
    ],
    keyResources: [
      { name: "SQLBolt", url: "https://sqlbolt.com/", note: "Học SQL tương tác trực tiếp 18 bài ngắn" },
      { name: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial/", note: "Lý thuyết & case study doanh nghiệp cực hay" },
      { name: "PostgreSQL Exercises", url: "https://pgexercises.com/", note: "Luyện tập tình huống thực tế với PostgreSQL" },
      { name: "HackerRank SQL", url: "https://www.hackerrank.com/domains/sql", note: "Luyện giải bài tập lấy badge SQL" },
      { name: "LeetCode Database", url: "https://leetcode.com/problemset/database/", note: "Bài tập phỏng vấn SQL chuẩn doanh nghiệp" },
    ],
  },
  {
    id: "phase-2",
    phaseNum: "2",
    title: "Python Cho Xử Lý Dữ Liệu (Pandas & NumPy)",
    category: "Data Analyst Foundations",
    timeframe: "4 - 6 tuần",
    goal: "Thành thạo Python để làm sạch, biến đổi và khám phá dữ liệu (EDA).",
    outcome: "Làm chủ thư viện Pandas, NumPy, Matplotlib & Seaborn để phân tích dữ liệu thô.",
    weeklySteps: [
      {
        period: "Tuần 1 - 2",
        topic: "Python Căn bản",
        platforms: ["freeCodeCamp Python for Everybody"],
        details: "Cú pháp Python, biến, kiểu dữ liệu, vòng lặp, hàm, list, dictionary. (C/C++ đã học sẽ giúp tiếp thu rất nhanh).",
      },
      {
        period: "Tuần 3 - 5",
        topic: "Thư viện Pandas, NumPy & Data Viz",
        platforms: ["Kaggle Learn Pandas", "Kaggle Learn Data Viz"],
        details: "Đọc file CSV/Excel, lọc dữ liệu, làm sạch dữ liệu thiếu (null), nhóm (groupby), vẽ biểu đồ Matplotlib/Seaborn.",
      },
      {
        period: "Tuần 6",
        topic: "Tích hợp Python + SQL",
        platforms: ["Kaggle Learn Intro to SQL"],
        details: "Kết nối Python với Database, đọc dữ liệu trực tiếp từ SQL vào Pandas DataFrame.",
      },
    ],
    checkpoints: [
      "Đọc file CSV bất kỳ, tự xử lý data thiếu & biến đổi kiểu dữ liệu",
      "Vẽ được biểu đồ xu hướng, biểu đồ phân phối và ma trận tương quan bằng Seaborn",
      "Viết hàm Python tự động hóa việc làm sạch tập dữ liệu",
    ],
    recommendedProjects: [
      "Phân tích dữ liệu người chơi FIFA / Starbucks Sales EDA Jupyter Notebook",
    ],
    keyResources: [
      { name: "freeCodeCamp Python", url: "https://www.freecodecamp.org/learn/scientific-computing-with-python/", note: "Khóa Python căn bản miễn phí chuẩn quốc tế" },
      { name: "Kaggle Learn Pandas", url: "https://www.kaggle.com/learn/pandas", note: "Khóa học Pandas ngắn gọn kèm bài tập thực hành ngay" },
      { name: "Kaggle Learn Data Visualization", url: "https://www.kaggle.com/learn/data-visualization", note: "Học vẽ biểu đồ đẹp mắt với Seaborn & Matplotlib" },
    ],
  },
  {
    id: "phase-3",
    phaseNum: "3",
    title: "Thống Kê Ứng Dụng Cơ Bản",
    category: "Data Analyst Foundations",
    timeframe: "2 tuần",
    goal: "Nắm vững lý thuyết thống kê để đọc hiểu đúng bản chất số liệu và tránh ngụy biện.",
    outcome: "Hiểu rõ Mean/Median, phân phối chuẩn, độ lệch chuẩn, tương quan & khái niệm A/B Testing.",
    weeklySteps: [
      {
        period: "Tuần 1",
        topic: "Thống kê mô tả (Descriptive Statistics)",
        platforms: ["Khan Academy Statistics"],
        details: "Trung bình (Mean), Trung vị (Median), Yếu vị (Mode), Độ lệch chuẩn (Std Dev), Phân phối chuẩn (Normal Distribution).",
      },
      {
        period: "Tuần 2",
        topic: "Tương quan & A/B Testing cơ bản",
        platforms: ["Khan Academy", "YouTube A/B Testing"],
        details: "Hệ số tương quan (Correlation vs Causation), Khái niệm A/B Testing và bài toán kiểm định giả thuyết trong doanh nghiệp.",
      },
    ],
    checkpoints: [
      "Phân biệt rõ khi nào nên dùng Mean vs Median (ví dụ: thu nhập, giá nhà bị lệch)",
      "Giải thích được ý nghĩa độ lệch chuẩn và hệ số tương quan r",
      "Hiểu luồng thực hiện một bài toán A/B Testing cơ bản",
    ],
    recommendedProjects: [
      "Báo cáo phân tích tương quan giữa chi tiêu Marketing và Doanh số bán hàng",
    ],
    keyResources: [
      { name: "Khan Academy Statistics", url: "https://www.khanacademy.org/math/statistics-probability", note: "Kho tàng bài giảng thống kê trực quan số 1" },
      { name: "A/B Testing Explained", url: "https://www.youtube.com/results?search_query=A%2FB+testing+explained", note: "Video giải thích A/B testing trực quan cho người mới" },
    ],
  },
  {
    id: "phase-4",
    phaseNum: "4",
    title: "Power BI — Trực Quan Hóa Dữ Liệu",
    category: "Data Analyst Foundations",
    timeframe: "3 - 4 tuần",
    goal: "Thành thạo công cụ Power BI để xây dựng Dashboard kinh doanh chuyên nghiệp.",
    outcome: "Thiết kế được Báo cáo tương tác hoàn chỉnh dựa trên mô hình Star Schema chuẩn.",
    weeklySteps: [
      {
        period: "Tuần 1",
        topic: "Làm quen giao diện & Kết nối dữ liệu",
        platforms: ["Microsoft Learn Power BI"],
        details: "Kết nối Excel, CSV, SQL Server vào Power BI. Hiểu giao diện Report View, Data View, Model View.",
      },
      {
        period: "Tuần 2",
        topic: "Power Query Editor",
        platforms: ["Microsoft Learn", "YouTube Guy in a Cube"],
        details: "Làm sạch, xoay chiều (Unpivot), nối bảng (Merge/Append) và biến đổi dữ liệu trong Power Query.",
      },
      {
        period: "Tuần 3",
        topic: "Hàm tính toán DAX",
        platforms: ["Microsoft Learn DAX", "Guy in a Cube"],
        details: "Viết Measure, Calculated Column, các hàm DAX phổ biến: SUM, CALCULATE, FILTER, ALL, RELATED, Time Intelligence.",
      },
      {
        period: "Tuần 4",
        topic: "Xây dựng Dashboard hoàn chỉnh",
        platforms: ["Kaggle Datasets", "Power BI Desktop"],
        details: "Xây dựng Sales / HR Dashboard hoàn chỉnh với KPI cards, Slicers, Tooltips & Layout chuẩn UI/UX.",
      },
    ],
    checkpoints: [
      "Tự thiết kế mô hình dữ liệu chuẩn Star Schema (Fact & Dimension Tables)",
      "Viết thành thạo hàm CALCULATE kết hợp với FILTER trong DAX",
      "Tự tạo được 1 Dashboard hoàn chỉnh tương tác mượt mà",
    ],
    recommendedProjects: [
      "Sales Performance Dashboard & Customer HR Analytics Dashboard",
    ],
    keyResources: [
      { name: "Microsoft Learn Power BI", url: "https://learn.microsoft.com/power-bi/", note: "Lộ trình học chính thức miễn phí từ Microsoft" },
      { name: "Guy in a Cube (YouTube)", url: "https://www.youtube.com/@GuyInACube", note: "Kênh YouTube tốt nhất thế giới về Power BI" },
    ],
  },
  {
    id: "phase-5",
    phaseNum: "5",
    title: "Xây Dựng Portfolio & Apply Data Analyst",
    category: "DA Portfolio & Career",
    timeframe: "3 - 4 tuần",
    goal: "Đóng gói toàn bộ kiến thức thành 2 - 3 Dự án thực tế xuất sắc & Ứng tuyển vị trí Data Analyst.",
    outcome: "Sở hữu GitHub Portfolio chỉn chu, CV chuẩn ATS & sẵn sàng đi phỏng vấn Data Analyst.",
    weeklySteps: [
      {
        period: "Tuần 1 - 2",
        topic: "Thực hiện 2 - 3 Projects thực tế",
        platforms: ["Kaggle", "GitHub"],
        details: "Làm 2-3 project hoàn chỉnh theo luồng: Lấy data -> Clean (Python/SQL) -> Model (Power BI) -> Báo cáo Insight.",
      },
      {
        period: "Tuần 3",
        topic: "Đóng gói GitHub & Viết README",
        platforms: ["GitHub Markdown"],
        details: "Upload mã nguồn SQL, Notebook Python & File .pbix lên GitHub. Viết README đẹp mắt mô tả bài toán & kết quả.",
      },
      {
        period: "Tuần 4",
        topic: "Viết CV ATS, LinkedIn & Rải CV",
        platforms: ["LinkedIn", "TopCV", "VietnamWorks"],
        details: "Tạo CV chuẩn ATS gắn link GitHub Portfolio. Đăng bài chia sẻ dự án trên LinkedIn & Rải CV ứng tuyển DA Intern/Fresher.",
      },
    ],
    checkpoints: [
      "Sở hữu ít nhất 2 repo GitHub chuyên nghiệp có tài liệu README minh họa",
      "CV đạt chuẩn ATS thể hiện rõ các chỉ số tác động dữ liệu (Impact metrics)",
      "Sẵn sàng trả lời các câu hỏi phỏng vấn SQL & Case Study dữ liệu",
    ],
    recommendedProjects: [
      "Portfolio Website / GitHub Profile chứa Sales Analysis, Customer Churn & Power BI Dashboard",
    ],
    keyResources: [
      { name: "Kaggle Datasets", url: "https://www.kaggle.com/datasets", note: "Nguồn dữ liệu thực tế cho dự án cá nhân" },
      { name: "GitHub Docs", url: "https://docs.github.com/", note: "Hướng dẫn viết README Markdown đẹp mắt" },
    ],
  },
  {
    id: "phase-6",
    phaseNum: "6",
    title: "Đi Làm Data Analyst + Học Thêm Thực Tế",
    category: "DA Portfolio & Career",
    timeframe: "1 - 2 năm (Khi đã đi làm)",
    goal: "Tích lũy kinh nghiệm nghiệp vụ doanh nghiệp, tối ưu SQL nâng cao & tìm hiểu hệ thống Data Engineering.",
    outcome: "Thành thạo quy trình làm việc trong doanh nghiệp & có cái nhìn tổng quan về Data Pipeline.",
    weeklySteps: [
      {
        period: "6 Tháng Đầu",
        topic: "Nghiệp vụ Doanh Nghiệp & SQL Nâng Cao",
        platforms: ["Công ty thực tế"],
        details: "Hiểu sâu Domain Knowledge của công ty. Học viết Stored Procedures, tối ưu truy vấn chậm, đánh Indexing trong SQL.",
      },
      {
        period: "6 Tháng Sau",
        topic: "Python Automation & Học hỏi Team DE",
        platforms: ["Python Automation Scripts"],
        details: "Viết script Python tự động hóa việc lấy data & gửi báo cáo. Trao đổi, quan sát cách team Data Engineer vận hành Pipeline.",
      },
    ],
    checkpoints: [
      "Tự viết được Stored Procedures và tối ưu hóa câu lệnh SQL chạy chậm trong công ty",
      "Hiểu rõ luồng di chuyển dữ liệu từ nguồn (Source DB) về Kho dữ liệu (Data Warehouse)",
      "Xây dựng tư duy giải quyết bài toán nghiệp vụ kinh doanh bằng dữ liệu",
    ],
    recommendedProjects: [
      "Hệ thống tự động hóa báo cáo doanh số hàng ngày bằng Python Script & Email API",
    ],
    keyResources: [
      { name: "Use The Index, Luke!", url: "https://use-the-index-luke.com/", note: "Trang web học đánh Index & tối ưu SQL hàng đầu" },
    ],
  },
  {
    id: "phase-7.1",
    phaseNum: "7.1",
    title: "DE Step 1: Lập Trình Nâng Cao & Computer Science",
    category: "Data Engineer Transition",
    timeframe: "2 - 3 tháng",
    goal: "Củng cố tư duy Lập trình hướng đối tượng (OOP) & Cấu trúc dữ liệu cho vai trò Kỹ sư Dữ liệu.",
    outcome: "Thành thạo Python OOP, cấu trúc dữ liệu cơ bản, làm việc với API & Git nâng cao.",
    weeklySteps: [
      {
        period: "Tháng 1",
        topic: "Cấu trúc dữ liệu & Thuật toán",
        platforms: ["CS50 Harvard (edX/YouTube)"],
        details: "Học Array, Hash Table, Stack, Queue, Linked List và độ phức tạp thuật toán Big-O.",
      },
      {
        period: "Tháng 2",
        topic: "Python OOP Nâng cao & API",
        platforms: ["Real Python"],
        details: "Lập trình hướng đối tượng (Class, Object, Inheritance, Polymorphism), xử lý file JSON/Parquet, gọi Rest API.",
      },
      {
        period: "Tháng 3",
        topic: "Git & GitHub Nâng cao",
        platforms: ["freeCodeCamp Git Course"],
        details: "Thành thạo Branching, Merging, Rebase, Resolve Conflicts & làm việc theo mô hình Pull Request.",
      },
    ],
    checkpoints: [
      "Viết mã nguồn Python theo chuẩn Lập trình Hướng đối tượng (OOP)",
      "Tự kết nối & bóc tách dữ liệu từ bất kỳ RESTful API công khai nào",
      "Thành thạo quy trình Git flow trong làm việc nhóm",
    ],
    recommendedProjects: [
      "Object-Oriented Python Package cào & chuẩn hóa dữ liệu từ REST API",
    ],
    keyResources: [
      { name: "CS50 Harvard", url: "https://cs50.harvard.edu/x/", note: "Khóa học Nhập môn Khoa học Máy tính hay nhất thế giới" },
      { name: "Real Python", url: "https://realpython.com/", note: "Tài liệu chuyên sâu về Python nâng cao & OOP" },
    ],
  },
  {
    id: "phase-7.2",
    phaseNum: "7.2",
    title: "DE Step 2: Database Design & Data Modeling",
    category: "Data Engineer Transition",
    timeframe: "1 - 2 tháng",
    goal: "Làm chủ tư duy Thiết kế Kiến trúc Kho dữ liệu (Data Warehouse) cho doanh nghiệp.",
    outcome: "Hiểu sâu OLTP vs OLAP, thiết kế thành thạo Star Schema & Snowflake Schema.",
    weeklySteps: [
      {
        period: "Tháng 1",
        topic: "OLTP vs OLAP & Data Warehouse",
        platforms: ["Seattle Data Guy", "Data Engineering Simplified"],
        details: "Phân biệt Database giao dịch (OLTP) và Kho dữ liệu phân tích (OLAP). Kiến trúc Data Warehouse tổng quan.",
      },
      {
        period: "Tháng 2",
        topic: "Data Modeling: Star Schema & Normalization",
        platforms: ["Kimball Data Warehouse Toolkit Summary"],
        details: "Thiết kế Fact Tables, Dimension Tables, Star Schema, Snowflake Schema, Chuẩn hóa (Normalization) & Phi chuẩn hóa (Denormalization).",
      },
    ],
    checkpoints: [
      "Phân biệt rõ ràng sự khác nhau giữa OLTP (PostgreSQL/MySQL) và OLAP (BigQuery/Snowflake)",
      "Tự thiết kế sơ đồ ERD & Star Schema cho một hệ thống bán hàng lớn",
      "Hiểu ý nghĩa của Slowly Changing Dimensions (SCD Type 1, 2, 3)",
    ],
    recommendedProjects: [
      "Data Warehouse Schema Design cho Hệ thống Thương mại Điện tử Đa Quốc gia",
    ],
    keyResources: [
      { name: "Seattle Data Guy (YouTube)", url: "https://www.youtube.com/@SeattleDataGuy", note: "Kênh chia sẻ thực tế về Data Engineering" },
      { name: "Data Engineering Simplified", url: "https://www.youtube.com/@DataEngineeringSimplified", note: "Bài giảng kiến trúc Data Warehouse chi tiết" },
    ],
  },
  {
    id: "phase-7.3",
    phaseNum: "7.3",
    title: "DE Step 3: ETL/ELT & Orchestration (Apache Airflow)",
    category: "Data Engineer Transition",
    timeframe: "1 - 2 tháng",
    goal: "Xây dựng các đường ống dữ liệu (Pipeline) tự động hóa bằng Apache Airflow.",
    outcome: "Tự lập lịch, điều phối & giám sát Pipeline chạy tự động hàng ngày.",
    weeklySteps: [
      {
        period: "Tháng 1",
        topic: "Khái niệm ETL vs ELT & Lập trình DAG",
        platforms: ["Airflow Official Docs"],
        details: "Phân biệt ETL và ELT. Cài đặt Apache Airflow local, học khái niệm DAG, Operators (PythonOperator, BashOperator).",
      },
      {
        period: "Tháng 2",
        topic: "Thực hành Data Pipeline hoàn chỉnh",
        platforms: ["Apache Airflow Local Setup"],
        details: "Tự viết DAG lấy dữ liệu từ API -> Biến đổi dữ liệu -> Ghi vào PostgreSQL Database -> Gửi cảnh báo Slack/Email nếu lỗi.",
      },
    ],
    checkpoints: [
      "Viết thành thạo file DAG Python điều phối các task phụ thuộc nhau",
      "Sử dụng Airflow UI để kiểm tra log, backfill và debug pipeline khi gặp sự cố",
      "Hiểu cơ chế Retry và Cảnh báo trong tự động hóa pipeline",
    ],
    recommendedProjects: [
      "Airflow Automated Pipeline: Thu thập giá chứng khoán/thời tiết hàng giờ vào PostgreSQL",
    ],
    keyResources: [
      { name: "Apache Airflow Docs", url: "https://airflow.apache.org/", note: "Tài liệu hướng dẫn chính thức từ Apache Airflow" },
    ],
  },
  {
    id: "phase-7.4-7.5",
    phaseNum: "7.4 - 7.5",
    title: "DE Step 4 & 5: Big Data (Spark), Cloud & Docker",
    category: "Data Engineer Transition",
    timeframe: "3 - 4 tháng",
    goal: "Làm chủ công cụ xử lý dữ liệu lớn PySpark, Nền tảng Đám mây (AWS/GCP) & Docker.",
    outcome: "Xử lý được tập dữ liệu hàng triệu dòng bằng PySpark & đóng gói triển khai Cloud.",
    weeklySteps: [
      {
        period: "Tháng 1 - 2",
        topic: "Xử lý Big Data với PySpark",
        platforms: ["Databricks Academy (Miễn phí)"],
        details: "Kiến trúc Apache Spark, RDD vs DataFrame, PySpark Transformation & Action, tối ưu Spark Job.",
      },
      {
        period: "Tháng 3",
        topic: "Nền tảng Đám Mây (AWS hoặc GCP)",
        platforms: ["AWS Free Tier / Google Cloud Skills Boost"],
        details: "AWS S3 (Lưu trữ file), RDS PostgreSQL (Database), Lambda (Serverless) HOẶC GCP Cloud Storage & BigQuery.",
      },
      {
        period: "Tháng 4",
        topic: "Đóng gói Container với Docker",
        platforms: ["Docker Get Started", "freeCodeCamp Docker"],
        details: "Viết Dockerfile, Docker Compose để đóng gói toàn bộ môi trường Python, Airflow & Postgres trong 1 câu lệnh.",
      },
    ],
    checkpoints: [
      "Chạy được PySpark script biến đổi dữ liệu lớn trên Databricks Community",
      "Upload và kết nối dữ liệu thành công trên Cloud Storage (S3 / GCP Bucket)",
      "Đóng gói ứng dụng pipeline hoàn chỉnh chạy trên Docker Container",
    ],
    recommendedProjects: [
      "PySpark Data Pipeline đóng gói Docker triển khai trên Cloud Data Lake",
    ],
    keyResources: [
      { name: "Databricks Academy", url: "https://www.databricks.com/learn", note: "Khóa học PySpark chất lượng cao miễn phí" },
      { name: "AWS Free Tier", url: "https://aws.amazon.com/free/", note: "Tài khoản trải nghiệm điện toán đám mây AWS" },
      { name: "Docker Docs", url: "https://docs.docker.com/get-started/", note: "Hướng dẫn nhập môn Containerization với Docker" },
    ],
  },
  {
    id: "phase-7.6",
    phaseNum: "7.6",
    title: "DE Step 6: End-to-End Capstone & Chuyển Vai Trò DE",
    category: "Data Engineer Transition",
    timeframe: "1 tháng",
    goal: "Xây dựng dự án End-to-End Data Engineering hoàn chỉnh & Ứng tuyển vị trí Data Engineer.",
    outcome: "Sở hữu Portfolio Data Engineer chuẩn mực & Offer công việc Data Engineer thành công.",
    weeklySteps: [
      {
        period: "Tuần 1 - 3",
        topic: "Xây dựng End-to-End Pipeline Capstone",
        platforms: ["API -> Python -> Postgres -> Airflow -> Power BI"],
        details: "1. Lấy data từ API công khai. 2. Transform bằng Python/PySpark. 3. Lưu vào AWS RDS Postgres. 4. Lập lịch Airflow. 5. Kết nối Power BI.",
      },
      {
        period: "Tuần 4",
        topic: "Vẽ Sơ Đồ Kiến Trúc & Rải CV DE",
        platforms: ["GitHub", "LinkedIn"],
        details: "Vẽ sơ đồ System Architecture diagram đăng GitHub README. Cập nhật hồ sơ LinkedIn sang Data Engineer & bắt đầu đi phỏng vấn.",
      },
    ],
    checkpoints: [
      "Pipeline tự động chạy liên tục không bị gián đoạn, tự recovery khi có sự cố",
      "Sơ đồ kiến trúc thể hiện rõ ràng luồng dữ liệu từ Ingestion đến Consumption",
      "Sẵn sàng phỏng vấn các câu hỏi kiến trúc Data Pipeline, SQL & Data Modeling",
    ],
    recommendedProjects: [
      "End-to-End Automated Cloud Data Pipeline Architecture Capstone Project",
    ],
    keyResources: [
      { name: "r/dataengineering Reddit", url: "https://www.reddit.com/r/dataengineering/", note: "Cộng đồng Data Engineering lớn nhất thế giới" },
    ],
  },
];

export const ROADMAP_COMMUNITIES_AND_MISTAKES = {
  communities: [
    { name: "Group Facebook Data Engineer Vietnam", note: "Cộng đồng hỏi đáp kinh nghiệm DE hàng đầu tại VN" },
    { name: "Cộng đồng SQL & Analytics Vietnam", note: "Trao đổi tối ưu query, case study doanh nghiệp" },
    { name: "Stack Overflow (Data/SQL)", note: "Hỏi đáp lỗi kỹ thuật cụ thể" },
    { name: "Reddit r/dataengineering", note: "Cập nhật xu hướng công nghệ mới nhất thế giới" },
  ],
  aiTools: [
    { name: "GitHub Copilot", note: "Hỗ trợ gợi ý code Python, SQL & Dockerfile nhanh gấp 3 lần" },
    { name: "Text-to-SQL AI Prompts", note: "Hỗ trợ học cú pháp SQL nâng cao & tối ưu hóa query" },
  ],
  mistakesToAvoid: [
    "Học lý thuyết quá nhiều nhưng không gõ code thực hành → Quên sạch sau 1 tuần",
    "Nhảy thẳng vào Spark / Airflow / Cloud khi kiến thức SQL còn yếu → Dễ nản và mất gốc",
    "Không làm Project hoặc không viết README GitHub → Tuyển dụng không có cơ sở đánh giá",
    "Phụ thuộc hoàn toàn vào AI mà không hiểu bản chất code hoạt động ra sao",
  ],
};

export const DE_LEARNING_RESOURCES: DEResourceCategory[] = [
  {
    title: "1. Khóa Học Free Chuyên Sâu Data Engineering",
    description: "Các lộ trình thực hành từ con số 0 đến xây dựng Pipeline sản phẩm chất lượng cao chuẩn quốc tế.",
    resources: [
      {
        name: "Data Engineering Zoomcamp (DataTalks.Club)",
        url: "https://github.com/DataTalksClub/data-engineering-zoomcamp",
        type: "Free Course",
        level: "Foundational",
        note: "Khóa học miễn phí xịn nhất thế giới! 9 tuần thực hành Postgres, Docker, GCP, Terraform, dbt, Spark, Airflow, Kafka.",
      },
      {
        name: "Databricks Academy Free Courses",
        url: "https://www.databricks.com/learn",
        type: "Free Course",
        level: "Advanced",
        note: "Học PySpark, Delta Lake & Lakehouse Fundamentals hoàn toàn miễn phí từ chính nhà sáng lập Spark.",
      },
      {
        name: "dbt Learn (learn.getdbt.com)",
        url: "https://learn.getdbt.com/",
        type: "Free Course",
        level: "Foundational",
        note: "Khóa học chính thức biến đổi dữ liệu trong Data Warehouse chuẩn Modern Data Stack.",
      },
      {
        name: "Google Cloud Skills Boost - Data Engineer Path",
        url: "https://cloudskillsboost.google/",
        type: "Free Course",
        level: "Advanced",
        note: "Thực hành trên môi trường Google Cloud thực tế với BigQuery, Cloud Storage & Dataflow.",
      },
    ],
  },
  {
    title: "2. Sách Kinh Điển & Tài Liệu Chuẩn Ngành",
    description: "Những cuốn sách được ví như 'Thánh kinh' của dân Data Engineering.",
    resources: [
      {
        name: "Designing Data-Intensive Applications (DDIA)",
        url: "https://dataintensive.net/",
        type: "Book",
        level: "Advanced",
        note: "Cuốn 'Kinh Thánh' bắt buộc phải đọc của Martin Kleppmann về hệ thống phân tán, database & reliability.",
      },
      {
        name: "Fundamentals of Data Engineering (O'Reilly)",
        url: "https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/",
        type: "Book",
        level: "Foundational",
        note: "Cuốn sách định hình bức tranh toàn cảnh về Data Engineering Lifecycle từ Ingestion đến Consumption.",
      },
      {
        name: "The Data Warehouse Toolkit (Ralph Kimball)",
        url: "https://www.kimballgroup.com/data-warehouse-architecture/",
        type: "Book",
        level: "Foundational",
        note: "Nền tảng thiết kế Dimensional Modeling, Star Schema, Snowflake Schema chuẩn doanh nghiệp.",
      },
    ],
  },
  {
    title: "3. Kênh YouTube & Cộng Đồng Cập Nhật Xu Hướng",
    description: "Nơi chia sẻ case study doanh nghiệp thực tế, phỏng vấn & tối ưu kiến trúc.",
    resources: [
      {
        name: "Seattle Data Guy (YouTube / Substack)",
        url: "https://www.youtube.com/@SeattleDataGuy",
        type: "YouTube",
        level: "Modern Trend",
        note: "Kênh chia sẻ thực tế cực hay về kiến trúc Data Pipeline, tư vấn lộ trình & phỏng vấn DE.",
      },
      {
        name: "Zach Wilson (DataExpert.io / YouTube)",
        url: "https://www.youtube.com/@ecsimswilson",
        type: "YouTube",
        level: "Advanced",
        note: "Cựu DE Tech Lead tại Airbnb, Netflix & Facebook chia sẻ về Spark, Iceberg, Data Quality & Data Modeling.",
      },
      {
        name: "Reddit r/dataengineering",
        url: "https://www.reddit.com/r/dataengineering/",
        type: "Community",
        level: "Modern Trend",
        note: "Diễn đàn trao đổi thảo luận xu hướng công nghệ dữ liệu số 1 hành tinh.",
      },
      {
        name: "Data Engineering Vietnam Facebook Group",
        url: "https://www.facebook.com/groups/dataengineeringvn/",
        type: "Community",
        level: "Foundational",
        note: "Cộng đồng hỏi đáp kinh nghiệm tuyển dụng & thực tế công việc tại Việt Nam.",
      },
    ],
  },
];

export const MODERN_DATA_TRENDS: ModernDataTrend[] = [
  {
    id: "trend-genai-pipelines",
    topic: "AI & GenAI Data Engineering (Vector DB & RAG Pipelines)",
    category: "AI & GenAI Pipelines",
    description: "Tích hợp Generative AI vào quy trình xử lý dữ liệu: Xây dựng RAG (Retrieval-Augmented Generation) Ingestion Pipelines, Embeddings Storage & Vector Databases.",
    keyTechnologies: ["Vector Databases (Milvus, Pinecone, Qdrant)", "LangChain / LlamaIndex", "Text Embeddings", "Text-to-SQL AI Agents"],
    whyImportant: "Doanh nghiệp hiện tại không chỉ dùng dữ liệu cấu trúc (SQL) mà cần khai phá dữ liệu phi cấu trúc (PDF, Chat, Email) cho LLM.",
    learningPathNote: "Học sau khi đã vững Python & REST API. Thực hành cào văn bản -> tạo Vector Embeddings -> lưu vào Pinecone / Qdrant -> kết nối LLM.",
    resourceLink: { name: "Pinecone Learning Center", url: "https://www.pinecone.io/learn/" },
  },
  {
    id: "trend-lakehouse",
    topic: "Data Lakehouse & Open Table Formats (Apache Iceberg, Delta Lake)",
    category: "Lakehouse & Open Table",
    description: "Kết hợp điểm mạnh của Data Lake (Lưu trữ chi phí cực rẻ) và Data Warehouse (Truy vấn SQL siêu nhanh, chuẩn ACID, Time-travel).",
    keyTechnologies: ["Apache Iceberg", "Delta Lake", "Apache Hudi", "Databricks", "Amazon Athena / Snowflake"],
    whyImportant: "Thay thế mô hình Data Warehouse cũ kỹ. Giúp doanh nghiệp xử lý petabytes dữ liệu với độ trễ thấp và chi phí tối ưu.",
    learningPathNote: "Tìm hiểu sau khi đã nắm vững PySpark & AWS S3. Thực hành lưu trữ file Parquet kèm bảng Apache Iceberg.",
    resourceLink: { name: "Apache Iceberg Docs", url: "https://iceberg.apache.org/" },
  },
  {
    id: "trend-mds-dbt",
    topic: "Modern Data Stack & ELT Transformation với dbt",
    category: "Modern Data Stack",
    description: "Chuyển dịch từ ETL sang ELT (Extract, Load, Transform) với trung tâm là dbt (data build tool) để viết SQL biến đổi dữ liệu bằng tư duy phần mềm (Git, Test, Documentation).",
    keyTechnologies: ["dbt (data build tool)", "Snowflake", "Google BigQuery", "ClickHouse"],
    whyImportant: "Chuẩn mực quốc tế cho Analytics Engineer & Data Engineer. Giúp viết SQL có Version Control, testing tự động & dựng tài liệu Data Lineage.",
    learningPathNote: "Học ngay sau khi có nền SQL & Data Warehouse (Phase 7.2). dbt là kỹ năng cực kỳ ăn điểm khi apply việc.",
    resourceLink: { name: "dbt Official Courses", url: "https://learn.getdbt.com/" },
  },
  {
    id: "trend-streaming",
    topic: "Real-time Streaming & Event-Driven Data Pipelines",
    category: "Real-time Streaming",
    description: "Xử lý dữ liệu tức thì theo thời gian thực (Real-time) thay vì xử lý theo lô (Batch Processing) cho các bài toán gian lận tài chính, khuyến mãi & thông báo.",
    keyTechnologies: ["Apache Kafka", "Apache Flink", "Spark Streaming", "Redpanda"],
    whyImportant: "Các ngành Ngân hàng, Thương mại điện tử, Grab/Shopee luôn yêu cầu dữ liệu biến động tức thì từng giây.",
    learningPathNote: "Học ở giai đoạn nâng cao (Phase 7.4). Dùng Kafka gửi event tin nhắn và Flink/Spark Streaming tiêu thụ dữ liệu.",
    resourceLink: { name: "Confluent Kafka Tutorials", url: "https://developer.confluent.io/" },
  },
  {
    id: "trend-governance",
    topic: "Data Quality, Observability & Data Lineage",
    category: "Data Governance & Quality",
    description: "Tự động hóa kiểm tra tính đúng đắn của dữ liệu (Data Quality Checks), cảnh báo khi hỏng pipeline & truy vết nguồn gốc dòng chảy dữ liệu (Data Lineage).",
    keyTechnologies: ["Great Expectations", "Soda Core", "OpenLineage", "Monte Carlo"],
    whyImportant: "Đảm bảo dữ liệu không bị sai lệch ('Garbage in, Garbage out'). Bắt buộc trong môi trường ngân hàng & tài chính.",
    learningPathNote: "Tích hợp Great Expectations / Soda vào Airflow DAG để tự động test dữ liệu trước khi load vào Data Warehouse.",
    resourceLink: { name: "Great Expectations Docs", url: "https://greatexpectations.io/" },
  },
];


export const ROADMAP_MILESTONES: Milestone[] = [
  {
    id: "stage-1",
    title: "Giai đoạn 1 (Đã hoàn thành Năm 1 - Dồn kỹ năng sang Năm 2 → 4)",
    subtitle: "Kết thúc Năm 1 → Bứt phá Năm 2",
    timeframe: "Đã hoàn thành Học kỳ 1 & 2 - Năm 1",
    goal: "Vừa xong Năm 1! Toàn bộ các kỹ năng còn thiếu (C++, Logic thuật toán, Excel nâng cao, Git, Tiếng Anh) được dồn và phân bổ đều vào 3 năm còn lại.",
    skills: [
      "⚡ C++ Cơ bản & Tư duy Thuật toán (Đã chuyển phân bổ dồn vào Năm 2 & Năm 3)",
      "⚡ Excel Nâng Cao & Power Query (Đã dồn sang Học kỳ 3 - Năm 2 học cấp tốc)",
      "⚡ Git & GitHub Căn bản (Đã dồn sang lưu trữ dự án SQL/Python ở Năm 2)",
      "⚡ Tiếng Anh Học Thuật (Đã dồn sang luyện thi IELTS 6.5+ ở Năm 3)",
    ],
    projects: [
      "Tích hợp các dự án C++ & Excel trực tiếp vào Portfolio Năm 2 và Năm 3",
    ],
    details: [
      "Bạn vừa hoàn thành Năm 1 Đại học. Đừng lo lắng nếu chưa kịp xong các kỹ năng Năm 1!",
      "Lộ trình đã được tối ưu lại: dồn và chia nhỏ 100% kỹ năng Năm 1 vào 3 năm còn lại (Năm 2, Năm 3, Năm 4) giúp bạn vừa không bị áp lực, vừa lấp lỗ hổng kiến thức chuẩn xác.",
    ],
  },
  {
    id: "stage-2",
    title: "Giai đoạn 2: Tích Hợp Nền Tảng Năm 1 + Kỹ Thuật Trọng Tâm",
    subtitle: "Năm 2 (Giai đoạn Bứt Phá)",
    timeframe: "Học kỳ 3 & 4 - Năm 2",
    goal: "Học cấp tốc Excel Nâng Cao & C++ Logic (dồn từ Năm 1), song song thành thạo SQL Chuyên sâu, Python Data & Power BI.",
    skills: [
      "📌 [Dồn từ Năm 1] Excel Nâng cao (Pivot Table, Power Query, Advanced Formulas)",
      "📌 [Dồn từ Năm 1] C++ Logic & Tư duy Thuật toán (50 bài tập C++/Python tư duy lọc dữ liệu)",
      "📌 [Dồn từ Năm 1] Git & GitHub Căn bản (Quản lý và push mã nguồn dự án SQL/Python)",
      "SQL Chuyên sâu (SELECT, JOIN, GROUP BY, Window Functions, CTEs, Stored Procedures)",
      "Python cho Data Analysis (Pandas, NumPy, Matplotlib, Seaborn)",
      "Power BI Căn bản (Star Schema Data Model, DAX cơ bản, Thiết kế Layout Dashboard)",
    ],
    projects: [
      "Excel Project: Báo cáo Doanh số Bán hàng tự động hóa bằng Power Query",
      "C++ / Python Project: App Console Quản lý thông tin dữ liệu & 50 bài thuật toán",
      "SQL Case Study Project: Phân tích hành vi khách hàng & doanh số (300+ queries)",
      "Power BI Dashboard: Báo cáo Doanh thu kinh doanh & HR Analytics Dashboard",
    ],
    details: [
      "Học cấp tốc Excel Nâng cao & Power Query ngay đầu Học kỳ 3 để làm chủ xử lý dữ liệu thô.",
      "Thành thạo SQL chuyên sâu với ít nhất 300 câu hỏi truy vấn thực tế. Đưa toàn bộ code SQL & Python lên GitHub.",
      "Tập trung học Python cho Data (Pandas, NumPy) và xây dựng 5 Dashboard Power BI đầu tiên theo chuẩn mô hình Star Schema.",
    ],
  },
  {
    id: "stage-3",
    title: "Giai đoạn 3: Thực Chiến & Tích Lũy Kinh Nghiệm Đầu Đời",
    subtitle: "Mùa hè chuyển giao Năm 2 → Năm 3",
    timeframe: "Hè Năm 2 → Đầu Năm 3",
    goal: "Xây dựng CV chuẩn ATS tích hợp dự án tổng hợp từ Năm 1 & Năm 2 để ứng tuyển Thực tập sinh Data Analyst.",
    skills: [
      "📌 [Dồn từ Năm 1] Viết CV ATS tích hợp link GitHub chứa dự án Excel, C++, SQL & Python",
      "Kỹ năng Phỏng vấn & Giao tiếp trong môi trường doanh nghiệp",
      "Hiểu quy trình vận hành hệ thống ERP / MIS",
      "Kỹ năng Báo cáo & Trình bày dữ liệu trực quan cho Quản lý",
    ],
    projects: [
      "CV cá nhân chuyên nghiệp chuẩn ATS tích hợp link GitHub Portfolio",
      "Portfolio Website / Bản trình bày 3-5 dự án xuất sắc nhất (Excel, SQL, Power BI)",
    ],
    details: [
      "Chủ động ứng tuyển các vị trí: Data Analyst Intern, BI Intern, MIS Intern hoặc Research Assistant.",
      "Sử dụng các dự án gộp từ Năm 1 và Năm 2 để chứng minh năng lực đa nhiệm cả về logic lập trình lẫn tư duy phân tích dữ liệu.",
    ],
  },
  {
    id: "stage-4",
    title: "Giai đoạn 4: Bứt Phá Công Nghệ, OOP ETL Pipeline & Tiếng Anh",
    subtitle: "Năm 3",
    timeframe: "Học kỳ 5 & 6 - Năm 3",
    goal: "Thi lấy bằng Tiếng Anh IELTS 6.5+ (dồn từ Năm 1), áp dụng tư duy OOP (từ C++) vào Python Data Pipeline, Machine Learning cơ bản & 10 dự án lớn.",
    skills: [
      "📌 [Dồn từ Năm 1] Tiếng Anh Học Thuật & Chuyên ngành Data (Đạt mục tiêu IELTS 6.5 - 7.0)",
      "📌 [Dồn từ Năm 1] Áp dụng Tư duy OOP (từ C++) vào viết Python Object-Oriented ETL Scripts",
      "Thống kê ứng dụng (Statistics for Data Science, Hypothesis Testing)",
      "Machine Learning cơ bản (Regression, Customer Segmentation)",
      "Data Warehouse & Thiết kế ETL Pipeline (SSIS, Python Automation, dbt)",
      "Sử dụng thêm BI tools khác: Tableau, Looker Studio",
    ],
    projects: [
      "ETL Pipeline tự động cào & xử lý dữ liệu TMĐT (Shopee/Lazada)",
      "Dự báo doanh thu (Revenue Forecasting) & Phân khúc khách hàng (K-Means)",
      "10 Dự án lớn hoàn chỉnh đưa lên GitHub kèm tài liệu giải thích chi tiết",
    ],
    details: [
      "Thời điểm vàng để thi chứng chỉ Tiếng Anh IELTS 6.5+ nhờ giai đoạn tích lũy dồn từ Năm 1.",
      "Biến tư duy C++ OOP từ Năm 1 thành lợi thế cạnh tranh khi xây dựng các Data Pipeline phức tạp bằng Python.",
    ],
  },
  {
    id: "stage-5",
    title: "Giai đoạn 5: Thực Tập Doanh Nghiệp Quy Mô Lớn",
    subtitle: "Cuối năm 3",
    timeframe: "Học kỳ hè Năm 3",
    goal: "Thực tập tại các tập đoàn công nghệ lớn, ngân hàng hoặc công ty đa quốc gia.",
    skills: [
      "SQL nâng cao cho Big Data",
      "Thực chiến với Cloud Data Platforms (Google Cloud Platform / AWS / BigQuery)",
      "Tư duy giải quyết vấn đề (Problem Solving) bằng dữ liệu",
      "Kỹ năng phản biện và trình bày trước Ban Giám Đốc",
    ],
    projects: [
      "Dự án phân tích dữ liệu quy mô lớn (Big Data) tại doanh nghiệp thực tập",
      "Tối ưu hóa các truy vấn SQL chậm trong hệ thống báo cáo",
    ],
    details: [
      "Ứng tuyển vào các tập đoàn công nghệ lớn hoặc ngân hàng: FPT, Viettel, VNG, Techcombank, Shopee...",
      "Thể hiện sự kết hợp hoàn hảo giữa kỹ năng kỹ thuật chắc chắn và hiểu biết nghiệp vụ kinh doanh.",
    ],
  },
  {
    id: "stage-6",
    title: "Giai đoạn 6: Hoàn Thiện Portfolio & Chinh Phục Thị Trường",
    subtitle: "Năm 4",
    timeframe: "Học kỳ 7 & 8 - Năm 4",
    goal: "Tốt nghiệp Đại học GPA Giỏi/Xuất sắc, sở hữu Portfolio 15-20 dự án gộp trọn vẹn 4 năm, ký hợp đồng Official Data Analyst.",
    skills: [
      "📌 [Dồn từ Năm 1] Tổng hợp trọn bộ kỹ năng (C++, Excel, SQL, Python, Power BI, Cloud) vào Portfolio",
      "Kỹ năng viết hồ sơ LinkedIn, xây dựng Personal Brand",
      "Luyện phỏng vấn Mock Interview trực tiếp",
      "Lấy chứng chỉ quốc tế uy tín (Microsoft Power BI PL-300 / Google Data Analytics)",
    ],
    projects: [
      "Portfolio Website hoàn chỉnh trưng bày 15-20 dự án xuất sắc từ Năm 1 đến Năm 4",
      "Đồ án tốt nghiệp MIS ứng dụng sâu về Data Analytics",
    ],
    details: [
      "Hoàn thành xuất sắc chặng đường 4 năm dù từng chưa xong kỹ năng Năm 1.",
      "Sở hữu hồ sơ nổi bật vượt trội so với bạn bè đồng trang lứa, sẵn sàng nhận lương khởi điểm 12 - 18 triệu/tháng.",
    ],
  },
];

export const AGE_MILESTONES: AgeGoal[] = [
  {
    age: 19,
    goal: "Hoàn thành Năm 1 - Chuẩn bị dồn kỹ năng chưa xong sang 3 năm còn lại",
    subgoals: [
      "Đã kết thúc chương trình học Năm 1 Đại học",
      "Nhận diện các kỹ năng Năm 1 chưa hoàn thiện (C++, Excel, Git, Tiếng Anh)",
      "Sẵn sàng tâm lý bước sang Năm 2 với Lộ trình dồn & phân bổ thông minh sang 3 năm còn lại",
    ],
  },
  {
    age: 20,
    goal: "Tích hợp Excel Nâng cao & C++ Logic + Học SQL, Python, Power BI (Năm 2)",
    subgoals: [
      "Học cấp tốc Excel Nâng cao (Pivot Tables, Power Query) & 50 bài tập C++/Python rèn tư duy",
      "Thành thạo SQL chuyên sâu (JOIN, Window Functions, CTEs) với 300+ queries",
      "Làm chủ Python Pandas/NumPy & Xây dựng 5 Dashboard Power BI chuẩn Star Schema",
      "Đưa toàn bộ dự án lên GitHub cá nhân",
    ],
  },
  {
    age: 21,
    goal: "Thi IELTS 6.5+, Học Data Warehouse/ETL (dồn OOP C++) & Thực tập Data Analyst (Năm 3)",
    subgoals: [
      "Đạt mục tiêu IELTS 6.5+ (kỹ năng dồn từ Năm 1)",
      "Ứng dụng tư duy OOP C++ vào Python ETL Pipeline & Data Warehouse",
      "Hoàn thành kỳ Thực tập sinh Data Analyst / BI Intern đầu tiên",
      "Hoàn thành 8 - 10 dự án lớn trong Portfolio",
    ],
  },
  {
    age: 22,
    goal: "Tốt nghiệp Xuất sắc, Portfolio 15-20 dự án & Nhận việc Official Data Analyst (Năm 4)",
    subgoals: [
      "Tốt nghiệp đúng hạn với GPA giỏi/xuất sắc",
      "Sở hữu Portfolio Website chuyên nghiệp tích hợp kỹ năng tổng hợp 4 năm",
      "Lấy chứng chỉ quốc tế Microsoft Power BI (PL-300) / Google Data Analytics",
      "Nhận offer chính thức Data Analyst với mức lương 12 - 18 triệu/tháng",
    ],
  },
  {
    age: 23,
    goal: "1 năm kinh nghiệm, nâng cao SQL Big Data, BI nâng cao, ETL Pipeline",
    subgoals: [
      "Nâng cao kỹ năng thiết kế ETL Pipeline tự động",
      "Làm chủ các công cụ Big Data như BigQuery, Snowflake",
      "Đóng góp giá trị kinh tế trực tiếp cho doanh nghiệp thông qua các đề xuất dữ liệu",
    ],
  },
  {
    age: 24,
    goal: "2 năm kinh nghiệm, chuyển sang doanh nghiệp quy mô lớn hoặc thăng tiến Senior",
    subgoals: [
      "Tích lũy hồ sơ đủ mạnh để ứng tuyển vào các tập đoàn lớn hơn",
      "Mức lương nâng lên 18 - 30 triệu/tháng nếu năng lực thực tế tốt",
      "Xây dựng mạng lưới quan hệ sâu rộng trong cộng đồng Data Việt Nam",
    ],
  },
  {
    age: 25,
    goal: "Ổn định sự nghiệp ở vị trí Senior Data Analyst / BI Specialist",
    subgoals: [
      "Làm việc ở các vị trí Senior Data Analyst, BI Specialist hoặc Team Lead",
      "Định hình phong cách làm việc chuyên nghiệp, có khả năng làm chủ cả Kỹ thuật và Nghiệp vụ (Business domain)",
      "Mở rộng sang vai trò Business Analyst hoặc Data Engineer nếu phù hợp",
    ],
  },
];

export const SCHEDULE_TIMEBLOCKS_MON: TimeBlock[] = [
  { id: "mon-1", time: "05:00 - 05:20", activity: "Thức dậy, vệ sinh, lập kế hoạch", objective: "Chuẩn bị năng lượng tinh thần", category: "life" },
  { id: "mon-2", time: "05:20 - 07:20", activity: "Deep Work 1: C++ / Thuật toán", objective: "Giải quyết 2 bài toán thuật toán rèn tư duy logic", category: "work" },
  { id: "mon-3", time: "07:20 - 08:00", activity: "Ăn sáng, hồi phục năng lượng", objective: "Bữa sáng dinh dưỡng", category: "life" },
  { id: "mon-4", time: "08:00 - 10:00", activity: "Tự học SQL chuyên sâu", objective: "Học CTEs, Window Functions & thực hành 15 câu", category: "study" },
  { id: "mon-5", time: "10:00 - 11:00", activity: "Tiếng Anh chuyên ngành", objective: "Đọc 1 bài báo Data Science, học 15 từ vựng", category: "study" },
  { id: "mon-6", time: "11:00 - 13:00", activity: "Nghỉ ngơi & Ăn trưa", objective: "Ngủ trưa ngắn 20 phút để tái tạo năng lượng", category: "rest" },
  { id: "mon-7", time: "13:30 - 15:30", activity: "Python Phân tích dữ liệu", objective: "Thực hành xử lý dữ liệu khuyết bằng Pandas DataFrame", category: "study" },
  { id: "mon-8", time: "15:45 - 17:15", activity: "Power BI & Excel nâng cao", objective: "Xây dựng mô hình dữ liệu Star Schema cho dự án", category: "project" },
  { id: "mon-9", time: "17:15 - 18:30", activity: "Giải trí & Thể dục thể thao", objective: "Đi bộ, chạy bộ nâng cao sức bền thể chất", category: "life" },
  { id: "mon-10", time: "19:00 - 21:00", activity: "Làm Dự án Cá nhân / GitHub", objective: "Xây dựng portfolio, viết tài liệu README, commit code", category: "project" },
  { id: "mon-11", time: "21:00 - 22:00", activity: "Ôn tập kiến thức Đại học", objective: "Làm bài tập các môn trên trường (Database, Kế toán...)", category: "study" },
  { id: "mon-12", time: "22:00 - 23:00", activity: "Dự phòng & Thư giãn nhẹ", objective: "Đọc sách, lập kế hoạch chi tiết cho ngày mai", category: "life" },
  { id: "mon-13", time: "23:00 - 05:00", activity: "Ngủ giấc sâu phục hồi", objective: "Đảm bảo chất lượng giấc ngủ tối đa", category: "rest" },
];

export const SCHEDULE_TIMEBLOCKS_THU: TimeBlock[] = [
  { id: "thu-1", time: "05:00 - 05:20", activity: "Thức dậy, vệ sinh cá nhân", objective: "Khởi đầu ngày mới tỉnh táo", category: "life" },
  { id: "thu-2", time: "05:20 - 06:40", activity: "Deep Work: Chuẩn bị bài trước lớp", objective: "Đọc slide môn Mạng máy tính & Cơ sở dữ liệu", category: "study" },
  { id: "thu-3", time: "07:00 - 11:05", activity: "Học trên trường: Mạng máy tính", objective: "Tập trung tiếp thu lý thuyết mạng, DNS, IP", category: "work" },
  { id: "thu-4", time: "11:15 - 12:45", activity: "Ăn trưa & Nghỉ ngơi ngắn", objective: "Phục hồi chuẩn bị cho ca chiều", category: "rest" },
  { id: "thu-5", time: "13:00 - 17:05", activity: "Học trên trường: Cơ sở dữ liệu", objective: "Môn cực kỳ quan trọng! Ghi chép kỹ phần chuẩn hóa DB", category: "work" },
  { id: "thu-6", time: "17:15 - 18:00", activity: "Thể thao nhẹ / Thư giãn", objective: "Xả stress sau một ngày học căng thẳng", category: "life" },
  { id: "thu-7", time: "18:30 - 20:30", activity: "Thực hành ngay SQL Database", objective: "Viết truy vấn SQL thực tế dựa trên bài học chiều nay", category: "study" },
  { id: "thu-8", time: "20:30 - 22:00", activity: "Hoàn thiện bài tập Đại học", objective: "Làm bài tập Mạng máy tính & các bài tập khác", category: "study" },
  { id: "thu-9", time: "22:00 - 23:00", activity: "Đọc tài liệu tiếng Anh / Note-taking", objective: "Tổng hợp bài học vào Notion, lập plan ngày mai", category: "life" },
  { id: "thu-10", time: "23:00 - 05:00", activity: "Ngủ ngon giấc", objective: "Ngủ sâu để duy trì sức khỏe não bộ", category: "rest" },
];

export const DEFAULT_WEEKLY_KPIS: WeeklyKPI[] = [
  { id: "kpi-cpp", name: "C++ Coding Exercises", target: 20, current: 0, unit: "bài" },
  { id: "kpi-sql", name: "SQL Practice Queries", target: 40, current: 0, unit: "bài" },
  { id: "kpi-python", name: "Python Jupyter Notebooks", target: 5, current: 0, unit: "notebook" },
  { id: "kpi-powerbi", name: "Power BI Dashboards Built", target: 2, current: 0, unit: "dashboard" },
  { id: "kpi-github", name: "GitHub Commits", target: 7, current: 0, unit: "commit" },
  { id: "kpi-english", name: "English Academic Reading/IELTS", target: 7, current: 0, unit: "giờ" },
  { id: "kpi-project", name: "Project Milestones Achieved", target: 1, current: 0, unit: "milestone" },
];

export const MOCK_PROJECTS: PortfolioProject[] = [
  {
    id: "proj-1",
    title: "Ứng dụng Quản lý Sinh viên bằng C++ OOP Console",
    category: "C++",
    description: "Hệ thống dòng lệnh quản lý hồ sơ sinh viên, điểm số, tìm kiếm, sắp xếp thuật toán tối ưu và ghi file bền vững.",
    status: "Completed",
    techStack: ["C++", "OOP", "Algorithm", "File I/O"],
    githubUrl: "https://github.com/example/cpp-student-management",
  },
  {
    id: "proj-2",
    title: "SQL Case Study: Phân tích Dữ liệu Bán hàng Doanh nghiệp",
    category: "SQL",
    description: "Sử dụng truy vấn SQL phức tạp gồm Subqueries, CTEs, Window Functions để phân tích doanh số, xu hướng mua hàng của khách hàng.",
    status: "In Progress",
    techStack: ["PostgreSQL", "CTEs", "Window Functions", "Data Modeling"],
    githubUrl: "https://github.com/example/sql-sales-case-study",
  },
  {
    id: "proj-3",
    title: "Phân tích Tập dữ liệu FIFA Players & Starbucks Sales",
    category: "Python",
    description: "Sử dụng Python Pandas, NumPy và Seaborn để làm sạch dữ liệu thô, thực hiện EDA (Phân tích khám phá dữ liệu) và trực quan hóa kết quả.",
    status: "Planning",
    techStack: ["Python", "Pandas", "NumPy", "Seaborn", "Jupyter Notebook"],
  },
  {
    id: "proj-4",
    title: "Enterprise Revenue Star Schema Dashboard",
    category: "Power BI",
    description: "Xây dựng Dashboard hoàn chỉnh dựa trên mô hình Star Schema chuẩn, viết các hàm DAX nâng cao để tính toán doanh thu YoY, MoM.",
    status: "Planning",
    techStack: ["Power BI", "Power Query", "DAX", "Star Schema", "UI Layout Design"],
  },
];

export const RECOMMENDATIONS = [
  {
    category: "Lộ trình & Cộng đồng",
    items: [
      { name: "Madzy Nguyen's Data Analytics Roadmap 2026", url: "https://madzynguyen.com/data-analytics-roadmap-2026/", description: "Lộ trình cực kỳ chi tiết, cập nhật xu hướng thị trường tuyển dụng dữ liệu mới nhất." },
      { name: "Video: Lộ trình học Data Analyst cho người bắt đầu", url: "https://www.youtube.com/watch?v=uGouKEuej4k", description: "Bí quyết chuyển ngành và học tập hiệu quả từ chuyên gia Data giàu kinh nghiệm." },
    ],
  },
  {
    category: "Luyện Tập Lập Trình & SQL",
    items: [
      { name: "HackerRank (SQL & C++ track)", url: "https://www.hackerrank.com/", description: "Nền tảng luyện tập tuyệt vời để kiếm các badge SQL và giải quyết thuật toán C++ cơ bản." },
      { name: "LeetCode (SQL Study Plan)", url: "https://leetcode.com/", description: "Phù hợp để luyện tập các câu hỏi truy vấn SQL phỏng vấn từ mức độ Medium trở lên." },
      { name: "SQLZoo", url: "https://sqlzoo.net/", description: "Trang web tương tác trực tiếp giúp học cú pháp SQL vô cùng trực quan." },
    ],
  },
  {
    category: "Học Python & BI",
    items: [
      { name: "Kaggle Datasets", url: "https://www.kaggle.com/datasets", description: "Kho dữ liệu khổng lồ chứa hàng triệu tập dữ liệu thực tế (FIFA, Starbucks, Netflix, Shopee) để bạn tha hồ vọc vạch." },
      { name: "Google Data Analytics Professional Certificate", url: "https://www.coursera.org/professional-certificates/google-data-analytics", description: "Chứng chỉ vàng cung cấp kiến thức nền tảng, tư duy giải quyết vấn đề bằng dữ liệu." },
      { name: "Microsoft Certified: Power BI Data Analyst Associate (PL-300)", url: "https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/", description: "Chứng chỉ khẳng định năng lực thiết kế dashboard và chuẩn hóa dữ liệu doanh nghiệp." },
    ],
  },
];
