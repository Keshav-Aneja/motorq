import { IoMdArrowForward } from "react-icons/io";
import { Button } from "../ui/button";
interface Props {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  dataLength: number;
}
export default function Pagination({
  currentPage,
  setCurrentPage,
  itemsPerPage,
  dataLength = 0,
}: Props) {
  const pages = Math.ceil(dataLength / itemsPerPage);
  return (
    <>
      <section className="--pagination flex justify-center text-xs md:text-base">
        <Button
          variant="ghost"
          onClick={() => {
            if (currentPage > 1) setCurrentPage(currentPage - 1);
            const table = document.querySelector(".--filters");
            table?.scrollIntoView({ behavior: "smooth" });
          }}
          className="text-xs md:text-base flex items-center gap-1 md:gap-2"
        >
          <>
            <IoMdArrowForward className="rotate-180" />
            <span>Prev 10</span>
          </>
        </Button>
        <div className="flex items-center mx-2 md:mx-10">
          <span className={`${pages < 6 && "hidden"}`}>...</span>
          {Array.from({ length: pages }, (_, index) => (
            <span
              key={index}
              className={`mx-2 cursor-pointer hover:text-main p-2 ${
                currentPage === index + 1 &&
                "text-main underline underline-offset-4"
              } ${
                pages > 8 && Math.abs(currentPage - index) > 3 ? "hidden" : ""
              } ${
                pages > 4 && Math.abs(currentPage - index) > 1
                  ? "hidden"
                  : Math.abs(currentPage - index) > 3
                  ? "md:hidden"
                  : "md:block"
              }`}
              onClick={() => {
                setCurrentPage(index + 1);
                const table = document.querySelector(".--filters");
                table?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {index + 1}
            </span>
          ))}
          <span className={`${pages < 6 && "hidden"}`}>...</span>
        </div>

        <Button
          variant="ghost"
          onClick={() => {
            if (currentPage < pages) setCurrentPage(currentPage + 1);
            const table = document.querySelector(".--filters");
            table?.scrollIntoView({ behavior: "smooth" });
          }}
          className="text-xs md:text-base flex items-center gap-1 md:gap-2"
        >
          <>
            {" "}
            <span>Next 10</span>
            <IoMdArrowForward />
          </>
        </Button>
      </section>
    </>
  );
}
