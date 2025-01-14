import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, CheckCircle, Circle, Rocket } from 'lucide-react';
import { Background } from './components/Background';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    setIsAdding(true);
    setTimeout(() => {
      setTodos([...todos, {
        id: crypto.randomUUID(),
        text: newTodo,
        completed: false
      }]);
      setNewTodo('');
      setIsAdding(false);
    }, 300);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <>
      <Background />
      <div className="relative min-h-screen bg-cyber-dark/80 text-white p-4 backdrop-blur-xl">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Rocket className="w-8 h-8 text-cyber-orange animate-pulse-slow" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyber-orange to-cyber-purple bg-clip-text text-transparent">
              Cyber Tasks
            </h1>
          </div>

          {/* Add Todo Form */}
          <form onSubmit={addTodo} className="mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter a new task..."
                className="flex-1 bg-cyber-gray/50 border-2 border-cyber-purple/30 rounded-lg px-4 py-2 focus:outline-none focus:border-cyber-purple transition-all backdrop-blur-lg"
              />
              <button
                type="submit"
                disabled={isAdding}
                className={`bg-cyber-purple hover:bg-cyber-purple/80 px-6 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  isAdding ? 'opacity-50' : ''
                }`}
              >
                <PlusCircle className={`w-5 h-5 ${isAdding ? 'animate-spin' : ''}`} />
                Add
              </button>
            </div>
          </form>

          {/* Todo List */}
          <div className="space-y-3">
            {todos.map((todo, index) => (
              <div
                key={todo.id}
                className="bg-cyber-gray/50 p-4 rounded-lg flex items-center justify-between group hover:bg-cyber-gray/70 transition-all backdrop-blur-lg animate-fade-in"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="text-cyber-orange hover:text-cyber-purple transition-colors"
                  >
                    {todo.completed ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  <span 
                    className={`${
                      todo.completed 
                        ? 'line-through text-gray-500' 
                        : 'text-white'
                    } transition-all`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {todos.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <p>No tasks yet. Add some to get started!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;