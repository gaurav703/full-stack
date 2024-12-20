import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3003;

// Hello endpoint
app.get('/hello', (req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
