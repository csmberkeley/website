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

CURR_SEMESTER = "sp25" # CHANGE ME

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
    PRONOUNS = "Pronouns"
    PREF_NAME = "Preferred Name"
    IMG_URL = "Photo"
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

def parse_bios(csv_path, master_roster_path):
    """
    Reads bios from the given CSV, returning a dictionary of data keyed by emails.
    """
    people_by_email = {}
    
    with open(EXEC_ROLE_PATH) as f:
        reader = csv.reader(f)
        for name, email, role in reader:
            email_no_dot = email.replace(".", "").lower().strip() if email else ""
            exec_roles[email_no_dot] = {"name": name, "imgUrl": "", "position": role}
            exec_bios[email_no_dot] = {"name": name, "role": role, "imgUrl": ""}
    
    with open(master_roster_path) as f:
        reader = csv.reader(f)
        for row in reader:
            name, email, role, preproc_course = row
            course = preproc_course.lower().replace(" ", "")
            email_no_dot = email.replace(".", "").lower().strip()
            
            if not role:
                print(f"=== WARNING: EMPTY ROLE IN MASTER ROSTER FOR {email.strip()} ===")
            if not course and email_no_dot not in exec_bios:
                print(f"=== WARNING: EMPTY COURSE IN MASTER ROSTER FOR {email.strip()} AS {role} ===")
                continue
            if role.lower() == "coordinator":
                continue
            
            if email_no_dot not in people_by_email:
                people_by_email[email_no_dot] = {"name": name, "courses": {course: role}}
            else:
                people_by_email[email_no_dot]["courses"][course] = role
    
    with open(csv_path) as f:
        reader = csv.DictReader(f)
        for row in reader:
            email = row[Cols.EMAIL]
            email_no_dot = email.replace(".", "").lower().strip() if email else ""
            pref_name = row[Cols.PREF_NAME]
            name = row[Cols.NAME] if not pref_name or pref_name.isspace() else pref_name
            photo_url = row[Cols.IMG_URL]
            bio = row[Cols.BIO]
            course = row[Cols.COURSE].lower().replace(" ", "").strip()
            role = row[Cols.ROLE]
            pronouns = row[Cols.PRONOUNS]
            web_url = row[Cols.WEB_URL]

            if course in NORMALIZED_REJECTIONS:
                continue
            
            if email_no_dot in exec_bios:
                exec_roles[email_no_dot]["imgUrl"] = photo_url if photo_url and not photo_url.isspace() else ""
                exec_roles[email_no_dot]["pronouns"] = pronouns
                exec_bios[email_no_dot]["imgUrl"] = exec_roles[email_no_dot]["imgUrl"]
                exec_bios[email_no_dot]["pronouns"] = pronouns
                exec_bios[email_no_dot]["details"] = bio if bio and not bio.isspace() else ""
                exec_bios[email_no_dot]["webUrl"] = web_url if web_url and not web_url.isspace() else ""
                print(f"Updated exec_bios for {email_no_dot}: {exec_bios[email_no_dot]}")
            else:
                if email_no_dot not in people_by_email:
                    people_by_email[email_no_dot] = {"name": name, "pronouns": pronouns, "details": bio, "imgUrl": photo_url, "webUrl": web_url, "courses": {course: role}}
                else:
                    obj = people_by_email[email_no_dot]
                    obj.update({
                        "name": name,
                        "pronouns": pronouns,
                        "details": bio,
                        "imgUrl": photo_url,
                        "webUrl": web_url
                    })
                    obj["courses"][course] = role
    
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
