# Register of Apprenticeship Training Providers prototypes

This repository is home to the various prototypes for the RoATP.
This includes enhancements to the staff app, the application for an apprenticeship training provider to apply to join the register, and the various internal assessment journeys that evaluate different areas of the submitted applications.

All of the prototypes are versioned in such a way that we can historically trace the changes made to the different services, with links to the relevant Jira design tickets that have been actioned, as well as the results from user research where those versions have been tested.

## Useful links
- [RoATP on Confluence](https://skillsfundingagency.atlassian.net/wiki/spaces/NDL/pages/304644526/Register+of+Apprenticeship+Training+Providers+RoATP)
- [Design kanban board (Jira)](https://skillsfundingagency.atlassian.net/secure/RapidBoard.jspa?rapidView=467)
- [RoATP User Research](https://skillsfundingagency.atlassian.net/wiki/spaces/NDL/pages/1091699000/RoATP+User+Research)

## Steps for setting up an iterative version of a RoATP Prototype
1. Checkout a new branch based (git checkout -b name-of-branch)
2. Duplicate the latest route file an rename to latest version number (found in `app > routes > [prototype-name]` )
3. In the new route file, change `var v` to match the new version number (e.g. v3)
4. In the main routes file `app > routes.js`, add a new line pointing to the new route file created in the steps above
5. Duplicate the relevant include files (e.g. `app > views > includes > [prototype name] > [version]`) and rename them with the next version number
6. Amend the new include files so that all links point to the correct prototype name and version
7. Duplicate the relevant layout file (e.g. `app > views > layouts > layout_[prototype name]_[version].html` and rename it with the next version number
8. Amend the new layout file so that all links point to the correct prototype name and version 
9. Duplicate the relevant prototype folder (e.g. `app > views > [prototype name] > [version]`) and rename it with the next version number
10. Do a search and replace on all files within the new prototype version folder on the version number (e.g. replace “v1” with “v2”)
11. Add a new link to the new prototype on `app > views > index.html`
