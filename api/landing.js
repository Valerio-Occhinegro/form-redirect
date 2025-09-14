export default function handler(req, res) {
  const key = req.query.key;

  if (key !== process.env.SECRET_KEY) {
    res.status(403).send("Accesso non autorizzato");
    return;
  }

  const html = `
  <!DOCTYPE html>
  <html lang="it">
  <head>
    <meta charset="UTF-8">
    <title>Landing Page Protetta</title>
  </head>
  <body style="text-align:center; margin-top:50px; font-family:sans-serif;">
    <h1>Benvenuto!</h1>
    <p>Clicca il bottone per essere reindirizzato al form</p>
    <button id="redirectBtn" style="padding:10px 20px; font-size:16px; cursor:pointer; margin-top:20px;">
      Vai al form
    </button>

    <script>
      document.getElementById("redirectBtn").addEventListener("click", () => {
        window.location.href = "/api/redirect?key=${key}";
      });
    </script>
  </body>
  </html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
