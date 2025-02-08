import 'dotenv/config';

import app from './app.js';
const PORT = process.env.PORT || 3000;

app.set("port", PORT);

const server = app.listen(app.get("port"), () => {
  console.log(`Server running on port ${PORT}`);
});

console.log(`Now in stage: ${process.env.NODE_ENV}`);

server.on("error", console.error);