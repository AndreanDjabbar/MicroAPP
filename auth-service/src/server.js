import 'dotenv/config';

import app from './app.js';
const PORT = process.env.PORT || 3000;

app.set("port", PORT);

const server = app.listen(app.get("port"), () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", console.error);