import { TodoInterface } from "./types";
import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = process.env.PORT || 8080;
app.use(express.json());

const db: TodoInterface[] = [
  { id: "id1", isChecked: false, value: "buy computer" },
  { id: "id2", isChecked: false, value: "buy laptop" },
  { id: "id3", isChecked: false, value: "buy anything" },
  { id: "id4", isChecked: false, value: "buy games" },
];

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/todo", (req: Request, res: Response) => {
  res.send(db);
});

app.post("/todo", (req: Request, res: Response) => {
  const data = req.body as TodoInterface;
  db.push(data);
  res.sendStatus(201);
});

app.delete("/todo", (req: any, res: Response) => {
  const id = req.params.id;
  const index = db.findIndex((e) => e.id === id);
  db.splice(index, 1);
  res.sendStatus(200);
});

app.put("/todo", (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body as TodoInterface;
  const index = db.findIndex((e) => e.id === id);
  db[index] = data;
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
