import { useState, useEffect } from 'react'
import { Todo, Priority, Filter } from '../types'

const STORAGE_KEY = 'todoflow-todos'

function loadTodos(): Todo[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    return JSON.parse(stored).map((t: Todo) => ({
      ...t,
      createdAt: new Date(t.createdAt),
    }))
  } catch {
    return []
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string, priority: Priority, category: string) => {
    if (!text.trim()) return
    const todo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      priority,
      category,
      createdAt: new Date(),
    }
    setTodos(prev => [todo, ...prev])
  }

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const editTodo = (id: string, text: string) => {
    if (!text.trim()) return
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, text: text.trim() } : t))
    )
  }

  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed))
  }

  const filtered = todos.filter(t => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !t.completed) ||
      (filter === 'completed' && t.completed)
    const matchesSearch = t.text.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  }

  return {
    todos: filtered,
    filter,
    search,
    stats,
    setFilter,
    setSearch,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
  }
}
