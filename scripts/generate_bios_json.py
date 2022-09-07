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

CURR_SEMESTER = "fa22" # CHANGE ME

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
    COURSE = "COURSE"
    PRONOUNS = "Pronouns"
    PREF_NAME = "Preferred Name"
    IMG_URL = "Photo"
    BIO = "Biography"
    WEB_URL =  "(Optional) Website"

# This string in the course means we should skip them and move on with life
NORMALIZED_REJECTIONS = {
    "iamrejectingallpositionsthatididnotexplicitlyaccept",
    "iamrejectingallampositionsthatididnotexplicitlyaccept"
}

# global variables lmao
exec_bios = {} # Written into src/data/bios/exec.json
exec_roles = {} # Written into src/data/team/[SEMESTER].json

def parse_bios(csv_path, master_roster_path):
    """
    Reads bios from the given CSV, returning a dictionary of data keyed by emails.
    """
    # Start by keying on email without periods so we can find duplicates easily
    people_by_email = {}
    with open(EXEC_ROLE_PATH) as f:
        reader = csv.reader(f)
        for name, email, role in reader:
            email_no_dot = email.replace(".", "").lower().strip()
            # We'll assume nobody is in multiple exec roles
            exec_roles[email_no_dot] = {
                "name": name,
                "imgUrl": "",
                "position": role
            }
            exec_bios[email_no_dot] = {
                "name": name,
                "role": role,
                "imgUrl": ""
            }

    with open(master_roster_path) as f:
        reader = csv.reader(f)
        for row in reader:
            name, email, role, preproc_course = row
            course = preproc_course.lower().replace(" ", "")
            email_no_dot = email.replace(".", "").lower().strip()
            if not role:
                print(f"=== WARNING: EMPTY ROLE IN MASTER ROSTER FOR {email.strip()} ===")
            if not course:
                if email_no_dot not in exec_bios:
                    print(f"=== WARNING: EMPTY COURSE IN MASTER ROSTER FOR {email.strip()} AS {role} ===")
                continue  # skip exec because they're already in exec roster
            if role.lower() == "coordinator":
                continue  # also skip coords because they're already in the exec roster
            if email_no_dot not in people_by_email:
                people_by_email[email_no_dot] = {
                    "name": name,
                    "courses": {course: role},
                }
            else:
                obj = people_by_email[email_no_dot]
                obj["name"] = name
                obj["courses"][course] = role

    with open(csv_path) as f:
        reader = csv.DictReader(f)
        for row in reader:
            email = row[Cols.EMAIL]
            email_no_dot = email.replace(".", "").lower().strip()
            pref_name = row[Cols.PREF_NAME]
            use_pref_name = pref_name and not pref_name.isspace()
            name = row[Cols.NAME] if not use_pref_name else pref_name
            photo_url = row[Cols.IMG_URL]
            bio = row[Cols.BIO]
            course = row[Cols.COURSE].lower().replace(" ", "").strip()
            role = row[Cols.ROLE]
            pronouns = row[Cols.PRONOUNS]
            web_url = row[Cols.WEB_URL]
            def update(email_no_dot):
                # Assume the latest version of the bio is correct
                obj = people_by_email[email_no_dot]
                if use_pref_name:
                    obj["name"] = name
                if pronouns and not pronouns.isspace():
                    obj["pronouns"] = pronouns
                if course and not course.isspace():
                    if "courses" not in obj:
                        obj["courses"] = {}
                    obj["courses"][course] = role
                if photo_url and not photo_url.isspace():
                    obj["imgUrl"] = photo_url
                if bio and not bio.isspace():
                    obj["details"] = bio
                if web_url and not web_url.isspace():
                    obj["webUrl"] = web_url

            if course in NORMALIZED_REJECTIONS:
                pass
            elif role == "Exec" or email_no_dot in exec_bios:
                # print(f"\t{name} for exec")
                exec_roles[email_no_dot]["imgUrl"] = photo_url
                exec_roles[email_no_dot]["pronouns"] = pronouns
                exec_bios[email_no_dot]["imgUrl"] = photo_url
                exec_bios[email_no_dot]["pronouns"] = pronouns
                exec_bios[email_no_dot]["details"] = bio
                exec_bios[email_no_dot]["webUrl"] = web_url
                if email_no_dot in people_by_email:
                    update(email_no_dot)
                # else:
                #     print(f"=== SKIPPING EXEC {name} ===")
            else:
                # print(f"\t{name} for {course}")
                if email_no_dot not in people_by_email:
                    people_by_email[email_no_dot] = {
                        "name": name,
                        "pronouns": pronouns,
                        "details": bio,
                        "imgUrl": photo_url,
                        "webUrl": web_url,
                    }
                    if not course or course.isspace():
                        print(f"=== NO COURSE FOUND FOR {name} ===")
                    else:
                        people_by_email[email_no_dot]["courses"] = {course: role}
                else:
                    update(email_no_dot)
    # # 61B is doing its own form so I'm just hacking in a snippet here
    # with open("csvs/bios-61b.csv") as f:
    #     reader = csv.DictReader(f)
    #     for row in reader:
    #         email = row["Email Address"]
    #         email_no_dot = email.replace(".", "").lower().strip()
    #         name = row["Preferred Name"]
    #         photo_url = row["Photo"]
    #         bio = row["Biography"]
    #         # hardcode coords I guess
    #         if name in ["Samantha Adams", "Ryan Nuqui"]:
    #             exec_roles[email_no_dot]["imgUrl"] = photo_url
    #             exec_bios[email_no_dot]["imgUrl"] = photo_url
    #             exec_bios[email_no_dot]["details"] = bio
    #         elif email_no_dot not in people_by_email:
    #             print(f"=== NO ROLE WAS FOUND FOR 61B MENTOR {name}, SKIPPING FOR NOW ===")
    #         else:
    #             obj = people_by_email[email_no_dot]
    #             obj["name"] = name
    #             obj["imgUrl"] = photo_url
    #             obj["details"] = bio
    
    # filter exec from people_by_email
    for email, bio in people_by_email.items():
        if "exec" in bio["courses"]:
            del bio["courses"]["exec"]
    return people_by_email


if __name__ == '__main__':
    print("Parsing bios...")
    people_by_email = parse_bios(BIOS_PATH, ROSTER_PATH)
    print("Dumping jsons...")
    # Write mentor bios
    with open(DEST_PATH, "w") as outfile:
        json.dump(list(people_by_email.values()), outfile, indent=4)
    with open(f"src/data/team/{CURR_SEMESTER}.json", "w") as exec_file:
        json.dump(list(exec_roles.values()), exec_file, indent=4)
    with open(f"src/data/bios/exec.json", "w") as exec_bio:
        json.dump(list(exec_bios.values()), exec_bio, indent=4)
    print("Done!")
