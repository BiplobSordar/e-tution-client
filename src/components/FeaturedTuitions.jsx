

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { LuChevronLeft, LuChevronRight, LuBookOpen, LuMapPin, LuWallet } from "react-icons/lu";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useState, useEffect } from "react";
import { useGetTuitionsQuery } from "../features/tution/tutionApi";
import { Link } from "react-router-dom";

const FeaturedTuitions = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [randomTuitions, setRandomTuitions] = useState([]);
  
  const { data: tuitionsData, isLoading, error } = useGetTuitionsQuery({});
  
  const allTuitions = tuitionsData?.tuitions || tuitionsData || [];

  useEffect(() => {
    if (allTuitions.length > 0) {
      const shuffled = [...allTuitions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      setRandomTuitions(shuffled);
    }
  }, [allTuitions]);

  const handlePrevClick = () => {
    if (swiperInstance) swiperInstance.slidePrev();
  };

  const handleNextClick = () => {
    if (swiperInstance) swiperInstance.slideNext();
  };

  const SkeletonCard = () => (
    <div className="p-6 bg-gray-100 border border-gray-200 rounded-2xl shadow-lg flex flex-col animate-pulse">
      <div className="h-6 w-3/4 bg-gray-300 rounded mb-3"></div>
      <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 w-1/3 bg-gray-300 rounded mb-2"></div>
      <div className="h-5 w-20 bg-gray-300 rounded mb-4"></div>
      <div className="h-10 w-full bg-gray-300 rounded-lg mt-4"></div>
    </div>
  );

  if (error) {
    return (
      <section className="py-16 px-4 md:px-8 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center">
            Featured Tuitions
          </h2>
          <div className="text-center py-10 text-red-500 bg-red-50 rounded-xl border border-red-200">
            <p>Failed to load tuitions. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!isLoading && randomTuitions.length === 0) {
    return (
      <section className="py-16 px-4 md:px-8 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center">
            Featured Tuitions
          </h2>
          <div className="text-center py-10 text-[var(--text-secondary)] bg-[var(--card-bg)] rounded-xl border border-[var(--border)]">
            <p>No tuition posts available yet. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-[var(--bg)] relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center">
          Featured Tuitions
        </h2>

        {!isLoading && randomTuitions.length > 0 && (
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
            480: { slidesPerView: 1.3 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-4"
        >
          {isLoading || randomTuitions.length === 0 ? (
            [...Array(4)].map((_, idx) => (
              <SwiperSlide key={`skeleton-${idx}`}>
                <SkeletonCard />
              </SwiperSlide>
            ))
          ) : (
            randomTuitions.map((tuition) => (
              <SwiperSlide key={tuition._id}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-lg hover:shadow-xl transition-all flex flex-col"
                >
                  <span className="self-start mb-2 px-3 py-1 text-xs rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold">
                    {tuition.grade || tuition.class || "N/A"}
                  </span>
                  
                  <h3 className="font-semibold text-lg text-[var(--text-primary)] mb-3 line-clamp-2">
                    {tuition.title}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                    <p className="flex items-center gap-2">
                      <LuBookOpen size={16} /> 
                      {tuition.subjects?.join(", ") || tuition.subject || "General"}
                    </p>
                    <p className="flex items-center gap-2">
                      <LuMapPin size={16} /> 
                      {tuition.location?.city || tuition.location || "Location not specified"}
                    </p>
                    <p className="flex items-center gap-2 font-semibold text-[var(--text-primary)]">
                      <LuWallet size={16} /> 
                      ৳ {tuition.totalFee || tuition.salary || "Negotiable"}
                    </p>
                  </div>
                  
                  <Link 
                    to={`/tutions/${tuition._id}`}
                    className="btn-secondary w-full mt-4 rounded-lg py-2 text-sm text-center block"
                  >
                    View Details
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

export default FeaturedTuitions;