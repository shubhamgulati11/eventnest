"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  phoneNumber: string
  name?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (phoneNumber: string, name?: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("wedding-app-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (phoneNumber: string, name?: string) => {
    const newUser = { phoneNumber, name }
    setUser(newUser)
    localStorage.setItem("wedding-app-user", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("wedding-app-user")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
