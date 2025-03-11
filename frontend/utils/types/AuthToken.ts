export type AuthToken = {
    accessToken: string
    token: {
        id: string
        user_id: number
        client_id: string
        name: string
        scopes: any[]
        revoked: boolean
        created_at: Date
        updated_at: Date
        expires_at: Date
    }
}
