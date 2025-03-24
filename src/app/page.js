"use client";
import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Home() {
  const [tabela, setTabela] = useState();
  const [filterValue, setFilterValue] = useState("");
  const [tabelaOriginal, setTabelaOriginal] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpen2, setDialogOpen2] = useState(false);

  const handleFileUpload = (e) => {
    setTabela([]);
    setTabelaOriginal([]);
    setSelectedFile(e.target.files[0]);

    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      const mappedTabela = parsedData.map((tabela, index) => ({
        id: index + 1,
        codigoTurma: tabela.codigoturma,
        professor: tabela.professor,
        disciplina: tabela.disciplina,
        quantidade: tabela.quantidade,
        codigoHorario: tabela.codigohorario,
      }));

      setTabelaOriginal(mappedTabela);
      setTabela(mappedTabela);
    };
  };

  const handleUploadExcel = async () => {
    try {
      if (!selectedFile) {
        alert("Por favor, selecione um arquivo.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await axios.post(
        "http://localhost:5000/api/Turma/importar-excel-turmas",
        formData
      );
      console.log(response.data);
      setTabelaOriginal([]);
      setTabela([]);
      setDialogOpen(false);
    } catch (error) {
      console.error("Erro ao enviar o arquivo:", error);
    }
  };

  const handleEncerrarPeriodo = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/Turma/limpar-semestre"
      );
      setDialogOpen2(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="mb-20">
      <div className="w-full flex font-bold text-4xl justify-center mt-4 mb-8">
        FEMASS
      </div>
      <div className="w-full flex font-bold text-2xl justify-center italic mt-4 mb-16">
        Bem vindo ao aplicativo de alocação de turmas
      </div>

      <div className="ml-2">
        <div className="">
          <label>Importar Arquivo Excel: </label>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        </div>
        <div className="mt-4">
          <Dialog open={dialogOpen2} onOpenChange={setDialogOpen2}>
            <DialogTrigger asChild>
              <button
                className="rounded-md bg-blue-600 text-white p-2"
                onClick={() => setDialogOpen2(true)}
              >
                Encerrar Período Letivo
              </button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Encerrar Período Letivo</DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja encerrar o período letivo?
                </DialogDescription>
              </DialogHeader>

              <form>
                <DialogFooter>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                  <Button type="button" onClick={handleEncerrarPeriodo}>
                    Sim
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {tabela && tabela.length > 0 ? (
        <>
          <div className="p-6 max-w-full mx-auto">
            <div className="w-full flex font-bold text-3xl justify-center mt-4 mb-8">
              Dados da Planilha
            </div>

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
                      <button
                        className="rounded-md bg-blue-600 text-white p-1.5 mr-2 w-[200px]"
                        disabled={!selectedFile} // Desabilita o botão se não houver arquivo
                        onClick={() => setDialogOpen(true)}
                      >
                        Confirmar Importação
                      </button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-xl">Importar</DialogTitle>
                        <DialogDescription>
                          Tem certeza que deseja importar a tabela do excel?
                        </DialogDescription>
                      </DialogHeader>

                      <form>
                        <DialogFooter>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setDialogOpen(false)}
                          >
                            Cancelar
                          </Button>
                          <Button type="button" onClick={handleUploadExcel}>
                            Sim
                          </Button>
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
                    <TableHead>Código da Turma</TableHead>
                    <TableHead>Professor</TableHead>
                    <TableHead>Disciplina</TableHead>
                    <TableHead>Quantidade de Alunos</TableHead>
                    <TableHead>Código do Horário</TableHead>
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
                        <TableCell>{row.codigoTurma}</TableCell>
                        <TableCell>{row.professor}</TableCell>
                        <TableCell>{row.disciplina}</TableCell>
                        <TableCell>{row.quantidade}</TableCell>
                        <TableCell>
                          {row.codigoHorario || "Não possui"}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      ) : null}
    </main>
  );
}
