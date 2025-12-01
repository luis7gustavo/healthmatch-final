import clientPromise from '../../lib/mongodb';
export default async function handler(req,res){
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME || 'healthmatch_market');
  const appointments = db.collection('appointments');
  if(req.method==='POST'){
    const body = req.body;
    const doc = {
      data: new Date(body.data),
      professional_id: body.professional_id,
      client_id: body.client_id,
      valor_pago: parseFloat(body.valor_pago),
      status: 'Agendado',
      duracao_horas: body.duracao_horas || 1,
      avaliacao_nota: null,
      avaliacao_comentario: null,
      created_at: new Date(),
      updated_at: new Date()
    };
    const result = await appointments.insertOne(doc);
    res.status(201).json({ insertedId: result.insertedId });
  } else {
    res.setHeader('Allow',['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
