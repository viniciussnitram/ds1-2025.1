"use client"
import { Checkbox } from "@/components/ui/checkbox"

export default function AlocarSala() {
  return (
    <main className="w-full min-h-screen">
      <div className="w-full flex font-bold text-3xl justify-center mt-4 mb-8">Salas</div>

      <div className="grid w-full grid-cols-1">
        <div className="grid ml-4 mr-4 mt-2">
          <label className="text-xl">Bloco:</label>
          <input
            placeholder=""
            className="rounded-md border p-2"
          />
        </div>

        <div className="grid ml-4 mr-4 mt-2">
          <label className="text-xl">Número:</label>
          <input
            placeholder=""
            className="rounded-md border p-2"
          />
        </div>

        <div className="grid ml-4 mr-4 mt-2">
          <label className="text-xl">Capacidade:</label>
          <input
            placeholder=""
            className="rounded-md border p-2"
          />
        </div>
      </div>

      <div className="flex">
        <div className="ml-4 mr-4 mt-2">
          <label className="text-xl">Ar:</label>
          <input
            type="checkbox"
            placeholder=""
            className="rounded-md border p-2"
          />
        </div>

        <div className="ml-4 mr-4 mt-2">
          <label className="text-xl">Lab:</label>
          <input
            type="checkbox"
            placeholder=""
            className="rounded-md border p-2"
          />
        </div>

        <div className="ml-4 mr-4 mt-2">
          <label className="text-xl">Ar:</label>
          <input
            type="checkbox"
            placeholder=""
            className="rounded-md border p-2"
          />
        </div>

      </div>
      <div className="grid ml-4 mr-4 mt-2 bg-blue-600 p-2 rounded-md hover:bg-blue-700">
        <button className="">Salvar</button>
      </div>
    </main>
  );
}