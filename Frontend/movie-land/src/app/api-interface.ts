export interface User {
    phone_number: number | null
    email: string
    user_name: string
    plain_text_password: string
}

export interface movie {
    id: number
    image_address: string
    title: string
    genre: string
    rating: string
    description: string
}

export interface Comment {
    id: number
    date: string
    text: string
}

export interface test_movie{
    id: number
    rating: string
    trailer_link: string
    budget: number
    duration: number
    title: string
    description: string
    cover_link: string
    date: string
    language: string
    article_link: string
}