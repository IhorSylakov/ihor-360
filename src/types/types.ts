export interface UserData {
  uid: string;
  email: string;
  username: string;
  [key: string]: unknown; // Используйте `unknown`, если структура не фиксирована
}

export interface Country {
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
}

export interface Place {
  id: string;
  name: string;
}

export interface Photo {
  id: string;
  panorama: string;
  thumbnail: string;
  title: string;
  hide?: boolean;
  likes?: number;
  description?: string;
}
