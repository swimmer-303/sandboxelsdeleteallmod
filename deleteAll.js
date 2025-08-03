runAfterLoad.push(() => {
    const button = document.createElement("button");
    button.innerText = "🧽 Delete Selected Element";
    button.style.margin = "4px";
    button.style.padding = "6px 10px";
    button.style.fontSize = "14px";
    button.style.cursor = "pointer";

    button.onclick = () => {
        const selected = currentElement;
        if (!selected) {
            alert("No element selected.");
            return;
        }

        let deleted = 0;
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const pixel = pixelMap[x][y];
                if (pixel && pixel.element === selected) {
                    deletePixel(x, y);
                    deleted++;
                }
            }
        }
        alert(`Deleted ${deleted} '${selected}' pixels.`);
    };

    const toolsDiv = document.getElementById("toolsDiv");
    if (toolsDiv) {
        toolsDiv.appendChild(button);
    } else {
        console.error("Could not find toolsDiv to append button.");
    }
});
