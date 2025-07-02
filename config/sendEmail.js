import { Resend } from 'resend';
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.RESEND_API){
    console.log("Provide RESEND_API in side the .env file")
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: sendTo,
    //  to: ["agnihotrisakshi256@gmail.com", "sakshiagnihori292@gmail.com","bulbulwork256@gmail.com"], // ✔ sends to both

      subject,
      html,
    });

    if (error) {
      throw new Error(error.message || "Resend email error");
    }

    return data;
  } catch (error) {
    console.error("sendEmail failed:", error);
    throw error; // 🚨 This is what will let your controller’s try-catch actually catch the failure
  }
};


export default sendEmail




























// import { Resend } from 'resend';
// import dotenv from 'dotenv';
// dotenv.config();

// if (!process.env.RESEND_API) {
//   console.log("⚠️ Provide RESEND_API inside the .env file");
// }

// const resend = new Resend(process.env.RESEND_API);

// // 🔐 Whitelisted sender emails until DNS is verified
// const allowedTestSenders = [
//   "onboarding@resend.dev",
//   "agnihotrisakshi256@gmail.com",
//   "sakshi.devtest@gmail.com"
// ];

// const sendEmail = async ({ sendTo, subject, html, sender = "onboarding@resend.dev" }) => {
//   try {
//     // ✅ Validate sender email
//     if (!allowedTestSenders.includes(sender)) {
//       throw new Error(`Sender email "${sender}" is not whitelisted`);
//     }

//     const { data, error } = await resend.emails.send({
//       from: sender,
//       to: sendTo,
//       subject,
//       html,
//     });

//     if (error) {
//       throw new Error(error.message || "Resend email error");
//     }

//     return data;
//   } catch (error) {
//     console.error("sendEmail failed:", error.message);
//     throw error;
//   }
// };

// export default sendEmail;
