"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image  from "next/image"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import FormField from "./FormField"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signUp } from "@/lib/actions/auth.action"
import { signIn } from "@/lib/actions/auth.action"

const authFormSchema = (type : FormType) => {
    return z.object({
        name : type === 'sign-in' ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password : z.string().min(3),
    })
}


const AuthForm = ({ type } : {type : FormType}) =>{
    const router = useRouter();
    const formSchema = authFormSchema(type);

    // 1. Define your form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // Simulate async API call
            await new Promise((resolve) => setTimeout(resolve, 1200));

            // Simulate success response
            if (type === 'sign-up') {
                const { name, email, password } = values;

                const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

                const result = await  signUp({
                    uid : userCredentials.user.uid,
                    name: name!,
                    email,
                    password,
                })

                if(!result?.success){
                    toast.error(result?.message);
                    return;
                }

                toast.success("Account Created successfully. Please Sign in.");
                router.push("/sign-in");

            } else {
                const { email, password } = values;
                const userCredential = await signInWithEmailAndPassword(auth, email, password);

                const idToken = await userCredential.user.getIdToken();

                if(!idToken){
                    toast.error("Sign is failed")
                    return;
                }

                await signIn({
                    email, idToken
                })

                toast.success("Sign in successfully.");
                router.push("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(`There was an error: ${error}`);
        }
    }

    const isSignIn = type === 'sign-in';

    return (
        <div className="card_border lg:min-w-[566px]"> 
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image 
                        src="/logo.svg" 
                        alt="logo" 
                        height={32} 
                        width={38} 
                    />
                    <h2 className="text-primary-100">InfoView</h2>
                </div>

                <h3>Give your First Step Interview</h3>

             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                    {!isSignIn && (
                        <FormField 
                            control={form.control} 
                            name="name" 
                            label="Name" 
                            placeholder= "Your Name"
                        />
                    )}
                    <FormField 
                            control={form.control} 
                            name="email" 
                            label="Email" 
                            placeholder= "Your Email Address"
                            type = "email"
                        />
                    <FormField 
                            control={form.control} 
                            name="password" 
                            label="Password" 
                            placeholder= "Enter Your Password"
                            type= "password"
                        />

                    <Button className="btn" 
                            type="submit">
                    <Link 
                        href={!isSignIn ? '/sign-up' : '/'} 
                        className="font-bold text-user-primary ml-1"
                    >
                        {!isSignIn ? "Sign Up" : "Sign in"}
                    </Link></Button> 
                </form>

                <p className="text-center">
                    {isSignIn ? "No Account yet?" : "Have an account already?"}
                    <Link 
                        href={!isSignIn ? '/sign-in' : '/sign-up'} 
                        className="font-bold text-user-primary ml-1"
                    >
                        {!isSignIn ? "Sign in" : "Sign up"}
                    </Link>
                </p>
            </Form>
        </div>
    </div>
    )
}

export default AuthForm