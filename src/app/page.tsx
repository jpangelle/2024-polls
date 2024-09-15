import axios from "axios";
import React from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Table } from "../components/Table";
import { polls2020Data, results2020Data } from "../constants";

const getLeader = (median: number) => {
  if (median.toFixed(1) === "0.0") {
    return "tie" as const;
  }

  if (median > 0) {
    return "democratic" as const;
  }

  return "republican" as const;
};

export default async function Home() {
  const { data } = await axios<
    { state: string; metrics: [{ median: number }] }[]
  >("https://projects.fivethirtyeight.com/2024-election-forecast/priors.json");

  const nationalData = {
    polls2024: {
      margin: Math.abs(data[0].metrics[0].median).toFixed(1),
      leader: getLeader(data[0].metrics[0].median),
    },
    results2020: results2020Data["National"],
    polls2020: polls2020Data["National"],
    state: "National",
  };

  const stateData = [
    {
      polls2024: {
        margin: Math.abs(data[53].metrics[0].median).toFixed(1),
        leader: getLeader(data[53].metrics[0].median),
      },
      results2020: results2020Data["Arizona"],
      polls2020: polls2020Data["Arizona"],
      state: "Arizona",
    },
    {
      polls2024: {
        margin: Math.abs(data[46].metrics[0].median).toFixed(1),
        leader: getLeader(data[46].metrics[0].median),
      },
      results2020: results2020Data["Georgia"],
      polls2020: polls2020Data["Georgia"],
      state: "Georgia",
    },
    {
      polls2024: {
        margin: Math.abs(data[32].metrics[0].median).toFixed(1),
        leader: getLeader(data[32].metrics[0].median),
      },
      results2020: results2020Data["Michigan"],
      polls2020: polls2020Data["Michigan"],
      state: "Michigan",
    },

    {
      polls2024: {
        margin: Math.abs(data[18].metrics[0].median).toFixed(1),
        leader: getLeader(data[18].metrics[0].median),
      },
      results2020: results2020Data["Nevada"],
      polls2020: polls2020Data["Nevada"],
      state: "Nevada",
    },
    {
      polls2024: {
        margin: Math.abs(data[27].metrics[0].median).toFixed(1),
        leader: getLeader(data[27].metrics[0].median),
      },
      results2020: results2020Data["North Carolina"],
      polls2020: polls2020Data["North Carolina"],
      state: "North Carolina",
    },
    {
      polls2024: {
        margin: Math.abs(data[13].metrics[0].median).toFixed(1),
        leader: getLeader(data[13].metrics[0].median),
      },
      results2020: results2020Data["Pennsylvania"],
      polls2020: polls2020Data["Pennsylvania"],
      state: "Pennsylvania",
    },
    {
      polls2024: {
        margin: Math.abs(data[3].metrics[0].median).toFixed(1),
        leader: getLeader(data[3].metrics[0].median),
      },
      results2020: results2020Data["Wisconsin"],
      polls2020: polls2020Data["Wisconsin"],
      state: "Wisconsin",
    },
  ];

  return (
    <>
      <Header />
      <Table nationalData={nationalData} stateData={stateData} />
      <Footer />
    </>
  );
}
