import { addHours } from "./utils";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  deadline: Date;
  start?: boolean;
  timeLeft?: string;
}

const fakeTodos: Todo[] = [
  { id: 1, text: 'Learn React', completed: false, deadline: addHours(new Date(), 6) },
  { id: 2, text: 'Learn TypeScript', completed: false, deadline: addHours(new Date(), 6) },
  { id: 3, text: 'Build a Todo App', completed: false, deadline: addHours(new Date(), 6) },
];

const api = {
  get: async (url: string): Promise<{ data: Todo[] }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url === '/todos') {
          resolve({ data: fakeTodos });
        } else {
          reject(new Error('Not Found'));
        }
      }, 1000);
    });
  },
};

export default api;