export interface Milestone {
  id: string;
  title: string;
  subtitle: string;
  timeframe: string;
  goal: string;
  details: string[];
  skills: string[];
  projects: string[];
}

export interface AgeGoal {
  age: number;
  goal: string;
  subgoals: string[];
}

export interface TimeBlock {
  id: string;
  time: string;
  activity: string;
  objective: string;
  category: "work" | "study" | "life" | "rest" | "project";
}

export interface WeeklyKPI {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: "C++" | "SQL" | "Python" | "Power BI" | "ETL/Warehouse" | "Machine Learning";
  description: string;
  status: "Planning" | "In Progress" | "Completed";
  githubUrl?: string;
  techStack: string[];
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  status: "Planned" | "In Progress" | "Earned";
  earnedDate?: string;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  cppSolved: number;
  sqlSolved: number;
  pythonNotebooks: number;
  dashboardsCreated: number;
  englishMinutes: number;
  githubCommits: number;
  notes?: string;
}

export interface DADEPhase {
  id: string;
  phaseNum: string;
  title: string;
  category: "Preparation" | "Data Analyst Foundations" | "DA Portfolio & Career" | "Data Engineer Transition";
  timeframe: string;
  goal: string;
  outcome: string;
  weeklySteps: {
    period: string;
    topic: string;
    platforms: string[];
    details: string;
  }[];
  checkpoints: string[];
  recommendedProjects: string[];
  keyResources: { name: string; url: string; note: string }[];
}

export interface DEResourceCategory {
  title: string;
  description: string;
  resources: {
    name: string;
    url: string;
    type: "Free Course" | "Book" | "YouTube" | "Docs" | "Community" | "Certification";
    level: "Foundational" | "Advanced" | "Modern Trend";
    note: string;
  }[];
}

export interface ModernDataTrend {
  id: string;
  topic: string;
  category: "Modern Data Stack" | "Lakehouse & Open Table" | "Real-time Streaming" | "AI & GenAI Pipelines" | "Data Governance & Quality";
  description: string;
  keyTechnologies: string[];
  whyImportant: string;
  learningPathNote: string;
  resourceLink?: { name: string; url: string };
}

