export interface User {
  id: string;
  username?: string;
  email?: string;
}

export interface Todo {
  id: string;
  title: string;
  completed?: boolean;
  user?: User;
}

export interface TodoPaginateQuery {
  offset: number;
  limit: number;
}