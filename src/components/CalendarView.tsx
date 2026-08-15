import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Clock,
  BookOpen,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Layers,
  Calendar,
  X,
  PlusCircle,
  Check,
  Edit2,
  Info,
  ExternalLinkIcon,
  Coffee,
  Flame,
  Zap,
  Thermometer,
  CalendarDays,
  Upload,
  Image as ImageIcon,
  FileText,
  ChevronLeft,
  GraduationCap,
  School,
  MapPin,
  User,
  Copy,
  CheckCircle2,
  RefreshCw,
  FileCode,
  ArrowRight,
  Search,
  Building,
  Award,
  Filter,
  CheckCheck,
  BookMarked,
  Share2
} from "lucide-react";
import { TimeBlock } from "../types";
import { SCHEDULE_TIMEBLOCKS_MON, SCHEDULE_TIMEBLOCKS_THU } from "../data/roadmapData";
import {
  CURRENT_STUDENT_PROFILE,
  REGISTERED_COURSES,
  HUB_PHASE_1_SCHEDULE,
  HUB_PHASE_2_SCHEDULE,
  UniversityCourse
} from "../data/studentScheduleData";

// Define default weekly schedule initial state (uses HK01/2026-2027 of student Nguyen Dinh Nhut)
const INITIAL_WEEKLY_SCHEDULE: Record<string, TimeBlock[]> = HUB_PHASE_1_SCHEDULE;

const DAY_LABELS: Record<string, string> = {
  Mon: "Thứ Hai",
  Tue: "Thứ Ba",
  Wed: "Thứ Tư",
  Thu: "Thứ Năm",
  Fri: "Thứ Sáu",
  Sat: "Thứ Bảy",
  Sun: "Chủ Nhật"
};

interface AwakeBeverage {
  id: string;
  name: string;
  desc: string;
  caffeine: "Cao" | "Vừa" | "Thấp" | "Không";
  alertRating: number; // 1-5
  benefit: string;
  emoji: string;
  color: string;
  bgSelected: string;
}

const AWAKE_BEVERAGES: AwakeBeverage[] = [
  {
    id: "cafe",
    name: "Cà phê phin đậm",
    desc: "Vua tỉnh táo. Caffeine tinh khiết tác động trực tiếp lên hệ thần kinh trung ương.",
    caffeine: "Cao",
    alertRating: 5,
    benefit: "Đánh thức các neuron thần kinh bị ức chế, tăng khả năng tập trung cao độ trong vòng 15-30 phút.",
    emoji: "☕",
    color: "from-amber-700 to-amber-900",
    bgSelected: "bg-amber-100 border-amber-500 text-amber-950 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700"
  },
  {
    id: "tra-duong",
    name: "Trà đường nóng",
    desc: "Nguồn tiếp tế năng lượng tức thì với sự phối hợp hoàn hảo của Glucose & Caffeine nhẹ.",
    caffeine: "Vừa",
    alertRating: 4,
    benefit: "Glucose thẩm thấu trực tiếp qua niêm mạc lưỡi cung cấp năng lượng tức thời cho não bộ, giúp tỉnh táo nhanh.",
    emoji: "🍵",
    color: "from-green-600 to-amber-600",
    bgSelected: "bg-green-50 border-green-500 text-green-950 dark:bg-green-950/40 dark:text-green-300 dark:border-green-700"
  },
  {
    id: "tra-da",
    name: "Trà đá mát lạnh",
    desc: "Sự kết hợp giữa chất chát nhẹ của trà và hiệu ứng sốc nhiệt sảng khoái mát rượi.",
    caffeine: "Thấp",
    alertRating: 3,
    benefit: "Cơ thể sản sinh adrenaline lập tức khi nhận luồng mát đột ngột, giúp đánh thức các cơ bắp.",
    emoji: "🥤",
    color: "from-blue-400 to-sky-600",
    bgSelected: "bg-sky-50 border-sky-400 text-sky-950 dark:bg-sky-950/30 dark:text-sky-300 dark:border-sky-700"
  },
  {
    id: "tra-nong",
    name: "Trà ấm thanh tịnh",
    desc: "Tập trung sâu và tĩnh lặng nhờ L-Theanine tự nhiên, tỉnh táo mà không lo hồi hộp.",
    caffeine: "Vừa",
    alertRating: 4,
    benefit: "Kích hoạt sóng não Alpha giúp trạng thái tâm trí bình tĩnh nhưng cực kỳ tập trung, sáng tạo sâu.",
    emoji: "🫖",
    color: "from-emerald-600 to-green-700",
    bgSelected: "bg-emerald-50 border-emerald-500 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700"
  },
  {
    id: "chanh-mat-ong",
    name: "Nước chanh mật ong ấm",
    desc: "Thanh lọc hệ tiêu hóa, bổ sung Vitamin C & bù đắp lượng nước sau ngủ sâu.",
    caffeine: "Không",
    alertRating: 3,
    benefit: "Đào thải độc tố, bồi đắp khoáng chất tự nhiên giúp tuần hoàn máu lưu thông nhẹ nhàng.",
    emoji: "🍋",
    color: "from-yellow-400 to-amber-500",
    bgSelected: "bg-yellow-50 border-yellow-400 text-yellow-950 dark:bg-yellow-950/30 dark:text-yellow-300 dark:border-yellow-700"
  }
];

interface DateEvent {
  id: string;
  time: string;
  activity: string;
  objective: string;
  category: "work" | "study" | "life" | "rest" | "project";
}

export default function CalendarView() {
  const [activeSubTab, setActiveSubTab] = useState<"planner" | "hub-schedule" | "weekly-grid" | "parse-image" | "auto" | "links" | "date-planner">("planner");
  
  // Student Timetable HK01/2026-2027 Phase states
  const [currentPhase, setCurrentPhase] = useState<"phase-1" | "phase-2">(() => {
    const saved = localStorage.getItem("mis_hub_phase");
    return saved === "phase-2" ? "phase-2" : "phase-1";
  });
  const [hubFilter, setHubFilter] = useState<"all" | "phase-1" | "phase-2" | "core">("all");
  const [customScheduleInput, setCustomScheduleInput] = useState<string>(`THỜI KHÓA BIỂU SINH VIÊN

Họ tên :Nguyễn Đình Nhựt [Mã số: 030241250114]
Lớp : DH41HT01     Hệ : Đại học     Loại hình đào tạo : Đại học khóa 41     Điện thoại : 0355138474

DANH SÁCH NHỮNG HỌC PHẦN ĐÃ ĐĂNG KÝ    
HK01/2026-2027
1	ITS707_2611_1_D01	Kiến tập ngành Hệ thống thông tin quản lý ()	1		,,, 08/07/2026
2	ITS709_2611_1_D05	Mạng máy tính và truyền thông ()	3		Thứ Năm,7H00 - 11h05,C205,56 Hoàng Diệu 2 - Thủ Đức 03/09/2026	29/10/2026	02/07/2026
3	ITS302_2611_1_D04	Cơ sở dữ liệu ()	3		Thứ Năm,13H00 - 17h05,C201,56 Hoàng Diệu 2 - Thủ Đức 03/09/2026	29/10/2026	02/07/2026
4	ACC301_2614_1_D07	Nguyên lý kế toán ()	3		Thứ Sáu,7H00 - 11h05,B1.106,56 Hoàng Diệu 2 - Thủ Đức 04/09/2026	30/10/2026	02/07/2026
5	MLM307_2611_1_D10	Kinh tế chính trị Mác - Lênin ()	2		Thứ Tư,13H00 - 17h05,A102,56 Hoàng Diệu 2 - Thủ Đức 09/09/2026	14/10/2026	02/07/2026
6	GYM303_2617_1_CL_D20	Học phần GDTC 3 ()	1		Thứ Tư,7H00 - 9h15,San1,56 Hoàng Diệu 2 - Thủ Đức / Thứ Tư,9H50 - 11h05,San1,56 Hoàng Diệu 2 - Thủ Đức 09/09/2026	14/10/2026	04/07/2026
7	ITS711_261_1_D01	Phân tích kinh doanh ()	3		Thứ Tư,7H00 - 11h05,B1.306,56 Hoàng Diệu 2 - Thủ Đức 18/11/2026	13/01/2027	07/07/2026
8	ITS724_261_1_D03	Giải thuật ứng dụng trong kinh doanh ()	3		Thứ Tư,13H00 - 17h05,C201,56 Hoàng Diệu 2 - Thủ Đức 18/11/2026	13/01/2027	02/07/2026
Tổng số tín chỉ đăng ký: 19(tc)`);

  useEffect(() => {
    localStorage.setItem("mis_hub_phase", currentPhase);
  }, [currentPhase]);

  // Set default selectedDate as today's date formatted as YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  });

  // Specific Date Planner states (Month picker helpers)
  const [currentYear, setCurrentYear] = useState(() => {
    const today = new Date();
    return today.getFullYear();
  });
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return today.getMonth(); // 0-indexed
  });
  const [showMiniCalendar, setShowMiniCalendar] = useState(false);
  const [newBlockScope, setNewBlockScope] = useState<"weekly" | "date">("date"); // Whether to add to weekly template or specific date

  const [dateSchedules, setDateSchedules] = useState<Record<string, DateEvent[]>>(() => {
    const saved = localStorage.getItem("mis_date_schedules_v1");
    return saved ? JSON.parse(saved) : {
      "2026-07-25": [
        { id: "evt-1", time: "08:00 - 11:30", activity: "Sự kiện tuyển dụng Techcombank 🏦", objective: "Tìm vị trí Data Analyst Intern & nộp CV", category: "work" },
        { id: "evt-2", time: "14:00 - 17:00", activity: "Họp nhóm môn ERP nâng cao 📊", objective: "Vẽ sơ đồ quy trình nghiệp vụ Order-to-Cash", category: "project" }
      ]
    };
  });

  // Live current time state for real-time event countdown
  const [currentTime, setCurrentTime] = useState<string>(() => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setCurrentTime(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`);
    }, 15000); // Update every 15 seconds for snappier countdown response
    return () => clearInterval(timer);
  }, []);

  // State to custom edit specific date's blocks
  const [isAddingDateBlock, setIsAddingDateBlock] = useState(false);
  const [newDateActivity, setNewDateActivity] = useState("");
  const [newDateObjective, setNewDateObjective] = useState("");
  const [newDateCategory, setNewDateCategory] = useState<TimeBlock["category"]>("study");
  const [newDateStartTime, setNewDateStartTime] = useState("08:00");
  const [newDateEndTime, setNewDateEndTime] = useState("10:00");

  // Save dateSchedules to localStorage
  useEffect(() => {
    localStorage.setItem("mis_date_schedules_v1", JSON.stringify(dateSchedules));
  }, [dateSchedules]);

  // AI Schedule Image scan states
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageParsing, setImageParsing] = useState(false);
  const [parsedClasses, setParsedClasses] = useState<any[]>([]);
  const [parsingError, setParsingError] = useState<string | null>(null);
  const [parsingSuccessMessage, setParsingSuccessMessage] = useState<string | null>(null);

  // Selected morning drink for each day
  const [selectedDrinks, setSelectedDrinks] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem("mis_selected_drinks_v2");
    return saved ? JSON.parse(saved) : {
      Mon: "cafe",
      Tue: "tra-nong",
      Wed: "tra-duong",
      Thu: "cafe",
      Fri: "chanh-mat-ong",
      Sat: "tra-da",
      Sun: "tra-nong"
    };
  });

  // Save morning drink selection whenever it changes
  useEffect(() => {
    localStorage.setItem("mis_selected_drinks_v2", JSON.stringify(selectedDrinks));
  }, [selectedDrinks]);
  
  // Custom weekly schedule loaded from local storage
  const [weeklySchedule, setWeeklySchedule] = useState<Record<string, TimeBlock[]>>(() => {
    const saved = localStorage.getItem("mis_weekly_schedule_v2");
    return saved ? JSON.parse(saved) : INITIAL_WEEKLY_SCHEDULE;
  });

  // Track completed blocks
  const [completedBlocks, setCompletedBlocks] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("mis_completed_blocks_v2");
    return saved ? JSON.parse(saved) : {};
  });

  // Saving schedule to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("mis_weekly_schedule_v2", JSON.stringify(weeklySchedule));
  }, [weeklySchedule]);

  // Saving completed state to local storage
  useEffect(() => {
    localStorage.setItem("mis_completed_blocks_v2", JSON.stringify(completedBlocks));
  }, [completedBlocks]);

  // Busy schedule representation for Auto-Scheduler
  // Key: Day (Mon-Sun), Inner Key: Session ('morning' | 'afternoon' | 'evening')
  const [busySessions, setBusySessions] = useState<Record<string, Record<string, boolean>>>(() => {
    const saved = localStorage.getItem("mis_busy_sessions_v2");
    if (saved) return JSON.parse(saved);
    return {
      Mon: { morning: true, afternoon: true, evening: false },
      Tue: { morning: false, afternoon: false, evening: false },
      Wed: { morning: false, afternoon: false, evening: false },
      Thu: { morning: true, afternoon: true, evening: false },
      Fri: { morning: false, afternoon: false, evening: false },
      Sat: { morning: false, afternoon: false, evening: false },
      Sun: { morning: false, afternoon: false, evening: false },
    };
  });

  // Save busy schedule to local storage
  useEffect(() => {
    localStorage.setItem("mis_busy_sessions_v2", JSON.stringify(busySessions));
  }, [busySessions]);

  // Adding Custom Timeblock States
  const [isAddingBlock, setIsAddingBlock] = useState(false);
  const [newTime, setNewTime] = useState("08:00 - 10:00");
  const [newActivity, setNewActivity] = useState("");
  const [newObjective, setNewObjective] = useState("");
  const [newCategory, setNewCategory] = useState<TimeBlock["category"]>("study");

  // Pure Helper Functions for calendar & date math
  const getStartHour = (timeStr: string): number => {
    if (!timeStr) return 0;
    const match = timeStr.match(/^(\d{2}):(\d{2})/);
    if (match) {
      return parseInt(match[1]) + parseInt(match[2]) / 60;
    }
    return 0;
  };

  const getDayOfWeekFromDate = (dateStr: string): string => {
    const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    const date = new Date(dateStr);
    return days[date.getDay()];
  };

  const getEnglishDayFromDate = (dateStr: string): string => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(dateStr);
    return days[date.getDay()];
  };

  const getWeekDates = (dateStr: string) => {
    const current = new Date(dateStr);
    const dayOfWeek = current.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const distanceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(current);
    monday.setDate(current.getDate() + distanceToMonday);

    const weekDays = [];
    const labels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      weekDays.push({
        dayLabel: labels[i],
        dayNum: d.getDate(),
        dateString: `${yyyy}-${mm}-${dd}`
      });
    }
    return weekDays;
  };

  const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    
    // Get the first day of the week (0 = Sun, 1 = Mon...)
    const firstDayIndex = date.getDay();
    
    // Previous month's trailing days
    const prevMonthDate = new Date(year, month, 0);
    const prevMonthDaysCount = prevMonthDate.getDate();
    
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = prevMonthDaysCount - i;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const dateString = `${prevYear}-${String(prevMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      days.push({
        dayNum: d,
        isCurrentMonth: false,
        dateString
      });
    }

    // Current month's days
    const currentMonthDaysCount = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= currentMonthDaysCount; d++) {
      const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      days.push({
        dayNum: d,
        isCurrentMonth: true,
        dateString
      });
    }

    // Next month's leading days to fill up a 6-week grid (42 days)
    const totalCells = 42;
    const remaining = totalCells - days.length;
    for (let d = 1; d <= remaining; d++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const dateString = `${nextYear}-${String(nextMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      days.push({
        dayNum: d,
        isCurrentMonth: false,
        dateString
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDeleteDateEvent = (date: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...dateSchedules };
    if (updated[date]) {
      updated[date] = updated[date].filter(evt => evt.id !== id);
      if (updated[date].length === 0) {
        delete updated[date];
      }
      setDateSchedules(updated);
    }
  };

  const handleAddDateBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDateActivity.trim()) return;

    const newEvent: DateEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      time: `${newDateStartTime} - ${newDateEndTime}`,
      activity: newDateActivity,
      objective: newDateObjective || "Mục tiêu việc bận trong ngày",
      category: newDateCategory
    };

    const currentEvents = dateSchedules[selectedDate] || [];
    const updatedEvents = [...currentEvents, newEvent];
    updatedEvents.sort((a, b) => getStartHour(a.time) - getStartHour(b.time));

    setDateSchedules({
      ...dateSchedules,
      [selectedDate]: updatedEvents
    });

    setNewDateActivity("");
    setNewDateObjective("");
    setIsAddingDateBlock(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setParsingError(null);
        setParsedClasses([]);
        setParsingSuccessMessage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUseDemoSchedule = () => {
    setParsingError(null);
    setImagePreview("demo-preview");
    setImageParsing(true);
    setParsingSuccessMessage(null);

    setTimeout(() => {
      setParsedClasses([
        { day: "Mon", time: "07:30 - 11:30", activity: "Môn trường: Mạng máy tính & Truyền thông 🏫", objective: "Học lý thuyết mạng, cấu hình thiết bị router và switch Cisco" },
        { day: "Wed", time: "13:30 - 17:00", activity: "Môn trường: Cơ sở dữ liệu chuyên sâu (SQL) 💾", objective: "Thực hành thiết kế lược đồ quan hệ, tối ưu câu lệnh SELECT" },
        { day: "Fri", time: "07:30 - 11:30", activity: "Môn trường: Hệ quản trị cơ sở dữ liệu (DBMS) 🗄️", objective: "Nghiên cứu kiến trúc DBMS, giao tác và phân quyền SQL Server" },
        { day: "Sat", time: "08:00 - 11:30", activity: "Môn trường: Phân tích thiết kế hệ thống (SAD) 📊", objective: "Thiết kế biểu đồ lớp, sơ đồ Use Case và viết tài liệu SRS" }
      ]);
      setImageParsing(false);
      setParsingSuccessMessage("🎉 AI đã hoàn tất nhận diện từ Lịch Học Học Kỳ 2 Mẫu! Hãy xem trước danh sách lớp học bên dưới.");
    }, 1500);
  };

  const handleStartAIAnalysis = async () => {
    if (!imagePreview || imagePreview === "demo-preview") return;
    setImageParsing(true);
    setParsingError(null);
    setParsedClasses([]);
    setParsingSuccessMessage(null);

    try {
      const base64Data = imagePreview.split(",")[1];
      const mimeType = imagePreview.split(";")[0].split(":")[1] || "image/png";

      const response = await fetch("/api/parse-schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Data, mimeType }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Không thể phân tích ảnh lịch học.");
      }

      const data = await response.json();
      if (data.classes && data.classes.length > 0) {
        setParsedClasses(data.classes);
        setParsingSuccessMessage(`🎉 AI Gemini đã nhận diện thành công ${data.classes.length} lớp học kì 2 mới từ hình ảnh của bạn!`);
      } else {
        throw new Error("Không thể trích xuất được lớp học học kì nào. Vui lòng tải ảnh rõ nét hơn hoặc dùng nút Chạy thử lịch mẫu.");
      }
    } catch (err: any) {
      console.error("AI Analysis error:", err);
      setParsingError(err.message || "Đã xảy ra lỗi khi gọi AI. Hãy thử lại hoặc dùng lịch học mẫu.");
    } finally {
      setImageParsing(false);
    }
  };

  const handleApplyParsedClasses = () => {
    if (parsedClasses.length === 0) return;

    const updatedBusy = { ...busySessions };
    const updatedWeekly = { ...weeklySchedule };

    parsedClasses.forEach((cls) => {
      const day = cls.day;
      if (!DAY_LABELS[day]) return;

      const startHour = getStartHour(cls.time);
      let sessionKey = "morning";
      if (startHour >= 12 && startHour < 18) {
        sessionKey = "afternoon";
      } else if (startHour >= 18) {
        sessionKey = "evening";
      }

      if (!updatedBusy[day]) {
        updatedBusy[day] = { morning: false, afternoon: false, evening: false };
      }
      updatedBusy[day][sessionKey] = true;

      const newClassBlock: TimeBlock = {
        id: `school-${day.toLowerCase()}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        time: cls.time,
        activity: cls.activity,
        objective: cls.objective || "Tham gia lớp học chính khóa trên giảng đường",
        category: "work"
      };

      const currentBlocks = updatedWeekly[day] || [];
      const filtered = currentBlocks.filter((b) => {
        const bStart = getStartHour(b.time);
        const clsStart = getStartHour(cls.time);
        return Math.abs(bStart - clsStart) > 1.5 && !b.activity.includes("Lịch Bận");
      });

      const merged = [...filtered, newClassBlock];
      merged.sort((a, b) => a.time.localeCompare(b.time));
      updatedWeekly[day] = merged;
    });

    setBusySessions(updatedBusy);
    setWeeklySchedule(updatedWeekly);

    setSchedulerAppliedMessage("🎉 Đã nhập thành công toàn bộ Thời khóa biểu Kì 2 và tự động cấu hình các buổi học bận! Bạn có thể xem ngay lịch biểu tuần mới.");
    setActiveSubTab("planner");

    setImagePreview(null);
    setParsedClasses([]);
    setParsingSuccessMessage(null);

    setTimeout(() => {
      setSchedulerAppliedMessage("");
    }, 6000);
  };

  // 1-Click apply student Nguyen Dinh Nhut's official timetable (Phase 1 or Phase 2)
  const applyHubPreset = (phase: "phase-1" | "phase-2") => {
    const targetSchedule = phase === "phase-1" ? HUB_PHASE_1_SCHEDULE : HUB_PHASE_2_SCHEDULE;
    setWeeklySchedule(targetSchedule);
    setCurrentPhase(phase);

    if (phase === "phase-1") {
      setBusySessions({
        Mon: { morning: false, afternoon: false, evening: false },
        Tue: { morning: false, afternoon: false, evening: false },
        Wed: { morning: true, afternoon: true, evening: false }, // GDTC San1 + KTCT A102
        Thu: { morning: true, afternoon: true, evening: false }, // Mạng C205 + CSDL C201
        Fri: { morning: true, afternoon: false, evening: false }, // Kế toán B1.106
        Sat: { morning: false, afternoon: false, evening: false },
        Sun: { morning: false, afternoon: false, evening: false },
      });
      setSchedulerAppliedMessage("🎓 Đã đồng bộ thành công Thời Khóa Biểu HUB Đợt 1 (T9-T10/2026: T4 GDTC & KTCT, T5 Mạng & CSDL, T6 Nguyên lý Kế toán) vào Lịch Biểu Tổng!");
    } else {
      setBusySessions({
        Mon: { morning: false, afternoon: false, evening: false },
        Tue: { morning: false, afternoon: false, evening: false },
        Wed: { morning: true, afternoon: true, evening: false }, // BA B1.306 + Giải thuật C201
        Thu: { morning: false, afternoon: false, evening: false },
        Fri: { morning: false, afternoon: false, evening: false },
        Sat: { morning: false, afternoon: false, evening: false },
        Sun: { morning: false, afternoon: false, evening: false },
      });
      setSchedulerAppliedMessage("🎓 Đã đồng bộ thành công Thời Khóa Biểu HUB Đợt 2 (T11/2026-T01/2027: T4 Phân tích kinh doanh & Giải thuật ứng dụng) vào Lịch Biểu Tổng!");
    }

    setActiveSubTab("planner");
    setTimeout(() => {
      setSchedulerAppliedMessage("");
    }, 7000);
  };

  // Sync a single university course directly into weekly schedule
  const handleSyncSingleCourseToWeekly = (course: UniversityCourse) => {
    if (course.dayOfWeek === "Linh hoạt" || !course.timeSlot) {
      setSchedulerAppliedMessage(`ℹ️ Học phần "${course.courseName}" (${course.courseCode}) là học phần linh hoạt/kiến tập, không có khung giờ cố định trên lớp.`);
      setTimeout(() => setSchedulerAppliedMessage(""), 5000);
      return;
    }

    const dayMap: Record<string, string> = {
      "Thứ Hai": "Mon",
      "Thứ Ba": "Tue",
      "Thứ Tư": "Wed",
      "Thứ Năm": "Thu",
      "Thứ Sáu": "Fri",
      "Thứ Bảy": "Sat",
      "Chủ Nhật": "Sun"
    };

    const targetDay = dayMap[course.dayOfWeek] || "Mon";
    const newBlock: TimeBlock = {
      id: `hub-single-${course.courseCode.toLowerCase()}-${Date.now()}`,
      time: course.timeSlot,
      activity: `🏫 HỌC TRƯỜNG HUB: ${course.courseName} (${course.credits} TC) — Phòng ${course.room}`,
      objective: `Học tại cơ sở 56 Hoàng Diệu 2 Thủ Đức [Mã lớp: ${course.courseCode}] — Thời gian: ${course.startDate} đến ${course.endDate}`,
      category: "work"
    };

    const currentBlocks = weeklySchedule[targetDay] || [];
    const filtered = currentBlocks.filter(b => {
      const bStart = getStartHour(b.time);
      const cStart = getStartHour(course.timeSlot);
      return Math.abs(bStart - cStart) > 1.5;
    });

    const updated = {
      ...weeklySchedule,
      [targetDay]: [...filtered, newBlock].sort((a, b) => a.time.localeCompare(b.time))
    };

    setWeeklySchedule(updated);
    setSchedulerAppliedMessage(`✅ Đã nạp thành công môn "${course.courseName}" (Phòng ${course.room}, ${course.dayOfWeek} ${course.timeSlot}) vào Lịch Biểu Tổng!`);
    setTimeout(() => setSchedulerAppliedMessage(""), 6000);
  };

  // Smart text parser for university timetable text
  const handleParseAndApplyTextSchedule = (textInput: string) => {
    if (!textInput.trim()) return;

    const lines = textInput.split("\n");
    const extracted: { code: string; name: string; credits: number; day: string; dayKey: string; time: string; room: string }[] = [];

    const dayMap: Record<string, string> = {
      "thứ hai": "Mon",
      "thứ ba": "Tue",
      "thứ tư": "Wed",
      "thứ năm": "Thu",
      "thứ sáu": "Fri",
      "thứ bảy": "Sat",
      "chủ nhật": "Sun"
    };

    lines.forEach((line) => {
      const lower = line.toLowerCase();
      let foundDayKey: string | null = null;
      let foundDayName = "";

      for (const [dName, key] of Object.entries(dayMap)) {
        if (lower.includes(dName)) {
          foundDayKey = key;
          foundDayName = dName;
          break;
        }
      }

      if (foundDayKey) {
        // Extract time
        const timeMatch = line.match(/(\d{1,2}[hH:]\d{2}\s*-\s*\d{1,2}[hH:]\d{2})/i);
        const timeStr = timeMatch ? timeMatch[1].replace(/[hH]/g, ":") : "07:00 - 11:05";

        // Extract Room
        const roomMatch = line.match(/(C\d{3}|B\d\.\d{3}|A\d{3}|San\d|Sân\s*\d|[A-Z]\d{3})/i);
        const roomStr = roomMatch ? roomMatch[1] : "Giảng đường HUB";

        // Extract Course code
        const codeMatch = line.match(/([A-Z]{3}\d{3}[A-Za-z0-9_]*)/);
        const codeStr = codeMatch ? codeMatch[1] : "HUB_COURSE";

        // Extract Course name
        let nameStr = "Môn học chính khóa HUB";
        if (line.includes("Mạng máy tính")) nameStr = "Mạng máy tính và truyền thông";
        else if (line.includes("Cơ sở dữ liệu")) nameStr = "Cơ sở dữ liệu (ITS302)";
        else if (line.includes("Nguyên lý kế toán")) nameStr = "Nguyên lý kế toán (ACC301)";
        else if (line.includes("Kinh tế chính trị")) nameStr = "Kinh tế chính trị Mác - Lênin";
        else if (line.includes("GDTC") || line.includes("Thể dục")) nameStr = "Học phần GDTC 3 (GYM303)";
        else if (line.includes("Phân tích kinh doanh")) nameStr = "Phân tích kinh doanh (ITS711)";
        else if (line.includes("Giải thuật ứng dụng")) nameStr = "Giải thuật ứng dụng trong kinh doanh (ITS724)";
        else if (line.includes("Kiến tập")) nameStr = "Kiến tập ngành HTTTQL (ITS707)";
        else {
          const parts = line.split("\t");
          if (parts.length >= 3 && parts[2]) {
            nameStr = parts[2].replace(/\(\)/g, "").trim();
          }
        }

        extracted.push({
          code: codeStr,
          name: nameStr,
          credits: 3,
          day: foundDayName,
          dayKey: foundDayKey,
          time: timeStr,
          room: roomStr
        });
      }
    });

    if (extracted.length > 0) {
      const updatedWeekly = { ...weeklySchedule };
      const updatedBusy = { ...busySessions };

      extracted.forEach((c) => {
        const dayKey = c.dayKey;
        const startH = getStartHour(c.time);
        const session = startH < 12 ? "morning" : startH < 18 ? "afternoon" : "evening";

        if (!updatedBusy[dayKey]) {
          updatedBusy[dayKey] = { morning: false, afternoon: false, evening: false };
        }
        updatedBusy[dayKey][session] = true;

        const newBlock: TimeBlock = {
          id: `hub-parsed-${dayKey.toLowerCase()}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          time: c.time,
          activity: `🏫 HỌC TRƯỜNG HUB: ${c.name} — Phòng ${c.room}`,
          objective: `Tham gia lớp học chính khóa tại cơ sở 56 Hoàng Diệu 2 Thủ Đức [Mã: ${c.code}]`,
          category: "work"
        };

        const existing = updatedWeekly[dayKey] || [];
        const filtered = existing.filter(b => {
          const bStart = getStartHour(b.time);
          const cStart = getStartHour(c.time);
          return Math.abs(bStart - cStart) > 1.5 && !b.activity.includes("Lịch Bận");
        });
        const merged = [...filtered, newBlock];
        merged.sort((a, b) => a.time.localeCompare(b.time));
        updatedWeekly[dayKey] = merged;
      });

      setWeeklySchedule(updatedWeekly);
      setBusySessions(updatedBusy);
      setSchedulerAppliedMessage(`🎉 Đã phân tích thành công ${extracted.length} lớp học và tự động chia vào Thời khóa biểu tổng!`);
      setActiveSubTab("planner");
      setTimeout(() => {
        setSchedulerAppliedMessage("");
      }, 6000);
    } else {
      applyHubPreset("phase-1");
    }
  };

  const toggleBlockCompleted = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const key = `${selectedDate}-${id}`;
    const updated = { ...completedBlocks, [key]: !completedBlocks[key] };
    setCompletedBlocks(updated);
  };

  const handleAddBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivity.trim()) return;

    if (newBlockScope === "date") {
      // Add only for this specific date
      const newEvent: DateEvent = {
        id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        time: newTime,
        activity: newActivity,
        objective: newObjective || "Việc bận đặc biệt trong ngày",
        category: newCategory
      };
      const currentEvents = dateSchedules[selectedDate] || [];
      const updatedEvents = [...currentEvents, newEvent];
      updatedEvents.sort((a, b) => getStartHour(a.time) - getStartHour(b.time));

      setDateSchedules({
        ...dateSchedules,
        [selectedDate]: updatedEvents
      });
    } else {
      // Add to weekly recurring schedule
      const newBlock: TimeBlock = {
        id: `${selectedDay.toLowerCase()}-${Date.now()}`,
        time: newTime,
        activity: newActivity,
        objective: newObjective || "Tự học bám sát mục tiêu lộ trình",
        category: newCategory
      };
      const updatedDayBlocks = [...(weeklySchedule[selectedDay] || []), newBlock];
      updatedDayBlocks.sort((a, b) => getStartHour(a.time) - getStartHour(b.time));

      setWeeklySchedule({
        ...weeklySchedule,
        [selectedDay]: updatedDayBlocks
      });
    }

    // Reset Form
    setNewActivity("");
    setNewObjective("");
    setIsAddingBlock(false);
  };

  const handleDeleteBlock = (block: any, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (block.isCustomDateEvent) {
      // Delete from specific date schedules
      const updated = { ...dateSchedules };
      if (updated[selectedDate]) {
        updated[selectedDate] = updated[selectedDate].filter(evt => evt.id !== block.id);
        if (updated[selectedDate].length === 0) {
          delete updated[selectedDate];
        }
        setDateSchedules(updated);
      }
    } else {
      // Delete from weekly template schedule
      const filtered = (weeklySchedule[selectedDay] || []).filter((b) => b.id !== block.id);
      setWeeklySchedule({
        ...weeklySchedule,
        [selectedDay]: filtered
      });
    }

    // Clean completion state if any
    const key = `${selectedDate}-${block.id}`;
    if (completedBlocks[key] || completedBlocks[block.id]) {
      const updated = { ...completedBlocks };
      delete updated[key];
      delete updated[block.id];
      setCompletedBlocks(updated);
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm("Bạn có chắc chắn muốn khôi phục thời khóa biểu gốc của sinh viên MIS? Mọi dữ liệu đã chỉnh sửa sẽ bị xoá.")) {
      setWeeklySchedule(INITIAL_WEEKLY_SCHEDULE);
      setCompletedBlocks({});
    }
  };

  // Busy session toggle helper
  const toggleBusySession = (day: string, session: "morning" | "afternoon" | "evening") => {
    setBusySessions({
      ...busySessions,
      [day]: {
        ...busySessions[day],
        [session]: !busySessions[day][session]
      }
    });
  };

  // Algorithm to automatically assign training courses to FREE days and free hours!
  const [generatedPreview, setGeneratedPreview] = useState<Record<string, TimeBlock[]> | null>(null);
  const [schedulerAppliedMessage, setSchedulerAppliedMessage] = useState("");

  const handleGenerateAutoSchedule = () => {
    // 1. We clone the default base elements but strip active study slots, then dynamically rebuild them
    // around the user's free sessions.
    const newSchedule: Record<string, TimeBlock[]> = {};

    // Standard daily routines to populate for EVERY day
    const getStandardMorningRoutines = (dayPrefix: string) => [
      { id: `${dayPrefix}-wake`, time: "04:00 - 05:00", activity: "Thức dậy sớm, vệ sinh & Chọn thức uống tỉnh táo ☕", objective: "Bù nước, khởi động cơ thể và não bộ", category: "life" as const },
    ];
    const getStandardEveningRoutines = (dayPrefix: string) => [
      { id: `${dayPrefix}-dinner`, time: "18:00 - 19:30", activity: "Ăn tối & Thư giãn", objective: "Nạp năng lượng và nghỉ ngơi", category: "life" as const },
      { id: `${dayPrefix}-sleep`, time: "23:00 - 04:00", activity: "Ngủ sâu phục hồi", objective: "Đảm bảo chất lượng tinh thần", category: "rest" as const },
    ];

    // Core training modules we want to fit into FREE blocks
    const studyModules = [
      { activity: "Luyện Thuật Toán C++", objective: "Giải quyết 3 bài toán rèn tư duy logic (HackerRank)", category: "work" as const },
      { activity: "Tự Học SQL Chuyên Sâu", objective: "Làm chủ CTE, Window Functions & viết 15 câu query", category: "study" as const },
      { activity: "Python Phân Tích Dữ Liệu", objective: "Xử lý làm sạch dữ liệu thô bằng thư viện Pandas", category: "study" as const },
      { activity: "Thiết Kế Dashboard Power BI", objective: "Xây dựng mô hình Star Schema, viết DAX", category: "project" as const },
      { activity: "Học Tiếng Anh Học Thuật", objective: "Luyện nghe nói IELTS, nâng vốn từ chuyên ngành", category: "study" as const },
      { activity: "Xây Dựng Git Portfolio & Commit", objective: "Đóng gói mã nguồn đẩy lên GitHub cá nhân", category: "project" as const },
    ];

    let studyModuleIndex = 0;

    Object.keys(DAY_LABELS).forEach((dayKey) => {
      const dayPrefix = dayKey.toLowerCase();
      const isBusyMorning = busySessions[dayKey]?.morning;
      const isBusyAfternoon = busySessions[dayKey]?.afternoon;
      const isBusyEvening = busySessions[dayKey]?.evening;

      const blocksForDay: TimeBlock[] = [...getStandardMorningRoutines(dayPrefix)];

      // 1. Morning Session (08:00 - 11:00)
      if (isBusyMorning) {
        blocksForDay.push({
          id: `${dayPrefix}-busy-am`,
          time: "08:00 - 11:30",
          activity: "Lịch Bận (Học trên trường / Việc riêng) 🏫",
          objective: "Hoàn thành nhiệm vụ trường lớp / cá nhân",
          category: "work"
        });
      } else {
        // Free! Allocate a study module
        const module = studyModules[studyModuleIndex % studyModules.length];
        studyModuleIndex++;
        blocksForDay.push({
          id: `${dayPrefix}-free-am`,
          time: "08:30 - 11:00",
          activity: `🌟 Tự Học: ${module.activity}`,
          objective: module.objective,
          category: module.category
        });
      }

      // Rest / Noon block
      blocksForDay.push({
        id: `${dayPrefix}-noon`,
        time: "11:30 - 13:00",
        activity: "Nghỉ ngơi & Ăn trưa",
        objective: "Ngủ trưa ngắn tái tạo năng lượng",
        category: "rest"
      });

      // 2. Afternoon Session (14:00 - 17:00)
      if (isBusyAfternoon) {
        blocksForDay.push({
          id: `${dayPrefix}-busy-pm`,
          time: "13:30 - 17:00",
          activity: "Lịch Bận (Học trên trường / Việc riêng) 🏫",
          objective: "Tập trung công việc bận rộn",
          category: "work"
        });
      } else {
        // Free! Allocate next study module
        const module = studyModules[studyModuleIndex % studyModules.length];
        studyModuleIndex++;
        blocksForDay.push({
          id: `${dayPrefix}-free-pm`,
          time: "14:00 - 16:30",
          activity: `🌟 Tự Học: ${module.activity}`,
          objective: module.objective,
          category: module.category
        });
      }

      // Late afternoon sport / life block
      blocksForDay.push({
        id: `${dayPrefix}-sport`,
        time: "17:00 - 18:00",
        activity: "Rèn luyện thể thao 🏃",
        objective: "Đi bộ, chạy bộ nâng cao sức bền thể chất",
        category: "life"
      });

      blocksForDay.push(...getStandardEveningRoutines(dayPrefix));

      // 3. Evening Session (20:00 - 22:00)
      if (isBusyEvening) {
        blocksForDay.push({
          id: `${dayPrefix}-busy-eve`,
          time: "20:00 - 22:00",
          activity: "Lịch Bận Buổi Tối 🌙",
          objective: "Xử lý các buổi học tối hoặc họp nhóm",
          category: "study"
        });
      } else {
        // Free! Allocate study block or university revision
        const module = studyModules[studyModuleIndex % studyModules.length];
        studyModuleIndex++;
        blocksForDay.push({
          id: `${dayPrefix}-free-eve`,
          time: "20:00 - 22:00",
          activity: `🌟 Tự Học: ${module.activity}`,
          objective: module.objective,
          category: module.category
        });
      }

      // Sort blocks so they render chronologically
      blocksForDay.sort((a, b) => a.time.localeCompare(b.time));
      newSchedule[dayKey] = blocksForDay;
    });

    setGeneratedPreview(newSchedule);
    setSchedulerAppliedMessage("");
  };

  const handleApplyAutoSchedule = () => {
    if (generatedPreview) {
      setWeeklySchedule(generatedPreview);
      setCompletedBlocks({});
      setGeneratedPreview(null);
      setSchedulerAppliedMessage("🎉 Đã áp dụng lịch trình tự động chia theo thời gian rảnh thành công! Hãy chuyển sang Tab 'Lịch biểu tương tác' để theo dõi.");
      
      // Auto-switch to planner after short delay
      setTimeout(() => {
        setActiveSubTab("planner");
        setSchedulerAppliedMessage("");
      }, 3500);
    }
  };

  // Helper colors
  const getCategoryColor = (category: TimeBlock["category"]) => {
    switch (category) {
      case "work":
        return "border-emerald-500 bg-emerald-50/40 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400";
      case "study":
        return "border-blue-500 bg-blue-50/40 text-blue-800 dark:bg-blue-950/20 dark:text-blue-400";
      case "project":
        return "border-purple-500 bg-purple-50/40 text-purple-800 dark:bg-purple-950/20 dark:text-purple-400";
      case "life":
        return "border-amber-500 bg-amber-50/40 text-amber-800 dark:bg-amber-950/20 dark:text-amber-400";
      case "rest":
        return "border-rose-500 bg-rose-50/40 text-rose-800 dark:bg-rose-950/20 dark:text-rose-400";
      default:
        return "border-slate-500 bg-slate-50/40 text-slate-800 dark:bg-slate-950/20 dark:text-slate-400";
    }
  };

  const getCategoryLabel = (category: TimeBlock["category"]) => {
    switch (category) {
      case "work":
        return "Deep Work 🚀";
      case "study":
        return "Tự Học / Học Lớp 📚";
      case "project":
        return "Xây Dự Án 💻";
      case "life":
        return "Cá Nhân / Thể Thao 🌱";
      case "rest":
        return "Nghỉ Ngơi 😴";
    }
  };

  const selectedDay = getEnglishDayFromDate(selectedDate);

  // Compute unified list of blocks for the selected day
  const getMergedBlocksForDate = (dateStr: string) => {
    const engDay = getEnglishDayFromDate(dateStr);
    const templateBlocks = weeklySchedule[engDay] || [];
    const customEvents = dateSchedules[dateStr] || [];

    const templateBlocksMapped = templateBlocks.map(block => ({
      ...block,
      isTemplate: true
    }));
    
    const customEventsMapped = customEvents.map(evt => ({
      id: evt.id,
      time: evt.time,
      activity: evt.activity,
      objective: evt.objective,
      category: evt.category,
      isCustomDateEvent: true
    }));

    const merged = [...templateBlocksMapped, ...customEventsMapped];
    merged.sort((a, b) => getStartHour(a.time) - getStartHour(b.time));
    return merged;
  };

  // helper to parse HH:MM - HH:MM and calculate duration in hours
  const calculateDurationHours = (timeStr: string): number => {
    if (!timeStr) return 0;
    const parts = timeStr.split("-");
    if (parts.length !== 2) return 0;
    const start = parts[0].trim().split(":");
    const end = parts[1].trim().split(":");
    if (start.length !== 2 || end.length !== 2) return 0;
    
    const startMin = parseInt(start[0], 10) * 60 + parseInt(start[1], 10);
    const endMin = parseInt(end[0], 10) * 60 + parseInt(end[1], 10);
    
    let diff = endMin - startMin;
    if (diff < 0) {
      diff += 24 * 60; // overnight
    }
    return diff / 60;
  };

  // Live countdown to next time block
  const getNextBlockCountdown = (mergedBlocks: any[]) => {
    const nowParts = currentTime.split(":");
    const nowMin = parseInt(nowParts[0], 10) * 60 + parseInt(nowParts[1], 10);
    
    let nextBlock = null;
    let minDiff = Infinity;
    
    mergedBlocks.forEach(block => {
      const parts = block.time.split("-");
      if (parts.length > 0) {
        const startParts = parts[0].trim().split(":");
        if (startParts.length === 2) {
          const startMin = parseInt(startParts[0], 10) * 60 + parseInt(startParts[1], 10);
          let diff = startMin - nowMin;
          if (diff > 0 && diff < minDiff) {
            minDiff = diff;
            nextBlock = block;
          }
        }
      }
    });
    
    if (!nextBlock) return null;
    
    const diffH = Math.floor(minDiff / 60);
    const diffM = minDiff % 60;
    
    return {
      block: nextBlock,
      hours: diffH,
      minutes: diffM
    };
  };

  // Compute stats for planner
  const dayBlocks = getMergedBlocksForDate(selectedDate);
  const completedCount = dayBlocks.filter((b) => completedBlocks[`${selectedDate}-${b.id}`] || completedBlocks[b.id]).length;
  const progressPercent = dayBlocks.length ? Math.round((completedCount / dayBlocks.length) * 100) : 0;

  // Websites for skills
  const learningSites = [
    {
      skill: "C++ & Tư duy lập trình",
      desc: "Luyện logic code, thuật toán căn bản và lập trình hướng đối tượng.",
      platforms: [
        { name: "HackerRank C++", url: "https://www.hackerrank.com/domains/cpp", badg: "Cơ bản", style: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400" },
        { name: "W3Schools C++", url: "https://www.w3schools.com/cpp/", badg: "Lý thuyết trực quan", style: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400" },
        { name: "cplusplus.com", url: "https://cplusplus.com/doc/tutorial/", badg: "Tra cứu thư viện", style: "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300" }
      ]
    },
    {
      skill: "SQL & Cơ sở dữ liệu",
      desc: "Trọng tâm tối thượng của Data Analyst. Luyện truy vấn từ SELECT cơ bản đến Window Functions phức tạp.",
      platforms: [
        { name: "LeetCode SQL Study Plan", url: "https://leetcode.com/studyplan/30-days-of-sql/", badg: "Thực chiến phỏng vấn", style: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400" },
        { name: "SQLZoo Interactive", url: "https://sqlzoo.net/", badg: "Gõ query trực tiếp", style: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/20 dark:text-indigo-400" },
        { name: "SchemaVerse SQL Game", url: "https://schemaverse.com/", badg: "Game lập trình SQL", style: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-400" }
      ]
    },
    {
      skill: "Python Phân tích dữ liệu",
      desc: "Làm sạch dữ liệu thô, phân tích khám phá (EDA) bằng Pandas, NumPy và trực quan hóa Seaborn.",
      platforms: [
        { name: "Kaggle Learn Python", url: "https://www.kaggle.com/learn", badg: "Cực hay cho Data", style: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/20 dark:text-sky-400" },
        { name: "Pandas User Guide", url: "https://pandas.pydata.org/docs/user_guide/index.html", badg: "Tài liệu chuẩn", style: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400" }
      ]
    },
    {
      skill: "Power BI & Excel liên kết",
      desc: "Xây dựng mô hình dữ liệu chuẩn Star Schema và vẽ dashboard trực quan hóa chỉ số doanh nghiệp.",
      platforms: [
        { name: "Microsoft PL-300 Learn Path", url: "https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/", badg: "Chuẩn thi Chứng chỉ", style: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/20 dark:text-indigo-400" },
        { name: "SQLBI (DAX & Star Schema)", url: "https://www.sqlbi.com/", badg: "Bậc thầy DAX", style: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-400" },
        { name: "Chandoo Excel Analytics", url: "https://chandoo.org/", badg: "Pivot & Power Query", style: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400" }
      ]
    },
    {
      skill: "Anh Văn & Nền tảng Data",
      desc: "Bồi dưỡng tư duy nghiệp vụ và thuật ngữ tiếng Anh giúp đọc hiểu báo cáo doanh nghiệp.",
      platforms: [
        { name: "Coursera: Google Data Analytics", url: "https://www.coursera.org/professional-certificates/google-data-analytics", badg: "Chứng chỉ Vàng", style: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/20 dark:text-indigo-400" },
        { name: "IELTS Liz Reading Practice", url: "https://ieltsliz.com/", badg: "Luyện đọc hiểu sâu", style: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/20 dark:text-teal-400" }
      ]
    }
  ];

  return (
    <div id="calendar-view" className="space-y-6">
      {/* Upper Mode Switcher Tabs */}
      <div className="flex flex-wrap border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={() => {
            setActiveSubTab("planner");
            setShowMiniCalendar(false);
          }}
          className={`px-5 py-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 ${
            activeSubTab === "planner"
              ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
          }`}
        >
          <Calendar className="w-4 h-4 text-indigo-500 animate-pulse" />
          <span className="font-bold">Lịch Biểu Tích Hợp Toàn Diện 📅</span>
        </button>
        <button
          onClick={() => {
            setActiveSubTab("hub-schedule");
            setShowMiniCalendar(false);
          }}
          className={`px-5 py-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 ${
            activeSubTab === "hub-schedule"
              ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
          }`}
        >
          <GraduationCap className="w-4 h-4 text-emerald-500 animate-bounce" />
          <span className="font-bold">Thời Khóa Biểu HUB Sinh Viên (19 TC) 🎓</span>
        </button>
        <button
          onClick={() => setActiveSubTab("weekly-grid")}
          className={`px-5 py-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 ${
            activeSubTab === "weekly-grid"
              ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
          }`}
        >
          <CalendarDays className="w-4 h-4 text-violet-500 animate-pulse" />
          <span className="font-bold">Lịch Học Chi Tiết 7 Ngày 🗓️</span>
        </button>
        <button
          onClick={() => setActiveSubTab("parse-image")}
          className={`px-5 py-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 ${
            activeSubTab === "parse-image"
              ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
          }`}
        >
          <Upload className="w-4 h-4 text-emerald-500" />
          <span>AI Quét Lịch Học Kì 2 📷</span>
        </button>
        <button
          onClick={() => setActiveSubTab("auto")}
          className={`px-5 py-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 ${
            activeSubTab === "auto"
              ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Trợ Lý Tự Chia Lịch Rảnh ✨</span>
        </button>
        <button
          onClick={() => setActiveSubTab("links")}
          className={`px-5 py-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 ${
            activeSubTab === "links"
              ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
          }`}
        >
          <BookOpen className="w-4 h-4 text-sky-500" />
          <span>Trang Web Học Kỹ Năng 🌐</span>
        </button>
      </div>

      {/* Success Notification Alert */}
      <AnimatePresence>
        {schedulerAppliedMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center justify-between dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400 text-xs shadow-xs"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
              <span>{schedulerAppliedMessage}</span>
            </div>
            <button
              onClick={() => setSchedulerAppliedMessage("")}
              className="text-slate-400 hover:text-slate-600 font-bold ml-4 cursor-pointer border-none bg-transparent text-xs"
            >
              Đóng
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick HUB Student Schedule Banner across views */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white p-4 rounded-2xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/30 shadow-xs">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/25 px-2 py-0.5 rounded-full backdrop-blur-xs">
                HUB • HK01/2026-2027
              </span>
              <span className="text-xs font-bold text-emerald-100">
                {CURRENT_STUDENT_PROFILE.fullName} [{CURRENT_STUDENT_PROFILE.studentId}] — {CURRENT_STUDENT_PROFILE.className}
              </span>
            </div>
            <p className="text-xs text-white/90 font-medium mt-0.5">
              19 Tín chỉ chính khóa đã nạp vào lịch biểu • Đang áp dụng: <span className="font-extrabold underline">{currentPhase === "phase-1" ? "Đợt 1 (T9 - T10/2026)" : "Đợt 2 (T11/2026 - T01/2027)"}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => applyHubPreset("phase-1")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
              currentPhase === "phase-1"
                ? "bg-white text-emerald-800 ring-2 ring-emerald-300"
                : "bg-white/20 hover:bg-white/30 text-white border border-white/30"
            }`}
            title="Áp dụng lịch Đợt 1: Thứ 4 GDTC + KTCT, Thứ 5 Mạng + CSDL, Thứ 6 Kế toán"
          >
            ⚡ Đợt 1 (T9-T10)
          </button>
          <button
            onClick={() => applyHubPreset("phase-2")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
              currentPhase === "phase-2"
                ? "bg-white text-emerald-800 ring-2 ring-emerald-300"
                : "bg-white/20 hover:bg-white/30 text-white border border-white/30"
            }`}
            title="Áp dụng lịch Đợt 2: Thứ 4 BA + Giải thuật ứng dụng"
          >
            ⚡ Đợt 2 (T11-T01)
          </button>
          <button
            onClick={() => setActiveSubTab("hub-schedule")}
            className="px-3.5 py-1.5 bg-emerald-950/40 hover:bg-emerald-950/60 text-emerald-100 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-emerald-400/30"
          >
            <BookMarked className="w-3.5 h-3.5" />
            Xem 8 Môn & Phân Tích
          </button>
        </div>
      </div>

      {/* SUB-VIEW 1: PLANNER */}
      {activeSubTab === "planner" && (
        <div className="space-y-6">
          {/* Integrated Date Selection & Sliding Week Calendar */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
                  Lịch Biểu Tích Hợp Toàn Diện
                </span>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
                  <Calendar className="w-5 h-5 text-indigo-500 shrink-0" />
                  Ngày {selectedDate.split("-").reverse().join("/")} — Thứ {getDayOfWeekFromDate(selectedDate) === "CN" ? "Chủ Nhật" : `Hai ${getDayOfWeekFromDate(selectedDate)}`}
                </h3>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setShowMiniCalendar(!showMiniCalendar)}
                  className="w-full sm:w-auto px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 dark:text-indigo-400 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-indigo-100 dark:border-indigo-950"
                >
                  <CalendarDays className="w-4 h-4" />
                  {showMiniCalendar ? "Đóng Lịch Tháng" : "📅 Chọn Ngày Khác / Mở Lịch Tháng"}
                </button>
                <button
                  onClick={handleResetToDefault}
                  className="px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg dark:text-rose-400 dark:hover:bg-rose-950/20 cursor-pointer border border-transparent transition-all"
                  title="Đặt lại tất cả lịch biểu về trạng thái ban đầu"
                >
                  Khôi phục gốc
                </button>
              </div>
            </div>

            {/* Sliding 7-Day Week Strip */}
            <div className="grid grid-cols-7 gap-1.5 pt-1">
              {getWeekDates(selectedDate).map((cell: any) => {
                const isSelected = selectedDate === cell.dateString;
                const hasEvents = dateSchedules[cell.dateString] && dateSchedules[cell.dateString].length > 0;
                
                // Check if date is today
                const today = new Date();
                const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
                const isToday = cell.dateString === todayStr;

                return (
                  <button
                    key={cell.dateString}
                    onClick={() => {
                      setSelectedDate(cell.dateString);
                    }}
                    className={`p-2.5 rounded-xl text-center transition-all flex flex-col items-center justify-center relative cursor-pointer group ${
                      isSelected
                        ? "bg-indigo-600 text-white shadow-md font-bold scale-102"
                        : "bg-slate-50/70 hover:bg-indigo-50/50 text-slate-700 dark:bg-slate-800/40 dark:text-slate-300 dark:hover:bg-slate-800/80"
                    }`}
                  >
                    <span className={`text-[10px] font-semibold tracking-wide uppercase ${isSelected ? "text-indigo-100" : "text-slate-400 dark:text-slate-500"}`}>
                      {cell.dayLabel}
                    </span>
                    <span className="text-sm font-extrabold mt-1">
                      {cell.dayNum}
                    </span>
                    
                    {/* Event indicators */}
                    {hasEvents && (
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${isSelected ? "bg-white" : "bg-amber-500 animate-pulse"}`} />
                    )}

                    {/* Today badge underline */}
                    {isToday && !isSelected && (
                      <span className="absolute bottom-1 w-5 h-0.5 bg-indigo-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Month Grid dropdown picker when showMiniCalendar is active */}
            <AnimatePresence>
              {showMiniCalendar && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-slate-50 p-4 rounded-xl border border-slate-100 dark:bg-slate-950/30 dark:border-slate-800/60 overflow-hidden space-y-4"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800/60">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md cursor-pointer transition-all"
                    >
                      <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    </button>
                    <span className="font-bold text-sm text-slate-800 dark:text-white font-sans">
                      Tháng {currentMonth + 1}, {currentYear}
                    </span>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md cursor-pointer transition-all"
                    >
                      <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    </button>
                  </div>

                  {/* Day Headers */}
                  <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400">
                    <span>CN</span>
                    <span>T2</span>
                    <span>T3</span>
                    <span>T4</span>
                    <span>T5</span>
                    <span>T6</span>
                    <span>T7</span>
                  </div>

                  {/* Day Cells */}
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(currentYear, currentMonth).map((cell, idx) => {
                      const isSelected = selectedDate === cell.dateString;
                      const hasEvents = dateSchedules[cell.dateString] && dateSchedules[cell.dateString].length > 0;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedDate(cell.dateString);
                            setShowMiniCalendar(false); // Close calendar after picking
                          }}
                          className={`h-9 text-xs rounded-lg font-semibold transition-all relative flex flex-col items-center justify-center cursor-pointer ${
                            isSelected
                              ? "bg-indigo-600 text-white font-bold shadow-xs scale-105"
                              : cell.isCurrentMonth
                              ? "text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-200 dark:hover:bg-slate-800"
                              : "text-slate-300 dark:text-slate-600"
                          }`}
                        >
                          <span>{cell.dayNum}</span>
                          {hasEvents && (
                            <span
                              className={`w-1 h-1 rounded-full absolute bottom-1 ${
                                isSelected ? "bg-white" : "bg-indigo-500"
                              }`}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 24-HOUR ALLOCATION STATISTICS & EVENT COUNTDOWN STATION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* 24-Hour Day Balance Circle & Progress bar (7 columns) */}
            <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-indigo-50 dark:bg-indigo-950/50 rounded-lg text-indigo-500">
                    <Clock className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      Thống Kê Cân Bằng 24 Giờ Tròn Trịa
                    </h4>
                    <p className="text-[10px] text-slate-400">Đếm & Phân tích tổng số giờ rèn luyện trong ngày</p>
                  </div>
                </div>
                
                {/* 24h cycle status */}
                {(() => {
                  const total = dayBlocks.reduce((sum, b) => sum + calculateDurationHours(b.time), 0);
                  const isPerfect = Math.abs(total - 24) < 0.1;
                  return (
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      isPerfect 
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border border-amber-200 animate-pulse"
                    }`}>
                      {total.toFixed(1)} / 24.0h {isPerfect ? "Tròn trịa ✨" : "Chưa Tròn"}
                    </span>
                  );
                })()}
              </div>

              {/* Stacked Multi-Color Progress Bar for 24 hours */}
              {(() => {
                const sleepHours = dayBlocks.filter(b => b.category === "rest").reduce((sum, b) => sum + calculateDurationHours(b.time), 0);
                const studyHours = dayBlocks.filter(b => b.category === "study").reduce((sum, b) => sum + calculateDurationHours(b.time), 0);
                const workHours = dayBlocks.filter(b => b.category === "work").reduce((sum, b) => sum + calculateDurationHours(b.time), 0);
                const projectHours = dayBlocks.filter(b => b.category === "project").reduce((sum, b) => sum + calculateDurationHours(b.time), 0);
                const lifeHours = dayBlocks.filter(b => b.category === "life").reduce((sum, b) => sum + calculateDurationHours(b.time), 0);
                
                const scheduledTotal = sleepHours + studyHours + workHours + projectHours + lifeHours;
                const freeHours = Math.max(0, 24 - scheduledTotal);

                const getWidthPct = (hours: number) => `${(hours / 24) * 100}%`;

                return (
                  <div className="space-y-4">
                    {/* The Visual Stacked Bar */}
                    <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 shadow-inner">
                      {sleepHours > 0 && (
                        <div style={{ width: getWidthPct(sleepHours) }} className="bg-rose-500 h-full transition-all" title={`Ngủ: ${sleepHours.toFixed(1)}h`} />
                      )}
                      {studyHours > 0 && (
                        <div style={{ width: getWidthPct(studyHours) }} className="bg-blue-500 h-full transition-all" title={`Học tập: ${studyHours.toFixed(1)}h`} />
                      )}
                      {workHours > 0 && (
                        <div style={{ width: getWidthPct(workHours) }} className="bg-emerald-500 h-full transition-all" title={`Deep Work: ${workHours.toFixed(1)}h`} />
                      )}
                      {projectHours > 0 && (
                        <div style={{ width: getWidthPct(projectHours) }} className="bg-purple-500 h-full transition-all" title={`Dự án: ${projectHours.toFixed(1)}h`} />
                      )}
                      {lifeHours > 0 && (
                        <div style={{ width: getWidthPct(lifeHours) }} className="bg-amber-500 h-full transition-all" title={`Sinh hoạt: ${lifeHours.toFixed(1)}h`} />
                      )}
                      {freeHours > 0 && (
                        <div style={{ width: getWidthPct(freeHours) }} className="bg-slate-200 dark:bg-slate-700 h-full transition-all border-l border-slate-300 dark:border-slate-600 border-dashed" title={`Thời gian rảnh: ${freeHours.toFixed(1)}h`} />
                      )}
                    </div>

                    {/* Category Metrics labels */}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 bg-rose-500 rounded-xs shrink-0" />
                        <span>😴 Ngủ: {sleepHours.toFixed(1)}h</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 bg-blue-500 rounded-xs shrink-0" />
                        <span>📚 Học: {studyHours.toFixed(1)}h</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-xs shrink-0" />
                        <span>🚀 Việc: {workHours.toFixed(1)}h</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 bg-purple-500 rounded-xs shrink-0" />
                        <span>💻 Dự án: {projectHours.toFixed(1)}h</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 bg-amber-500 rounded-xs shrink-0" />
                        <span>🌱 S.Hoạt: {lifeHours.toFixed(1)}h</span>
                      </div>
                      <div className="flex items-center gap-1 border-l border-slate-200 dark:border-slate-800 pl-2">
                        <span className="w-2.5 h-2.5 bg-slate-300 dark:bg-slate-600 rounded-xs shrink-0 border border-dashed border-slate-400" />
                        <span>⏳ Rảnh: {freeHours.toFixed(1)}h</span>
                      </div>
                    </div>

                    {/* Educational feedback for 24-hour cycle */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-950/20 rounded-lg text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      {freeHours > 0 ? (
                        <p className="flex items-start gap-1.5">
                          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>
                            Bạn còn trống <strong>{freeHours.toFixed(1)} tiếng</strong> chưa được lên lịch trong ngày này. Hãy bấm nút <strong>"Mở Form ➕"</strong> bên phải để rèn luyện nốt, giúp lấp đầy tròn trịa ngày 24h hoàn hảo của bạn!
                          </span>
                        </p>
                      ) : (
                        <p className="flex items-start gap-1.5">
                          <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>
                            <strong>Hoàn hảo!</strong> Lịch trình ngày của bạn đã được lấp đầy tròn trịa 24 tiếng. Tránh được mọi kẽ hở trì hoãn, giúp bạn rèn luyện tối ưu nhất!
                          </span>
                        </p>
                      )}
                      
                      {/* Enforced Sleep Duration Policy (23:00 - 04:00) */}
                      <p className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
                        💤 <em>Mốc ngủ cố định 23:00 - 04:00 (5.0 giờ) được bảo vệ giúp phục hồi hệ thần kinh và giúp bạn thức dậy tỉnh táo nhất!</em>
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Event Countdown Tracker (5 columns) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-5 rounded-xl border border-indigo-950 relative overflow-hidden flex flex-col justify-between min-h-[200px]">
              <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-1.5">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-indigo-300 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400 animate-bounce" />
                  Đồng Hồ Đếm Ngược Sự Kiện (Live Countdown)
                </span>
                
                {(() => {
                  const countdown = getNextBlockCountdown(dayBlocks);
                  if (!countdown) {
                    return (
                      <div className="space-y-2 py-4">
                        <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-center">
                          <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto mb-1.5" />
                          <h5 className="font-bold text-xs">Không còn sự kiện nào kế tiếp</h5>
                          <p className="text-[10px] text-indigo-200 mt-1">Toàn bộ mốc học/bận trong ngày đã hoàn thành hoặc kết thúc!</p>
                        </div>
                      </div>
                    );
                  }
                  
                  return (
                    <div className="space-y-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${getCategoryColor(countdown.block.category)}`}>
                          {getCategoryLabel(countdown.block.category)}
                        </span>
                        {countdown.block.isTemplate ? (
                          <span className="text-[8px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded-sm">Lặp lại tuần 🔁</span>
                        ) : (
                          <span className="text-[8px] bg-amber-500 text-white px-1.5 py-0.5 rounded-sm">Sự kiện ngày cụ thể 📅</span>
                        )}
                      </div>
                      
                      <div>
                        <p className="text-[10px] text-indigo-200">Hoạt động tiếp theo sắp bắt đầu:</p>
                        <h4 className="font-extrabold text-sm text-white mt-0.5 truncate leading-snug">
                          {countdown.block.activity}
                        </h4>
                        <p className="text-[10px] text-slate-300 font-mono mt-0.5">
                          ⏰ Khung giờ: {countdown.block.time}
                        </p>
                      </div>

                      {/* Giant digital-style countdown */}
                      <div className="bg-black/30 p-2.5 rounded-lg border border-white/5 inline-flex items-center gap-3">
                        <div className="text-center">
                          <span className="font-mono text-xl font-black text-amber-400">
                            {String(countdown.hours).padStart(2, "0")}
                          </span>
                          <p className="text-[8px] text-slate-400 uppercase tracking-wider">Giờ</p>
                        </div>
                        <span className="font-mono text-xl font-bold text-slate-500 animate-pulse">:</span>
                        <div className="text-center">
                          <span className="font-mono text-xl font-black text-amber-400">
                            {String(countdown.minutes).padStart(2, "0")}
                          </span>
                          <p className="text-[8px] text-slate-400 uppercase tracking-wider">Phút</p>
                        </div>
                        <span className="text-xs text-indigo-300 font-medium pl-1">nữa bắt đầu!</span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Day Progress bar summary inside countdown box */}
              <div className="border-t border-white/10 pt-2.5 mt-2 flex justify-between items-center text-[10px] text-indigo-200">
                <span>Tiến trình hoàn thành ngày:</span>
                <span className="font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded-sm">
                  {completedCount}/{dayBlocks.length} ({progressPercent}%)
                </span>
              </div>
            </div>
          </div>

          {/* DRINK WAKEUPS AND ADD BLOCK ACTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Morning Beverage Wakeup Station (Hôm nay uống gì khi dậy - 6 columns) */}
            <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-50 dark:border-slate-800/60">
                <span className="p-1.5 bg-amber-50 dark:bg-amber-950/40 rounded-lg text-amber-600">
                  <Coffee className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Trạm Sạc Năng Lượng Đón Bình Minh (04:00) 🌅
                  </h4>
                  <p className="text-[10px] text-slate-400">Dậy sớm rèn luyện cần một tinh thần sực tỉnh táo</p>
                </div>
              </div>

              {/* Selector of Beverage */}
              {(() => {
                const currentDrinkId = selectedDrinks[selectedDate] || "nuoc-am";
                const currentDrink = AWAKE_BEVERAGES.find((b) => b.id === currentDrinkId) || AWAKE_BEVERAGES[AWAKE_BEVERAGES.length - 1];

                return (
                  <div className="space-y-4">
                    {/* The 5 Quick options */}
                    <div className="grid grid-cols-5 gap-1.5">
                      {AWAKE_BEVERAGES.map((drink) => (
                        <button
                          key={drink.id}
                          type="button"
                          onClick={() => {
                            setSelectedDrinks({ ...selectedDrinks, [selectedDate]: drink.id });
                          }}
                          className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                            currentDrinkId === drink.id
                              ? drink.bgSelected + " shadow-xs font-bold scale-102"
                              : "bg-slate-50 hover:bg-slate-100 border-slate-100 text-slate-500 dark:bg-slate-800/40 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/80"
                          }`}
                          title={drink.name}
                        >
                          <span className="text-lg">{drink.emoji}</span>
                          <span className="text-[8px] font-extrabold truncate max-w-full block">
                            {drink.name.split(" ")[0]}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Information detail card */}
                    <div className={`p-4 rounded-xl border bg-gradient-to-r ${currentDrink.color} text-white space-y-2`}>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs flex items-center gap-1">
                          <span className="text-lg">{currentDrink.emoji}</span>
                          {currentDrink.name}
                        </span>
                        <div className="flex items-center gap-0.5" title="Độ kích thích tỉnh táo">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Zap
                              key={i}
                              className={`w-3 h-3 ${
                                i < currentDrink.alertRating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-white/20"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] text-indigo-100 leading-normal">
                        {currentDrink.desc}
                      </p>
                      <div className="bg-black/10 p-2 rounded text-[10px] leading-normal border border-white/5">
                        🌟 <strong>Tác động thần kinh:</strong> {currentDrink.benefit}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Quick Add Custom Block & Scope form (6 columns) */}
            <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-50 dark:border-slate-800/60">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg text-indigo-500">
                    <Plus className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      Thêm Mốc Lịch Biểu / Việc Bận
                    </h4>
                    <p className="text-[10px] text-slate-400">Thêm sự kiện ngày bận đột xuất hoặc lịch lặp tuần</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddingBlock(!isAddingBlock)}
                  className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-extrabold rounded-lg text-[10px] transition-all flex items-center gap-1 cursor-pointer border border-indigo-100 dark:border-indigo-900/40"
                >
                  {isAddingBlock ? "Đóng Form" : "Mở Form ➕"}
                </button>
              </div>

              {/* Integrated custom schedule adder form */}
              {isAddingBlock ? (
                <form onSubmit={handleAddBlock} className="space-y-3.5 text-xs">
                  {/* Select Scope (Where to store the event) */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Phạm vi lưu trữ (Thiết lập lịch)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setNewBlockScope("date")}
                        className={`p-2.5 rounded-xl text-center border transition-all text-xs font-bold cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                          newBlockScope === "date"
                            ? "bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-900 dark:text-indigo-400"
                            : "bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-850 dark:border-slate-800 dark:text-slate-400"
                        }`}
                      >
                        <span>Chỉ Ngày Hôm Nay 📅</span>
                        <span className="text-[8px] font-normal text-slate-400">Chỉ có trong ngày {selectedDate.split("-").reverse().join("/")}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewBlockScope("weekly")}
                        className={`p-2.5 rounded-xl text-center border transition-all text-xs font-bold cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                          newBlockScope === "weekly"
                            ? "bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-900 dark:text-indigo-400"
                            : "bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-850 dark:border-slate-800 dark:text-slate-400"
                        }`}
                      >
                        <span>Cố Định Hàng Tuần 🔁</span>
                        <span className="text-[8px] font-normal text-slate-400">Tự lặp lại mỗi Thứ {getDayOfWeekFromDate(selectedDate) === "CN" ? "Chủ Nhật" : `Hai ${getDayOfWeekFromDate(selectedDate)}`}</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Khung Giờ (VD: 08:00 - 10:00)</label>
                      <input
                        type="text"
                        required
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Phân Loại Block</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as TimeBlock["category"])}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                      >
                        <option value="study">Tự Học / Học Lớp 📚</option>
                        <option value="work">Deep Work 🚀</option>
                        <option value="project">Xây Dự Án Portfolio 💻</option>
                        <option value="life">Cá Nhân / Thể Thao 🌱</option>
                        <option value="rest">Ngủ / Nghỉ Ngơi 😴</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Tên Hoạt Động</label>
                    <input
                      type="text"
                      required
                      placeholder="VD: Học bù môn Database trên trường / Phân tích dự án..."
                      value={newActivity}
                      onChange={(e) => setNewActivity(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Mục Tiêu Cụ Thể (Objective)</label>
                    <input
                      type="text"
                      placeholder="VD: Hoàn thành bài tập chuẩn hóa quan hệ 3NF..."
                      value={newObjective}
                      onChange={(e) => setNewObjective(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs transition-all shadow-xs border-none cursor-pointer"
                  >
                    Xác Nhận Thêm Vào Lịch Biểu ⚡
                  </button>
                </form>
              ) : (
                <div className="h-[210px] flex flex-col justify-center items-center text-center text-slate-400 dark:text-slate-500 border border-dashed border-slate-100 dark:border-slate-800 rounded-xl p-6 bg-slate-50/50 dark:bg-slate-900/10">
                  <PlusCircle className="w-8 h-8 text-slate-300 dark:text-slate-700 mb-2" />
                  <p className="text-xs font-bold">Form Thêm Lịch Đang Đóng</p>
                  <p className="text-[10px] max-w-xs mt-1 leading-relaxed">
                    Hãy nhấn nút <strong>"Mở Form ➕"</strong> phía trên để lập tức lên lịch bận đột xuất hoặc thêm mốc tự học rèn luyện kỹ năng cố định lặp lại mỗi tuần.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* INTEGRATED DETAILED TIMELINE CHART */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Layers className="w-4.5 h-4.5 text-indigo-500" />
                  Timeline Chi Tiết Ngày {selectedDate.split("-").reverse().join("/")}
                </h4>
                <p className="text-[10px] text-slate-400">Kết hợp tự động mốc cố định & sự kiện rảnh/bận trong ngày</p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md">
                {dayBlocks.length} mốc hoạt động
              </span>
            </div>

            {/* List of Integrated Timeblocks */}
            <div className="grid grid-cols-1 gap-3.5">
              {dayBlocks.length === 0 ? (
                <div className="bg-slate-50/50 dark:bg-slate-900/20 border border-slate-150 p-8 rounded-xl text-center text-slate-500 dark:text-slate-400 space-y-2">
                  <Clock className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="font-semibold text-sm">Chưa có hoạt động nào trong lịch ngày này!</p>
                  <p className="text-xs">Hãy nhấn nút 'Thêm Mốc Lịch Biểu' ở trên hoặc dùng Trợ lý tự chia lịch rảnh.</p>
                </div>
              ) : (
                dayBlocks.map((block, idx) => {
                  const isCompleted = !!completedBlocks[`${selectedDate}-${block.id}`] || !!completedBlocks[block.id];
                  return (
                    <motion.div
                      key={block.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      onClick={() => toggleBlockCompleted(block.id)}
                      className={`group flex items-start gap-4 p-4 border-l-4 rounded-r-xl border border-slate-100 shadow-3xs transition-all cursor-pointer hover:border-slate-200 dark:border-slate-800 dark:hover:border-slate-700 ${
                        isCompleted
                          ? "bg-slate-50/80 border-slate-250 dark:bg-slate-900/30 opacity-70"
                          : block.isCustomDateEvent
                          ? "bg-amber-50/20 border-l-amber-500 border-amber-100 dark:bg-amber-950/5 dark:border-amber-900/40"
                          : "bg-white border-l-indigo-500 dark:bg-slate-900"
                      }`}
                    >
                      {/* Checkbox circle to complete */}
                      <div className="flex-none pt-0.5">
                        <button
                          onClick={(e) => toggleBlockCompleted(block.id, e)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                            isCompleted
                              ? "border-indigo-500 bg-indigo-500 text-white"
                              : "border-slate-300 group-hover:border-indigo-500 bg-white dark:bg-slate-800"
                          }`}
                        >
                          {isCompleted && <Check className="w-3.5 h-3.5 text-white" />}
                        </button>
                      </div>

                      {/* Block Info */}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4">
                        {/* Time Code */}
                        <div className="md:col-span-3 flex items-center">
                          <span className="font-mono text-xs font-bold tracking-tight text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                            {block.time}
                          </span>
                        </div>

                        {/* Title Activity & objective */}
                        <div className="md:col-span-5">
                          <h4
                            className={`font-semibold text-sm text-slate-950 dark:text-white transition-all ${
                              isCompleted ? "line-through text-slate-400 dark:text-slate-500" : ""
                            }`}
                          >
                            {block.activity}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            <strong>Mục tiêu:</strong> {block.objective}
                          </p>
                        </div>

                        {/* Badge and action */}
                        <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-3">
                          <div className="flex flex-col items-end gap-1">
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getCategoryColor(
                                block.category
                              )}`}
                            >
                              {getCategoryLabel(block.category)}
                            </span>
                            {block.isCustomDateEvent ? (
                              <span className="text-[8px] bg-amber-500 text-white px-1.5 py-0.5 rounded-sm">Ngày cụ thể 📅</span>
                            ) : (
                              <span className="text-[8px] bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 px-1.5 py-0.5 rounded-sm">Lặp tuần 🔁</span>
                            )}
                          </div>
                          
                          {/* Delete button */}
                          <button
                            onClick={(e) => handleDeleteBlock(block, e)}
                            className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-all cursor-pointer border-none bg-transparent"
                            title="Xoá khung giờ này"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: SMART AUTO-SCHEDULER */}
      {activeSubTab === "auto" && (
        <div className="space-y-6">
          {/* Concept Header */}
          <div className="bg-indigo-900 text-white p-6 rounded-xl border border-indigo-800 relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-300" />
              Thuật Toán Tự Chia Lịch Theo Thời Gian Rảnh
            </h3>
            <p className="text-xs text-indigo-200 mt-2 max-w-2xl leading-relaxed">
              Bạn bận rộn với lịch học trên giảng đường (HUB)? Đừng lo! Chỉ cần đánh dấu những buổi bạn bận dưới đây, trợ lý AI sẽ tự động tính toán những ngày rảnh rỗi, khung giờ trống của bạn và phân bố đều đặn lộ trình rèn luyện kỹ năng (SQL, C++, Python, Power BI, IELTS) một cách cực kỳ hợp lý.
            </p>
          </div>

          {/* Busy Checkbox Grid */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-indigo-500" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Bước 1: Chọn những buổi bạn BẬN trong tuần</h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400">
                    <th className="py-2.5 font-bold">Thứ Trong Tuần</th>
                    <th className="py-2.5 text-center font-bold">Sáng (08:00 - 12:00)</th>
                    <th className="py-2.5 text-center font-bold">Chiều (13:30 - 17:30)</th>
                    <th className="py-2.5 text-center font-bold">Tối (19:00 - 22:00)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {Object.keys(DAY_LABELS).map((dayKey) => {
                    const status = busySessions[dayKey] || { morning: false, afternoon: false, evening: false };
                    return (
                      <tr key={dayKey} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                        <td className="py-3 font-semibold text-slate-800 dark:text-slate-200">
                          {DAY_LABELS[dayKey]}
                        </td>
                        <td className="py-3 text-center">
                          <label className="inline-flex items-center justify-center cursor-pointer p-1">
                            <input
                              type="checkbox"
                              checked={!!status.morning}
                              onChange={() => toggleBusySession(dayKey, "morning")}
                              className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-1 text-[11px] text-slate-500">Bận học / đi làm</span>
                          </label>
                        </td>
                        <td className="py-3 text-center">
                          <label className="inline-flex items-center justify-center cursor-pointer p-1">
                            <input
                              type="checkbox"
                              checked={!!status.afternoon}
                              onChange={() => toggleBusySession(dayKey, "afternoon")}
                              className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-1 text-[11px] text-slate-500">Bận học / đi làm</span>
                          </label>
                        </td>
                        <td className="py-3 text-center">
                          <label className="inline-flex items-center justify-center cursor-pointer p-1">
                            <input
                              type="checkbox"
                              checked={!!status.evening}
                              onChange={() => toggleBusySession(dayKey, "evening")}
                              className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-1 text-[11px] text-slate-500">Bận học / đi làm</span>
                          </label>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={handleGenerateAutoSchedule}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Phân tích & Tự Động Chia Lịch Học
              </button>
            </div>
          </div>

          {/* Generated Preview Block */}
          {generatedPreview && (
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 dark:bg-slate-900/50 dark:border-slate-800 space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-indigo-600" />
                    Bước 2: Xem thử lịch trình tối ưu vừa kiến tạo
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Thuật toán đã tự động bảo lưu thời gian biểu bận rộn trên lớp và phân bổ học tập vào các khung giờ vàng rảnh rỗi.
                  </p>
                </div>
                <button
                  onClick={handleApplyAutoSchedule}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  Áp Dụng Lịch Trình Này Vào Bản Gốc
                </button>
              </div>

              {/* Day Cards for Quick Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {Object.keys(DAY_LABELS).map((dayKey) => {
                  const blocks = generatedPreview[dayKey] || [];
                  const activeStudyBlocks = blocks.filter((b) => b.activity.startsWith("🌟"));
                  return (
                    <div key={dayKey} className="bg-white p-4 rounded-xl border border-slate-100 dark:bg-slate-900 dark:border-slate-800 space-y-2.5">
                      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-1.5">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">{DAY_LABELS[dayKey]}</span>
                        <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">
                          {activeStudyBlocks.length} ca rảnh tự học
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {blocks.map((block) => {
                          const isStudy = block.activity.startsWith("🌟");
                          const isBusy = block.activity.includes("Bận");
                          return (
                            <div
                              key={block.id}
                              className={`p-2 rounded text-xs leading-relaxed ${
                                isStudy
                                  ? "bg-indigo-50/75 text-indigo-900 border-l-2 border-indigo-500 dark:bg-indigo-950/20 dark:text-indigo-300"
                                  : isBusy
                                  ? "bg-rose-50/70 text-rose-800 border-l-2 border-rose-400 dark:bg-rose-950/10 dark:text-rose-400"
                                  : "bg-slate-50 text-slate-500 dark:bg-slate-800/40"
                              }`}
                            >
                              <div className="flex justify-between font-mono text-[9px] text-slate-400">
                                <span>{block.time}</span>
                              </div>
                              <div className="font-bold truncate">{block.activity}</div>
                              {!isBusy && <div className="text-[10px] text-slate-400 truncate">{block.objective}</div>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-VIEW: SPECIFIC DATE PLANNER */}
      {activeSubTab === "date-planner" && (
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 dark:bg-slate-900/40 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-lg">
              <CalendarDays className="w-5 h-5 text-indigo-500" />
              Lịch Trình Chi Tiết Theo Ngày Cụ Thể
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Lập kế hoạch cụ thể cho từng ngày độc lập. Bạn có thể thêm các việc bận đột xuất, lịch đi sự kiện, hội thảo (ví dụ: ngày 25 đi sự kiện ngân hàng). Hệ thống sẽ tự động hòa trộn thông minh giữa <strong>Khung lịch mẫu 7 ngày cố định</strong> và <strong>Các sự kiện riêng biệt trong ngày</strong> của bạn để tạo ra một timeline tổng hợp duy nhất cho ngày đó.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Col: The Calendar Grid (5 cols) */}
            <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <button
                  onClick={handlePrevMonth}
                  className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </button>
                <span className="font-bold text-sm text-slate-800 dark:text-white font-sans">
                  Tháng {currentMonth + 1}, {currentYear}
                </span>
                <button
                  onClick={handleNextMonth}
                  className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-400">
                <span>CN</span>
                <span>T2</span>
                <span>T3</span>
                <span>T4</span>
                <span>T5</span>
                <span>T6</span>
                <span>T7</span>
              </div>

              {/* Day Cells */}
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentYear, currentMonth).map((cell, idx) => {
                  const isSelected = selectedDate === cell.dateString;
                  const hasEvents = dateSchedules[cell.dateString] && dateSchedules[cell.dateString].length > 0;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedDate(cell.dateString)}
                      className={`h-10 text-xs rounded-lg font-medium transition-all relative flex flex-col items-center justify-center cursor-pointer ${
                        isSelected
                          ? "bg-indigo-600 text-white font-bold shadow-xs scale-105"
                          : cell.isCurrentMonth
                          ? "text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-200 dark:hover:bg-slate-800"
                          : "text-slate-300 dark:text-slate-600"
                      }`}
                    >
                      <span>{cell.dayNum}</span>
                      {hasEvents && (
                        <span
                          className={`w-1.5 h-1.5 rounded-full absolute bottom-1.5 ${
                            isSelected ? "bg-white" : "bg-indigo-500"
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected date display */}
              <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 leading-relaxed">
                <p className="font-semibold text-slate-700 dark:text-slate-300">💡 Gợi ý sử dụng:</p>
                <p className="mt-1">Chọn một ngày bất kỳ trên lịch, sau đó bấm <strong>"Thêm Sự Kiện ➕"</strong> bên phải để tùy chỉnh các hoạt động cụ thể cho ngày đó.</p>
              </div>
            </div>

            {/* Right Col: Day Details & Timeline (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h4 className="font-bold text-sm text-indigo-600 dark:text-indigo-400">
                      📅 Lịch trình Ngày: {selectedDate.split("-").reverse().join("/")}
                    </h4>
                    <span className="text-xs text-slate-400">
                      ({getDayOfWeekFromDate(selectedDate) === "CN" ? "Chủ Nhật" : `Thứ ${getDayOfWeekFromDate(selectedDate)}`})
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setIsAddingDateBlock(!isAddingDateBlock)}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 dark:text-indigo-400 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    {isAddingDateBlock ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    {isAddingDateBlock ? "Đóng Form" : "Thêm Sự Kiện ➕"}
                  </button>
                </div>

                {/* Quick Add Event Form */}
                <AnimatePresence>
                  {isAddingDateBlock && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleAddDateBlock}
                      className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-lg border border-indigo-100 dark:border-slate-800 space-y-3 overflow-hidden text-xs"
                    >
                      <h5 className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <PlusCircle className="w-4 h-4 text-indigo-500" />
                        Thêm Việc Bận/Sự Kiện Đặc Biệt
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-400 mb-1">Giờ bắt đầu</label>
                          <input
                            type="time"
                            value={newDateStartTime}
                            onChange={(e) => setNewDateStartTime(e.target.value)}
                            className="w-full p-2 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900 font-mono text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1">Giờ kết thúc</label>
                          <input
                            type="time"
                            value={newDateEndTime}
                            onChange={(e) => setNewDateEndTime(e.target.value)}
                            className="w-full p-2 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900 font-mono text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">Hoạt động bận/Sự kiện</label>
                        <input
                          type="text"
                          placeholder="Ví dụ: Đi sự kiện tuyển dụng ngân hàng Techcombank"
                          value={newDateActivity}
                          onChange={(e) => setNewDateActivity(e.target.value)}
                          className="w-full p-2 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">Mục tiêu cụ thể</label>
                        <input
                          type="text"
                          placeholder="Ví dụ: Nộp CV ứng tuyển vị trí Data Analyst Intern"
                          value={newDateObjective}
                          onChange={(e) => setNewDateObjective(e.target.value)}
                          className="w-full p-2 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-1">
                        <div>
                          <label className="block text-slate-400 mb-1">Phân loại</label>
                          <select
                            value={newDateCategory}
                            onChange={(e) => setNewDateCategory(e.target.value as TimeBlock["category"])}
                            className="p-1.5 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none text-xs"
                          >
                            <option value="study">Tự học (Study)</option>
                            <option value="work">Công việc/Sự kiện (Work)</option>
                            <option value="project">Dự án (Project)</option>
                            <option value="life">Sinh hoạt (Life)</option>
                            <option value="rest">Nghỉ ngơi (Rest)</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded cursor-pointer transition-all text-xs"
                        >
                          Lưu Sự Kiện
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Combined Timeline Representation */}
                <div className="space-y-3 pt-1">
                  <h5 className="text-xs font-bold text-slate-400 tracking-wide uppercase flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Tiến Trình Thời Gian Ngày {selectedDate.split("-").reverse().join("/")}
                  </h5>

                  {(() => {
                    const engDay = getEnglishDayFromDate(selectedDate);
                    const templateBlocks = weeklySchedule[engDay] || [];
                    const customEvents = dateSchedules[selectedDate] || [];

                    const customTimeBlocks: TimeBlock[] = customEvents.map(evt => ({
                      id: evt.id,
                      time: evt.time,
                      activity: evt.activity,
                      objective: evt.objective,
                      category: evt.category,
                      isCustomDateEvent: true
                    } as any));

                    const merged = [...templateBlocks.map(b => ({ ...b, isTemplate: true })), ...customTimeBlocks];
                    merged.sort((a, b) => getStartHour(a.time) - getStartHour(b.time));

                    if (merged.length === 0) {
                      return (
                        <div className="text-center py-8 text-slate-400 border border-dashed border-slate-100 rounded-lg dark:border-slate-800">
                          <p className="text-xs">Không có lịch trình nào được thiết lập cho ngày này.</p>
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-3">
                        {merged.map((block: any) => {
                          const isCustom = block.isCustomDateEvent;
                          return (
                            <div
                              key={block.id}
                              className={`p-3.5 rounded-xl border transition-all ${
                                isCustom
                                  ? "bg-amber-50/70 border-amber-300 dark:bg-amber-950/15 dark:border-amber-900/60 shadow-3xs"
                                  : "bg-white border-slate-100 hover:bg-slate-50/50 dark:bg-slate-900 dark:border-slate-800/80"
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                                <span className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5 shrink-0" />
                                  {block.time}
                                </span>
                                <div className="flex items-center gap-1.5">
                                  {isCustom ? (
                                    <span className="text-[9px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full">
                                      Việc Bận Đặc Biệt Ngày 📅
                                    </span>
                                  ) : (
                                    <span className="text-[9px] font-bold bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 px-2 py-0.5 rounded-full">
                                      Lịch tuần cố định
                                    </span>
                                  )}
                                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${getCategoryColor(block.category)}`}>
                                    {getCategoryLabel(block.category)}
                                  </span>
                                </div>
                              </div>

                              <div className="mt-2">
                                <h6 className={`font-bold text-xs text-slate-800 dark:text-slate-100 ${isCustom ? "text-amber-950 dark:text-amber-300" : ""}`}>
                                  {block.activity}
                                </h6>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                                  <strong>Mục tiêu:</strong> {block.objective}
                                </p>
                              </div>

                              {isCustom && (
                                <div className="mt-2.5 flex justify-end border-t border-amber-100 dark:border-amber-900/30 pt-2">
                                  <button
                                    onClick={(e) => handleDeleteDateEvent(selectedDate, block.id, e)}
                                    className="text-[10px] text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-0.5 cursor-pointer border-none bg-transparent"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                    Xóa việc bận đặc biệt
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW: AI SCHEDULE PARSER */}
      {activeSubTab === "parse-image" && (
        <div className="space-y-6">
          <div className="bg-indigo-900 text-white p-6 rounded-xl border border-indigo-800 relative overflow-hidden animate-fade-in">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-300 animate-pulse" />
              AI Trích Xuất & Tự Động Sắp Xếp Lịch Học Kì 2 / Kì 2
            </h3>
            <p className="text-xs text-indigo-100 mt-2 max-w-2xl leading-relaxed">
              Dành riêng cho sinh viên Elite. Hãy chụp màn hình/tải ảnh thời khóa biểu học kỳ 2 từ cổng trường của bạn. Trí tuệ nhân tạo Gemini 3.5 Flash sẽ tự động phân tích dữ liệu ảnh, trích xuất tất cả môn học thực tế cùng thời gian cụ thể, tự chia thời gian bận trên lớp và quy hoạch thời gian tự học rảnh rỗi chuẩn tối ưu!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Box: File upload / Drag drop (5 cols) */}
            <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
              <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
                <Upload className="w-4.5 h-4.5 text-indigo-500" />
                Tải Lên Ảnh Thời Khóa Biểu
              </h4>

              {/* Drag Drop Area */}
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 rounded-xl p-6 text-center transition-all relative">
                {imagePreview ? (
                  <div className="space-y-3">
                    {imagePreview === "demo-preview" ? (
                      <div className="w-full h-40 bg-indigo-50 dark:bg-indigo-950/10 rounded-lg flex flex-col items-center justify-center border border-indigo-100 dark:border-indigo-900/40">
                        <ImageIcon className="w-12 h-12 text-indigo-400 animate-pulse" />
                        <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mt-2">Đang nạp Thời khóa biểu Kì 2 Mẫu...</span>
                      </div>
                    ) : (
                      <div className="relative group rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800">
                        <img src={imagePreview} alt="Schedule upload preview" className="w-full h-40 object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                          <button
                            onClick={() => { setImagePreview(null); setParsedClasses([]); }}
                            className="bg-rose-600 hover:bg-rose-700 text-white p-2 rounded-full cursor-pointer transition-all border-none"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-slate-500">Thời khóa biểu sẵn sàng để AI xử lý.</p>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center space-y-2.5 py-6">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-full">
                      <ImageIcon className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Chọn một tệp ảnh</span>
                      <span className="text-xs text-slate-400"> hoặc kéo thả tại đây</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Hỗ trợ định dạng PNG, JPG, JPEG</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                {imagePreview && imagePreview !== "demo-preview" && (
                  <button
                    onClick={handleStartAIAnalysis}
                    disabled={imageParsing}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-55 border-none"
                  >
                    {imageParsing ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    Bắt đầu AI Phân tích & Trích xuất ⚡
                  </button>
                )}

                <button
                  onClick={handleUseDemoSchedule}
                  disabled={imageParsing}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700/80 dark:text-slate-200 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border-none"
                >
                  <FileText className="w-4 h-4" />
                  Dùng Thời Khóa Biểu Kì 2 Mẫu (Chạy thử ngay) 🧪
                </button>
              </div>

              {/* Parsing status loading text */}
              {imageParsing && (
                <div className="p-3.5 bg-indigo-50 border border-indigo-100 rounded-lg dark:bg-indigo-950/20 dark:border-indigo-900/40 space-y-2 text-left">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin shrink-0" />
                    <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300">Đang quét ảnh bằng Trí tuệ Nhân tạo...</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed animate-pulse">
                    Đang giải mã ký tự trong thời khóa biểu... Gemini 3.5 đang định hình các môn học ngành MIS, phân loại thứ tự ca sáng/chiều và lên sơ đồ mục tiêu cho học kỳ mới của bạn. Vui lòng chờ vài giây nhé!
                  </p>
                </div>
              )}

              {parsingError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs dark:bg-rose-950/20 dark:border-rose-900/40 dark:text-rose-400 flex items-start gap-2 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{parsingError}</p>
                </div>
              )}
            </div>

            {/* Right Box: Extracted items & action (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
                    <CheckCircle className="w-4.5 h-4.5 text-indigo-500" />
                    Kết Quả Nhận Diện Từ AI
                  </h4>
                  {parsedClasses.length > 0 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 rounded-full border border-emerald-200">
                      Đã trích xuất {parsedClasses.length} môn
                    </span>
                  )}
                </div>

                {parsingSuccessMessage && (
                  <p className="text-xs text-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/20 dark:text-emerald-400 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-900/30 text-left">
                    {parsingSuccessMessage}
                  </p>
                )}

                {parsedClasses.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                    <ImageIcon className="w-10 h-10 mx-auto text-slate-300" />
                    <p className="text-xs mt-3">Chưa có dữ liệu thời khóa biểu được nhận diện.</p>
                    <p className="text-[10px] text-slate-400 mt-1 max-w-sm mx-auto">Vui lòng tải ảnh lịch học của bạn lên rồi bấm nút "Bắt đầu AI Phân tích" hoặc bấm nút "Dùng Thời Khóa Biểu Kì 2 Mẫu" để thử nghiệm tính năng ngay lập tức.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="space-y-3.5 max-h-96 overflow-y-auto pr-1">
                      {parsedClasses.map((cls, idx) => {
                        const viDay = cls.day === "Mon" ? "T2" : cls.day === "Tue" ? "T3" : cls.day === "Wed" ? "T4" : cls.day === "Thu" ? "T5" : cls.day === "Fri" ? "T6" : cls.day === "Sat" ? "T7" : "CN";
                        return (
                          <div
                            key={idx}
                            className="p-3.5 bg-indigo-50/40 border border-indigo-100 rounded-xl dark:bg-slate-900/50 dark:border-slate-800 space-y-2 relative text-left"
                          >
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5">
                              <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-lg">
                                Thứ {viDay} | {cls.time}
                              </span>
                              <span className="text-[9px] font-bold text-indigo-500 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md dark:bg-indigo-950/20 dark:border-indigo-900/40 uppercase">
                                Nhận diện chính xác ✔
                              </span>
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                                {cls.activity}
                              </h5>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                <strong>MIS Focus:</strong> {cls.objective}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-left">
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                        Khi bấm áp dụng, hệ thống sẽ tự động cấu hình các buổi học này là <strong>"Lịch Bận"</strong> và tạo các khối học chính thức trên giảng đường của bạn. Các giờ rảnh rỗi còn lại sẽ được mở để tự động chia lịch rèn luyện kỹ năng!
                      </p>
                      <button
                        onClick={handleApplyParsedClasses}
                        className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer border-none"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Áp Dụng Lịch Học Kì 2 🚀
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW: DETAILED 7-DAY WEEKLY SCHEDULE GRID */}
      {activeSubTab === "weekly-grid" && (
        <div className="space-y-6 animate-fade-in">
          {/* Concept Header */}
          <div className="bg-gradient-to-r from-violet-900 to-indigo-950 text-white p-6 rounded-xl border border-violet-800 relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-violet-300 animate-pulse" />
              Bảng Thời Khóa Biểu & Lịch Học Chi Tiết 7 Ngày
            </h3>
            <p className="text-xs text-violet-200 mt-2 max-w-2xl leading-relaxed">
              Thời khóa biểu rèn luyện kỹ năng và học tập cố định hàng tuần (Từ Thứ Hai đến Chủ Nhật). Bạn có thể trực tiếp theo dõi, nhấn tích hoàn thành bài học rèn luyện ngay tại đây. Hệ thống sẽ đồng bộ tiến độ theo ngày thực tế của bạn.
            </p>
          </div>

          {/* 7 Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
            {Object.keys(DAY_LABELS).map((dayKey) => {
              const blocks = weeklySchedule[dayKey] || [];
              const label = DAY_LABELS[dayKey];
              
              const keyToLabel: Record<string, string> = {
                Mon: "T2", Tue: "T3", Wed: "T4", Thu: "T5", Fri: "T6", Sat: "T7", Sun: "CN"
              };
              
              const weekDays = getWeekDates(selectedDate);
              const dayCell = weekDays.find(d => d.dayLabel === keyToLabel[dayKey]);
              const cellDateStr = dayCell ? dayCell.dateString : selectedDate;
              
              // Check if today matches this day card
              const today = new Date();
              const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
              const isToday = cellDateStr === todayStr;

              // Statistics for the day
              const studyHours = blocks.filter(b => b.category === "study" || b.category === "work" || b.category === "project").reduce((sum, b) => sum + calculateDurationHours(b.time), 0);
              const dayCompletedCount = blocks.filter(b => completedBlocks[`${cellDateStr}-${b.id}`] || completedBlocks[b.id]).length;
              const dayProgressPercent = blocks.length ? Math.round((dayCompletedCount / blocks.length) * 100) : 0;

              return (
                <div
                  key={dayKey}
                  className={`bg-white rounded-xl border p-4.5 space-y-3.5 transition-all dark:bg-slate-900 ${
                    isToday
                      ? "ring-2 ring-violet-500 shadow-md border-violet-200 dark:border-violet-950 dark:ring-violet-600"
                      : "border-slate-100 dark:border-slate-800"
                  }`}
                >
                  {/* Column Header */}
                  <div className="border-b border-slate-100 dark:border-slate-800/80 pb-2.5">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1">
                        {label}
                        {isToday && (
                          <span className="text-[8px] font-bold bg-violet-600 text-white px-1 py-0.5 rounded-full uppercase animate-pulse shrink-0">
                            Hôm nay
                          </span>
                        )}
                      </span>
                      {dayCell && (
                        <span className="text-[10px] font-semibold text-slate-400 font-mono">
                          {dayCell.dayNum}/{dayCell.dateString.split("-")[1]}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-center mt-1.5 text-[9px] text-slate-400">
                      <span>{studyHours.toFixed(1)}h học</span>
                      <span className="font-mono">{dayCompletedCount}/{blocks.length} xong</span>
                    </div>

                    {/* Compact Day Progress Bar */}
                    {blocks.length > 0 && (
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden mt-2">
                        <div
                          className="bg-violet-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${dayProgressPercent}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Block List */}
                  <div className="space-y-2 max-h-[460px] overflow-y-auto pr-0.5">
                    {blocks.length === 0 ? (
                      <div className="text-center py-8 text-slate-400 border border-dashed border-slate-100 rounded-lg dark:border-slate-800">
                        <p className="text-[10px]">Trống</p>
                      </div>
                    ) : (
                      blocks.map((block) => {
                        const isBlockCompleted = !!completedBlocks[`${cellDateStr}-${block.id}`] || !!completedBlocks[block.id];
                        
                        return (
                          <div
                            key={block.id}
                            onClick={() => {
                              const key = `${cellDateStr}-${block.id}`;
                              setCompletedBlocks({
                                ...completedBlocks,
                                [key]: !completedBlocks[key]
                              });
                            }}
                            className={`p-2.5 rounded-lg border transition-all cursor-pointer text-left relative group ${
                              isBlockCompleted
                                ? "bg-slate-50/70 border-slate-200 dark:bg-slate-950/20 dark:border-slate-800/40 opacity-60"
                                : block.category === "work"
                                ? "bg-emerald-50/20 border-emerald-100 hover:border-emerald-200 dark:bg-emerald-950/5 dark:border-emerald-900/20"
                                : block.category === "project"
                                ? "bg-purple-50/20 border-purple-100 hover:border-purple-200 dark:bg-purple-950/5 dark:border-purple-900/20"
                                : block.category === "rest"
                                ? "bg-rose-50/20 border-rose-100 hover:border-rose-200 dark:bg-rose-950/5 dark:border-rose-900/20"
                                : block.category === "life"
                                ? "bg-amber-50/20 border-amber-100 hover:border-amber-200 dark:bg-amber-950/5 dark:border-amber-900/20"
                                : "bg-blue-50/20 border-blue-100 hover:border-blue-200 dark:bg-blue-950/5 dark:border-blue-900/20"
                            }`}
                          >
                            {/* Checkbox indicator */}
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="font-mono text-[9px] font-bold text-slate-500 dark:text-slate-400">
                                {block.time}
                              </span>
                              <div
                                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-all ${
                                  isBlockCompleted
                                    ? "bg-violet-500 border-violet-500 text-white"
                                    : "border-slate-300 group-hover:border-violet-500 bg-white dark:bg-slate-800"
                                }`}
                              >
                                {isBlockCompleted && <Check className="w-2.5 h-2.5 text-white" />}
                              </div>
                            </div>

                            <h6 className={`font-bold text-[10px] text-slate-800 dark:text-slate-200 line-clamp-1 ${
                              isBlockCompleted ? "line-through text-slate-400 dark:text-slate-500" : ""
                            }`}>
                              {block.activity}
                            </h6>
                            
                            <p className="text-[9px] text-slate-400 dark:text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                              {block.objective}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-VIEW: HUB UNIVERSITY SCHEDULE */}
      {activeSubTab === "hub-schedule" && (
        <div className="space-y-6">
          {/* Student Profile Card */}
          <div className="bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg border border-emerald-500/20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <School className="w-3.5 h-3.5" />
                    {CURRENT_STUDENT_PROFILE.universityName}
                  </span>
                  <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {CURRENT_STUDENT_PROFILE.semester}
                  </span>
                  <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold">
                    Tổng {CURRENT_STUDENT_PROFILE.totalCredits} Tín chỉ (8 Học phần)
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
                    <User className="w-6 h-6 text-emerald-400" />
                    {CURRENT_STUDENT_PROFILE.fullName}
                    <span className="text-sm font-mono font-medium text-emerald-300/90 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                      MSSV: {CURRENT_STUDENT_PROFILE.studentId}
                    </span>
                  </h2>
                  <p className="text-xs text-emerald-100/90 mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span>📚 <strong>Lớp:</strong> {CURRENT_STUDENT_PROFILE.className}</span>
                    <span>🎓 <strong>Ngành đào tạo:</strong> {CURRENT_STUDENT_PROFILE.trainingType}</span>
                    <span>🏫 <strong>Cơ sở học:</strong> {CURRENT_STUDENT_PROFILE.campusAddress}</span>
                  </p>
                </div>
              </div>

              {/* Quick Actions in Header */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
                <button
                  onClick={() => applyHubPreset("phase-1")}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    currentPhase === "phase-1"
                      ? "bg-white text-emerald-900 ring-2 ring-emerald-400 font-extrabold"
                      : "bg-emerald-600/60 hover:bg-emerald-600 text-white border border-emerald-400/30"
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Đồng bộ Lịch Đợt 1 (T9-T10)
                </button>
                <button
                  onClick={() => applyHubPreset("phase-2")}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    currentPhase === "phase-2"
                      ? "bg-white text-emerald-900 ring-2 ring-emerald-400 font-extrabold"
                      : "bg-emerald-600/60 hover:bg-emerald-600 text-white border border-emerald-400/30"
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Đồng bộ Lịch Đợt 2 (T11-T01)
                </button>
              </div>
            </div>
          </div>

          {/* Phase 1 vs Phase 2 Comparison & Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-5 rounded-2xl border transition-all ${
              currentPhase === "phase-1"
                ? "bg-emerald-50/70 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-800 shadow-xs"
                : "bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 opacity-80"
            }`}>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                  GIAI ĐOẠN 1: 03/09/2026 → 30/10/2026
                </span>
                {currentPhase === "phase-1" && (
                  <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Đang Áp Dụng
                  </span>
                )}
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                5 Học phần chính khóa + Kiến tập ngành MIS
              </h4>
              <ul className="text-xs text-slate-600 dark:text-slate-400 mt-2 space-y-1.5 list-disc list-inside">
                <li><strong>Thứ 4:</strong> GDTC 3 (San1, Sáng) + KTCT Mác - Lênin (A102, Chiều)</li>
                <li><strong>Thứ 5:</strong> Mạng máy tính (C205, Sáng) + Cơ sở dữ liệu (C201, Chiều)</li>
                <li><strong>Thứ 6:</strong> Nguyên lý kế toán (B1.106, Sáng)</li>
                <li><strong>Tự học/Deep Work:</strong> Thứ 2, Thứ 3, Thứ 7, CN và các buổi tối tập trung luyện SQL & Python!</li>
              </ul>
              <button
                onClick={() => applyHubPreset("phase-1")}
                className="mt-4 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                ⚡ Nạp Đợt 1 Vào Lịch Biểu Tổng
              </button>
            </div>

            <div className={`p-5 rounded-2xl border transition-all ${
              currentPhase === "phase-2"
                ? "bg-emerald-50/70 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-800 shadow-xs"
                : "bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 opacity-80"
            }`}>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300">
                  GIAI ĐOẠN 2: 18/11/2026 → 13/01/2027
                </span>
                {currentPhase === "phase-2" && (
                  <span className="text-[10px] font-bold text-teal-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Đang Áp Dụng
                  </span>
                )}
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                2 Học phần chuyên ngành chuyên sâu (Thứ 4 trọn ngày)
              </h4>
              <ul className="text-xs text-slate-600 dark:text-slate-400 mt-2 space-y-1.5 list-disc list-inside">
                <li><strong>Thứ 4 Sáng (07:00-11:05):</strong> Phân tích kinh doanh (Phòng B1.306)</li>
                <li><strong>Thứ 4 Chiều (13:00-17:05):</strong> Giải thuật ứng dụng trong kinh doanh (Phòng C201)</li>
                <li><strong>Tự học bứt phá:</strong> Cả tuần Thứ 2, 3, 5, 6, 7, CN rảnh hoàn toàn để xây dựng Data Pipeline, Power BI DAX & Kaggle Portfolio!</li>
              </ul>
              <button
                onClick={() => applyHubPreset("phase-2")}
                className="mt-4 w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                ⚡ Nạp Đợt 2 Vào Lịch Biểu Tổng
              </button>
            </div>
          </div>

          {/* Filter Bar for Registered Courses */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Lọc danh sách học phần:
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setHubFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  hubFilter === "all"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                Tất cả 8 Môn (19 TC)
              </button>
              <button
                onClick={() => setHubFilter("phase-1")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  hubFilter === "phase-1"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                Đợt 1 (5 Môn + Kiến tập)
              </button>
              <button
                onClick={() => setHubFilter("phase-2")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  hubFilter === "phase-2"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                Đợt 2 (2 Môn)
              </button>
              <button
                onClick={() => setHubFilter("core")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  hubFilter === "core"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                🌟 Môn Cốt Lõi Data & MIS
              </button>
            </div>
          </div>

          {/* Grid of 8 Registered Courses Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REGISTERED_COURSES
              .filter(course => {
                if (hubFilter === "phase-1") return course.phase.includes("Đợt 1") || course.phase.includes("Kiến tập");
                if (hubFilter === "phase-2") return course.phase.includes("Đợt 2");
                if (hubFilter === "core") return course.importance.includes("Cốt lõi") || course.importance.includes("Thực tế");
                return true;
              })
              .map((course) => (
                <div
                  key={course.courseCode}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center text-xs font-black">
                          {course.stt}
                        </span>
                        <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
                          {course.courseCode}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 px-2 py-0.5 rounded text-[11px] font-bold border border-emerald-200 dark:border-emerald-800">
                          {course.credits} Tín chỉ
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          course.phase.includes("Đợt 1") ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" : "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300"
                        }`}>
                          {course.phase}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                        {course.courseName}
                      </h4>
                      <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {course.importance}
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Lịch học:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {course.dayOfWeek} • {course.timeSlot || "Linh hoạt"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Phòng học:</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Building className="w-3.5 h-3.5" />
                          {course.room}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Thời gian:</span>
                        <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300">
                          {course.startDate} → {course.endDate}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Địa điểm:</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                          {course.campus}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                      💡 {course.note}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">
                      Đăng ký ngày: {course.registerDate}
                    </span>
                    <button
                      onClick={() => handleSyncSingleCourseToWeekly(course)}
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:hover:bg-emerald-900 dark:text-emerald-300 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Nạp riêng môn này
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Interactive Raw Text Parser Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-indigo-500" />
                  Trình Dán & Phân Tích Cú Pháp Thời Khóa Biểu Tự Động
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Dán bất kỳ văn bản thời khóa biểu nào từ cổng thông tin sinh viên HUB, hệ thống sẽ tự động tách mã môn, phòng học, thứ, giờ và chia vào Lịch Biểu Tổng!
                </p>
              </div>
            </div>

            <textarea
              rows={8}
              value={customScheduleInput}
              onChange={(e) => setCustomScheduleInput(e.target.value)}
              placeholder="Dán thời khóa biểu text từ trường vào đây..."
              className="w-full p-3.5 text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400">
                  ⚡ Mẹo: Hệ thống tự động nhận dạng Thứ 2 - CN, giờ học 7H00-11h05, phòng C205/C201/B1.106...
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setCustomScheduleInput(`THỜI KHÓA BIỂU SINH VIÊN

Họ tên :Nguyễn Đình Nhựt [Mã số: 030241250114]
Lớp : DH41HT01     Hệ : Đại học     Loại hình đào tạo : Đại học khóa 41     Điện thoại : 0355138474

DANH SÁCH NHỮNG HỌC PHẦN ĐÃ ĐĂNG KÝ    
HK01/2026-2027
1	ITS707_2611_1_D01	Kiến tập ngành Hệ thống thông tin quản lý ()	1		,,, 08/07/2026
2	ITS709_2611_1_D05	Mạng máy tính và truyền thông ()	3		Thứ Năm,7H00 - 11h05,C205,56 Hoàng Diệu 2 - Thủ Đức 03/09/2026	29/10/2026	02/07/2026
3	ITS302_2611_1_D04	Cơ sở dữ liệu ()	3		Thứ Năm,13H00 - 17h05,C201,56 Hoàng Diệu 2 - Thủ Đức 03/09/2026	29/10/2026	02/07/2026
4	ACC301_2614_1_D07	Nguyên lý kế toán ()	3		Thứ Sáu,7H00 - 11h05,B1.106,56 Hoàng Diệu 2 - Thủ Đức 04/09/2026	30/10/2026	02/07/2026
5	MLM307_2611_1_D10	Kinh tế chính trị Mác - Lênin ()	2		Thứ Tư,13H00 - 17h05,A102,56 Hoàng Diệu 2 - Thủ Đức 09/09/2026	14/10/2026	02/07/2026
6	GYM303_2617_1_CL_D20	Học phần GDTC 3 ()	1		Thứ Tư,7H00 - 9h15,San1,56 Hoàng Diệu 2 - Thủ Đức / Thứ Tư,9H50 - 11h05,San1,56 Hoàng Diệu 2 - Thủ Đức 09/09/2026	14/10/2026	04/07/2026
7	ITS711_261_1_D01	Phân tích kinh doanh ()	3		Thứ Tư,7H00 - 11h05,B1.306,56 Hoàng Diệu 2 - Thủ Đức 18/11/2026	13/01/2027	07/07/2026
8	ITS724_261_1_D03	Giải thuật ứng dụng trong kinh doanh ()	3		Thứ Tư,13H00 - 17h05,C201,56 Hoàng Diệu 2 - Thủ Đức 18/11/2026	13/01/2027	02/07/2026
Tổng số tín chỉ đăng ký: 19(tc)`);
                  }}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Khôi phục text mẫu HK1
                </button>
                <button
                  onClick={() => handleParseAndApplyTextSchedule(customScheduleInput)}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  ⚡ Phân Tích & Chia Vào Lịch Tổng Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: WEB LEARNING PORTALS */}
      {activeSubTab === "links" && (
        <div className="space-y-6">
          <div className="bg-indigo-50 border border-indigo-100 dark:bg-indigo-950/10 dark:border-indigo-900/50 p-5 rounded-xl">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              Cổng Khám Phá Tài Nguyên Học Tập & Thực Hành Kỹ Năng
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              Dưới đây là tổng hợp các cổng liên kết đến những trang web học tập, rèn luyện kỹ năng cốt lõi theo đúng yêu cầu lộ trình của Elite Data Analyst. Các địa chỉ này đã được cấu trúc cụ thể cho từng kỹ năng để bạn thực hành ngay lập tức.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningSites.map((site, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-5 rounded-xl border border-slate-100 dark:bg-slate-900 dark:border-slate-800 space-y-4 shadow-3xs flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    {site.skill}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {site.desc}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  {site.platforms.map((p, pIdx) => (
                    <a
                      key={pIdx}
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      referrerPolicy="no-referrer"
                      className="group flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 dark:border-slate-800/80 dark:bg-slate-900/50 dark:hover:bg-slate-800/80 transition-all cursor-pointer text-left"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 dark:text-slate-200 dark:group-hover:text-indigo-400 flex items-center gap-1.5">
                          {p.name}
                          <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-indigo-500" />
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5">
                          {p.url}
                        </span>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase shrink-0 ${p.style}`}>
                        {p.badg}
                      </span>
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
