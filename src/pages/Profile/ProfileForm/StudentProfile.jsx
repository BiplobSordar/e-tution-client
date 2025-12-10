import React from 'react';
import { FaUserGraduate, FaBook, FaBullseye } from 'react-icons/fa';
import ArrayInput from './ArrayInput';

const StudentProfile = ({
  register,
  studentSubjects,
  setStudentSubjects,
  learningGoals,
  setLearningGoals
}) => {
  return (
    <div className="space-y-6">
     
      <div className="card">
        <h3 className="text-lg font-semibold mb-6 flex items-center text-text-primary">
          <FaUserGraduate className="w-5 h-5 mr-2 text-primary" />
          Student Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StudentField
            label="Grade/Class"
            name="studentProfile.grade"
            register={register}
            placeholder="e.g., 12th Grade, College Freshman"
          />
          
          <StudentField
            label="School/College"
            name="studentProfile.school"
            register={register}
            placeholder="e.g., Delhi Public School"
          />
          
          <StudentField
            label="Guardian Contact Email"
            name="studentProfile.guardianContact"
            register={register}
            type="email"
            placeholder="parent@email.com"
          />
        </div>
      </div>

     
      <ArrayInput
        title="Subjects Interested In"
        icon={<FaBook className="w-5 h-5 mr-2 text-primary" />}
        items={studentSubjects}
        setItems={setStudentSubjects}
        placeholder="Add a subject you want to learn"
        itemClassName="bg-secondary-light text-secondary"
      />

   
      <ArrayInput
        title="Learning Goals"
        icon={<FaBullseye className="w-5 h-5 mr-2 text-primary" />}
        items={learningGoals}
        setItems={setLearningGoals}
        placeholder="Add a learning goal (e.g., Score 95% in exams)"
        listStyle
      />
    </div>
  );
};

const StudentField = ({ label, name, register, type = 'text', placeholder }) => (
  <div>
    <label className="form-label">{label}</label>
    <input
      type={type}
      {...register(name)}
      className="form-input"
      placeholder={placeholder}
    />
  </div>
);

export default StudentProfile;