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

  //PORZIONE
  const formA = "https://docs.google.com/forms/d/e/1FAIpQLSfG3TS-k6erwBiD_qWQIuLck0lPIt7QYyI6M20E5_LtOQgBiA/viewform?usp=header";
  //100gr
  const formB = "https://docs.google.com/forms/d/e/1FAIpQLSfMz8EekWixCT56960KP84Ma_3I67vR2y42PcvoJhssCi3pAQ/viewform?usp=header";

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
