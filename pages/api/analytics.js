import clientPromise from '../../lib/mongodb';
export default async function handler(req,res){
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME || 'healthmatch_market');
  const appointments = db.collection('appointments');
  // total revenue
  const revAgg = await appointments.aggregate([
    { $match: { status: { $ne: 'Cancelado' } } },
    { $group: { _id: null, total: { $sum: '$valor_pago' } } }
  ]).toArray();
  const total_revenue = revAgg[0]? revAgg[0].total : 0;
  const bySpec = await appointments.aggregate([
    { $lookup: { from: 'professionals', localField: 'professional_id', foreignField: '_id', as: 'prof' } },
    { $unwind: '$prof' },
    { $group: { _id: '$prof.especialidade', total: { $sum: '$valor_pago' } } },
    { $sort: { total: -1 } }
  ]).toArray();
  res.json({ total_revenue, revenue_by_specialty: bySpec });
}
