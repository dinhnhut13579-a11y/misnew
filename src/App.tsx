import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Compass,
  Clock,
  PlusCircle,
  FolderKanban,
  Bot,
  Link as LinkIcon,
  ChevronRight,
  BookOpen,
  Award,
  Sparkles,
  ExternalLink,
  Github,
  Moon,
  Sun,
  BarChart3
} from "lucide-react";

// Components
import MilestoneProgress from "./components/MilestoneProgress";
import CalendarView from "./components/CalendarView";
import HabitTracker from "./components/HabitTracker";
import PortfolioTracker from "./components/PortfolioTracker";
import AITutor from "./components/AITutor";
import PowerBIDashboard from "./components/PowerBIDashboard";

// Static reference data
import { RECOMMENDATIONS } from "./data/roadmapData";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("milestones");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Sync overall progress score on changes
  const [completedCount, setCompletedCount] = useState<number>(0);
  const totalRoadmapItems = 38; // Estimate based on static roadmap items (skills + projects)

  useEffect(() => {
    const skills = localStorage.getItem("mis_completed_skills");
    const projs = localStorage.getItem("mis_completed_projects");
    const sCount = skills ? Object.values(JSON.parse(skills)).filter(Boolean).length : 0;
    const pCount = projs ? Object.values(JSON.parse(projs)).filter(Boolean).length : 0;
    setCompletedCount(sCount + pCount);
  }, [activeTab]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navItems = [
    { id: "milestones", label: "Lộ Trình Chi Tiết", icon: Compass, description: "6 Giai đoạn & Mốc tuổi" },
    { id: "powerbi-analytics", label: "Power BI Analytics", icon: BarChart3, description: "Phân tích SQL & Kỹ năng Power BI" },
    { id: "calendar", label: "Thời Khóa Biểu", icon: Clock, description: "Kế hoạch Deep Work & HUB" },
    { id: "tracker", label: "Ghi Nhận Thường Nhật", icon: PlusCircle, description: "Nhật ký KPI rèn luyện" },
    { id: "portfolio", label: "Hồ Sơ Portfolio", icon: FolderKanban, description: "Dự án, Chứng chỉ & GPA" },
    { id: "ai-tutor", label: "Trợ Lý Học Tập AI", icon: Bot, description: "Tutor hỏi đáp SQL & Python" },
    { id: "resources", label: "Tài Nguyên Học Tập", icon: LinkIcon, description: "Sách, Khoá học & Kaggle" },
  ];

  return (
    <div className={`min-h-screen transition-all duration-200 font-sans ${isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800"}`}>
      {/* Top Banner and Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 px-4 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black tracking-tight text-lg shadow-sm">
              DA
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-950 dark:text-white">
                MIS Elite Roadmap
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Định hướng Data Analyst / BI Analyst (19 - 25 tuổi)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            {/* Minimalist Progress Pill */}
            <div className="hidden sm:flex items-center gap-3 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500">Tiến trình:</span>
              <div className="w-24 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(Math.round((completedCount / totalRoadmapItems) * 100), 100)}%` }}
                />
              </div>
              <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {Math.min(Math.round((completedCount / totalRoadmapItems) * 100), 100)}%
              </span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Sidebar Navigation */}
          <nav className="lg:col-span-3 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center gap-3.5 cursor-pointer ${
                    isActive
                      ? "bg-white border-indigo-500 text-indigo-700 shadow-sm dark:bg-slate-900 dark:text-indigo-400 dark:border-indigo-500"
                      : "bg-transparent border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isActive ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400" : "bg-slate-100 dark:bg-slate-800"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-xs tracking-tight">
                      {item.label}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-0.5 font-medium">
                      {item.description}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Quick Quote Widget */}
            <div className="hidden lg:block bg-slate-900 text-white p-4 rounded-xl border border-slate-800 mt-6 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex gap-2 items-center text-indigo-400 mb-1">
                <Sparkles className="w-4 h-4" />
                <h4 className="text-[11px] font-bold uppercase tracking-wider">Trích Dẫn Kỷ Luật</h4>
              </div>
              <p className="text-[11px] text-slate-300 italic leading-relaxed">
                "Kỷ luật là cầu nối giữa mục tiêu và thành tựu. Đầu tư 14 giờ một ngày rải đều cả tuần sẽ tạo nên kỳ tích."
              </p>
            </div>
          </nav>

          {/* Active Workspace View */}
          <div className="lg:col-span-9 space-y-6">
            {activeTab === "milestones" && <MilestoneProgress />}
            {activeTab === "powerbi-analytics" && <PowerBIDashboard />}
            {activeTab === "calendar" && <CalendarView />}
            {activeTab === "tracker" && <HabitTracker />}
            {activeTab === "portfolio" && <PortfolioTracker />}
            {activeTab === "ai-tutor" && <AITutor />}

            {/* Resources static panel */}
            {activeTab === "resources" && (
              <div id="resources-view" className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    Kho Tài Nguyên & Đường Link Khuyên Học
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Được tuyển chọn đặc biệt từ các nguồn chuẩn quốc tế và lộ trình uy tín Madzy Nguyen 2026.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {RECOMMENDATIONS.map((rec) => (
                    <div
                      key={rec.category}
                      className="bg-white p-5 rounded-xl border border-slate-100 dark:bg-slate-900 dark:border-slate-800 space-y-4"
                    >
                      <h3 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        {rec.category}
                      </h3>

                      <div className="space-y-3">
                        {rec.items.map((item) => (
                          <div
                            key={item.name}
                            className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1.5"
                          >
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white flex justify-between items-center gap-2">
                              {item.name}
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5 shrink-0"
                              >
                                Link <ExternalLink className="w-3 h-3" />
                              </a>
                            </h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 dark:border-slate-900/80 py-6 mt-12 bg-white dark:bg-slate-950/20 text-center">
        <p className="text-xs text-slate-400">
          © 2026 MIS Elite Operating System • Đồng hành cùng sinh viên MIS bứt phá thành công nghề nghiệp.
        </p>
      </footer>
    </div>
  );
}
