const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Define the route for handling remedy requests
router.get('/', (req, res) => {
    // Get the selected issue from the URL query (e.g., ?symptom=stomach-ache)
    const issueId = req.query.symptom;

    // Define the path to your JSON data file
    const remediesPath = path.join(__dirname, '..', 'data', 'remedies.json');

    // Read the remedies data from the JSON file
    fs.readFile(remediesPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading remedies.json:", err);
            return res.status(500).send("An error occurred on the server.");
        }

        try {
            const remedies = JSON.parse(data);
            
            // --- THE FIX IS HERE ---
            // Instead of using .find() on an array, we directly access the
            // property of the object using the issueId as the key.
            const selectedRemedy = remedies[issueId];
            
            if (!selectedRemedy) {
                // If no remedy is found for the given ID, handle it gracefully
                return res.status(404).send("Remedy not found.");
            }

            // Render the 'remedies.ejs' page and pass the found remedy data to it
            res.render('remedies', { remedy: selectedRemedy });

        } catch (parseErr) {
            console.error("Error parsing remedies.json:", parseErr);
            return res.status(500).send("An error occurred on the server.");
        }
    });
});

module.exports = router;

