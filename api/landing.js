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
    <title>home</title>
    <style>
      /* Reset e setup base */
      html, body {
        height: 100%;
        margin: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #ffffff;
        background-color: #121212; /* Dark background */
      }
  
      body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
      }
  
      header{
        margin-top: 6em;
      }
  
      footer{
        padding: 1em;
      }
  
      main {
        flex: 1; /* Occupa spazio centrale */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2em;
      }
  
      h1 {
        margin-bottom: 1em;
        font-size: 4em;
        color: #00bcd4;
      }
  
      p {
        margin: 1em 0;
        font-size: 2em;
      }
  
      button {
        padding: 1em 2em;
        font-size: 2em;
        cursor: pointer;
        margin: 1em 0;
        border: none;
        border-radius: 8px;
        background-color: #00bcd4;
        color: #121212;
        transition: background-color 0.3s, transform 0.2s;
      }
  
      button:hover {
        background-color: #00acc1;
        transform: scale(1.05);
      }
  
      footer p {
        font-size: 0.8em;
        color: #aaaaaa;
        margin: 0;
      }
  
      @media (max-width: 600px) {
        h1 {
          font-size: 2em;
        }
  
        p {
          font-size: 1em;
        }
  
        button {
          width: 80%;
        }
      }
    </style>
  </head>
  <body>
  
    <header>
      <h1>Benvenuto!</h1>
    </header>
  
    <p>Clicca il bottone per essere reindirizzato</p>
    
    <main>
      <button id="redirectBtn">Vai al <span lang="en">form</span></button>
      <p>Grazie per il tempo dedicato alla compilazione del questionario</p>
    </main>
  
    <footer>
      <p><span lang="en">Made by </span>Valerio Occhinegro</p>
    </footer>
  
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
