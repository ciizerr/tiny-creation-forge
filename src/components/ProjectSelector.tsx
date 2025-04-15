
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

interface ProjectSelectorProps {
  projects: string[];
  onAddProject: (project: string) => void;
  onDeleteProject: (project: string) => void;
}

const ProjectSelector = ({ projects, onAddProject, onDeleteProject }: ProjectSelectorProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState("");

  const handleAddProject = () => {
    if (!newProject.trim()) {
      toast({
        title: "Project name required",
        description: "Please enter a project name",
        variant: "destructive",
      });
      return;
    }

    if (projects.includes(newProject)) {
      toast({
        title: "Project already exists",
        description: "Please enter a unique project name",
        variant: "destructive",
      });
      return;
    }

    onAddProject(newProject);
    setNewProject("");
    setIsAdding(false);
    toast({
      title: "Project added",
      description: `Project "${newProject}" has been added successfully`,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
      
      <div className="space-y-2">
        {projects.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {projects.map((project) => (
              <div 
                key={project}
                className="flex items-center space-x-1 bg-gray-100 px-3 py-1.5 rounded-full"
              >
                <span className="text-sm text-gray-700">{project}</span>
                {project !== "Personal" && project !== "Work" && (
                  <button 
                    onClick={() => onDeleteProject(project)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No projects yet. Add your first project!</p>
        )}
      </div>
      
      {isAdding ? (
        <div className="flex space-x-2">
          <Input
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            placeholder="Project name"
            className="flex-1"
            autoFocus
          />
          <Button 
            onClick={handleAddProject}
            className="bg-taskBlue hover:bg-taskBlue-dark"
          >
            Add
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              setIsAdding(false);
              setNewProject("");
            }}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button 
          variant="outline" 
          className="w-full border-dashed"
          onClick={() => setIsAdding(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Project
        </Button>
      )}
    </div>
  );
};

export default ProjectSelector;
