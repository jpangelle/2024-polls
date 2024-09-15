type Props = {
  margin: string;
  leader: Leader;
  isNational?: boolean;
};

const getLeaderColor = (leader: Leader) => {
  if (leader === "democratic") {
    return "bg-[#576ca2]";
  }

  if (leader === "republican") {
    return "bg-[#e15148]";
  }

  return "bg-gray-300";
};

export const Margin = ({ margin, leader, isNational = false }: Props) => {
  return (
    <div className="flex items-center gap-x-1 justify-center">
      <div className={`${isNational ? "font-semibold" : ""}`}>+{margin}</div>
      <div className={`size-2 rounded-full ${getLeaderColor(leader)}`} />
    </div>
  );
};
