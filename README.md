# csmentors.berkeley.edu
The third iteration of CSM's website. This time in React.

## Requirements
- [yarn](https://yarnpkg.com/en/docs/install)
- [node](https://nodejs.org/en/)

The majority of the development of the site is done in [Sublime Text](https://www.sublimetext.com/).
The following packages are _highly_ recommended to speed up development:
- [Babel](https://github.com/babel/babel-sublime) (for JSX syntax highlighting)
- [ESLint](https://github.com/SublimeLinter/SublimeLinter-eslint) (for JS linting)
- [Sublime Linter](https://github.com/SublimeLinter/SublimeLinter) (to enable ESLint)
- [TypeScript](https://packagecontrol.io/packages/TypeScript) (for TS syntax highlighting)

## Development
### Dev Server
From the home directory, run `yarn install`. This should get you all the necessary dependencies.

Run `yarn start` to start the dev server, and visit [localhost:3000] in your browser.

### File Structure
```
├── public
│   ├── img
├── src
│   ├── data
│   ├── labels
│   ├── img
│   ├── components
│   ├── pages
│   └── styles
```
- `src` is home to static resources that are bundled by `create-react-app`.
    - `data` holds JSON files that contain metadata, e.g. mentor bios and course lists
    - `labels` contains JS files with strings or functions that return strings that provide text on the frontend
    - `img` holds images that are unlikely to change, such as our own logo and those of our sponsors
    - `components` contains custom React components
    - `pages` contains pages as React components
    - `styles` contains custom SASS and Materialize components
- `public` is home to other resources
    - `img` holds images that come in bulk, e.g. mentor pictures

### Updating Text
To update the text on a specific page, visit the corresponding Label file in `src/labels`. Most
items are stored as string literals, but some are raw JSX to allow formatting or links.

If you add a new section, make sure you update the corresponding JSX page.

#### Naming and Scoping
Labels are stored roughly hierarchically under the section in which they belong. Please respect the
following naming conventions if possible:
- Page titles and subtitles should be `TITLE` and `SUBTITLE` respectively
- For sections with subheadings accompanied by a body, headings/subheadings should be `LABEL` and the body should be named `BODY`
- Any component that includes JSX should have `_JSX` appended to the name, e.g. body text containing a `<p>` tag should be named `BODY_JSX`

### Updating Application Dates/URL
Edit the URL found in `data/urls.json` to point to the new Google Form. Also edit the timestamps in `data/dates.json` to the new dates (make sure they're in UTC).

### Updating Bios and Images
Make the Google Drive folder containing image uploads publically available (hopefully we can migrate to something more reliable like S3 in the future).
#### Mentors
Create a folder called `csvs`, which will be ignored by git. Download the bio spreadsheet into `csvs/bios.csv`. Running `scripts/generate_bios_json.py` should write JSON blobs into `src/data/bios/mentors.json`. The script should also specify the expected CSV schemas, which hopefully don't change between semesters.

#### Exec
The `generate_bios_json.py` script should generate an appropriate JSON file for exec as well. Images for exec members from sp19 and earlier are served locally, while those from newer semesters are served form Google Drive like any other mentor. To add a new semester's exec team, import the generated JSON file in `Team.tsx`, modify the `CURRENT_SEM` and `SEMESTERS` variables, and add a case for it in the `switch` block in `getOfficerTeamFromSemStr`.

## Credits
This site uses the [Materialize](https://materializecss.com/) design kit.

The site design is taken from the [second iteration of CSM's website](https://github.com/csmberkeley/csmberkeley.github.io), designed by [Peter Lee](http://www.peterlee.tech/), [Katya Stukalova](http://kstukalova.github.io/), Colby Guan, and James Jiang. Various other individuals have maintained it over the years, but their names are lost to history.

The site was redone in React by [Jonathan Shi](http://jonathanshi.me/).
