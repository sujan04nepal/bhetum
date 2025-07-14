const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Welcome</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .container { max-width: 600px; margin: 0 auto; text-align: center; }
            h1 { color: #333; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to Your App</h1>
            <p>Your development server is now running!</p>
            <p>Time: ${new Date().toLocaleString()}</p>
        </div>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
