interface User {
  id: number;
  name: string;
  age: number;
  gender: string;
}

export type RequestUser = Omit<User, "id">;

export default User;
