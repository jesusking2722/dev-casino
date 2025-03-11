'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import AuthService from '@/utils/auth/AuthService'
import { useTranslations } from 'next-intl'
import { getLocaleFromLocation, redirect } from '@/i18n/routing'
import Image from 'next/image'
import { RxCross2 } from 'react-icons/rx'
import { HiEye, HiEyeOff } from "react-icons/hi"

const auth = new AuthService()

type ResetPasswordInput = {
    email: string
    password: string
    password_confirmation: string
}

type ResetResponse = {
    success: boolean
    error?: string | Record<string, string[]>
    message?: string
}

export default function ResetPassword({ params }: { params: { token: string } }) {
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const tApp = useTranslations('app')
    const tAuth = useTranslations('auth')

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setError,
    } = useForm<ResetPasswordInput>()

    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const onSubmit: SubmitHandler<ResetPasswordInput> = (data) => {
        setIsLoading(true)
        
        const resetData = {
            ...data,
            token: params.token
        }

        auth.fetch<ResetResponse>(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/password/reset`, {
            method: 'POST',
            body: JSON.stringify(resetData)
        }).then((res) => {
            if (res.success) {
                setSuccess(true)
                setTimeout(() => {
                    redirect({ locale: getLocaleFromLocation(), href: '/' })
                }, 2000)
            } else {
                if (typeof res.error === 'object' && res.error !== null) {
                    Object.entries(res.error).forEach(([field, messages]) => {
                        const message = Array.isArray(messages) ? messages[0] : messages
                        setError(field as keyof ResetPasswordInput, {
                            type: 'manual',
                            message: message
                        })
                    })
                } else {
                    setError('root', {
                        type: 'manual',
                        message: res.message || res.error as string || 'An error occurred'
                    })
                }
            }
        }).catch((error) => {
            setError('root', {
                type: 'manual',
                message: 'Network error occurred. Please try again.'
            })
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
            <div className="w-full lg:w-[800px] bg-black border rounded-lg p-6">
                <div className="flex flex-col items-center mb-8">
                    <Image
                        src="/logo.svg"
                        alt="logo"
                        width={185}
                        height={52}
                        className="mb-4"
                    />
                    <h2 className="text-[24px] text-white font-bold text-center">
                        {tApp("reset_password")}
                    </h2>
                </div>

                {success ? (
                    <div className="text-center space-y-4">
                        <div className="bg-green-100/10 p-4 rounded-lg">
                            <p className="text-green-500 text-lg font-medium">
                                {tAuth("password_reset_success")}
                            </p>
                            <p className="text-gray-300 text-sm mt-2">
                                {tAuth("redirecting_to_home")}
                            </p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {errors?.root?.message && (
                            <div className="bg-red-100/10 p-4 rounded-lg">
                                <p className="text-red-500 text-sm text-center">
                                    {errors.root.message}
                                </p>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">
                                    {tApp("email")}
                                </p>
                                {errors?.email && (
                                    <p className="text-red-500 text-[12px]">
                                        {errors.email.message}
                                    </p>
                                )}
                                <input
                                    {...register("email", {
                                        required: true,
                                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                    })}
                                    className="text-[#ebebeb] px-[24px] py-[12px] duration-300 placeholder:text-[#ebebeb66] placeholder:text-[14px] placeholder:font-light bg-transparent w-full border rounded-sm size-full shadow-sm outline-none focus:border-[#e5b100] sm:text-sm"
                                    type="email"
                                    placeholder={tApp("email")}
                                />
                            </div>

                            <div>
                                <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">
                                    {tApp("new_password")}
                                </p>
                                {errors?.password && (
                                    <p className="text-red-500 text-[12px]">
                                        {errors.password.message}
                                    </p>
                                )}
                                <div className="relative">
                                    <input
                                        {...register("password", { required: true, minLength: 6 })}
                                        className="text-[#ebebeb] px-[24px] py-[12px] duration-300 placeholder:text-[#ebebeb66] placeholder:text-[14px] placeholder:font-light bg-transparent w-full border rounded-sm size-full shadow-sm outline-none focus:border-[#e5b100] sm:text-sm pr-12"
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder={tApp("new_password")}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                                    >
                                        {showNewPassword ? (
                                            <HiEyeOff size={20} />
                                        ) : (
                                            <HiEye size={20} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">
                                    {tApp("confirm_password")}
                                </p>
                                {errors?.password_confirmation && (
                                    <p className="text-red-500 text-[12px]">
                                        {errors.password_confirmation.message}
                                    </p>
                                )}
                                <div className="relative">
                                    <input
                                        {...register("password_confirmation", {
                                            required: true,
                                            validate: (val: string) => {
                                                if (watch('password') != val) {
                                                    return "Your passwords do not match"
                                                }
                                            }
                                        })}
                                        className="text-[#ebebeb] px-[24px] py-[12px] duration-300 placeholder:text-[#ebebeb66] placeholder:text-[14px] placeholder:font-light bg-transparent w-full border rounded-sm size-full shadow-sm outline-none focus:border-[#e5b100] sm:text-sm pr-12"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder={tApp("confirm_password")}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                                    >
                                        {showConfirmPassword ? (
                                            <HiEyeOff size={20} />
                                        ) : (
                                            <HiEye size={20} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-[12px] text-center cursor-pointer text-[16px] text-[#050508] font-bold h-[44px] bg-yellow-500 hover:bg-yellow-400 duration-300 rounded-lg disabled:opacity-50"
                        >
                            {isLoading ? tApp("loading") : tApp("reset_password")}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
} 