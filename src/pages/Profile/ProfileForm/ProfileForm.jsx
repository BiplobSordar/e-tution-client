import React, { useState } from 'react';
import { toast } from "react-hot-toast";
import { useForm, } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import FormHeader from './FormHeader';
import RoleSelection from './RoleSelection';
import BasicInformation from './BasicInformation';
import AddressInformation from './AddressInformation';
import TutorProfile from './TutorProfile';
import StudentProfile from './StudentProfile';
import GuardianProfile from './GuardianProfile';
import AdminProfile from './AdminProfile';
import { profileSchema } from './validationSchema';
import { useUploadAvatarMutation } from '../../../features/user/userApi';

const ProfileForm = ({ user, onSave, onCancel, mode = 'edit', refetchUser }) => {
  const [selectedRole, setSelectedRole] = useState(user?.role || 'student');
  const [subjects, setSubjects] = useState(user?.tutorProfile?.subjects || []);
  const [qualifications, setQualifications] = useState(user?.tutorProfile?.qualifications || []);
  const [studentSubjects, setStudentSubjects] = useState(user?.studentProfile?.subjectsInterested || []);
  const [learningGoals, setLearningGoals] = useState(user?.studentProfile?.learningGoals || []);
  const [availability, setAvailability] = useState(user?.tutorProfile?.availability || []);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarUrl || '');
  const [uploadAvatar, { isLoading }] = useUploadAvatarMutation()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
      address: user?.address || {},
      avatarUrl: user?.avatarUrl || '',
      tutorProfile: user?.tutorProfile || null,
      studentProfile: user?.studentProfile || null,
      guardianProfile: user?.guardianProfile || null,
      adminProfile: user?.adminProfile || null,
    },
  });

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      role: selectedRole,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString() : undefined,
    };


    if (selectedRole === 'teacher') {
      formattedData.tutorProfile = {
        ...formattedData.tutorProfile,
        subjects,
        qualifications,
        availability,
      };
    } else if (selectedRole === 'student') {
      formattedData.studentProfile = {
        ...formattedData.studentProfile,
        subjectsInterested: studentSubjects,
        learningGoals,
      };
    }

    onSave(formattedData);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG images are allowed!");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Image size should not exceed 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;


      setAvatarPreview(base64);

      try {

        const res = await uploadAvatar(base64).unwrap();


        setValue("avatarUrl", res.avatarUrl);

        toast.success("Avatar uploaded successfully!");
        await refetchUser()
      } catch (err) {
        console.error("Avatar upload error:", err);
        toast.error(err?.data?.message || "Upload failed. Try again.");
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <FormHeader
        mode={mode}
        onCancel={onCancel}
        isSubmitting={isSubmitting}
      />

      {mode === 'create' && (
        <RoleSelection
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          userRole={user?.role}
        />
      )}

      <BasicInformation
        register={register}
        errors={errors}
        avatarPreview={avatarPreview}
        handleAvatarUpload={handleAvatarUpload}
        uploadAvatarLoading={isLoading}
      />

      <AddressInformation register={register} />


      {selectedRole === 'teacher' && (
        <TutorProfile
          register={register}
          control={control}
          errors={errors}
          subjects={subjects}
          setSubjects={setSubjects}
          qualifications={qualifications}
          setQualifications={setQualifications}
          availability={availability}
          setAvailability={setAvailability}
        />
      )}

      {selectedRole === 'student' && (
        <StudentProfile
          register={register}
          studentSubjects={studentSubjects}
          setStudentSubjects={setStudentSubjects}
          learningGoals={learningGoals}
          setLearningGoals={setLearningGoals}
        />
      )}

      {selectedRole === 'guardian' && <GuardianProfile register={register} />}
      {selectedRole === 'admin' && <AdminProfile register={register} />}

      <div className="flex justify-end space-x-3 pt-6 border-t border-border">
        <button
          type="button"
          onClick={onCancel}
          className="btn-outline"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
        >
          {isSubmitting ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;