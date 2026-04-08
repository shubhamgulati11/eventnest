"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Clock, AlertTriangle, Calendar } from "lucide-react"
import type { WeddingTask } from "@/lib/types"

interface ProgressOverviewProps {
  tasks: WeddingTask[]
  weddingDate: string
}

export function ProgressOverview({ tasks, weddingDate }: ProgressOverviewProps) {
  const completedCount = tasks.filter(t => t.completed).length
  const totalCount = tasks.length
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0
  
  const today = new Date()
  const wedding = new Date(weddingDate)
  const daysUntilWedding = Math.ceil((wedding.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  
  const overdueTasks = tasks.filter(t => !t.completed && new Date(t.dueDate) < today).length
  const upcomingTasks = tasks.filter(t => {
    const dueDate = new Date(t.dueDate)
    const sevenDaysFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    return !t.completed && dueDate >= today && dueDate <= sevenDaysFromNow
  }).length

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Overall Progress</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{completedCount}/{totalCount}</div>
          <Progress value={progress} className="mt-2 h-2" />
          <p className="mt-1 text-xs text-muted-foreground">{Math.round(progress)}% complete</p>
        </CardContent>
      </Card>
      
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Days Until Wedding</CardTitle>
          <Calendar className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{daysUntilWedding}</div>
          <p className="text-xs text-muted-foreground">
            {wedding.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </CardContent>
      </Card>
      
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Due This Week</CardTitle>
          <Clock className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{upcomingTasks}</div>
          <p className="text-xs text-muted-foreground">tasks need attention</p>
        </CardContent>
      </Card>
      
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
          <AlertTriangle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{overdueTasks}</div>
          <p className="text-xs text-muted-foreground">
            {overdueTasks === 0 ? "All caught up!" : "tasks past due date"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
