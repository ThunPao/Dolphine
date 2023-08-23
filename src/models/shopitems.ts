export interface ShopCommand {
  title: string;
  rcon_command: string;
  visibled: boolean; // Or boolean if it's a boolean value
}

export interface ShopItem {
  id: number;
  name: string;
  description: string;
  limits: number;
  buycount: number;
  commands: ShopCommand[]; // Array of ShopCommand objects
  point: number;
  href: string | null;
  sale_date: string | null;
  expired_date: string | null;
}
