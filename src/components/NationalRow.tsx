"use client";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { SHORT_NAMES } from "../constants";

type Props = {
  nationalTableData: StatePollData;
};

export const NationalRow = ({ nationalTableData }: Props) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });

  const computeStateName = (state: string) =>
    isMobile ? SHORT_NAMES[state] : state;

  return (
    <>
      <span className="state national-row">{computeStateName("National")}</span>
      <span className="margin national-row">
        +{nationalTableData.polls2024.margin}
        <span
          className={`circle-2024 ${
            nationalTableData.polls2024.leader === "democratic"
              ? "blue-background"
              : "red-background"
          }`}
        />
      </span>
      <span className="margin national-row">
        +{nationalTableData.results2020.margin}
        <span
          className={`circle-2024 ${
            nationalTableData.results2020.leader === "democratic"
              ? "blue-background"
              : "red-background"
          }`}
        />
      </span>
      <span className="margin national-row">
        +{nationalTableData.polls2020.margin}
        <span
          className={`circle-2024 ${
            nationalTableData.polls2020.leader === "democratic"
              ? "blue-background"
              : "red-background"
          }`}
        />
      </span>
    </>
  );
};
