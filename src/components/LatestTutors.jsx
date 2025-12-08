import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import {
  LuBookOpen,
  LuUser,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";

const dummyTutors = [
  { id: 1, name: "Abdullah", subject: "Physics", avatar: "https://i.pravatar.cc/150?img=1", experience: "5 yrs" },
  { id: 2, name: "Siam", subject: "Math", avatar: "https://i.pravatar.cc/150?img=2", experience: "3 yrs" },
  { id: 3, name: "Afia", subject: "English", avatar: "https://i.pravatar.cc/150?img=3", experience: "4 yrs" },
  { id: 4, name: "Rashed", subject: "Chemistry", avatar: "https://i.pravatar.cc/150?img=4", experience: "6 yrs" },
  { id: 5, name: "Nusrat", subject: "Bangla", avatar: "https://i.pravatar.cc/150?img=5", experience: "2 yrs" },
];

const LatestTutors = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-16 px-4 md:px-8 bg-[var(--bg)] relative">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          Latest Tutors
        </h2>
        <button className="btn-primary px-5 py-2 rounded-lg text-sm w-fit">
          View All
        </button>
      </div>

    
      <div className="absolute top-1/2 -translate-y-1/2 left-2 z-10">
        <button ref={prevRef} className="btn-primary p-2 rounded-full shadow hover:scale-105 transition-transform">
          <LuChevronLeft size={20} />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-2 z-10">
        <button ref={nextRef} className="btn-primary p-2 rounded-full shadow hover:scale-105 transition-transform">
          <LuChevronRight size={20} />
        </button>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
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
        {dummyTutors.map((tutor) => (
          <SwiperSlide key={tutor.id}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] shadow-sm hover:shadow-lg transition-all flex flex-col items-center text-center"
            >
              <img
                src={tutor.avatar}
                alt={tutor.name}
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />

              <h3 className="font-semibold text-lg text-[var(--text-primary)]">
                {tutor.name}
              </h3>

              <p className="text-[var(--text-secondary)] mb-2">
                {tutor.subject} Tutor
              </p>

              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <LuBookOpen size={16} />
                <span>{tutor.experience} Experience</span>
              </div>

              <button className="btn-secondary w-full mt-4 py-2 rounded-lg text-sm">
                View Profile
              </button>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default LatestTutors;
