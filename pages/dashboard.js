import useSWR from 'swr';
import Layout from '../components/Layout';
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const fetcher = (url)=>fetch(url).then(r=>r.json());
export default function Dashboard(){
  const {data}=useSWR('/api/analytics', fetcher);
  if(!data) return <Layout><p>Carregando...</p></Layout>;
  const labels = data.revenue_by_specialty.map(r=>r._id);
  const values = data.revenue_by_specialty.map(r=>r.total.toFixed(2));
  const chartData = { labels, datasets: [{ label: 'Receita por Especialidade', data: values }]};
  return (
    <Layout>
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="card">
        <div className="mb-4">Receita total: R$ {data.total_revenue.toFixed(2)}</div>
        <div><Bar data={chartData} /></div>
      </div>
    </Layout>
  )
}
