function initializeOscillatingField() {
    const fieldCanvas = document.getElementById('fieldCanvas');
    const graphCanvas = document.getElementById('graphCanvas');
    const fieldCtx = fieldCanvas.getContext('2d');
    const graphCtx = graphCanvas.getContext('2d');

    // Hardcoded parameters
    const G = 1;
    const H = 0;
    const A = 1;
    const omega = 2;
    const phi = 0;
    const sigma = 15;
    const t0 = 65;
    const normalizationTerm = 1; // Placeholder, adjust as needed
    const maxTime = 125;
    const timeStep = 0.05;

    const width = fieldCanvas.width;
    const height = fieldCanvas.height;
    const graphWidth = graphCanvas.width;
    const graphHeight = graphCanvas.height;

    let time = 0;
    const EValues = [];
    const timeValues = [];

    function gaussianPulse(t, t0, sigma, G, H) {
        const tDiff = t - t0;
        const gaussian = (G / normalizationTerm) * Math.exp(-Math.pow(tDiff, 2) / (2 * Math.pow(sigma, 2)));
        const heaviside = H * (tDiff > 0 ? 1 : 0);
        return gaussian + heaviside;
    }

    function oscillation(t, t0, A, omega, phi, C = 0) {
        return A * Math.sin(omega * (t - t0) - phi) + C;
    }

    function calculateElectricField(t) {
        const term1 = gaussianPulse(t, t0, sigma, G, H);
        const term2 = oscillation(t, t0, A, omega, phi);
        return term1 * term2;
    }

    function drawField(currentTime, currentE) {
        fieldCtx.clearRect(0, 0, width, height);
        fieldCtx.beginPath();
        fieldCtx.moveTo(0, height / 2);

        for (let x = 0; x < width; x++) {
            const t = (time + x / width) * maxTime / width;
            const E = calculateElectricField(t);
            const y = height / 2 - E * 10000; // Scale for visibility
            fieldCtx.lineTo(x, y);
        }

        fieldCtx.strokeStyle = 'blue';
        fieldCtx.lineWidth = 2;
        fieldCtx.stroke();

        // Add current time and field value
        fieldCtx.font = '16px Arial';
        fieldCtx.fillStyle = 'black';
        fieldCtx.fillText(`Time: ${currentTime.toFixed(2)} s`, 10, 20);
        fieldCtx.fillText(`Field Value: ${currentE.toFixed(3)}`, 10, 40);
    }

    function drawGraph() {
        graphCtx.clearRect(0, 0, graphWidth, graphHeight);

        graphCtx.beginPath();
        graphCtx.moveTo(0, graphHeight / 2);

        for (let i = 0; i < EValues.length; i++) {
            const x = (i / EValues.length) * graphWidth;
            const y = graphHeight / 2 - EValues[i] * 100; // Scale for visibility
            graphCtx.lineTo(x, y);
        }

        graphCtx.strokeStyle = 'red';
        graphCtx.lineWidth = 2;
        graphCtx.stroke();
    }

    function animate() {
        if (time >= maxTime) return;

        const E = calculateElectricField(time);
        EValues.push(E);
        timeValues.push(time);

        drawField(time, E);
        drawGraph();

        time += timeStep;
        requestAnimationFrame(animate);
    }

    function restartAnimation() {
        time = 0;
        EValues.length = 0;
        timeValues.length = 0;
        animate();
    }

    document.getElementById('restartButton').addEventListener('click', restartAnimation);

    restartAnimation();
}
initializeOscillatingField()
