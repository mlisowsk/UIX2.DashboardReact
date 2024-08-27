import React from 'react'
import ReactDOM from 'react-dom'

function App(dashboard) {
  const shellFrame = dashboard.ShellFrame

  return (
    <div>
      <h1>My dashboard</h1>
      <div>
        Current path: <span class="label">{shellFrame.CurrentPath}</span>
      </div>
    </div>
  )
}

window.OnNewDashboard = (newDashboard) => {
  ReactDOM.createRoot(document.getElementById('root')).render(App(newDashboard))
}