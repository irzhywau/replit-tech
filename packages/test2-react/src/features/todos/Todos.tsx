/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-extra-boolean-cast */
import { useEffect } from "react"
import { useTodos } from "./todoSlice"

export const Todos = () => {
  const { dataset, processing: isProcessing, error, fetchTodos, paginate, total } = useTodos();  

  useEffect(() => {
    fetchTodos(paginate)
  }, [paginate.offset, paginate.limit])

  const handleLoadNext = () => {
    // @todo: implment this flow
    // When this component is loaded, it try to fetch 1st slice of data
    // next dataset should be appended to previous one
    // clue: use `retrieveNextPage` located at: ./features/todos/todoSlice.ts
    console.error('Not yet implemented')
  }

  if (Boolean(error)) {
    return (
      <div>
        <h1>There was an error!!!</h1>
        <p>{error?.message}</p>
      </div>
    )
  }

  if (dataset) {
    return (
      <div className="Todo-section">
        {total && (
          <div>Total: {total}</div>
        )}
        <ul>
          {dataset.map(({ id, title, completed }) => (
            <li key={id}>[{completed ? 'x' : ' '}] #{id} - {title}</li>
          ))}
        </ul>
        {
          isProcessing && (
            <p>loading...</p>
          )
        }
        <button onClick={handleLoadNext}>Load Next</button>
      </div>
    )
  }

  return null
}
