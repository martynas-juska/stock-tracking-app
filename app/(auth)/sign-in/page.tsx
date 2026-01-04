'use client'

import InputField from "@/components/ui/forms/InputField"
import { useForm, SubmitHandler } from "react-hook-form"
import FooterLink from "@/components/ui/forms/FooterLink"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const SignIn = () => {
    const router = useRouter()
    const [error, setError] = useState<string>("")

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur"
    })

    const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
        try {
            setError("")

            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            })

            if (result?.error) {
                setError("Invalid email or password")
                return
            }

            router.push("/")
            router.refresh()

        } catch (e) {
            console.error(e)
            setError("Something went wrong. Please try again.")
        }
    }

    return (
        <>
            <h1 className="form-title">Welcome Back!</h1>

            {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                
                <InputField 
                    name="email"
                    label="E-mail"
                    placeholder="name@gmail.com"
                    type="email"
                    register={register}
                    error={errors.email}
                    validation={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Please enter a valid email address"
                        }
                    }}
                />

                <InputField 
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ required: 'Password is required', minLength: 8 }}
                />
                
                <button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                </button>

                <FooterLink 
                    text="Don't have an account?" 
                    linkText="Sign up" 
                    href="/sign-up"
                />
            </form>        
        </>
    )
}

export default SignIn