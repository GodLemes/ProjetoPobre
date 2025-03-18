import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdoteUmPobre() {
  const [desejos, setDesejos] = useState([]);
  const [novoNome, setNovoNome] = useState("");
  const [novoDesejo, setNovoDesejo] = useState("");

  const api = "http://localhost:3001/desejos";

  // Carregar desejos do backend
  useEffect(() => {
    axios.get(api)
      .then(res => setDesejos(res.data))
      .catch(err => console.error(err));
  }, []);

  // Adicionar desejo novo
  const adicionarDesejo = () => {
    if (novoNome && novoDesejo) {
      const novo = { nome: novoNome, desejo: novoDesejo, status: "Aguardando Patrocinador" };
      axios.post(api, novo)
        .then(res => setDesejos([...desejos, res.data]));
      setNovoNome("");
      setNovoDesejo("");
    }
  };

  // Patrocinar desejo
  const patrocinar = (id) => {
    const patrocinado = { status: "Patrocinado! 🤑" };
    axios.patch(`${api}/${id}`, patrocinado)
      .then(() => {
        const atualizados = desejos.map((item) =>
          item.id === id ? { ...item, status: patrocinado.status } : item
        );
        setDesejos(atualizados);
      });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Adote um Pobre 🤑</h1>
      <p className="mb-6">Faça seu pedido e torça para um rico desocupado realizar!</p>
      
      <div className="mb-4">
        <Input 
          placeholder="Seu Nome" 
          value={novoNome} 
          onChange={(e) => setNovoNome(e.target.value)} 
          className="mb-2" 
        />
        <Textarea 
          placeholder="O que você quer?" 
          value={novoDesejo} 
          onChange={(e) => setNovoDesejo(e.target.value)}
          className="mb-2"
        />
        <Button onClick={adicionarDesejo}>Pedir</Button>
      </div>
      
      <h2 className="text-2xl font-semibold mt-6">Lista de Desejos</h2>
      <div className="mt-4 space-y-4">
        {desejos.map((item) => (
          <Card key={item.id} className="p-4 border border-gray-300">
            <CardContent>
              <p className="font-semibold">{item.nome} quer:</p>
              <p className="italic">{item.desejo}</p>
              <p className="text-sm text-gray-500">Status: {item.status}</p>
              {item.status === "Aguardando Patrocinador" && (
                <Button className="mt-2" onClick={() => patrocinar(item.id)}>Patrocinar</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
