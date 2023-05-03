﻿/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by APS Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

var fileName;
var fileType;
var documentId;

$(document).ready(function () {
  // in case we want to load this app with a model pre-loaded
  var urn = getParameterByName("urn");
  if (urn !== null && urn !== "") launchViewer(urn);
});

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var viewer;

// @urn the model to show
// @viewablesId which viewables to show, applies to BIM 360 Plans folder
function launchViewer(urn, viewableId, name, type) {
  var options = {
    env: "AutodeskProduction",
    getAccessToken: getAPSToken,
    api:
      "derivativeV2" +
      (atob(urn.replace("_", "/")).indexOf("emea") > -1 ? "_EU" : ""), // handle BIM 360 US and EU regions
  };

  fileName = name;
  fileType = type;
  documentId = urn;

  Autodesk.Viewing.Initializer(options, () => {
    const config = {
      extensions: ["Autodesk.VisualClusters", "Autodesk.DocumentBrowser"],
    };

    viewer = new Autodesk.Viewing.GuiViewer3D(
      document.getElementById("apsViewer"),
      config
    );
    viewer.start();
    var documentId = "urn:" + urn;
    Autodesk.Viewing.Document.load(
      documentId,
      onDocumentLoadSuccess,
      onDocumentLoadFailure
    );

    // smooth navigation...
    viewer.autocam.shotParams.destinationPercent = 3;
    viewer.autocam.shotParams.duration = 3;
  });

  function onDocumentLoadSuccess(doc) {
    var viewables = viewableId
      ? doc.getRoot().findByGuid(viewableId)
      : doc.getRoot().getDefaultGeometry();
    viewer.loadDocumentNode(doc, viewables).then((i) => {
      setTimeout(function () {
        viewer.loadExtension("Autodesk.Sample.XLSExtension");
      }, 5000); // 5000 milliseconds (5 seconds) delay
    });
  }

  function onDocumentLoadFailure(viewerErrorCode) {
    console.error("onDocumentLoadFailure() - errorCode:" + viewerErrorCode);
  }
}

function getAPSToken() {
  jQuery.ajax({
    url: "/user/token",
    success: function (res) {
      token = res;
    },
    async: false,
  });
  return token;
}
