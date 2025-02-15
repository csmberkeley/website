const dutyDict: { [role: string]: string } = {
    "President":
        "Plans semester's organizational timeline and outreach efforts, leads exec meetings, works " +
        "jointly with other exec roles.",
    "Internal Vice President":
        "Acts as ASUC/ESC liasion, drafts CSM budget, in charge of fundraisers, branding, and marketing.",
    "IVP":
        "Acts as ASUC/ESC liasion, drafts CSM budget, in charge of fundraisers, branding, and marketing.",
    "External Vice President":
        "Organizes outreach to companies, manages social media, also helps with branding and marketing.",
    "EVP":
        "Organizes outreach to companies, manages social media, also helps with branding and marketing.",
    "Communications Chair":
        "Manages CSM email lists, drafts and sends feedback forms, newsletters, and emails, manages " +
        "CSM apparel.",
    "Coord":
        "Plans course timelines based on semester + curriculum, main point of contact for course " +
        "mentors, leads Senior Mentor meetings, mentor recruitment, attendance, and feedback.",
    "Socials Chair":
        "Leads direction on social aspect of orientation w/ a committee, mentor training, facilitates " +
        "discussions and brainstorming on developing a CSM community.",
    "Tech Chair":
        "Leads software development of Scheduler, internal interviewing software, and other apps at " +
        "https://github.com/csmberkeley. Acts as product manager.",
    "DE&I Chair":
        "Helps create more equitable recruiting and works on initiatives for gender inclusivity in sections, " +
        "mental health, URM students, and first generation students. Leads DE&I task force within CSM.",
    "Media Chair":
        "Manages external-facing social media accounts, creates graphics for club-related needs, " +
        "collaborates with communications chair on newsletters and the EVP on fundraiser promotion.",
    "Advisor":
        "Provides input and advice during meetings to all members of Exec, assists with transition " +
        "/ training of new exec memebers.",
};

export function duties(role: string): string {
    if (role in dutyDict) {
        return dutyDict[role];
    }
    if (role.includes("Coord")) {
        return dutyDict["Coord"];
    } else if (role.includes("Co-ord")) {
        return dutyDict["Coord"]
    }
    throw new Error(`Duty not found for exec role: ${role}`);
}
