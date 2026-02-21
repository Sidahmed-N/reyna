import emailjs from "@emailjs/browser";

// ─── EmailJS Configuration ───
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Add an email service (e.g. Gmail) → copy the Service ID
// 3. Create an email template with these variables:
//      {{from_name}}, {{to_email}}, {{message}}
//    Copy the Template ID
// 4. Go to Account → General → copy your Public Key
// 5. Paste all three values below:

const SERVICE_ID = "service_ey6o7m4";
const TEMPLATE_ID = "template_konkfnf";
const PUBLIC_KEY = "LNbZ-5zXIQsONVhQf";

export async function sendResponsesEmail(
  answers: Record<string, string>,
  ending: "happy" | "other"
) {
  const lines = [
    "═══ Reyna's Gambit — Responses ═══",
    "",
    "── Valorant Diagnostic ──",
    `Clutch or Play Safe: ${answers.clutch ?? "—"}`,
    `Phantom or Vandal:   ${answers.weapon ?? "—"}`,
    `Trust Team or Self:  ${answers.trust ?? "—"}`,
    `Comms Style:         ${answers.comms ?? "—"}`,
    "",
    "── Real-World Calibration ──",
    `Birthday:       ${answers.birthday ?? "—"}`,
    `Height:         ${answers.height ?? "—"}`,
    `Eye Color:      ${answers.eyeColor ?? "—"}`,
    `Favorite Color: ${answers.favoriteColor ?? "—"}`,
    "",
    "── Confession Answers ──",
    `Long Distance Opinion:  ${answers.longDistance ?? "—"}`,
    `Important Things:       ${answers.importantThings ?? "—"}`,
    `Give It a Shot:         ${answers.giveItAShot ?? "—"}`,
    "",
    `── Ending: ${ending.toUpperCase()} ──`,
  ];

  const message = lines.join("\n");

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: "Reyna's Gambit",
        to_email: "sidahmedv2@gmail.com",
        message,
      },
      PUBLIC_KEY
    );
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
