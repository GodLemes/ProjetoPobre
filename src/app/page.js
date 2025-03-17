import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.js
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [desejos, setDesejos] = useState([]);
  const [nome, setNome] = useState("");
  const [desejo, setDesejo] = useState("");

  useEffect(() => {
    fetchDesejos();
  }, []);

  const fetchDesejos = async () => {
    const res = await fetch("/api/desejos");
    const data = await res.json();
    setDesejos(data);
  };

  const adicionarDesejo = async () => {
    if (nome && desejo) {
      await fetch("/api/desejos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, desejo }),
      });
      setNome("");
      setDesejo("");
      fetchDesejos();
    }
  };

  const patrocinar = async (id) => {
    await fetch(`/api/desejos/${id}`, { method: "PATCH" });
    fetchDesejos();
  };

  return (
    <main className="p-6 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Adote um Pobre 🤑</h1>
      <p className="mb-6">Faça seu pedido e torça para um rico desocupado realizar!</p>

      <div className="mb-4 space-y-2">
        <input
          placeholder="Seu Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <textarea
          placeholder="O que você quer?"
          value={desejo}
          onChange={(e) => setDesejo(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button onClick={adicionarDesejo} className="bg-blue-600 text-white px-4 py-2 rounded">
          Pedir
        </button>
      </div>

      <h2 className="text-2xl font-semibold mt-6">Lista de Desejos</h2>
      <div className="mt-4 space-y-4">
        {desejos.map((item) => (
          <div key={item.id} className="p-4 border rounded">
            <p className="font-semibold">{item.nome} quer:</p>
            <p className="italic">{item.desejo}</p>
            <p className="text-sm text-gray-500">Status: {item.status}</p>
            {item.status === "Aguardando Patrocinador" && (
              <button onClick={() => patrocinar(item.id)} className="mt-2 bg-green-500 text-white px-3 py-1 rounded">
                Patrocinar
              </button>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
