export interface ResponseI {
    user: {
        id: number;
        nickname: string;
        email: string;
        email_verified_at: string | null;
        success_rate: string;
        created_at: string;
        updated_at: string;
      };
      access_token: string;
      status: boolean;
}
  