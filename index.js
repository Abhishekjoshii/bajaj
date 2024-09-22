const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json()); // Parse incoming requests with JSON payloads

// GET method for /bfhl
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST method for /bfhl
app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;

  if (!data) {
    return res.status(400).json({ is_success: false, message: 'Data is required' });
  }

  let numbers = [];
  let alphabets = [];
  let highestLowercaseAlphabet = [];

  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (typeof item === 'string') {
      alphabets.push(item);
      if (item === item.toLowerCase() && (highestLowercaseAlphabet.length === 0 || item > highestLowercaseAlphabet[0])) {
        highestLowercaseAlphabet[0] = item;
      }
    }
  });

  const fileValid = file_b64 ? true : false;
  const user_id = "Abhishek_Joshi_22092024";

  // Dummy file MIME type and size logic for now
  let file_mime_type = "image/png";
  let file_size_kb = 400;

  res.json({
    is_success: true,
    user_id: user_id,
    email: "am1514@srmist.edu.in",
    roll_number: "RA2111003010428",
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
    file_valid: fileValid,
    file_mime_type: file_mime_type,
    file_size_kb: file_size_kb,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
