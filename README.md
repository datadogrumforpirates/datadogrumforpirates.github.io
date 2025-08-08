# datadogrumforpirates.github.io

## Pre-requisites

1. Go to https://app.datadoghq.com/rum/application/create
2.   Make sure you are in your Datadog Sandbox when creating this! 
3. Create with Application type: JS Application
4. Give your Application a name
5. + Create New RUM Application
6. Save the Client Token from RUM Application
7. Save the Application ID from RUM Application (note this is _*not*_ the same as a your Datadog Application Key)

## Steps
1. Fork this repo
2. In the following places, update the client token and application ID to the values from your RUM application: /index.html, /games/tic.html, /test/index.html
3. Please make sure to update the client token and application IDs prior to renaming the repository
4. Rename the repository to `<yourGitHubusername>.github.io`
5. Follow steps here on how to create a Github pages site: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
6. yourGitHubusername.github.io will serve as the page on which you'll test and collect RUM sessions

## Already have a GitHub pages site?
1. Github only allows one site.github.io page which has to be named after your username, i.e starryknight620.github.io
2. To get around this, create an organization under your account
3. Navigate to that organization
4. Repeat steps 1-5 from the ##Steps section above
