import Link from 'next/link';

// 1. Função auxiliar para definir a imagem baseada na especialidade
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
    .slice(0, 3) 
    .map(t => t.trim());

  // Valor da hora
  const valorHora = p.valor_hora
    ? parseFloat(p.valor_hora)
    : Math.floor(Math.random() * 100) + 80;

  // Rating médio
  const rating = p.rating_medio
    ? parseFloat(p.rating_medio)
    : (Math.random() * 2 + 3);

  // Define a imagem final
  const imageSrc = (p.foto_url && p.foto_url.length > 5) 
    ? p.foto_url 
    : getProfessionalImage(p.especialidade);

  return (
    <div className="card flex gap-4 items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700 hover:border-gray-600 transition-colors">
      
      <div className="flex-shrink-0">
        <img
          src={imageSrc}
          alt={p.nome}
          className="w-24 h-24 object-cover rounded-lg border-2 border-gray-700"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = getProfessionalImage(null); 
          }}
        />
      </div>

      <div className="flex-1 min-w-0">
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
            <div className="text-xs text-yellow-400 font-semibold mt-1">⭐ {rating.toFixed(1)}</div>
          </div>
        </div>

        {p.descricao && (
          <p className="mt-2 text-sm text-gray-300 line-clamp-1">
            {p.descricao}
          </p>
        )}

        {tags.length > 0 && (
          <div className="mt-3 flex gap-2 flex-wrap">
            {tags.map((t, i) => (
              <span key={i} className="px-2 py-0.5 bg-gray-700 text-gray-300 rounded text-xs border border-gray-600">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-3">
          <Link
            href={`/professionals/${encodeURIComponent(p.user_id || 'id-missing')}`}
            className="inline-block w-full text-center px-3 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded text-white text-sm font-medium"
          >
            Ver perfil completo
          </Link>
        </div>
      </div>
    </div>
  );
}
