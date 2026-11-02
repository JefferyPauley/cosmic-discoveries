//communicates with NASA and retrieves astronomy, Mars, and Earth data.//



/* ========================================
   COSMIC DISCOVERIES
   NASA API Functions
======================================== */

/* 1. ASTRONOMY PICTURE OF THE DAY */





async function getAPOD(date = "") {
    // Use today's date if no date is provided.
    if (!date) {
        const today = new Date();

        date = [
            today.getFullYear(),
            String(today.getMonth() + 1).padStart(2, "0"),
            String(today.getDate()).padStart(2, "0")
        ].join("-");
    }

    // Convert YYYY-MM-DD into NASA's YYMMDD format.
    const nasaDate = date.replace(/-/g, "").slice(2);

    const endpoint =
        `https://science.nasa.gov/wp-json/wp/v2/apod-basic/${nasaDate}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error(`NASA API error: ${response.status}`);
    }

    return await response.json();
}


/* ========================================
   2. MARS ROVER PHOTO SEARCH
======================================== */

async function getMarsPhotos(rover = "Curiosity", date = "", page = 1) {

    // Make sure the selected rover is supported.
    const supportedRovers = [
        "Curiosity",
        "Perseverance",
        "Opportunity",
        "Spirit"
    ];

    if (!supportedRovers.includes(rover)) {
        throw new Error("Invalid Mars rover selection.");
    }

    // Build the NASA API search parameters.
    const params = new URLSearchParams({
        q: `${rover} Mars rover`,
        media_type: "image",
        page: String(page),
        page_size: "100"
    });

    // If a date is selected, restrict the search to that year.
    if (date) {
        const selectedYear = date.slice(0, 4);

        params.set("year_start", selectedYear);
        params.set("year_end", selectedYear);
    }

    // Send the request to NASA's official image library.
    const endpoint =
        `https://images-api.nasa.gov/search?${params.toString()}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error(`NASA image search error: ${response.status}`);
    }

    const result = await response.json();

    // Return the collection containing the matching images.
    
    //console.log("NASA response:", result);
//console.log("Top-level keys:", Object.keys(result));
//console.log("Collection:", result.collection);
  return result.collection.items;
}
