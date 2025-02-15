export interface UserData {
  uid: string;
  email: string;
  username: string;
  [key: string]: unknown; // Используйте `unknown`, если структура не фиксирована
}

export interface Country {
  id: string;
  name: string;
  description?: string;
  visitDate?: string;
}

export interface City {
  id: string;
  name: string;
  description?: string;
  visitDate?: string;
  notes?: string;
  imageUrl?: string;
}

export interface Place {
  id: string;
  name: string;
  description?: string;
  visitDate?: string;
  notes?: string;
  imageUrl?: string;
}

export interface Photo {
  id?: string;
  imageUrl: string;
  isHidden: boolean;
  isPano: boolean;
  name?: string;
  description?: string;
  previewUrl?: string;
  order: number;
}

export interface listItem {
  image?: string,
  icon?: string,
  title: string,
  text: string,
}
