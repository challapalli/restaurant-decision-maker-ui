export interface Restaurant {
    id: number,
    name: string,
    sessionId: number
}

export interface Session {
    id: number,
    ended: boolean
}

export interface UserAuth {
    username: string;
    token: string;
}

export interface UserLogin {
    username: string;
    password: string;
}