import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { generateId } from '../utils/storage'

export default function Categories(){
  const { categories, products, addCategory, updateCategory, deleteCategory } = useApp()
  const [name, setName] = useState('')

  const handleAdd = () => {
    if(!name) return alert('Name required')
    addCategory({ id: generateId(), name })
    setName('')
  }

  const handleDelete = (id) => {
    const used = products.some(p => p.category === categories.find(c=>c.id===id)?.name)
    if(used) return alert('Category in use by products')
    deleteCategory(id)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="card">
        <h3 className="font-semibold mb-2">Add Category</h3>
        <input className="w-full p-2 mb-2 border rounded" value={name} onChange={e=>setName(e.target.value)} placeholder="Category name" />
        <button onClick={handleAdd} className="bg-amber-500 text-white px-3 py-1 rounded">Add</button>
      </div>
      <div className="md:col-span-2 card">
        <h3 className="font-semibold mb-2">Categories</h3>
        <ul className="space-y-2">
          {categories.map(c=> (
            <li key={c.id} className="flex justify-between items-center">
              <span>{c.name}</span>
              <div className="space-x-2">
                <button onClick={()=>{const newName=prompt('Edit name',c.name); if(newName) updateCategory(c.id,{name:newName})}} className="px-2 py-1 bg-slate-200 rounded">Edit</button>
                <button onClick={()=>handleDelete(c.id)} className="px-2 py-1 bg-red-200 rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
