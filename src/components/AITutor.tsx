import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, AlertCircle, HelpCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AITutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Xin chào! Tôi là Trợ Lý Học Tập Elite MIS Data. Tôi nắm rõ toàn bộ Lộ trình 12 Bước từ con số 0 trở thành Data Analyst và Data Engineer. Bạn có thể hỏi tôi về cú pháp SQL (JOIN, CTE, Window Functions), Python Pandas, Power BI DAX, Apache Airflow, Data Modeling (Star Schema), PySpark, hoặc kinh nghiệm xây dựng Portfolio & viết CV!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Giải thích SQL Window Function (ROW_NUMBER, RANK, LAG) & ví dụ",
    "Khác biệt giữa OLTP, OLAP & Data Warehouse là gì?",
    "Modern Data Stack (dbt, Snowflake, BigQuery) hoạt động ra sao?",
    "Vector Database (Milvus/Pinecone) & GenAI Pipeline cho RAG?",
    "Tài nguyên học DE miễn phí tốt nhất (Data Engineering Zoomcamp)?",
    "Apache Airflow DAG & PySpark cơ bản cho Data Engineer?",
  ];


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    setErrorMsg(null);
    const userMessage: Message = { role: "user", content: textToSend };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/tutor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gặp lỗi khi lấy phản hồi từ trợ lý.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(
        error.message ||
          "Không thể kết nối với máy chủ AI. Vui lòng kiểm tra lại cấu hình GEMINI_API_KEY trong tab Settings > Secrets."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ai-tutor" className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[580px]">
      {/* Quick Prompts list side */}
      <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800 space-y-4 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Gợi Ý Câu Hỏi Nhanh</h3>
          </div>
          <p className="text-xs text-slate-500">
            Bấm vào bất kỳ chủ đề nào dưới đây để bắt đầu bài học cùng Elite MIS Data Tutor:
          </p>
          <div className="flex flex-wrap lg:flex-col gap-2">
            {quickPrompts.map((p) => (
              <button
                key={p}
                disabled={isLoading}
                onClick={() => handleSendMessage(p)}
                className="text-left text-xs p-2.5 rounded-lg border border-slate-100 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 dark:border-slate-800 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 transition-all text-slate-700 dark:text-slate-300 font-medium cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-indigo-50/50 p-4 rounded-lg border border-indigo-100/30 dark:bg-indigo-950/10 text-xs text-slate-600 dark:text-slate-400 space-y-1">
          <h4 className="font-bold text-slate-800 dark:text-slate-300 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            Học gì hôm nay?
          </h4>
          <p>
            Bạn có thể hỏi: "Làm sao cấu hình CTE trong SQL", "Viết code C++ nạp chồng toán tử", hoặc "Hướng dẫn clean dữ liệu trùng trong Pandas".
          </p>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="lg:col-span-8 bg-white rounded-xl border border-slate-100 shadow-2xs dark:bg-slate-900 dark:border-slate-800 flex flex-col h-full overflow-hidden">
        {/* Tutor title */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold animate-pulse">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Elite MIS Data Tutor</h3>
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" /> Sẵn sàng trực tuyến
            </span>
          </div>
        </div>

        {/* Message logs */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((m, idx) => {
            const isBot = m.role === "assistant";
            return (
              <div key={idx} className={`flex items-start gap-3 ${isBot ? "" : "flex-row-reverse"}`}>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-none text-white text-xs ${
                    isBot ? "bg-indigo-600" : "bg-slate-800"
                  }`}
                >
                  {isBot ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={`max-w-[85%] p-3.5 rounded-xl text-sm ${
                    isBot
                      ? "bg-slate-50 text-slate-800 border border-slate-100 dark:bg-slate-800/40 dark:text-slate-200 dark:border-slate-800"
                      : "bg-indigo-600 text-white"
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{m.content}</p>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs animate-pulse">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl text-sm dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <div className="flex gap-1.5 items-center">
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-800 text-xs rounded-lg border border-red-100/30 dark:bg-red-950/20 dark:text-red-400 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-none" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input box */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="flex gap-2"
          >
            <input
              id="ai-chat-input"
              type="text"
              disabled={isLoading}
              placeholder="Nhập câu hỏi của bạn về SQL, Python, C++, Power BI, CV..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
            <button
              id="btn-send-chat"
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-all flex items-center justify-center disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
