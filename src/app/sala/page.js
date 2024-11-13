import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const table = [

]

export default function Sala() {
  return (
    <main className="w-full min-h-screen">
      <div className="w-full flex font-bold text-3xl justify-center mt-4 mb-8">Visualizar Salas</div>

      <div className="grid w-full grid-cols-1">
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

        <div className="grid ml-4 mr-4 mt-2 bg-blue-600 p-2 rounded-md hover:bg-blue-700">
          <button className="">Pesquisar</button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="w-full flex font-bold text-3xl justify-center mt-4 mb-8">Disciplinas Disponíveis</div>

        <Table className="border rounded-lg p-2">
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

        <div>
          <button>Salvar</button>
        </div>
      </div>
    </main>
  );
}