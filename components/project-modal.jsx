"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

export function ProjectModal({ project, isOpen, onClose }) {
  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-black border border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl">{project.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{project.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {project.image && (
            <div className="border border-primary/20 rounded overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div>
            <h4 className="text-primary font-medium mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span key={index} className="px-2 py-1 bg-primary/10 text-primary/90 rounded text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-primary font-medium mb-2">Key Features</h4>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 pt-2">
            {project.demoUrl && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => window.open(project.demoUrl, "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </Button>
            )}

            {project.repoUrl && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => window.open(project.repoUrl, "_blank")}
              >
                <Github className="h-4 w-4" />
                View Code
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

