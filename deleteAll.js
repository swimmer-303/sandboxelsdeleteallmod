if (typeof runAfterLoad === "undefined") {
    runAfterLoad = [];
}

runAfterLoad.push(() => {
    const button = document.createElement("button");
    button.innerText = "🧽 Delete Selected Element";
    button.style.margin = "4px";
    button.onclick = () => {
        const selected = currentElement;
        let deleted = 0;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let p = pixelMap[x][y];
                if (p && p.element === selected) {
                    deletePixel(x, y);
                    deleted++;
                }
            }
        }

        alert(`Deleted ${deleted} '${selected}' pixels`);
    };

    document.getElementById("toolsDiv").appendChild(button);
});
