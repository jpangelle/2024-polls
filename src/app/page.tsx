import React from "react";
import "../App.css";
import { Footer } from "../components/Footer";
import { Table } from "../components/Table";
import { getPollData } from "../getPollData";

export default async function Home() {
  const { stateData, nationalData } = await getPollData();

  return (
    <div className="App">
      <div className="header">FiveThirtyEight Polling</div>
      <Table nationalData={nationalData} stateData={stateData} />
      <Footer />
    </div>
  );
}
