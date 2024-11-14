"use client";

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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
  
export default function AlocarTurmaSala() {

    const [tabela, setTabela] = useState([]);

    useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/Turma")
        setTabela(response.data);
        console.log("data", response.data);
      } catch (error) {
        console.log(error)
      }
    }

    getData();
    }, [])
    
    return(
        <h1>OLA</h1>
    )
}