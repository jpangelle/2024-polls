import React from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Table } from "../components/Table";
import { getPollData } from "../getPollData";

export default async function Home() {
  const { stateData, nationalData } = await getPollData();

  return (
    <>
      <Header />
      <Table nationalData={nationalData} stateData={stateData} />
      <Footer />
    </>
  );
}
