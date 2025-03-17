-- CreateTable
CREATE TABLE "Desejo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "desejo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Aguardando Patrocinador',
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
