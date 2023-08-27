export interface RedeemCode {
  id: number;
  code: string;
  toggle_status: number;
  expires_at: string | null;
  uses_limit: number;
  uses_count: number;
  rcon_command: string | null;
  created_at: string | null;
  updated_at: string | null;
}
