export interface GameResponseI {
  games: {
    id: number;
    user_id: number;
    first_dice: number;
    second_dice: number;
    victory: number;
    created_at: Date;
    updated_at: Date;
  }[];
  success_rate: number;
}