export interface UserData {
  uid: string;
  email: string;
  username: string;
  [key: string]: unknown; // Используйте `unknown`, если структура не фиксирована
}
