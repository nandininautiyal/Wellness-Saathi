const express = require('express');
const router = express.Router();
const axios = require('axios');

// Define the route for handling drug searches
router.get('/', async (req, res) => {
    const drugName = req.query.drug_name;

    if (!drugName) {
        return res.status(400).send("Please provide a medicine name.");
    }

    // --- NEW, MORE ACCURATE API URL ---
    // This now searches the official 'drug/label' database in both brand and generic names.
    const apiUrl = `https://api.fda.gov/drug/label.json?search=(openfda.brand_name:"${drugName}"+OR+openfda.generic_name:"${drugName}")&limit=1`;

    try {
        const response = await axios.get(apiUrl);
        const drugData = response.data;

        res.render('drugs', { drugData: drugData, searchTerm: drugName });

    } catch (error) {
        console.error("Error fetching data from openFDA:", error);
        res.render('drugs', { drugData: null, searchTerm: drugName });
    }
});

module.exports = router;


