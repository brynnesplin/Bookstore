import './App.css'
import AddBookPage from './pages/AddBookPage'
import BookshelfPage from './pages/BookshelfPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element ={<BookshelfPage/>}/>
        <Route path="/addItem" element = {<AddBookPage/>}/>
      </Routes>
    </Router>

    </>
  )
}

export default App
