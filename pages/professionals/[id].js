import {useRouter} from 'next/router';
import useSWR from 'swr';
import Layout from '../../components/Layout';
const fetcher=(url)=>fetch(url).then(r=>r.json());
export default function Profile(){
  const router=useRouter();
  const {id}=router.query;
  const {data}=useSWR(id?`/api/professionals/${encodeURIComponent(id)}`:null,fetcher);
  if(!data) return <Layout><p>Carregando...</p></Layout>;
  const {professional,avals}=data;
  return (
    <Layout>
      <div className="card">
        <div className="flex gap-6">
          <img src={professional.foto_url} className="w-48 h-48 object-cover rounded" />
          <div>
            <h2 className="text-2xl font-bold">{professional.nome}</h2>
            <p className="text-gray-300">{professional.especialidade} • {professional.bairro}, {professional.cidade}</p>
            <p className="mt-4">{professional.descricao}</p>
            <div className="mt-4">Valor/hora: R$ {Number(professional.valor_hora).toFixed(2)}</div>
            <div className="mt-2">Rating: {professional.rating_medio}</div>
            <div className="mt-4"><a className="btn-primary" href={`/schedule/${encodeURIComponent(professional.user_id)}`}>Agendar</a></div>
          </div>
        </div>
        <section className="mt-6">
          <h3 className="text-lg">Avaliações</h3>
          {avals.length===0 && <p className="text-gray-400">Ainda não há avaliações.</p>}
          {avals.map((a,i)=>(
            <div key={i} className="mt-2 p-3 bg-gray-900 rounded">⭐ {a.avaliacao_nota} — {a.avaliacao_comentario}</div>
          ))}
        </section>
      </div>
    </Layout>
  )
}
