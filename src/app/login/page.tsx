
import { LoginForm } from '@/components/auth/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link'; // Import Link

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]"> {/* Adjust height as needed */}
       <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
           <LoginForm />
           {/* Add link to Sign Up page */}
           <div className="mt-4 text-center text-sm">
             Don&apos;t have an account?{' '}
             <Link href="/signup" className="underline text-primary hover:text-primary/80">
                Sign up
              </Link>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
