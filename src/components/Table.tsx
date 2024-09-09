"use client";
import React, { Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import { SHORT_NAMES } from "../constants";
import { NationalRow } from "./NationalRow";

type Props = {
  nationalData: StatePollData;
  stateData: StatePollData[];
};

export const Table = ({ nationalData, stateData }: Props) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });

  const computeStateName = (state: string) =>
    isMobile ? SHORT_NAMES[state] : state;

  return (
    <div className="table">
      <h3 className="table-header year-2024">2024 Polling</h3>
      <h3 className="table-header year-2020">2020 Results</h3>
      <h3 className="table-header year-2020">2020 Polling</h3>
      <NationalRow nationalTableData={nationalData} />
      {stateData.map(({ results2020, polls2024, polls2020, state }) => (
        <Fragment key={state}>
          <span className="state">{computeStateName(state)}</span>
          <span className="margin">
            +{polls2024.margin}
            <span
              className={`circle-2024 ${
                polls2024.leader === "democratic"
                  ? "blue-background"
                  : "red-background"
              }`}
            />
          </span>
          <span className="margin">
            +{results2020.margin}
            <span
              className={`circle-2024 ${
                results2020.leader === "democratic"
                  ? "blue-background"
                  : "red-background"
              }`}
            />
          </span>
          <span className="margin">
            +{polls2020.margin}
            <span
              className={`circle-2024 ${
                polls2020.leader === "democratic"
                  ? "blue-background"
                  : "red-background"
              }`}
            />
          </span>
        </Fragment>
      ))}
    </div>
  );
};
