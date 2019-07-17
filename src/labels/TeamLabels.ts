const dutyDict: { [role: string]: string } = {
    President:
        "plans semester's organizational timeline and outreach efforts, leads exec meetings, works " +
        "jointly with other exec roles.",
    "Internal Vice President":
        "Acts as ASUC/ESC liasion, drafts CSM budget, in charge of fundraisers, branding, and marketing.",
    "External Vice President":
        "Organizes outreach to companies, manages social media, also helps with branding and marketing.",
    Communications:
        "Manages CSM email lists, drafts and sends feedback forms, newsletters, and emails, manages " +
        "CSM apparel.",
    Coord:
        "Plans course timelines based on semester + curriculum, main point of contact for course " +
        "staff, leads Senior Mentor meetings, mentor recruitment, attendace, feedback, and Piazza.",
    "Socials Chair":
        "Leads direction on social aspect of orientation w/ a committee, mentor training, facilitates " +
        "discussions and brainstorming on developing a CSM community.",
    "Tech Chair":
        "Leads software development of Scheduler, internal interviewing software, and other apps at " +
        "https://github.com/csmberkeley. Acts as product manager.",
    Advisor:
        "Provides input and advice during meetings to all members of Exec, assists with transition " +
        "/ training of new exec memebers.",
};

export function duties(role: string): string {
    if (role in dutyDict) {
        return dutyDict[role];
    }
    if (role.includes("Coord")) {
        return dutyDict["Coord"];
    }
    throw new Error(`Duty not found for exec role: ${role}`);
}
