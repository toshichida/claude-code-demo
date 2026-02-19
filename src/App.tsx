import { AnimatePresence, motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { useTodos } from './hooks/useTodos'
import { TodoInput } from './components/TodoInput'
import { TodoItem } from './components/TodoItem'
import { FilterBar } from './components/FilterBar'
import { StatsBar } from './components/StatsBar'
import { EmptyState } from './components/EmptyState'

export default function App() {
  const {
    todos,
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
  } = useTodos()

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Background */}
      <div className="fixed inset-0 bg-[#0a0a14]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl" />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* App */}
      <div className="relative w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="p-1.5 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/30">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Todo<span className="text-violet-400">Flow</span>
            </h1>
          </div>
          <p className="text-xs text-white/30">Stay organized, stay focused</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-4"
        >
          <StatsBar stats={stats} />
        </motion.div>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <TodoInput onAdd={addTodo} />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-4"
        >
          <FilterBar
            filter={filter}
            search={search}
            stats={stats}
            onFilterChange={setFilter}
            onSearchChange={setSearch}
            onClearCompleted={clearCompleted}
          />
        </motion.div>

        {/* Todo list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-2 max-h-[50vh] overflow-y-auto pr-1"
        >
          <AnimatePresence mode="popLayout">
            {todos.length === 0 ? (
              <EmptyState filter={filter} hasSearch={search.length > 0} />
            ) : (
              todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-[11px] text-white/15 mt-6"
        >
          {stats.total > 0
            ? `${stats.active} task${stats.active !== 1 ? 's' : ''} remaining`
            : 'Your tasks, your flow'}
        </motion.p>
      </div>
    </div>
  )
}
