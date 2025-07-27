import React from "react";
import { AboutAwardsRecognition } from "../components/AboutAwardsRecognition";
import { AboutSection } from "../components/AboutSection";
import { AboutFAQ } from "../components/AboutFAQ";
import { AboutMissionValues } from "../components/AboutMissionValues";
import { AboutOurStory } from "../components/AboutOurStory";
import { AboutOurTeam } from "../components/AboutOurTeam";
import { AboutSustainability } from "../components/AboutSustainability";

const About = () => {
  return (
    <>
      <AboutOurStory />
      <AboutSection />
      <AboutMissionValues />
      <AboutOurTeam />
      <AboutAwardsRecognition />
      <AboutSustainability />
      <AboutFAQ />
    </>
  );
};

export default About;
