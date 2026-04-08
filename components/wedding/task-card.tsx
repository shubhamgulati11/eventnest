"use client"

import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, Building2, Camera, Utensils, Shirt, Flower2, Music, Mail, Sparkles, Car, Plane } from "lucide-react"
import { categoryConfig, priorityConfig, type WeddingTask, type TaskCategory } from "@/lib/types"
import { cn } from "@/lib/utils"

interface TaskCardProps {
  task: WeddingTask
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

const iconMap: Record<TaskCategory, React.ComponentType<{ className?: string }>> = {
  venue: Building2,
  photography: Camera,
  catering: Utensils,
  attire: Shirt,
  flowers: Flower2,
  music: Music,
  invitations: Mail,
  decor: Sparkles,
  transportation: Car,
  honeymoon: Plane,
}

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const category = categoryConfig[task.category]
  const priority = priorityConfig[task.priority]
  const Icon = iconMap[task.category]
  
  const dueDate = new Date(task.dueDate)
  const today = new Date()
  const isOverdue = !task.completed && dueDate < today
  
  return (
    <Card className={cn(
      "group relative overflow-hidden border-border bg-card p-4 transition-all hover:shadow-md",
      task.completed && "opacity-60"
    )}>
      <div className="flex items-start gap-4">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          className="mt-1 h-5 w-5 rounded-full border-2 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        />
        
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className={cn(
              "font-medium text-foreground leading-tight",
              task.completed && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => onDelete(task.id)}
            >
              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className={cn("gap-1 text-xs", category.color)}>
              <Icon className="h-3 w-3" />
              {category.label}
            </Badge>
            <Badge variant="secondary" className={cn("text-xs", priority.color)}>
              {priority.label}
            </Badge>
          </div>
          
          <p className={cn(
            "text-sm",
            isOverdue ? "text-destructive font-medium" : "text-muted-foreground"
          )}>
            {isOverdue ? "Overdue: " : "Due: "}
            {dueDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </div>
    </Card>
  )
}
