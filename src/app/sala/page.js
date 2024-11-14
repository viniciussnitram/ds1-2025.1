import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Search } from 'lucide-react'

const table = [

]

export default function Sala() {
  return (
    <main className="w-full min-h-screen">
      <div className="w-full flex font-bold text-3xl justify-center mt-4 mb-8">Visualizar Salas</div>

      <div className="grid grid-cols-1 sm:grid-cols-4">
        <div className="grid ml-4 mr-4 mt-2">
          <label className="text-xl">Dia:</label>
          <input
            placeholder="Segunda"
            className="rounded-md border p-2"
          />
        </div>

        <div className="grid ml-4 mr-4 mt-2">
          <label className="text-xl">Sala:</label>
          <input
            placeholder="Digite ou selecione a sala"
            className="rounded-md border p-2"
          />
        </div>

        <div className="grid ml-4 mr-4 mt-2">
          <label className="text-xl">Horario:</label>
          <select
            className="rounded-md border p-2"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div className="flex items-center  mt-8">
          <button className="flex ml-4 sm:ml-0 items-center bg-blue-600 text-white font-semibold p-2.5 rounded-lg shadow-md transition-all duration-200 transform hover:bg-blue-700 hover:shadow-lg active:scale-95">
            <Search className="w-5 h-5 mr-2" />
            Pesquisar
          </button>
        </div>
      </div>

      <div className="p-6 max-w-full mx-auto">
        <div className="w-full flex font-bold text-3xl justify-center mt-4 mb-8">Disciplinas Disponíveis</div>

        <div className="border rounded-lg p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Selecionar</TableHead>
                <TableHead className="">Disciplina</TableHead>
                <TableHead>Professor</TableHead>
                <TableHead>Características</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="">{row.id}</TableCell>
                  <TableCell>{row.disciplina}</TableCell>
                  <TableCell>{row.professor}</TableCell>
                  <TableCell className="">{row.caracateristicas}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <button>Salvar</button>
        </div>
      </div>
    </main>
  );
}