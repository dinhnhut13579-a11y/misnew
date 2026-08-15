import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
  PieChart,
  Pie
} from "recharts";
import {
  Database,
  Sliders,
  Filter,
  CheckCircle2,
  Code2,
  ExternalLink,
  BookOpen,
  Award,
  Sparkles,
  Zap,
  Clock,
  Layers,
  ChevronRight,
  TrendingUp,
  Target,
  BarChart3,
  HelpCircle,
  Play
} from "lucide-react";
import {
  SQL_TOPICS_ANALYSIS,
  ALL_SKILLS_REQUIREMENTS,
  SQLTopicAnalysis,
  SkillRequirement
} from "../data/powerBiData";

export default function PowerBIDashboard() {
  // Slicer States
  const [targetRole, setTargetRole] = useState<"All" | "DA" | "DE">("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSQLTopic, setSelectedSQLTopic] = useState<SQLTopicAnalysis>(SQL_TOPICS_ANALYSIS[0]);
  
  // Interactive Skill Self-Assessment Scores (0 - 100)
  const [userSkillScores, setUserSkillScores] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem("mis_powerbi_skill_scores");
    if (saved) return JSON.parse(saved);
    return {
      "sk-sql": 40,
      "sk-python": 35,
      "sk-powerbi": 50,
      "sk-data-modeling": 20,
      "sk-airflow": 10,
      "sk-spark": 5,
      "sk-cloud": 15,
      "sk-genai": 10
    };
  });

  const handleScoreChange = (skillId: string, val: number) => {
    const updated = { ...userSkillScores, [skillId]: val };
    setUserSkillScores(updated);
    localStorage.setItem("mis_powerbi_skill_scores", JSON.stringify(updated));
  };

  // Filtered Skills based on Slicer
  const filteredSkills = useMemo(() => {
    return ALL_SKILLS_REQUIREMENTS.filter((s) => {
      if (selectedCategory !== "All" && s.category !== selectedCategory) return false;
      if (targetRole === "DA" && s.daWeight === 0) return false;
      if (targetRole === "DE" && s.deWeight === 0) return false;
      return true;
    });
  }, [selectedCategory, targetRole]);

  // Calculations for KPI Cards
  const totalLearningHours = useMemo(() => {
    return filteredSkills.reduce((acc, s) => acc + s.learningHours, 0);
  }, [filteredSkills]);

  const totalSQLHours = SQL_TOPICS_ANALYSIS.reduce((acc, t) => acc + t.estHoursToMaster, 0);

  // Overall DA and DE Readiness Calculation
  const daReadiness = useMemo(() => {
    let totalWeight = 0;
    let earnedScore = 0;
    ALL_SKILLS_REQUIREMENTS.forEach((s) => {
      if (s.daWeight > 0) {
        totalWeight += s.daWeight;
        const userScore = userSkillScores[s.id] || 0;
        earnedScore += (userScore / 100) * s.daWeight;
      }
    });
    return totalWeight > 0 ? Math.round((earnedScore / totalWeight) * 100) : 0;
  }, [userSkillScores]);

  const deReadiness = useMemo(() => {
    let totalWeight = 0;
    let earnedScore = 0;
    ALL_SKILLS_REQUIREMENTS.forEach((s) => {
      if (s.deWeight > 0) {
        totalWeight += s.deWeight;
        const userScore = userSkillScores[s.id] || 0;
        earnedScore += (userScore / 100) * s.deWeight;
      }
    });
    return totalWeight > 0 ? Math.round((earnedScore / totalWeight) * 100) : 0;
  }, [userSkillScores]);

  // Data for Recharts Radar Chart
  const radarData = useMemo(() => {
    return ALL_SKILLS_REQUIREMENTS.map((s) => ({
      skill: s.name.split(" ")[0],
      "Data Analyst": s.daWeight,
      "Data Engineer": s.deWeight,
      "Tự Đánh Giá": userSkillScores[s.id] || 0
    }));
  }, [userSkillScores]);

  // Categories list for Slicer
  const categoriesList = [
    "All",
    "Database & SQL",
    "Programming",
    "BI & Visualization",
    "Data Engineering",
    "Cloud & DevOps",
    "AI & Analytics"
  ];

  return (
    <div id="powerbi-analytics-dashboard" className="space-y-6">
      {/* Power BI Top Control & Yellow Brand Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="bg-[#F2C811] px-4 py-2 flex justify-between items-center text-slate-950 font-bold text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 fill-slate-950" />
            <span>Power BI Interactive Analytics: Skill Matrix & SQL Learning Strategy</span>
          </div>
          <span className="text-[10px] sm:text-xs font-mono bg-slate-950 text-amber-400 px-2 py-0.5 rounded">
            Live Interactive Slicers
          </span>
        </div>

        <div className="p-5 text-white space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <Database className="w-6 h-6 text-[#F2C811]" />
                Phân Tích Kỹ Năng & Lộ Trình Luyện SQL Kiểu Power BI
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Hệ thống báo cáo trực quan hóa trọng số kỹ năng, số giờ cần học, và lộ trình chinh phục SQL từ con số 0 đến Data Analyst & Data Engineer.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 items-center bg-slate-800/80 p-2 rounded-xl border border-slate-700">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1 pl-1">
                <Filter className="w-3.5 h-3.5" /> Slicer Vai Trò:
              </span>
              {(["All", "DA", "DE"] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => setTargetRole(role)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    targetRole === role
                      ? "bg-[#F2C811] text-slate-950 shadow-sm"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {role === "All" ? "Tất Cả" : role === "DA" ? "Data Analyst" : "Data Engineer"}
                </button>
              ))}
            </div>
          </div>

          {/* Category Slicer Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
            <span className="text-xs text-slate-400 font-semibold mr-1">Lọc Theo Nhóm Kỹ Năng:</span>
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                {cat === "All" ? "Tất Cả Nhóm" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* POWER BI KPI CARD TILES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-2xs relative overflow-hidden">
          <div className="absolute right-2 top-2 text-indigo-500/10 dark:text-indigo-400/10">
            <Clock className="w-12 h-12" />
          </div>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Tổng Số Giờ Cần Học
          </span>
          <div className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400 mt-1">
            {totalLearningHours}h
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">
            Dựa trên {filteredSkills.length} kỹ năng đang lọc
          </span>
        </div>

        {/* KPI 2 */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-2xs relative overflow-hidden">
          <div className="absolute right-2 top-2 text-emerald-500/10 dark:text-emerald-400/10">
            <Award className="w-12 h-12" />
          </div>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Độ Sẵn Sàng Data Analyst
          </span>
          <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            {daReadiness}%
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${daReadiness}%` }} />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-2xs relative overflow-hidden">
          <div className="absolute right-2 top-2 text-amber-500/10 dark:text-amber-400/10">
            <Zap className="w-12 h-12" />
          </div>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Độ Sẵn Sàng Data Engineer
          </span>
          <div className="text-2xl font-black font-mono text-amber-500 mt-1">
            {deReadiness}%
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${deReadiness}%` }} />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-2xs relative overflow-hidden">
          <div className="absolute right-2 top-2 text-blue-500/10 dark:text-blue-400/10">
            <Database className="w-12 h-12" />
          </div>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Số Giờ Học SQL Chuyên Sâu
          </span>
          <div className="text-2xl font-black font-mono text-blue-600 dark:text-blue-400 mt-1">
            {totalSQLHours}h
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">
            Trải dài qua 6 chuyên đề SQL
          </span>
        </div>
      </div>

      {/* SECTION 1: INTERACTIVE CHARTS & VISUALS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Skill Weight & Hours Breakdown Bar Chart */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                So Sánh Trọng Số Kỹ Năng (%): Data Analyst vs Data Engineer
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Biểu đồ cột thể hiện mức độ quan trọng của từng nhóm kỹ năng đối với DA và DE.
              </p>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredSkills} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#fff"
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                <Bar dataKey="daWeight" name="Trọng Số DA (%)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="deWeight" name="Trọng Số DE (%)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Skill Radar / Spider Chart */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Biểu Đồ Radar Độ Phủ Kỹ Năng
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Tương quan kỹ năng thực tế của bạn so với yêu cầu tuyển dụng.
            </p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid opacity={0.3} />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar name="Data Analyst" dataKey="Data Analyst" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                <Radar name="Data Engineer" dataKey="Data Engineer" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                <Radar name="Tự Đánh Giá" dataKey="Tự Đánh Giá" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", fontSize: "11px", borderRadius: "8px" }} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SECTION 2: DEEP-DIVE INTERACTIVE SQL LEARNING MATRIX */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-2xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col md:flex-row justify-between md:items-center gap-2">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Database className="w-4 h-4" />
              Chi Tiết Kỹ Năng Số 1
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Lộ Trình Chinh Phục SQL Từ Con Số 0 Đến Master
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Nhấp chọn từng chuyên đề SQL dưới đây để xem cú pháp mẫu, từ khóa cốt lõi, câu hỏi phỏng vấn & các trang luyện tập miễn phí.
            </p>
          </div>
        </div>

        {/* SQL Topic Timeline Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {SQL_TOPICS_ANALYSIS.map((item, idx) => {
            const isSelected = item.id === selectedSQLTopic.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedSQLTopic(item)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-indigo-600 text-white border-indigo-500 shadow-md ring-2 ring-indigo-400/30"
                    : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}>
                    Chủ đề {idx + 1}
                  </span>
                  <span className={`text-[10px] font-mono ${isSelected ? "text-indigo-200" : "text-slate-400"}`}>
                    {item.estHoursToMaster}h
                  </span>
                </div>

                <h4 className="font-bold text-xs line-clamp-2 leading-tight mt-1">
                  {item.topic.split(" (")[0]}
                </h4>

                <div className="flex items-center gap-1 text-[10px] opacity-80 mt-1">
                  <span>Mức độ:</span>
                  <span className="font-semibold">{item.difficulty}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected SQL Topic Deep-Dive Viewer */}
        <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 dark:border-slate-700 pb-3">
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Chuyên Đề Đang Xem:
              </span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                {selectedSQLTopic.topic}
              </h4>
            </div>
            <div className="flex gap-2">
              <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 px-3 py-1 rounded-lg">
                Yêu cầu DA: {selectedSQLTopic.daImportance}%
              </span>
              <span className="text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 px-3 py-1 rounded-lg">
                Yêu cầu DE: {selectedSQLTopic.deImportance}%
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {selectedSQLTopic.description}
          </p>

          {/* Key Keywords */}
          <div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Từ khóa & Cú pháp bắt buộc nhớ:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedSQLTopic.keyKeywords.map((kw) => (
                <span
                  key={kw}
                  className="text-xs font-mono font-semibold bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 shadow-2xs"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Sample Query Playground */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-indigo-500" />
                Mẫu Câu Truy Vấn SQL Chuẩn Thực Tế:
              </span>
            </div>
            <div className="bg-slate-950 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 shadow-inner">
              <pre>{selectedSQLTopic.sampleQuery}</pre>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Common Interview Questions */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <h5 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-500" />
                Câu Hỏi Phỏng Vấn Thường Gặp:
              </h5>
              <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                {selectedSQLTopic.commonInterviewQuestions.map((q, idx) => (
                  <li key={idx}>{q}</li>
                ))}
              </ul>
            </div>

            {/* Practice Platforms */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <h5 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                <Play className="w-4 h-4 text-emerald-500" />
                Nơi Luyện Tập Thực Hành Đề Xuất:
              </h5>
              <div className="space-y-1.5">
                {selectedSQLTopic.practicePlatforms.map((p) => (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-between items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline bg-slate-50 dark:bg-slate-800 p-2 rounded-lg"
                  >
                    <span>{p.name}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: SELF-ASSESSMENT MATRIX & GAP CALCULATOR */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-2xs space-y-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Bảng Tự Đánh Giá & Tính Toán Khoảng Trống Kỹ Năng (Skill Gap Analyzer)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Kéo thanh trượt để nhập mức độ thành thạo hiện tại của bạn (0-100%). Hệ thống Power BI sẽ tự động tính toán tỷ lệ sẵn sàng cho công việc.
          </p>
        </div>

        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3">Tên Kỹ Năng</th>
                <th className="p-3">Nhóm Kỹ Năng</th>
                <th className="p-3 text-center">Trọng Số DA</th>
                <th className="p-3 text-center">Trọng Số DE</th>
                <th className="p-3">Mức Độ Hiện Tại Của Bạn</th>
                <th className="p-3 text-center">Đánh Giá</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {ALL_SKILLS_REQUIREMENTS.map((skill) => {
                const score = userSkillScores[skill.id] || 0;
                return (
                  <tr key={skill.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">
                      {skill.name}
                    </td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">
                      {skill.category}
                    </td>
                    <td className="p-3 text-center font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {skill.daWeight}%
                    </td>
                    <td className="p-3 text-center font-mono font-bold text-amber-600 dark:text-amber-400">
                      {skill.deWeight}%
                    </td>
                    <td className="p-3 w-64">
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="5"
                          value={score}
                          onChange={(e) => handleScoreChange(skill.id, parseInt(e.target.value))}
                          className="w-full accent-indigo-600 cursor-pointer"
                        />
                        <span className="font-mono font-bold w-10 text-right text-indigo-600 dark:text-indigo-400">
                          {score}%
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                        score >= 80
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : score >= 40
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      }`}>
                        {score >= 80 ? "Thành Thạo" : score >= 40 ? "Đang Học" : "Mới Bắt Đầu"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
