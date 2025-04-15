
import { useState } from "react";
import { Task } from "@/types/task";
import TaskItem from "./TaskItem";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListFilter } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskList = ({ tasks, onToggleComplete, onDelete }: TaskListProps) => {
  const [view, setView] = useState<"all" | "active" | "completed">("all");
  const [filter, setFilter] = useState<string>("all");

  const filteredTasks = tasks.filter((task) => {
    // First filter by completion status
    if (view === "active" && task.completed) return false;
    if (view === "completed" && !task.completed) return false;
    
    // Then filter by project if needed
    if (filter !== "all" && task.project !== filter) return false;
    
    return true;
  });

  // Get unique project names from tasks
  const projects = ["all", ...Array.from(new Set(tasks.map((task) => task.project)))];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
        
        <div className="flex items-center space-x-2">
          <ListFilter className="h-4 w-4 text-gray-500" />
          <select 
            className="text-sm border rounded-md p-1"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {projects.map((project) => (
              <option key={project} value={project}>
                {project === "all" ? "All Projects" : project}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={view} onValueChange={(v) => setView(v as "all" | "active" | "completed")}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <p className="text-gray-500">No tasks found</p>
            <Button variant="link" className="mt-2 text-taskBlue" onClick={() => {
              setView("all");
              setFilter("all");
            }}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
