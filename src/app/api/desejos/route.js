import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const desejos = await prisma.desejo.findMany({
    orderBy: { criadoEm: 'desc' },
  });
  return Response.json(desejos);
}

export async function POST(req) {
  const { nome, desejo } = await req.json();
  const novo = await prisma.desejo.create({
    data: { nome, desejo },
  });
  return Response.json(novo);
}
