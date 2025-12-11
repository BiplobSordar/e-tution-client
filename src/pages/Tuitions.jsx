import React, { useState } from "react";
import { useGetTuitionsQuery } from "../features/tution/tutionApi.js";
import TuitionCard from "../components/TuitionCard.jsx";
import TuitionFilters from "../components/TuitionFilters.jsx";
import Pagination from "../components/Pagination.jsx";

const Tuitions = () => {
  const [filters, setFilters] = useState({
    city: "",
    grade: "",
    subject: "",
    tuitionType: "",
  });

  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetTuitionsQuery({
    page,
    limit: 15,
    ...filters
  });

  return (
    <div className="max-w-[1600px] mx-auto py-6 px-4 sm:px-6">

      <h1 className="text-2xl font-bold text-text-primary mb-6">Available Tuitions</h1>


      <div className="mb-6">
        <TuitionFilters filters={filters} setFilters={setFilters} />
      </div>


      {isLoading && (
        <div className="grid-responsive gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="card skeleton h-48 w-full sm:h-52"></div>
          ))}
        </div>
      )}


      {!isLoading && data?.tuitions?.length === 0 && (
        <div className="empty-state py-10">
          <div className="empty-state-icon">📭</div>
          No tuitions found. Try changing filters.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {!isLoading && data?.tuitions?.map((t) => (
          <TuitionCard key={t._id} tution={t} />
        ))}
      </div>


      {data?.totalPages > 1 && (
        <div className="mt-8 flex justify-center overflow-x-auto">
          <Pagination
            page={data.page}
            totalPages={data.totalPages}
            onChange={(p) => setPage(p)}
          />
        </div>
      )}

    </div>
  );
};

export default Tuitions;
