import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; 
import { motion } from "framer-motion";
import {
  LuMapPin,
  LuBookOpen,
  LuClock,
  LuWallet,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetTuitionsQuery } from "../features/tution/tutionApi";

const LatestTuitions = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  
  const { data: tuitionsData, isLoading, error } = useGetTuitionsQuery({})
  const latestTuitions = tuitionsData?.tuitions || tuitionsData || [];

  const SkeletonCard = ({ idx }) => (
    <div
      className="h-full p-5 rounded-2xl bg-gray-100 border border-gray-200 shadow-sm flex flex-col animate-pulse"
      style={{ animationDelay: `${idx * 0.05}s` }}
    >
      <div className="self-start mb-3 w-16 h-6 rounded-full bg-gray-300"></div>
      <div className="h-5 w-3/4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 w-full bg-gray-300 rounded mb-1"></div>
      <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
      <div className="mt-auto pt-4">
        <div className="h-3 w-20 bg-gray-300 rounded mb-3"></div>
        <div className="h-10 w-full bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );

  if (error) {
    return (
      <section className="py-16 px-4 md:px-8 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Latest Tuition Posts
            </h2>
          </div>
          <div className="text-center py-10 text-red-500 bg-red-50 rounded-xl border border-red-200">
            <p>Failed to load tuition posts. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!isLoading && latestTuitions.length === 0) {
    return (
      <section className="py-16 px-4 md:px-8 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Latest Tuition Posts
            </h2>
          </div>
          <div className="text-center py-10 text-[var(--text-secondary)] bg-[var(--card-bg)] rounded-xl border border-[var(--border)]">
            <p>No tuition posts available yet. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  const formatTimeAgo = (dateString) => {
    if (!dateString) return "Recently";
    const now = new Date();
    const postDate = new Date(dateString);
    const diffMs = now - postDate;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  const handlePrevClick = () => {
    if (swiperInstance) swiperInstance.slidePrev();
  };

  const handleNextClick = () => {
    if (swiperInstance) swiperInstance.slideNext();
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-[var(--bg)] relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Latest Tuition Posts
          </h2>
          <Link to="/tuitions" className="btn-primary px-5 py-2 rounded-lg text-sm w-fit">
            View All
          </Link>
        </div>

        {!isLoading && latestTuitions.length > 0 && (
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
          slidesPerView={1.15}
          breakpoints={{
            480: { slidesPerView: 1.4 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3.5 },
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
            latestTuitions.map((tuition) => (
              <SwiperSlide key={tuition._id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="h-full p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] shadow-sm hover:shadow-lg transition-all flex flex-col"
                >
                  <span className="self-start mb-3 px-3 py-1 text-xs rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold">
                    {tuition.grade || tuition.class || "N/A"}
                  </span>

                  <h3 className="font-semibold text-base sm:text-lg text-[var(--text-primary)] line-clamp-2">
                    {tuition.title}
                  </h3>

                  <div className="mt-3 space-y-1.5 text-sm text-[var(--text-secondary)]">
                    <p className="flex items-center gap-2">
                      <LuBookOpen size={15} /> {tuition.subjects?.join(", ") || tuition.subject || "General"}
                    </p>
                    <p className="flex items-center gap-2">
                      <LuMapPin size={15} /> {tuition.location?.city  || "Location not specified"}
                    </p>
                    <p className="flex items-center gap-2 font-semibold text-[var(--text-primary)]">
                      <LuWallet size={15} /> ৳ {tuition.totalFee ||  "Negotiable"}
                    </p>
                  </div>

                  <div className="mt-auto pt-4">
                    <p className="flex items-center gap-1 text-xs text-[var(--text-secondary)] mb-3">
                      <LuClock size={13} /> Posted {tuition.createdAt ? formatTimeAgo(tuition.createdAt) : "Recently"}
                    </p>
                    <Link 
                      to={`/tutions/${tuition._id}`}
                      className="btn-secondary w-full rounded-lg py-2 text-sm text-center block"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default LatestTuitions;