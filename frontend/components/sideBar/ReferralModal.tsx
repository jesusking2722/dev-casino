import AuthService from "@/utils/auth/AuthService";
import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";

const api = new AuthService();

type PaidBonus = {
    id: number;
    referrer_id: number;
    referral_id: number;
    rule_id: number;
    amount_referrer: string;
    amount_referral: string;
    status: string;
    created_at: string;
    updated_at: string;
    rule: {
        id: number;
        name: string;
        type: string;
        referrer_bonus: string;
        referral_bonus: string;
        min_deposit: string;
        max_bonus: string;
        is_active: number;
    };
}

type Referral = {
    username: string;
    paidBonuses: PaidBonus[];
    totalBonuses: string | number;
    totalDeposits: number;
}

type GetReferralStatsResponse = {
    success: boolean;
    code?: string | null;
    totalReferrals?: number;
    activeReferrals?: number;
    totalBonus?: string | number;
    totalDeposits?: number;
    referralStats?: Referral[];
    error?: string;
};

type UpdateReferralCodeResponse = {
    success: boolean;
    error?: string;
};

type ReferralStats = {
    code: string | null;
    totalInvited: number;
    activeReferrals: number;
    totalBonuses: string | number;
    totalDeposits: number;
    referralStats: Referral[];
};

export default function ReferralModal() {
    const tApp = useTranslations('app');
    const tValid = useTranslations('validation');

    const [stats, setStats] = useState<ReferralStats>({
        code: null,
        totalInvited: 0,
        activeReferrals: 0,
        totalBonuses: 0,
        totalDeposits: 0,
        referralStats: []
    });
    const [newCode, setNewCode] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState<boolean>(false);

    useEffect(() => {
        fetchReferralStats();
    }, []);

    const fetchReferralStats = () => {
        api.fetch<GetReferralStatsResponse>(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/me/getReferralStats`)
            .then(res => {
                if (res.success) {
                    setStats({
                        code: res.code || null,
                        totalInvited: res.totalReferrals || 0,
                        totalBonuses: res.totalBonus || 0,
                        activeReferrals: res.activeReferrals || 0,
                        totalDeposits: res.totalDeposits || 0,
                        referralStats: res.referralStats || []
                    });
                    setNewCode(res.code || '');
                    setError(null);
                    console.log('Referral stats:', res);
                } else {
                    setError(res.error || "Не удалось загрузить данные. Пожалуйста, попробуйте позже.");
                }
            })
            .catch((err) => {
                console.error('Error fetching referral stats:', err);
                setError("Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже.");
            });
    };

    const handleUpdateCode = () => {
        if (!newCode.trim()) {
            setError("Реферальный код не может быть пустым.");
            return;
        }

        api.fetch<UpdateReferralCodeResponse>(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/me/updateReferralCode`, {
            method: "POST",
            body: JSON.stringify({
                referral_code: newCode,
            }),
        })
            .then(res => {
                if (res.success) {
                    setStats(prevStats => ({...prevStats, code: newCode}));
                    setIsEditing(false);
                    setError(null);
                } else {
                    setError(res.error || "Не удалось обновить реферальный код. Пожалуйста, попробуйте позже.");
                }
            })
            .catch(() => {
                setError("Произошла ошибка при обновлении кода. Пожалуйста, попробуйте позже.");
            });
    };

    const handleGenerateCode = () => {
        const generatedCode = `REF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

        api.fetch<UpdateReferralCodeResponse>(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/me/updateReferralCode`, {
            method: "POST",
            body: JSON.stringify({
                referral_code: generatedCode,
            }),
        })
            .then(res => {
                if (res.success) {
                    setStats(prevStats => ({...prevStats, code: generatedCode}));
                    setNewCode(generatedCode);
                    setError(null);
                } else {
                    setError(res.error || "Не удалось сгенерировать код. Пожалуйста, попробуйте позже.");
                }
            })
            .catch(() => {
                setError("Произошла ошибка при генерации кода. Пожалуйста, попробуйте позже.");
            });
    };

    const handleCopyCode = () => {
        if (stats.code) {
            navigator.clipboard.writeText(stats.code)
                .then(() => {
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                })
                .catch(() => {
                    setError("Не удалось скопировать код. Пожалуйста, попробуйте еще раз.");
                });
        }
    };

    return (
        <div className="p-4">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">{tApp('referral_program')}</h2>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">{tApp('your_referral_code')}</h3>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        {stats.code === null ? (
                            <div className="flex flex-col gap-2">
                                <p className="text-gray-600">{tApp('no_referral_code')}</p>
                                <button
                                    onClick={handleGenerateCode}
                                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                >
                                    {tApp('generate_code')}
                                </button>
                            </div>
                        ) : isEditing ? (
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newCode}
                                        onChange={(e) => setNewCode(e.target.value)}
                                        className="text-xl font-mono text-black p-2 border rounded"
                                    />
                                    <button
                                        onClick={handleUpdateCode}
                                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                    >
                                        {tApp('save')}
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                                    >
                                        {tApp('cancel')}
                                    </button>
                                </div>
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                            </div>
                        ) : (
                            <div className="flex justify-between items-center">
                                <p className="text-xl font-mono text-black">{stats.code}</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleCopyCode}
                                        className="bg-[#018642] hover:bg-[#01c365] text-white p-2 rounded-lg"
                                    >
                                        {isCopied ? tApp('copied') : tApp('copy')}
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="p-2 text-center cursor-pointer text-[16px] text-[#050508] font-bold h-[44px] bg-yellow-500 hover:bg-yellow-400 duration-300 rounded-lg"
                                    >
                                        {tApp('edit')}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{tApp('share_code_message')}</p>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{tApp('general_statistics')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">{tApp('total_invited')}</p>
                        <p className="text-xl font-bold text-black">{stats.totalInvited}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">{tApp('active_referrals')}</p>
                        <p className="text-xl font-bold text-black">{stats.activeReferrals}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">{tApp('total_bonuses')}</p>
                        <p className="text-xl font-bold text-black">{stats.totalBonuses} THB</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">{tApp('total_deposits')}</p>
                        <p className="text-xl font-bold text-black">{stats.totalDeposits} THB</p>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{tApp('your_referrals')}</h3>
                <div className="overflow-x-auto">
                    {stats.referralStats && stats.referralStats.length > 0 ? (
                        <table className="min-w-full bg-white rounded-lg overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-700">{tApp('username')}</th>
                                    <th className="px-4 py-2 text-left text-gray-700">{tApp('deposits')}</th>
                                    <th className="px-4 py-2 text-left text-gray-700">{tApp('bonuses')}</th>
                                    <th className="px-4 py-2 text-left text-gray-700">{tApp('recent_payments')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.referralStats.map((referral, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="px-4 py-2 text-gray-700">{referral.username}</td>
                                        <td className="px-4 py-2 text-gray-700">{Number(referral.totalDeposits).toFixed(2)} THB</td>
                                        <td className="px-4 py-2 text-gray-700">{Number(referral.totalBonuses).toFixed(2)} THB</td>
                                        <td className="px-4 py-2">
                                            <div className="space-y-1">
                                                {referral.paidBonuses.length > 0 ? (
                                                    referral.paidBonuses.map((bonus, idx) => (
                                                        <div key={idx} className="text-sm">
                                                            <p className="font-medium text-gray-700">
                                                                {bonus.rule.name}: {Number(bonus.amount_referrer).toFixed(2)} THB
                                                            </p>
                                                            <p className="text-gray-500 text-xs">
                                                                {new Date(bonus.created_at).toLocaleDateString()} • 
                                                                {bonus.status === 'paid' ? (
                                                                    <span className="text-green-600"> {tApp('paid')}</span>
                                                                ) : (
                                                                    <span className="text-yellow-600"> {tApp('pending')}</span>
                                                                )}
                                                            </p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-sm text-gray-500">{tApp('no_payments')}</p>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-4 text-gray-500">
                            {tApp('no_referrals')}
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{tApp('bonus_payment_history')}</h3>
                <div className="space-y-2">
                    {stats.referralStats && stats.referralStats.some(ref => ref.paidBonuses.length > 0) ? (
                        stats.referralStats
                            .reduce((allBonuses, referral) => [
                                ...allBonuses,
                                ...referral.paidBonuses.map(bonus => ({
                                    ...bonus,
                                    username: referral.username
                                }))
                            ], [] as (PaidBonus & { username: string })[])
                            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                            .map((bonus, index) => (
                                <div key={index} className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-gray-700">{bonus.username}</p>
                                        <p className="text-sm text-gray-600">
                                            {bonus.rule.type === 'deposit' ? tApp('deposit') : tApp('registration')} • {new Date(bonus.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-700">{Number(bonus.amount_referrer).toFixed(2)} THB</p>
                                        <p className={`text-sm ${
                                            bonus.status === 'paid' 
                                                ? 'text-green-600' 
                                                : 'text-yellow-600'
                                        }`}>
                                            {bonus.status === 'paid' ? tApp('paid') : tApp('pending')}
                                        </p>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div className="text-center py-4 text-gray-500">
                            {tApp('no_payment_history')}
                        </div>
                    )}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">{tApp('how_it_works')}</h3>
                <ul className="list-disc list-inside text-gray-700">
                    <li>{tApp('share_code_instruction')}</li>
                    <li>{tApp('first_deposit_bonus_instruction')}</li>
                    <li>{tApp('deposit_percentage_instruction')}</li>
                    <li>{tApp('more_referrals_more_income')}</li>
                </ul>
            </div>
        </div>
    );
}