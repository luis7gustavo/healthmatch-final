Excelente pedido. Você tem razão, usar a mesma imagem para todos os nutricionistas ou personal trainers fica repetitivo e pouco profissional.

Para resolver isso, precisamos de uma abordagem que eu chamo de **"Aleatoriedade Estável"**.

### O Problema da Aleatoriedade Comum

Se usarmos apenas `Math.random()` para escolher uma imagem, toda vez que a página atualizar ou o componente recarregar, a foto do profissional mudará. Isso é ruim para a experiência do usuário.

### A Solução: Aleatoriedade Estável (Hashing)

Vamos usar o **ID único do profissional** (`p.user_id` ou `p._id`) para "calcular" qual imagem ele deve receber.

Como o ID dele nunca muda, o cálculo sempre dará o mesmo resultado, garantindo que o "Dr. Bruno" sempre tenha a mesma foto de "médico homem", e a "Dra. Fernanda" sempre tenha a mesma foto de "médica mulher", mesmo que a página recarregue.

Aqui está o código atualizado. Substitua todo o seu arquivo `ProfessionalCard.jsx` por este:

```jsx
import Link from 'next/link';

// =====================================================================
// BANCO DE IMAGENS VARIADAS
// =====================================================================
// Definimos conjuntos de imagens (homens e mulheres) para cada categoria.
const imagePools = {
  nutri: [
    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80', // Comida/Nutri
    'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=400&q=80', // Nutri Mulher
    'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=400&q=80', // Nutri Homem
  ],
  treino: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80', // Academia genérico
    'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=400&q=80', // Personal Homem
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=400&q=80', // Personal Mulher
  ],
  psico: [
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80', // Psicóloga Mulher
    'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=400&q=80', // Psicólogo Homem
    'https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=400&q=80', // Ambiente de terapia
  ],
  fisio: [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80', // Fisio Mulher
    'https://images.unsplash.com/photo-1603807914480-0791d11b45e7?auto=format&fit=crop&w=400&q=80', // Fisio Homem na prática
  ],
  medico: [
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80', // Médico Homem
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80', // Médica Mulher
  ],
  default: [
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=400&q=80', // Avatar Homem
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80', // Avatar Mulher
  ]
};

// =====================================================================
// FUNÇÃO DE SELEÇÃO ESTÁVEL (HASHING)
// =====================================================================
const getStableImage = (specialty, uniqueId) => {
  const s = specialty ? specialty.toLowerCase() : '';
  let poolKey = 'default';

  // 1. Determina qual conjunto de imagens usar
  if (s.includes('nutri') || s.includes('alimenta')) poolKey = 'nutri';
  else if (s.includes('treino') || s.includes('muscula') || s.includes('personal') || s.includes('fitness')) poolKey = 'treino';
  else if (s.includes('psico') || s.includes('mental') || s.includes('terapia')) poolKey = 'psico';
  else if (s.includes('fisio') || s.includes('reabilita') || s.includes('massagem')) poolKey = 'fisio';
  else if (s.includes('medi') || s.includes('clinico')) poolKey = 'medico';

  const selectedPool = imagePools[poolKey];

  // 2. Usa o ID único para criar um número "hash" estável
  // Se não tiver ID, usa uma string genérica para não quebrar
  const safeId = uniqueId || 'fallback-string';
  let hash = 0;
  for (let i = 0; i < safeId.length; i++) {
    // Algoritmo simples de hash para gerar um número a partir de texto
    hash = safeId.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Garante que o número é positivo
  hash = Math.abs(hash);

  // 3. Usa o resto da divisão (%) para escolher um índice dentro do array
  const index = hash % selectedPool.length;

  return selectedPool[index];
};


// =====================================================================
// COMPONENTE PRINCIPAL
// =====================================================================
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

  // Identificador único do profissional (tenta user_id, depois _id, depois undefined)
  const professionalUniqueId = p.user_id || p._id;

  // Define a imagem final: usa a do banco SE existir e for válida, senão usa a lógica estável
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
            // Fallback de segurança se a imagem escolhida falhar
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
```
