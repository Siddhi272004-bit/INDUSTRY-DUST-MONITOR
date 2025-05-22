import Highway from 'https://cdn.jsdelivr.net/npm/@dogstudio/highway/+esm';
import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap/+esm';

class Fade extends Highway.Transition {
    in({ from, to, done }) {
        // Add a class to hide the incoming page initially
        to.classList.add('incoming');

        // Hide the background image of the old page
        from.classList.add('hide-bg');

        // Create a vertical line in the middle of the screen
        const line = document.createElement('div');
        line.style.position = 'fixed';
        line.style.top = '50%';
        line.style.left = '0';
        line.style.width = '100%'; // Start with full width
        line.style.height = '2px'; // Start with a thin line
        line.style.backgroundColor = 'white';
        line.style.transformOrigin = 'center';
        line.style.zIndex = 2; // Ensure the line is above the new page
        document.body.appendChild(line);

        // Animate the line to expand vertically
        const t1 = gsap.timeline();
        t1.to(line, {
            height: '100vh', // Expand the line vertically
            top: '0%',
            duration: 1, // Adjust the duration as needed
            onComplete: () => {
                // Remove the line and the old page
                document.body.removeChild(line);
                from.remove(); // Remove the old page
                to.classList.remove('incoming'); // Show the incoming page
                done();
            },
        });
    }

    out({ from, done }) {
        // Fade out the current page
        gsap.to(from, { opacity: 0, duration: 0.5, onComplete: done });
    }
}

// Initialize Highway with the Fade transition
const H = new Highway.Core({
    transitions: {
        default: Fade
    }
});