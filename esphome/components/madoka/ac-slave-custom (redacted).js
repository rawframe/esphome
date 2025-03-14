let isHandlingClick = false;

// Function to get the height of the document body
function getBodyHeight() {
    return document.body.scrollHeight;
}

// Function to send the height to the parent window
function sendHeightToParent() {
    const height = getBodyHeight();
    // window.parent.postMessage({ height }, "http://ac-master.local");
    window.parent.postMessage({ height }, "http://XXXXXXXX");
}

// Notify the parent that the child content is fully loaded and send the height
window.addEventListener("load", () => {
    console.log('Child: Content fully loaded.');
    sendHeightToParent();
});

// Optionally, add a resize observer to update the parent window when the content changes
const resizeObserver = new ResizeObserver(() => {
    sendHeightToParent();
});

resizeObserver.observe(document.body);

// Event listener for the message from the parent window
window.addEventListener("message", (event) => {
    // if (event.origin !== "http://ac-master.local") {
    if (event.origin !== "http://XXXXXXXX") {
        return;
    }
    if (event.data && event.data.action === 'click' && !isHandlingClick) {
        isHandlingClick = true;
        triggerSchemeClick();
        isHandlingClick = false;
    }
});

// Function to trigger click event on scheme element within the shadow root
function triggerSchemeClick() {
    const espApp = document.querySelector("body > esp-app");
    const shadowRoot = espApp.shadowRoot;
    const schemeElement = shadowRoot.querySelector("#scheme");
    if (schemeElement) {
        schemeElement.click();
    }
}

// Add event listener to the scheme element within the shadow root
const espApp = document.querySelector("body > esp-app");
const shadowRoot = espApp.shadowRoot;
const schemeElement = shadowRoot.querySelector("#scheme");
if (schemeElement) {
    schemeElement.addEventListener("click", () => {
        if (!isHandlingClick) {
            isHandlingClick = true;
            // window.parent.postMessage({ action: 'click' }, "http://ac-master.local");
            window.parent.postMessage({ action: 'click' }, "http://XXXXXXXX");
            isHandlingClick = false;
        }
    });
}

// Original code integration
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed.');

    // Wait for the custom element to be fully initialized
    customElements.whenDefined('esp-app').then(() => {
        console.log('esp-app custom element is defined.');

        // Find the custom esp-app element
        var espAppDiv = document.querySelector('esp-app');
        console.log('esp-app element:', espAppDiv);

        // Check if the esp-app element uses Shadow DOM
        var shadowRoot = espAppDiv.shadowRoot;
        console.log('Shadow root:', shadowRoot);

        // Update the class of the main element within the shadow root
        const mainElement = shadowRoot.querySelector('main.flex-grid-half');
        if (mainElement) {
            mainElement.className = 'flex-grid-half expanded_entity';
        }

        // If shadowRoot exists, append the new divs to it
        if (shadowRoot) {
            console.log('Appending divs to shadowRoot.');

            // Create and append the Info div with class="tab-header" to the shadowRoot
            var infoDiv = document.createElement('div');
            infoDiv.className = 'tab-header';
            infoDiv.textContent = 'Info';
            shadowRoot.appendChild(infoDiv);
            console.log('Appended Info div with class="tab-header" to shadowRoot');

            // Create and append the new div with class="tab-container" to the shadowRoot
            var tabContainerDiv = document.createElement('div');
            tabContainerDiv.className = 'tab-container';
            tabContainerDiv.style.padding = '0.5em';
            shadowRoot.appendChild(tabContainerDiv);
            console.log('Appended div with class="tab-container" to shadowRoot');

            // Create and append the first sub-div with class="entity-row" and specified text to tab-container
            var entityRowDiv1 = document.createElement('div');
            entityRowDiv1.className = 'entity-row';
            entityRowDiv1.innerHTML = 'Web interface status changes may need time to propagate and display whilst being sent/received/confirmed.<br>It may be necessary to refresh the webpage to see the current status.';
            tabContainerDiv.appendChild(entityRowDiv1);
            console.log('Appended first sub-div with class="entity-row" to tab-container');

            // Create and append the title div with class="entity-row" and margin/padding for spacing
            var titleDiv = document.createElement('div');
            titleDiv.className = 'entity-row';
            titleDiv.textContent = 'Wi-fi Bridge LED Indicator:';
            titleDiv.style.marginTop = '0.5em';
            titleDiv.style.marginBottom = '0.5em';
            titleDiv.style.textDecoration = 'underline';
            tabContainerDiv.appendChild(titleDiv);
            console.log('Appended title div with class="entity-row" and spacing to tab-container');

            // Create and append the second sub-div with class="entity-row" to tab-container
            var entityRowDiv2 = document.createElement('div');
            entityRowDiv2.className = 'entity-row';

            // Create and append the pairs of divs inside entityRowDiv2 with colored text and margin
            var pairs = [
                { color: '#09a9f4', text: 'All Madoka Units are connected' },
                { color: 'Orange', text: 'One or more Madoka units are disconnected' },
                { color: 'Red', text: 'All units are disconnected' },
                { color: 'Green', text: 'Status update sent/received' },
                { color: 'Purple', text: 'Dismiss clean filter notification update sent' }
            ];

            pairs.forEach(pair => {
                var colorDiv = document.createElement('div');
                colorDiv.style.flexBasis = '25%';
                colorDiv.innerHTML = `<span style="color:${pair.color}">${pair.color === '#09a9f4' ? 'Blue' : pair.color} ${pair.color === 'Green' || pair.color === 'Purple' ? '[flash]' : '[solid]'}</span>`;

                var textDiv = document.createElement('div');
                textDiv.style.flexBasis = '75%';
                textDiv.style.marginLeft = '2em'; // Adding 2em margin to the left of the color text pairs
                textDiv.textContent = pair.text;

                var rowDiv = document.createElement('div');
                rowDiv.style.display = 'flex';
                rowDiv.appendChild(colorDiv);
                rowDiv.appendChild(textDiv);

                entityRowDiv2.appendChild(rowDiv);
            });

            tabContainerDiv.appendChild(entityRowDiv2);
            console.log('Appended second sub-div with class="entity-row" and pairs of divs to tab-container');

        } else {
            console.log('No shadowRoot found, appending divs to esp-app element.');

            // If shadowRoot doesn't exist, append the divs to the esp-app element directly
            var infoDiv = document.createElement('div');
            infoDiv.className = 'tab-header';
            infoDiv.textContent = 'Info';
            espAppDiv.appendChild(infoDiv);

            var tabContainerDiv = document.createElement('div');
            tabContainerDiv.className = 'tab-container';
            tabContainerDiv.style.padding = '0.5em';
            espAppDiv.appendChild(tabContainerDiv);

            var entityRowDiv1 = document.createElement('div');
            entityRowDiv1.className = 'entity-row';
            entityRowDiv1.innerHTML = 'Web interface status changes may need time to propagate and display whilst being sent/received/confirmed.<br>It may be necessary to refresh the webpage to see the current status.';
            tabContainerDiv.appendChild(entityRowDiv1);

            var titleDiv = document.createElement('div');
            titleDiv.className = 'entity-row';
            titleDiv.textContent = 'Wi-fi Bridge LED Indicator:';
            titleDiv.style.marginTop = '0.5em';
            titleDiv.style.marginBottom = '0.5em';
            titleDiv.style.textDecoration = 'underline';
            tabContainerDiv.appendChild(titleDiv);

            var entityRowDiv2 = document.createElement('div');
            entityRowDiv2.className = 'entity-row';

            var pairs = [
                { color: '#09a9f4', text: 'All Madoka Units are connected' },
                { color: 'Orange', text: 'One or more Madoka units are disconnected' },
                { color: 'Red', text: 'All units are disconnected' },
                { color: 'Green', text: 'Status update sent/received' },
                { color: 'Purple', text: 'Dismiss clean filter notification update sent' }
            ];

            pairs.forEach(pair => {
                var colorDiv = document.createElement('div');
                colorDiv.style.flexBasis = '25%';
                colorDiv.innerHTML = `<span style="color:${pair.color}">${pair.color === '#09a9f4' ? 'Blue' : pair.color} ${pair.color === 'Green' || pair.color === 'Purple' ? '[flash]' : '[solid]'}</span>`;

                var textDiv = document.createElement('div');
                textDiv.style.flexBasis = '75%';
                textDiv.style.marginLeft = '2em'; // Adding 2em margin to the left of the color text pairs
                textDiv.textContent = pair.text;

                var rowDiv = document.createElement('div');
                rowDiv.style.display = 'flex';
                rowDiv.appendChild(colorDiv);
                rowDiv.appendChild(textDiv);

                entityRowDiv2.appendChild(rowDiv);
            });

            tabContainerDiv.appendChild(entityRowDiv2);

            console.log('Appended divs to espAppDiv');
        }
    }).catch(err => {
        console.error('Error when defining esp-app:', err);
    });
});
