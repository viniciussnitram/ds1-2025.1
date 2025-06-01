"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RoomsService } from "@/services/RoomsService";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function CadastrarSala() {
  const [filterValue, setFilterValue] = useState("");
  const [tabela, setTabela] = useState([]);
  const [bloco, setBloco] = useState("");
  const [numero, setNumero] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [ar, setAr] = useState(false);
  const [lab, setLab] = useState(false);
  const [lousa, setLousa] = useState(false);
  //pega dia da semana e horario
  const [selectedDiaSemana, setSelectedDiaSemana] = useState("");
  //visualizar indisponibilidade
  const [indisponibilidades, setIndisponibilidades] = useState([]);
  const [isIndisponibilidadeListOpen, setIsIndisponibilidadeListOpen] = useState(false);

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
    RoomsService.getAllRooms()
      .then(setTabela)
      .catch((error) => {
        console.log('Não foi possível requisitar todas as salas', error);
      });
  }, []);

  const handleSubmitRoom = async (event) => {
    event.preventDefault();

    const payload = {
      capacidadeMaxima: capacidade,
      possuiLaboratorio: lab ? lab : false,
      possuiArCondicionado: ar ? ar : false,
      possuiLoucaDigital: lousa ? lousa : false,
      bloco: bloco,
      numero: numero,
    };

    RoomsService.createRoom(payload)
      .then((response) => {
        setTabela((prevTable) => [...prevTable, response.data]);
      })
      .catch((error) => {
        alert(error.response.data.errors);
        console.log(error);
      })
  };

  const handleSubmitUnavailable = async (event) => {
    event.preventDefault();

    // Verificar se já existe uma indisponibilidade com o mesmo dia e horário
    const duplicada = indisponibilidades.some(
      (indisponibilidade) =>
        indisponibilidade.diaSemana === parseInt(selectedDiaSemana) &&
        indisponibilidade.tempo === parseInt(selectedHorario)
    );

    if (duplicada) {
      alert("Essa indisponibilidade já está registrada para a sala selecionada.");
      return;
    }

    const indisponibilidade = {
      salaId: parseInt(selectedSalaId),
      diaSemana: parseInt(selectedDiaSemana),
      tempo: parseInt(selectedHorario),
    };

    RoomsService.postUnavailableRoom(selectedSalaId, indisponibilidade)
      .then(() => alert("Indisponibilidade adicionada com sucesso."))
      .catch((error) => {
        alert("Erro ao adicionar indisponibilidade.");
        console.error("Erro ao adicionar indisponibilidade:", error);
      });

    // Atualiza as indisponibilidades buscando do banco
    await fetchIndisponibilidades(selectedSalaId);
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
    RoomsService.updateRoom(editSala.id, editSala)
      .then(() => {
        setTabela((prev) => prev.map((s) => (s.id === editSala.id ? editSala : s)));
      })
      .catch((error) => {
        console.error("Erro ao atualizar a sala:", error);
      })
      .finally(() => setIsDialogEditOpen(false));
  };

  const handleDeleteSala = async () => {
    let indisponibilidades = [];

    RoomsService.getRoomById(selectedSalaId)
      .then(async (response) => {
        indisponibilidades = response.data.indisponibilidades;

        if (indisponibilidades.length === 0) {
          alert("Nenhuma indisponibilidade encontrada para esta sala.");
          setIsDialogDeleteOpen(false);
          return;
        }

        // 2. Deletar cada indisponibilidade individualmente
        for (const indisponibilidade of indisponibilidades) {
          RoomsService.deleteUnavailableRoom(selectedSalaId, indisponibilidade.id)
        }

        // 3. Atualizar a tabela de indisponibilidades e fechar o modal
        await fetchIndisponibilidades(selectedSalaId);
        setIsDialogDeleteOpen(false);

        alert("Todas as indisponibilidades da sala foram excluídas com sucesso.");
      }).catch((error) => {
        console.error("Erro ao excluir indisponibilidades:", error);
        alert("Erro ao excluir as indisponibilidades.");
      })
  };

  //Função para Buscar Indisponibilidades
  const fetchIndisponibilidades = async (salaId) => {
    RoomsService.getRoomById(salaId)
      .then((response) => {
        console.log("Dados da sala recebidos:", response.data);

        // Atualiza o estado com as indisponibilidades
        setIndisponibilidades(response.data.indisponibilidades || []);
        setIsIndisponibilidadeListOpen(true); // Abre o modal
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados da sala:", error);
      })
  };

  //organiza as indisponibilidades em um formato que facilite a exibição
  const organizeIndisponibilidades = () => {
    const tabela = Array(3).fill(null).map(() => Array(5).fill(null)); // 3 horários, 5 dias
    indisponibilidades.forEach(({ diaSemana, tempo }) => {
      tabela[tempo - 1][diaSemana - 1] = "X"; // Marca o horário indisponível
    });
    return tabela;
  };

  return (
    <main className="w-full">
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
              <Dialog>
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
                  <div className="grid gap-4 py-4 ">
                    <div className="flex flex-col ml-6">
                      <Label htmlFor="name" className="pb-2">
                        Bloco:
                      </Label>
                      <select
                        className="rounded-md border p-2"
                        value={bloco}
                        onChange={(e) => setBloco(e.target.value)}
                      >
                        <option value={null}>Selecione um bloco</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    </div>

                    <div className="flex flex-col ml-6">
                      <Label htmlFor="username" className="pb-2">
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
                    <div className="flex flex-col ml-6">
                      <Label htmlFor="username" className="pb-2">
                        Capacidade:
                      </Label>
                      <Input
                        id="username"
                        className="col-span-3"
                        value={capacidade}
                        onChange={(e) => setCapacidade(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-3 items-center gap-3 ml-6">
                      <div className="flex items-center gap-2">
                        <Input
                          id="lab"
                          type="checkbox"
                          checked={lab}
                          onChange={(e) => setLab(e.target.checked)}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="lab" className="text-right">Laboratório</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          id="lousa"
                          className="w-4 h-4"
                          type="checkbox"
                          checked={lousa}
                          onChange={(e) => setLousa(e.target.checked)}
                        />
                        <Label htmlFor="lousa" className="text-right">Lousa Digital</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          id="ar"
                          type="checkbox"
                          checked={ar}
                          onChange={(e) => setAr(e.target.checked)}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="ar" className="text-sm font-medium">Ar</Label>
                      </div>
                    </div>


                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="outline"
                      >
                        Cancelar
                      </Button>
                    </DialogClose>
                    <Button type="submit" onClick={(e) => handleSubmitRoom(e)}>
                      Salvar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div>
              <Dialog>
                <DialogTrigger asChild>
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
                    <div className="flex flex-col ml-6">
                      <Label htmlFor="bloco" className="pb-2">
                        Bloco:
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

                    <div className="flex flex-col ml-6">
                      <Label htmlFor="numero" className="pb-2">
                        Numero:
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

                    {/* Seleção do Dia da Semana */}
                    <div className="flex flex-col ml-6">
                      <Label htmlFor="diaSemana" className="pb-2">Dia da Semana:</Label>
                      <select
                        id="diaSemana"
                        className="rounded-md border p-2 col-span-3"
                        value={selectedDiaSemana}
                        onChange={(e) => setSelectedDiaSemana(e.target.value)}
                      >
                        <option value="">Selecione um dia</option>
                        <option value="1">Segunda-feira</option>
                        <option value="2">Terça-feira</option>
                        <option value="3">Quarta-feira</option>
                        <option value="4">Quinta-feira</option>
                        <option value="5">Sexta-feira</option>
                      </select>
                    </div>

                    <div className="flex flex-col ml-6">
                      <Label htmlFor="horario" className="pb-2">
                        Horario:
                      </Label>

                      <select
                        id="horario"
                        className="rounded-md border p-2 col-span-3"
                        value={selectedHorario}
                        onChange={(e) => setSelectedHorario(e.target.value)}
                      >
                        <option>Selecione um horário</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Cancelar
                      </Button>
                    </DialogClose>
                    <Button type="button" onClick={(e) => handleSubmitUnavailable(e)}>Sim</Button>
                  </DialogFooter>
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
                      {/* Botão de Editar */}
                      <button className="mr-2 text-blue-500 hover:text-blue-700">
                        <Pencil onClick={() => handleEditSala(row)} />
                      </button>

                      {/* Botão de Excluir */}
                      <button className="mr-2 text-red-500 hover:text-red-700" onClick={() => handleOpenDeleteDialog(row)}>
                        <Trash2 />
                      </button>

                      {/* Botão de Visualizar */}
                      <button className="mr-2 text-green-500 hover:text-green-700" onClick={() => fetchIndisponibilidades(row.id)}>
                        <Eye />
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Ar:
              </Label>
              <Input
                id="username"
                className="col-span-3"
                type="checkbox"
                checked={editSala.possuiArCondicionado}
                onChange={(e) => handleEditChange("possuiArCondicionado", e.target.checked)}
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
                checked={editSala.possuiLaboratorio}
                onChange={(e) => handleEditChange("possuiLaboratorio", e.target.checked)}
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
                checked={editSala.possuiLoucaDigital}
                onChange={(e) => handleEditChange("possuiLoucaDigital", e.target.checked)}
              />
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

      {/*Modal para Exibir Indisponibilidades*/}
      <Dialog open={isIndisponibilidadeListOpen} onOpenChange={setIsIndisponibilidadeListOpen}>
        <DialogContent className="max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Indisponibilidades</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-200 w-full text-center text-sm">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-2 py-1">Horário</th>
                  <th className="border border-gray-300 px-2 py-1">Segunda</th>
                  <th className="border border-gray-300 px-2 py-1">Terça</th>
                  <th className="border border-gray-300 px-2 py-1">Quarta</th>
                  <th className="border border-gray-300 px-2 py-1">Quinta</th>
                  <th className="border border-gray-300 px-2 py-1">Sexta</th>
                </tr>
              </thead>
              <tbody>
                {organizeIndisponibilidades().map((linha, i) => (
                  <tr key={i}>
                    <td className="border border-gray-300 px-2 py-1">{i + 1}</td>
                    {linha.map((celula, j) => (
                      <td
                        key={j}
                        className={`border border-gray-300 px-2 py-1 ${celula ? "bg-red-300" : "bg-green-300"
                          }`}
                      >
                        {celula || ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsIndisponibilidadeListOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogDeleteOpen} onOpenChange={setIsDialogDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Indisponibilidades</DialogTitle>
          </DialogHeader>
          <p>
            Tem certeza que deseja excluir <b>todas as indisponibilidades</b> da sala{" "}
            {editSala.numero} do bloco {editSala.bloco}?
          </p>
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
