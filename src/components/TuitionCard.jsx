import React, { useState } from "react";
import { FaMapMarkerAlt, FaBook, FaMoneyBill, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const TuitionCard = ({ tution }) => {
  const [showFull, setShowFull] = useState(false);


  const title = tution?.title || "";
  const isTitleLong = title.length > 40;
  const displayedTitle = isTitleLong ? title.slice(0, 30) + "..." : title;

  const description = tution?.description || "";
  const isLong = description.length > 150;
  const displayedText = showFull ? description : description.slice(0, 60);

  const subjects = tution?.subjects || [];
  const visibleSubjects = subjects.slice(0, 2);
  const extraCount = subjects.length - 2;

  return (
    <div
      className="
        card animate-fade-in
        transition-all duration-300
        hover:shadow-lg hover:-translate-y-1
      "
    >
     
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        {displayedTitle}
      </h3>

  
      <p
        className="
          text-text-secondary text-sm leading-relaxed mb-3
          line-clamp-none
        "
        style={{
          display: "-webkit-box",
          WebkitLineClamp: showFull ? "unset" : 2,
          WebkitBoxOrient: "vertical",
          overflow: showFull ? "visible" : "hidden",
        }}
      >
        {displayedText}
       
        {showFull && (
          <span
            onClick={() => setShowFull(false)}
            className="text-primary font-medium cursor-pointer ml-1"
          >
            show less
          </span>
        )}
      </p>


      <div className="flex flex-wrap gap-2 mb-3">
        {visibleSubjects.map((sub, idx) => (
          <span
            key={idx}
            className="
              inline-flex items-center gap-1
              px-3 py-1 rounded-full text-xs font-medium
              bg-primary-light text-primary
              dark:bg-primary/20
            "
          >
            <FaBook /> {sub}
          </span>
        ))}

        {extraCount > 0 && (
          <span
            className="
              inline-flex items-center px-3 py-1 rounded-full 
              text-xs font-medium
              bg-hover-bg text-text-secondary
            "
          >
            +{extraCount} more
          </span>
        )}
      </div>


      <div className="space-y-2 text-sm text-text-secondary">
        {tution?.location?.city && (
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary" />
            {tution.location.city}, {tution.location.area}
          </div>
        )}

        <div className="flex items-center gap-2">
          <FaClock className="text-primary" />
          {tution.tuitionType?.toUpperCase()}
        </div>

        <div className="flex items-center gap-2">
          <FaMoneyBill className="text-primary" />
          {tution.totalFee} BDT
        </div>
      </div>

   
      <div className="mt-4">
        {tution.alreadyApplied ? (
          <Link to={`/tutions/${tution._id}`}>
          <button
            className="
              w-full py-2 rounded-lg 
              bg-hover-bg text-text-secondary 
              border border-border cursor-not-allowed
            "
          >
            Already Applied
          </button>
          </Link>
        ) : (
           <Link to={`/tutions/${tution._id}`}>
          <button className="btn-primary w-full">
            Apply Now
          </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TuitionCard;
