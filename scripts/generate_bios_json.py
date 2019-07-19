"""
Generates JSON blobs of bios from a CSV file, and downloads images accordingly.
Requires gdrive to be installed (https://github.com/prasmussen/gdrive)
Made by Matthew Soh in Fall 2018, modified by Jonathan Shi in Spring 2019

TODO figure out how to save download progress, and not make too many requests to google drive
probably should involve generational indices and store the generation in a text file somewhere
"""

import csv
import json
import subprocess
from warnings import warn
import os

# what image links should be prefixed with
base_img_location = "../public/img/people/"
# where images should be downloaded to
img_dl_location = "../public/img/people/"
# staging location (files get download here before being renamed)
img_stage_location = "../public/img/tmp_people/"

CLASSES = ("cs61a", "ee16a", "cs61b", "cs70", "cs61c", "cs88", "ee16b")

IN_LOCATION = "./bios.csv"
OUT_LOCATION = "./biodump.json"

img_list = None

def list_img_dir(force=False):
    global img_list
    if force: img_list = None
    img_list = img_list or os.listdir(img_dl_location)
    return img_list

failures = []
seen = set()
dups = []

def get_photo(name, photo_id):
    normalized_name = "-".join(name.lower().split(" "))
    if normalized_name in seen:
        dups.append(normalized_name)
    else:
        seen.add(normalized_name)

    # Check if the image already exists
    for x in list_img_dir():
        if normalized_name in x: # use the one with the correct file extension
            # print("image exists locally for {}".format(normalized_name))
            return x

    # The image does not exist locally
    exit_code = subprocess.call(
        ["gdrive", "download", photo_id, "--path", img_stage_location]
    )
    if exit_code != 0:
        warn(
            "Attempt to download photo for {}, photo_id={} did not complete successfully. (exit code {})" \
                .format(name, photo_id, exit_code)
        )
        failures.append(name)
    else:
        img_filename = os.listdir(img_stage_location)[0]
        file_extension = img_filename.split(".")[-1]
        new_img_filename = '.'.join((normalized_name, file_extension))
        subprocess.call(
            [
                "mv",
                os.path.join(img_stage_location, img_filename),
                os.path.join(img_dl_location, new_img_filename),
            ]
        )
        return new_img_filename

"""
bio = {
    name :: str
    email :: str
    details :: str
    imgName :: str
    course :: { str: str } (maps course name to role string)
}
"""
def read_bios():
    objs = {}
    with open(IN_LOCATION, "r") as csvfile:
        reader = csv.reader(csvfile)
        next(reader)
        for row in reader:
            _, email, name, photo_url, bio, website, _ = row
            # (id field should be after ?id=)
            photo_id = photo_url.split("=")[-1]
            photo = get_photo(name, photo_id)
            obj = {
                "name": name,
                "email": email,
                "details": bio,
                "imgName": photo,
                "courses": {}
            }
            if website:
                obj["website"] = website
            # in sp19, need to populate course/role from elsewhere
            objs[email] = obj
    return objs

def read_rosters(objs):
    for cn in CLASSES:
        with open(os.path.join("mentors", "{}.csv").format(cn), "r") as csvfile:
            reader = csv.reader(csvfile)
            next(reader) # skip header
            for row in reader:
                # can't unpack b/c varying # of cols
                email = row[1]
                role = row[2]
                if email not in objs: # didn't fill out bio form
                    objs[email] = { "email": email, "courses": {}, "imgName": "" }
                if "name" not in objs[email]:
                    objs[email]["name"] = row[0]
                objs[email]["courses"][cn.upper()] = role

def main():
    objs = read_bios()    
    read_rosters(objs)
    if failures:
        warn("failed to get images for: {}".format(failures))
    if dups:
        warn("WARNING: duplicate names detected: {}; please resolve manually".format(dups))
    with open(OUT_LOCATION, "w") as outfile:
        json.dump(list(objs.values()), outfile, indent=4)

main()