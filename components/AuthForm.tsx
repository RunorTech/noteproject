"use client"
import React, { useState } from 'react'
import CustomInput from './CustomInput'

import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authFormSchema } from '@/lib/utils'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { signIn, signUp } from '@/lib/actions/user.actions'




const AuthForm = ({ type }: { type: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState< any >(null);
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState<any>(null);
  const router = useRouter();


  const formSchema = authFormSchema(type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
     if(type === "sign-up"){


      const userData = {
        email: values.email,
        password: values.password,
    }

    const newUser = await signUp(userData);
    setUser(newUser);
    if (newUser) router.push('/');
     }
    if(type === "sign-in") {
      const response = await signIn({
        email: values.email,
        password: values.password,
    })
    if (response) { 
      setResponseMessage(response);
      router.push('/');}
    
    if (!response) {
    setMessage("you do not have an account please sign up")
      ;}
   
    }
    } catch (error) {
      console.log( error);
      
    } finally {
      setIsLoading(false);
    }

  };
  return (
    <section className="auth-form" >
      <div className='form-div'>
      <header className='flex flex-col gap-5 md:gap-8' >
        <Link href="/" className="cursor-pointer flex items-center gap-1">

          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">My Note</h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            { type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            <p className="text-16 font-normal text-gray-600">
              {!responseMessage ? `${message}` : 'Welcome Back' }
            </p>
          </h1>
        </div>
      </header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"  >
            <CustomInput control={form.control} name='email' label="Email" placeholder='Enter your email' />
            <CustomInput control={form.control} name='password' label="Password" placeholder='Enter your password' />
            <div className="flex flex-col gap-4">
              <Button type="submit" disabled={isLoading} className="form-btn">
                {isLoading ? (<>
                  <Loader2 size={20} className='animate-spin' />&nbsp;loading...
                </>) : (type === "sign-in" ? "Sign In" : "Sign-Up")}
              </Button>
            </div>
          </form>
        </Form>

        <footer className="flex justify-center gap-1">
          <p className="text-14 font-normal text-gray-600">
            {type === 'sign-in' ? "Don't have an account?" : "Already have an account?"}
          </p>
          <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
            {type === 'sign-in' ? 'Sign up' : 'Sign in'}
          </Link>
        </footer>
     
      </div>
    </section>
  )
}

export default AuthForm
