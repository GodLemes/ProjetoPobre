import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(_, { params }) {
  const id = parseInt(params.id);
  const atualizado = await prisma.desejo.update({
    where: { id },
    data: { status: "Patrocinado! 🤑" },
  });
  return Response.json(atualizado);
}
