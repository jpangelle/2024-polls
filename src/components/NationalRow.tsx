"use client";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { SHORT_NAMES } from "../constants";
import { Margin } from "./Margin";

type Props = {
  nationalTableData: StatePollData;
};

export const NationalRow = ({ nationalTableData }: Props) => {
  const isShort = useMediaQuery({
    query: "(max-width: 685px)",
  });

  const computeStateName = (state: string) =>
    isShort ? SHORT_NAMES[state] : state;

  return (
    <>
      <div className="font-semibold">{computeStateName("National")}</div>
      <Margin
        margin={nationalTableData.polls2024.margin}
        leader={nationalTableData.polls2024.leader}
        isNational
      />
      <Margin
        margin={nationalTableData.results2020.margin}
        leader={nationalTableData.results2020.leader}
        isNational
      />
      <Margin
        margin={nationalTableData.polls2020.margin}
        leader={nationalTableData.polls2020.leader}
        isNational
      />
    </>
  );
};
