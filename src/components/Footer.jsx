import { LuX, LuFacebook, LuInstagram, LuLinkedin, LuArrowUp } from "react-icons/lu";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[var(--card-bg)] text-[var(--text-secondary)] py-12 mt-12 transition-colors">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src="/logo.png" alt="Logo" className="h-10 w-10" />
            <span className="font-bold text-[var(--primary)] text-xl">e-Tuition</span>
          </div>
          <p className="text-sm">
            e-Tuition connects students with qualified tutors. Manage tuitions, track progress, and communicate efficiently.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-[var(--primary)] mb-3">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="hover:text-[var(--primary-hover)] transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/tuitions" className="hover:text-[var(--primary-hover)] transition-colors">Tuitions</Link>
            </li>
            <li>
              <Link to="/tutors" className="hover:text-[var(--primary-hover)] transition-colors">Tutors</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[var(--primary-hover)] transition-colors">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[var(--primary-hover)] transition-colors">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-[var(--primary)] mb-3">Follow Us</h3>
          <div className="flex gap-3 text-xl">
            <a href="#" className="hover:text-[var(--primary-hover)] transition-colors"><LuFacebook /></a>
            <a href="#" className="hover:text-[var(--primary-hover)] transition-colors"><LuInstagram /></a>
            <a href="#" className="hover:text-[var(--primary-hover)] transition-colors"><LuLinkedin /></a>
            <a href="#" className="hover:text-[var(--primary-hover)] transition-colors"><LuX /></a>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-[var(--primary)] mb-3">Developer</h3>
            <p>Biplob Sordar</p>
          </div>
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-auto inline-flex items-center gap-2 px-3 py-2 bg-[var(--primary)] text-white rounded hover:bg-[var(--primary-hover)] transition-colors text-sm"
          >
            <LuArrowUp /> Go to Top
          </button>
        </div>
      </div>

      <div className="border-t border-[var(--border)] mt-8 pt-4 text-center text-sm text-[var(--text-secondary)]">
        &copy; {new Date().getFullYear()} e-Tuition. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
