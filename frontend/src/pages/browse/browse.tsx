import { JSX, useState } from 'react';
import Cards from '../../components/cards/cards';
import { Button } from 'react-bootstrap';

interface Categories {
    id : number,
    name : string,
    parent_id? : number,
    categories? : Categories[]
}

const categories : Categories[] = [
    {
        id : 1,
        name : "Tas Wanita",
        categories : [
            {
                id: 6,
                name: "Tas Bahu wanita",
                parent_id : 1
            },
            {
                id: 7,
                name: "Tas Koper wanita",
                parent_id : 1
            }
        ]
    },
    {
        id: 2,
        name: "Tas Pria",
        categories: [
            {
                id: 4,
                name: "Tas Ransel Pria",
                parent_id: 2
            },
            {
                id: 5,
                name: "Tas Bahu Pria",
                parent_id: 2
            },
            {
                id: 8,
                name: "Tas Koper Pria",
                parent_id: 2
            }
        ]
    }
]


export default function Browse() : JSX.Element {
    const [categoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number | null>(null);
    const [subCategories, setSubCategories] = useState<Categories[]>([]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = Number(e.target.value);
        setSelectedCategoryId(categoryId);
    
        // Find the selected category and its subcategories
        const selectedCategory = categories.find(cat => cat.id === categoryId);
        setSubCategories(selectedCategory?.categories || []);
    };

    const handleSubCategoryChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        console.log(selectedSubCategoryId);
        const subCategoryId = Number(e.target.value);
        setSelectedSubCategoryId(subCategoryId);
    }


    return <>
        <h2 style={{textAlign: "center"}}>Browse categories</h2>
        <div className="browse-outer-container" style={{display:'flex', width:'100%'}}>
            <div className="browse-dropdown-categories" style={{margin: 'auto'}}>
                <div className="categories-dropdown-title">
                    Select categories
                </div>
                <select name="cars" id="cars" onChange={handleCategoryChange} style={{height: '40px', width: '20vw'}}>
                    <option value="" selected>Choose here</option>
                    {categories.map(b => <option value={b.id}>{b.name}</option>)}
                </select>
            </div>
            <div className="browse-dropdown-subcategories" style={{margin: 'auto'}}>
                <div>
                    Select subcategories
                </div>
                <select name="cars" id="cars" onChange={handleSubCategoryChange} style={{height: '40px', width: '20vw'}}>
                <option value="">Select Subcategory</option>
                {subCategories.map((subCategory) => (
                    <option key={subCategory.id} value={subCategory.id}>
                        {subCategory.name}
                    </option>
                ))}
                </select>
            </div>
            <Button variant="success" style={{height: '40px', marginTop: '23px'}}>Search</Button>
        </div>
        { (categoryId && selectedSubCategoryId) ? <Cards display='latest'  /> : <></> }
    </>
}