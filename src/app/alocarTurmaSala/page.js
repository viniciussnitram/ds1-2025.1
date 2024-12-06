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
} from "@/components/ui/dialog"

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye } from "lucide-react";

export default function AlocarTurmaSala() {
  const [tabela, setTabela] = useState([]);
  const [filterDia, setFilterDia] = useState(0);
  const [filterHora, setFilterHora] = useState(0);
  const [filterValue, setFilterValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpen2, setDialogOpen2] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState(null);
  const [alocacoes, setAlocacoes] = useState([]);
  const [alocarTurmaSala, setAlocarTurmaSala] = useState({
    turmaId: 0,
    salaId: 0,
    diaSemana: 0,
    tempoSala: 0,
  });
  const [salasDisponiveis, setSalasDisponiveis] = useState([]);
  const [selectedSala, setSelectedSala] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/Turma");
        const mapResponse = response.data.map((turma) => ({
          id: turma.id,
          professor: turma.professor,
          disciplina: turma.disciplina.nome,
          quantidadeAlunos: turma.quantidadeAlunos,
          codigoHorario: turma.codigoHorario,
          necessitaLaboratorio: turma.disciplina.necessitaLaboratorio,
          necessitaArCondicionado: turma.disciplina.necessitaArCondicionado,
          necessitaLoucaDigital: turma.disciplina.necessitaLoucaDigital,
          alocacoes: "",
        }))
        setTabela(mapResponse);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const handleAlocarTurmaSala = async () => {
    try {
      const turma = {
        turmaId: selectedTurma.id,
        salaId: selectedSala.id,
        diaSemana: parseInt(filterDia),
        tempoSala: parseInt(filterHora),
      }
      const response = await axios.post("http://localhost:5000/api/Turma/alocar-turma", turma);
      setDialogOpen(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleBuscarSalasDisponiveis = async (turmaId) => {
    try {
      const response = await axios.get("http://localhost:5000/api/Turma/obter-salas-disponiveis", {
        params: {
          TurmaId: turmaId,
          DiaSemana: parseInt(filterDia),
          TempoAula: parseInt(filterHora),
        },
      });
      setSalasDisponiveis((prev) => ({ ...prev, [turmaId]: response.data }));
    } catch (error) {
      console.log(error);
    }
  }

  const handleAlocacoesTurma = async (id) => {
    try {
      const response = await axios.get("http://localhost:5000/api/Turma/", id);
      setAlocacoes(response.data);
      console.log(response.data);
      setDialogOpen2(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="min-h-screen mb-20">
      <div className="w-full flex font-bold text-4xl justify-center mt-4 mb-8">
        Alocar Turma na Sala
      </div>

      <div className="p-6">
        <div className="flex items-center mb-4 gap-2">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Filtrar"
              className="border border-black"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="dia" className="text-right">
              Dia da Semana:
            </Label>
            <select
              className="rounded-md border p-2 col-span-3"
              value={filterDia}
              onChange={(e) => setFilterDia(e.target.value)}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>

          <div className="flex items-center gap-2">

            <Label htmlFor="dia" className="text-right">
              Hora:
            </Label>
            <select
              className="rounded-md border p-2 col-span-3"
              value={filterHora}
              onChange={(e) => setFilterHora(e.target.value)}
            >
              <option>Selecione uma Opção</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>

        <div className="border rounded-lg p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Disciplina</TableHead>
                <TableHead>Professor</TableHead>
                <TableHead>Qtd Alunos</TableHead>
                <TableHead>Cód. Horário</TableHead>
                <TableHead>Laboratório</TableHead>
                <TableHead>Lousa</TableHead>
                <TableHead>Ar</TableHead>
                <TableHead>Sala Disponíveis</TableHead>
                <TableHead>Alocaçoes</TableHead>
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
                    <TableCell>{row.disciplina}</TableCell>
                    <TableCell>{row.professor}</TableCell>
                    <TableCell>{row.quantidadeAlunos}</TableCell>
                    <TableCell>{row.codigoHorario}</TableCell>
                    <TableCell>{row.necessitaLaboratorio ? "Sim" : "Não"}</TableCell>
                    <TableCell>{row.necessitaArCondicionado ? "Sim" : "Não"}</TableCell>
                    <TableCell>{row.necessitaLoucaDigital ? "Sim" : "Não"}</TableCell>
                    <TableCell>
                      <select
                        className="rounded-md border p-2"
                        value={selectedSala?.id || ""}
                        onClick={() => handleBuscarSalasDisponiveis(row.id)} // Chama a função ao clicar
                        onChange={(e) => {
                          const selected = salasDisponiveis[row.id]?.find(sala => sala.id === parseInt(e.target.value));
                          setSelectedSala(selected);
                        }}
                      >
                        <option value="">Selecione uma sala</option>
                        {salasDisponiveis[row.id]?.map((sala) => (
                          <option key={sala.id} value={sala.id}>
                            Sala: Bloco {sala.bloco} - Número {sala.numero}
                          </option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell>
                      <button className="mr-2 text-green-500 hover:text-green-700" onClick={() => {
                        handleAlocacoesTurma(row.id);
                        setDialogOpen2(true);
                      }}>
                        <Eye />
                      </button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => {
                        setSelectedTurma(row); // Define a turma selecionada
                        setDialogOpen(true);   // Abre o diálogo
                      }}>
                        Salvar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        <div className="">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Alocar Turma</DialogTitle>
                <DialogDescription>
                  {selectedTurma && (
                    <>
                      <p>Tem certeza que deseja alocar a turma {selectedTurma.disciplina} do professor {selectedTurma.professor} na sala {selectedSala.numero} bloco {selectedSala.bloco}?</p>
                    </>
                  )}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button type="button" onClick={() => {
                  handleAlocarTurmaSala();
                  setDialogOpen(false);
                }}
                >
                  Sim
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={dialogOpen2} onOpenChange={setDialogOpen2}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Alocaçoes</DialogTitle>
                <DialogDescription>
                  {alocacoes && (
                    <>

                    </>
                  )}
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen2(false)}>Fechar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
}
