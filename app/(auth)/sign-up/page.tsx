'use client'

import InputField from "@/components/ui/forms/InputField"
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES } from "@/lib/constants"
import { useForm, SubmitHandler } from "react-hook-form"
import SelectField from "@/components/ui/forms/SelectField"
import CountrySelectField from "@/components/ui/forms/CountrySelectField"
import FooterLink from "@/components/ui/forms/FooterLink"
import { useState } from "react"
import { useRouter } from "next/navigation"

const SignUp = () => {
    const router = useRouter()
    const [error, setError] = useState<string>("")

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            country: "",
            investmentGoals: "",
            riskTolerance: "Medium",
            preferredIndustry: ""
        },
        mode: "onBlur"
    })

    const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
        try {
            setError("")

            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (!response.ok) {
                setError(result.error || "Something went wrong")
                return
            }

            router.push("/sign-in?registered=true")

        } catch (e) {
            console.error(e)
            setError("Something went wrong. Please try again.")
        }
    }

    return (
        <>
            <h1 className="form-title">Create Your Account!</h1>

            {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                
                <InputField 
                    name="fullName"
                    label="Full Name"
                    placeholder="John Doe"
                    register={register as any}
                    error={errors.fullName}
                    validation={{ required: 'Full name is required', minLength: 2 }}
                />

                <InputField 
                    name="email"
                    label="E-mail"
                    placeholder="name@gmail.com"
                    type="email"
                    register={register as any}
                    error={errors.email}
                    validation={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    }}
                />

                <InputField 
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    register={register as any}
                    error={errors.password}
                    validation={{ required: 'Password is required', minLength: 8 }}
                />

                <CountrySelectField 
                    name="country"
                    label="Country"
                    control={control}
                    error={errors.country}
                    required
                />
                
                <SelectField 
                    name="investmentGoals"
                    label="Investment Goals"
                    placeholder="Select your investment goal"
                    options={INVESTMENT_GOALS}
                    control={control}
                    error={errors.investmentGoals}
                    required
                />

                <SelectField 
                    name="preferredIndustry"
                    label="Preferred Industry"
                    placeholder="Select your preferred industry"
                    options={PREFERRED_INDUSTRIES}
                    control={control}
                    error={errors.preferredIndustry}
                    required
                />
                
                <button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Creating Account...' : 'Start Your Investing Journey'}
                </button>

                <FooterLink 
                    text="Already have an account?" 
                    linkText="Sign in" 
                    href="/sign-in"
                />
            </form>        
        </>
    )
}

export default SignUp