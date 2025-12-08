import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";

const featuredTuitions = [
  { id: 1, title: "Class 10 Math Tuition", subject: "Mathematics", location: "Dhaka", salary: 6000 },
  { id: 2, title: "HSC Physics Tutor Needed", subject: "Physics", location: "Chittagong", salary: 7500 },
  { id: 3, title: "English for Class 8", subject: "English", location: "Rajshahi", salary: 5000 },
  { id: 4, title: "ICT Class 9-10", subject: "ICT", location: "Sylhet", salary: 6500 },
];

const FeaturedTuitions = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-16 px-4 md:px-8 bg-[var(--bg)] relative">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center">
        Featured Tuitions
      </h2>

   
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
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          480: { slidesPerView: 1.3 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {featuredTuitions.map((t) => (
          <SwiperSlide key={t.id}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-lg hover:shadow-xl transition-all flex flex-col"
            >
              <h3 className="font-semibold text-lg text-[var(--text-primary)] mb-2">{t.title}</h3>
              <p className="text-[var(--text-secondary)] mb-1">Subject: {t.subject}</p>
              <p className="text-[var(--text-secondary)] mb-1">Location: {t.location}</p>
              <p className="font-semibold text-[var(--text-primary)]">৳ {t.salary}</p>
              <button className="btn-secondary w-full mt-4 rounded-lg py-2 text-sm">
                View Details
              </button>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedTuitions;
