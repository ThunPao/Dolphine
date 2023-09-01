export interface Commands {
  title: string;
  rcon_command: string;
  visibled: boolean; // Change to boolean if applicable
}

export interface RedeemCode {
  id: number;
  code: string;
  toggle_status: number;
  expires_at: string | null;
  uses_limit: number | null;
  uses_count: number;
  commands: Commands[];
  created_at: string | null;
  updated_at: string | null;
}
