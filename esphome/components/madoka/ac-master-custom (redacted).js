let isHandlingClick = false;

// Function to get the parent's body margins
function getParentBodyMargins() {
    const computedStyle = window.getComputedStyle(document.body);
    return {
        parentBodyMarginLeft: parseInt(computedStyle.marginLeft, 10),
        parentBodyMarginRight: parseInt(computedStyle.marginRight, 10),
    };
}

// Event listener for the message from the child window
window.addEventListener("message", (event) => {
    // if (event.origin !== "http://ac-slave.local") {
    if (event.origin !== "http://XXXXXXXX") {
        return;
    }
    if (event.data && event.data.height) {
        const iframe = document.getElementById("child-frame");
        iframe.style.height = `${event.data.height + 25}px`;
    }
    if (event.data && event.data.action === 'click' && !isHandlingClick) {
        isHandlingClick = true;
        triggerSchemeClick();
        isHandlingClick = false;
    }
});

// Function to trigger click event on scheme element
function triggerSchemeClick() {
    const espApp = document.querySelector("body > esp-app");
    const shadowRoot = espApp.shadowRoot;
    const schemeElement = shadowRoot.querySelector("#scheme");
    if (schemeElement) {
        schemeElement.click();
    }
}

// Create and append the iframe inside a new div container
document.addEventListener('DOMContentLoaded', () => {
    console.log('Parent: DOM fully loaded and parsed.');

    const { parentBodyMarginLeft, parentBodyMarginRight } = getParentBodyMargins();

    const iframeContainer = document.createElement('div');
    iframeContainer.id = 'iframe';
    iframeContainer.style.marginLeft = `-${parentBodyMarginLeft}px`;
    iframeContainer.style.marginRight = `-${parentBodyMarginRight}px`;
    iframeContainer.style.width = `calc(100% + ${parentBodyMarginLeft + parentBodyMarginRight}px)`;

    const iframe = document.createElement('iframe');
    iframe.id = 'child-frame';
    // iframe.src = 'http://ac-slave.local';
    iframe.src = 'http://XXXXXXXX';
    iframe.sandbox = 'allow-scripts allow-same-origin';
    iframe.style.width = '100%';
    iframe.style.border = 'none';
    iframe.style.display = 'block';
    iframe.style.overflow = 'hidden';

    iframeContainer.appendChild(iframe);
    document.body.appendChild(iframeContainer);
    console.log('Parent: Iframe and container appended to body.');

    // Add event listener to the scheme element within the shadow root
    const espApp = document.querySelector("body > esp-app");
    const shadowRoot = espApp.shadowRoot;
    const schemeElement = shadowRoot.querySelector("#scheme");
    if (schemeElement) {
        schemeElement.addEventListener("click", () => {
            if (!isHandlingClick) {
                isHandlingClick = true;
                const iframe = document.getElementById("child-frame");
                // iframe.contentWindow.postMessage({ action: 'click' }, "http://ac-slave.local");
                iframe.contentWindow.postMessage({ action: 'click' }, "http://XXXXXXXX");
                isHandlingClick = false;
            }
        });
    }

    // Wait for the custom element to be fully initialized
    customElements.whenDefined('esp-app').then(() => {
        console.log('esp-app custom element is defined.');

        // Find the custom esp-app element
        var espAppDiv = document.querySelector('esp-app');
        console.log('esp-app element:', espAppDiv);

        // Check if the esp-app element uses Shadow DOM
        var shadowRoot = espAppDiv.shadowRoot;
        console.log('Shadow root:', shadowRoot);

        // If shadowRoot exists, append the new divs to it
        if (shadowRoot) {
            console.log('Appending divs to shadowRoot.');

            // Replace the existing logo inside esp-logo shadowRoot
            var espLogo = shadowRoot.querySelector('esp-logo');
            console.log('esp-logo element:', espLogo);
            if (espLogo) {
                var logoShadowRoot = espLogo.shadowRoot;
                console.log('esp-logo shadow root:', logoShadowRoot);
                if (logoShadowRoot) {
                    var newLogo = document.createElement('img');
                    newLogo.src = 'data:image/png;base64,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';
                    newLogo.alt = 'Madoka';
                    // Remove any existing children in the logo shadow root
                    while (logoShadowRoot.firstChild) {
                        logoShadowRoot.removeChild(logoShadowRoot.firstChild);
                    }
                    // Append the new logo image
                    logoShadowRoot.appendChild(newLogo);
                    console.log('Inserted new logo image inside the esp-logo shadow root.');
                }
            }

            // Update the class of the main element within the shadow root
            const mainElement = shadowRoot.querySelector('main.flex-grid-half');
            if (mainElement) {
                mainElement.className = 'flex-grid-half expanded_entity';
            }
            
            // Change the href attribute of the logo element in the header
            const headerElement = shadowRoot.querySelector('header');
            const logoElement = headerElement.querySelector('#logo');
            // logoElement.href = "http://ac-master.local";
            logoElement.href = 'http://XXXXXXXX';
            console.log('Href updated successfully');
        }
    }).catch(err => {
        console.error('Error when defining esp-app:', err);
    });
});
