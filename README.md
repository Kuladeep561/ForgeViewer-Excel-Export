# Export to Excel with Model Element Data

![Platforms](https://img.shields.io/badge/platform-Windows|MacOS-lightgray.svg)
[![License](http://img.shields.io/:license-MIT-blue.svg)](http://opensource.org/licenses/MIT)
[![node.js](https://img.shields.io/badge/Node.js-16.13-blue.svg)](https://nodejs.org)
[![npm](https://img.shields.io/badge/npm-8.9-blue.svg)](https://www.npmjs.com/)
[![oAuth2](https://img.shields.io/badge/oAuth2-v1-green.svg)](https://aps.autodesk.com/en/docs/oauth/v2/developers_guide/overview/)
[![Data-Management](https://img.shields.io/badge/Data%20Management-v1-green.svg)](https://aps.autodesk.com/api/data-management-cover-page/)
[![Model-Derivative](https://img.shields.io/badge/Model%20Derivative-v2-red.svg)](https://aps.autodesk.com/api/model-derivative-cover-page/)
[![Viewer](https://img.shields.io/badge/Viewer-v7-blue.svg)](https://aps.autodesk.com/api/viewer-cover-page/)

### Thumbnail

![thumbnail](/DataToExcel.png)

### Demo Video
![thumbnail](/thumbnail.gif)

# Description

This sample application demonstrates how to extract metadata of model on your Autodesk360, BIM360 or Autodesk Construction Cloud(ACC) account, into an excel spreadsheet.  The sample code demonstates 3-legged OAuth, a simple viewer extension and code to handle  meta-data and format it into an excel spreadsheet file.

In the project tree of this sample, Autodesk360, BIM360 and ACC project are listed with different icons.

   <p align="center"><img src="/project_icon.png" width="200" ></p> 

### Live version

[https://aps-exportxls.autodesk.io](https://aps-exportxls.autodesk.io/)

Video: [Youtube](https://youtu.be/800d2xmQl0s)

# Setup

For using this sample, you need to log into your Autodesk developer account. Visit the [APS Developer Portal](https://developer.autodesk.com) and sign up for an account, then [create an app](https://developer.autodesk.com/myapps/create). When asked for the 'callback URL' in your new app, use **http://localhost:3000/api/aps/callback/oauth**. Finally take note of the **Client ID** and **Client Secret**.

### Run locally

Install [NodeJS](https://nodejs.org).

Clone this project or download it. It's recommended to install [GitHub desktop](https://desktop.github.com/). To clone it via command line, use the following (**Terminal** on MacOSX/Linux, **Git Shell** on Windows):

    git clone https://github.com/autodesk-platform-services/bim360appstore-model.derivative-nodejs-xls.exporter

To run it, install the required packages, set the enviroment variables with your client ID & secret and finally start it. Via command line, navigate to the folder where this repository was cloned and use the following:

Mac OSX/Linux (Terminal)

    npm install
    export APS_CLIENT_ID=<<YOUR CLIENT ID FROM APS DEVELOPER PORTAL>>
    export APS_CLIENT_SECRET=<<YOUR APS CLIENT SECRET>>
    npm run dev

Windows (use <b>Node.js command line</b> from Start menu)

    npm install
    set APS_CLIENT_ID=<<YOUR CLIENT ID FROM APS DEVELOPER PORTAL>>
    set APS_CLIENT_SECRET=<<YOUR APS CLIENT SECRET>>
    npm run dev

Open the browser: [http://localhost:3000](http://localhost:3000).

**Important:** do not use **npm start** locally, this is intended for PRODUCTION only with HTTPS (SSL) secure cookies.

## Packages used

All Autodesk APS NPM packages are included by default, see complete list of what's available at [NPM website](https://www.npmjs.com/browse/keyword/autodesk). OAuth, Model Derivative and OSS are used. Some other non-Autodesk packaged are used, including [express](https://www.npmjs.com/package/express) and its session/cookie middlewares ([express-session](https://www.npmjs.com/package/express-session) and [cookie-parser](https://www.npmjs.com/package/cookie-parser)) for user session handling. The front-end uses [bootsrap](https://www.npmjs.com/package/bootstrap) and [jquery](https://www.npmjs.com/package/jquery).

# Tips & tricks

For local development/testing, consider use [nodemon](https://www.npmjs.com/package/nodemon) package, which auto restart your node application after any modification on your code. To install it, use:

    sudo npm install -g nodemon

Then, instead of <b>npm run dev</b>, use the following:

    npm run nodemon

Which executes **nodemon server.js --ignore www/**, where the **--ignore** parameter indicates that the app should not restart if files under **www** folder are modified.

## Troubleshooting

1. **getProperties does not return data**: In default, [Get Properties endpoint](https://aps.autodesk.com/en/docs/model-derivative/v2/reference/http/urn-metadata-guid-properties-GET/) can only respond with data if the resource < 20M. A query param **forceget** forces get the large resource even if it exceeded the expected maximum length (20 MB). 

2. **Cannot see my BIM 360 or ACC projects**: Make sure to provision the APS App Client ID within the BIM 360 or ACC Account, [learn more here](https://aps.autodesk.com/blog/bim-360-docs-provisioning-aps-apps). This requires the Account Admin permission.

3. **Cannot load Autodesk360 model**: In Autodesk360, the model is not translated by default until the end user loads the model one time in Autodesk360, or the developer posts job to translate. 

4. **error setting certificate verify locations** error: may happen on Windows, use the following: `git config --global http.sslverify "false"`


## Blogs

- [APS Blog](https://aps.autodesk.com/categories/bim-360-api)
- [Field of View](https://fieldofviewblog.wordpress.com/), a BIM focused blog
- [Autodesk Construction Cloud Unified Products: Does it Affect My Application?](https://aps.autodesk.com/blog/autodesk-construction-cloud-unified-products-does-it-affect-my-application)
- [Autodesk Build and Other Autodesk Construction Cloud Unified Products Launch](https://aps.autodesk.com/blog/autodesk-build-and-other-autodesk-construction-cloud-unified-products-launch)

# License

This sample is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT).
Please see the [LICENSE](LICENSE) file for full details.

## Written by

Developer Advocate and Support, Autodesk
