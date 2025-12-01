import Link from 'next/link';

// =====================================================================
// SUPER BANCO DE IMAGENS VARIADAS (+30 opções)
// =====================================================================
const imagePools = {
  nutri: [
    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80', // Comida saudável
    'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=400&q=80', // Nutri Mulher
    'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=400&q=80', // Nutri Homem sorrindo
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80', // Comida colorida
    'https://images.unsplash.com/photo-1594824476961-b7aa3464633d?auto=format&fit=crop&w=400&q=80', // Nutri Mulher com salada
    'https://images.unsplash.com/photo-1620753860328-651804d6a460?auto=format&fit=crop&w=400&q=80', // Nutri Homem no consultório
  ],
  treino: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80', // Academia pesos
    'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=400&q=80', // Personal Homem
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=400&q=80', // Personal Mulher
    'https://images.unsplash.com/photo-1571019611458-9a329857258d?auto=format&fit=crop&w=400&q=80', // Personal Mulher na academia
    'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=400&q=80', // Homem treinando
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&q=80', // Mulher treinando crossfit
    'https://images.unsplash.com/photo-1605296867304-6f289863911f?auto=format&fit=crop&w=400&q=80', // Personal Homem fit
  ],
  psico: [
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80', // Psicóloga Mulher
    'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=400&q=80', // Psicólogo Homem
    'https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=400&q=80', // Ambiente calmo
    'https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?auto=format&fit=crop&w=400&q=80', // Consultório aconchegante
    'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=400&q=80', // Terapeuta Mulher ouvindo
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80', // Terapeuta Mulher sorrindo
  ],
  fisio: [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80', // Fisio Mulher
    'https://images.unsplash.com/photo-1603807914480-0791d11b45e7?auto=format&fit=crop&w=400&q=80', // Fisio Homem
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80', // Tratamento ombro
    'https://images.unsplash.com/photo-1618939304348-2641abbe093c?auto=format&fit=crop&w=400&q=80', // Fisio Mulher alongamento
    'https://images.unsplash.com/photo-1530026186672-2cd00ffc4525?auto=format&fit=crop&w=400&q=80', // Massagem
  ],
  medico: [
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80', // Médico Homem
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80', // Médica Mulher
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80', // Médica com estetoscópio
    'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80', // Médico sênior
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80', // Médica sorrindo
  ],
  default: [
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=400&q=80', // Avatar Homem 1
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80', // Avatar Mulher 1
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80', // Avatar Homem 2
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80', // Avatar Mulher 2
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', // Avatar Homem 3
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80', // Avatar Mulher 3
  ]
};

// =====================================================================
// FUNÇÃO DE SELEÇÃO ESTÁVEL (HASHING) - Mantida igual
// =====================================================================
const getStableImage = (specialty, uniqueId) => {
  const s = specialty ? specialty.toLowerCase() : '';
  let poolKey = 'default';

  if (s.includes('nutri') || s.includes('alimenta')) poolKey = 'nutri';
  else if (s.includes('treino') || s.includes('muscula') || s.includes('personal') || s.includes('fitness')) poolKey = 'treino';
  else if (s.includes('psico') || s.includes('mental') || s.includes('terapia')) poolKey = 'psico';
  else if (s.includes('fisio') || s.includes('reabilita') || s.includes('massagem')) poolKey = 'fisio';
  else if (s.includes('medi') || s.includes('clinico')) poolKey = 'medico';

  const selectedPool = imagePools[poolKey];

  const safeId = uniqueId || 'fallback-string';
  let hash = 0;
  for (let i = 0; i < safeId.length; i++) {
    hash = safeId.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);

  const index = hash % selectedPool.length;

  return selectedPool[index];
};

// =====================================================================
// COMPONENTE PRINCIPAL - Mantido igual
// =====================================================================
export default function ProfessionalCard({ p }) {
  const tags = (Array.isArray(p.tags)
    ? p.tags
    : typeof p.tags === 'string'
    ? p.tags.split(',')
    : []
  )
    .slice(0, 3)
    .map(t => t.trim());

  const valorHora = p.valor_hora
    ? parseFloat(p.valor_hora)
    : Math.floor(Math.random() * 100) + 80;

  const rating = p.rating_medio
    ? parseFloat(p.rating_medio)
    : (Math.random() * 2 + 3);

  const professionalUniqueId = p.user_id || p._id;

  const imageSrc = (p.foto_url && p.foto_url.length > 10)
    ? p.foto_url
    : getStableImage(p.especialidade, professionalUniqueId);

  return (
    <div className="card flex gap-4 items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex-shrink-0">
        <img
          src={imageSrc}
          alt={p.nome}
          className="w-24 h-24 object-cover rounded-lg border-2 border-gray-700"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = imagePools.default[0];
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
            href={`/professionals/${encodeURIComponent(professionalUniqueId || 'id-missing')}`}
            className="inline-block w-full text-center px-3 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded text-white text-sm font-medium"
          >
            Ver perfil completo
          </Link>
        </div>
      </div>
    </div>
  );
}
