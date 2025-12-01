import {useState} from 'react';
export default function Filters({onSearch}){
  const [q,setQ]=useState('');
  const [specialty,setSpecialty]=useState('');
  return (
    <div className="card mb-6">
      <div className="flex gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar por nome, tags..." className="flex-1 p-2 rounded bg-transparent border border-gray-800" />
        <select value={specialty} onChange={e=>setSpecialty(e.target.value)} className="p-2 rounded bg-transparent border border-gray-800">
          <option value=''>Todas especialidades</option>
          <option>Nutricionista</option>
          <option>Personal Trainer</option>
          <option>Fisioterapeuta</option>
          <option>Psicólogo</option>
        </select>
        <button onClick={()=>onSearch({q,specialty})} className="btn-primary">Buscar</button>
      </div>
    </div>
  )
}
