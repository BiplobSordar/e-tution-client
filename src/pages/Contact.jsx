import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-[var(--bg)]">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center text-[var(--text-primary)] mb-8"
      >
        Contact Us
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-3xl mx-auto text-center text-[var(--text-secondary)] text-lg mb-12"
      >
        Have questions or need assistance? Fill out the form below or reach out to us directly. 
        We are always happy to help and will get back to you as soon as possible.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8"
      >

        <form className="flex flex-col gap-4 p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow">
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 border border-[var(--border)] rounded-lg bg-[var(--bg)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 border border-[var(--border)] rounded-lg bg-[var(--bg)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="p-3 border border-[var(--border)] rounded-lg bg-[var(--bg)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          ></textarea>
          <button type="submit" className="btn-primary py-3 rounded-lg mt-2">
            Send Message
          </button>
        </form>

      
        <div className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow flex flex-col gap-4">
          <h3 className="font-semibold text-xl text-[var(--text-primary)] mb-2">Get in Touch</h3>
          <p className="text-[var(--text-secondary)]">Email: support@etution.com</p>
          <p className="text-[var(--text-secondary)]">Phone: +880 1234 567890</p>
          <p className="text-[var(--text-secondary)]">Address: 123, Dhaka, Bangladesh</p>
          <p className="text-[var(--text-secondary)] mt-4">
            We are here to assist you with any questions regarding our tutors, tuitions, or platform features.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
