//controls the website's behavior, form interactions, and display of messages. there are 3 functions that
// will let the website show loading messages, error and no results messages//

/*COSMIC DISCOVERIES
   Main JavaScript File
======================================== */


/* ----------------------------------------
   1. SHOW AND HIDE PAGE MESSAGES
---------------------------------------- */

function hideStatusMessages(page) {

    const messageTypes = [
        "loading",
        "error",
        "no-results"
    ];

    messageTypes.forEach(function (type) {

        const message = document.getElementById(
            `${page}-${type}`
        );

        if (message) {
            message.hidden = true;
        }

    });

}


/* ----------------------------------------
   2. DISPLAY A STATUS MESSAGE
---------------------------------------- */

function showStatusMessage(page, type) {

    // Hide any previously displayed messages.
    hideStatusMessages(page);

    // Find the requested message.
    const message = document.getElementById(
        `${page}-${type}`
    );

    // Display it if the element exists.
    if (message) {
        message.hidden = false;
    }

}


/* ----------------------------------------
   3. CLEAR STATUS MESSAGES
---------------------------------------- */

function clearStatusMessages(page) {

    hideStatusMessages(page);

}


/* ----------------------------------------
   4. SHARED WEBSITE FUNCTIONS
---------------------------------------- */

window.CosmicUI = {
    showStatusMessage,
    hideStatusMessages,
    clearStatusMessages
};

/* ----------------------------------------
   5. APOD DATE SEARCH FORM
---------------------------------------- */

/* 5. APOD DISPLAY AND DATE SEARCH */

const apodForm = document.getElementById("apod-search-form");

if (apodForm) {
    const apodDateInput = document.getElementById("apod-date");
    const apodImage = document.getElementById("apod-image");
    const apodVideoContainer = document.getElementById("apod-video-container");
    const apodTitle = document.getElementById("apod-title");
    const apodDateDisplay = document.getElementById("apod-date-display");
    const apodExplanation = document.getElementById("apod-explanation");
    const apodCredit = document.getElementById("apod-credit");

    // Set today's date as the latest selectable date.
    const today = new Date();

    const localToday = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");

    apodDateInput.max = localToday;

    // Display NASA's APOD information.
    async function displayAPOD(date = "") {
        CosmicUI.showStatusMessage("apod", "loading");

        apodImage.hidden = true;
        apodVideoContainer.hidden = true;
        apodVideoContainer.replaceChildren();

        try {
            const data = await getAPOD(date);

            if (!data || !data.title) {
                CosmicUI.showStatusMessage("apod", "no-results");
                return;
            }

            apodTitle.textContent = data.title;
            apodDateDisplay.textContent = data.date;

            // Convert NASA's HTML explanation into plain text.
            const parser = new DOMParser();
            const explanationDocument = parser.parseFromString(
                data.explanation || "",
                "text/html"
            );

            apodExplanation.textContent =
                explanationDocument.body.textContent.trim();

            // Display image or video depending on NASA's result.
            if (data.media_type === "image") {
                apodImage.src = data.hdurl || data.url;
                apodImage.alt = data.alt || data.title;
                apodImage.hidden = false;
            } else if (
                data.media_type === "video" &&
                data.url &&
                new URL(data.url).protocol === "https:"
            ) {
                const video = document.createElement("iframe");

                video.src = data.url;
                video.title = data.title;
                video.loading = "lazy";
                video.allowFullscreen = true;

                apodVideoContainer.appendChild(video);
                apodVideoContainer.hidden = false;
            }

            // Display image credit as plain text.
            const creditDocument = parser.parseFromString(
                data.credit || data.copyright || "NASA",
                "text/html"
            );

            apodCredit.textContent =
                "Image credit: " +
                creditDocument.body.textContent.trim();

            CosmicUI.clearStatusMessages("apod");

        } catch (error) {
            console.error("APOD loading error:", error);
            CosmicUI.showStatusMessage("apod", "error");
        }
    }

    // Load today's APOD when the page opens.
    displayAPOD();

    // Handle searches for a selected date.
    apodForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const selectedDate = apodDateInput.value;

        if (!selectedDate) {
            apodDateInput.reportValidity();
            return;
        }

        if (selectedDate > localToday) {
            CosmicUI.showStatusMessage("apod", "error");
            return;
        }

        displayAPOD(selectedDate);
    });
}


// =================================
// NASA APOD IMAGE GALLERY
// =================================

const gallery = document.getElementById("apod-gallery");

if (gallery) {

    const details = document.getElementById("apod-details");

    const detailImage = document.getElementById("gallery-detail-image");
    const detailTitle = document.getElementById("gallery-detail-title");
    const detailDate = document.getElementById("gallery-detail-date");
    const detailExplanation = document.getElementById("gallery-detail-explanation");
    const detailCredit = document.getElementById("gallery-detail-credit");

    const closeButton = document.getElementById("apod-close");

    async function loadAPODGallery() {

        gallery.innerHTML = "<p>Loading amazing space images...</p>";

        try {

            // Use your existing NASA API function.
            // Request the latest 8 days.
            const today = new Date();
            const startDate = new Date(today);

            startDate.setDate(today.getDate() - 7);

            const formatDate = date =>
                [
                    date.getFullYear(),
                    String(date.getMonth() + 1).padStart(2, "0"),
                    String(date.getDate()).padStart(2, "0")
                ].join("-");

            const data = await getAPOD({
                start_date: formatDate(startDate),
                end_date: formatDate(today)
            });

            gallery.innerHTML = "";

            // Sort newest first.
            data.sort((a, b) =>
                b.date.localeCompare(a.date)
            );

            data.forEach(item => {

                // Only display image results.
                if (item.media_type !== "image") {
                    return;
                }

                const card = document.createElement("article");
                card.className = "apod-card";
                card.tabIndex = 0;
                card.setAttribute("role", "button");
                card.setAttribute(
                    "aria-label",
                    `View ${item.title}`
                );

                const image = document.createElement("img");
                image.src = item.url;
                image.alt = item.title;
                image.loading = "lazy";

                const info = document.createElement("div");
                info.className = "apod-card-info";

                const title = document.createElement("h3");
                title.textContent = item.title;

                const date = document.createElement("p");
                date.textContent = item.date;

                info.append(title, date);
                card.append(image, info);

                function showDetails() {

                    detailImage.src = item.hdurl || item.url;
                    detailImage.alt = item.title;

                    detailTitle.textContent = item.title;
                    detailDate.textContent = item.date;
                    detailExplanation.textContent = item.explanation;

                    detailCredit.textContent =
                        "Image credit: " +
                        (item.copyright || "NASA");

                    details.hidden = false;

                    details.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

                card.addEventListener("click", showDetails);

                card.addEventListener("keydown", event => {
                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {
                        event.preventDefault();
                        showDetails();
                    }
                });

                gallery.appendChild(card);

            });

            if (!gallery.children.length) {
                gallery.textContent =
                    "No astronomy images were available for these dates.";
            }

        } catch (error) {

            console.error("Gallery loading error:", error);

            gallery.textContent =
                "Unable to load NASA images. Please try again later.";

        }
    }

    closeButton.addEventListener("click", () => {
        details.hidden = true;
    });

    loadAPODGallery();

}


/* 6. MARS ROVER SEARCH FORM */

/* ========================================
   3. MARS ROVER PHOTO SEARCH
======================================== */

const marsForm = document.getElementById("mars-search-form");

if (marsForm) {
    const roverSelect = document.getElementById("rover-selection");
    const marsDateInput = document.getElementById("mars-date");
    const marsGallery = document.getElementById("mars-photo-grid");
    const marsSearchButton = document.getElementById("mars-search-button");

    // Prevent visitors from selecting a future date.
    const today = new Date();
    const localToday = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");

    marsDateInput.max = localToday;

    // Listen for Mars search submissions.
    marsForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const selectedRover = roverSelect.value;
        const selectedDate = marsDateInput.value;

        // Clear previous messages and photos.
        clearStatusMessages("mars");
        marsGallery.replaceChildren();

        if (!selectedDate) {
            showStatusMessage("mars", "error");
            return;
        }

        // Show loading message.
        showStatusMessage("mars", "loading");
        marsSearchButton.disabled = true;

        try {
            // Request photos from NASA.
            const results = await getMarsPhotos(
                selectedRover,
                selectedDate
            );

            // Keep only photos from the exact selected date.
            const matchingPhotos = results.filter(function (item) {
                const photo = item.data?.[0];

                return photo &&
                    photo.date_created?.slice(0, 10) === selectedDate;
            });

            // Display newest photos first.
            matchingPhotos.sort(function (a, b) {
                return new Date(b.data[0].date_created) -
                    new Date(a.data[0].date_created);
            });

            // Show a message if no matching photos were found.
            if (matchingPhotos.length === 0) {
                showStatusMessage("mars", "no-results");
                return;
            }

            // Create a gallery card for each photograph.
            matchingPhotos.forEach(function (item) {
                const photo = item.data[0];

                const imageLink =
                    item.links?.find(link => link.rel === "preview") ||
                    item.links?.find(link =>
                        link.render === "image" || link.rel === "alternate"
                    ) ||
                    item.links?.find(link => link.rel === "canonical");

                if (!imageLink) {
                    return;
                }

                // Create the photo card.
                const card = document.createElement("article");
                card.className = "mars-photo-card";

                // Create the photograph.
                const image = document.createElement("img");
                image.className = "mars-photo-image";
                image.src = imageLink.href;
                image.alt = photo.title || "NASA Mars rover photograph";
                image.loading = "lazy";

                // Create the information section.
                const information = document.createElement("div");
                information.className = "mars-photo-information";

                const title = document.createElement("h3");
                title.className = "mars-camera-name";
                title.textContent = photo.title || "Mars Rover Photograph";

                const photoDate = document.createElement("p");
                photoDate.className = "mars-photo-date";
                photoDate.textContent =
                    "Date: " +
                    new Date(photo.date_created).toLocaleDateString();

                const roverName = document.createElement("p");
                roverName.className = "mars-rover-name";
                roverName.textContent = "Rover: " + selectedRover;

                // Add everything to the card.
                information.append(title, photoDate, roverName);
                card.append(image, information);

                // Add the card to the gallery.
                marsGallery.appendChild(card);
            });

            // Handle results that did not contain usable image links.
            if (marsGallery.children.length === 0) {
                showStatusMessage("mars", "no-results");
            }

        } catch (error) {
            console.error("Mars photo search failed:", error);
            showStatusMessage("mars", "error");

        } finally {
            marsSearchButton.disabled = false;
        }
    });
}

/* 7. EARTH OBSERVATION SEARCH FORM */
const earthForm = document.getElementById("earth-search-form");

if (earthForm) {
    const latitudeInput = document.getElementById("latitude");
    const longitudeInput = document.getElementById("longitude");
    const earthDateInput = document.getElementById("earth-date");

    // Set today's date as the latest selectable date.
    const today = new Date();
    const localToday = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");

    earthDateInput.max = localToday;

    earthForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const latitude = Number(latitudeInput.value);
        const longitude = Number(longitudeInput.value);
        const selectedDate = earthDateInput.value;

        if (!earthForm.reportValidity()) {
            return;
        }

        if (
            latitude < -90 ||
            latitude > 90 ||
            longitude < -180 ||
            longitude > 180 ||
            selectedDate > localToday
        ) {
            CosmicUI.showStatusMessage("earth", "error");
            return;
        }

        CosmicUI.clearStatusMessages("earth");

        console.log("Earth latitude:", latitude);
        console.log("Earth longitude:", longitude);
        console.log("Earth date:", selectedDate);

        // NASA API connection will be added later.
    });
}

