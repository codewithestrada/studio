
import { SignUpForm } from '@/components/auth/SignUpForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] py-8"> {/* Added padding */}
       <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Enter your details to register</CardDescription>
        </CardHeader>
        <CardContent>
           <SignUpForm />
            {/* Add link back to Login page */}
           <div className="mt-4 text-center text-sm">
             Already have an account?{' '}
             <Link href="/login" className="underline text-primary hover:text-primary/80">
                Login
              </Link>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
