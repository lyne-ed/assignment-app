export class User {
  username!: string;
  password!: string;
  role!: 'user' | 'admin';
  token?: string;
}
