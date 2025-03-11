// utils/withAuth.js - a HOC for protected pages
import React, {Component} from 'react'
import AuthService from './AuthService'
import {getLocaleFromLocation, redirect} from "@/i18n/routing";

export default function withAuth(AuthComponent: any) {
    const Auth = new AuthService()
    return class Authenticated extends Component {
        constructor(props: any) {
            super(props)
            this.state = {
                isLoading: true
            };
        }

        componentDidMount() {
            if (!Auth.loggedIn()) {
                redirect({href: '/', locale: getLocaleFromLocation()})
            }
            this.setState({isLoading: false})
        }

        render() {
            // @ts-ignore
            return (
                <div>
                    {this.state.isLoading ? (
                        <div>LOADING....</div>
                    ) : (
                        <AuthComponent {...this.props} auth={Auth}/>
                    )}
                </div>
            )
        }
    }
}