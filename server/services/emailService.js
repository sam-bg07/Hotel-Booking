import transporter from "../config/nodeMailer.js";
import logger from "../config/logger.js";

export const dispatchBookingEmail = async (
  user,
  booking,
  roomData1,
  totalAmount,
  checkIn,
  checkOut,
) => {
  Promise.resolve().then(async () => {
    try {
      const mailOptions = {
        from: "samarthgabani2005@gmail.com",
        to: user.email,
        subject: "Booking Confirmation - StayStack",
        html: `
          <h1>Booking Confirmation</h1>
          <p>Dear ${user.firstName} ${user.lastName},</p>
          <p>Your booking has been confirmed!</p>
          <ul>
            <li><strong>Booking ID:</strong> ${booking._id}</li>
            <li><strong>Hotel:</strong> ${roomData1?.hotel?.hotelName || "Hotel Name"}</li>
            <li><strong>Location:</strong> ${roomData1?.hotel?.address || "Hotel Address"}</li>
            <li><strong>Check-in Date:</strong> ${new Date(checkIn).toDateString()}</li>
            <li><strong>Check-out Date:</strong> ${new Date(checkOut).toDateString()}</li>
            <li><strong>Amount:</strong> $${totalAmount}</li>
          </ul>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      logger.info(`Email successfully dispatched in background `);
    } catch (error) {
      logger.error(`Background Email Task Failed: ${error.message}`);
    }
  });
};
