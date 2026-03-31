import { useRef, useEffect, useState } from "react";
import { Send, Bot, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import axios from "axios";
import { UseAppContext } from "../context/AppContext";

export default function ChatBot({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const messagesEndRef = useRef(null);
  const {} = UseAppContext();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!hasInitialized && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content:
            "Hi! I'm your StayStack assistant. I can help you:\n\n- Find the perfect hotel\n- Get room details and amenities\n- Check your bookings\n- Discover popular destinations\n- Find local experiences\n\nHow can I help you plan your stay today?",
        },
      ]);
      setHasInitialized(true);
    }
  }, [hasInitialized, messages.length]);

  const quickSuggestions = [
    { label: "🏨 Popular hotels", value: "Show me popular hotels" },
    {
      label: "🏖️ Beach resorts",
      value: "Suggest beachfront resorts for my vacation",
    },
    { label: "📅 My bookings", value: "What are my upcoming bookings?" },
    {
      label: "🌟 Top experiences",
      value: "What are some highly rated experiences?",
    },
  ];

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = {
      id: Date.now() + "-user",
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Send the last 6 messages as context (excluding the very latest user message which is 'input')
      const history = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await axios.post("/api/agent", {
        message: input,
        history,
      });

      const data = response.data;
      console.log("API response:", data);
      const assistantMessage = {
        id: Date.now() + "-assistant",
        role: "assistant",
        content: data.answer || "Sorry, I couldn't get a response.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("API error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + "-assistant",
          role: "assistant",
          content: "Sorry, I'm having trouble connecting. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSuggestion = (value) => {
    setInput(value);
  };

  const getCurrentTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm z-10 relative">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 leading-tight">
              StayStack Concierge
            </h3>
            <p className="text-xs text-blue-600 font-medium">
              🤖 AI-powered travel partner
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-900 hover:bg-gray-100 h-8 w-8 p-0 flex items-center justify-center hover:cursor-pointer transition-colors bg-transparent border border-transparent rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50">
        {messages.map((message, index) => (
          <div
            key={message.id || index}
            className="animate-in slide-in-from-bottom-2 fade-in duration-300"
          >
            {message.role === "assistant" && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-gray-100 max-w-[90%] md:max-w-[85%] transition-all">
                    <div className="text-sm text-gray-800 whitespace-pre-line">
                      <div className="flex flex-wrap gap-1 text-gray-300">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw]}
                          components={{
                            h1: ({ node, ...props }) => (
                              <h1
                                className="text-2xl font-bold mt-6 mb-4 text-black"
                                {...props}
                              />
                            ),
                            h2: ({ node, ...props }) => (
                              <h2
                                className="text-xl font-semibold mt-4 mb-3 text-black"
                                {...props}
                              />
                            ),
                            h3: ({ node, ...props }) => (
                              <h3
                                className="text-lg font-medium mt-3 mb-2 text-black"
                                {...props}
                              />
                            ),
                            p: ({ node, ...props }) => {
                              // Avoid wrapping <pre> inside <p>
                              if (
                                node.children &&
                                node.children.length === 1 &&
                                node.children[0].tagName === "pre"
                              ) {
                                return <>{props.children}</>;
                              }
                              return (
                                <p
                                  className="text-base text-gray-900 my-2 leading-relaxed"
                                  {...props}
                                />
                              );
                            },
                            ul: ({ node, ...props }) => (
                              <ul
                                className="list-disc pl-6 text-gray-300 my-2"
                                {...props}
                              />
                            ),
                            li: ({ node, ...props }) => (
                              <li
                                className="mb-1 leading-relaxed text-black"
                                {...props}
                              />
                            ),
                            // strong: ({ node, ...props }) => (
                            //   <strong
                            //     className="font-semibold text-white"
                            //     {...props}
                            //   />
                            // ),
                            em: ({ node, ...props }) => (
                              <em className="italic text-gray-950" {...props} />
                            ),
                            code: ({
                              node,
                              inline,
                              className,
                              children,
                              ...props
                            }) => {
                              return inline ? (
                                <code
                                  className="bg-zinc-700 px-1 py-0.5 rounded text-orange-300 font-mono text-sm"
                                  {...props}
                                >
                                  {children}
                                </code>
                              ) : (
                                <pre className="bg-zinc-900 p-4 my-4 rounded-lg overflow-auto text-sm">
                                  <code
                                    className="text-orange-50 font-mono"
                                    {...props}
                                  >
                                    {children}
                                  </code>
                                </pre>
                              );
                            },
                            blockquote: ({ node, ...props }) => (
                              <blockquote
                                className="border-l-4 border-zinc-950 pl-4 italic text-gray-400 my-4"
                                {...props}
                              />
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1 ml-1">
                    {getCurrentTime()}
                  </div>
                </div>
              </div>
            )}

            {message.role === "user" && (
              <div className="flex items-start space-x-3 justify-end">
                <div className="flex-1 flex justify-end">
                  <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none p-3 shadow-md max-w-[90%] md:max-w-[85%] font-medium">
                    <div className="text-sm">{message.content}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start space-x-3 animate-pulse">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-gray-100 flex items-center h-[42px]">
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"
                  style={{ animationDelay: "0.15s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {messages.length <= 1 && (
        <div className="px-5 py-3 bg-white border-t border-gray-100 relative shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
          <div className="flex flex-wrap gap-2">
            {quickSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleQuickSuggestion(suggestion.value)}
                className="text-xs bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 hover:text-blue-700 text-slate-700 h-8 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium whitespace-nowrap text-left"
                disabled={isLoading}
              >
                {suggestion.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100 relative">
        <form
          onSubmit={handleSubmit}
          className="flex space-x-2 bg-slate-50 border border-slate-200 rounded-full p-1 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all shadow-inner"
        >
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about hotels, rooms, or your bookings..."
            className="flex-1 bg-transparent px-4 py-2 text-slate-900 placeholder-slate-500 text-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white h-10 w-10 aspect-square rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-md group"
          >
            <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}
