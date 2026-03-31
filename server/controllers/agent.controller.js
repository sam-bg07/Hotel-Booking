import llm from "../config/groq.confing.js";
import logger from "../config/logger.js";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { DynamicTool } from "@langchain/core/tools";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import Experience from "../models/Experience.js";
import Booking from "../models/Booking.js";

const Agent = async (req, res) => {
  console.log("Agent controller called");
  try {
    const { message, history } = req.body;
    console.log("Received agent request:", { message, history });
    logger.info({ message, history }, "Agent request");

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message is required" });
    }

    const userId = req.user ? req.user._id : "guest";

    const fetchHotelsTool = new DynamicTool({
      name: "fetch_hotels",
      description:
        "Get a list of all available hotels and resorts, including their city, address, and phoneNumber.",
      func: async () => {
        try {
          const hotels = await Hotel.find().limit(10).lean();
          return JSON.stringify(hotels);
        } catch (error) {
          return `Error: ${error.message}`;
        }
      },
    });

    const searchRoomsTool = new DynamicTool({
      name: "search_rooms_by_hotel",
      description:
        "Search for available rooms in a specific hotel. Pass the hotel's exact city or name.",
      func: async (hotelQuery) => {
        try {
          const hotels = await Hotel.find({
            $or: [
              { city: new RegExp(hotelQuery, "i") },
              { hotelName: new RegExp(hotelQuery, "i") },
            ],
          }).lean();

          if (hotels.length === 0)
            return "No hotels found matching this query.";

          const hotelIds = hotels.map((h) => h._id);
          const rooms = await Room.find({
            hotel: { $in: hotelIds },
            isAvailable: true,
          })
            .limit(10)
            .lean();
          return JSON.stringify({ matchHotels: hotels, availableRooms: rooms });
        } catch (error) {
          return `Error: ${error.message}`;
        }
      },
    });

    const fetchExperiencesTool = new DynamicTool({
      name: "fetch_experiences",
      description:
        "Get a list of top experiences, activities, or tour packages.",
      func: async () => {
        try {
          const experiences = await Experience.find().limit(5).lean();
          return JSON.stringify(experiences);
        } catch (error) {
          return `Error: ${error.message}`;
        }
      },
    });

    const checkMyBookingsTool = new DynamicTool({
      name: "check_my_bookings",
      description: "Check the current user's upcoming bookings.",
      func: async () => {
        if (userId === "guest") return "User is not logged in.";
        try {
          const bookings = await Booking.find({ user: userId }).lean();
          return JSON.stringify(
            bookings.length > 0 ? bookings : "No bookings found.",
          );
        } catch (error) {
          return `Error: ${error.message}`;
        }
      },
    });

    const tools = [
      fetchHotelsTool,
      searchRoomsTool,
      fetchExperiencesTool,
      checkMyBookingsTool,
    ];

    const SYSTEM_HINT = `
    You are 'StayStack Concierge', the intelligent AI assistant for a hotel booking app. 
    Always be polite, friendly, and helpful.
    
    IMPORTANT FORMATTING RULES:
    - ALWAYS format your responses in clean, well-structured Markdown.
    - Use headers (##, ###) to organize information.
    - Use bullet points (-) for lists instead of special characters to avoid encoding issues.
    - Important details like prices, hotel names, or exact locations should be **bolded**.
    - If displaying multiple hotels/rooms/experiences, separate them clearly with blank lines.
    - Give a brief introduction sentence before jumping into lists.
    - End with a friendly follow-up question.
    
    TOOL USAGE:
    - Use your tools to find accurate availability, room types, pricing, and experiences.
    - Do NOT hallucinate data. Only rely on information returned by the tools.
    `;

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", SYSTEM_HINT],
      ["placeholder", "{chat_history}"],
      ["human", "{input}"],
      ["placeholder", "{agent_scratchpad}"],
    ]);

    const agent = await createToolCallingAgent({ llm, tools, prompt });
    const executor = new AgentExecutor({ agent, tools });

    const chat_history = (history || [])
      .filter(
        (m) =>
          m &&
          ["user", "assistant"].includes(m.role) &&
          typeof m.content === "string",
      )
      .map((m) =>
        m.role === "user"
          ? new HumanMessage(m.content)
          : new AIMessage(m.content),
      );

    const result = await executor.invoke({
      input: message,
      chat_history: chat_history,
    });

    logger.info({ answer: result.output }, "Agent result");

    return res.status(200).json({ answer: result.output });
  } catch (err) {
    logger.error({ err }, "Agent error");
    return res.status(500).json({ error: err.message });
  }
};

export default Agent;
