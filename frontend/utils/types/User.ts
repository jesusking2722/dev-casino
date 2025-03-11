// "user": {
//         "id": 1,
//         "email": "johnvi2833@gmail.com",
//         "username": "Admin",
//         "parent_id": 0,
//         "inviter_id": 0,
//         "first_name": null,
//         "last_name": null,
//         "phone": "",
//         "phone_verified": 0,
//         "rating": 0,
//         "avatar": "",
//         "address": "0.0000",
//         "role_id": 6,
//         "shop_id": 1,
//         "birthday": null,
//         "balance": "0.0000",
//         "tournaments": "0.0000",
//         "happyhours": "0.0000",
//         "refunds": "0.0000",
//         "progress": "0.0000",
//         "daily_entries": "0.0000",
//         "invite": "0.0000",
//         "welcomebonus": "0.0000",
//         "smsbonus": "0.0000",
//         "wheelfortune": "0.0000",
//         "count_balance": "0.0000",
//         "count_tournaments": "0.0000",
//         "count_happyhours": "0.0000",
//         "count_refunds": "0.0000",
//         "count_progress": "0.0000",
//         "count_daily_entries": "0.0000",
//         "count_invite": "0.0000",
//         "count_welcomebonus": "0.0000",
//         "count_smsbonus": "0.0000",
//         "count_wheelfortune": "0.0000",
//         "total_in": 0,
//         "total_out": 0,
//         "last_login": "2025-01-08 20:39:54",
//         "confirmation_token": null,
//         "sms_token": null,
//         "sms_token_date": "2021-03-31 05:58:56",
//         "status": "Active",
//         "is_blocked": 0,
//         "is_demo_agent": 0,
//         "agreed": 0,
//         "free_demo": 0,
//         "api_token": null,
//         "auth_token": "An1k7bqK52OatQp1vEa9x2ssLYMxbOXH2iZZcgiB7hd8FNHED48nDVG51RN23Znn",
//         "google2fa_enable": 1,
//         "google2fa_secret": "",
//         "session": "",
//         "last_online": "2025-01-05 15:19:51",
//         "last_bid": "2021-03-24 14:09:06",
//         "last_progress": "2021-05-11 19:30:38",
//         "last_daily_entry": "2021-01-26 13:21:34",
//         "last_wheelfortune": "2021-03-25 23:31:19",
//         "created_at": "2020-01-29T14:00:00.000000Z",
//         "updated_at": "2025-01-08T20:39:54.000000Z"
//     }

export type User = {
    id: number
    email: string
    username: string
    parent_id: number | null
    inviter_id: number | null
    first_name: string | null
    last_name: string | null
    phone: string | null
    phone_verified: boolean | null
    rating: number
    avatar: string | null
    address: string | null
    role_id: number | null
    shop_id: number | null
    birthday: string | null
    balance: string
    tournaments: string
    happyhours: string
    refunds: string
    progress: string
    daily_entries: string
    invite: string
    welcomebonus: string
    smsbonus: string
    wheelfortune: string
    count_balance: string
    count_tournaments: string
    count_happyhours: string
    count_refunds: string
    count_progress: string
    count_daily_entries: string
    count_invite: string
    count_welcomebonus: string
    count_smsbonus: string
    count_wheelfortune: string
    total_in: number
    total_out: number
    last_login: Date
    confirmation_token: string | null
    sms_token: string | null
    sms_token_date: Date
    status: string
    is_blocked: boolean
    is_demo_agent: boolean
    agreed: number
    free_demo: number
    session: string
    last_online: Date
    last_bid: Date
    last_progress: Date
    last_daily_entry: Date
    last_wheelfortune: Date
    created_at: Date
    updated_at: Date
}