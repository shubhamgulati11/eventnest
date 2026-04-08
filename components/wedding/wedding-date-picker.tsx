"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarHeart } from "lucide-react"

interface WeddingDatePickerProps {
  date: string
  onDateChange: (date: string) => void
}

export function WeddingDatePicker({ date, onDateChange }: WeddingDatePickerProps) {
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(date))

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      onDateChange(date.toISOString().split("T")[0])
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-border text-foreground">
          <CalendarHeart className="h-4 w-4 text-primary" />
          Set Wedding Date
        </Button>
      </DialogTrigger>
      <DialogContent className="border-border bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Select Your Wedding Date</DialogTitle>
          <DialogDescription>Choose the date of your special day to track your countdown.</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            disabled={(date) => date < new Date()}
            className="rounded-md border border-border"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
