const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendBookingEmail = async (userEmail, userName, eventName) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Booking Confirmation",
      html: `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                <h2 style="color: #333;">Booking Confirmation</h2>
                <p style="color: #666;">Dear ${userName},</p>
                <p style="color: #666;">Your booking for ${eventName} has been confirmed.</p>
                <p style="color: #666;">Thank you for choosing our service!</p>
            </div>
        `,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Booking confirmation email sent to ${userEmail}`);
  } catch (error) {
    console.error(
      `Error sending booking confirmation email to ${userEmail}:`,
      error,
    );
  }
};

exports.sendOTPEmail = async (email, otp, type) => {
  try {
    const title =
      type === "account_verification"
        ? "Account Verification OTP"
        : "Event Booking OTP";
    const msg =
      type === "account_verification"
        ? `Your OTP for account verification is ${otp}. It will expire in 5 minutes.`
        : `Your OTP for event booking is ${otp}. It will expire in 5 minutes.`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: title,
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <h2 style="color: #333;">${title}</h2>
            <p style="color: #666;">${msg}</p>
            <div style="font-size: 24px; font-weight: bold; color: #007BFF; margin-top: 20px;">${otp}</div>
            <p style="color: #999; font-size: 12px; margin-top: 20px;">If you did not request this OTP, please ignore this email.</p>
        </div>
        `,
    };
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email} for ${type}`);
  } catch (error) {
    console.error(`Error sending OTP email to ${email} for ${type}:`, error);
  }
};
