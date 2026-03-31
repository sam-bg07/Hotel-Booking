import React, { memo } from "react";
import { AboutAwardsRecognition } from "../components/AboutAwardsRecognition";
import { AboutSection } from "../components/AboutSection";
import { AboutFAQ } from "../components/AboutFAQ";
import { AboutMissionValues } from "../components/AboutMissionValues";
import { AboutOurStory } from "../components/AboutOurStory";
import { AboutOurTeam } from "../components/AboutOurTeam";
import { AboutSustainability } from "../components/AboutSustainability";

const MemoizedStory = memo(AboutOurStory);
const MemoizedSection = memo(AboutSection);
const MemoizedMission = memo(AboutMissionValues);
const MemoizedTeam = memo(AboutOurTeam);
const MemoizedAwards = memo(AboutAwardsRecognition);
const MemoizedSustainability = memo(AboutSustainability);
const MemoizedFAQ = memo(AboutFAQ);

const About = memo(() => {
  return (
    <>
      <MemoizedStory />
      <MemoizedSection />
      <MemoizedMission />
      <MemoizedTeam />
      <MemoizedAwards />
      <MemoizedSustainability />
      <MemoizedFAQ />
    </>
  );
});

export default About;
