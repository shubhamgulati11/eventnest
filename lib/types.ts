export type TaskCategory = 
  | "venue"
  | "catering"
  | "photography"
  | "attire"
  | "flowers"
  | "music"
  | "invitations"
  | "decor"
  | "transportation"
  | "honeymoon"

export type TaskPriority = "low" | "medium" | "high"

export interface WeddingTask {
  id: string
  title: string
  category: TaskCategory
  priority: TaskPriority
  dueDate: string
  completed: boolean
  notes?: string
}

export const categoryConfig: Record<TaskCategory, { label: string; icon: string; color: string }> = {
  venue: { label: "Venue", icon: "building", color: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300" },
  catering: { label: "Catering", icon: "utensils", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  photography: { label: "Photography", icon: "camera", color: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300" },
  attire: { label: "Attire", icon: "shirt", color: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300" },
  flowers: { label: "Flowers", icon: "flower", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
  music: { label: "Music", icon: "music", color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300" },
  invitations: { label: "Invitations", icon: "mail", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" },
  decor: { label: "Decor", icon: "sparkles", color: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300" },
  transportation: { label: "Transportation", icon: "car", color: "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300" },
  honeymoon: { label: "Honeymoon", icon: "plane", color: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300" },
}

export const priorityConfig: Record<TaskPriority, { label: string; color: string }> = {
  low: { label: "Low", color: "bg-muted text-muted-foreground" },
  medium: { label: "Medium", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  high: { label: "High", color: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300" },
}

export const defaultTasks: WeddingTask[] = [
  { id: "1", title: "Book wedding venue", category: "venue", priority: "high", dueDate: "2026-06-01", completed: false },
  { id: "2", title: "Hire photographer", category: "photography", priority: "high", dueDate: "2026-06-15", completed: false },
  { id: "3", title: "Select catering menu", category: "catering", priority: "medium", dueDate: "2026-07-01", completed: false },
  { id: "4", title: "Order wedding dress", category: "attire", priority: "high", dueDate: "2026-05-15", completed: true },
  { id: "5", title: "Book florist consultation", category: "flowers", priority: "medium", dueDate: "2026-06-20", completed: false },
  { id: "6", title: "Create guest list", category: "invitations", priority: "high", dueDate: "2026-05-01", completed: true },
  { id: "7", title: "Book DJ or band", category: "music", priority: "medium", dueDate: "2026-07-15", completed: false },
  { id: "8", title: "Plan table decorations", category: "decor", priority: "low", dueDate: "2026-08-01", completed: false },
  { id: "9", title: "Arrange transportation", category: "transportation", priority: "low", dueDate: "2026-09-01", completed: false },
  { id: "10", title: "Research honeymoon destinations", category: "honeymoon", priority: "medium", dueDate: "2026-07-01", completed: false },
]
