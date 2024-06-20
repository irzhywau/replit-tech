import { createAsyncThunk } from '@reduxjs/toolkit';
import type { TodoPaginateQuery, User, Todo } from './types'

const api = {
  fetchUserById: async(id: string): Promise<User> => {
    const response = await fetch('https://graphqlzero.almansi.me/api', {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        query: `
        query GetUserById($id: ID!) {
          user(id: $id) {
            id
            username
            email
          }
        }`,
        variables: {
          id
        }
      })
    });

    return (await response.json()).data?.user;
  },
  fetchTodos: async (query: TodoPaginateQuery): Promise<{meta: {totalCount: number;}, dataset: Todo[]}> => {
    const response = await fetch('https://graphqlzero.almansi.me/api', {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        query: `
        query GetTodos($options: PageQueryOptions) {
          todos(options: $options) {
            meta {
              totalCount
            }
            dataset: data {
              id
              title
              completed
              user {
                id
              }
            }
          }
        }`,
        variables: {
          "options": {
            "sort": {
              "field": "title",
              "order": "ASC"
            },
            "slice": {
              "start": query.offset,
              "limit": query.limit
            }
          }
        }
      })
    });

    return (await response.json()).data?.todos;
  }
}

export const fetchTodos = createAsyncThunk(
  'todos/fetch', 
  async(query: TodoPaginateQuery) => {
    // @todo: add user details into the .dataset by leveraging on `.user.id` value
    // use api.fetchUserById
    return await api.fetchTodos(query);
  }
)