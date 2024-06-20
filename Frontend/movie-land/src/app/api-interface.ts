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