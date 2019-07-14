# csmentors.berkeley.edu
The third iteration of CSM's website. This time in React.

## Requirements
- [yarn](https://yarnpkg.com/en/docs/install)
- [node](https://nodejs.org/en/)

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
│   ├── img
│   ├── components
│   ├── pages
│   └── styles
```
- `src` is home to static resources that are bundled by `create-react-app`.
    - `data` holds JSON files that contain metadata, e.g. mentor bios and course lists
    - `img` holds images that are unlikely to change, such as our own logo and those of our sponsors
    - `components` contains custom React components
    - `pages` contains pages as React components
    - `styles` contains custom SASS and Materialize components
- `public` is home to other resources
    - `img` holds images that come in bulk, e.g. mentor pictures

## Credits
This site uses the [Materialize](https://materializecss.com/) design kit.

The site design is taken from the [second iteration of CSM's website](https://github.com/csmberkeley/csmberkeley.github.io), designed by [Peter Lee](http://www.peterlee.tech/), [Katya Stukalova](http://kstukalova.github.io/), Colby Guan, and James Jiang. Various other individuals have maintained it over the years, but their names are lost to history

The site was redone in React by [Jonathan Shi](http://jonathanshi.me/).
