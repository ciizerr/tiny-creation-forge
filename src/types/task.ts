
export interface Task {
  id: string;
  title: string;
  project: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  createdAt: Date;
}
