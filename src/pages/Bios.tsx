import React, { useEffect, useState } from "react";
import { match, Link, Redirect } from "react-router-dom";

import "../styles/Bios.scss";
import * as Labels from "../labels/BioLabels";
import { formatCourseName } from "../labels/courseNames";
import * as utils from "./utils";

import courses from "../data/courses.json";
import urls from "../data/urls.json";
import placeholderImg from "../img/bio_placeholder.png";
import execBios from "../data/bios/exec.json";

/**
 * Mentor bios come from the scheduler's database (the Edit Profile page there).
 * Exec bios aren't in the scheduler, so they still come from exec.json.
 */

// set REACT_APP_SCHEDULER_URL (e.g. in .env.local) to use a local scheduler
const SCHEDULER_URL = process.env.REACT_APP_SCHEDULER_URL || urls.scheduler;
const PROFILES_API_URL = `${SCHEDULER_URL}/api/public/profiles/`;

const LOWERCASE_COURSES = courses.map(s => s.toLowerCase());

// the scheduler's names for courses that this site names differently
const SCHEDULER_COURSE_NAMES: { [schedulerName: string]: string } = {
    csm61a: "cs61a",
    csm61b: "cs61b",
    csm61c: "cs61c",
    csm70: "cs70",
    csm88: "cs88",
    datac88c: "cs88",
    csm64: "eleng64",
    csm66: "eleng66",
};

/** One entry from the scheduler's /api/public/profiles/ endpoint. */
interface SchedulerProfile {
    name: string;
    pronouns: string;
    details: string;
    imgUrl: string;
    courses: { [course: string]: string };
}

interface ProfileObj {
    name: string;
    pronouns?: string;
    role: string;
    imgUrl?: string;
    webUrl?: string;
    details?: string;
}

type ProfilesByCourse = { [course: string]: ProfileObj[] };

const EXEC_PROFILES: ProfileObj[] = execBios
    .map(bio => ({
        ...bio,
        // exec photos are Google Drive links, which need converting to load in an <img>
        imgUrl: bio.imgUrl ? utils.getEmbeddableDriveImageLink(bio.imgUrl) : "",
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

/** Group profiles by course, with each list sorted by name. */
function groupByCourse(profiles: SchedulerProfile[]): ProfilesByCourse {
    const byCourse: ProfilesByCourse = {};
    LOWERCASE_COURSES.forEach(course => {
        byCourse[course] = [];
    });
    for (let profile of profiles) {
        // someone in both of the scheduler's courses for one page is listed there once
        const added = new Set<string>();
        for (let [schedulerCourse, role] of Object.entries(profile.courses)) {
            const course = SCHEDULER_COURSE_NAMES[schedulerCourse] ?? schedulerCourse;
            // the scheduler can have courses this site has no page for
            if (!(course in byCourse) || added.has(course)) {
                continue;
            }
            added.add(course);
            byCourse[course].push({
                name: profile.name,
                pronouns: profile.pronouns,
                role: role,
                imgUrl: profile.imgUrl,
                details: profile.details,
            });
        }
    }
    for (let profileList of Object.values(byCourse)) {
        profileList.sort((a, b) => a.name.localeCompare(b.name));
    }
    return byCourse;
}

// fetched once and shared, so moving between course pages doesn't refetch
let profilesRequest: Promise<ProfilesByCourse> | null = null;

function fetchProfiles(): Promise<ProfilesByCourse> {
    if (!profilesRequest) {
        profilesRequest = fetch(PROFILES_API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Profiles request failed: ${response.status}`);
                }
                return response.json();
            })
            .then(groupByCourse)
            .catch(error => {
                // allow a retry the next time a page opens
                profilesRequest = null;
                throw error;
            });
    }
    return profilesRequest;
}

type LoadState =
    | { status: "loading" }
    | { status: "error" }
    | { status: "loaded"; profiles: ProfilesByCourse };

function useProfiles(): LoadState {
    const [state, setState] = useState<LoadState>({ status: "loading" });
    useEffect(() => {
        let active = true;
        fetchProfiles()
            .then(profiles => active && setState({ status: "loaded", profiles }))
            .catch(error => {
                console.error(error);
                if (active) {
                    setState({ status: "error" });
                }
            });
        return () => {
            active = false;
        };
    }, []);
    return state;
}

/** A card with a short message, e.g. while loading or when there are no bios yet. */
function MessageCard({ title, text }: { title: string; text?: string }) {
    return (
        <div className="bio-message" role="status">
            <img src={placeholderImg} className="bio-message-logo" alt="" />
            <p className="bio-message-title">{title}</p>
            {text && <p className="bio-message-text">{text}</p>}
        </div>
    );
}

function initialsOf(name: string): string {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map(word => Array.from(word)[0].toUpperCase())
        .join("");
}

/** The profile photo, or the person's initials when there's none or it fails to load. */
function Avatar({ profile }: { profile: ProfileObj }) {
    const [failedUrl, setFailedUrl] = useState<string | null>(null);
    if (profile.imgUrl && profile.imgUrl !== failedUrl) {
        return (
            <img
                className="bio-avatar"
                src={profile.imgUrl}
                alt={profile.name}
                loading="lazy"
                onError={() => setFailedUrl(profile.imgUrl ?? null)}
            />
        );
    }
    return (
        <div className="bio-avatar bio-avatar-initials" aria-hidden="true">
            {initialsOf(profile.name)}
        </div>
    );
}

function ProfileCard({ profile }: { profile: ProfileObj }) {
    return (
        <article className="bio-card">
            <div className="bio-card-header">
                <Avatar profile={profile} />
                <div className="bio-card-heading">
                    <h6 className="bio-name">
                        {profile.webUrl ? (
                            <a href={profile.webUrl}>{profile.name}</a>
                        ) : (
                            profile.name
                        )}
                    </h6>
                    <div className="bio-tags">
                        <span className="bio-tag bio-tag-role">{profile.role}</span>
                        {profile.pronouns && (
                            <span className="bio-tag">{profile.pronouns.toLowerCase()}</span>
                        )}
                    </div>
                </div>
            </div>
            {/* bios are plain text, so no HTML is rendered */}
            {profile.details && <p className="bio-details">{profile.details}</p>}
        </article>
    );
}

function ProfileGrid({ profiles }: { profiles: ProfileObj[] }) {
    if (profiles.length === 0) {
        return <MessageCard title="Coming soon!" text={Labels.PLACEHOLDER_BIO_TEXT} />;
    }
    return (
        <div className="bio-grid">
            {profiles.map((profile, i) => (
                <ProfileCard key={i.toString() + profile.name} profile={profile} />
            ))}
        </div>
    );
}

/** A course page, filled from the scheduler. */
function SchedulerCourse({ course }: { course: string }) {
    const state = useProfiles();
    if (state.status === "loaded") {
        return <ProfileGrid profiles={state.profiles[course]} />;
    }
    return state.status === "loading" ? (
        <MessageCard title="Loading bios..." />
    ) : (
        <MessageCard title="Couldn't load bios" text="Please try again later." />
    );
}

function renderCoursePage(course: string) {
    if (course !== "exec" && !LOWERCASE_COURSES.includes(course)) {
        return <Redirect to="/bios" />;
    }
    const title = course === "exec" ? "Exec" : formatCourseName(course);
    return (
        <div className="container">
            <div className="section">
                <div className="col l8 offset-l2 s10 offset-s1">
                    <h5 className="label">{title} Mentor Bios</h5>
                    <p className="info">{Labels.bioPageSubtitle(title)}</p>
                </div>
                <div>
                    {course === "exec" ? (
                        <ProfileGrid profiles={EXEC_PROFILES} />
                    ) : (
                        <SchedulerCourse course={course} />
                    )}
                </div>
            </div>
        </div>
    );
}

function renderHomePage() {
    return (
        <div className="container">
            <div className="section">
                <div className="col l8 offset-l2 s10 offset-s1">
                    <h5 className="label">Bios</h5>
                    <p className="info">{Labels.BIO_HOME_PAGE_DESCRIPTION}</p>
                    <div className="collection">
                        <Link to="/bios/exec" className="collection-item">
                            CSM Exec
                        </Link>
                        {LOWERCASE_COURSES.map(name => (
                            <Link
                                key={name}
                                to={"/bios/" + name}
                                className="collection-item"
                            >
                                {formatCourseName(name) + " Mentors"}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Bios(props: { match: match<{ course: string }> }) {
    const course = props.match.params["course"];
    return course ? renderCoursePage(course) : renderHomePage();
}
