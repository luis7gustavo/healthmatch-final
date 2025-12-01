import Link from 'next/link';

export default function ProfessionalCard({ p }) {
  // Garantir que tags sejam sempre um array
  const tags = (Array.isArray(p.tags)
    ? p.tags
    : typeof p.tags === 'string'
    ? p.tags.split(',')
    : []
  )
    .slice(0, 5)
    .map(t => t.trim());

  // Valor da hora: se não existir, gera aleatório entre 80 e 180
  const valorHora = p.valor_hora
    ? parseFloat(p.valor_hora)
    : Math.floor(Math.random() * 100) + 80;

  // Rating médio: se não existir, gera aleatório entre 3.0 e 5.0
  const rating = p.rating_medio
    ? parseFloat(p.rating_medio)
    : (Math.random() * 2 + 3);

  return (
    <div className="card flex gap-4 items-center p-4 bg-gray-800 rounded-lg shadow-md">
      <img
        src={p.foto_url}
        alt={p.nome}
        className="w-24 h-24 object-cover rounded-lg"
      />

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-white">{p.nome}</h3>
            <p className="text-sm text-gray-400">
              {p.especialidade}
              {p.bairro && ` • ${p.bairro}`}
              {p.cidade && `, ${p.cidade}`}
            </p>
          </div>

          <div className="text-right">
            <div className="text-sm text-white">R$ {valorHora.toFixed(2)}</div>
            <div className="text-xs text-yellow-300">⭐ {rating.toFixed(1)}</div>
          </div>
        </div>

        {p.descricao && <p className="mt-2 text-sm text-gray-300">{p.descricao}</p>}

        {tags.length > 0 && (
          <div className="mt-3 flex gap-2 flex-wrap">
            {tags.map((t, i) => (
              <span key={i} className="pill bg-indigo-600 text-white px-2 py-1 rounded-full text-xs">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-3">
          <Link
            href={`/professionals/${encodeURIComponent(p.user_id)}`}
            className="inline-block px-3 py-1 bg-indigo-600 rounded text-white"
          >
            Ver perfil
          </Link>
        </div>
      </div>
    </div>
  );
}
