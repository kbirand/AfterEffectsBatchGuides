// MyGrid Extension - main.jsx
// Script to add evenly distributed guides to an After Effects composition

// Function to clear all guides in the active composition
function clearAllGuides() {
    // Check if a project is open
    if (app.project === null) {
        return "Please open a project first.";
    }

    // Check if there's an active composition
    if (app.project.activeItem === null || !(app.project.activeItem instanceof CompItem)) {
        return "Please select a composition first.";
    }

    var comp = app.project.activeItem;
    
    app.beginUndoGroup("Clear All Guides");
    
    try {
        // Remove all existing guides
        while (comp.guides.length > 0) {
            comp.removeGuide(0);
        }
        
        app.endUndoGroup();
        
        return "Successfully removed all guides.";
    } catch (error) {
        app.endUndoGroup();
        return "Error: " + error.toString();
    }
}

function addGuidesToComp(numHGuides, numVGuides, includeEdges, clearExisting, hMargin, vMargin) {
    // Check if a project is open
    if (app.project === null) {
        return "Please open a project first.";
    }

    // Check if there's an active composition
    if (app.project.activeItem === null || !(app.project.activeItem instanceof CompItem)) {
        return "Please select a composition first.";
    }

    var comp = app.project.activeItem;
    var compWidth = comp.width;
    var compHeight = comp.height;
    
    app.beginUndoGroup("Add Evenly Distributed Guides");
    
    try {
        // Clear existing guides if requested
        if (clearExisting) {
            // Remove all existing guides
            while (comp.guides.length > 0) {
                comp.removeGuide(0);
            }
        }
        
        // Add horizontal guides
        if (numHGuides > 0) {
            if (includeEdges) {
                // Calculate the position of each guide
                var guidePositions = [];
                
                // First guide at margin position (top edge)
                guidePositions.push(hMargin);
                
                // Calculate the effective height (total height minus the margins at edges)
                var effectiveHeight = compHeight - (2 * hMargin);
                
                // For each guide pair, create two guides with the specified margin between them
                for (var i = 0; i < numHGuides; i++) {
                    // Calculate the center position for this pair within the effective area
                    var center = hMargin + (effectiveHeight / (numHGuides + 1) * (i + 1));
                    
                    // Create two guides with the margin between them
                    guidePositions.push(center - (hMargin / 2));
                    guidePositions.push(center + (hMargin / 2));
                }
                
                // Last guide at bottom edge minus margin
                guidePositions.push(compHeight - hMargin);
                
                // Sort positions to ensure they're in order
                guidePositions.sort(function(a, b) { return a - b; });
                
                // Add all guides
                for (var i = 0; i < guidePositions.length; i++) {
                    comp.addGuide(0, guidePositions[i]);
                }
            } else {
                // For each guide pair, create two guides with the specified margin between them
                for (var i = 0; i < numHGuides; i++) {
                    // Calculate the center position for this pair
                    var center = compHeight / (numHGuides + 1) * (i + 1);
                    
                    // Create two guides with the margin between them
                    comp.addGuide(0, center - (hMargin / 2));
                    comp.addGuide(0, center + (hMargin / 2));
                }
            }
        }
        
        // Add vertical guides
        if (numVGuides > 0) {
            if (includeEdges) {
                // Calculate the position of each guide
                var guidePositions = [];
                
                // First guide at margin position (left edge)
                guidePositions.push(vMargin);
                
                // Calculate the effective width (total width minus the margins at edges)
                var effectiveWidth = compWidth - (2 * vMargin);
                
                // For each guide pair, create two guides with the specified margin between them
                for (var i = 0; i < numVGuides; i++) {
                    // Calculate the center position for this pair within the effective area
                    var center = vMargin + (effectiveWidth / (numVGuides + 1) * (i + 1));
                    
                    // Create two guides with the margin between them
                    guidePositions.push(center - (vMargin / 2));
                    guidePositions.push(center + (vMargin / 2));
                }
                
                // Last guide at right edge minus margin
                guidePositions.push(compWidth - vMargin);
                
                // Sort positions to ensure they're in order
                guidePositions.sort(function(a, b) { return a - b; });
                
                // Add all guides
                for (var i = 0; i < guidePositions.length; i++) {
                    comp.addGuide(1, guidePositions[i]);
                }
            } else {
                // For each guide pair, create two guides with the specified margin between them
                for (var i = 0; i < numVGuides; i++) {
                    // Calculate the center position for this pair
                    var center = compWidth / (numVGuides + 1) * (i + 1);
                    
                    // Create two guides with the margin between them
                    comp.addGuide(1, center - (vMargin / 2));
                    comp.addGuide(1, center + (vMargin / 2));
                }
            }
        }
        
        app.endUndoGroup();
        
        return "Successfully added " + 
              (numHGuides + (includeEdges ? 2 : 0)) + " horizontal guides and " + 
              (numVGuides + (includeEdges ? 2 : 0)) + " vertical guides.";
    } catch (error) {
        app.endUndoGroup();
        return "Error: " + error.toString();
    }
}
