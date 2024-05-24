import React from 'react'
import ReactDOM from 'react-dom/client'
import  App  from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
      <App />
      // retirei o strict.mode para que não realizasse duas consultas desnecessárias a api.
)
