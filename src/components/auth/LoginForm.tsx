
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext"; // Assuming AuthContext exists
import { useState } from "react";
import { Loader2, Smartphone } from "lucide-react"; // Added Smartphone icon
import { Separator } from "@/components/ui/separator"; // Added Separator

// Placeholder Google Icon SVG (replace with a proper one if needed)
const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.35 11.1H12.18V13.83H18.69C18.36 17.64 15.19 19.27 12.19 19.27C8.36 19.27 5.03 16.34 5.03 12.5C5.03 8.66 8.36 5.73 12.19 5.73C14.03 5.73 15.69 6.34 16.95 7.45L19.05 5.35C17.13 3.71 14.81 2.77 12.19 2.77C6.86 2.77 2.59 7.25 2.59 12.5C2.59 17.75 6.86 22.23 12.19 22.23C17.58 22.23 21.5 18.3 21.5 12.88C21.5 12.19 21.44 11.64 21.35 11.1Z"/>
  </svg>
);


const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth(); // Use login function from AuthContext
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isPhoneLoading, setIsPhoneLoading] = useState(false);


  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    console.log("Login attempt with:", values);

    // --- Simulate Authentication ---
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    // Example: Replace with actual API call
    const isSuccess = values.email === "test@example.com" && values.password === "password"; // Dummy check

    setIsLoading(false);

    if (isSuccess) {
       const userData = { id: 'user123', email: values.email, name: 'Test User' };
      login(userData); // Update auth state

      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      router.push("/"); // Redirect to homepage
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
       form.resetField("password");
    }
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    console.log("Attempting Google Login...");
    // In a real app, initiate Google OAuth flow here
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate Google login delay
    // Simulate success for demonstration
    const userData = { id: 'google123', email: 'googleuser@example.com', name: 'Google User' };
    login(userData);
     toast({
        title: "Google Login Successful",
        description: "Welcome!",
      });
    setIsGoogleLoading(false);
     router.push("/");
  };

  const handlePhoneLogin = async () => {
    setIsPhoneLoading(true);
    console.log("Attempting Phone Login...");
    // In a real app, initiate phone number verification flow here (e.g., Firebase Auth with Phone)
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate phone login delay
     toast({
        title: "Phone Login Initiated",
        description: "Check your phone for a verification code (simulation).",
      });
     // On actual success:
     // const userData = { id: 'phone123', email: '', name: 'Phone User' }; // Email might be empty or derived
     // login(userData);
     // router.push("/");
    setIsPhoneLoading(false);
     // For now, just show a message and don't log in or redirect fully
  };


  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} type="email" disabled={isLoading || isGoogleLoading || isPhoneLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••" {...field} type="password" disabled={isLoading || isGoogleLoading || isPhoneLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading || isGoogleLoading || isPhoneLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login with Email"
            )}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
         <Button
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={isLoading || isGoogleLoading || isPhoneLoading}
            className="w-full"
         >
           {isGoogleLoading ? (
             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
           ) : (
              <GoogleIcon /> // Use the Google icon component
           )}
           <span className="ml-2">Login with Google</span>
         </Button>

        <Button
          variant="outline"
          onClick={handlePhoneLogin}
          disabled={isLoading || isGoogleLoading || isPhoneLoading}
           className="w-full"
        >
          {isPhoneLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Smartphone className="mr-2 h-4 w-4" />
          )}
          Login with Phone
        </Button>
      </div>

       {/* Optional: Add links for password reset or sign up */}
       {/* <div className="text-center text-sm">
          <Link href="/signup" className="underline">Don't have an account? Sign up</Link>
       </div> */}
    </div>
  );
}
