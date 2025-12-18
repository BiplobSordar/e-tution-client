// import React, { useState, useEffect } from "react";
// import { useForm, useFieldArray, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { toast } from 'react-hot-toast';
// import { 
//   useGetTuitionQuery,
//   useUpdateTuitionMutation 
// } from "../../features/tution/tutionApi";
// import { 
//   FiSave, 
//   FiX, 
//   FiAlertCircle, 
//   FiInfo,
//   FiCalendar,
//   FiClock,
//   FiMapPin,
//   FiDollarSign,
//   FiBook
// } from "react-icons/fi";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";

// const gradeSubjects = {
//   "1": ["Bangla", "English", "Math", "General Knowledge"],
//   "2": ["Bangla", "English", "Math", "General Knowledge"],
//   "3": ["Bangla", "English", "Math", "Science", "General Knowledge"],
//   "4": ["Bangla", "English", "Math", "Science", "General Knowledge"],
//   "5": ["Bangla", "English", "Math", "Science", "General Knowledge"],
//   "6": ["Bangla", "English", "Math", "Science", "Islam/Religion", "Social Science"],
//   "7": ["Bangla", "English", "Math", "Science", "Islam/Religion", "Social Science"],
//   "8": ["Bangla", "English", "Math", "Science", "Islam/Religion", "Social Science"],
//   "9": ["Bangla", "English", "Math", "Physics", "Chemistry", "Biology", "Higher Math", "ICT"],
//   "10": ["Bangla", "English", "Math", "Physics", "Chemistry", "Biology", "Higher Math", "ICT"],
//   "11": ["Bangla", "English", "Physics", "Chemistry", "Biology", "Higher Math", "ICT", "Accounting", "Economics"],
//   "12": ["Bangla", "English", "Physics", "Chemistry", "Biology", "Higher Math", "ICT", "Accounting", "Economics"],
//   "Honours": ["Bangla", "English", "Physics", "Chemistry", "Biology", "Higher Math", "ICT", "Accounting", "Economics", "Philosophy", "Political Science"],
// };

// const weekDays = [
//   { value: 0, label: "Sunday" },
//   { value: 1, label: "Monday" },
//   { value: 2, label: "Tuesday" },
//   { value: 3, label: "Wednesday" },
//   { value: 4, label: "Thursday" },
//   { value: 5, label: "Friday" },
//   { value: 6, label: "Saturday" }
// ];

// const tuitionSchema = z
//   .object({
//     title: z.string().min(1, "Title is required"),
//     description: z.string().min(1, "Description is required"),
//     grade: z.string().min(1, "Grade is required"),
//     subjects: z.array(z.string()).min(1, "Select at least one subject"),
//     tuitionType: z.enum(["offline", "online", "hybrid"]),
//     location: z.object({
//       city: z.string().optional(),
//       area: z.string().optional(),
//       address: z.string().optional(),
//     }),
//     totalFee: z.number().min(1, "Fee must be positive"),
//     status: z.enum(["open", "assigned", "in-progress", "completed", "cancelled"]),
//     scheduleProposals: z
//       .array(
//         z.object({
//           role: z.enum(["student", "guardian"]),
//           schedule: z
//             .array(
//               z.object({
//                 day: z.number().min(0, "Select valid day").max(6, "Invalid day"),
//                 from: z.string().min(1, "Start time required"),
//                 to: z.string().min(1, "End time required"),
//               })
//             )
//             .optional(),
//         })
//       )
//       .optional(),
//   })
//   .refine(
//     (data) =>
//       data.tuitionType === "online" ||
//       (data.location.city && data.location.area),
//     {
//       message: "City and area are required for offline/hybrid tuition",
//       path: ["location"],
//     }
//   );

// export default function EditTuition() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);
  
//   const { data: tuitionData, isLoading, error } = useGetTuitionQuery(id);
//   const [updateTuition, { isLoading: isUpdating }] = useUpdateTuitionMutation();
  
//   const [availableSubjects, setAvailableSubjects] = useState([]);
  
//   const {
//     register,
//     control,
//     handleSubmit,
//     watch,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(tuitionSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       grade: "",
//       subjects: [],
//       tuitionType: "offline",
//       location: { city: "", area: "", address: "" },
//       totalFee: 0,
//       status: "open",
//       scheduleProposals: [],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "scheduleProposals",
//   });

//   const tuitionType = watch("tuitionType");
//   const selectedGrade = watch("grade");
//   const subjects = watch("subjects");

//   // Update available subjects when grade changes
//   useEffect(() => {
//     if (selectedGrade && gradeSubjects[selectedGrade]) {
//       setAvailableSubjects(gradeSubjects[selectedGrade]);
//     } else {
//       setAvailableSubjects([]);
//     }
//   }, [selectedGrade]);

//   // Initialize form with tuition data
//   useEffect(() => {
//     if (tuitionData) {
//       // Check if user is the owner
//       if (user?._id !== tuitionData.postedBy?._id) {
//         toast.error("You are not authorized to edit this tuition");
//         navigate(`/tuition/${id}`);
//         return;
//       }

//       // Check if tuition has assigned tutor
//       if (tuitionData.assignedTutor) {
//         toast.error("Cannot edit tuition that has an assigned tutor");
//         navigate(`/tuition/${id}`);
//         return;
//       }

//       // Prepare schedule proposals data
//       let scheduleProposalsData = [];
//       if (tuitionData.scheduleProposals && tuitionData.scheduleProposals.length > 0) {
//         scheduleProposalsData = tuitionData.scheduleProposals.map(proposal => ({
//           role: proposal.role || "student",
//           schedule: proposal.schedule || []
//         }));
//       }

//       // Reset form with tuition data
//       reset({
//         title: tuitionData.title || "",
//         description: tuitionData.description || "",
//         grade: tuitionData.grade || "",
//         subjects: tuitionData.subjects || [],
//         tuitionType: tuitionData.tuitionType || "offline",
//         location: {
//           city: tuitionData.location?.city || "",
//           area: tuitionData.location?.area || "",
//           address: tuitionData.location?.address || ""
//         },
//         totalFee: tuitionData.totalFee || 0,
//         status: tuitionData.status || "open",
//         scheduleProposals: scheduleProposalsData,
//       });

//       // Set available subjects based on grade
//       if (tuitionData.grade && gradeSubjects[tuitionData.grade]) {
//         setAvailableSubjects(gradeSubjects[tuitionData.grade]);
//       }
//     }
//   }, [tuitionData, user, id, navigate, reset]);

//   const onSubmit = async (data) => {
//     try {
//       // Filter out empty schedule entries
//       const processedData = {
//         ...data,
//         scheduleProposals: data.scheduleProposals?.map(proposal => ({
//           ...proposal,
//           schedule: proposal.schedule?.filter(slot => slot.from && slot.to)
//         })).filter(proposal => proposal.schedule?.length > 0)
//       };

//       await updateTuition({ id, ...processedData }).unwrap();
//       toast.success("Tuition updated successfully!");
//       navigate(`/tuition/${id}`);
//     } catch (error) {
//       console.error("Error updating tuition:", error);
//       toast.error(error?.data?.message || "Failed to update tuition!");
//     }
//   };

//   const handleCancel = () => {
//     if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
//       navigate(`/tuition/${id}`);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <AiOutlineLoading3Quarters className="animate-spin text-4xl text-primary" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <FiAlertCircle className="text-5xl text-red-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-text-primary mb-2">Error Loading Tuition</h2>
//           <p className="text-text-secondary mb-4">Failed to load tuition data. Please try again.</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="btn-primary"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-4 md:p-6 bg-gray-50">
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Edit Tuition</h1>
//             <button
//               onClick={handleCancel}
//               className="btn-outline flex items-center gap-2"
//             >
//               <FiX /> Cancel
//             </button>
//           </div>
//           <p className="text-text-secondary">
//             Update your tuition information. Make sure all required fields are filled.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Basic Information Card */}
//           <div className="dashboard-card">
//             <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
//               <FiInfo className="text-primary" />
//               Basic Information
//             </h2>
            
//             <div className="space-y-6">
//               {/* Title and Grade */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="form-group">
//                   <label className="form-label">Title *</label>
//                   <input 
//                     type="text" 
//                     className="form-input" 
//                     {...register("title")} 
//                     placeholder="e.g., Mathematics Tutor for Class 9-10"
//                   />
//                   {errors.title && (
//                     <p className="text-error text-sm mt-1">{errors.title.message}</p>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">Grade *</label>
//                   <select className="form-input" {...register("grade")}>
//                     <option value="">Select Grade</option>
//                     {Object.keys(gradeSubjects).map((grade) => (
//                       <option key={grade} value={grade}>
//                         {grade}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.grade && (
//                     <p className="text-error text-sm mt-1">{errors.grade.message}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="form-group">
//                 <label className="form-label">Description *</label>
//                 <textarea
//                   className="form-input"
//                   rows={4}
//                   {...register("description")}
//                   placeholder="Describe the tuition requirements, student's current level, and any specific needs..."
//                 />
//                 {errors.description && (
//                   <p className="text-error text-sm mt-1">{errors.description.message}</p>
//                 )}
//               </div>

//               {/* Subjects, Type, and Fee */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="form-group">
//                   <label className="form-label">Subjects *</label>
//                   <div className="space-y-2">
//                     {availableSubjects.map((subj) => (
//                       <label key={subj} className="flex items-center gap-2 cursor-pointer">
//                         <input 
//                           type="checkbox" 
//                           value={subj} 
//                           {...register("subjects")}
//                           className="rounded text-primary focus:ring-primary"
//                           checked={subjects?.includes(subj)}
//                           onChange={(e) => {
//                             const value = e.target.value;
//                             const currentSubjects = subjects || [];
//                             if (e.target.checked) {
//                               setValue("subjects", [...currentSubjects, value]);
//                             } else {
//                               setValue("subjects", currentSubjects.filter(s => s !== value));
//                             }
//                           }}
//                         />
//                         <span className="text-sm text-text-primary">{subj}</span>
//                       </label>
//                     ))}
//                   </div>
//                   {errors.subjects && (
//                     <p className="text-error text-sm mt-1">{errors.subjects.message}</p>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">Tuition Type *</label>
//                   <select className="form-input" {...register("tuitionType")}>
//                     <option value="offline">Offline</option>
//                     <option value="online">Online</option>
//                     <option value="hybrid">Hybrid</option>
//                   </select>
//                   {errors.tuitionType && (
//                     <p className="text-error text-sm mt-1">{errors.tuitionType.message}</p>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">Total Fee (৳) *</label>
//                   <div className="relative">
//                     <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
//                     <input
//                       type="number"
//                       className="form-input pl-10"
//                       {...register("totalFee", { valueAsNumber: true })}
//                       placeholder="e.g., 5000"
//                       min="0"
//                       step="100"
//                     />
//                   </div>
//                   {errors.totalFee && (
//                     <p className="text-error text-sm mt-1">{errors.totalFee.message}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Status */}
//               <div className="form-group">
//                 <label className="form-label">Status</label>
//                 <select className="form-input" {...register("status")}>
//                   <option value="open">Open</option>
//                   <option value="assigned">Assigned</option>
//                   <option value="in-progress">In Progress</option>
//                   <option value="completed">Completed</option>
//                   <option value="cancelled">Cancelled</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Location Information Card */}
//           {tuitionType !== "online" && (
//             <div className="dashboard-card">
//               <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
//                 <FiMapPin className="text-primary" />
//                 Location Information
//               </h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="form-group">
//                   <label className="form-label">City *</label>
//                   <input 
//                     className="form-input" 
//                     {...register("location.city")} 
//                     placeholder="e.g., Dhaka"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Area *</label>
//                   <input 
//                     className="form-input" 
//                     {...register("location.area")} 
//                     placeholder="e.g., Mirpur"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Address</label>
//                   <input 
//                     className="form-input" 
//                     {...register("location.address")} 
//                     placeholder="House #, Road #, Building Name, etc."
//                   />
//                 </div>
//               </div>
//               {errors.location && (
//                 <p className="text-error text-sm mt-1">{errors.location.message}</p>
//               )}
//             </div>
//           )}

//           {/* Schedule Proposals Card */}
//           <div className="dashboard-card">
//             <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
//               <FiCalendar className="text-primary" />
//               Schedule Proposals (Optional)
//             </h2>
            
//             {fields.map((proposal, pIndex) => (
//               <div key={proposal.id} className="border border-gray-200 rounded-lg p-4 mb-4">
//                 <div className="flex-between mb-4">
//                   <h3 className="font-medium text-text-primary">Schedule Proposal {pIndex + 1}</h3>
//                   <button
//                     type="button"
//                     className="btn-outline text-sm"
//                     onClick={() => remove(pIndex)}
//                   >
//                     Remove Proposal
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//                   <div className="form-group">
//                     <label className="form-label">Role</label>
//                     <select
//                       className="form-input"
//                       {...register(`scheduleProposals.${pIndex}.role`)}
//                     >
//                       <option value="student">Student</option>
//                       <option value="guardian">Guardian</option>
//                     </select>
//                   </div>
//                 </div>

//                 <Controller
//                   control={control}
//                   name={`scheduleProposals.${pIndex}.schedule`}
//                   defaultValue={proposal.schedule || []}
//                   render={({ field }) => (
//                     <div className="space-y-4">
//                       <h4 className="font-medium text-text-primary mb-2">Time Slots</h4>
                      
//                       {field.value?.map((schedule, sIndex) => (
//                         <div
//                           key={sIndex}
//                           className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end p-3 bg-gray-50 rounded-lg"
//                         >
//                           <div className="form-group">
//                             <label className="form-label">Day</label>
//                             <select
//                               className="form-input"
//                               {...register(
//                                 `scheduleProposals.${pIndex}.schedule.${sIndex}.day`,
//                                 { valueAsNumber: true }
//                               )}
//                             >
//                               {weekDays.map((day) => (
//                                 <option key={day.value} value={day.value}>
//                                   {day.label}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>

//                           <div className="form-group">
//                             <label className="form-label">From</label>
//                             <input
//                               type="time"
//                               className="form-input"
//                               {...register(
//                                 `scheduleProposals.${pIndex}.schedule.${sIndex}.from`
//                               )}
//                             />
//                           </div>
                          
//                           <div className="form-group">
//                             <label className="form-label">To</label>
//                             <input
//                               type="time"
//                               className="form-input"
//                               {...register(
//                                 `scheduleProposals.${pIndex}.schedule.${sIndex}.to`
//                               )}
//                             />
//                           </div>
                          
//                           <div className="form-group">
//                             <label className="form-label">Subject</label>
//                             <select
//                               className="form-input"
//                               value={subjects?.[0] || ""}
//                               onChange={(e) => {
//                                 // You can extend this to support multiple subjects per slot
//                               }}
//                             >
//                               <option value="">Select Subject</option>
//                               {subjects?.map((subject) => (
//                                 <option key={subject} value={subject}>
//                                   {subject}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>

//                           <button
//                             type="button"
//                             className="btn-outline text-red-600 border-red-600 hover:bg-red-50"
//                             onClick={() => {
//                               const newSchedule = [...field.value];
//                               newSchedule.splice(sIndex, 1);
//                               field.onChange(newSchedule);
//                             }}
//                           >
//                             Remove Slot
//                           </button>
//                         </div>
//                       ))}

//                       <button
//                         type="button"
//                         className="btn-outline flex items-center gap-2"
//                         onClick={() =>
//                           field.onChange([
//                             ...(field.value || []),
//                             { day: 0, from: "", to: "" },
//                           ])
//                         }
//                       >
//                         <FiClock />
//                         Add Time Slot
//                       </button>
//                     </div>
//                   )}
//                 />
//               </div>
//             ))}

//             <button
//               type="button"
//               className="btn-outline w-full"
//               onClick={() =>
//                 append({
//                   role: "student",
//                   schedule: [{ day: 0, from: "", to: "" }],
//                 })
//               }
//             >
//               + Add Another Proposal
//             </button>
//           </div>

//           {/* Form Actions */}
//           <div className="dashboard-card">
//             <div className="flex flex-col sm:flex-row justify-end gap-4">
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 className="btn-outline px-8"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isUpdating}
//                 className="btn-primary px-8 flex items-center gap-2"
//               >
//                 {isUpdating ? (
//                   <>
//                     <AiOutlineLoading3Quarters className="animate-spin" />
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <FiSave />
//                     Save Changes
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }