import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  const formA = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  const formB = "https://www.youtube.com/watch?v=FoT5qK6hpbw";

  // Read the user counter from the KV Store
  let counter = (await kv.get("counter")) || 0;

  // Increment the users counter
  counter++;
  await kv.set("counter", counter);

  // Chose the form to redirect 
  const redirectUrl = counter % 2 === 0 ? formA : formB;

  // Use a temporary redirect (302)
  res.writeHead(302, { Location: redirectUrl });
  res.end();
}
