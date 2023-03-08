export interface GameI {
    "message": string,
    "game": {
        "user_id": string,
        "first_dice": string,
        "second_dice": string,
        "victory": boolean,
        "updated_at": string,
        "created_at": string,
        "id": string
    },
    "success_rate": string,
}
