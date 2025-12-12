
import React, { useState } from "react";
import TeacherCard from "../components/TeacherCard";
import TeacherFilters from "../components/TeacherFilters";
import { useGetTeachersQuery } from "../features/teacher/teacherApi";

const Teachers = () => {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const limit = 12;


  const queryParams = { page, limit };
  if (filters.city) queryParams.city = filters.city;
  if (filters.subject) queryParams.subject = filters.subject;
  if (filters.minExperience) queryParams.minExperience = filters.minExperience;
  if (filters.maxSalary) queryParams.maxSalary = filters.maxSalary;

  const { data, isLoading, isFetching } = useGetTeachersQuery(queryParams);

  const teachers = data?.teachers || [];
  const totalPages = data ? Math.ceil(data.count / limit) : 1;

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
  
      <div className="lg:col-span-1">
        <TeacherFilters filters={filters} setFilters={setFilters} />
      </div>


      <div className="lg:col-span-3 space-y-6">
        {isLoading || isFetching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: limit }).map((_, idx) => (
              <div key={idx} className="skeleton h-48 w-full rounded-lg"></div>
            ))}
          </div>
        ) : teachers.length === 0 ? (
          <div className="empty-state">
            <p>No teachers found matching filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <TeacherCard key={teacher._id} teacher={teacher} />
            ))}
          </div>
        )}

    
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6 flex-wrap">
            <button
              className="btn-outline px-3 py-1"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 rounded ${page === idx + 1 ? "btn-primary" : "btn-outline"}`}
                onClick={() => setPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              className="btn-outline px-3 py-1"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teachers;
