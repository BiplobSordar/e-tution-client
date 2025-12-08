import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { LuChevronLeft, LuChevronRight, LuStar } from "react-icons/lu";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";

const reviews = [
  { id: 1, name: "Rahima", review: "Found a great tutor for my son!", img: "https://i.pravatar.cc/100?img=5", rating: 5 },
  { id: 2, name: "Karim", review: "Very trusted platform.", img: "https://i.pravatar.cc/100?img=6", rating: 4 },
  { id: 3, name: "Sadia", review: "Easy to find the right tutor.", img: "https://i.pravatar.cc/100?img=7", rating: 5 },
];

const GuardianReviews = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-16 px-4 md:px-8 bg-[var(--bg)] relative">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center">
        Guardian Reviews
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
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          480: { slidesPerView: 1.3 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-4"
      >
        {reviews.map((r) => (
          <SwiperSlide key={r.id}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-all"
            >
              <img
                src={r.img}
                alt={r.name}
                className="w-16 h-16 rounded-full mb-4 object-cover"
              />

              <div className="flex mb-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <LuStar
                    key={i}
                    size={18}
                    className={i < r.rating ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>

              <p className="text-[var(--text-secondary)] italic mb-3">"{r.review}"</p>
              <h4 className="font-semibold text-[var(--text-primary)]">{r.name}</h4>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default GuardianReviews;
