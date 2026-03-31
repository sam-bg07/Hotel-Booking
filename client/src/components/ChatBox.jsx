import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBot from "./ChatBot";

const ChatBox = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Interface */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(5px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl shadow-2xl w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] flex flex-col border border-gray-100 overflow-hidden mb-4"
          >
            <ChatBot onClose={() => setIsChatOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center text-white transition-all duration-300 cursor-pointer"
      >
        <motion.div
          initial={false}
          animate={{ rotate: isChatOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isChatOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default ChatBox;
