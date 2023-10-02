const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://adhudsond:WroQGBFl11ZC6ZnS@cluster0.8n1kphs.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use(express.json());

// Define routes
app.use('/api', require('./routes/api'));

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// API endpoint for data (you can replace this with your actual API)
app.get('/api/data', (req, res) => {
  // Mock data for demo purposes
  const data = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
  res.json(data);
});

// Serve the Home component for the home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'Home.html'));
});

// Serve the Login component for the login route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'Login.html'));
});

// Serve the Signup component for the signup route
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'Signup.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
