import { useEffect, useState } from "react";
import './CategoryFilter.css'

function CategoryFilter({
    selectedCategories,
    setSelectedCategories, 


}: {
    selectedCategories: (string[]);
    setSelectedCategories: (categories: string[]) => void;

}){

    const [categories, setCategories] = useState<string[]>([])

    useEffect(() => {
        const fetchCategories = async() => {
            try {
                const response = await fetch(`https://localhost:5000/api/Bookstore/Categories?${selectedCategories}`);
                const data = await response.json();
                setCategories(data);
            } catch (error){
                console.error('Error fetching categories', error);
            }
        }


        fetchCategories();
    },[])

    function handleCheckboxChange({target}: {target: HTMLInputElement}){

        const updatedCategories = selectedCategories.includes(target.value) ? selectedCategories.filter(x => x !== target.value) : [...selectedCategories, target.value];
        
        setSelectedCategories(updatedCategories);

    }
    return(
        <div className = "category-filter">
            <h4>Categories</h4>
            <div className = "category-list">
                {categories.map((c) => (
                    <div key={c} className = "category-item">
                        <input type="checkbox" id={c} value={c} className = "btn-check"
                        onChange={handleCheckboxChange}/>
                        <label className="btn btn-primary" style={{margin: '3pt', width: '120px'}} htmlFor={c}>{c}</label>
                    </div>  
            ))}
            </div>
        </div>
    );
}

export default CategoryFilter;