'use client'

import AuthService from "@/utils/auth/AuthService";
import {useState} from "react";
import {getLocaleFromLocation, redirect} from "@/i18n/routing";

const api = new AuthService();

type ValidateTokenResponse = {
    success: boolean;
    error?: string;
};

export default function ConfirmEmail({params}: { params: { token: string } }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleConfirmEmail = async () => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            api.fetch<ValidateTokenResponse>(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/register/verify-email/${params.token}`,
                {
                    method: 'POST'
                }
            ).then(res => {
                console.log(res)
                if (res.success) {
                    setSuccess(true);
                    setTimeout(() => {
                        redirect({locale: getLocaleFromLocation(), href: '/'});
                    }, 2000); // Redirect after 2 seconds
                } else {
                    setError(res.error || "Не удалось подтвердить email. Пожалуйста, попробуйте позже.");
                }
            })
        } catch (err) {
            setError("Произошла ошибка при подтверждении email. Пожалуйста, попробуйте позже.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
            <h1 className="text-2xl font-bold mb-4">Подтверждение Email</h1>
            <p className="text-lg mb-8">Нажмите на кнопку ниже, чтобы подтвердить ваш email.</p>

            <button
                onClick={handleConfirmEmail}
                disabled={isLoading}
                className="mt-[12px] py-[12px] w-fit mx-auto text-center cursor-pointer text-[16px] text-white font-bold h-[44px] px-6 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-lg shadow-md hover:from-green-500 hover:via-green-600 hover:to-green-700 transition-all duration-300"
            >
                {isLoading ? "Загрузка..." : "Подтвердить Email"}
            </button>

            {success && (
                <p className="text-green-500 mt-4">Email успешно подтвержден! Перенаправление на главную страницу...</p>
            )}

            {error && (
                <p className="text-red-500 mt-4">{error}</p>
            )}
        </div>
    );
}