export interface Task {
  _id: string;
  title: string;
  status: "pending" | "in-progress" | "completed";
  createdAt: string;
}
