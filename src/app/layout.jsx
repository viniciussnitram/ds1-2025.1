import Container from "@/components/container";
import Header from "@/components/header";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Desenvolvimento de Sistemas 1",
  description: "Site para Alocação de turmas da faculdade FEMASS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Container>
          <Header />
          {children}
        </Container>
      </body>
    </html>
  );
}
