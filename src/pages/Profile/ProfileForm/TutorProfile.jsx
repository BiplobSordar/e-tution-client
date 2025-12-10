import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { 
  FaChalkboardTeacher, FaBook, FaAward, FaClock 
} from 'react-icons/fa';
import ArrayInput from './ArrayInput';
import AvailabilityInput from './AvailabilityInput';

const TutorProfile = ({
  register,
  control,
  errors,
  subjects,
  setSubjects,
  qualifications,
  setQualifications,
  availability,
  setAvailability
}) => {
  return (
    <div className="space-y-6">
    
      <div className="card">
        <h3 className="text-lg font-semibold mb-6 flex items-center text-text-primary">
          <FaChalkboardTeacher className="w-5 h-5 mr-2 text-primary" />
          Tutor Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HourlyRateField control={control} error={errors.tutorProfile?.hourlyRate} />
          <ExperienceField control={control} error={errors.tutorProfile?.experienceYears} />
          <BioField register={register} error={errors.tutorProfile?.bio} />
        </div>
      </div>


      <ArrayInput
        title="Subjects You Teach"
        icon={<FaBook className="w-5 h-5 mr-2 text-primary" />}
        items={subjects}
        setItems={setSubjects}
        placeholder="Add a subject (e.g., Mathematics, Physics)"
        itemClassName="bg-primary-light text-primary"
      />

  
      <ArrayInput
        title="Qualifications & Certifications"
        icon={<FaAward className="w-5 h-5 mr-2 text-primary" />}
        items={qualifications}
        setItems={setQualifications}
        placeholder="Add a qualification (e.g., M.Sc Mathematics, Teaching License)"
        listStyle
      />

    
      <AvailabilityInput
        availability={availability}
        setAvailability={setAvailability}
      />
    </div>
  );
};

const HourlyRateField = ({ control, error }) => (
  <div>
    <label className="form-label">Hourly Rate (₹)</label>
    <Controller
      name="tutorProfile.hourlyRate"
      control={control}
      render={({ field }) => (
        <input
          type="number"
          {...field}
          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
          className="form-input"
          placeholder="500"
        />
      )}
    />
    {error && <p className="text-error text-sm mt-1">{error.message}</p>}
  </div>
);

const ExperienceField = ({ control, error }) => (
  <div>
    <label className="form-label">Years of Experience</label>
    <Controller
      name="tutorProfile.experienceYears"
      control={control}
      render={({ field }) => (
        <input
          type="number"
          {...field}
          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
          className="form-input"
          placeholder="5"
        />
      )}
    />
    {error && <p className="text-error text-sm mt-1">{error.message}</p>}
  </div>
);

const BioField = ({ register, error }) => (
  <div className="md:col-span-2">
    <label className="form-label">Bio/Introduction</label>
    <textarea
      {...register('tutorProfile.bio')}
      className="form-input min-h-[120px]"
      placeholder="Tell students about your teaching experience, qualifications, and teaching style..."
      maxLength={500}
    />
    {error && <p className="text-error text-sm mt-1">{error.message}</p>}
  </div>
);

export default TutorProfile;