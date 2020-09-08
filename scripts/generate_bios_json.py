#!/usr/bin/env python3

"""
Generates JSON blobs of bios. Takes in a single CSV, containing at least the following
columns:

email | name | role | course | preferred name? | photo url | bio

It is recommended to first do some preprocessing within Google Sheets to obtain
the desired columns or filter any unwanted entries.
"""

import csv
import json

CURR_SEMESTER = "fa20"

BIOS_PATH = "./csvs/bios.csv"
DEST_PATH = "./src/data/bios/mentors.json"

class Cols:
    """
    The headers of each column as they appear in the CSV.
    """
    EMAIL = "Email Address"
    NAME = "Name"
    ROLE = "For which position are you accepting/rejecting?"
    COURSE = "COURSE"
    PREF_NAME = "Preferred Name"
    IMG_URL = "Photo"
    BIO = "Biography"

# This string in the course means we should skip them and move on with life
NORMALIZED_REJECTIONS = {
    "iamrejectingallpositionsthatididnotexplicitlyaccept",
    "iamrejectingallampositionsthatididnotexplicitlyaccept"
}

def parse_bios(csv_path):
    """
    Reads bios from the given CSV, returning a dictionary of data keyed by emails.
    """
    # Start by keying on email without periods so we can find duplicates easily
    people_by_email = {}
    with open(csv_path) as f:
        reader = csv.DictReader(f)
        for row in reader:
            email = row[Cols.EMAIL]
            email_no_dot = email.replace(".", "")
            pref_name = row[Cols.PREF_NAME]
            name = row[Cols.NAME] if not pref_name or pref_name.isspace() else pref_name
            photo_url = row[Cols.IMG_URL]
            bio = row[Cols.BIO]
            course = row[Cols.COURSE].lower().replace(" ", "")
            role = row[Cols.ROLE]
            if course not in NORMALIZED_REJECTIONS:
                print(f"{name} for {course}")
                if email_no_dot not in people_by_email:
                    if not course or course.isspace():
                        print(f"=== NO COURSE FOUND FOR {name}, SKIPPING FOR NOW ===")
                    else:
                        people_by_email[email_no_dot] = {
                            "name": name,
                            "details": bio,
                            "imgUrl": photo_url,
                            "courses": {course: role},
                        }
                else:
                    if not course or course.isspace():
                        print(f"=== NO COURSE FOUND FOR {name}, SKIPPING FOR NOW ===")
                    else:
                        people_by_email[email_no_dot]["courses"][course] = role
    return people_by_email


if __name__ == '__main__':
    print("Parsing bios...")
    people_by_email = parse_bios(BIOS_PATH)
    print("Dumping json...")
    # Write mentor bios
    with open(DEST_PATH, "w") as outfile:
        json.dump(list(people_by_email.values()), outfile, indent=4)
    print("Done!")
