export interface Game {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  level: number;
  experience: number;
  ownedGames: number[];
}

export interface CartItem {
  gameId: number;
  quantity: number;
}