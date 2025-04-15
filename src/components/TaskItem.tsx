
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Task } from "@/types/task";
import { Clock, Edit, Trash } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem = ({ task, onToggleComplete, onDelete }: TaskItemProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const priorityClasses = {
    low: "bg-green-100 text-green-800",
    medium: "bg-blue-100 text-blue-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 animate-task-fade-in",
        task.completed ? "bg-gray-50 opacity-70" : ""
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-center space-x-3 flex-1">
        <Checkbox 
          id={`task-${task.id}`} 
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
          className="h-5 w-5 border-2 border-gray-300 rounded"
        />
        <div className="space-y-1">
          <label 
            htmlFor={`task-${task.id}`}
            className={cn(
              "text-gray-800 font-medium cursor-pointer",
              task.completed ? "line-through text-gray-500" : ""
            )}
          >
            {task.title}
          </label>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span 
              className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium",
                priorityClasses[task.priority]
              )}
            >
              {task.priority}
            </span>
            <span className="bg-gray-100 px-2 py-0.5 rounded-full">
              {task.project}
            </span>
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
      
      <div className={cn(
        "flex space-x-2 transition-opacity",
        isHovering ? "opacity-100" : "opacity-0"
      )}>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Edit className="h-4 w-4 text-gray-500" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => onDelete(task.id)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;
