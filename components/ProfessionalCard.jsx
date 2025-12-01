import Link from 'next/link';

// 1. Função auxiliar para definir a imagem baseada na especialidade
// Usamos links diretos do Unsplash para garantir qualidade visual imediata
const getProfessionalImage = (specialty) => {
  const s = specialty ? specialty.toLowerCase() : '';

  // Nutrição / Dietas
  if (s.includes('nutri') || s.includes('alimenta')) {
    return 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80'; 
  }
  // Personal / Musculação / Treino
  if (s.includes('treino') || s.includes('muscula') || s.includes('personal') || s.includes('fitness')) {
    return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80'; 
  }
  // Psicologia / Saúde Mental
  if (s.includes('psico') || s.includes('mental') || s.includes('terapia')) {
    return 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80'; 
  }
  // Fisioterapia / Reabilitação
  if (s.includes('fisio') || s.includes('reabilita') || s.includes('massagem')) {
    return 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80'; 
  }
  // Medicina / Médicos
  if (s.includes('medi') || s.includes('clinico')) {
    return 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80'; 
  }

  // Fallback: Imagem genérica profissional se nada bater
  return 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=400&q=80';
};

export default function ProfessionalCard({ p }) {
  // Garantir que tags sejam sempre um array
  const tags = (Array.isArray(p.tags)
    ? p.tags
    : typeof p.tags === 'string'
    ? p.tags.split(',')
    : []
  )
    .slice(0, 3) // Reduzi para 3 para não quebrar o layout se tiver muitas
    .map(t => t.trim());

  // Valor da hora: se não existir, gera aleatório entre 80 e 180
  const valorHora = p.valor_hora
    ? parseFloat(p.valor_hora)
    : Math.floor(Math.random() * 100) + 80;

  // Rating médio: se não existir, gera aleatório entre 3.0 e 5.0
  const rating = p.rating_medio
    ? parseFloat(p.rating_medio)
    : (Math.random() * 2 + 3);

  // 2. Define a imagem final: usa a do banco SE existir, senão usa a lógica criada acima
  const imageSrc = (p.foto_url && p.foto_url.length > 5) 
    ? p.foto_url 
    : getProfessionalImage(p.especialidade);

  return (
    <div className="card flex gap-4 items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700 hover:border-gray-600 transition-colors">
      
      {/* Imagem com tratamento de erro e object-cover para não distorcer */}
      <div className="flex-shrink-0">
        <img
          src={imageSrc}
          alt={p.nome}
          className="w-24 h-24 object-cover rounded-lg border-2 border-gray-700"
          onError={(e) => {
            // Se o link do banco quebrar, carrega o genérico automaticamente
            e.target.onerror = null; 
            e.target.src = getProfessionalImage(null); 
          }}
        />
      </div>

      <div className="flex-1 min-w-0"> {/* min-w-0 ajuda com truncamento de texto */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-white truncate">{p.nome}</h3>
            <p className="text-sm text-indigo-400 font-medium">
              {p.especialidade || 'Especialista'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {p.bairro && `${p.bairro}`}
              {p.bairro && p.cidade && ` • `}
              {p.cidade && `${p.cidade}`}
            </p>
          </div>

          <div className="text-right flex-shrink-0 ml-2">
            <div className="text-sm font-bold text-white">R$ {valorHora.toFixed(2)}</div>
            <div className="text-xs text-yellow
