import React from "react";

const TuitionFilters = ({ filters, setFilters }) => {

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="card mb-4 animate-fade-in grid grid-cols-1 md:grid-cols-4 gap-4">

      <div>
        <label className="form-label">City</label>
        <input
          type="text"
          name="city"
          value={filters.city}
          onChange={handleChange}
          className="form-input"
          placeholder="Enter city"
        />
      </div>

      <div>
        <label className="form-label">Grade</label>
        <input
          type="text"
          name="grade"
          value={filters.grade}
          onChange={handleChange}
          className="form-input"
          placeholder="6, 9, 10..."
        />
      </div>

      <div>
        <label className="form-label">Subject</label>
        <input
          type="text"
          name="subject"
          value={filters.subject}
          onChange={handleChange}
          className="form-input"
          placeholder="Math, English..."
        />
      </div>

      <div>
        <label className="form-label">Tuition Type</label>
        <select
          name="tuitionType"
          value={filters.tuitionType}
          onChange={handleChange}
          className="form-input"
        >
          <option className="w-full"  value="">All</option>
          <option  className="w-full" value="online">Online</option>
          <option className="w-full"  value="offline">Offline</option>
          <option className="w-full"  value="hybrid">Hybrid</option>
        </select>
      </div>
      


    </div>
  );
};

export default TuitionFilters;
