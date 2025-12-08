import Hero from "../components/Hero";
import LatestTuitions from "../components/LatestTuitions";
import LatestTutors from "../components/LatestTutors";
import HowItWorks from "../components/HowItWorks";
import WhyChooseUs from "../components/WhyChooseUs";
import GuardianReviews from "../components/GuardianReviews";
import StudentAchievements from "../components/StudentAchievements";
import MoreForYou from "../components/MoreForYou";
import FeaturedTuitions from "../components/FeaturedTuitions";
import OnlineTutors from "../components/OnlineTutors";
import LearningResources from "../components/LearningResources";

const Home = () => {
  return (
    <div className="min-h-screen  w-full max-w-[1600px] bg-[var(--bg)] text-[var(--text-primary)]">
      <Hero />
      <OnlineTutors />
      <LatestTuitions />
      <LatestTutors />
      <HowItWorks />
      <FeaturedTuitions />
      <WhyChooseUs />
      <GuardianReviews />
      <LearningResources />
      <StudentAchievements />
      <MoreForYou />
    </div>
  );
};

export default Home;
