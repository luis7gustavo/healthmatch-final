import useSWR from 'swr';
import Layout from '../components/Layout';
import ProfessionalCard from '../components/ProfessionalCard';
import Filters from '../components/Filters';
const fetcher = (url)=>fetch(url).then(r=>r.json());
export default function Home(){
  const {data,mutate}=useSWR('/api/professionals?limit=20',fetcher);
  const onSearch=(filters)=>{
    const qs = new URLSearchParams();
    if(filters.q) qs.set('q', filters.q);
    if(filters.specialty) qs.set('especialidade', filters.specialty);
    mutate(); // optimistic
    fetch('/api/professionals?'+qs.toString()).then(r=>r.json()).then(d=>mutate(()=>d,true));
  };
  return (
    <Layout>
      <h2 className="text-3xl mb-4">Encontre o profissional ideal</h2>
      <Filters onSearch={onSearch} />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {!data && <p>Carregando...</p>}
        {data && data.items.map(p=>(
          <ProfessionalCard key={p._id} p={p} />
        ))}
      </div>
    </Layout>
  )
}
