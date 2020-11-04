export interface User {
    name: string;
    password: string;
}

export interface Tower {
    id: string;
    name: string;
    floors: number;
    feet: number;
    meter: number;
    src: string;
}

export interface MinTower {
    id: string;
    name: string;
}

export interface TowerListResponse {
    towers: MinTower[];
    firstTower: Tower;
}

export interface SingleTowerResponse {
    tower: Tower | null;
}

export interface FunctionsResponse { 
    data: any;
    status: ResponseStatus
}

export interface ResponseCalls {
    error: { code: number, message?: string}
    data: any,
    user: string
}



export enum ResponseStatus {
    SUCCESS = "SUCCESS",
    FAIL = "FAIL",
    BAD_CONTENT = "BAD_CONTENT",
    NO_USER = "NO_USER",
}

export interface GetTowerPayload {
    towerId: string;
}

