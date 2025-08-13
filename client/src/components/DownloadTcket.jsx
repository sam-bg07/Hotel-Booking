import React, { useState, useRef } from "react";
import { Download } from "lucide-react";
import DownloadTcketUi from "./DownloadTcketUi";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

const DownloadTcket = ({ booking }) => {
  const ticketRef = useRef();

  const downloadPdf = async () => {
    const node = ticketRef.current;
    if (!node) return;
    try {
      console.log(node);
      const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 2 });
      const img = new window.Image();

      img.src = dataUrl;

      img.onload = () => {
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [img.width, img.height],
        });

        pdf.addImage(dataUrl, "PNG", 0, 0, img.width, img.height);
        pdf.save(`MyShows-Ticket-${booking._id.replace(/\s+/g, "-")}.pdf`);
      };
    } catch (err) {
      console.error("Failed to generate PDF", err);
    }
  };

  return (
    <main className="mt-3">
      <div key={booking._id} className=" transition-all duration-300">
        <div className="flex items-center justify-between">
          <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
            <div ref={ticketRef}>
              <DownloadTcketUi booking={booking} />
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={downloadPdf}
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 text-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Print Ticket</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DownloadTcket;
