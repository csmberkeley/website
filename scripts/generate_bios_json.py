"""
Generates JSON blobs of bios from a CSV file.
"""

import csv
import json
import os


CLASSES = ("cs61a", "eecs16a", "cs61b", "cs70", "cs61c", "cs88", "eecs16b", "exec")

BIOS_PATH = "./csvs/bios.csv"
ROSTER_FOLDER = "./csvs/roster/"
DEST_PATH = "./src/data/bios/mentors.json"

# Start by keying on email without periods so we can find duplicates easily
people_by_email = {}
SEMESTER = "fa19"
exec_bios = {} # Written into src/data/bios/exec.json
exec_roles = {} # Written into src/data/team/[SEMESTER].json

# Read the roster first
for course in CLASSES:
    with open(os.path.join(ROSTER_FOLDER, course + ".csv"), "r") as roster:
        reader = csv.reader(roster)
        # Skip header
        next(reader)
        # Columns are: name | email | role
        for row in reader:
            name = row[0]
            email = row[1]
            role = row[2].replace("EE", "EECS")
            email_no_dot = email.replace(".", "")
            if course == "exec":
                # We'll assume nobody is in multiple exec roles
                exec_bios[email_no_dot] = {
                    "name": name,
                    "role": role,
                    "imgUrl": ""
                }
                exec_roles[email_no_dot] = {
                    "name": name,
                    "imgUrl": "",
                    "position": role
                }
            elif email_no_dot not in people_by_email:
                people_by_email[email_no_dot] = {
                    "name": name,
                    "email": email,
                    "courses": {course: role}
                }
            else:
                people_by_email[email_no_dot]["courses"][course] = role

# Read bios
with open(BIOS_PATH, "r") as bios:
    reader = csv.reader(bios)
    # Skip header
    next(reader)
    # Columns are: timestamp | email | name | photo URL | bio | resume
    for row in reader:
        email = row[1]
        email_no_dot = email.replace(".", "")
        name = row[2]
        photo_url = row[3]
        bio = row[4]
        if email_no_dot in exec_roles:
            role_obj = exec_roles[email_no_dot]
            role_obj["imgUrl"] = photo_url
            bio_obj = exec_bios[email_no_dot]
            bio_obj["imgUrl"] = photo_url
            bio_obj["details"] = bio
        if email_no_dot in people_by_email:
            obj = people_by_email[email_no_dot]
            obj["name"] = name
            obj["details"] = bio
            obj["imgUrl"] = photo_url

# Write mentor bios
with open(DEST_PATH, "w") as outfile:
    json.dump(list(people_by_email.values()), outfile, indent=4)

with open(f"src/data/team/{SEMESTER}.json", "w") as exec_file:
    json.dump(list(exec_roles.values()), exec_file, indent=4)

with open(f"src/data/bios/exec.json", "w") as exec_bio:
    json.dump(list(exec_bios.values()), exec_bio, indent=4)
