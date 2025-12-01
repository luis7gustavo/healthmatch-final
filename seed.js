import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config({ path: ".env.local" });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ ERRO: MONGODB_URI não encontrada no .env.local");
  process.exit(1);
}

const client = new MongoClient(uri);

// Listas para randomização dos profissionais
const names = [
  "Carlos Almeida", "Fernanda Ribeiro", "João Martins", "Paula Lima", "Ricardo Souza",
  "Juliana Costa", "Marcos Rocha", "Patrícia Melo", "Eduardo Camargo", "Amanda Freitas",
  "Felipe Nunes", "Simone Torres", "Renato Pinto", "Sabrina Duarte", "Lucas Braga",
  "Tatiane Andrade", "Pedro Barbosa", "Carla Silveira", "Roberto Silva", "Beatriz Alves",
  "Andreia Santos", "Thiago Moreira", "Gabriela Pires", "Vinicius Simões", "Leticia Cardoso",
  "Rafael Antunes", "Marta Sampaio", "Diego Oliveira", "Isabela Ramos", "Alessandro Furtado"
];
const specialties = [
  "Personal Trainer", "Nutricionista", "Fisioterapeuta", "Psicólogo", "Médico Esportivo"
];
const expYears = [2,3,4,5,6,7,8,9,10];
const tagsList = [
  ["Musculação", "Treino funcional", "Performance"],
  ["Nutrição esportiva", "Emagrecimento", "Saúde feminina"],
  ["Reabilitação", "Mobilidade", "Performance"],
  ["Saúde mental", "Bem-estar", "Ansiedade"],
  ["Avaliação física", "Rotina saudável", "Medicina esportiva"]
];

function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const professionals = Array.from({length: 30}, (_, i) => ({
  name: names[i % names.length],
  specialty: random(specialties),
  experience: `${random(expYears)} anos`,
  rating: +(4 + Math.random()).toFixed(1), // Ex: de 4.0 a 5.0
  tags: random(tagsList)
}));

async function run() {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("professionals");

    console.log("🔥 Limpando coleção...");
    await collection.deleteMany({});

    console.log("📥 Inserindo novos profissionais...");
    await collection.insertMany(professionals);

    console.log("✅ Seed finalizado com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao rodar seed:", err);
  } finally {
    await client.close();
  }
}

run();
