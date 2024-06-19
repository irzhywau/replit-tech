interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const fakeTodos: Todo[] = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Learn TypeScript', completed: true },
  { id: 3, text: 'Build a Todo App', completed: false },
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