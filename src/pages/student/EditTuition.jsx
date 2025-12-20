import React, { useState, useEffect, useMemo } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from 'react-hot-toast';
import { useGetTuitionQuery, useUpdateTuitionMutation } from "../../features/tution/tutionApi";
import { FiSave, FiX, FiAlertCircle, FiInfo, FiCalendar, FiClock, FiMapPin, FiDollarSign, FiBook } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const gradeSubjects = {
  "1": ["Bangla", "English", "Math", "General Knowledge"],
  "2": ["Bangla", "English", "Math", "General Knowledge"],
  "3": ["Bangla", "English", "Math", "Science", "General Knowledge"],
  "4": ["Bangla", "English", "Math", "Science", "General Knowledge"],
  "5": ["Bangla", "English", "Math", "Science", "General Knowledge"],
  "6": ["Bangla", "English", "Math", "Science", "Islam/Religion", "Social Science"],
  "7": ["Bangla", "English", "Math", "Science", "Islam/Religion", "Social Science"],
  "8": ["Bangla", "English", "Math", "Science", "Islam/Religion", "Social Science"],
  "9": ["Bangla", "English", "Math", "Physics", "Chemistry", "Biology", "Higher Math", "ICT"],
  "10": ["Bangla", "English", "Math", "Physics", "Chemistry", "Biology", "Higher Math", "ICT"],
  "11": ["Bangla", "English", "Physics", "Chemistry", "Biology", "Higher Math", "ICT", "Accounting", "Economics"],
  "12": ["Bangla", "English", "Physics", "Chemistry", "Biology", "Higher Math", "ICT", "Accounting", "Economics"],
  "Honours": ["Bangla", "English", "Physics", "Chemistry", "Biology", "Higher Math", "ICT", "Accounting", "Economics", "Philosophy", "Political Science"],
};

const weekDays = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" }
];

const tuitionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  grade: z.string().min(1, "Grade is required"),
  subjects: z.array(z.string()).min(1, "Select at least one subject"),
  tuitionType: z.enum(["offline", "online", "hybrid"]),
  location: z.object({
    city: z.string().optional(),
    area: z.string().optional(),
    address: z.string().optional(),
  }),
  totalFee: z.number().min(1, "Fee must be positive"),
  status: z.enum(["open", "assigned", "in-progress", "completed", "cancelled"]),
  scheduleProposals: z.array(
    z.object({
      role: z.enum(["student", "guardian"]),
      proposedBy: z.string().min(1, "Proposed by is required"), // Add this line
      schedule: z.array(
        z.object({
          day: z.number().min(0, "Select valid day").max(6, "Invalid day"),
          from: z.string().min(1, "Start time required"),
          to: z.string().min(1, "End time required"),
          subject: z.string().optional(),
        })
      ).optional(),
    })
  ).optional(),
}).refine(
  (data) => data.tuitionType === "online" || (data.location.city && data.location.area),
  { message: "City and area are required for offline/hybrid tuition", path: ["location"] }
);

export default function EditTuition() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const { data: tuitionData, isLoading, error } = useGetTuitionQuery(id);
  const [updateTuition, { isLoading: isUpdating }] = useUpdateTuitionMutation();
  const [availableSubjects, setAvailableSubjects] = useState([]);
  
  const { register, control, handleSubmit, watch, setValue, reset, formState: { errors, isDirty } } = useForm({
    resolver: zodResolver(tuitionSchema),
    defaultValues: {
      title: "",
      description: "",
      grade: "",
      subjects: [],
      tuitionType: "offline",
      location: { city: "", area: "", address: "" },
      totalFee: 0,
      status: "open",
      scheduleProposals: [],
    },
  });

  const { fields, append, remove } = useFieldArray({ 
    control, 
    name: "scheduleProposals",
    keyName: "proposalKey"
  });
  
  const tuitionType = watch("tuitionType");
  const selectedGrade = watch("grade");
  const subjects = watch("subjects");

  const canEdit = useMemo(() => {
    if (!tuitionData || !user) return false;
    return user._id === tuitionData.postedBy?._id && !tuitionData.assignedTutor;
  }, [tuitionData, user]);

  useEffect(() => {
    if (selectedGrade && gradeSubjects[selectedGrade]) {
      setAvailableSubjects(gradeSubjects[selectedGrade]);
      const currentSubjects = subjects || [];
      const validSubjects = currentSubjects.filter(subj => 
        gradeSubjects[selectedGrade].includes(subj)
      );
      if (validSubjects.length !== currentSubjects.length) {
        setValue("subjects", validSubjects);
      }
    } else {
      setAvailableSubjects([]);
      setValue("subjects", []);
    }
  }, [selectedGrade, setValue, subjects]);

  useEffect(() => {
    if (tuitionData && user) {
      if (!canEdit) {
        if (user?._id !== tuitionData.postedBy?._id) {
          toast.error("You are not authorized to edit this tuition");
        } else if (tuitionData.assignedTutor) {
          toast.error("Cannot edit tuition that has an assigned tutor");
        }
        navigate(`/tutions/${id}`);
        return;
      }

      let scheduleProposalsData = [];
      if (tuitionData.scheduleProposals && tuitionData.scheduleProposals.length > 0) {
        scheduleProposalsData = tuitionData.scheduleProposals.map(proposal => ({
          role: proposal.role || "student",
          proposedBy: proposal.proposedBy || user._id, 
          schedule: (proposal.schedule || []).map(slot => ({
            day: slot.day || 0,
            from: slot.from || "",
            to: slot.to || "",
            subject: slot.subject || tuitionData.subjects?.[0] || ""
          }))
        }));
      }

      reset({
        title: tuitionData.title || "",
        description: tuitionData.description || "",
        grade: tuitionData.grade || "",
        subjects: tuitionData.subjects || [],
        tuitionType: tuitionData.tuitionType || "offline",
        location: {
          city: tuitionData.location?.city || "",
          area: tuitionData.location?.area || "",
          address: tuitionData.location?.address || ""
        },
        totalFee: tuitionData.totalFee || 0,
        status: tuitionData.status || "open",
        scheduleProposals: scheduleProposalsData,
      });

      if (tuitionData.grade && gradeSubjects[tuitionData.grade]) {
        setAvailableSubjects(gradeSubjects[tuitionData.grade]);
      }
    }
  }, [tuitionData, user, id, navigate, reset, canEdit]);

  const handleSubjectsChange = (subject, isChecked) => {
    const currentSubjects = subjects || [];
    if (isChecked) {
      setValue("subjects", [...currentSubjects, subject], { shouldDirty: true });
    } else {
      setValue("subjects", currentSubjects.filter(s => s !== subject), { shouldDirty: true });
    }
  };

  const onSubmit = async (data) => {
    try {
 
      const processedData = {
        ...data,
        scheduleProposals: data.scheduleProposals
          ?.map(proposal => ({
            role: proposal.role,
            proposedBy: proposal.proposedBy || user._id, 
            schedule: proposal.schedule
              ?.filter(slot => slot.from && slot.to && slot.day !== undefined)
              .map(slot => ({
                ...slot,
                subject: slot.subject || data.subjects?.[0] || ""
              }))
          }))
          .filter(proposal => proposal.schedule?.length > 0)
      };


      const updatePayload = {
        $set: processedData
      };


      await updateTuition({ id, ...updatePayload }).unwrap();
      toast.success("Tuition updated successfully!");
      navigate(`/tutions/${id}`);
    } catch (error) {
      console.error("Error updating tuition:", error);
      toast.error(error?.data?.message || "Failed to update tuition!");
    }
  };

  const handleCancel = () => {
    if (isDirty && !window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      return;
    }
    navigate(`/tutions/${id}`);
  };

  const addScheduleSlot = (proposalIndex) => {
    const currentProposals = watch(`scheduleProposals.${proposalIndex}.schedule`) || [];
    setValue(`scheduleProposals.${proposalIndex}.schedule`, [
      ...currentProposals,
      { day: 0, from: "", to: "", subject: subjects?.[0] || "" }
    ], { shouldDirty: true });
  };

  const removeScheduleSlot = (proposalIndex, slotIndex) => {
    const currentProposals = watch(`scheduleProposals.${proposalIndex}.schedule`) || [];
    const newSchedule = [...currentProposals];
    newSchedule.splice(slotIndex, 1);
    setValue(`scheduleProposals.${proposalIndex}.schedule`, newSchedule, { shouldDirty: true });
  };

  const addNewProposal = () => {
    append({ 
      role: "student", 
      proposedBy: user._id, 
      schedule: [{ day: 0, from: "", to: "", subject: subjects?.[0] || "" }] 
    }, { shouldDirty: true });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FiAlertCircle className="text-5xl text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Tuition</h2>
          <p className="text-gray-600 mb-4">Failed to load tuition data. Please try again.</p>
          <button 
            onClick={() => navigate(-1)} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Edit Tuition</h1>
            <button 
              onClick={handleCancel} 
              className="border cursor-pointer border-gray-300 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-50"
            >
              <FiX /> Cancel
            </button>
          </div>
          <p className="text-gray-600">Update your tuition information. Make sure all required fields are filled.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
       
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FiInfo className="text-blue-500" /> Basic Information
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("title")} 
                    placeholder="e.g., Mathematics Tutor for Class 9-10" 
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade *</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("grade")}
                  >
                    <option value="">Select Grade</option>
                    {Object.keys(gradeSubjects).map((grade) => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                  {errors.grade && <p className="text-red-500 text-sm mt-1">{errors.grade.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description </label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4} 
                  {...register("description")} 
                  placeholder="Describe the tuition requirements..." 
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subjects *</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto p-2 border border-gray-300 rounded">
                    {availableSubjects.map((subj) => (
                      <label key={subj} className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-50 rounded">
                        <input 
                          type="checkbox" 
                          value={subj}
                          checked={subjects?.includes(subj)}
                          onChange={(e) => handleSubjectsChange(subj, e.target.checked)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{subj}</span>
                      </label>
                    ))}
                  </div>
                  {errors.subjects && <p className="text-red-500 text-sm mt-1">{errors.subjects.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tuition Type *</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("tuitionType")}
                  >
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                  {errors.tuitionType && <p className="text-red-500 text-sm mt-1">{errors.tuitionType.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Fee (৳) *</label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input 
                      type="number" 
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("totalFee", { 
                        valueAsNumber: true,
                        min: 1 
                      })} 
                      placeholder="e.g., 5000" 
                    />
                  </div>
                  {errors.totalFee && <p className="text-red-500 text-sm mt-1">{errors.totalFee.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("status")}
                >
                  <option value="open">Open</option>
                  <option value="assigned">Assigned</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

     
          {tuitionType !== "online" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <FiMapPin className="text-blue-500" /> Location Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("location.city")} 
                    placeholder="e.g., Dhaka" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area *</label>
                  <input 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("location.area")} 
                    placeholder="e.g., Mirpur" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("location.address")} 
                    placeholder="House #, Road #, Building Name, etc." 
                  />
                </div>
              </div>
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
            </div>
          )}


          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FiCalendar className="text-blue-500" /> Schedule Proposals (Optional)
            </h2>
            
            {fields.map((proposal, pIndex) => (
              <div key={proposal.proposalKey} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                  <h3 className="font-medium text-gray-900">Schedule Proposal {pIndex + 1}</h3>
                  <button 
                    type="button" 
                    className="text-sm border border-red-300 text-red-600 px-3 py-1 rounded hover:bg-red-50"
                    onClick={() => remove(pIndex)}
                  >
                    Remove Proposal
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register(`scheduleProposals.${pIndex}.role`)}
                    >
                      <option value="student">Student</option>
                      <option value="guardian">Guardian</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 mb-2">Time Slots</h4>
                  
                  {watch(`scheduleProposals.${pIndex}.schedule`)?.map((schedule, sIndex) => (
                    <div key={sIndex} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end p-3 bg-gray-50 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          {...register(`scheduleProposals.${pIndex}.schedule.${sIndex}.day`, { valueAsNumber: true })}
                        >
                          {weekDays.map((day) => (
                            <option key={day.value} value={day.value}>{day.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                        <input 
                          type="time" 
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          {...register(`scheduleProposals.${pIndex}.schedule.${sIndex}.from`)} 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                        <input 
                          type="time" 
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          {...register(`scheduleProposals.${pIndex}.schedule.${sIndex}.to`)} 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          {...register(`scheduleProposals.${pIndex}.schedule.${sIndex}.subject`)}
                        >
                          <option value="">Select Subject</option>
                          {subjects?.map((subject) => (
                            <option key={subject} value={subject}>{subject}</option>
                          ))}
                        </select>
                      </div>

                      <button 
                        type="button" 
                        className="text-red-600 border border-red-300 px-3 py-2 rounded hover:bg-red-50"
                        onClick={() => removeScheduleSlot(pIndex, sIndex)}
                      >
                        Remove Slot
                      </button>
                    </div>
                  ))}

                  <button 
                    type="button" 
                    className="border border-gray-300 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-50"
                    onClick={() => addScheduleSlot(pIndex)}
                  >
                    <FiClock /> Add Time Slot
                  </button>
                </div>
              </div>
            ))}

            <button 
              type="button" 
              className="w-full border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
              onClick={addNewProposal}
            >
              + Add Another Proposal
            </button>
          </div>

      
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <button 
                type="button" 
                onClick={handleCancel} 
                className="border cursor-pointer border-gray-300 px-8 py-2 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isUpdating || !isDirty}
                className="bg-blue-500 cursor-pointer text-white px-8 py-2 rounded flex items-center gap-2 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <FiSave /> Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}