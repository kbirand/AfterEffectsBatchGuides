function addGuidesToComp(numHGuides, numVGuides, includeEdges, clearExisting, hMargin, vMargin) {

    hMargin = (hMargin !== undefined) ? hMargin : 0;
    vMargin = (vMargin !== undefined) ? vMargin : 0;
    if (app.project === null) {
        return "Please open a project first.";
    }

    if (app.project.activeItem === null || !(app.project.activeItem instanceof CompItem)) {
        return "Please select a composition first.";
    }

    var comp = app.project.activeItem;
    var compWidth = comp.width;
    var compHeight = comp.height;
    
    app.beginUndoGroup("Batch Guides");
    
    try {
        if (clearExisting) {
            while (comp.guides.length > 0) {
                comp.removeGuide(0);
            }
        }

        if (numHGuides > 0) {
            if (includeEdges) {
                var guidePositions = [];
                
                guidePositions.push(hMargin);
                
                var effectiveHeight = compHeight - (2 * hMargin);
                
                for (var i = 0; i < numHGuides; i++) {
                    var center = hMargin + (effectiveHeight / (numHGuides + 1) * (i + 1));
                    
                    guidePositions.push(center - (hMargin / 2));
                    guidePositions.push(center + (hMargin / 2));
                }
                
                guidePositions.push(compHeight - hMargin);
                
                guidePositions.sort(function(a, b) { return a - b; });
                
                for (var i = 0; i < guidePositions.length; i++) {
                    comp.addGuide(0, guidePositions[i]);
                }
            } else {
                for (var i = 0; i < numHGuides; i++) {
                    var center = compHeight / (numHGuides + 1) * (i + 1);
                    
                    comp.addGuide(0, center - (hMargin / 2));
                    comp.addGuide(0, center + (hMargin / 2));
                }
            }
        }
        

        if (numVGuides > 0) {
            if (includeEdges) {
                var guidePositions = [];
                
                guidePositions.push(vMargin);
                
                var effectiveWidth = compWidth - (2 * vMargin);
                
                for (var i = 0; i < numVGuides; i++) {
                    var center = vMargin + (effectiveWidth / (numVGuides + 1) * (i + 1));
                    
                    guidePositions.push(center - (vMargin / 2));
                    guidePositions.push(center + (vMargin / 2));
                }
                
                guidePositions.push(compWidth - vMargin);
                
                guidePositions.sort(function(a, b) { return a - b; });
                
                for (var i = 0; i < guidePositions.length; i++) {
                    comp.addGuide(1, guidePositions[i]);
                }
            } else {
                for (var i = 0; i < numVGuides; i++) {
                    var center = compWidth / (numVGuides + 1) * (i + 1);
                    
                    comp.addGuide(1, center - (vMargin / 2));
                    comp.addGuide(1, center + (vMargin / 2));
                }
            }
        }
        
        app.endUndoGroup("Batch Guides");
        
        return "Successfully added guides.";
    } catch (error) {
        app.endUndoGroup("Batch Guides");
        return "Error: " + error.toString();
    }
}

(function() {
    if (app.project === null) {
        alert("Please open a project first.");
        return;
    }

    if (app.project.activeItem === null || !(app.project.activeItem instanceof CompItem)) {
        alert("Please select a composition first.");
        return;
    }

    var dialog = new Window("dialog", "Batch Guides");
    dialog.orientation = "column";
    dialog.alignChildren = ["fill", "top"];
    dialog.spacing = 10;
    dialog.margins = 16;

    var hGroup = dialog.add("group", undefined, "Horizontal Guides");
    hGroup.orientation = "row";
    hGroup.alignChildren = ["left", "center"];
    hGroup.spacing = 10;
    hGroup.margins = 0;
    
    hGroup.add("statictext", undefined, "Number of Horizontal Guides:");
    var hGuidesInput = hGroup.add("edittext", undefined, "3");
    hGuidesInput.characters = 5;
    hGuidesInput.active = true;

    var vGroup = dialog.add("group", undefined, "Vertical Guides");
    vGroup.orientation = "row";
    vGroup.alignChildren = ["left", "center"];
    vGroup.spacing = 10;
    vGroup.margins = 0;
    
    vGroup.add("statictext", undefined, "Number of Vertical Guides:");
    var vGuidesInput = vGroup.add("edittext", undefined, "3");
    vGuidesInput.characters = 5;

    var includeEdgesGroup = dialog.add("group", undefined);
    includeEdgesGroup.orientation = "row";
    includeEdgesGroup.alignChildren = ["left", "center"];
    var includeEdgesCheckbox = includeEdgesGroup.add("checkbox", undefined, "Include guides at edges");
    includeEdgesCheckbox.value = false;

    var marginGroup = dialog.add("panel", undefined, "Margin (px)");
    marginGroup.orientation = "row";
    marginGroup.alignChildren = ["left", "center"];
    marginGroup.spacing = 10;
    marginGroup.margins = 10;
    
    var hMarginGroup = marginGroup.add("group", undefined);
    hMarginGroup.orientation = "row";
    hMarginGroup.alignChildren = ["left", "center"];
    hMarginGroup.spacing = 5;
    hMarginGroup.add("statictext", undefined, "Horizontal:");
    var hMarginInput = hMarginGroup.add("edittext", undefined, "20");
    hMarginInput.characters = 4;
    
    var vMarginGroup = marginGroup.add("group", undefined);
    vMarginGroup.orientation = "row";
    vMarginGroup.alignChildren = ["left", "center"];
    vMarginGroup.spacing = 5;
    vMarginGroup.add("statictext", undefined, "Vertical:");
    var vMarginInput = vMarginGroup.add("edittext", undefined, "20");
    vMarginInput.characters = 4;
    
    var clearGuidesGroup = dialog.add("group", undefined);
    clearGuidesGroup.orientation = "row";
    clearGuidesGroup.alignChildren = ["left", "center"];
    var clearGuidesCheckbox = clearGuidesGroup.add("checkbox", undefined, "Clear existing guides");
    clearGuidesCheckbox.value = true;

    var buttonGroup = dialog.add("group", undefined);
    buttonGroup.orientation = "row";
    buttonGroup.alignChildren = ["center", "center"];
    buttonGroup.alignment = ["center", "top"];
    
    var okButton = buttonGroup.add("button", undefined, "OK", {name: "ok"});
    var cancelButton = buttonGroup.add("button", undefined, "Cancel", {name: "cancel"});

    okButton.onClick = function() {
        var numHGuides = parseInt(hGuidesInput.text, 10);
        var numVGuides = parseInt(vGuidesInput.text, 10);
        
        if (isNaN(numHGuides) || isNaN(numVGuides) || numHGuides < 0 || numVGuides < 0) {
            alert("Please enter valid numbers for guides (must be 0 or positive).");
            return;
        }
        
        var hMargin = parseInt(hMarginInput.text, 10) || 0;
        var vMargin = parseInt(vMarginInput.text, 10) || 0;
        
        if (hMargin < 0 || vMargin < 0) {
            alert("Margin values must be 0 or positive.");
            return;
        }
        
        var result = addGuidesToComp(numHGuides, numVGuides, includeEdgesCheckbox.value, clearGuidesCheckbox.value, hMargin, vMargin);
        alert(result);
        dialog.close();
    };

    cancelButton.onClick = function() {
        dialog.close();
    };

    dialog.show();
})();
