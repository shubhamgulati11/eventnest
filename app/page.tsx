"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/wedding/header"
import { useAuth } from "@/lib/auth-context"
import { Spinner } from "@/components/ui/spinner"
import { ProgressOverview } from "@/components/wedding/progress-overview"
import { TaskList } from "@/components/wedding/task-list"
import { WeddingDatePicker } from "@/components/wedding/wedding-date-picker"
import { defaultTasks, type WeddingTask } from "@/lib/types"

export default function WeddingTaskManager() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [tasks, setTasks] = useState<WeddingTask[]>(defaultTasks)
  const [weddingDate, setWeddingDate] = useState("2026-10-15")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Spinner className="h-8 w-8 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleToggle = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleDelete = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const handleAdd = (newTask: Omit<WeddingTask, "id">) => {
    const task: WeddingTask = {
      ...newTask,
      id: Date.now().toString(),
    }
    setTasks(prev => [...prev, task])
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Your Perfect Day Awaits
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-lg text-muted-foreground">
            Keep track of every detail for your special day. From venue bookings to honeymoon plans, 
            {"we've"} got you covered.
          </p>
          <div className="mt-6">
            <WeddingDatePicker date={weddingDate} onDateChange={setWeddingDate} />
          </div>
        </div>
        
        {/* Progress Overview */}
        <section className="mb-8">
          <ProgressOverview tasks={tasks} weddingDate={weddingDate} />
        </section>
        
        {/* Task List */}
        <section>
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onAdd={handleAdd}
          />
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border bg-card py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Made with love for your special day</p>
        </div>
      </footer>
    </div>
  )
}
