
const TeacherFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value }); 
  };

  const handleReset = () => {
    setFilters({ city: "", subject: "", minExperience: "", maxSalary: "" });
  };

  return (
    <div className="card space-y-4">
      <h3 className="font-semibold text-text-primary text-lg">Filters</h3>

      <div className="space-y-2">
        <div>
          <label className="form-label">City</label>
          <input
            type="text"
            name="city"
            value={filters.city || ""}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter city"
          />
        </div>

        <div>
          <label className="form-label">Subject</label>
          <input
            type="text"
            name="subject"
            value={filters.subject || ""}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter subject"
          />
        </div>

        <div>
          <label className="form-label">Minimum Experience (years)</label>
          <input
            type="number"
            name="minExperience"
            value={filters.minExperience || ""}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g. 2"
            min={0}
          />
        </div>

        <div>
          <label className="form-label">Maximum Salary ($/hr)</label>
          <input
            type="number"
            name="maxSalary"
            value={filters.maxSalary || ""}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g. 50"
            min={0}
          />
        </div>
      </div>

      <button className="btn-outline w-full mt-2" onClick={handleReset}>
        Reset Filters
      </button>
    </div>
  );
};

export default TeacherFilters;
