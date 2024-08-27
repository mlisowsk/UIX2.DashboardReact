import React from 'react'
import ReactDOM from 'react-dom'

function App(dashboard) {
  const shellFrame = dashboard.ShellFrame

  const showDefaultContent = () => {
    shellFrame.ShowDefaultContent()
  }

  return (
    <div>
      <h1>My dashboard</h1>
      <div>
        Current path: <span class="label">{shellFrame.CurrentPath}</span>
      </div>
      <button type="button" onClick={showDefaultContent}>
        Show default Content
      </button>
    </div>
  )
}

window.OnNewDashboard = (newDashboard) => {
  ReactDOM.createRoot(document.getElementById('root')).render(App(newDashboard))
}