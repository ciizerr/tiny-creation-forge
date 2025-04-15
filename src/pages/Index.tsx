
import { useState, useEffect } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import ProjectSelector from "@/components/ProjectSelector";
import { Task } from "@/types/task";
import { toast } from "@/components/ui/use-toast";
import { CheckCircle2, ListTodo } from "lucide-react";

const Index = () => {
  // Initialize with default projects and sample tasks
  const [projects, setProjects] = useState<string[]>(["Personal", "Work"]);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch (e) {
        console.error("Failed to parse saved tasks:", e);
        return [];
      }
    }
    // Default tasks
    return [
      {
        id: "1",
        title: "Create project plan",
        project: "Work",
        priority: "high",
        completed: false,
        createdAt: new Date(),
      },
      {
        id: "2",
        title: "Buy groceries",
        project: "Personal",
        priority: "medium",
        completed: false,
        createdAt: new Date(),
      },
    ];
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask: Task) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been removed",
    });
  };

  const handleAddProject = (project: string) => {
    setProjects((prevProjects) => [...prevProjects, project]);
  };

  const handleDeleteProject = (projectToDelete: string) => {
    // Check if there are tasks assigned to this project
    const tasksInProject = tasks.filter(task => task.project === projectToDelete);
    
    if (tasksInProject.length > 0) {
      toast({
        title: "Cannot delete project",
        description: `There are ${tasksInProject.length} tasks assigned to this project. Please reassign or delete them first.`,
        variant: "destructive",
      });
      return;
    }
    
    setProjects((prevProjects) => 
      prevProjects.filter((project) => project !== projectToDelete)
    );
    
    toast({
      title: "Project deleted",
      description: `Project "${projectToDelete}" has been removed`,
    });
  };

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-taskBlue flex items-center">
            <ListTodo className="mr-2" /> TaskFlow
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <ListTodo className="h-6 w-6 text-taskBlue" />
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Total Tasks</h3>
              <p className="text-2xl font-semibold">{totalTasks}</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Completed</h3>
              <p className="text-2xl font-semibold">{completedTasks}</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm text-gray-500 mb-1">Completion Rate</h3>
            <p className="text-2xl font-semibold">{completionRate}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="bg-taskBlue h-2.5 rounded-full" 
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <TaskList 
              tasks={tasks} 
              onToggleComplete={handleToggleComplete} 
              onDelete={handleDeleteTask}
            />
          </div>
          
          <div className="space-y-8">
            <TaskForm onAddTask={handleAddTask} projects={projects} />
            <ProjectSelector 
              projects={projects} 
              onAddProject={handleAddProject} 
              onDeleteProject={handleDeleteProject}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
