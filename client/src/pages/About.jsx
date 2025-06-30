import React from "react";
import { AboutAwardsRecognition } from "../components/AboutAwardsRecognition";
import { AboutSection } from "../components/AboutSection";
import { AboutFAQ } from "../components/AboutFAQ";
import { AboutMissionValues } from "../components/AboutMissionValues";
import { AboutOurStory } from "../components/AboutOurStory";
import { AboutOurTeam } from "../components/AboutOurTeam";
import { AboutSustainability } from "../components/AboutSustainability";
import { AboutCTA } from "../components/AboutCTA";

const About = () => {
  return (
    <>
      <AboutSection />
      <AboutOurStory />
      <AboutMissionValues />
      <AboutOurTeam />
      <AboutAwardsRecognition />
      <AboutSustainability />
      <AboutFAQ />
      <AboutCTA />
    </>
  );
};

export default About;
