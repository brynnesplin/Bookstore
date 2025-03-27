import { useState } from 'react'
import './App.css'
import Bookshelf from './Bookshelf'
import CategoryFilter from './CategoryFilter'
import Title from './Title'

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])


  return (
    <>
    <div className='container'>
      <div className='row'>
        <Title/>
      </div>
      <div className='row'>
       <div className='col-md-3'>
        <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
       </div>
       <div className='col-md-9'>
        <Bookshelf selectedCategories = {selectedCategories}/>
       </div>
        </div> 
      
    
    </div>

    </>
  )
}

export default App
