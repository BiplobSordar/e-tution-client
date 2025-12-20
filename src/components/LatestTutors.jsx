


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import {
  LuBookOpen,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useState } from "react";
import { useGetTeachersQuery } from "../features/teacher/teacherApi";
import { Link } from "react-router-dom";

const LatestTutors = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  
  const { data: teachersData, isLoading, error } = useGetTeachersQuery({});
  
  const tutors = teachersData?.teachers || teachersData || [];
  
  const latestTutors = [...tutors]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 10);

  const handlePrevClick = () => {
    if (swiperInstance) swiperInstance.slidePrev();
  };

  const handleNextClick = () => {
    if (swiperInstance) swiperInstance.slideNext();
  };

  const SkeletonCard = () => (
    <div className="p-5 rounded-2xl bg-gray-100 border border-gray-200 shadow-sm flex flex-col items-center text-center animate-pulse">
      <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
      <div className="h-6 w-32 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 w-24 bg-gray-300 rounded mb-3"></div>
      <div className="h-4 w-20 bg-gray-300 rounded mb-4"></div>
      <div className="h-10 w-full bg-gray-300 rounded-lg mt-4"></div>
    </div>
  );

  if (error) {
    return (
      <section className="py-16 px-4 md:px-8 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Latest Tutors
            </h2>
          </div>
          <div className="text-center py-10 text-red-500 bg-red-50 rounded-xl border border-red-200">
            <p>Failed to load tutors. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!isLoading && latestTutors.length === 0) {
    return (
      <section className="py-16 px-4 md:px-8 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Latest Tutors
            </h2>
          </div>
          <div className="text-center py-10 text-[var(--text-secondary)] bg-[var(--card-bg)] rounded-xl border border-[var(--border)]">
            <p>No tutors available yet. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-[var(--bg)] relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Latest Tutors
          </h2>
          <Link to="/public/tutors" className="btn-primary px-5 py-2 rounded-lg text-sm w-fit">
            View All
          </Link>
        </div>

        {!isLoading && latestTutors.length > 0 && (
          <>
            <div className="absolute top-1/2 -translate-y-1/2 left-2 z-10">
              <button 
                ref={prevRef} 
                onClick={handlePrevClick}
                className="btn-primary p-2 rounded-full shadow hover:scale-105 transition-transform"
              >
                <LuChevronLeft size={20} />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-2 z-10">
              <button 
                ref={nextRef} 
                onClick={handleNextClick}
                className="btn-primary p-2 rounded-full shadow hover:scale-105 transition-transform"
              >
                <LuChevronRight size={20} />
              </button>
            </div>
          </>
        )}

        <Swiper
          modules={[Navigation]}
          onSwiper={setSwiperInstance}
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            480: { slidesPerView: 1.5 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3.5 },
          }}
          className="pb-4"
        >
          {isLoading ? (
            [...Array(4)].map((_, idx) => (
              <SwiperSlide key={`skeleton-${idx}`}>
                <SkeletonCard />
              </SwiperSlide>
            ))
          ) : (
            latestTutors.map((tutor) => (
              <SwiperSlide key={tutor._id || tutor.id}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] shadow-sm hover:shadow-lg transition-all flex flex-col items-center text-center"
                >
                  <img
                    src={ tutor.avatarUrl || `https://ui-avatars.com/api/?name=${tutor.name || tutor.firstName}&background=random`}
                    alt={tutor.name || `${tutor.firstName} ${tutor.lastName}`}
                    className="w-24 h-24 rounded-full mb-4 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${tutor.name || tutor.firstName}&background=random`;
                    }}
                  />

                  <h3 className="font-semibold text-lg text-[var(--text-primary)]">
                    {tutor.name || `${tutor.firstName} ${tutor.lastName || ''}`.trim()}
                  </h3>

                  <p className="text-[var(--text-secondary)] mb-2">
                    {tutor.specialization || tutor.subject || tutor.expertise?.[0] || "Tutor"}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <LuBookOpen size={16} />
                    <span>{tutor.experience || tutor.teachingExperience || "New"}</span>
                  </div>

                  {tutor.rating && (
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-[var(--text-secondary)]">
                        {tutor.rating.toFixed(1)}
                      </span>
                      {tutor.totalReviews && (
                        <span className="text-sm text-[var(--text-secondary)]">
                          ({tutor.totalReviews})
                        </span>
                      )}
                    </div>
                  )}

                  <Link 
                    to={`/public/${tutor._id}`}
                    className="btn-secondary w-full mt-4 py-2 rounded-lg text-sm"
                  >
                    View Profile
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default LatestTutors;