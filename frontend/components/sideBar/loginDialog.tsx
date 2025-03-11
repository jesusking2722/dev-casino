'use client'

import {useState} from "react"
import {Dialog, DialogBackdrop} from '@headlessui/react'
import {PhoneInput} from "react-international-phone"
import 'react-international-phone/style.css'
import Image from "next/image"
import {RxCross2} from "react-icons/rx"
import {useTranslations} from "next-intl";
import {SubmitHandler, useForm} from 'react-hook-form'
import AuthService from '@/utils/auth/AuthService'
import {User} from "@/utils/types/User";
import {interpolateMessage} from "@/i18n/utils";
import {AuthToken} from "@/utils/types/AuthToken";
import { HiEye, HiEyeOff } from "react-icons/hi"

const auth = new AuthService()

type ModalProps = {
    setIsOpen: (foo: boolean) => void
    isOpen: boolean
}

type LoginInput = {
    phone?: string
    email?: string
    password: string
}

type RegisterInput = {
    username: string
    phone?: string
    email?: string
    first_name?: string
    last_name?: string
    password: string
    password_confirmation: string
    birthday: Date
    referral_code?: string
}

type ConfirmPhoneInput = {
    code: string
}

type LoginResponse = {
    token?: {
        accessToken: string
        token_type: string
        expires_in: number
    }
    success: boolean
    user?: User
    error?: string | Record<string, string[]>
    message?: string
}

type MeResponse = {
    data: User
    success: boolean
}

type SendCodeResponse = {
    success: boolean
}

type RegisterResponse = {
    token?: {
        accessToken: string
        token_type: string
        expires_in: number
    }
    requires_email_confirmation?: string
    requires_phone_confirmation?: string
    success: boolean
    error?: string | Record<string, string[]>
    message?: string
}

type RemindPasswordInput = {
    email: string
}

type RemindResponse = {
    success: boolean
    error?: string | Record<string, string[]>
    message?: string
}

export function LoginModal({setIsOpen, isOpen}: ModalProps) {
    const [isHover, setIsHover] = useState(false)
    const [phone, setPhone] = useState('')
    const [isLoginActive, setIsLoginActive] = useState(true);
    const [selectedMethod, setSelectedMethod] = useState('phone');
    const [selectedMethodRegister, setSelectedMethodRegister] = useState('phone');
    const [token, setToken] = useState<string>('')
    const [isOpenConfirmEmail, setIsOpenConfirmEmail] = useState<boolean>(false);
    const [isOpenConfirmPhone, setIsOpenConfirmPhone] = useState<boolean>(false);
    const [isPasswordResetOpen, setIsPasswordResetOpen] = useState(false);
    const [isPasswordResetEmailSent, setIsPasswordResetEmailSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
        clearErrors,
        resetField
    } = useForm<LoginInput>()

    const {
        register: registerRegister,
        handleSubmit: handleSubmitRegister,
        formState: {errors: errorsRegister},
        setError: setErrorRegister,
        resetField: resetFieldRegister
    } = useForm<RegisterInput>()

    const {
        register: registerConfirmPhone,
        handleSubmit: handleSubmitConfirmPhone,
        setError: setErrorConfirmPhone
    } = useForm<ConfirmPhoneInput>()

    const {
        register: registerRemind,
        handleSubmit: handleSubmitRemind,
        formState: {errors: errorsRemind},
        setError: setErrorRemind,
    } = useForm<RemindPasswordInput>()

    const tAuth = useTranslations('auth')
    const tApp = useTranslations('app')
    const tValid = useTranslations('validation')

    const handleBackdropClick = () => {
        setIsOpen(false);
    };

    const handleModalClick = (e: React.MouseEvent) => {
        // Prevent clicks inside modal from closing it
        e.stopPropagation();
    };

    const onClick = () => {
        if (!isHover)
            setIsOpen(false)
    }

    const hover = () => {
        setIsHover(!isHover)
    }

    const submitLogin: SubmitHandler<LoginInput> = (e: LoginInput) => {
        let login: string | undefined

        if (e.phone) {
            e.phone = e.phone.replace(/[^0-9]/g, '')
            e.phone = `+${e.phone}`
        }

        if (e.email == undefined) {
            login = e.phone
        } else {
            login = e.email
        }

        auth.fetch<LoginResponse>(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/login`, {
            method: 'POST',
            body: JSON.stringify({
                login: login,
                password: e.password
            })
        }).then((res) => {
            if (res.success && res.token) {
                auth.setToken(res.token.accessToken)

                if (res.user) {
                    auth.setProfile(res.user)
                } else {
                    auth.fetch<MeResponse>(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/me`, {
                        method: 'GET'
                    }).then((res) => {
                        auth.setProfile(res.data)
                    })
                }
                setIsOpen(false)
            } else {
                // Clear previous errors
                clearErrors()

                if (typeof res.error === 'object' && res.error !== null) {
                    // Handle validation errors
                    Object.entries(res.error).forEach(([field, messages]) => {
                        const message = Array.isArray(messages) ? messages[0] : messages
                        setError(field as keyof LoginInput, {
                            type: 'manual',
                            message: message
                        })
                    })
                } else {
                    // Handle general error
                    setError('root', {
                        type: 'manual',
                        message: res.message || res.error as string || 'An error occurred during login'
                    })
                }
            }
        }).catch((error) => {
            clearErrors()
            setError('root', {
                type: 'manual',
                message: 'Network error occurred. Please try again.'
            })
        })
    }

    const submitRegister: SubmitHandler<RegisterInput> = (e: RegisterInput) => {
        if (e.password !== e.password_confirmation) {
            setErrorRegister('password_confirmation', {
                type: 'manual',
                message: interpolateMessage(tValid('confirmed'), {attribute: tApp('password')})
            })
            return;
        }

        if (e.first_name == '') {
            delete e.first_name
        }

        if (e.last_name == '') {
            delete e.last_name
        }

        // Change e.phone to E.164 format
        if (e.phone) {
            e.phone = e.phone.replace(/[^0-9]/g, '')
            e.phone = `+${e.phone}`
        }

        auth.fetch<RegisterResponse>(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/register`, {
            method: 'POST',
            body: JSON.stringify({
                username: e.username,
                first_name: e.first_name ? e.first_name : null,
                last_name: e.last_name ? e.last_name : null,
                email: e.email,
                phone: e.phone,
                birthday: e.birthday,
                password: e.password,
                password_confirmation: e.password_confirmation,
                cashier_id: 5,
                referral_code: e.referral_code
            }, (key, value) => {
                if (value !== null) return value
            })
        }).then((res) => {
            if (res.success) {
                resetFieldRegister('password_confirmation')
                resetFieldRegister('password')
                resetFieldRegister('phone')
                resetFieldRegister('email')
                resetFieldRegister('first_name')
                resetFieldRegister('last_name')
                resetFieldRegister('username')
                resetFieldRegister('birthday')
                if (res.requires_email_confirmation == "1") {
                    setIsOpenConfirmEmail(true)
                }
                if (res.requires_email_confirmation == "0" && res.requires_phone_confirmation == "1") {
                    setToken(res.token?.accessToken || '')
                    setIsOpenConfirmPhone(true)
                }
            } else {
                if (typeof res.error === 'object' && res.error !== null) {
                    // Handle validation errors
                    Object.entries(res.error).forEach(([field, messages]) => {
                        const message = Array.isArray(messages) ? messages[0] : messages
                        setErrorRegister(field as keyof RegisterInput, {
                            type: 'manual',
                            message: message
                        })
                    })
                } else {
                    // Handle general error
                    setErrorRegister('root', {
                        type: 'manual',
                        message: res.message || (typeof res.error === 'string' ? res.error : 'An error occurred during registration')
                    })
                }
            }
        }).catch((error) => {
            setErrorRegister('root', {
                type: 'manual',
                message: 'Network error occurred. Please try again.'
            })
        })
    }

    const onClickSendCode = () => {
        auth.fetch<SendCodeResponse>(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/register/verify-phone/send`, {
            method: 'GET',
            headers: {
                'Accept-Language': navigator.language,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            if (res.success) {

            }
        })
    }

    const onSubmitConfirmCode: SubmitHandler<ConfirmPhoneInput> = (e) => {
        auth.fetch<SendCodeResponse>(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/register/verify-phone/${e.code}`, {
            method: 'POST',
            headers: {
                'Accept-Language': navigator.language,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            if (res.success) {
                auth.setToken(token)
                setIsOpen(false)
                setIsOpenConfirmPhone(false)
            }
        })
    }

    const submitRemind: SubmitHandler<RemindPasswordInput> = (data) => {
        auth.fetch<RemindResponse>(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/password/remind`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then((res) => {
            if (res.success) {
                setIsPasswordResetEmailSent(true)
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

    if (!isOpenConfirmEmail && !isOpenConfirmPhone) {
        return (
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <DialogBackdrop onClick={handleBackdropClick} className="fixed inset-0 bg-black opacity-90"/>
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <div
                        onClick={handleModalClick}
                        className="overflow-y-scroll w-full lg:w-[800px] h-[600px] py-[12px] lg:py-[24px] px-[8px] lg:px-[24px] bg-black border rounded-lg flex flex-col"
                    >
                        <div className="p-[8px] bg-white bg-opacity-15 w-fit rounded-full mr-0 ml-auto mt-[24px] hover:scale-110 duration-300 cursor-pointer">
                            <RxCross2 onClick={() => setIsOpen(false)} size={24} color="white"/>
                        </div>

                        {!isPasswordResetOpen ? (
                            <>
                                <div className="flex flex-col">
                                    <Image
                                        src="/logo.svg"
                                        alt="logo"
                                        width={185}
                                        height={52}
                                        className="place-self-center py-[12px]"
                                    />
                                    <p className="text-[24px] text-white font-bold text-center">
                                        {isLoginActive ? tApp("login") : tApp("registration")}
                                    </p>
                                </div>

                                {isLoginActive ? (
                                    // Login Form
                                    <>
                                        <div className="flex flex-col lg:flex-row px-[16px] gap-[32px] mt-[72px] mx-auto">
                                            <form onSubmit={handleSubmit(submitLogin)}>
                                                <div className="flex flex-col gap-[16px] w-full min-w-[255px]">
                                                    <p className="text-white font-bold text-[18px] mb-[8px]">
                                                        {tAuth("your_data")}
                                                    </p>
                                                    {errors?.root?.message && (
                                                        <p className="text-red-500 text-[12px] text-center bg-red-100/10 p-2 rounded">
                                                            {errors.root.message}
                                                        </p>
                                                    )}
                                                    <div className="flex flex-col">
                                                        <div
                                                            className="flex items-center bg-[#1c1c1c] rounded-full p-1 w-fit mx-auto mb-[16px] border border-[#2c2c2c]">
                                                            <button
                                                                type="button"
                                                                className={`flex items-center justify-center px-4 py-2 rounded-full transition-all duration-300 ${
                                                                    selectedMethod === "phone"
                                                                        ? "bg-[#2c2c2c] text-[#e5b100]"
                                                                        : "text-[#666666] hover:text-[#999999]"
                                                                }`}
                                                                onClick={() => {
                                                                    resetField("email")
                                                                    setSelectedMethod("phone")
                                                                }}
                                                            >
                                                                {tApp("phone")}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className={`flex items-center justify-center px-4 py-2 rounded-full transition-all duration-300 ${
                                                                    selectedMethod === "email"
                                                                        ? "bg-[#2c2c2c] text-[#e5b100]"
                                                                        : "text-[#666666] hover:text-[#999999]"
                                                                }`}
                                                                onClick={() => {
                                                                    resetField("phone")
                                                                    setPhone('')
                                                                    setSelectedMethod("email")
                                                                }}
                                                            >
                                                                {tApp("email")}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        {selectedMethod == "phone" ? (
                                                            <>
                                                                <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">
                                                                    {tApp("phone")}
                                                                </p>
                                                                {errors?.phone && (
                                                                    <p className="text-red-500 text-[12px]">
                                                                        {errors?.phone?.message}
                                                                    </p>
                                                                )}
                                                                <PhoneInput
                                                                    {...register("phone", {
                                                                        minLength: {
                                                                            value: 5,
                                                                            message: 'Некорректный номер телефона'
                                                                        },
                                                                        maxLength: {
                                                                            value: 25,
                                                                            message: 'Некорректный номер телефона'
                                                                        },
                                                                    })}
                                                                    defaultCountry="ru"
                                                                    value={phone}
                                                                    preferredCountries={["ru", "by", "ua", "kz"]}
                                                                    onChange={(value) => {
                                                                        setPhone(value);
                                                                    }}
                                                                    inputClassName="h-[48px] py-[14px] w-full outline-none focus:border-[#e5b100] bg-[#1c1c1c] text-[#ebebeb] rounded-lg border-[#2c2c2c] px-[24px] placeholder:text-[#666666]"
                                                                    className="bg-[#1c1c1c] hover:bg-[#1c1c1c] rounded-lg [&>div]:!h-[48px]"
                                                                    style={{
                                                                        '--react-international-phone-height': '48px',
                                                                        '--react-international-phone-border-radius': '0.5rem',
                                                                        '--react-international-phone-border-color': '#2c2c2c',
                                                                        '--react-international-phone-background-color': '#1c1c1c',
                                                                        '--react-international-phone-text-color': '#ebebeb',
                                                                        '--react-international-phone-selected-background-color': '#2c2c2c',
                                                                        '--react-international-phone-dropdown-background-color': '#1c1c1c',
                                                                        '--react-international-phone-hover-background-color': '#2c2c2c',
                                                                    } as React.CSSProperties}
                                                                />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">
                                                                    {tApp("email")}
                                                                </p>
                                                                {errors?.email && (
                                                                    <p className="text-red-500 text-[12px]">
                                                                        {errors?.email?.message}
                                                                    </p>
                                                                )}
                                                                <input
                                                                    {...register("email", {
                                                                        // pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                                    })}
                                                                    className="text-[#ebebeb] px-[24px] py-[14px] duration-300 placeholder:text-[#666666] placeholder:text-[14px] placeholder:font-light bg-[#1c1c1c] w-full border border-[#2c2c2c] rounded-lg shadow-sm outline-none focus:border-[#e5b100] focus:ring-1 focus:ring-[#e5b100] sm:text-sm"
                                                                    type="email"
                                                                    name="email"
                                                                    placeholder={tApp("email")}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        {errors?.password?.message && (
                                                            <p className="text-red-500 text-[12px]">
                                                                {errors?.password?.message}
                                                            </p>
                                                        )}
                                                        <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">
                                                            {tApp("password")}
                                                        </p>
                                                        <div className="relative group">
                                                            <input
                                                                {...register("password", {required: true, minLength: 3})}
                                                                className="text-[#ebebeb] px-[24px] py-[14px] duration-300 placeholder:text-[#666666] placeholder:text-[14px] placeholder:font-light bg-[#1c1c1c] w-full border border-[#2c2c2c] rounded-lg shadow-sm outline-none focus:border-[#e5b100] focus:ring-1 focus:ring-[#e5b100] sm:text-sm"
                                                                type={showPassword ? "text" : "password"}
                                                                name="password"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#e5b100] transition-colors focus:outline-none focus:text-[#e5b100]"
                                                            >
                                                                {showPassword ? (
                                                                    <HiEyeOff size={20} />
                                                                ) : (
                                                                    <HiEye size={20} />
                                                                )}
                                                            </button>
                                                        </div>
                                                        <p
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setIsPasswordResetOpen(true);
                                                            }}
                                                            className="cursor-pointer text-[#e5b100] hover:text-[#f6c000] text-sm mt-2 transition-colors font-medium"
                                                        >
                                                            {tApp("forgot_password")}
                                                        </p>
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        className="mt-[12px] w-full py-[14px] text-center cursor-pointer text-[16px] text-black font-bold bg-[#e5b100] hover:bg-[#f6c000] active:bg-[#d4a500] duration-300 rounded-lg shadow-md"
                                                    >
                                                        {tApp("login")}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="flex md:w-[50%] mx-auto flex-col gap-[16px] mt-[72px]">
                                            <button
                                                onClick={() => setIsLoginActive(false)}
                                                className="mt-[12px] py-[12px] w-fit mx-auto text-center cursor-pointer text-[16px] text-white font-bold h-[44px] px-6 py-3 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:via-green-600 hover:to-green-700 transition-all duration-300"
                                            >
                                                {tApp("registration")}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    // Registration Form
                                    <>
                                        <div className="flex flex-col lg:flex-row px-[16px] gap-[32px] mt-[72px] mx-auto">
                                            <form onSubmit={handleSubmitRegister(submitRegister)} className="flex flex-col gap-[16px] w-full min-w-[255px]">
                                                {errorsRegister?.root?.message && (
                                                    <p className="text-red-500 text-[12px] text-center bg-red-100/10 p-2 rounded">
                                                        {errorsRegister.root.message}
                                                    </p>
                                                )}
                                                <p className="text-white font-bold text-[18px] mb-[8px]">
                                                    {tAuth("your_data")}
                                                </p>
                                                <div className="flex flex-col">
                                                    <div className="flex items-center bg-[#1c1c1c] rounded-full p-1 w-fit mx-auto mb-[16px]">
                                                        <button
                                                            type="button"
                                                            className={`flex items-center justify-center px-4 py-2 rounded-full transition-all duration-300 ${
                                                                selectedMethodRegister === "phone"
                                                                    ? "bg-[#2c2c2c] text-[#e5b100]"
                                                                    : "text-[#666666] hover:text-[#999999]"
                                                            }`}
                                                            onClick={() => {
                                                                resetFieldRegister("email")
                                                                setSelectedMethodRegister("phone")
                                                            }}
                                                        >
                                                            {tApp("phone")}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={`flex items-center justify-center px-4 py-2 rounded-full transition-all duration-300 ${
                                                                selectedMethodRegister === "email"
                                                                    ? "bg-[#2c2c2c] text-[#e5b100]"
                                                                    : "text-[#666666] hover:text-[#999999]"
                                                            }`}
                                                            onClick={() => {
                                                                resetFieldRegister("phone")
                                                                setSelectedMethodRegister("email")
                                                            }}
                                                        >
                                                            {tApp("email")}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-[16px]">
                                                    <div className="flex flex-col">
                                                        <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">
                                                            {tApp("username")}
                                                        </p>
                                                        {errorsRegister?.username && (
                                                            <p className="text-red-500 text-[12px]">
                                                                {errorsRegister.username.message}
                                                            </p>
                                                        )}
                                                        <input
                                                            {...registerRegister("username", {required: true})}
                                                            className="text-[#ebebeb] px-[24px] py-[14px] duration-300 placeholder:text-[#666666] placeholder:text-[14px] placeholder:font-light bg-[#1c1c1c] w-full border border-[#2c2c2c] rounded-lg shadow-sm outline-none focus:border-[#e5b100] focus:ring-1 focus:ring-[#e5b100] sm:text-sm"
                                                            type="text"
                                                            placeholder={tApp("username")}
                                                        />
                                                    </div>

                                                    {selectedMethodRegister === "phone" ? (
                                                        <div className="flex flex-col">
                                                            <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">
                                                                {tApp("phone")}
                                                            </p>
                                                            {errorsRegister?.phone && (
                                                                <p className="text-red-500 text-[12px]">
                                                                    {errorsRegister.phone.message}
                                                                </p>
                                                            )}
                                                            <PhoneInput
                                                                defaultCountry="ru"
                                                                preferredCountries={["ru", "by", "ua", "kz"]}
                                                                inputClassName="h-[48px] py-[14px] w-full outline-none focus:border-[#e5b100] bg-[#1c1c1c] text-[#ebebeb] rounded-lg border-[#2c2c2c] px-[24px] placeholder:text-[#666666]"
                                                                className="bg-[#1c1c1c] hover:bg-[#1c1c1c] rounded-lg [&>div]:!h-[48px]"
                                                                style={{
                                                                    '--react-international-phone-height': '48px',
                                                                    '--react-international-phone-border-radius': '0.5rem',
                                                                    '--react-international-phone-border-color': '#2c2c2c',
                                                                    '--react-international-phone-background-color': '#1c1c1c',
                                                                    '--react-international-phone-text-color': '#ebebeb',
                                                                    '--react-international-phone-selected-background-color': '#2c2c2c',
                                                                    '--react-international-phone-dropdown-background-color': '#1c1c1c',
                                                                    '--react-international-phone-hover-background-color': '#2c2c2c',
                                                                } as React.CSSProperties}
                                                                onChange={(phone) => {
                                                                    // Handle phone change
                                                                }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col">
                                                            <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">
                                                                {tApp("email")}
                                                            </p>
                                                            {errorsRegister?.email && (
                                                                <p className="text-red-500 text-[12px]">
                                                                    {errorsRegister.email.message}
                                                                </p>
                                                            )}
                                                            <input
                                                                {...registerRegister("email")}
                                                                className="text-[#ebebeb] px-[24px] py-[14px] duration-300 placeholder:text-[#666666] placeholder:text-[14px] placeholder:font-light bg-[#1c1c1c] w-full border border-[#2c2c2c] rounded-lg shadow-sm outline-none focus:border-[#e5b100] focus:ring-1 focus:ring-[#e5b100] sm:text-sm"
                                                                type="email"
                                                                placeholder={tApp("email")}
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex flex-col">
                                                    <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">
                                                        {tApp("first_name")}
                                                    </p>
                                                    {errorsRegister?.first_name && (
                                                        <p className="text-red-500 text-[12px]">
                                                            {errorsRegister.first_name.message}
                                                        </p>
                                                    )}
                                                    <input
                                                        {...registerRegister("first_name")}
                                                        className="text-[#ebebeb] px-[24px] py-[14px] duration-300 placeholder:text-[#666666] placeholder:text-[14px] placeholder:font-light bg-[#1c1c1c] w-full border border-[#2c2c2c] rounded-lg shadow-sm outline-none focus:border-[#e5b100] focus:ring-1 focus:ring-[#e5b100] sm:text-sm"
                                                        type="text"
                                                        placeholder={tApp("first_name")}
                                                    />
                                                </div>

                                                <div className="flex flex-col">
                                                    <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">
                                                        {tApp("last_name")}
                                                    </p>
                                                    {errorsRegister?.last_name && (
                                                        <p className="text-red-500 text-[12px]">
                                                            {errorsRegister.last_name.message}
                                                        </p>
                                                    )}
                                                    <input
                                                        {...registerRegister("last_name")}
                                                        className="text-[#ebebeb] px-[24px] py-[14px] duration-300 placeholder:text-[#666666] placeholder:text-[14px] placeholder:font-light bg-[#1c1c1c] w-full border border-[#2c2c2c] rounded-lg shadow-sm outline-none focus:border-[#e5b100] focus:ring-1 focus:ring-[#e5b100] sm:text-sm"
                                                        type="text"
                                                        placeholder={tApp("last_name")}
                                                    />
                                                </div>

                                                <div className="flex flex-col">
                                                    <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">
                                                        {tApp("password")}
                                                    </p>
                                                    {errorsRegister?.password && (
                                                        <p className="text-red-500 text-[12px]">
                                                            {errorsRegister.password.message}
                                                        </p>
                                                    )}
                                                    <input
                                                        {...registerRegister("password", {required: true})}
                                                        className="text-[#ebebeb] px-[24px] py-[14px] duration-300 placeholder:text-[#666666] placeholder:text-[14px] placeholder:font-light bg-[#1c1c1c] w-full border border-[#2c2c2c] rounded-lg shadow-sm outline-none focus:border-[#e5b100] focus:ring-1 focus:ring-[#e5b100] sm:text-sm"
                                                        type="password"
                                                        placeholder={tApp("password")}
                                                    />
                                                </div>

                                                <div className="flex flex-col">
                                                    <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">
                                                        {tApp("confirm_password")}
                                                    </p>
                                                    {errorsRegister?.password_confirmation && (
                                                        <p className="text-red-500 text-[12px]">
                                                            {errorsRegister.password_confirmation.message}
                                                        </p>
                                                    )}
                                                    <input
                                                        {...registerRegister("password_confirmation", {required: true})}
                                                        className="text-[#ebebeb] px-[24px] py-[14px] duration-300 placeholder:text-[#666666] placeholder:text-[14px] placeholder:font-light bg-[#1c1c1c] w-full border border-[#2c2c2c] rounded-lg shadow-sm outline-none focus:border-[#e5b100] focus:ring-1 focus:ring-[#e5b100] sm:text-sm"
                                                        type="password"
                                                        placeholder={tApp("confirm_password")}
                                                    />
                                                </div>

                                                <div className="flex flex-col">
                                                    <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">
                                                        {tApp("birthday")}
                                                    </p>
                                                    {errorsRegister?.birthday && (
                                                        <p className="text-red-500 text-[12px]">
                                                            {errorsRegister.birthday.message}
                                                        </p>
                                                    )}
                                                    <input
                                                        {...registerRegister("birthday", {required: true})}
                                                        className="text-[#ebebeb] px-[24px] py-[14px] duration-300 placeholder:text-[#666666] placeholder:text-[14px] placeholder:font-light bg-[#1c1c1c] w-full border border-[#2c2c2c] rounded-lg shadow-sm outline-none focus:border-[#e5b100] focus:ring-1 focus:ring-[#e5b100] sm:text-sm"
                                                        type="date"
                                                    />
                                                </div>

                                                <div className="flex flex-col">
                                                    <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">
                                                        {tApp("referral_code")}
                                                    </p>
                                                    {errorsRegister?.referral_code && (
                                                        <p className="text-red-500 text-[12px]">
                                                            {errorsRegister.referral_code.message}
                                                        </p>
                                                    )}
                                                    <input
                                                        {...registerRegister("referral_code")}
                                                        className="text-[#ebebeb] px-[24px] py-[14px] duration-300 placeholder:text-[#666666] placeholder:text-[14px] placeholder:font-light bg-[#1c1c1c] w-full border border-[#2c2c2c] rounded-lg shadow-sm outline-none focus:border-[#e5b100] focus:ring-1 focus:ring-[#e5b100] sm:text-sm"
                                                        type="text"
                                                        placeholder={tApp("referral_code")}
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="mt-[24px] w-full py-[14px] text-center cursor-pointer text-[16px] text-black font-bold bg-[#e5b100] hover:bg-[#f6c000] active:bg-[#d4a500] duration-300 rounded-lg shadow-md"
                                                >
                                                    {tApp("register")}
                                                </button>
                                            </form>
                                        </div>
                                        <div className="flex md:w-[50%] mx-auto flex-col gap-[16px] mt-[72px]">
                                            <button
                                                onClick={() => setIsLoginActive(true)}
                                                className="mt-[12px] py-[12px] w-fit mx-auto text-center cursor-pointer text-[16px] text-white font-bold h-[44px] px-6 py-3 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:via-green-600 hover:to-green-700 transition-all duration-300"
                                            >
                                                {tApp("login")}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            // Password Reset Form
                            <>
                                <div className="flex flex-col">
                                    <Image
                                        src="/logo.svg"
                                        alt="logo"
                                        width={185}
                                        height={52}
                                        className="place-self-center py-[12px]"
                                    />
                                    <h2 className="text-[24px] text-white font-bold text-center">
                                        {tApp("reset_password")}
                                    </h2>
                                </div>

                                {!isPasswordResetEmailSent ? (
                                    <form onSubmit={handleSubmitRemind(submitRemind)} className="mt-[72px] px-[16px]">
                                        {errorsRemind?.root?.message && (
                                            <p className="text-red-500 text-[12px] text-center bg-red-100/10 p-2 rounded mb-4">
                                                {errorsRemind.root.message}
                                            </p>
                                        )}

                                        <div className="flex flex-col">
                                            <p className="text-[12px] text-[#a1a1a1] font-semibold mb-[2px]">
                                                {tApp("email")}
                                            </p>
                                            {errorsRemind?.email && (
                                                <p className="text-red-500 text-[12px]">
                                                    {errorsRemind.email.message}
                                                </p>
                                            )}
                                            <input
                                                {...registerRemind("email", {
                                                    required: true,
                                                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                                })}
                                                className="text-[#ebebeb] px-[24px] py-[14px] duration-300 placeholder:text-[#666666] placeholder:text-[14px] placeholder:font-light bg-[#1c1c1c] w-full border border-[#2c2c2c] rounded-lg shadow-sm outline-none focus:border-[#e5b100] focus:ring-1 focus:ring-[#e5b100] sm:text-sm"
                                                type="email"
                                                placeholder={tApp("email")}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-4 mt-[24px]">
                                            <button
                                                type="submit"
                                                className="w-full py-[14px] text-center cursor-pointer text-[16px] text-black font-bold bg-[#e5b100] hover:bg-[#f6c000] active:bg-[#d4a500] duration-300 rounded-lg shadow-md"
                                            >
                                                {tApp("send_reset_link")}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsPasswordResetOpen(false);
                                                }}
                                                className="w-full py-[14px] text-center cursor-pointer text-[16px] text-[#ebebeb] font-bold bg-[#1c1c1c] hover:bg-[#2c2c2c] border border-[#2c2c2c] duration-300 rounded-lg"
                                            >
                                                {tApp("back_to_login")}
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="text-center mt-[72px] px-[16px]">
                                        <div className="bg-green-100/10 p-4 rounded-lg">
                                            <p className="text-green-500 text-lg font-medium">
                                                {tAuth("password_reset_email_sent")}
                                            </p>
                                            <p className="text-gray-300 text-sm mt-2">
                                                {tAuth("check_email_for_reset_link")}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setIsPasswordResetOpen(false);
                                                setIsPasswordResetEmailSent(false);
                                            }}
                                            className="mt-6 py-2 px-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-colors"
                                        >
                                            {tApp("back_to_login")}
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </Dialog>
        )
    } else if (isOpenConfirmEmail) {
        return (
            <Dialog open={isOpenConfirmEmail} onClose={() => setIsOpen(false)} className="relative z-50">
                <DialogBackdrop onClick={handleBackdropClick} className="fixed inset-0 bg-black opacity-90"/>
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <div
                        onClick={handleModalClick}
                        className="overflow-y-scroll w-full lg:w-[800px] h-[600px] py-[12px] lg:py-[24px] px-[8px] lg:px-[24px] bg-black border rounded-lg flex flex-col"
                    >
                        <div
                            className="p-[8px] bg-white bg-opacity-15 w-fit rounded-full mr-0 ml-auto mt-[24px] hover:scale-110 duration-300 cursor-pointer">
                            <RxCross2 onClick={() => {
                                setIsOpen(false)
                                setIsOpenConfirmEmail(false)
                            }} size={24} color="white"/>
                        </div>
                        <div className="flex flex-col">
                            <Image src='/logo.svg' alt='logo' width={185} height={52}
                                   className="place-self-center py-[12px]"/>
                            <p className="text-[24px] text-white font-bold text-center">
                                {interpolateMessage(tApp('thank_you_for_registering'),
                                    {app: process.env.NEXT_PUBLIC_APP_NAME || 'App'})}
                            </p>
                        </div>
                        <p className="text-[#ebebeb] mt-[20%] text-center text-[16px] font-semibold mt-[16px]">{tApp('account_create_confirm_email')}</p>
                    </div>
                </div>
            </Dialog>
        )
    } else if (isOpenConfirmPhone) {
        return (
            <Dialog open={isOpenConfirmPhone} onClose={() => setIsOpen(false)} className="relative z-50">
                <DialogBackdrop onClick={handleBackdropClick} className="fixed inset-0 bg-black opacity-90"/>
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <div
                        onClick={handleModalClick}
                        className="overflow-y-scroll w-full lg:w-[800px] h-[600px] py-[12px] lg:py-[24px] px-[8px] lg:px-[24px] bg-black border rounded-lg flex flex-col"
                    >
                        <div
                            className="p-[8px] bg-white bg-opacity-15 w-fit rounded-full mr-0 ml-auto mt-[24px] hover:scale-110 duration-300 cursor-pointer">
                            <RxCross2 onClick={() => {
                                setIsOpen(false)
                                setIsOpenConfirmPhone(false)
                            }} size={24} color="white"/>
                        </div>
                        <div className="flex flex-col">
                            <Image src='/logo.svg' alt='logo' width={185} height={52}
                                   className="place-self-center py-[12px]"/>
                            <p className="text-[24px] mt-[12px] text-white font-bold text-center">
                                {interpolateMessage(tApp('thank_you_for_registering'),
                                    {app: process.env.NEXT_PUBLIC_APP_NAME || 'App'})}
                            </p>
                        </div>
                        <p className="text-[#ebebeb] mt-[20%] text-center text-[16px] font-semibold mt-[16px]">{tApp('account_created_confirm_phone')}</p>
                        {/*Form for 1 input and 2 buttons (1 button is to send request to send SMS, 2 button is to send the form) input is for the code from SMS */}
                        <form onSubmit={handleSubmitConfirmPhone(onSubmitConfirmCode)}>
                            <div className="flex flex-col gap-[16px] mt-[32px] w-full">
                                <div className="flex flex-col gap-[8px]">
                                    <label
                                        className="text-[#a1a1a1] text-[12px] font-semibold">{tApp('enter_code')}</label>

                                    <input {...registerConfirmPhone('code', {
                                        required: {
                                            value: true,
                                            message: interpolateMessage(tValid('required'), {attribute: tApp('code')})
                                        }
                                    })}
                                           className="text-[#a1a1a1] text-[12px] font-semibold py-[12px] px-[16px] bg-[#1c1c1c] rounded-lg outline-none"
                                           type="text" placeholder="1234"/>
                                </div>
                                <div className="flex flex-row gap-[8px]">
                                    <button onClick={onClickSendCode}
                                            className="text-[#a1a1a1] text-[12px] font-semibold py-[12px] px-[16px] bg-[#1c1c1c] rounded-lg outline-none">{tApp('get_code')}</button>
                                    <button type="submit"
                                            className="text-[#a1a1a1] text-[12px] font-semibold py-[12px] px-[16px] bg-[#1c1c1c] rounded-lg outline-none">{tApp('send')}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog>
        )
    }
}