import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";

const onlineTutors = [
  { id: 1, name: "Abdullah", subject: "Physics", avatar: "https://i.pravatar.cc/100?img=1" },
  { id: 2, name: "Siam", subject: "Math", avatar: "https://i.pravatar.cc/100?img=2" },
  { id: 3, name: "Afia", subject: "English", avatar: "https://i.pravatar.cc/100?img=3" },
  { id: 4, name: "Rahim", subject: "Chemistry", avatar: "https://i.pravatar.cc/100?img=4" },
];

const OnlineTutors = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-[var(--bg)]">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center">
        Online Tutors
      </h2>

      <Swiper spaceBetween={20} slidesPerView={1.3} breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}>
        {onlineTutors.map((t, idx) => (
          <SwiperSlide key={t.id}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center text-center"
            >
              <div className="relative">
                <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full mb-3" />
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></span>
              </div>
              <h3 className="font-semibold text-[var(--text-primary)]">{t.name}</h3>
              <p className="text-[var(--text-secondary)]">{t.subject} Tutor</p>
              <button className="btn-primary w-full mt-4 rounded-lg py-2 text-sm">
                Book Now
              </button>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default OnlineTutors;
