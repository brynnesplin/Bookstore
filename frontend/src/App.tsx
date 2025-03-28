import './App.css'
import AddBookPage from './pages/AddBookPage'
import BookshelfPage from './pages/BookshelfPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CartPage from './pages/CartPage'
import { CartProvider } from './context/CartContext'

function App() {


  return (
    <>
    <CartProvider>
        <Router>
        <Routes>
          <Route path="/" element ={<BookshelfPage/>}/>
          <Route path="/bookshelf" element ={<BookshelfPage/>}/>
          <Route path="/addItem/:bookTitle/:bookId/:bookPrice" element = {<AddBookPage/>}/>
          <Route path="/cart" element = {<CartPage/>}/>
        </Routes>
      </Router>
    </CartProvider>


    </>
  )
}

export default App
