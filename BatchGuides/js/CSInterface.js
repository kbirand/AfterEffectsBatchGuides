/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
* Copyright 2014 Adobe
* All Rights Reserved.
*
* NOTICE: Adobe permits you to use, modify, and distribute this file in
* accordance with the terms of the Adobe license agreement accompanying
* it. If you have received this file from a source other than Adobe,
* then your use, modification, or distribution of it requires the prior
* written permission of Adobe. 
**************************************************************************/

/**
 * CSInterface for CEP 12.0
 */
function CSInterface() {
    this.hostEnvironment = JSON.parse(window.__adobe_cep__.getHostEnvironment());
    this.hostCapabilities = JSON.parse(window.__adobe_cep__.getHostCapabilities());
}

/**
 * Evaluates a JavaScript script, which can use the JavaScript DOM
 * of the host application.
 *
 * @param script    The JavaScript script.
 * @param callback  Optional. A callback function that receives the result of execution.
 *                  If execution fails, the callback function receives the error message.
 */
CSInterface.prototype.evalScript = function(script, callback) {
    if (callback === null || callback === undefined) {
        callback = function(result) {};
    }
    window.__adobe_cep__.evalScript(script, callback);
};

/**
 * Retrieves the scale factor of the screen.
 *
 * @return The scale factor of the screen.
 */
CSInterface.prototype.getScaleFactor = function() {
    return window.__adobe_cep__.getScaleFactor();
};

/**
 * Loads and evaluates a JavaScript script into the extension context.
 *
 * @param path      The path of the script file.
 */
CSInterface.prototype.loadScript = function(path) {
    var scriptLoader = document.createElement("script");
    scriptLoader.type = "text/javascript";
    scriptLoader.src = path;
    document.head.appendChild(scriptLoader);
};

/**
 * Registers an interest in a specific key event, and returns a keyEventData object.
 *
 * @param keyEvtData A keyEventData object.
 * @return A JavaScript object containing the key event data.
 */
CSInterface.prototype.registerKeyEventsInterest = function(keyEvtData) {
    return JSON.parse(window.__adobe_cep__.registerKeyEventsInterest(JSON.stringify(keyEvtData)));
};

/**
 * Sets the title of the extension window.
 *
 * @param title The window title.
 */
CSInterface.prototype.setWindowTitle = function(title) {
    window.__adobe_cep__.invokeSync("setWindowTitle", title);
};

/**
 * Gets the title of the extension window.
 *
 * @return The window title.
 */
CSInterface.prototype.getWindowTitle = function() {
    return window.__adobe_cep__.invokeSync("getWindowTitle", "");
};

/**
 * Resizes the extension container.
 *
 * @param width  The new width.
 * @param height The new height.
 */
CSInterface.prototype.resizeContent = function(width, height) {
    window.__adobe_cep__.resizeContent(width, height);
};

/**
 * Updates the extension content bounds.
 *
 * @param bounds The new bounds.
 */
CSInterface.prototype.updatePanelBounds = function(bounds) {
    window.__adobe_cep__.updatePanelBounds(bounds);
};

/**
 * Loads binary file.
 *
 * @param path  The path of the file.
 * @return A binary buffer.
 */
CSInterface.prototype.loadBinAsync = function(path, callback) {
    var XMLHTTP = window.XMLHttpRequest;
    var xhr = new XMLHTTP();
    xhr.open("GET", path, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
        if (xhr.status === 200) {
            callback(xhr.response);
        } else {
            callback(null, "Error " + xhr.status + " occurred when loading binary file.");
        }
    };
    xhr.send();
};

// Define constants for extension
CSInterface.THEME_COLOR_CHANGED_EVENT = "com.adobe.csxs.events.ThemeColorChanged";
