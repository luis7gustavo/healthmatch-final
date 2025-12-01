import {useRouter} from 'next/router';
import {useState} from 'react';
import Layout from '../../components/Layout';
export default function Schedule(){
  const router = useRouter();
  const {id} = router.query;
  const [date,setDate]=useState('');
  const [clientEmail,setClientEmail]=useState('');
  const [msg,setMsg]=useState('');
  const submit = async ()=>{
    const body = { professional_id: id, client_id: 'demo_client_001', data: date, valor_pago: 120.0 };
    const res = await fetch('/api/appointments', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body)});
    if(res.ok){ setMsg('Agendamento criado!'); } else { setMsg('Erro ao criar agendamento'); }
  };
  return (
    <Layout>
      <div className="card max-w-2xl">
        <h2 className="text-xl mb-4">Agendar com {id}</h2>
        <label className="block mb-2">Data e hora</label>
        <input type="datetime-local" value={date} onChange={e=>setDate(e.target.value)} className="w-full p-2 mb-4 bg-transparent border border-gray-800 rounded" />
        <label className="block mb-2">Seu email</label>
        <input value={clientEmail} onChange={e=>setClientEmail(e.target.value)} className="w-full p-2 mb-4 bg-transparent border border-gray-800 rounded" />
        <button onClick={submit} className="btn-primary">Confirmar agendamento</button>
        {msg && <p className="mt-3">{msg}</p>}
      </div>
    </Layout>
  )
}
