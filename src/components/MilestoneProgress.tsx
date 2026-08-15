import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Award,
  CheckCircle2,
  ChevronRight,
  ListTodo,
  Star,
  Compass,
  UserCheck,
  BookOpen,
  ExternalLink,
  Code2,
  Database,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  AlertTriangle,
  Users,
  Table as TableIcon,
  Flame,
  Zap,
  Globe,
  Library
} from "lucide-react";
import {
  ROADMAP_MILESTONES,
  AGE_MILESTONES,
  DA_DE_DETAILED_ROADMAP,
  ROADMAP_COMMUNITIES_AND_MISTAKES,
  DE_LEARNING_RESOURCES,
  MODERN_DATA_TRENDS
} from "../data/roadmapData";

export default function MilestoneProgress() {
  const [activeTab, setActiveTab] = useState<"da-de-roadmap" | "overview-table" | "stages" | "ages" | "de-resources" | "modern-trends" | "tips">("da-de-roadmap");

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>("phase-1");
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>("stage-1");
  const [selectedAge, setSelectedAge] = useState<number>(19);

  // Load custom checkoff progress for skills, projects, and roadmap checkpoints
  const [completedSkills, setCompletedSkills] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("mis_completed_skills");
    return saved ? JSON.parse(saved) : {};
  });

  const [completedProjects, setCompletedProjects] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("mis_completed_projects");
    return saved ? JSON.parse(saved) : {};
  });

  const [completedCheckpoints, setCompletedCheckpoints] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("mis_completed_phase_checkpoints");
    return saved ? JSON.parse(saved) : {};
  });

  const toggleSkill = (skill: string) => {
    const updated = { ...completedSkills, [skill]: !completedSkills[skill] };
    setCompletedSkills(updated);
    localStorage.setItem("mis_completed_skills", JSON.stringify(updated));
  };

  const toggleProject = (proj: string) => {
    const updated = { ...completedProjects, [proj]: !completedProjects[proj] };
    setCompletedProjects(updated);
    localStorage.setItem("mis_completed_projects", JSON.stringify(updated));
  };

  const toggleCheckpoint = (cpKey: string) => {
    const updated = { ...completedCheckpoints, [cpKey]: !completedCheckpoints[cpKey] };
    setCompletedCheckpoints(updated);
    localStorage.setItem("mis_completed_phase_checkpoints", JSON.stringify(updated));
  };

  // Metrics calculation
  const totalPhaseCheckpoints = DA_DE_DETAILED_ROADMAP.reduce((acc, p) => acc + p.checkpoints.length, 0);
  const checkedPhaseCheckpoints = Object.values(completedCheckpoints).filter(Boolean).length;
  const detailedRoadmapPercent = Math.round((checkedPhaseCheckpoints / totalPhaseCheckpoints) * 100) || 0;

  const filteredPhases = selectedCategory === "All"
    ? DA_DE_DETAILED_ROADMAP
    : DA_DE_DETAILED_ROADMAP.filter((p) => p.category === selectedCategory);

  const activePhase = DA_DE_DETAILED_ROADMAP.find((p) => p.id === selectedPhaseId) || DA_DE_DETAILED_ROADMAP[1];
  const activeMilestone = ROADMAP_MILESTONES.find((m) => m.id === selectedMilestoneId) || ROADMAP_MILESTONES[0];
  const activeAgeMilestone = AGE_MILESTONES.find((a) => a.age === selectedAge) || AGE_MILESTONES[0];

  const categoryLabels: Record<string, string> = {
    "All": "Tất cả giai đoạn",
    "Preparation": "0. Chuẩn bị",
    "Data Analyst Foundations": "1. Nền tảng Data Analyst",
    "DA Portfolio & Career": "2. Portfolio & Ứng tuyển DA",
    "Data Engineer Transition": "3. Lộ trình Data Engineer",
  };

  return (
    <div id="milestone-progress" className="space-y-6">
      {/* Top Banner & Dynamic Metric Card */}
      <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              Lộ Trình Chuẩn Từ Con Số 0 Đến Data Engineer
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              Lộ Trình Chi Tiết: Data Analyst → Data Engineer
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
              Đi theo đúng thứ tự 12 bước, không nhảy cóc. ~6-8 tháng sở hữu công việc Data Analyst đầu tiên, sau đó ~6-12 tháng vừa làm vừa học để nâng cấp lên Data Engineer.
            </p>
          </div>
          <div className="md:col-span-4 bg-slate-800/80 p-4 rounded-xl border border-slate-700/50">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Tiến độ thực hành Lộ trình:</span>
              <span className="font-mono font-bold text-indigo-400">
                {checkedPhaseCheckpoints}/{totalPhaseCheckpoints} Mốc ({detailedRoadmapPercent}%)
              </span>
            </div>
            <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${detailedRoadmapPercent}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3 text-center text-xs">
              <div className="bg-slate-900/60 p-2 rounded-lg">
                <span className="block text-[10px] text-slate-400">Số Giai Đoạn</span>
                <span className="font-mono font-bold text-slate-200">12 Bước</span>
              </div>
              <div className="bg-slate-900/60 p-2 rounded-lg">
                <span className="block text-[10px] text-slate-400">Mục Tiêu Việc Làm</span>
                <span className="font-mono font-bold text-indigo-300">DA & DE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex flex-wrap border-b border-slate-200 dark:border-slate-800 gap-1">
        <button
          id="btn-tab-da-de-roadmap"
          onClick={() => setActiveTab("da-de-roadmap")}
          className={`px-4 py-3 font-semibold text-xs sm:text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === "da-de-roadmap"
              ? "border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300"
          }`}
        >
          <Compass className="w-4 h-4" />
          Lộ Trình 12 Bước (Zero → DA → DE)
        </button>
        <button
          id="btn-tab-overview-table"
          onClick={() => setActiveTab("overview-table")}
          className={`px-4 py-3 font-semibold text-xs sm:text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === "overview-table"
              ? "border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300"
          }`}
        >
          <TableIcon className="w-4 h-4" />
          Bảng Tổng Quan Nhìn Nhanh
        </button>
        <button
          id="btn-tab-stages"
          onClick={() => setActiveTab("stages")}
          className={`px-4 py-3 font-semibold text-xs sm:text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === "stages"
              ? "border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300"
          }`}
        >
          <Layers className="w-4 h-4" />
          Phân Bổ Theo Năm Học
        </button>
        <button
          id="btn-tab-ages"
          onClick={() => setActiveTab("ages")}
          className={`px-4 py-3 font-semibold text-xs sm:text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === "ages"
              ? "border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300"
          }`}
        >
          <UserCheck className="w-4 h-4" />
          Mục Tiêu Độ Tuổi (19-25)
        </button>
        <button
          id="btn-tab-de-resources"
          onClick={() => setActiveTab("de-resources")}
          className={`px-4 py-3 font-semibold text-xs sm:text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === "de-resources"
              ? "border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300"
          }`}
        >
          <Library className="w-4 h-4" />
          Tài Nguyên DE & Sách Kinh Điển
        </button>
        <button
          id="btn-tab-modern-trends"
          onClick={() => setActiveTab("modern-trends")}
          className={`px-4 py-3 font-semibold text-xs sm:text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === "modern-trends"
              ? "border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300"
          }`}
        >
          <Flame className="w-4 h-4 text-amber-500" />
          Xu Hướng AI & Modern Data Stack
        </button>
        <button
          id="btn-tab-tips"
          onClick={() => setActiveTab("tips")}
          className={`px-4 py-3 font-semibold text-xs sm:text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === "tips"
              ? "border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300"
          }`}
        >
          <Users className="w-4 h-4" />
          Cộng Đồng, AI & Sai Lầm
        </button>

      </div>

      {/* TAB 1: 12-STEP DETAILED ROADMAP */}
      {activeTab === "da-de-roadmap" && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 items-center bg-white p-3 rounded-xl border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-2">Lọc nhóm:</span>
            {["All", "Preparation", "Data Analyst Foundations", "DA Portfolio & Career", "Data Engineer Transition"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Phase List Sidebar */}
            <div className="lg:col-span-4 space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
              {filteredPhases.map((phase) => {
                const isSelected = phase.id === selectedPhaseId;
                const totalCp = phase.checkpoints.length;
                const doneCp = phase.checkpoints.filter((_, idx) => completedCheckpoints[`${phase.id}-cp-${idx}`]).length;
                const phasePercent = Math.round((doneCp / totalCp) * 100) || 0;

                return (
                  <button
                    key={phase.id}
                    onClick={() => setSelectedPhaseId(phase.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-2 cursor-pointer ${
                      isSelected
                        ? "bg-white border-indigo-500 dark:bg-slate-900 shadow-sm ring-1 ring-indigo-500/20"
                        : "bg-slate-50 border-slate-100 hover:bg-slate-100 dark:bg-slate-900/40 dark:border-slate-800/80 dark:hover:bg-slate-900"
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded">
                        Bước {phase.phaseNum}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {phase.timeframe}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm line-clamp-1">
                      {phase.title}
                    </h3>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {phase.goal}
                    </p>

                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div
                        className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${phasePercent}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Phase Main Content */}
            <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800 space-y-6">
              {/* Header */}
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white px-2.5 py-1 rounded-md">
                    Bước {activePhase.phaseNum}
                  </span>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-2.5 py-1 rounded-md">
                    Thời gian: {activePhase.timeframe}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {activePhase.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-xs">
                  <div className="bg-indigo-50/60 dark:bg-indigo-950/30 p-3 rounded-lg border-l-3 border-indigo-500">
                    <span className="font-bold text-indigo-900 dark:text-indigo-300 block mb-0.5">🎯 Mục tiêu chính:</span>
                    <span className="text-slate-700 dark:text-slate-300">{activePhase.goal}</span>
                  </div>
                  <div className="bg-emerald-50/60 dark:bg-emerald-950/30 p-3 rounded-lg border-l-3 border-emerald-500">
                    <span className="font-bold text-emerald-900 dark:text-emerald-300 block mb-0.5">🏆 Kết quả đạt được:</span>
                    <span className="text-slate-700 dark:text-slate-300">{activePhase.outcome}</span>
                  </div>
                </div>
              </div>

              {/* Weekly Steps Breakdown */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Nội Dung & Lộ Trình Theo Tuần
                </h4>
                <div className="space-y-2.5">
                  {activePhase.weeklySteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1.5"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                          {step.period}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {step.platforms.map((pf) => (
                            <span key={pf} className="text-[10px] font-mono bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-1.5 py-0.5 rounded">
                              {pf}
                            </span>
                          ))}
                        </div>
                      </div>
                      <h5 className="font-semibold text-xs text-slate-900 dark:text-white">
                        {step.topic}
                      </h5>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {step.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkpoints Checklist */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <ListTodo className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Mốc Kiểm Tra Năng Lực (Checkpoints)
                </h4>
                <div className="space-y-2">
                  {activePhase.checkpoints.map((cp, idx) => {
                    const cpKey = `${activePhase.id}-cp-${idx}`;
                    const isDone = !!completedCheckpoints[cpKey];
                    return (
                      <div
                        key={cpKey}
                        onClick={() => toggleCheckpoint(cpKey)}
                        className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          isDone
                            ? "bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800/50"
                            : "bg-white border-slate-200 hover:border-indigo-300 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-indigo-700"
                        }`}
                      >
                        <button
                          className={`w-5 h-5 rounded flex items-center justify-center border transition-all mt-0.5 shrink-0 ${
                            isDone
                              ? "border-emerald-600 bg-emerald-600 text-white"
                              : "border-slate-300 bg-white dark:bg-slate-800"
                          }`}
                        >
                          {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </button>
                        <span className={`text-xs font-medium ${isDone ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-800 dark:text-slate-200"}`}>
                          {cp}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recommended Projects */}
              {activePhase.recommendedProjects.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Star className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    Dự Án Thực Hành Đề Xuất
                  </h4>
                  <div className="bg-amber-50/60 dark:bg-amber-950/20 p-3.5 rounded-xl border border-amber-200/50 dark:border-amber-800/40 text-xs text-slate-700 dark:text-slate-300">
                    <ul className="list-disc pl-4 space-y-1">
                      {activePhase.recommendedProjects.map((proj, idx) => (
                        <li key={idx} className="font-semibold text-amber-900 dark:text-amber-300">
                          {proj}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Free Learning Resources */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Trang Học & Tài Nguyên Miễn Phí Nổi Bật
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activePhase.keyResources.map((res) => (
                    <a
                      key={res.name}
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all group block"
                    >
                      <div className="flex justify-between items-center text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        <span>{res.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                        {res.note}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OVERVIEW TABLE */}
      {activeTab === "overview-table" && (
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TableIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Bảng Tổng Quan Nhìn Nhanh (Lộ Trình DA → DE)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Bảng tóm tắt toàn bộ 12 giai đoạn, thời gian ước tính, mục tiêu và kết quả cốt lõi.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Giai đoạn</th>
                  <th className="p-3">Thời gian</th>
                  <th className="p-3">Mục tiêu chính</th>
                  <th className="p-3">Kết quả đạt được</th>
                  <th className="p-3 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {DA_DE_DETAILED_ROADMAP.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
                      Bước {p.phaseNum}: {p.title.split(" — ")[0].split(":")[0]}
                    </td>
                    <td className="p-3 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {p.timeframe}
                    </td>
                    <td className="p-3 text-slate-800 dark:text-slate-200 font-medium">
                      {p.goal}
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">
                      {p.outcome}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => {
                          setSelectedPhaseId(p.id);
                          setActiveTab("da-de-roadmap");
                        }}
                        className="px-2.5 py-1 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 rounded-md font-semibold hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-colors cursor-pointer"
                      >
                        Chi tiết →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: COLLEGE STAGES Breakdown */}
      {activeTab === "stages" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Stage Sidebar List */}
          <div className="lg:col-span-4 space-y-2">
            {ROADMAP_MILESTONES.map((m) => {
              const isSelected = m.id === selectedMilestoneId;
              const completedCountInStage =
                m.skills.filter((s) => completedSkills[s]).length +
                m.projects.filter((p) => completedProjects[p]).length;
              const totalInStage = m.skills.length + m.projects.length;
              const stagePercent = Math.round((completedCountInStage / totalInStage) * 100) || 0;

              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMilestoneId(m.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-2 cursor-pointer ${
                    isSelected
                      ? "bg-white border-indigo-500 dark:bg-slate-900 shadow-sm"
                      : "bg-slate-50 border-slate-100 hover:bg-slate-100 dark:bg-slate-900/40 dark:border-slate-800/80 dark:hover:bg-slate-900"
                  }`}
                >
                  <div className="flex justify-between items-start w-full">
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {m.subtitle}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                      {m.timeframe}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-1">
                    {m.title.split(": ")[1] || m.title}
                  </h3>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${stagePercent}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Details */}
          <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800 space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 px-2 py-1 rounded">
                  {activeMilestone.timeframe}
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {activeMilestone.subtitle}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-2">
                {activeMilestone.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border-l-4 border-indigo-500">
                <strong>Mục tiêu:</strong> {activeMilestone.goal}
              </p>
            </div>

            {/* Core Skills Checklist */}
            <div>
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <ListTodo className="w-4 h-4 text-indigo-600" />
                Các Kỹ Năng Cốt Lõi Cần Học
              </h4>
              <div className="space-y-2">
                {activeMilestone.skills.map((skill) => {
                  const isChecked = !!completedSkills[skill];
                  return (
                    <div
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`flex items-start gap-3 p-2.5 rounded-lg border border-slate-50 cursor-pointer transition-all ${
                        isChecked
                          ? "bg-slate-50 border-slate-200 dark:bg-slate-800/40 opacity-75"
                          : "bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800"
                      }`}
                    >
                      <button
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all mt-0.5 ${
                          isChecked
                            ? "border-indigo-500 bg-indigo-500 text-white"
                            : "border-slate-300 bg-white dark:bg-slate-800"
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </button>
                      <span className={`text-sm text-slate-800 dark:text-slate-200 ${isChecked ? "line-through text-slate-400 dark:text-slate-500" : ""}`}>
                        {skill}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Focus Projects checklist */}
            <div>
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-indigo-600" />
                Dự Án Portfolio Trọng Tâm
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeMilestone.projects.map((proj) => {
                  const isChecked = !!completedProjects[proj];
                  return (
                    <div
                      key={proj}
                      onClick={() => toggleProject(proj)}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        isChecked
                          ? "bg-slate-50 border-slate-200 dark:bg-slate-800/40 opacity-75"
                          : "bg-white border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800"
                      }`}
                    >
                      <button
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all mt-0.5 ${
                          isChecked
                            ? "border-indigo-500 bg-indigo-500 text-white"
                            : "border-slate-300 bg-white dark:bg-slate-800"
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </button>
                      <span className={`text-xs text-slate-800 dark:text-slate-200 ${isChecked ? "line-through text-slate-400 dark:text-slate-500" : ""}`}>
                        {proj}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Strategic Details */}
            <div>
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">
                Chỉ dẫn thực hiện chiến lược
              </h4>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                {activeMilestone.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AGE MILESTONES */}
      {activeTab === "ages" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Age Selection Sidebar */}
          <div className="lg:col-span-4 grid grid-cols-4 lg:grid-cols-1 gap-2">
            {AGE_MILESTONES.map((a) => {
              const isSelected = a.age === selectedAge;
              return (
                <button
                  key={a.age}
                  onClick={() => setSelectedAge(a.age)}
                  className={`p-3 rounded-xl border text-center lg:text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-indigo-600 text-white border-indigo-500 shadow-sm"
                      : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100 dark:bg-slate-900/40 dark:border-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-900"
                  }`}
                >
                  <div className="font-mono font-bold text-lg">{a.age} Tuổi</div>
                  <span className="hidden lg:block text-xs opacity-80 mt-1 line-clamp-1">{a.goal}</span>
                </button>
              );
            })}
          </div>

          {/* Age Milestone details */}
          <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
            <div>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Mục Tiêu Năm {selectedAge} Tuổi
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {activeAgeMilestone.goal}
              </h3>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-3">
                Checklist thành tựu cần hoàn thành:
              </h4>
              <div className="space-y-3">
                {activeAgeMilestone.subgoals.map((sub, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <ChevronRight className="w-5 h-5 text-indigo-600 mt-0.5 flex-none" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Note of encouragement */}
            <div className="bg-indigo-50/50 p-4 rounded-lg border border-indigo-100/30 dark:bg-indigo-950/10 text-xs text-slate-600 dark:text-slate-400">
              Kiên trì rèn luyện mỗi ngày đúng kỷ luật sẽ giúp bạn trở nên khác biệt so với 95% sinh viên đồng trang lứa.
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: DE RESOURCES & BOOKS */}
      {activeTab === "de-resources" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-5 rounded-xl text-white border border-slate-800 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Library className="w-5 h-5 text-indigo-400" />
                Kho Tài Nguyên Học Tập Data Engineering Miễn Phí & Sách Chuẩn Ngành
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Các khóa học thực hành, tài liệu mở & những cuốn sách kinh điển giúp bạn từ người mới bắt đầu vươn lên trình độ Senior DE.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DE_LEARNING_RESOURCES.map((cat, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      {cat.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {cat.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {cat.resources.map((res) => (
                      <a
                        key={res.name}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all block group"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {res.name}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 shrink-0 mt-0.5" />
                        </div>
                        <div className="flex gap-1.5 mt-2">
                          <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 px-2 py-0.5 rounded">
                            {res.type}
                          </span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            res.level === "Foundational"
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                              : res.level === "Advanced"
                              ? "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                              : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                          }`}>
                            {res.level}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                          {res.note}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: MODERN DATA TRENDS & AI DE */}
      {activeTab === "modern-trends" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 p-5 rounded-xl text-white border border-amber-900/30 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Flame className="w-4 h-4 fill-amber-400" />
                Cập Nhật Xu Hướng Công Nghệ Dữ Liệu Thời Đại AI
              </div>
              <h3 className="text-xl font-bold">
                Modern Data Stack, Lakehouse, Streaming & AI Pipelines
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Những xu hướng công nghệ mới nhất định hình ngành Data Engineering trong năm 2026. Làm chủ những kỹ năng này giúp bạn sở hữu mức lương và lợi thế cạnh tranh áp đảo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MODERN_DATA_TRENDS.map((trend) => (
              <div
                key={trend.id}
                className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-2xs space-y-4 hover:border-amber-400 dark:hover:border-amber-500 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 px-2.5 py-1 rounded-md border border-amber-200/50 dark:border-amber-800/40">
                      {trend.category}
                    </span>
                    {trend.resourceLink && (
                      <a
                        href={trend.resourceLink.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                      >
                        {trend.resourceLink.name}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {trend.topic}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {trend.description}
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 space-y-1.5">
                    <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 block">
                      ⚡ Công nghệ trọng tâm cần làm chủ:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {trend.keyTechnologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded-lg border border-amber-100 dark:border-amber-900/30">
                      <span className="font-bold text-amber-900 dark:text-amber-300 block mb-0.5">💡 Tại sao quan trọng?</span>
                      <span className="text-slate-700 dark:text-slate-300 text-[11px]">{trend.whyImportant}</span>
                    </div>
                    <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-2.5 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
                      <span className="font-bold text-indigo-900 dark:text-indigo-300 block mb-0.5">🚀 Hướng tiếp cận học:</span>
                      <span className="text-slate-700 dark:text-slate-300 text-[11px]">{trend.learningPathNote}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: COMMUNITIES, AI TIPS & MISTAKES */}
      {activeTab === "tips" && (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Communities */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 dark:bg-slate-900 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Cộng Đồng Hỏi Đáp Khuyên Tham Gia
            </h3>
            <div className="space-y-2.5">
              {ROADMAP_COMMUNITIES_AND_MISTAKES.communities.map((c) => (
                <div key={c.name} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{c.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{c.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Tools */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 dark:bg-slate-900 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Ứng Dụng AI Tăng Tốc Học Tập
            </h3>
            <div className="space-y-2.5">
              {ROADMAP_COMMUNITIES_AND_MISTAKES.aiTools.map((ai) => (
                <div key={ai.name} className="p-3 bg-amber-50/40 dark:bg-amber-950/20 rounded-lg border border-amber-100/50 dark:border-amber-900/30">
                  <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300">{ai.name}</h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">{ai.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mistakes to Avoid */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 dark:bg-slate-900 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              Sai Lầm Thường Gặp Cần Tránh
            </h3>
            <div className="space-y-2">
              {ROADMAP_COMMUNITIES_AND_MISTAKES.mistakesToAvoid.map((m, idx) => (
                <div key={idx} className="p-2.5 bg-rose-50/40 dark:bg-rose-950/20 rounded-lg border border-rose-100/50 dark:border-rose-900/30 flex items-start gap-2 text-xs text-rose-900 dark:text-rose-200">
                  <span className="font-bold text-rose-500">✕</span>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
