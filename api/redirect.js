import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  const key = req.query.key;

  if (key !== process.env.SECRET_KEY) {
    res.status(403).send("Accesso non autorizzato");
    return;
  }

  const formA = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  const formB = "https://www.youtube.com/watch?v=FoT5qK6hpbw";

  try {
    const counter = await redis.incr("global_counter");
    const redirectUrl = counter % 2 === 0 ? formA : formB;

    res.writeHead(302, { Location: redirectUrl });
    res.end();
  } catch (error) {
    console.error("Errore Redis:", error);
    res.status(500).send("Errore interno");
  }
}
