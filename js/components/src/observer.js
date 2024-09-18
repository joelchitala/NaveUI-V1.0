// Create an observer instance
export const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            mutation.removedNodes.forEach((node) => {
                console.log(node);
            });
        }
    }
});

