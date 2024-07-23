require("dotenv").config();
import cors from "cors";

import express, { Express, Request, Response } from "express";
import { sendTestEmail } from "./Controllers/Mailer";

const app: Express = express();
const port = process.env.PORT || 3000;

// Use CORS
app.use(cors());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post("/send-email", async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log(email);
  if (!email) {
    return res.status(400).send("Email is required");
  }

  try {
    await sendTestEmail(email);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).send(`Error sending email: ${errorMessage}`);
  }
});

// New text endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("This is the backend for newletter");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port}`);
});
