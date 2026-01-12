
import React from "react";
import { FaStar, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const randomSubjects = ["Math", "Physics", "English", "Biology", "Chemistry"];
const randomCities = ["Dhaka", "Chittagong", "Khulna", "Sylhet", "Barishal"];
const randomAreas = ["Uttara", "Gulshan", "Dhanmondi", "Banani", "Mirpur"];

const TeacherCard = ({ teacher }) => {
  const { name, avatarUrl, tutorProfile = {} } = teacher;


  const subjects = tutorProfile.subjects?.length
    ? tutorProfile.subjects
    : [randomSubjects[Math.floor(Math.random() * randomSubjects.length)]];

  const rating = tutorProfile.rating ?? (Math.random() * 5).toFixed(1);
  const totalReviews = tutorProfile.totalReviews ?? Math.floor(Math.random() * 100);

  const experienceYears = tutorProfile.experienceYears ?? Math.floor(Math.random() * 10) + 1;
  const hourlyRate = tutorProfile.hourlyRate ?? Math.floor(Math.random() * 50) + 10;

  const city = tutorProfile.city ?? randomCities[Math.floor(Math.random() * randomCities.length)];
  const area = tutorProfile.area ?? randomAreas[Math.floor(Math.random() * randomAreas.length)];

  return (
    <Link to={`/public/${teacher?._id}`}>
      <div className="card hover:shadow-lg transition-all flex flex-col justify-between">

        <div className="flex items-center gap-4">
          <img
            src={avatarUrl || "/profile.avif"}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border border-border"
          />
          <div className="flex-1">
            <h3 className="text-text-primary font-semibold text-lg break-words">{name || "John Doe"}</h3>
            <div className="flex items-center gap-1 text-sm text-secondary mt-1">
              <FaStar className="text-yellow-400" /> {rating} ({totalReviews})
            </div>
          </div>
        </div>


        <div className="flex flex-wrap gap-2 mt-3">
          {subjects.map((subj) => (
            <span key={subj} className="badge badge-info">
              {subj}
            </span>
          ))}
        </div>


        <div className="mt-3 flex justify-between items-center text-sm text-text-secondary">
          <div className="flex items-center gap-1">
            <FaClock /> {experienceYears} yrs exp
          </div>
          <div className="flex items-center gap-1">
            BDT {hourlyRate} / hr
          </div>
        </div>


        <div className="mt-2 text-sm text-text-secondary flex items-center gap-1">
          <FaMapMarkerAlt /> {city}, {area}
        </div>
      </div>
    </Link>
  );
};

export default TeacherCard;
