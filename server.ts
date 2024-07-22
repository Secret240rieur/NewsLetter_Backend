// server.ts
require("dotenv").config();

import express, { Express, Request, Response } from "express";
import { sendTestEmail } from "./Controllers/Mailer";

const app: Express = express();
const port = process.env.PORT || 3000;

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Endpoint to send the test email
// app.post("/send-email", async (req: Request, res: Response) => {
app.get("/", async (req: Request, res: Response) => {
  try {
    await sendTestEmail();

    res.status(200).send("Email sent successfully");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).send(`Error sending email: ${errorMessage}`);
  }
});

// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server");
// });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
