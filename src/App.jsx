import React from 'react'
import './App.css'
import TodoList from './components/TodoList'

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p>Organize your tasks efficiently</p>
      </header>
      <main className="app-main">
        <TodoList />
      </main>
      <footer className="app-footer">
        <p>© 2024 Task Manager. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
