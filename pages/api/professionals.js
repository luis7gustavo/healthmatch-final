import clientPromise from '../../lib/mongodb';
export default async function handler(req,res){
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME || 'healthmatch_market');
  const professionals = db.collection('professionals');
  if(req.method==='GET'){
    const { especialidade, minPrice, maxPrice, cidade, tags, q, limit, skip } = req.query;
    const filter = {};
    if(especialidade) filter.especialidade = especialidade;
    if(cidade) filter.cidade = cidade;
    if(minPrice || maxPrice) filter.valor_hora = {};
    if(minPrice) filter.valor_hora.$gte = parseFloat(minPrice);
    if(maxPrice) filter.valor_hora.$lte = parseFloat(maxPrice);
    if(tags){ const tagsArr = tags.split(',').map(t=>t.trim()); filter.tags = { $in: tagsArr.map(t=> new RegExp(t, 'i')) }; }
    if(q) filter.$text = { $search: q };
    const cursor = professionals.find(filter).sort({ rating_medio: -1 });
    const total = await cursor.count();
    const items = await cursor.skip(parseInt(skip||0)).limit(parseInt(limit||50)).toArray();
    res.json({ total, items });
  } else {
    res.setHeader('Allow',['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
