import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";
import { useGetTeachersQuery } from "../features/teacher/teacherApi";
import { Link } from "react-router-dom";

const OnlineTutors = () => {
  const { data: teachersData, isLoading, error } = useGetTeachersQuery({});
  

  const tutors = teachersData?.teachers || [];


  const SkeletonCard = ({ idx }) => (
    <div
      className="p-6 bg-gray-100 border border-gray-200 rounded-2xl shadow-lg flex flex-col items-center text-center animate-pulse"
      style={{ animationDelay: `${idx * 0.1}s` }}
    >
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-gray-300 mb-3"></div>
      </div>
      <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
      <div className="h-3 w-20 bg-gray-300 rounded mb-4"></div>
      <div className="h-10 w-full bg-gray-300 rounded-lg mt-4"></div>
    </div>
  );


  if (error) {
    return (
      <section className="py-16 px-4 md:px-8 bg-[var(--bg)]">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center">
          Featured Tutors
        </h2>
        <div className="text-center text-red-500">
          <p>Failed to load tutors. Please try again later.</p>
        </div>
      </section>
    );
  }

  if (!isLoading && tutors.length === 0) {
    return (
      <section className="py-16 px-4 md:px-8 bg-[var(--bg)]">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center">
          Featured Tutors
        </h2>
        <div className="text-center text-[var(--text-secondary)]">
          <p>No tutors available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center">
          Featured Tutors
        </h2>

        <Swiper 
          spaceBetween={20} 
          slidesPerView={1.3} 
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-4"
        >
          {isLoading ? (
         
            [...Array(4)].map((_, idx) => (
              <SwiperSlide key={`skeleton-${idx}`}>
                <SkeletonCard idx={idx} />
              </SwiperSlide>
            ))
          ) : (
    
            tutors.map((tutor, idx) => (
              <SwiperSlide key={tutor._id || idx}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center text-center"
                >
                  <div className="relative">
                    <img 
                      src={tutor.avatarUrl || `https://ui-avatars.com/api/?name=${tutor.name || tutor.firstName}&background=random`} 
                      alt={tutor.name || `${tutor.firstName} ${tutor.lastName}`} 
                      className="w-20 h-20 rounded-full mb-3 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${tutor.name || tutor.firstName}&background=random`;
                      }}
                    />
                  
                    {tutor.onlineStatus === 'online' && (
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    {tutor.name}
                  </h3>
                  <p className="text-[var(--text-secondary)]">
                    {tutor.specialization || tutor.subject || tutor.expertise?.[0] || "Tutor"}
                  </p>
                  {tutor.rating && (
                    <div className="flex items-center gap-1 mt-1">
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
                    className="btn-primary w-full mt-4 rounded-lg py-2 text-sm"
                  >
                    View Profile
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
        
        
        {!isLoading && tutors.length > 0 && (
          <div className="text-center mt-8">
            <Link 
              to="/tutors"
              className="inline-block px-6 py-3 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              View All Tutors
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default OnlineTutors;