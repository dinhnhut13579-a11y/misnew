import React, { useState } from "react";
import { Plus, Trash, ExternalLink, GraduationCap, Award, CheckCircle, Clock, BookOpen } from "lucide-react";
import { MOCK_PROJECTS } from "../data/roadmapData";
import { PortfolioProject, Certificate } from "../types";

export default function PortfolioTracker() {
  const [projects, setProjects] = useState<PortfolioProject[]>(() => {
    const saved = localStorage.getItem("mis_projects");
    return saved ? JSON.parse(saved) : MOCK_PROJECTS;
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem("mis_certs");
    if (saved) return JSON.parse(saved);
    return [
      { id: "cert-1", name: "Google Data Analytics Professional Certificate", issuer: "Coursera / Google", status: "In Progress" },
      { id: "cert-2", name: "Microsoft Certified: Power BI Data Analyst Associate (PL-300)", issuer: "Microsoft", status: "Planned" },
      { id: "cert-3", name: "HackerRank SQL (Advanced) Certificate", issuer: "HackerRank", status: "Planned" },
    ];
  });

  const [semesters, setSemesters] = useState<Array<{ id: string; name: string; gpa: number }>>(() => {
    const saved = localStorage.getItem("mis_gpa_semesters");
    if (saved) return JSON.parse(saved);
    return [
      { id: "sem-1", name: "Học kỳ 1 - Năm 1", gpa: 3.2 },
      { id: "sem-2", name: "Học kỳ 2 - Năm 1", gpa: 3.4 },
    ];
  });

  // Project Form inputs
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<PortfolioProject["category"]>("SQL");
  const [newDesc, setNewDesc] = useState("");
  const [newTech, setNewTech] = useState("");
  const [newGithub, setNewGithub] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // GPA Form inputs
  const [newSemName, setNewSemName] = useState("");
  const [newSemGpa, setNewSemGpa] = useState<number>(3.5);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProj: PortfolioProject = {
      id: "proj-" + Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      description: newDesc.trim(),
      status: "Planning",
      techStack: newTech.split(",").map((s) => s.trim()).filter(Boolean),
      githubUrl: newGithub.trim() || undefined,
    };

    const updated = [...projects, newProj];
    setProjects(updated);
    localStorage.setItem("mis_projects", JSON.stringify(updated));

    // Clear inputs
    setNewTitle("");
    setNewDesc("");
    setNewTech("");
    setNewGithub("");
    setShowAddForm(false);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dự án này?")) {
      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
      localStorage.setItem("mis_projects", JSON.stringify(updated));
    }
  };

  const handleToggleProjectStatus = (id: string) => {
    const updated = projects.map((p) => {
      if (p.id === id) {
        let nextStatus: PortfolioProject["status"] = "Planning";
        if (p.status === "Planning") nextStatus = "In Progress";
        else if (p.status === "In Progress") nextStatus = "Completed";
        return { ...p, status: nextStatus };
      }
      return p;
    });
    setProjects(updated);
    localStorage.setItem("mis_projects", JSON.stringify(updated));
  };

  const handleToggleCertStatus = (id: string) => {
    const updated = certificates.map((c) => {
      if (c.id === id) {
        let nextStatus: Certificate["status"] = "Planned";
        if (c.status === "Planned") nextStatus = "In Progress";
        else if (c.status === "In Progress") nextStatus = "Earned";
        return { ...c, status: nextStatus };
      }
      return c;
    });
    setCertificates(updated);
    localStorage.setItem("mis_certs", JSON.stringify(updated));
  };

  const handleAddSemester = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSemName.trim()) return;

    const newSem = {
      id: "sem-" + Date.now(),
      name: newSemName.trim(),
      gpa: Number(newSemGpa),
    };

    const updated = [...semesters, newSem];
    setSemesters(updated);
    localStorage.setItem("mis_gpa_semesters", JSON.stringify(updated));
    setNewSemName("");
  };

  const handleDeleteSemester = (id: string) => {
    const updated = semesters.filter((s) => s.id !== id);
    setSemesters(updated);
    localStorage.setItem("mis_gpa_semesters", JSON.stringify(updated));
  };

  // GPA calculation
  const overallGPA = semesters.length
    ? Number((semesters.reduce((acc, s) => acc + s.gpa, 0) / semesters.length).toFixed(2))
    : 0;

  return (
    <div id="portfolio-tracker" className="space-y-6">
      {/* GPA & Certifications Overview row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* GPA Tracker card */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Theo Dõi Điểm Học Tập GPA (Target ≥ 3.5)
            </h3>
            <div className="bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1 rounded-full text-indigo-700 dark:text-indigo-400 font-mono font-bold text-sm">
              GPA tích lũy: {overallGPA} / 4.0
            </div>
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {semesters.map((sem) => (
              <div
                key={sem.id}
                className="flex justify-between items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-700 dark:text-slate-300"
              >
                <span className="font-medium">{sem.name}</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{sem.gpa}</span>
                  <button
                    onClick={() => handleDeleteSemester(sem.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Semester form */}
          <form onSubmit={handleAddSemester} className="flex gap-2 items-end border-t border-slate-100 dark:border-slate-800 pt-3">
            <div className="flex-1 space-y-1">
              <input
                type="text"
                placeholder="Tên học kỳ (VD: HK1 - Năm 2)"
                required
                value={newSemName}
                onChange={(e) => setNewSemName(e.target.value)}
                className="w-full text-xs p-2 rounded border border-slate-200 bg-slate-50 focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />
            </div>
            <div className="w-20 space-y-1">
              <input
                type="number"
                step="0.1"
                min="0"
                max="4"
                required
                value={newSemGpa}
                onChange={(e) => setNewSemGpa(parseFloat(e.target.value) || 0)}
                className="w-full text-xs p-2 rounded border border-slate-200 bg-slate-50 focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-white font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-3 py-2 bg-indigo-600 text-white rounded text-xs font-semibold hover:bg-indigo-700 transition-all"
            >
              Thêm
            </button>
          </form>
        </div>

        {/* Certifications card */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Chứng Chỉ Nghề Nghiệp Mục Tiêu
          </h3>

          <div className="space-y-3">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => handleToggleCertStatus(cert.id)}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-all"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{cert.name}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{cert.issuer}</p>
                </div>

                <div className="flex-none">
                  {cert.status === "Earned" ? (
                    <span className="text-[10px] font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Đã Đạt
                    </span>
                  ) : cert.status === "In Progress" ? (
                    <span className="text-[10px] font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3 animate-pulse" /> Đang Học
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 px-2 py-0.5 rounded-full">
                      Kế Hoạch
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Target Projects List (Target: 15-20 Projects) */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              GitHub Portfolio Projects ({projects.length} / 15-20)
            </h3>
            <p className="text-xs text-slate-500">
              Thiết lập ít nhất 15 dự án thực chiến đa dạng để lọt vào tầm ngắm của các Headhunter.
            </p>
          </div>
          <button
            id="btn-show-add-proj"
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            Thêm Dự Án
          </button>
        </div>

        {/* Add Project Form Drawer */}
        {showAddForm && (
          <form
            onSubmit={handleAddProject}
            className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Tên Dự Án</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Phân Tích Dữ Liệu World Cup"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs p-2 rounded border bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Phân Loại</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as PortfolioProject["category"])}
                  className="w-full text-xs p-2 rounded border bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                >
                  <option value="C++">C++</option>
                  <option value="SQL">SQL</option>
                  <option value="Python">Python</option>
                  <option value="Power BI">Power BI</option>
                  <option value="ETL/Warehouse">ETL / Data Warehouse</option>
                  <option value="Machine Learning">Machine Learning</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Mô tả ngắn</label>
              <textarea
                rows={2}
                placeholder="VD: Xử lý và làm sạch 10 triệu dòng dữ liệu bán lẻ của siêu thị bằng pandas, phân khúc khách hàng..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full text-xs p-2 rounded border bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Tech Stack (Cách nhau bằng dấu phẩy)</label>
                <input
                  type="text"
                  placeholder="Python, Pandas, K-means, Jupyter"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  className="w-full text-xs p-2 rounded border bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">GitHub Link (Tùy chọn)</label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={newGithub}
                  onChange={(e) => setNewGithub(e.target.value)}
                  className="w-full text-xs p-2 rounded border bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-all"
            >
              Lưu Dự Án Vào Danh Mục Portfolio
            </button>
          </form>
        )}

        {/* Project cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:shadow-xs hover:border-slate-200 dark:hover:border-slate-700 transition-all space-y-3 bg-white dark:bg-slate-900"
            >
              <div className="flex justify-between items-start gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 px-2 py-0.5 rounded">
                    {proj.category}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-1.5">{proj.title}</h4>
                </div>
                <button
                  onClick={() => handleDeleteProject(proj.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors p-1"
                >
                  <Trash className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{proj.description}</p>

              {/* Tech stack badges */}
              <div className="flex flex-wrap gap-1.5">
                {proj.techStack.map((tech) => (
                  <span key={tech} className="text-[10px] font-mono text-slate-500 bg-slate-50 dark:bg-slate-800 dark:text-slate-400 px-1.5 py-0.5 rounded">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Control buttons */}
              <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-800/50 pt-2.5 text-xs">
                <button
                  onClick={() => handleToggleProjectStatus(proj.id)}
                  className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-sm ${
                    proj.status === "Completed"
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400"
                      : proj.status === "In Progress"
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  Trạng thái: {proj.status}
                </button>

                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    GitHub <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
