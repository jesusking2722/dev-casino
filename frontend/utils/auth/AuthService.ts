import {getLocaleFromLocation} from "@/i18n/routing";
import {User} from "@/utils/types/User";

const isTokenExpired = (token: string) => {
    try {
        const decoded = JSON.parse(atob(token.split('.')[1]))
        if (decoded.exp < Date.now() / 1000) {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.error(e)
        return false
    }
}

export default class AuthService {
    private domain: string | undefined;

    constructor() {
        this.domain = process.env.NEXT_PUBLIC_BASE_API_URL
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    login(login: string, password: string) {
        // Get a token
        return this.fetch(`${this.domain}/api/login`, {
            method: 'POST',
            body: JSON.stringify({
                login,
                password
            }),
            headers: {
                'Accept-Language': navigator.language
            }
        }).then(res => {
            this.setToken(res.token.access_token)
            return this.fetch(`${this.domain}/api/me`, {
                method: 'GET'
            })
        }).then(res => {
            this.setProfile(res.user)
            return Promise.resolve(res.user)
        })
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        return !!token && !isTokenExpired(token) // handwaiving here
    }

    // TODO: Create type for profile
    setProfile(profile: User) {
        // Saves profile data to localStorage
        localStorage.setItem('profile', JSON.stringify(profile))
    }

    getProfile(): User {
        // Retrieves the profile data from localStorage
        const profile = localStorage.getItem('profile')
        return profile ? JSON.parse(localStorage.profile) : {}
    }

    setToken(idToken: string) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    setRefreshToken(refreshToken: string) {
        // Saves user token to localStorage
        localStorage.setItem('refresh_token', refreshToken)
    }

    getRefreshToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('refresh_token')
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
    }

    _checkStatus(response: any) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            const error = new Error(response.statusText);
            error.message = response
            throw error
        }
    }

    fetch<Type>(url: string, options?: RequestInit): Promise<Type> {
        // performs api calls sending the required authentication headers
        const headers: any = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': getLocaleFromLocation()
        }

        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            // .then(this._checkStatus)
            .then(response => response.json())
    }
}