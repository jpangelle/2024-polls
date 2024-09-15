"use client";
import React, { Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import { SHORT_NAMES } from "../constants";
import { Margin } from "./Margin";
import { NationalRow } from "./NationalRow";
import { TableHeader } from "./TableHeader";

type Props = {
  nationalData: StatePollData;
  stateData: StatePollData[];
};

export const Table = ({ nationalData, stateData }: Props) => {
  const isShort = useMediaQuery({
    query: "(max-width: 685px)",
  });

  const computeStateName = (state: string) =>
    isShort ? SHORT_NAMES[state] : state;

  return (
    <div className="grid grid-cols-[repeat(4,_min-content)] gap-x-5 gap-y-2 justify-center text-left text-xl mt-5">
      <div />
      <TableHeader>2024 Forecasts</TableHeader>
      <TableHeader>2020 Results</TableHeader>
      <TableHeader>2020 Polling</TableHeader>
      <NationalRow nationalTableData={nationalData} />
      {stateData.map(({ results2020, polls2024, polls2020, state }) => (
        <Fragment key={state}>
          <div className="whitespace-nowrap">{computeStateName(state)}</div>
          <Margin margin={polls2024.margin} leader={polls2024.leader} />
          <Margin margin={results2020.margin} leader={results2020.leader} />
          <Margin margin={polls2020.margin} leader={polls2020.leader} />
        </Fragment>
      ))}
    </div>
  );
};
