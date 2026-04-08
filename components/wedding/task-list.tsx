"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import { TaskCard } from "./task-card"
import { AddTaskDialog } from "./add-task-dialog"
import { categoryConfig, type WeddingTask, type TaskCategory } from "@/lib/types"

interface TaskListProps {
  tasks: WeddingTask[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onAdd: (task: Omit<WeddingTask, "id">) => void
}

export function TaskList({ tasks, onToggle, onDelete, onAdd }: TaskListProps) {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | "all">("all")
  const [activeTab, setActiveTab] = useState("all")
  
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter
    const matchesTab = activeTab === "all" 
      || (activeTab === "active" && !task.completed)
      || (activeTab === "completed" && task.completed)
    return matchesSearch && matchesCategory && matchesTab
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Completed tasks at the bottom
    if (a.completed !== b.completed) return a.completed ? 1 : -1
    // Then by due date
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Your Tasks</h2>
        <AddTaskDialog onAdd={onAdd} />
      </div>
      
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-input bg-background pl-9 text-foreground"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as TaskCategory | "all")}>
            <SelectTrigger className="w-40 border-input bg-background text-foreground">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="border-border bg-popover">
              <SelectItem value="all">All Categories</SelectItem>
              {Object.entries(categoryConfig).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-muted">
          <TabsTrigger value="all" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
            All ({tasks.length})
          </TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
            Active ({tasks.filter(t => !t.completed).length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
            Done ({tasks.filter(t => t.completed).length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-4">
          {sortedTasks.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-muted/50 py-12 text-center">
              <p className="text-muted-foreground">No tasks found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {activeTab === "completed" ? "Complete some tasks to see them here!" : "Add a new task to get started!"}
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sortedTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={onToggle}
                  onDelete={onDelete}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
