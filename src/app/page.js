import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Home() {
  return (
    <main className="min-h-screen mb-20">
      <div className="w-full flex font-bold text-4xl justify-center mt-4 mb-8">FEMASS</div>
      <div className="w-full flex font-bold text-xl justify-center italic mt-4 mb-8">Bem vindo ao aplicativo de alocação de turmas</div>

      <div>
        <div>
          <label>Importar Arquivo Excel: </label>
          <input
            type="file"
          />
        </div>
        <div className="">
          <Dialog>
            <DialogTrigger>
              <button className="rounded-md bg-blue-600 text-white p-2 mr-2">
                Confirmar Importação
              </button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Importar</DialogTitle>
                <DialogDescription>Tem certeza que deseja importar a tabela do excel?</DialogDescription>
              </DialogHeader>

              <form>
                <DialogFooter>
                  <Button type="button" variant="outline">Cancelar</Button>
                  <Button type="button" >Sim</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger>
              <button className="rounded-md bg-blue-600 text-white p-2">
                Encerar Período Letivo
              </button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Encerar Período Letivo</DialogTitle>
                <DialogDescription>Tem certeza que deseja encerar o período letivo?</DialogDescription>
              </DialogHeader>

              <form>
                <DialogFooter>
                  <Button type="button" variant="outline">Cancelar</Button>
                  <Button type="button" >Sim</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

        </div>
      </div>
    </main>
  );
}
