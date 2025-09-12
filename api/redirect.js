import { Redis } from "@upstash/redis";

// Connessione a Upstash Redis tramite variabili ambiente
const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  const formA = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  const formB = "https://www.youtube.com/watch?v=FoT5qK6hpbw";

  try {
    // Incrementa il contatore globale (o crea se non esiste)
    const counter = await redis.incr("global_counter");

    // Pari → Form A, Dispari → Form B
    const redirectUrl = counter % 2 === 0 ? formA : formB;

    // Redirect temporaneo (302)
    res.writeHead(302, { Location: redirectUrl });
    res.end();
  } catch (error) {
    console.error("Errore Redis:", error);
    res.statusCode = 500;
    res.end("Errore interno");
  }
}