"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import { Heart, Phone, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/lib/auth-context"
import {  RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
type Step = "phone" | "otp" | "name"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  
  const [step, setStep] = useState<Step>("phone")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)
    setError("")
  }

//   const handleSendOTP = async () => {
//     const digits = phoneNumber.replace(/\D/g, "")
//     if (digits.length !== 10) {
//       setError("Please enter a valid 10-digit phone number")
//       return
//     }
//
//     setIsLoading(true)
//     // Simulate sending OTP
//     await new Promise(resolve => setTimeout(resolve, 1500))
//     setIsLoading(false)
//     setStep("otp")
//   }
  const handleSendOTP = async () => {
    const digits = phoneNumber.replace(/\D/g, "");

    if (digits.length !== 10) {
    setError("Please enter a valid 10-digit phone number");
    return;
    }

    setIsLoading(true);

    try {
        const appVerifier = window.recaptchaVerifier;

        const phone = `+91${digits}`;

        const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
        );

    window.confirmationResult = confirmationResult;

    setStep("otp"); // move to OTP screen
   } catch (err) {
    console.error(err);
    setError("Failed to send OTP");
   }

    setIsLoading(false);
 };
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      console.log("User:", user);

      // redirect after login
      router.push("/");
    } catch (error) {
      console.error(error);
      setError("Google login failed");
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit code")
      return
    }
    
    setIsLoading(true)
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // For demo purposes, accept any 6-digit code
    setIsLoading(false)
    setStep("name")
  }

  const handleComplete = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    login(phoneNumber, name || undefined)
    router.push("/")
  }
  useEffect(() => {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
          "recaptcha-container",
          { size: "invisible" }
        );
      }
    }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-center px-4">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 fill-primary text-primary" />
            <span className="text-xl font-semibold tracking-tight text-foreground">Ever After</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Plan Your Perfect Day
          </h1>
          <p className="mt-2 text-pretty text-muted-foreground">
            Sign in to start planning your dream wedding
          </p>
        </div>

        <Card className="w-full max-w-md border-border/50 shadow-lg">
          {step === "phone" && (
            <>
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-xl text-foreground">Welcome</CardTitle>
                <CardDescription>
                  Enter your phone number to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="1234567890"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        className="pl-10"
                        maxLength={14}
                      />
                    </div>
                    {error && <FieldError>{error}</FieldError>}
                  </Field>
                  <Button 
                    onClick={handleSendOTP}
//                     onClick={handleGoogleLogin}
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner className="mr-2" />
                        Sending code...
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </FieldGroup>
              </CardContent>
            </>
          )}

          {step === "otp" && (
            <>
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-xl text-foreground">Verify Your Number</CardTitle>
                <CardDescription>
                  {"We've sent a 6-digit code to"} <span className="font-medium text-foreground">{phoneNumber}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel>Verification Code</FieldLabel>
                    <div className="flex justify-center py-2">
                      <InputOTP 
                        maxLength={6} 
                        value={otp} 
                        onChange={(value) => {
                          setOtp(value)
                          setError("")
                        }}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    {error && <FieldError>{error}</FieldError>}
                  </Field>
                  <Button 
                    onClick={handleVerifyOTP} 
                    className="w-full"
                    disabled={isLoading || otp.length !== 6}
                  >
                    {isLoading ? (
                      <>
                        <Spinner className="mr-2" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify Code
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => setStep("phone")}
                    className="w-full text-muted-foreground"
                  >
                    Use a different number
                  </Button>
                </FieldGroup>
              </CardContent>
            </>
          )}

          {step === "name" && (
            <>
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-xl text-foreground">Almost There!</CardTitle>
                <CardDescription>
                  What should we call you?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Your Name (Optional)</FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Field>
                  <Button 
                    onClick={handleComplete} 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner className="mr-2" />
                        Setting up...
                      </>
                    ) : (
                      <>
                        Start Planning
                        <Heart className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={handleComplete}
                    className="w-full text-muted-foreground"
                    disabled={isLoading}
                  >
                    Skip for now
                  </Button>
                </FieldGroup>
              </CardContent>
            </>
          )}
        </Card>
        <div id="recaptcha-container"></div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Made with love for your special day</p>
        </div>
      </footer>
    </div>
  )
}
