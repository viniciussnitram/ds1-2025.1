"use client"
import { Checkbox } from "@/components/ui/checkbox"

export default function AlocarSala() {
  return (
    <main className="w-full min-h-screen">
      <div className="w-full flex font-bold text-3xl justify-center mt-4 mb-8">Salas</div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4">
        {/* Primeira coluna */}
        <div className="flex flex-col">
          <label className="text-xl">Bloco:</label>
          <input placeholder="" className="rounded-md border p-2" />
        </div>

        {/* Segunda coluna */}
        <div className="flex flex-col">
          <label className="text-xl">Número:</label>
          <input placeholder="" className="rounded-md border p-2" />
        </div>

        {/* Terceira coluna */}
        <div className="flex flex-col">
          <label className="text-xl">Capacidade:</label>
          <input placeholder="" className="rounded-md border p-2" />
        </div>

        {/* Quarta coluna - Checkboxes alinhados horizontalmente */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <input type="checkbox" className="rounded-md border p-2" />
            <label className="text-xl">Ar</label>
          </div>
          <div className="flex items-center space-x-1">
            <input type="checkbox" className="rounded-md border p-2" />
            <label className="text-xl">Lab</label>
          </div>
          <div className="flex items-center space-x-1">
            <input type="checkbox" className="rounded-md border p-2" />
            <label className="text-xl">Lousa Digital</label>
          </div>
        </div>
      </div>


      <div className="grid ml-4 mr-4 mt-2 bg-blue-600 p-2 rounded-md hover:bg-blue-700">
        <button className="">Salvar</button>
      </div>
    </main>
  );
}