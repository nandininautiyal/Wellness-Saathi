const express = require('express');
const path = require('path');
const healthRoutes = require('./routes/HealthRoutes');
const drugRoutes = require('./routes/DrugRoutes');

const app = express();

const PORT = process.env.PORT || 3000;

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/remedies', healthRoutes);
app.use('/drugs', drugRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
