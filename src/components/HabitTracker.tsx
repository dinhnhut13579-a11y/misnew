import React, { useState, useEffect } from "react";
import { Plus, Check, RefreshCw, BarChart2, BookOpen, GitPullRequest, Award, FileSpreadsheet, Activity } from "lucide-react";
import { DEFAULT_WEEKLY_KPIS } from "../data/roadmapData";
import { DailyLog, WeeklyKPI } from "../types";

export default function HabitTracker() {
  const [logs, setLogs] = useState<DailyLog[]>(() => {
    const saved = localStorage.getItem("mis_daily_logs");
    return saved ? JSON.parse(saved) : [];
  });

  const [weeklyKPIs, setWeeklyKPIs] = useState<WeeklyKPI[]>(() => {
    const saved = localStorage.getItem("mis_weekly_kpis");
    return saved ? JSON.parse(saved) : DEFAULT_WEEKLY_KPIS;
  });

  // Today's Form Inputs
  const [cppInput, setCppInput] = useState<number>(0);
  const [sqlInput, setSqlInput] = useState<number>(0);
  const [pythonInput, setPythonInput] = useState<number>(0);
  const [biInput, setBiInput] = useState<number>(0);
  const [englishInput, setEnglishInput] = useState<number>(0); // in minutes
  const [commitsInput, setCommitsInput] = useState<number>(0);
  const [notesInput, setNotesInput] = useState<string>("");

  const todayStr = new Date().toISOString().split("T")[0];

  // Sync today's logged data if it already exists
  useEffect(() => {
    const todaysLog = logs.find((l) => l.date === todayStr);
    if (todaysLog) {
      setCppInput(todaysLog.cppSolved);
      setSqlInput(todaysLog.sqlSolved);
      setPythonInput(todaysLog.pythonNotebooks);
      setBiInput(todaysLog.dashboardsCreated);
      setEnglishInput(todaysLog.englishMinutes);
      setCommitsInput(todaysLog.githubCommits);
      setNotesInput(todaysLog.notes || "");
    }
  }, [logs, todayStr]);

  // Recalculate KPIs based on the past 7 days of logs
  useEffect(() => {
    const last7DaysLogs = logs.filter((log) => {
      const logDate = new Date(log.date);
      const diffTime = Math.abs(new Date().getTime() - logDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    });

    const sumCpp = last7DaysLogs.reduce((acc, l) => acc + l.cppSolved, 0);
    const sumSql = last7DaysLogs.reduce((acc, l) => acc + l.sqlSolved, 0);
    const sumPython = last7DaysLogs.reduce((acc, l) => acc + l.pythonNotebooks, 0);
    const sumBi = last7DaysLogs.reduce((acc, l) => acc + l.dashboardsCreated, 0);
    const sumCommits = last7DaysLogs.reduce((acc, l) => acc + l.githubCommits, 0);
    const sumEnglishHours = Math.round(last7DaysLogs.reduce((acc, l) => acc + l.englishMinutes, 0) / 60) || 0;

    const updatedKPIs = weeklyKPIs.map((kpi) => {
      switch (kpi.id) {
        case "kpi-cpp":
          return { ...kpi, current: sumCpp };
        case "kpi-sql":
          return { ...kpi, current: sumSql };
        case "kpi-python":
          return { ...kpi, current: sumPython };
        case "kpi-powerbi":
          return { ...kpi, current: sumBi };
        case "kpi-github":
          return { ...kpi, current: sumCommits };
        case "kpi-english":
          return { ...kpi, current: sumEnglishHours };
        default:
          return kpi;
      }
    });

    // Check if the KPI values actually changed to avoid infinite loop
    const hasChanges = JSON.stringify(updatedKPIs) !== JSON.stringify(weeklyKPIs);
    if (hasChanges) {
      setWeeklyKPIs(updatedKPIs);
      localStorage.setItem("mis_weekly_kpis", JSON.stringify(updatedKPIs));
    }
  }, [logs]);

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();

    const newLog: DailyLog = {
      date: todayStr,
      cppSolved: cppInput,
      sqlSolved: sqlInput,
      pythonNotebooks: pythonInput,
      dashboardsCreated: biInput,
      englishMinutes: englishInput,
      githubCommits: commitsInput,
      notes: notesInput.trim(),
    };

    const existingIndex = logs.findIndex((l) => l.date === todayStr);
    let updatedLogs = [...logs];

    if (existingIndex >= 0) {
      updatedLogs[existingIndex] = newLog;
    } else {
      updatedLogs = [newLog, ...updatedLogs];
    }

    setLogs(updatedLogs);
    localStorage.setItem("mis_daily_logs", JSON.stringify(updatedLogs));
    alert("Đã lưu nhật ký rèn luyện hôm nay thành công!");
  };

  const handleResetWeeklyProgress = () => {
    if (window.confirm("Bạn có muốn đặt lại mục tiêu KPI tuần về 0 không? (Nhật ký cũ vẫn được giữ nguyên)")) {
      const resetKPIs = weeklyKPIs.map((kpi) => ({ ...kpi, current: 0 }));
      setWeeklyKPIs(resetKPIs);
      localStorage.setItem("mis_weekly_kpis", JSON.stringify(resetKPIs));
    }
  };

  return (
    <div id="habit-tracker" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* KPI Status panel */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800 space-y-5">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Tiến Độ Mục Tiêu Tuần (Last 7 Days)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Tự động tổng hợp thành tích thực tế từ nhật ký rèn luyện hàng ngày của bạn.
              </p>
            </div>
            <button
              onClick={handleResetWeeklyProgress}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
              title="Đặt lại tiến trình"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {weeklyKPIs.map((kpi) => {
              const percentage = Math.min(Math.round((kpi.current / kpi.target) * 100), 100);
              const isTargetMet = kpi.current >= kpi.target;

              return (
                <div key={kpi.id} className="space-y-1.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      {isTargetMet ? (
                        <Check className="w-4 h-4 text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 rounded-full p-0.5" />
                      ) : (
                        <Activity className="w-4 h-4 text-slate-400" />
                      )}
                      {kpi.name}
                    </span>
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                      <strong className={isTargetMet ? "text-indigo-600 dark:text-indigo-400" : "text-slate-800 dark:text-slate-200"}>
                        {kpi.current}
                      </strong>{" "}
                      / {kpi.target} {kpi.unit}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isTargetMet ? "bg-indigo-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* History Log Table */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Lịch sử rèn luyện</h3>
          {logs.length === 0 ? (
            <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-sm">
              Chưa có dữ liệu nhật ký. Hãy điền form bên phải để bắt đầu ghi dấu mốc rèn luyện!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500">
                    <th className="py-2.5">Ngày</th>
                    <th className="py-2.5">C++</th>
                    <th className="py-2.5">SQL</th>
                    <th className="py-2.5">Python</th>
                    <th className="py-2.5">P.BI</th>
                    <th className="py-2.5">Eng</th>
                    <th className="py-2.5">Git</th>
                    <th className="py-2.5 max-w-xs truncate">Ghi chú</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50 text-slate-700 dark:text-slate-300">
                  {logs.slice(0, 7).map((log) => (
                    <tr key={log.date} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                      <td className="py-2.5 font-mono font-medium">{log.date}</td>
                      <td className="py-2.5 text-indigo-600 dark:text-indigo-400 font-semibold">{log.cppSolved}</td>
                      <td className="py-2.5 text-blue-600 dark:text-blue-400 font-semibold">{log.sqlSolved}</td>
                      <td className="py-2.5 text-purple-600 dark:text-purple-400 font-semibold">{log.pythonNotebooks}</td>
                      <td className="py-2.5 text-pink-600 dark:text-pink-400 font-semibold">{log.dashboardsCreated}</td>
                      <td className="py-2.5 font-mono">{log.englishMinutes}m</td>
                      <td className="py-2.5 text-slate-600 dark:text-slate-400 font-mono">{log.githubCommits}</td>
                      <td className="py-2.5 max-w-xs truncate" title={log.notes}>
                        {log.notes || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {logs.length > 7 && (
                <p className="text-[11px] text-slate-400 text-right mt-2">Đang hiển thị 7 ngày ghi chép gần nhất</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Form Log today's work */}
      <div className="lg:col-span-5">
        <form
          onSubmit={handleSaveLog}
          className="bg-white p-6 rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800 space-y-4"
        >
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Ghi Nhận Thành Tích Hôm Nay
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Ngày ghi nhận: <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">{todayStr}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                C++ Đã Giải (bài)
              </label>
              <input
                id="input-cpp"
                type="number"
                min="0"
                value={cppInput}
                onChange={(e) => setCppInput(parseInt(e.target.value) || 0)}
                className="w-full text-sm p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                SQL Đã Giải (bài)
              </label>
              <input
                id="input-sql"
                type="number"
                min="0"
                value={sqlInput}
                onChange={(e) => setSqlInput(parseInt(e.target.value) || 0)}
                className="w-full text-sm p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                Python Notebook (bài)
              </label>
              <input
                id="input-python"
                type="number"
                min="0"
                value={pythonInput}
                onChange={(e) => setPythonInput(parseInt(e.target.value) || 0)}
                className="w-full text-sm p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                Power BI Dashboard (bộ)
              </label>
              <input
                id="input-bi"
                type="number"
                min="0"
                value={biInput}
                onChange={(e) => setBiInput(parseInt(e.target.value) || 0)}
                className="w-full text-sm p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                Tiếng Anh (phút)
              </label>
              <input
                id="input-english"
                type="number"
                min="0"
                value={englishInput}
                onChange={(e) => setEnglishInput(parseInt(e.target.value) || 0)}
                className="w-full text-sm p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                GitHub Commits (lần)
              </label>
              <input
                id="input-commits"
                type="number"
                min="0"
                value={commitsInput}
                onChange={(e) => setCommitsInput(parseInt(e.target.value) || 0)}
                className="w-full text-sm p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
              Nhật Ký Học Tập / Ghi Chú Kỹ Thuật
            </label>
            <textarea
              id="input-notes"
              rows={3}
              placeholder="VD: Đã làm sạch tập dữ liệu Starbucks và viết được 3 câu CTE phức tạp..."
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white resize-none"
            />
          </div>

          <button
            id="btn-save-log"
            type="submit"
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm shadow-sm transition-all duration-150 flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            Lưu Nhật Ký Ngày Hôm Nay
          </button>
        </form>
      </div>
    </div>
  );
}
