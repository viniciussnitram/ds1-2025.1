"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import axios from "axios";

export default function cadastrarSala() {
  const [filterValue, setFilterValue] = useState("");
  const [tabela, setTabela] = useState([]);
  const [bloco, setBloco] = useState("");
  const [numero, setNumero] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [ar, setAr] = useState(false);
  const [lab, setLab] = useState(false);
  const [lousa, setLousa] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBloco, setSelectedBloco] = useState("");
  const [selectedSalaId, setSelectedSalaId] = useState(0);
const [selectedHorario, setSelectedHorario] = useState(0);
const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
const [editSala, setEditSala] = useState({
  id: "",
  bloco: "",
  numero: "",
  capacidadeMaxima: "",
  possuiArCondicionado: false,
  possuiLaboratorio: false,
  possuiLoucaDigital: false,
});

  useEffect(() => {
    const getSala = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/Sala");
        setTabela(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSala();
  }, []);

  const postSala = async () => {
    event.preventDefault();

    try {
      const sala = {
        capacidadeMaxima: capacidade,
        possuiLaboratorio: lab ? lab : false,
        possuiArCondicionado: ar ? ar : false,
        possuiLoucaDigital: lousa ? lousa : false,
        bloco: bloco,
        numero: numero,
      };
      console.log("sala", sala);
      const response = await axios.post("http://localhost:5000/api/Sala", sala);
      setTabela((prevTabela) => [...prevTabela, response.data]);
    } catch (error) {
      alert(error.response.data.errors);
      console.log(error);
    }
  };

  const postIndisponibilidade = async () => {
    event.preventDefault();

    try {
      const indisponibilidade = {
        salaId: selectedSalaId,
        diaSemana: 0,
        tempo: selectedHorario,
      };
      console.log("indisponibilidade", indisponibilidade);

      //const response = await axios.post(`http://localhost:5000/api/Sala/${selectedSalaId}/indisponibilidade`, indisponibilidade);
    } catch (error) {
      alert(error.response.data.errors);
      console.log(error);
    }
  };

  const handleEditSala = (sala) => {
    setEditSala({ ...sala }); // Preenche o estado com os dados da sala selecionada
    setIsDialogEditOpen(true);
  };

  // Atualizar os valores de `editSala`
  const handleEditChange = (field, value) => {
    setEditSala((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOpenDeleteDialog = (sala) => {
    setEditSala({ ...sala });
    setSelectedSalaId(sala.id); // Atualiza o ID da sala selecionada
    setIsDialogDeleteOpen(true);
  };

  // Atualizar os dados da sala
  const handleUpdateSala = async () => {
    try {
      await axios.put(`http://localhost:5000/api/Sala/${editSala.id}`, editSala);
      setTabela((prev) => prev.map((s) => (s.id === editSala.id ? editSala : s)));
      setIsDialogEditOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar a sala:", error);
    }
  };

  const handleDeleteSala = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/Sala/${selectedSalaId}`);
      setTabela((prev) => prev.filter((s) => s.id !== selectedSalaId));
      setIsDialogDeleteOpen(false);
    } catch (error) {
      console.error("Erro ao excluir a sala:", error);
    }
  };

  return (
    <main className="w-full min-h-screen">
      <div className="w-full flex font-bold text-4xl justify-center mt-4 mb-8">
        Salas
      </div>

      <div className="p-6 max-w-full mx-auto">
        <div className="flex items-center mb-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Filtrar"
              className="border border-black"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />

            <div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <button className="rounded-md bg-blue-600 text-white p-1.5 mr-2 w-[200px]">
                    Cadastrar Sala
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl">
                      Cadastrar Sala
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Bloco
                      </Label>
                      <Input
                        type="text"
                        id="name"
                        className="col-span-3"
                        value={bloco}
                        onChange={(e) => setBloco(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Número:
                      </Label>
                      <Input
                        type="number"
                        id="username"
                        className="col-span-3"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Capacidade:
                      </Label>
                      <Input
                        id="username"
                        className="col-span-3"
                        value={capacidade}
                        onChange={(e) => setCapacidade(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Ar:
                      </Label>
                      <Input
                        id="username"
                        className="col-span-3"
                        type="checkbox"
                        checked={ar}
                        onChange={(e) => setAr(e.target.checked)}
                      />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Laboratório:
                      </Label>
                      <Input
                        id="username"
                        className="col-span-3"
                        type="checkbox"
                        checked={lab}
                        onChange={(e) => setLab(e.target.checked)}
                      />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Lousa Digital:
                      </Label>
                      <Input
                        id="username"
                        className="col-span-3"
                        type="checkbox"
                        checked={lousa}
                        onChange={(e) => setLousa(e.target.checked)}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" onClick={postSala}>
                      Savar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div>
              <Dialog>
                <DialogTrigger>
                  <button className="rounded-md bg-blue-600 text-white p-1.5 mr-2 w-[200px]">
                    Indisponibilidade
                  </button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-xl">
                      Indisponibilidade
                    </DialogTitle>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="bloco" className="text-right">
                        Bloco
                      </Label>
                      <select
                        className="rounded-md border p-2 col-span-3"
                        value={selectedBloco}
                        onChange={(e) => setSelectedBloco(e.target.value)}
                      >
                        <option value={null}>Selecione um bloco</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="numero" className="text-right">
                        Numero
                      </Label>
                      <select 
                        className="rounded-md border p-2 col-span-3"
                        value={selectedSalaId}
                        onChange={(e) => setSelectedSalaId(e.target.value)}
                      >
                        <option value={null}>Selecione o número da sala</option>
                        {tabela
                          .filter((row) => row.bloco === selectedBloco) // Filtra com base no bloco selecionado
                          .map((row) => (
                            <option key={row.id} value={row.id}>
                              {row.numero}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="horario" className="text-right">
                        Horario
                      </Label>

                      <select
                        id="horario"
                        className="rounded-md border p-2 col-span-3"
                        value={selectedHorario}
                        onChange={(e) => setSelectedHorario(e.target.value)}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </select>
                    </div>
                  </div>

                  <form>
                    <DialogFooter>
                      <Button type="button" variant="outline">
                        Cancelar
                      </Button>
                      <Button type="button" onClick={postIndisponibilidade}>Sim</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
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
                <TableHead>Ações</TableHead>
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
                    <TableCell>
                      {row.possuiArCondicionado ? "Sim" : "Não"}
                    </TableCell>
                    <TableCell>
                      {row.possuiLaboratorio ? "Sim" : "Não"}
                    </TableCell>
                    <TableCell>
                      {row.possuiLoucaDigital ? "Sim" : "Não"}
                    </TableCell>
                    <TableCell>
                      <button className="mr-2">
                        <Pencil onClick={() => handleEditSala(row)}/>
                      </button>
                      <button onClick={() => handleOpenDeleteDialog(row)}>
                        <Trash2 />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>

<Dialog open={isDialogEditOpen} onOpenChange={setIsDialogEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Sala</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label>Bloco</Label>
              <Input
                value={editSala.bloco}
                onChange={(e) => handleEditChange("bloco", e.target.value)}
              />
            </div>
            <div>
              <Label>Número</Label>
              <Input
                value={editSala.numero}
                onChange={(e) => handleEditChange("numero", e.target.value)}
              />
            </div>
            <div>
              <Label>Capacidade</Label>
              <Input
                value={editSala.capacidadeMaxima}
                onChange={(e) => handleEditChange("capacidadeMaxima", e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <Label>
                <input
                  type="checkbox"
                  checked={editSala.possuiArCondicionado}
                  onChange={(e) => handleEditChange("possuiArCondicionado", e.target.checked)}
                />
                Ar
              </Label>
              <Label>
                <input
                  type="checkbox"
                  checked={editSala.possuiLaboratorio}
                  onChange={(e) => handleEditChange("possuiLaboratorio", e.target.checked)}
                />
                Lab
              </Label>
              <Label>
                <input
                  type="checkbox"
                  checked={editSala.possuiLoucaDigital}
                  onChange={(e) => handleEditChange("possuiLoucaDigital", e.target.checked)}
                />
                Lousa Digital
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogEditOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateSala}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogDeleteOpen} onOpenChange={setIsDialogDeleteOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Excluir Sala</DialogTitle>
    </DialogHeader>
    <p>Tem certeza que deseja excluir a sala {editSala.numero} do bloco {editSala.bloco}?</p>
    <DialogFooter>
      <Button variant="outline" onClick={() => setIsDialogDeleteOpen(false)}>
        Cancelar
      </Button>
      <Button variant="destructive" onClick={handleDeleteSala}>
        Excluir
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

    </main>
  );
}
