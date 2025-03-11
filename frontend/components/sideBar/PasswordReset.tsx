'use client'

import { Dialog, DialogBackdrop } from '@headlessui/react'
import { useState } from 'react'
import Image from 'next/image'
import { RxCross2 } from 'react-icons/rx'
import { useTranslations } from 'next-intl'
import { useForm, SubmitHandler } from 'react-hook-form'
import AuthService from '@/utils/auth/AuthService'

const auth = new AuthService()

type ModalProps = {
    setIsOpen: (foo: boolean) => void
    isOpen: boolean
}

type RemindPasswordInput = {
    email: string
}

type ResetPasswordInput = {
    email: string
    password: string
    password_confirmation: string
    token: string
}

type RemindResponse = {
    success: boolean
    error?: string | Record<string, string[]>
    message?: string
}

export function PasswordResetModal({ setIsOpen, isOpen }: ModalProps) {
    const [isEmailSent, setIsEmailSent] = useState(false)
    const tAuth = useTranslations('auth')
    const tApp = useTranslations('app')
    const tValid = useTranslations('validation')

    const {
        register: registerRemind,
        handleSubmit: handleSubmitRemind,
        formState: { errors: errorsRemind },
        setError: setErrorRemind,
    } = useForm<RemindPasswordInput>()

    const handleBackdropClick = () => {
        setIsOpen(false)
    }

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const submitRemind: SubmitHandler<RemindPasswordInput> = (data) => {
        auth.fetch<RemindResponse>(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/password/remind`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then((res) => {
            if (res.success) {
                setIsEmailSent(true)
            } else {
                if (typeof res.error === 'object' && res.error !== null) {
                    Object.entries(res.error).forEach(([field, messages]) => {
                        const message = Array.isArray(messages) ? messages[0] : messages
                        setErrorRemind(field as keyof RemindPasswordInput, {
                            type: 'manual',
                            message: message
                        })
                    })
                } else {
                    setErrorRemind('root', {
                        type: 'manual',
                        message: res.message || res.error as string || 'An error occurred'
                    })
                }
            }
        }).catch((error) => {
            setErrorRemind('root', {
                type: 'manual',
                message: 'Network error occurred. Please try again.'
            })
        })
    }

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <DialogBackdrop onClick={handleBackdropClick} className="fixed inset-0 bg-black opacity-90" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <div
                    onClick={handleModalClick}
                    className="w-full max-w-md p-6 bg-black border rounded-lg shadow-xl"
                >
                    <div className="flex justify-end">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                        >
                            <RxCross2 size={24} color="white" />
                        </button>
                    </div>

                    <div className="flex flex-col items-center mb-6">
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            width={185}
                            height={52}
                            className="mb-4"
                        />
                        <h2 className="text-2xl font-bold text-white">
                            {tApp("reset_password")}
                        </h2>
                    </div>

                    {!isEmailSent ? (
                        <form onSubmit={handleSubmitRemind(submitRemind)} className="space-y-4">
                            {errorsRemind?.root?.message && (
                                <p className="text-red-500 text-sm text-center bg-red-100/10 p-2 rounded">
                                    {errorsRemind.root.message}
                                </p>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    {tApp("email")}
                                </label>
                                <input
                                    {...registerRemind("email", {
                                        required: true,
                                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                    })}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white"
                                    type="email"
                                    placeholder={tApp("email")}
                                />
                                {errorsRemind?.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errorsRemind.email.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold rounded-lg transition-all duration-300"
                            >
                                {tApp("send_reset_link")}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center space-y-4">
                            <div className="text-green-500 bg-green-100/10 p-4 rounded-lg">
                                <p className="text-lg font-medium">
                                    {tAuth("password_reset_email_sent")}
                                </p>
                                <p className="text-sm mt-2 text-gray-300">
                                    {tAuth("check_email_for_reset_link")}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Dialog>
    )
} 