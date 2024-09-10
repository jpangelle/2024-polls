import { useMediaQuery } from "react-responsive";

export const TableHeader = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 545px)",
  });

  const mobileStyles = "text-lg w-min mb-3";
  const desktopStyles = "text-xl w-[145px] mt-3";

  return (
    <h3 className={`text-center ${isMobile ? mobileStyles : desktopStyles}`}>
      {children}
    </h3>
  );
};
