type Props = {
  margin: string;
  leader: "democratic" | "republican" | "tie";
  isNational?: boolean;
};

export const Margin = ({ margin, leader, isNational = false }: Props) => {
  return (
    <div className="flex items-center gap-x-1 justify-center">
      <div className={`${isNational ? "font-semibold" : ""}`}>+{margin}</div>
      <div
        className={`size-2 rounded-full ${
          leader === "democratic" ? "bg-[#576ca2]" : "bg-[#e15148]"
        }`}
      />
    </div>
  );
};
