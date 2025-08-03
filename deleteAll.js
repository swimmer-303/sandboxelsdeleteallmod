// ==UserScript==
// @name        Specific Eraser
// @namespace   Sandboxels
// @version     1.0
// @author      Gemini
// @description Adds a tool that erases only one user-specified element at a time.
// @match       https://sandboxels.r74n.com/*
// @grant       none
// ==/UserScript==

// This check ensures the mod is loaded correctly in Sandboxels.
if (!window.mods) {
    window.mods = {};
}

// Define the mod object
const specificEraserMod = {
    name: "Specific Eraser",
    author: "Gemini",
    version: "1.0",
    description: "An eraser that only deletes a specific element. Click an element to target it. Click on empty space to reset.",
    
    // 'elements' is where we define our new tool
    elements: {
        specific_eraser: {
            // --- Basic Properties ---
            name: "Specific Eraser",
            color: "#ffffff", // Default color is white
            colorOn: "#f0f0f0", // A slightly different color for when it's selected in the menu
            category: "tools",
            desc: "Click an element to target it, then erase only that element. Click empty space to reset.",
            hardness: 1, // Behaves like the standard eraser
            
            // --- Custom Properties for State Management ---
            // We store the element we want to erase right on the tool's object itself.
            targetElement: null,
            originalColor: "#ffffff", // Store the default color to easily reset it

            // --- Tool Functions ---

            // onSelect is called when you click the tool in the menu.
            onSelect: function() {
                // When the tool is selected, we update its color in the menu
                // to visually show what element it's set to erase.
                if (this.targetElement && elements[this.targetElement]) {
                    // If a target is set, change the color to match the target.
                    elements.specific_eraser.color = elements[this.targetElement].color;
                } else {
                    // Otherwise, use the default white color.
                    elements.specific_eraser.color = this.originalColor;
                }
            },

            // onUnselect is called when you choose another element from the menu.
            onUnselect: function() {
                // When deselected, we reset the color in the menu back to its original white.
                // This prevents the menu icon from staying the color of the last targeted element.
                elements.specific_eraser.color = this.originalColor;
            },

            // The 'tool' function contains the main logic. It's called when you click on the canvas.
            tool: function(pixel) {
                // 'pixel' is an object containing information about the pixel under the cursor.

                // --- Reset Logic ---
                // If the user clicks on an empty pixel, we reset the eraser.
                if (pixel.element === "empty") {
                    this.targetElement = null; // Clear the target
                    elements.specific_eraser.color = this.originalColor; // Reset the menu color
                    
                    // Provide feedback to the user that the tool has been reset.
                    // `currentAlert` and `alertTicks` are built-in Sandboxels variables for showing messages.
                    currentAlert = "Specific Eraser has been reset.";
                    alertTicks = 120; // Show message for 120 frames (2 seconds)
                    return; // Stop further execution
                }

                // --- Programming Logic ---
                // If no target is set, we program the eraser with the clicked element.
                if (this.targetElement === null) {
                    // We shouldn't be able to target other tools.
                    if (elements[pixel.element].category === "tools") {
                        currentAlert = "You cannot target a tool!";
                        alertTicks = 120;
                        return;
                    }
                    
                    // Set the target
                    this.targetElement = pixel.element;
                    
                    // Update the visual color of the tool in the menu to match the target.
                    elements.specific_eraser.color = elements[pixel.element].color;
                    
                    // Let the user know what element they've targeted.
                    // Use the element's proper name if it exists, otherwise use its ID.
                    const elementName = elements[pixel.element].name || pixel.element;
                    currentAlert = `Target set to: ${elementName}`;
                    alertTicks = 120;
                } 
                // --- Erasing Logic ---
                // If a target IS set, and the clicked pixel's element matches the target, we erase it.
                else if (pixel.element === this.targetElement) {
                    // `changePixel` is a built-in Sandboxels function to change a pixel's element.
                    changePixel(pixel, "empty");
                }
            }
        }
    }
};

// Register the mod with Sandboxels' modding system.
mods.register(specificEraserMod);
