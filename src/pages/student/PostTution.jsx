
import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useCreateTuitionMutation } from "../../features/tution/tutionApi";



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


const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


const tuitionSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    grade: z.string().min(1, "Grade is required"),
    subjects: z.array(z.string()).min(1, "Select at least one subject"),
    tuitionType: z.enum(["offline", "online"]),
    location: z.object({
      city: z.string().optional(),
      area: z.string().optional(),
      address: z.string().optional(),
    }),
    totalFee: z.number().min(1, "Fee must be positive"),


    scheduleProposals: z
      .array(
        z.object({
          role: z.enum(["student", "guardian"]),
          schedule: z
            .array(
              z.object({
                day: z.number().min(0, "Select valid day").max(6, "Invalid day"),
                from: z.string().min(1, "Start time required"),
                to: z.string().min(1, "End time required"),
              })
            )
            .min(1, "At least one schedule is required"),
        })
      )
      .min(1, "You must add at least one schedule proposal"),
  })
  .refine(
    (data) =>
      data.tuitionType === "online" ||
      (data.location.city && data.location.area && data.location.address),
    {
      message: "Location is required for offline tuition",
      path: ["location"],
    }
  );


export default function PostTuition() {
  const [theme, setTheme] = useState("light");

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tuitionSchema),
    defaultValues: {

      title: "",
      description: "",
      grade: "",
      subjects: [],
      tuitionType: "offline",
      location: { city: "", area: "", address: "" },
      totalFee: 0,
      scheduleProposals: [
        {

          role: "student",
          schedule: [{ day: 0, from: "", to: "" }],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "scheduleProposals",
  });

  const tuitionType = watch("tuitionType");
  const selectedGrade = watch("grade");


  const [availableSubjects, setAvailableSubjects] = useState([]);
  useEffect(() => {
    if (selectedGrade && gradeSubjects[selectedGrade]) {
      setAvailableSubjects(gradeSubjects[selectedGrade]);
      setValue("subjects", []);
    } else {
      setAvailableSubjects([]);
      setValue("subjects", []);
    }
  }, [selectedGrade, setValue]);



  const navigate = useNavigate();
  const [createTuition, { isLoading }] = useCreateTuitionMutation()

  const onSubmit = async (data) => {
    try {
      await createTuition(data).unwrap();
      toast.success("Tuition submitted successfully!");
      navigate("/student/my-tuitions");
    } catch (error) {
      console.error("Error submitting tuition:", error);
      toast.error(error?.data?.message || "Failed to submit tuition!");
    }
  };

  return (
    <div className={`${theme} min-h-screen p-6 bg-bg`}>
      <div className="max-w-5xl mx-auto card">
        <div className="flex-between mb-6">
          <h2 className="text-2xl font-bold">Post Tuition</h2>

        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


            <div className="form-group">
              <label className="form-label">Title</label>
              <input type="text" className="form-input" {...register("title")} />

            </div>

            <div className="form-group">
              <label className="form-label">Grade</label>
              <select className="form-input" {...register("grade")}>
                <option value="">Select Grade</option>
                {Object.keys(gradeSubjects).map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
              {errors.grade && (
                <p className="text-error text-sm mt-1">{errors.grade.message}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              rows={3}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-error text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-group">
              <label className="form-label">Subjects</label>
              <div className="flex gap-2 flex-wrap">
                {availableSubjects.map((subj) => (
                  <label key={subj} className="flex items-center gap-1">
                    <input type="checkbox" value={subj} {...register("subjects")} />
                    <span>{subj}</span>
                  </label>
                ))}
              </div>
              {errors.subjects && (
                <p className="text-error text-sm mt-1">
                  {errors.subjects.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Tuition Type</label>
              <select className="form-input" {...register("tuitionType")}>
                <option value="offline">Offline</option>
                <option value="online">Online</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Total Fee</label>
              <input
                type="number"
                className="form-input"
                {...register("totalFee", { valueAsNumber: true })}
              />
              {errors.totalFee && (
                <p className="text-error text-sm mt-1">
                  {errors.totalFee.message}
                </p>
              )}
            </div>
          </div>


          {tuitionType === "offline" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-group">
                <label className="form-label">City</label>
                <input className="form-input" {...register("location.city")} />
                {errors.location?.message && (
                  <p className="text-error text-sm mt-1">{errors.location.message}</p>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Area</label>
                <input className="form-input" {...register("location.area")} />
              </div>
              <div className="form-group">
                <label className="form-label">Address</label>
                <input className="form-input" {...register("location.address")} />
              </div>
            </div>
          )}


          {fields.map((proposal, pIndex) => (
            <div key={proposal.id} className="border p-4 rounded space-y-4">
              {errors.scheduleProposals && (
                <p className="text-error text-sm mt-1">{errors.scheduleProposals.message}</p>
              )}

              <div className="flex-between">
                <h3 className="font-semibold">Schedule Proposal {pIndex + 1}</h3>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => remove(pIndex)}
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="form-group">
                  <label className="form-label">Role</label>
                  <select
                    className="form-input"
                    {...register(`scheduleProposals.${pIndex}.role`)}
                  >
                    <option value="student">Student</option>
                    <option value="guardian">Guardian</option>
                  </select>
                </div>
              </div>

              <Controller
                control={control}
                name={`scheduleProposals.${pIndex}.schedule`}
                render={({ field }) => (
                  <div>
                    {field.value.map((s, sIndex) => (
                      <div
                        key={sIndex}
                        className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-2 items-end"
                      >
                        <div>
                          <label className="form-label">Day</label>
                          <select
                            className="form-input"
                            {...register(
                              `scheduleProposals.${pIndex}.schedule.${sIndex}.day`,
                              { valueAsNumber: true }
                            )}
                          >
                            {weekDays.map((day, i) => (
                              <option key={day} value={i}>
                                {day}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="form-label">From</label>
                          <input
                            type="time"
                            className="form-input"
                            {...register(
                              `scheduleProposals.${pIndex}.schedule.${sIndex}.from`
                            )}
                          />
                        </div>
                        <div>
                          <label className="form-label">To</label>
                          <input
                            type="time"
                            className="form-input"
                            {...register(
                              `scheduleProposals.${pIndex}.schedule.${sIndex}.to`
                            )}
                          />
                        </div>
                        <div>
                          <button
                            type="button"
                            className="btn-outline"
                            onClick={() => {
                              const newSchedule = [...field.value];
                              newSchedule.splice(sIndex, 1);
                              field.onChange(newSchedule);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    {errors.scheduleProposals?.[pIndex]?.schedule && (
                      <p className="text-error">
                        {
                          errors.scheduleProposals?.[pIndex]?.schedule?._errors?.[0] ||
                          "At least one schedule required"
                        }
                      </p>
                    )}

                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() =>
                        field.onChange([
                          ...field.value,
                          { day: 0, from: "", to: "" },
                        ])
                      }
                    >
                      Add Schedule
                    </button>
                  </div>
                )}
              />
            </div>

          ))}

          <button
            type="button"
            className="btn-secondary"
            onClick={() =>
              append({
                proposedBy: "",
                role: "student",
                schedule: [{ day: 0, from: "", to: "" }],
              })
            }
          >
            Add Proposal
          </button>


          <div className="form-actions">
            <button disabled={isLoading} type="submit" className="btn-primary">
              Submit Tuition
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



