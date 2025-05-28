// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get a reference to the CSInterface
    var csInterface = new CSInterface();
    
    // Load the JSX file
    csInterface.evalScript('$.evalFile(new File($.fileName).parent.fsName + "/jsx/main.jsx")');
    
    // Get references to UI elements
    var hGuidesInput = document.getElementById('hGuides');
    var vGuidesInput = document.getElementById('vGuides');
    var hMarginInput = document.getElementById('hMargin');
    var vMarginInput = document.getElementById('vMargin');
    var includeEdgesCheckbox = document.getElementById('includeEdges');
    var clearExistingCheckbox = document.getElementById('clearExisting');
    var applyButton = document.getElementById('applyButton');
    var clearAllButton = document.getElementById('clearAllButton');
    var statusElement = document.getElementById('status');
    
    // Add click event listener to the apply button
    applyButton.addEventListener('click', function() {
        // Get values from inputs
        var numHGuides = parseInt(hGuidesInput.value, 10);
        var numVGuides = parseInt(vGuidesInput.value, 10);
        var hMargin = parseInt(hMarginInput.value, 10);
        var vMargin = parseInt(vMarginInput.value, 10);
        var includeEdges = includeEdgesCheckbox.checked;
        var clearExisting = clearExistingCheckbox.checked;
        
        // Validate input
        if (isNaN(numHGuides) || isNaN(numVGuides) || isNaN(hMargin) || isNaN(vMargin) || 
            numHGuides < 0 || numVGuides < 0 || hMargin < 0 || vMargin < 0) {
            statusElement.textContent = "Please enter valid numbers for guides and margins (must be 0 or positive).";
            return;
        }
        
        // Call the JSX function
        var jsxFunction = "addGuidesToComp(" + numHGuides + ", " + numVGuides + ", " + includeEdges + ", " + clearExisting + ", " + hMargin + ", " + vMargin + ")";
        
        csInterface.evalScript(jsxFunction, function(result) {
            statusElement.textContent = result;
        });
    });
    
    // Add click event listener to the clear all guides button
    clearAllButton.addEventListener('click', function() {
        // Call the JSX function to clear all guides
        var jsxFunction = "clearAllGuides()";
        
        csInterface.evalScript(jsxFunction, function(result) {
            statusElement.textContent = result;
        });
    });
});
