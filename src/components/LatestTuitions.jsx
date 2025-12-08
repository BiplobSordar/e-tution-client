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
import { useRef } from "react";

const dummyTuitions = [
  { id: 1, title: "Class 8 Math Tutor Needed", class: "Class 8", subject: "Mathematics", location: "Dhaka", salary: 5000, posted: "2h ago" },
  { id: 2, title: "English Tutor for Class 5", class: "Class 5", subject: "English", location: "Chittagong", salary: 4000, posted: "5h ago" },
  { id: 3, title: "Physics Teacher (HSC)", class: "HSC", subject: "Physics", location: "Rajshahi", salary: 7000, posted: "1 day ago" },
  { id: 4, title: "Science Tutor Needed", class: "Class 7", subject: "Science", location: "Sylhet", salary: 4500, posted: "3 days ago" },
  { id: 5, title: "Bangla & Math (Class 4)", class: "Class 4", subject: "Bangla, Math", location: "Khulna", salary: 3500, posted: "6h ago" },
  { id: 6, title: "ICT Teacher Needed", class: "Class 9–10", subject: "ICT", location: "Barisal", salary: 6000, posted: "8h ago" },
];

const LatestTuitions = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-16 px-4 md:px-8 bg-[var(--bg)] relative">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          Latest Tuition Posts
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
        slidesPerView={1.15}
        breakpoints={{
          480: { slidesPerView: 1.4 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 3.5 },
        }}
        className="pb-4"
      >
        {dummyTuitions.map((item) => (
          <SwiperSlide key={item.id}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="h-full p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] shadow-sm hover:shadow-lg transition-all flex flex-col"
            >
             
              <span className="self-start mb-3 px-3 py-1 text-xs rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold">
                {item.class}
              </span>

            
              <h3 className="font-semibold text-base sm:text-lg text-[var(--text-primary)] line-clamp-2">
                {item.title}
              </h3>

           
              <div className="mt-3 space-y-1.5 text-sm text-[var(--text-secondary)]">
                <p className="flex items-center gap-2">
                  <LuBookOpen size={15} /> {item.subject}
                </p>
                <p className="flex items-center gap-2">
                  <LuMapPin size={15} /> {item.location}
                </p>
                <p className="flex items-center gap-2 font-semibold text-[var(--text-primary)]">
                  <LuWallet size={15} /> ৳ {item.salary}
                </p>
              </div>

      
              <div className="mt-auto pt-4">
                <p className="flex items-center gap-1 text-xs text-[var(--text-secondary)] mb-3">
                  <LuClock size={13} /> Posted {item.posted}
                </p>
                <button className="btn-secondary w-full rounded-lg py-2 text-sm">
                  View Details
                </button>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default LatestTuitions;
