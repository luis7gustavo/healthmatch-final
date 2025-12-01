import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
export default async function handler(req,res){
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME || 'healthmatch_market');
  const professionals = db.collection('professionals');
  const appointments = db.collection('appointments');
  const { id } = req.query;
  if(req.method==='GET'){
    const prof = await professionals.findOne({ user_id: id }) || await professionals.findOne({ _id: ObjectId.isValid(id)? new ObjectId(id): id });
    if(!prof) return res.status(404).json({ error: 'Profissional não encontrado' });
    const avals = await appointments.find({ professional_id: prof._id.toString(), avaliacao_nota: { $ne: null } }).toArray();
    res.json({ professional: prof, avals });
  } else {
    res.setHeader('Allow',['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
