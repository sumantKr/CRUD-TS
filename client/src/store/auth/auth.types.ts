
export interface AuthState {
    user: {
        name: string,
        email: string,
        isTwofactorAuthenticationEnabled: boolean
    } | {},
    isLoggedIn: boolean
}
