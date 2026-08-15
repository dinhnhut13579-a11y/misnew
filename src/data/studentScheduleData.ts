import { TimeBlock } from "../types";

export interface UniversityCourse {
  stt: number;
  courseCode: string;
  courseName: string;
  credits: number;
  scheduleText: string;
  dayOfWeek: "Thứ Hai" | "Thứ Ba" | "Thứ Tư" | "Thứ Năm" | "Thứ Sáu" | "Thứ Bảy" | "Chủ Nhật" | "Linh hoạt";
  dayKey: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  timeSlot: string; // e.g. "07:00 - 11:05"
  room: string;
  campus: string;
  startDate: string;
  endDate: string;
  registerDate: string;
  phase: "Đợt 1 (09/2026 - 10/2026)" | "Đợt 2 (11/2026 - 01/2027)" | "Toàn kỳ / Kiến tập";
  importance: "Cốt lõi Ngành MIS & Data" | "Nền tảng Kế toán & Tài chính" | "Kiến thức Đại cương" | "Rèn luyện Thể chất" | "Thực tế Doanh nghiệp";
  note: string;
}

export interface StudentProfile {
  fullName: string;
  studentId: string;
  className: string;
  level: string;
  trainingType: string;
  phone: string;
  semester: string;
  totalCredits: number;
  universityName: string;
  campusAddress: string;
}

export const CURRENT_STUDENT_PROFILE: StudentProfile = {
  fullName: "Nguyễn Đình Nhựt",
  studentId: "030241250114",
  className: "DH41HT01",
  level: "Đại học",
  trainingType: "Đại học khóa 41 (MIS - Hệ thống thông tin quản lý)",
  phone: "0355138474",
  semester: "HK01/2026-2027 (Học kỳ 1 - Năm 2)",
  totalCredits: 19,
  universityName: "Trường Đại học Ngân hàng TP.HCM (HUB)",
  campusAddress: "56 Hoàng Diệu 2, TP. Thủ Đức, TP. Hồ Chí Minh"
};

export const REGISTERED_COURSES: UniversityCourse[] = [
  {
    stt: 1,
    courseCode: "ITS707_2611_1_D01",
    courseName: "Kiến tập ngành Hệ thống thông tin quản lý",
    credits: 1,
    scheduleText: "Kiến tập thực tế doanh nghiệp",
    dayOfWeek: "Linh hoạt",
    dayKey: "Mon",
    timeSlot: "Linh hoạt theo doanh nghiệp",
    room: "Doanh nghiệp / Online",
    campus: "56 Hoàng Diệu 2 - Thủ Đức",
    startDate: "08/07/2026",
    endDate: "30/10/2026",
    registerDate: "08/07/2026",
    phase: "Toàn kỳ / Kiến tập",
    importance: "Thực tế Doanh nghiệp",
    note: "Tìm hiểu quy trình vận hành hệ thống thông tin, hạ tầng ERP và Data tại doanh nghiệp thực tế."
  },
  {
    stt: 2,
    courseCode: "ITS709_2611_1_D05",
    courseName: "Mạng máy tính và truyền thông",
    credits: 3,
    scheduleText: "Thứ Năm, 7H00 - 11h05, C205, 56 Hoàng Diệu 2 - Thủ Đức",
    dayOfWeek: "Thứ Năm",
    dayKey: "Thu",
    timeSlot: "07:00 - 11:05",
    room: "C205",
    campus: "56 Hoàng Diệu 2 - Thủ Đức",
    startDate: "03/09/2026",
    endDate: "29/10/2026",
    registerDate: "02/07/2026",
    phase: "Đợt 1 (09/2026 - 10/2026)",
    importance: "Cốt lõi Ngành MIS & Data",
    note: "Nắm vững mô hình OSI/TCP-IP, định tuyến IP, DNS, giao thức mạng hỗ trợ truyền dữ liệu Data Pipeline."
  },
  {
    stt: 3,
    courseCode: "ITS302_2611_1_D04",
    courseName: "Cơ sở dữ liệu",
    credits: 3,
    scheduleText: "Thứ Năm, 13H00 - 17h05, C201, 56 Hoàng Diệu 2 - Thủ Đức",
    dayOfWeek: "Thứ Năm",
    dayKey: "Thu",
    timeSlot: "13:00 - 17:05",
    room: "C201",
    campus: "56 Hoàng Diệu 2 - Thủ Đức",
    startDate: "03/09/2026",
    endDate: "29/10/2026",
    registerDate: "02/07/2026",
    phase: "Đợt 1 (09/2026 - 10/2026)",
    importance: "Cốt lõi Ngành MIS & Data",
    note: "Môn học LINH HỒN của Data Analyst / Data Engineer! Học mô hình thực thể ERD, chuẩn hóa 1NF/2NF/3NF, đại số quan hệ và SQL nâng cao."
  },
  {
    stt: 4,
    courseCode: "ACC301_2614_1_D07",
    courseName: "Nguyên lý kế toán",
    credits: 3,
    scheduleText: "Thứ Sáu, 7H00 - 11h05, B1.106, 56 Hoàng Diệu 2 - Thủ Đức",
    dayOfWeek: "Thứ Sáu",
    dayKey: "Fri",
    timeSlot: "07:00 - 11:05",
    room: "B1.106",
    campus: "56 Hoàng Diệu 2 - Thủ Đức",
    startDate: "04/09/2026",
    endDate: "30/10/2026",
    registerDate: "02/07/2026",
    phase: "Đợt 1 (09/2026 - 10/2026)",
    importance: "Nền tảng Kế toán & Tài chính",
    note: "Cung cấp tư duy nghiệp vụ tài chính, định khoản nợ/có, lập Báo cáo kết quả kinh doanh và Bảng cân đối kế toán cho dashboard Power BI."
  },
  {
    stt: 5,
    courseCode: "MLM307_2611_1_D10",
    courseName: "Kinh tế chính trị Mác - Lênin",
    credits: 2,
    scheduleText: "Thứ Tư, 13H00 - 17h05, A102, 56 Hoàng Diệu 2 - Thủ Đức",
    dayOfWeek: "Thứ Tư",
    dayKey: "Wed",
    timeSlot: "13:00 - 17:05",
    room: "A102",
    campus: "56 Hoàng Diệu 2 - Thủ Đức",
    startDate: "09/09/2026",
    endDate: "14/10/2026",
    registerDate: "02/07/2026",
    phase: "Đợt 1 (09/2026 - 10/2026)",
    importance: "Kiến thức Đại cương",
    note: "Hiểu quy luật giá trị, thặng dư và quy luật vận động của nền kinh tế thị trường."
  },
  {
    stt: 6,
    courseCode: "GYM303_2617_1_CL_D20",
    courseName: "Học phần GDTC 3",
    credits: 1,
    scheduleText: "Thứ Tư, 7H00 - 11h05 (Ca 1 & Ca 2), San1, 56 Hoàng Diệu 2 - Thủ Đức",
    dayOfWeek: "Thứ Tư",
    dayKey: "Wed",
    timeSlot: "07:00 - 11:05",
    room: "San1 (Sân 1)",
    campus: "56 Hoàng Diệu 2 - Thủ Đức",
    startDate: "09/09/2026",
    endDate: "14/10/2026",
    registerDate: "04/07/2026",
    phase: "Đợt 1 (09/2026 - 10/2026)",
    importance: "Rèn luyện Thể chất",
    note: "Rèn luyện thể lực, nâng cao sức bền phục vụ học tập và Deep Work."
  },
  {
    stt: 7,
    courseCode: "ITS711_261_1_D01",
    courseName: "Phân tích kinh doanh",
    credits: 3,
    scheduleText: "Thứ Tư, 7H00 - 11h05, B1.306, 56 Hoàng Diệu 2 - Thủ Đức",
    dayOfWeek: "Thứ Tư",
    dayKey: "Wed",
    timeSlot: "07:00 - 11:05",
    room: "B1.306",
    campus: "56 Hoàng Diệu 2 - Thủ Đức",
    startDate: "18/11/2026",
    endDate: "13/01/2027",
    registerDate: "07/07/2026",
    phase: "Đợt 2 (11/2026 - 01/2027)",
    importance: "Cốt lõi Ngành MIS & Data",
    note: "Trọng tâm phân tích nghiệp vụ (Business Analysis - BA), phân tích yêu cầu phần mềm, mô hình hóa quy trình BPMN."
  },
  {
    stt: 8,
    courseCode: "ITS724_261_1_D03",
    courseName: "Giải thuật ứng dụng trong kinh doanh",
    credits: 3,
    scheduleText: "Thứ Tư, 13H00 - 17h05, C201, 56 Hoàng Diệu 2 - Thủ Đức",
    dayOfWeek: "Thứ Tư",
    dayKey: "Wed",
    timeSlot: "13:00 - 17:05",
    room: "C201",
    campus: "56 Hoàng Diệu 2 - Thủ Đức",
    startDate: "18/11/2026",
    endDate: "13/01/2027",
    registerDate: "02/07/2026",
    phase: "Đợt 2 (11/2026 - 01/2027)",
    importance: "Cốt lõi Ngành MIS & Data",
    note: "Ứng dụng các giải thuật tối ưu hóa, quy hoạch tuyến tính, bài toán vận tải và thuật toán phân tích dữ liệu kinh doanh."
  }
];

// Phase 1 Master Schedule Preset (Tháng 9/2026 - Cuối Tháng 10/2026)
export const HUB_PHASE_1_SCHEDULE: Record<string, TimeBlock[]> = {
  Mon: [
    { id: "mon-1", time: "04:00 - 04:30", activity: "Thức dậy sớm & Chọn thức uống tỉnh táo ☕", objective: "Bù nước, vệ sinh & nạp caffeine tăng tập trung", category: "life" },
    { id: "mon-2", time: "04:30 - 06:30", activity: "Deep Work 1: C++ & Luyện Thuật Toán", objective: "Giải 2 bài toán cấu trúc dữ liệu trên HackerRank", category: "work" },
    { id: "mon-3", time: "06:30 - 07:30", activity: "Ăn sáng dinh dưỡng & Thể thao nhẹ", objective: "Khởi động cơ bắp cho ngày học", category: "life" },
    { id: "mon-4", time: "07:30 - 11:00", activity: "🌟 Tự Học: SQL Chuyên Sâu & Window Functions", objective: "Làm chủ ROW_NUMBER, RANK, DENSE_RANK, LAG/LEAD trên LeetCode", category: "study" },
    { id: "mon-5", time: "11:00 - 13:00", activity: "Nghỉ ngơi & Ăn trưa", objective: "Ngủ trưa ngắn 20-30 phút tái tạo năng lượng não bộ", category: "rest" },
    { id: "mon-6", time: "13:30 - 16:00", activity: "🌟 Tự Học: Python Phân Tích Dữ Liệu (Pandas)", objective: "Làm sạch dữ liệu thô, xử lý null & reshape DataFrame", category: "study" },
    { id: "mon-7", time: "16:00 - 17:15", activity: "Tiếng Anh Chuyên Ngành Data", objective: "Đọc 1 bài báo Data Science, ghi chép 15 từ vựng chuyên ngành", category: "study" },
    { id: "mon-8", time: "17:15 - 18:30", activity: "Thể thao buổi chiều 🏃", objective: "Chạy bộ / Tập gym nâng cao sức bền thể lực", category: "life" },
    { id: "mon-9", time: "19:00 - 21:00", activity: "Xây Dựng Dự Án Portfolio / GitHub Commit", objective: "Đóng gói mã nguồn dự án SQL & Python, cập nhật README", category: "project" },
    { id: "mon-10", time: "21:00 - 22:00", activity: "Ôn tập kiến thức Đại học (Kiến tập MIS)", objective: "Tìm hiểu cấu trúc hệ thống ERP doanh nghiệp", category: "study" },
    { id: "mon-11", time: "22:00 - 23:00", activity: "Đọc sách công nghệ & Lập kế hoạch ngày mai", objective: "Chuẩn bị tâm thế chủ động", category: "life" },
    { id: "mon-12", time: "23:00 - 04:00", activity: "Ngủ sâu phục hồi 😴", objective: "Đảm bảo chất lượng giấc ngủ tối đa", category: "rest" },
  ],
  Tue: [
    { id: "tue-1", time: "04:00 - 04:30", activity: "Thức dậy sớm & Chọn thức uống tỉnh táo ☕", objective: "Bù nước, khởi động ngày mới tràn đầy sức sống", category: "life" },
    { id: "tue-2", time: "04:30 - 06:30", activity: "Deep Work 1: Python Data Wrangling", objective: "Xử lý dữ liệu định dạng JSON, CSV, API", category: "work" },
    { id: "tue-3", time: "06:30 - 07:30", activity: "Ăn sáng & Đọc tin tức công nghệ", objective: "Nạp năng lượng và cập nhật xu hướng Data", category: "life" },
    { id: "tue-4", time: "07:30 - 11:00", activity: "🌟 Tự Học: Power BI & Chuẩn Star Schema", objective: "Thiết kế Fact/Dimension tables, viết các hàm DAX CALCULATE", category: "project" },
    { id: "tue-5", time: "11:00 - 13:00", activity: "Nghỉ ngơi & Ăn trưa", objective: "Nghỉ ngơi nạp pin", category: "rest" },
    { id: "tue-6", time: "13:30 - 16:30", activity: "🌟 Tự Học: Giải Bài Tập SQL Doanh Nghiệp", objective: "Thực hành giải 10 bài toán phức tạp trên Stratascratch", category: "study" },
    { id: "tue-7", time: "17:00 - 18:30", activity: "Thể dục thể thao buổi chiều", objective: "Đạp xe hoặc chạy bộ thư giãn", category: "life" },
    { id: "tue-8", time: "19:00 - 21:30", activity: "Deep Work Tối: Thiết Kế Layout Dashboard Power BI", objective: "Hoàn thiện 1 trang báo cáo Doanh số Bán lẻ", category: "project" },
    { id: "tue-9", time: "21:30 - 22:30", activity: "Ôn tập chuẩn bị bài trường cho Thứ Tư", objective: "Xem giáo trình GDTC & đọc giáo trình Kinh tế chính trị", category: "study" },
    { id: "tue-10", time: "23:00 - 04:00", activity: "Ngủ sâu phục hồi 😴", objective: "Sẵn sàng cho ngày học tại giảng đường HUB", category: "rest" },
  ],
  Wed: [
    { id: "wed-1", time: "04:00 - 04:30", activity: "Thức dậy sớm & Chọn thức uống tỉnh táo ☕", objective: "Bù nước, vệ sinh chuẩn bị trang phục đi học", category: "life" },
    { id: "wed-2", time: "04:30 - 06:15", activity: "Deep Work: Đọc trước bài Kinh tế chính trị Mác - Lênin", objective: "Ghi chú các câu hỏi cốt lõi trước giờ lên lớp", category: "study" },
    { id: "wed-3", time: "06:15 - 07:00", activity: "Ăn sáng & Di chuyển đến HUB (56 Hoàng Diệu 2)", objective: "Có mặt tại Sân 1 đúng 06:50", category: "life" },
    { id: "wed-4", time: "07:00 - 11:05", activity: "🏫 HỌC TRƯỜNG HUB: Học phần GDTC 3 (GYM303) — San1", objective: "Rèn luyện thể lực, nâng cao sức khỏe tại Sân 1 HUB", category: "work" },
    { id: "wed-5", time: "11:15 - 12:45", activity: "Ăn trưa tại căn tin & Nghỉ ngơi ngắn", objective: "Hồi phục năng lượng chuẩn bị cho ca chiều", category: "rest" },
    { id: "wed-6", time: "13:00 - 17:05", activity: "🏫 HỌC TRƯỜNG HUB: Kinh tế chính trị Mác - Lênin (MLM307) — Phòng A102", objective: "Tiếp thu bài giảng của Giảng viên, ghi chép khái niệm kinh tế thị trường", category: "work" },
    { id: "wed-7", time: "17:15 - 18:30", activity: "Di chuyển về nhà, tắm rửa & Thư giãn", objective: "Thư giãn nhẹ nhàng sau ngày học trên trường", category: "life" },
    { id: "wed-8", time: "19:00 - 21:30", activity: "🌟 Deep Work: Thực hành SQL & Đọc Sách Nghiệp Vụ", objective: "Luyện 10 câu truy vấn SQL liên quan đến dữ liệu kinh tế", category: "study" },
    { id: "wed-9", time: "21:30 - 22:30", activity: "Đọc trước bài cho ngày mai: Mạng máy tính & Cơ sở dữ liệu", objective: "Chuẩn bị cực kỳ kỹ cho 2 môn chuyên ngành ngày Thứ Năm", category: "study" },
    { id: "wed-10", time: "23:00 - 04:00", activity: "Ngủ sâu phục hồi 😴", objective: "Nạp năng lượng cho ngày học chuyên ngành quan trọng", category: "rest" },
  ],
  Thu: [
    { id: "thu-1", time: "04:00 - 04:30", activity: "Thức dậy sớm & Chọn thức uống tỉnh táo ☕", objective: "Bù nước, nạp năng lượng tinh thần cao độ", category: "life" },
    { id: "thu-2", time: "04:30 - 06:15", activity: "Deep Work: Xem trước Slide Cơ sở dữ liệu (ITS302)", objective: "Chuẩn bị các câu hỏi về ERD, khóa chính, khóa ngoại, chuẩn hóa", category: "study" },
    { id: "thu-3", time: "06:15 - 07:00", activity: "Ăn sáng & Di chuyển đến HUB (56 Hoàng Diệu 2)", objective: "Đến phòng C205 đúng giờ", category: "life" },
    { id: "thu-4", time: "07:00 - 11:05", activity: "🏫 HỌC TRƯỜNG HUB: Mạng máy tính và truyền thông (ITS709) — Phòng C205", objective: "Học lý thuyết mạng, địa chỉ IP, subnetting, định tuyến Cisco", category: "work" },
    { id: "thu-5", time: "11:15 - 12:45", activity: "Ăn trưa & Nghỉ trưa tại khuôn viên trường", objective: "Ngủ ngắn 20 phút nạp pin não bộ", category: "rest" },
    { id: "thu-6", time: "13:00 - 17:05", activity: "🏫 HỌC TRƯỜNG HUB: Cơ sở dữ liệu (ITS302) — Phòng C201", objective: "🌟 MÔN CỐT LÕI DATA: Tập trung cao độ tiếp thu thiết kế DB, quan hệ bảng & câu lệnh SQL", category: "work" },
    { id: "thu-7", time: "17:15 - 18:30", activity: "Di chuyển về & Thể thao nhẹ nhàng", objective: "Xả stress sau 2 ca học căng thẳng", category: "life" },
    { id: "thu-8", time: "19:00 - 21:30", activity: "⭐ THỰC HÀNH NGAY: Code SQL Cơ Sở Dữ Liệu Trường", objective: "Gõ lại toàn bộ các câu lệnh SQL vừa học chiều nay vào PostgreSQL/MySQL", category: "study" },
    { id: "thu-9", time: "21:30 - 22:30", activity: "Làm bài tập Mạng máy tính & Chuẩn bị môn Kế toán", objective: "Đọc trước bài Nguyên lý kế toán sáng mai", category: "study" },
    { id: "thu-10", time: "23:00 - 04:00", activity: "Ngủ sâu phục hồi 😴", objective: "Giấc ngủ tự nhiên chất lượng cao", category: "rest" },
  ],
  Fri: [
    { id: "fri-1", time: "04:00 - 04:30", activity: "Thức dậy sớm & Chọn thức uống tỉnh táo ☕", objective: "Bù nước, vệ sinh cá nhân", category: "life" },
    { id: "fri-2", time: "04:30 - 06:15", activity: "Deep Work: Đọc trước bài Nguyên lý kế toán (ACC301)", objective: "Xem bảng hệ thống tài khoản kế toán, nợ/có", category: "study" },
    { id: "fri-3", time: "06:15 - 07:00", activity: "Ăn sáng & Di chuyển đến HUB (56 Hoàng Diệu 2)", objective: "Có mặt tại phòng B1.106 đúng 06:50", category: "life" },
    { id: "fri-4", time: "07:00 - 11:05", activity: "🏫 HỌC TRƯỜNG HUB: Nguyên lý kế toán (ACC301) — Phòng B1.106", objective: "Học nghiệp vụ định khoản nợ/có, chứng từ và báo cáo tài chính", category: "work" },
    { id: "fri-5", time: "11:15 - 13:00", activity: "Ăn trưa & Nghỉ trưa thong thả", objective: "Kết thúc lịch học trên lớp trong tuần", category: "rest" },
    { id: "fri-6", time: "13:30 - 16:30", activity: "🌟 Tự Học: Python Xử Lý Dữ Liệu Kế Toán / Bán Hàng", objective: "Dùng Pandas đọc file Excel kế toán, tổng hợp doanh thu và lợi nhuận", category: "study" },
    { id: "fri-7", time: "17:00 - 18:30", activity: "Chạy bộ / Thể thao chiều thứ Sáu", objective: "Xả năng lượng, duy trì sức khỏe tim mạch", category: "life" },
    { id: "fri-8", time: "19:00 - 21:30", activity: "Xây Dựng Dashboard Power BI: Financial & Sales Performance", objective: "Ứng dụng kiến thức Kế toán vừa học vào biểu đồ Power BI", category: "project" },
    { id: "fri-9", time: "21:30 - 22:30", activity: "Xem lại mục tiêu tuần & Thư giãn nhẹ", objective: "Nghe nhạc hoặc đọc sách thư giãn", category: "life" },
    { id: "fri-10", time: "23:00 - 04:00", activity: "Ngủ sâu phục hồi 😴", objective: "Chuẩn bị cho 2 ngày cuối tuần Deep Work", category: "rest" },
  ],
  Sat: [
    { id: "sat-1", time: "04:00 - 05:00", activity: "Thức dậy sớm & Chọn thức uống tỉnh táo ☕", objective: "Bù nước, vệ sinh & chọn đồ uống kích thích trí não", category: "life" },
    { id: "sat-2", time: "05:00 - 07:30", activity: "🌟 Deep Work: Khám Phá Kaggle Datasets Thực Tế", objective: "Tải dataset E-commerce / Banking để phân tích dự án Portfolio", category: "project" },
    { id: "sat-3", time: "07:30 - 09:00", activity: "Chạy bộ sáng & Ăn sáng thư thái", objective: "Duy trì rèn luyện thể lực dẻo dai", category: "life" },
    { id: "sat-4", time: "09:00 - 11:30", activity: "🌟 Tự Học: Giải Thuật C++ & Tư Duy Logic", objective: "Giải 5 bài toán mảng, chuỗi và con trỏ trên HackerRank", category: "study" },
    { id: "sat-5", time: "11:30 - 13:00", activity: "Ăn trưa & Gặp gỡ bạn bè / Gia đình", objective: "Kết nối xã hội, xả stress cuối tuần", category: "life" },
    { id: "sat-6", time: "14:00 - 17:00", activity: "🌟 Deep Work: Xây Dựng Dashboard Power BI Hoàn Chỉnh", objective: "Thiết kế tương tác slicers, drill-through và publish lên web", category: "project" },
    { id: "sat-7", time: "17:30 - 19:00", activity: "Đá bóng / Tập gym", objective: "Rèn luyện thể lực cường độ cao", category: "life" },
    { id: "sat-8", time: "20:00 - 22:00", activity: "Luyện Đề Tiếng Anh IELTS Reading & Listening", objective: "Làm 1 bài test Cambridge IELTS, ghi chú từ vựng", category: "study" },
    { id: "sat-9", time: "22:00 - 23:00", activity: "Xem phim / Thư giãn nhẹ nhàng", objective: "Giải tỏa stress hoàn toàn", category: "rest" },
    { id: "sat-10", time: "23:00 - 04:00", activity: "Ngủ ngon giấc 😴", objective: "Giấc ngủ tự nhiên sâu giấc", category: "rest" },
  ],
  Sun: [
    { id: "sun-1", time: "04:00 - 05:00", activity: "Thức dậy sớm & Chọn thức uống tỉnh táo ☕", objective: "Bù nước, vệ sinh & khởi động ngày mới", category: "life" },
    { id: "sun-2", time: "05:00 - 07:30", activity: "🌟 Tự Học: Tiếng Anh Học Thuật & Đọc Sách Data", objective: "Đọc sách Designing Data-Intensive Applications", category: "study" },
    { id: "sun-3", time: "07:30 - 09:30", activity: "Uống cà phê sáng & Ăn sáng gia đình", objective: "Tận hưởng không khí yên bình sáng Chủ Nhật", category: "life" },
    { id: "sun-4", time: "09:30 - 11:30", activity: "🌟 Tổng Kết Tuần & Commit GitHub Portfolio", objective: "Đẩy toàn bộ code SQL, Python, Power BI trong tuần lên GitHub", category: "project" },
    { id: "sun-5", time: "11:30 - 13:30", activity: "Ăn trưa & Nghỉ trưa gia đình", objective: "Thời gian thư giãn", category: "rest" },
    { id: "sun-6", time: "14:00 - 16:30", activity: "Dọn dẹp bàn làm việc & Ôn lại bài tập Đại học", objective: "Làm bài tập Môn Cơ sở dữ liệu & Nguyên lý kế toán", category: "study" },
    { id: "sun-7", time: "17:00 - 18:30", activity: "Đi dạo / Thể thao nhẹ nhàng", objective: "Duy trì tinh thần sảng khoái", category: "life" },
    { id: "sun-8", time: "19:00 - 21:00", activity: "Lập Kế Hoạch Tuần Mới & Đặt Mục Tiêu KPI", objective: "Đặt KPI 40 bài SQL, 5 notebook Python cho tuần tiếp theo", category: "study" },
    { id: "sun-9", time: "21:30 - 22:30", activity: "Thiền định / Nghe nhạc thư giãn", objective: "Sẵn sàng tinh thần cho sáng thứ Hai tràn năng lượng", category: "rest" },
    { id: "sun-10", time: "23:00 - 04:00", activity: "Ngủ sâu lấy sức 😴", objective: "Đảm bảo chất lượng giấc ngủ tối ưu", category: "rest" },
  ],
};

// Phase 2 Master Schedule Preset (Tháng 11/2026 - 13/01/2027)
export const HUB_PHASE_2_SCHEDULE: Record<string, TimeBlock[]> = {
  Mon: [
    ...HUB_PHASE_1_SCHEDULE.Mon
  ],
  Tue: [
    ...HUB_PHASE_1_SCHEDULE.Tue
  ],
  Wed: [
    { id: "wed2-1", time: "04:00 - 04:30", activity: "Thức dậy sớm & Chọn thức uống tỉnh táo ☕", objective: "Bù nước, chuẩn bị tinh thần cho 2 môn chuyên ngành", category: "life" },
    { id: "wed2-2", time: "04:30 - 06:15", activity: "Deep Work: Đọc trước tài liệu Phân Tích Kinh Doanh", objective: "Nghiên cứu tài liệu BA & sơ đồ quy trình nghiệp vụ", category: "study" },
    { id: "wed2-3", time: "06:15 - 07:00", activity: "Ăn sáng & Di chuyển đến HUB (56 Hoàng Diệu 2)", objective: "Có mặt tại phòng B1.306 đúng 06:50", category: "life" },
    { id: "wed2-4", time: "07:00 - 11:05", activity: "🏫 HỌC TRƯỜNG HUB: Phân tích kinh doanh (ITS711) — Phòng B1.306", objective: "Học phân tích yêu cầu nghiệp vụ, BPMN, lập tài liệu BRD/SRS", category: "work" },
    { id: "wed2-5", time: "11:15 - 12:45", activity: "Ăn trưa & Nghỉ ngơi tại trường", objective: "Nghỉ trưa chuẩn bị ca chiều", category: "rest" },
    { id: "wed2-6", time: "13:00 - 17:05", activity: "🏫 HỌC TRƯỜNG HUB: Giải thuật ứng dụng trong kinh doanh (ITS724) — Phòng C201", objective: "Học các giải thuật tối ưu hóa, quy hoạch tuyến tính và bài toán quyết định", category: "work" },
    { id: "wed2-7", time: "17:15 - 18:30", activity: "Di chuyển về & Thể thao nhẹ", objective: "Xả stress sau 2 ca học nặng", category: "life" },
    { id: "wed2-8", time: "19:00 - 21:30", activity: "⭐ THỰC HÀNH NGAY: Cài đặt Giải Thuật Kinh Doanh bằng Python", objective: "Code thử nghiệm thuật toán Simplex, Knapsack hoặc phân tích quyết định", category: "study" },
    { id: "wed2-9", time: "21:30 - 22:30", activity: "Ghi chép bài học BA & Lập kế hoạch ngày mai", objective: "Lưu trữ kiến thức vào Notion", category: "study" },
    { id: "wed2-10", time: "23:00 - 04:00", activity: "Ngủ sâu phục hồi 😴", objective: "Nạp pin cho ngày mai", category: "rest" },
  ],
  Thu: [
    { id: "thu2-1", time: "04:00 - 04:30", activity: "Thức dậy sớm & Chọn thức uống tỉnh táo ☕", objective: "Bù nước, khởi động ngày mới", category: "life" },
    { id: "thu2-2", time: "04:30 - 06:30", activity: "Deep Work: Luyện Thuật Toán Nâng Cao & C++", objective: "Giải quyết 3 bài toán Dynamic Programming", category: "work" },
    { id: "thu2-3", time: "06:30 - 07:30", activity: "Ăn sáng dinh dưỡng", objective: "Bữa sáng", category: "life" },
    { id: "thu2-4", time: "07:30 - 11:00", activity: "🌟 Tự Học: SQL Nâng Cao & Tối Ưu Truy Vấn (Index / Explain Plan)", objective: "Học cách đánh chỉ mục B-Tree, tối ưu truy vấn chạy nhanh gấp 10 lần", category: "study" },
    { id: "thu2-5", time: "11:00 - 13:00", activity: "Nghỉ trưa & Ăn trưa", objective: "Nạp pin", category: "rest" },
    { id: "thu2-6", time: "13:30 - 16:30", activity: "🌟 Tự Học: Python Xây Dựng ETL Pipeline Tự Động", objective: "Viết script cào dữ liệu web tự động lưu vào PostgreSQL", category: "study" },
    { id: "thu2-7", time: "17:00 - 18:30", activity: "Thể thao buổi chiều 🏃", objective: "Chạy bộ / Đá bóng", category: "life" },
    { id: "thu2-8", time: "19:00 - 21:30", activity: "Xây Dựng Dự Án Data Analyst Hoàn Chỉnh", objective: "Kết hợp SQL + Python + Power BI thành 1 end-to-end project", category: "project" },
    { id: "thu2-9", time: "21:30 - 22:30", activity: "Tiếng Anh IELTS Reading", objective: "Đọc 1 bài báo chuyên khảo kinh tế", category: "study" },
    { id: "thu2-10", time: "23:00 - 04:00", activity: "Ngủ sâu phục hồi 😴", objective: "Giấc ngủ chất lượng", category: "rest" },
  ],
  Fri: [
    { id: "fri2-1", time: "04:00 - 04:30", activity: "Thức dậy sớm & Chọn thức uống tỉnh táo ☕", objective: "Bù nước, vệ sinh", category: "life" },
    { id: "fri2-2", time: "04:30 - 06:30", activity: "Deep Work: Luyện DAX Power BI Chuyên Sâu", objective: "Viết các hàm Time Intelligence (SAMEPERIODLASTYEAR, DATESYTD)", category: "work" },
    { id: "fri2-3", time: "06:30 - 07:30", activity: "Ăn sáng & Khởi động cơ thể", objective: "Nạp năng lượng", category: "life" },
    { id: "fri2-4", time: "07:30 - 11:00", activity: "🌟 Tự Học: Nghiên Cứu Case Study Phân Tích Kinh Doanh", objective: "Lập biểu đồ phân tích SWOT, Porter 5 Forces và sơ đồ Use Case", category: "study" },
    { id: "fri2-5", time: "11:00 - 13:00", activity: "Ăn trưa & Nghỉ trưa", objective: "Nghỉ ngơi", category: "rest" },
    { id: "fri2-6", time: "13:30 - 16:30", activity: "🌟 Tự Học: Thực Hành Giải Thuật Tối Ưu Với Python (Scipy)", objective: "Lập trình giải bài toán phân bổ nguồn lực kinh doanh tối ưu", category: "study" },
    { id: "fri2-7", time: "17:00 - 18:30", activity: "Thể thao cuối tuần", objective: "Chạy bộ nâng cao thể lực", category: "life" },
    { id: "fri2-8", time: "19:00 - 21:30", activity: "Commit GitHub & Viết Báo Cáo Kỹ Thuật Dự Án", objective: "Hoàn thiện tài liệu README chuyên nghiệp chuẩn nhà tuyển dụng", category: "project" },
    { id: "fri2-9", time: "21:30 - 22:30", activity: "Tổng kết tuần & Thư giãn", objective: "Đọc tin tức công nghệ", category: "life" },
    { id: "fri2-10", time: "23:00 - 04:00", activity: "Ngủ sâu phục hồi 😴", objective: "Sẵn sàng cho cuối tuần rực rỡ", category: "rest" },
  ],
  Sat: [
    ...HUB_PHASE_1_SCHEDULE.Sat
  ],
  Sun: [
    ...HUB_PHASE_1_SCHEDULE.Sun
  ],
};
