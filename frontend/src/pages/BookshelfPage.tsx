import { useState } from 'react'
import Bookshelf from '../components/Bookshelf'
import CategoryFilter from '../components/CategoryFilter'
import Title from '../components/Title'

function BookshelfPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])


  return (
    <>
    <div className='container'>
        <Title/>
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

export default BookshelfPage
