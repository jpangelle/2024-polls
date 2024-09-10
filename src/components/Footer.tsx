"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useMediaQuery } from "react-responsive";

export const Footer = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 545px)",
  });

  return (
    <div
      className={`flex justify-center w-full pb-4 ${
        isMobile ? "mt-7" : "mt-20"
      }`}
    >
      <Link
        href="https://projects.fivethirtyeight.com/2024-election-forecast/"
        target="_blank"
        className="px-1"
      >
        <Image
          src="https://i.imgur.com/izo5MjD.png"
          alt="538 logo"
          width={50}
          height={50}
          className={isMobile ? "size-9" : "size-12"}
        />
      </Link>
      <Link
        href="https://github.com/jpangelle/2024-polls"
        target="_blank"
        className="px-1"
      >
        <Image
          src="https://i.imgur.com/uOxQVYw.png"
          alt="github logo"
          width={50}
          height={50}
          className={isMobile ? "size-9" : "size-12"}
        />
      </Link>
    </div>
  );
};
