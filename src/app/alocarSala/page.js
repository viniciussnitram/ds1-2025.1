"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useState, useEffect } from "react"
import axios from 'axios';

export default function AlocarSala() {

    const [filterValue, setFilterValue] = useState('');
    const [tabela, setTabela] = useState([]);
    useEffect( () => { 
      const getSala = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/Sala")
          setTabela(response.data)

        } catch(error) {
          console.log(error)
        }
      }
      getSala()
    }, [])

    const [bloco, setBloco] = useState('');
    const handleBlocoChange = (event) => {
      setBloco(event.target.value);
    };

    const [numero, setNumero] = useState('');
    const handleNumeroChange = (event) => {
      setNumero(event.target.value);
    };

    const [capacidade, setCapacidade] = useState('');
    const handleCapacidadeChange = (event) => {
      setCapacidade(event.target.value);
    };

    const [ar, setAr] = useState('');
    const handleArChange = (event) => {
      setAr(event.target.checked);
    };

    const [lab, setLab] = useState('');
    const handleLabChange = (event) => {
      setLab(event.target.checked);
    };

    const [lousa, setLousa] = useState('');
    const handleLousaChange = (event) => {
      setLousa(event.target.checked);
    };

    const postSala = async() => {
      event.preventDefault();

      try{
        const sala = {
          capacidadeMaxima: capacidade,
          possuiLaboratorio: lab ? lab : false,
          possuiArCondicionado: ar ? ar : false,
          possuiLoucaDigital: lousa ? lousa : false,
          bloco: bloco,
          numero: numero
        }

        const response = await axios.post("http://localhost:5000/api/Sala", sala)
        setTabela((prevTabela) => [...prevTabela, response.data]);

      } catch(error){
        alert(error.response.data.errors)
        console.log(error)
      }
    }

  return (
    <main className="w-full min-h-screen">
      <div className="w-full flex font-bold text-3xl justify-center mt-4 mb-8">Salas</div>
      
      <form onSubmit={postSala}> 
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4">
          {/* Primeira coluna */}
          <div className="flex flex-col">
            <label className="text-xl">Bloco:</label>
            <input placeholder="" className="rounded-md border p-2" value={bloco} onChange={handleBlocoChange}/>
          </div>

          {/* Segunda coluna */}
          <div className="flex flex-col">
            <label className="text-xl">Número:</label>
            <input placeholder="" className="rounded-md border p-2" value={numero} onChange={handleNumeroChange}/>
          </div>

          {/* Terceira coluna */}
          <div className="flex flex-col">
            <label className="text-xl">Capacidade:</label>
            <input placeholder="" className="rounded-md border p-2" value={capacidade} onChange={handleCapacidadeChange}/>
          </div>

          {/* Quarta coluna - Checkboxes alinhados horizontalmente */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <input type="checkbox" className="rounded-md border p-2" checked={ar} onChange={handleArChange}/>
              <label className="text-xl">Ar</label>
            </div>
            <div className="flex items-center space-x-1">
              <input type="checkbox" className="rounded-md border p-2" checked={lab} onChange={handleLabChange}/>
              <label className="text-xl">Lab</label>
            </div>
            <div className="flex items-center space-x-1">
              <input type="checkbox" className="rounded-md border p-2" checked={lousa} onChange={handleLousaChange}/>
              <label className="text-xl">Lousa Digital</label>
            </div>
          </div>
        </div>

        <div className="grid ml-4 mr-4 mt-2 bg-blue-600 p-2 rounded-md hover:bg-blue-700">
          <button className="" type="submit">Salvar</button>
        </div>

      </form>
      <div>
        <Input
          placeholder="Filtrar"
          className="border border-black"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </div>
      <div className="border rounded-lg p-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bloco</TableHead>
                    <TableHead>Número</TableHead>
                    <TableHead>Capacidade de Alunos</TableHead>
                    <TableHead>Ar</TableHead>
                    <TableHead>Lab</TableHead>
                    <TableHead>Lousa Digital</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tabela
                    .filter((row) =>
                      Object.values(row).some((value) =>
                        value
                          .toString()
                          .toLowerCase()
                          .includes(filterValue.toLowerCase())
                      )
                    )
                    .map((row) => (
                        <TableRow key={row.id}>
                        <TableCell>{row.bloco}</TableCell>
                        <TableCell>{row.numero}</TableCell>
                        <TableCell>{row.capacidadeMaxima}</TableCell>
                        <TableCell>{row.possuiArCondicionado ? "Sim" : "Não"}</TableCell>
                        <TableCell>{row.possuiLaboratorioa ? "Sim" : "Não"}</TableCell>
                        <TableCell>{row.possuiLoucaDigital ? "Sim" : "Não"}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
    </main>
  );
}