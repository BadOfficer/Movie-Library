export interface IUserRegistration {
    first_name: string
    last_name: string
    email: string
    password: string
}

export interface IResponseUserRegistration {
    id: number | undefined
    first_name: string | undefined
    last_name: string | undefined
    email: string | undefined
    password: string | undefined
    role: string | undefined
}

export interface IUser {
    email: string
    role: string
}

export interface IUserLogin {
    email: string,
    password: string
}

export interface IResponseUserLogin {
    access_token: string
    user: IUser
}

export interface IGenre {
    id: number,
    title: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    movies: []
}

export interface IGenreInput {
    id?: number;
    title: string,
    description: string
}

export interface IMovie {
    id: number;
    title: string;
    description: string;
    images: string[];
    rating: string;
    release: string;
    seasons: number;
    series: number;
    duration: string;
}

export interface IMoviesResponse<T> {
    count: number;
    rows: IMovie[];
}

export interface IUserData {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

export interface IUserUpdate {
    first_name: string
    last_name: string
    email: string
    password: string;
    oldPassword: string;
}

export interface ILiked {
    movies: IMovie[];
    userId: number;
}

export interface IActionSaved {
    movieId: number;
}

export interface IBookmarks {
    movies: IMovie[];
    userId: number;
}
