export interface JwtResponseI {
    dataUser: {
        id: string,
        rol: string,
        accessToken: string,
        expiresIn: string
    },
    message: string
}