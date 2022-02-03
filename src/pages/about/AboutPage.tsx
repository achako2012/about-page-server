import React, { useEffect } from 'react';
import SkillsService from 'api/services/skills-service';
import { Profile, Skill } from 'api/types';
import ProfileService from 'api/services/profile-service';
import { Skills } from './components/skills/Skills';
import { Spinner } from '../spinner/Spinner';
import { Title } from './components/title/Title';
import { About } from './components/about/About';
import { Services } from './components/services/Services';

export const AboutPage: React.FC = () => {
    const skillsService = SkillsService.create();
    const profileService = ProfileService.create();

    const [skillsList, updateSkillsList] = React.useState<Skill[]>();
    const [aboutProfile, updateProfile] = React.useState<Profile[]>();

    useEffect(() => {
        const setSkills = async () => {
            const skills = await skillsService.getSkills();
            updateSkillsList(skills);
        };

        setSkills();

        const setProfile = async () => {
            const profileEntity = await profileService.getProfile();
            updateProfile(profileEntity);
        };
        setProfile();
    }, []);

    const skills = skillsList ? <Skills skillsList={skillsList} /> : <Spinner />;

    const about = aboutProfile ? (
        <>
            <Title title={aboutProfile[0].title} intro={aboutProfile[0].intro} />
            <About article={aboutProfile[0].article} />
        </>
    ) : (
        <Spinner />
    );

    return (
        <>
            {about}
            <Services />
            {skills}
        </>
    );
};

export default AboutPage;