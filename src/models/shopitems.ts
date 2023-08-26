export interface ShopCommand {
  title: string;
  rcon_command: string;
  visibled: boolean; // Change to boolean if applicable
}


export interface ShopItem {
  id: number;
  name: string;
  description: string;
  limits: number | null;
  buycount: number;
  commands: ShopCommand[]; // Array of ShopCommand objects
  point: number;
  href: string | null;
  sale_date: string | null;
  expired_date: string | null;
  toggled: string;
}
