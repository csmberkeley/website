#!/usr/bin/env python3

"""
Generates JSON blobs of bios.

The bios CSV should contain at least the following columns (? means optional):
    email | name | role | course | preferred name? | pronouns | photo url | bio | website url?
The single roster CSV should contain the following columns in order, with no header row:
    name | email | role | course
The exec CSV should contain the following columns in order, again with no header row:
    name | email | role

It is recommended to first do some preprocessing within Google Sheets to obtain
the desired columns or filter any unwanted entries.
"""

import csv
import json
import re

CURR_SEMESTER = "fa26" # CHANGE ME

BIOS_PATH = "./csvs/bios.csv"
ROSTER_PATH = "./csvs/roster.csv"
DEST_PATH = "./src/data/bios/mentors.json"
EXEC_ROLE_PATH = "./csvs/exec_roles.csv"

class Cols:
    """
    The headers of each column as they appear in the CSV.
    """
    EMAIL = "Berkeley Email"
    NAME = "Name"
    ROLE = "For which position are you accepting/rejecting?"
    COURSE = "Which course are you accepting for? "
    COURSE_HEADERS = {
        COURSE.strip(),
        "What course do you SM for?",
        "What course do you SCM for?",
    }
    PRONOUNS = "Pronouns"
    PREF_NAME = "Preferred Name"
    IMG_URL = "Images"
    PHOTO = "Photo"
    BIO = "Biography (300 character limit)"
    WEB_URL =  "(Optional) Website"

# This string in the course means we should skip them and move on with life
NORMALIZED_REJECTIONS = {
    "iamrejectingallpositionsthatididnotexplicitlyaccept",
    "iamrejectingallampositionsthatididnotexplicitlyaccept",
    "iamrejectingallcmpositionsthatididnotexplicitlyaccept"
}

# Global variables
exec_bios = {}
exec_roles = {}

def parse_courses(values):
    """Merge course answers, splitting multi-course selections and removing repeats."""
    courses = []
    for value in values:
        for selection in re.split(r"\s+and\s+", value.strip(), flags=re.IGNORECASE):
            course = re.sub(r"\s+", "", selection).lower()
            if not course or course in NORMALIZED_REJECTIONS:
                continue
            # Form answers may include an alternate course number in parentheses.
            course = re.sub(r"\([^)]*\)", "", course)
            course = {"eecs16a": "eleng66", "eecs16b": "eleng64"}.get(course, course)
            if course not in courses:
                courses.append(course)
    return courses


def parse_bios(csv_path, master_roster_path):
    """
    Reads bios from the given CSV, returning a dictionary of data keyed by emails.
    """
    people_by_email = {}
    
    with open(EXEC_ROLE_PATH, encoding="utf-8-sig", newline="") as f:
        reader = csv.reader(f)
        for name, email, role in reader:
            email_no_dot = email.replace(".", "").lower().strip() if email else ""
            exec_roles[email_no_dot] = {"name": name, "imgUrl": "", "position": role}
            exec_bios[email_no_dot] = {"name": name, "role": role, "imgUrl": ""}
    
    with open(master_roster_path, encoding="utf-8-sig", newline="") as f:
        reader = csv.reader(f)
        for row in reader:
            name, email, role, preproc_course = row
            courses = parse_courses([preproc_course])
            if role.strip().lower() in {"tech mentor", "senior tech mentor"}:
                courses = ["tech"]
            email_no_dot = email.replace(".", "").lower().strip()
            
            if not role:
                print(f"=== WARNING: EMPTY ROLE IN MASTER ROSTER FOR {email.strip()} ===")
            if not courses and email_no_dot not in exec_bios:
                print(f"=== WARNING: EMPTY COURSE IN MASTER ROSTER FOR {email.strip()} AS {role} ===")
                continue
            if role.lower() == "coordinator" or email_no_dot in exec_bios:
                continue
            
            if email_no_dot not in people_by_email:
                people_by_email[email_no_dot] = {"name": name, "courses": {course: role for course in courses}}
            else:
                people_by_email[email_no_dot]["courses"].update({course: role for course in courses})
    
    with open(csv_path, encoding="utf-8-sig", newline="") as f:
        # Read by index so duplicate course headers cannot overwrite earlier answers.
        reader = csv.reader(f)
        headers = next(reader)
        course_indices = [
            i for i, header in enumerate(headers)
            if header.strip() in Cols.COURSE_HEADERS
        ]
        if not course_indices:
            raise ValueError("Bios CSV has no recognized course columns")
        for values in reader:
            if not values:
                continue
            row = dict(zip(headers, values))
            course_answers = [values[i] for i in course_indices if i < len(values)]
            courses = parse_courses(course_answers)
            email = row[Cols.EMAIL]
            email_no_dot = email.replace(".", "").lower().strip() if email else ""
            pref_name = row[Cols.PREF_NAME]
            name = row[Cols.NAME] if not pref_name or pref_name.isspace() else pref_name
            photo_url = next((
                value.strip()
                for value in (row.get(Cols.IMG_URL, ""), row.get(Cols.PHOTO, ""))
                if value and value.strip().startswith(("https://", "http://"))
            ), "")
            bio = row[Cols.BIO]
            role = row[Cols.ROLE]
            if role.strip().lower() in {"tech mentor", "senior tech mentor"}:
                courses = ["tech"]
            pronouns = row[Cols.PRONOUNS]
            web_url = row[Cols.WEB_URL]

            if not courses and any(
                re.sub(r"\s+", "", answer).lower() in NORMALIZED_REJECTIONS
                for answer in course_answers
            ):
                continue
            
            if email_no_dot in exec_bios:
                exec_roles[email_no_dot]["imgUrl"] = photo_url or exec_roles[email_no_dot]["imgUrl"]
                exec_roles[email_no_dot]["pronouns"] = pronouns
                exec_bios[email_no_dot]["imgUrl"] = exec_roles[email_no_dot]["imgUrl"]
                exec_bios[email_no_dot]["pronouns"] = pronouns
                exec_bios[email_no_dot]["details"] = bio if bio and not bio.isspace() else ""
                exec_bios[email_no_dot]["webUrl"] = web_url if web_url and not web_url.isspace() else ""
                print(f"Updated exec bio for {email_no_dot}")
            else:
                if email_no_dot not in people_by_email:
                    people_by_email[email_no_dot] = {"name": name, "pronouns": pronouns, "details": bio, "imgUrl": photo_url, "webUrl": web_url, "courses": {course: role for course in courses}}
                else:
                    obj = people_by_email[email_no_dot]
                    obj.update({
                        "name": name,
                        "pronouns": pronouns,
                        "details": bio,
                        "imgUrl": photo_url or obj.get("imgUrl", ""),
                        "webUrl": web_url
                    })
                    obj["courses"].update({course: role for course in courses})
    
    for email, bio in people_by_email.items():
        if "courses" in bio and "exec" in bio["courses"]:
            del bio["courses"]["exec"]
    
    return people_by_email

if __name__ == '__main__':
    print("Parsing bios...")
    people_by_email = parse_bios(BIOS_PATH, ROSTER_PATH)
    print("Dumping jsons...")
    
    with open(DEST_PATH, "w") as outfile:
        json.dump(list(people_by_email.values()), outfile, indent=4)
    with open(f"src/data/team/{CURR_SEMESTER}.json", "w") as exec_file:
        json.dump(list(exec_roles.values()), exec_file, indent=4)
    with open(f"src/data/bios/exec.json", "w") as exec_bio:
        json.dump(list(exec_bios.values()), exec_bio, indent=4)
    
    print("Done!")
