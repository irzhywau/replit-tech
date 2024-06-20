import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { fetchTodos } from './api'
import type { Todo, TodoPaginateQuery } from './types'

interface TodoState {
  processing?: boolean;
  error?: Error;

  dataset: Todo[];
  paginate: TodoPaginateQuery,
  total?: number;
}

const initialState = {
  dataset: [],
  processing: false,
  paginate: {
    offset: 0,
    limit: 5
  },
} as TodoState;

const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    retrieveNextPage(state, action) {
      // @todo: use this in as entrypoint when we want get next page dataset
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action: PayloadAction<{dataset: Todo[]; meta: {totalCount: number}}>) => {
      state.dataset = action.payload.dataset;
      state.total = action.payload.meta.totalCount;
      state.processing = false;
    })
  },
})

export const { reducer, actions } = slice;
export const { retrieveNextPage } = actions;
export const useTodos = () => {
  const dispatch = useAppDispatch();
  const todosState = useAppSelector((state) => state.todos)

  return {
    fetchTodos: (q: TodoPaginateQuery) => dispatch(fetchTodos(q)),
    ...todosState
  }
}