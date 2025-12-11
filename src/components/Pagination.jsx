import React from "react";

const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;


  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
     
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
    
      pages.push(1);

      const left = page - 1;
      const right = totalPages - page;

      if (page > 3) pages.push("...");

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) pages.push("...");

    
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex-center gap-2 mt-6 select-none">


      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="btn-outline"
      >
        Prev
      </button>


      <div className="flex gap-2">
        {pages.map((p, idx) =>
          p === "..." ? (
            <span
              key={idx}
              className="px-3 py-1 text-text-secondary"
            >
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => onChange(p)}
              className={`
                px-3 py-1 rounded-md border cursor-pointer
                transition-all
                ${page === p
                  ? "bg-primary text-white border-primary"
                  : "border-border bg-hover-bg text-text-primary hover:bg-primary hover:text-white"
                }
              `}
            >
              {p}
            </button>
          )
        )}
      </div>


      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="btn-outline"
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;
