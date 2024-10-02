function redirectToGoogleOAuth() {
  const clientId = '456280299055-skrfapun7iq2tce6nc2fjn7qvo605s9p.apps.googleusercontent.com';  // Ensure this matches your actual Google Client ID
  const redirectUri = 'https://thaoannguyen145.github.io/sophiahere/homepage.html';  // Use the correct homepage URL
  const scope = 'https://www.googleapis.com/auth/spreadsheets.readonly';
  
  const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline`;

  // Redirect to the Google OAuth page
  window.location.href = oauthUrl;
}

// Get authorization code from URL
function getAuthCodeFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('code');
}

// When the page loads, check if there’s an authorization code in the URL
window.onload = function() {
  const authCode = getAuthCodeFromUrl();
  if (authCode) {
    // Exchange the authorization code for an access token
    getAccessToken(authCode);
  }
}

// 3. Exchange the authorization code for an access token
async function getAccessToken(authCode) {
  const clientId = '456280299055-skrfapun7iq2tce6nc2fjn7qvo605s9p.apps.googleusercontent.com';  // Make sure this is correct
  const clientSecret = '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';  // Ensure this is correct and matches the regenerated client secret
  const redirectUri = 'https://thaoannguyen145.github.io/sophiahere/homepage.html';  // Updated redirect URI
  const tokenUrl = 'https://oauth2.googleapis.com/token';

  const bodyData = {
    code: authCode,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  };

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(bodyData),
  });

  const data = await response.json();
  
  if (data.error) {
    console.error('Error:', data.error_description);
  } else {
    console.log('Access Token:', data.access_token);
  }
}

  // Store the access token and display the Google Sheet input field
localStorage.setItem('google_access_token', data.access_token);
document.getElementById('sheetInputSection').style.display = 'block';  // Show Google Sheet input field

  // 4. Extract the spreadsheet ID from the Google Sheets URL
  function getSpreadsheetId(googleSheetUrl) {
    const regex = /spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
    const match = googleSheetUrl.match(regex);
    return match ? match[1] : null;
  }
  
  // 5. Fetch metadata of Google Sheets to get the file name
  function loadGoogleSheetData(accessToken) {
    const googleSheetUrl = document.getElementById('sheetLink').value;
    const spreadsheetId = getSpreadsheetId(googleSheetUrl);
  
    if (!spreadsheetId) {
      console.error('Invalid Google Sheets URL');
      return;
    }
  
    // Use the Google Sheets API to fetch metadata (spreadsheet name)
    const metadataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?access_token=${accessToken}`;
  
    fetch(metadataUrl)
      .then(response => response.json())
      .then(data => {
        const fileName = data.properties.title;  // Get the file (spreadsheet) name
        console.log('Google Sheet Name:', fileName);
  
        // Display the file name as a clickable link to start the quiz
        const fileLink = document.createElement('a');
        fileLink.href = "#";
        fileLink.innerText = fileName;
        fileLink.addEventListener('click', function() {
          startVocabQuiz(data.sheets);  // Trigger the vocab quiz when clicked
        });
  
        document.getElementById('sheetData').innerHTML = '';  // Clear previous content
        document.getElementById('sheetData').appendChild(fileLink);  // Display the clickable file name
      })
      .catch(error => console.error('Error fetching Google Sheets data:', error));
  }
  
  // 6. Function to start the vocab quiz using the data from the Google Sheet
  function startVocabQuiz(sheets) {
    // Assuming the vocab data is in the first sheet (modify as needed)
    const sheet = sheets[0];  // You can select other sheets based on the use case
  
    // TODO: Extract vocab data from the sheet and start the quiz
    console.log('Starting vocab quiz with data from sheet:', sheet.properties.title);
  
    // Implement quiz logic here using the data from the sheet
  }
  
  // 7. Handle OAuth callback and fetch the access token when the page loads
  window.onload = function() {
    const authCode = getAuthCodeFromUrl();
    if (authCode) {
      // Exchange the authorization code for an access token
      getAccessToken(authCode);
    }
  }
  
  // 8. Trigger OAuth flow when the user clicks the "Upload Google Sheet file" button
  document.getElementById('uploadSheetBtn').addEventListener('click', function() {
    redirectToGoogleOAuth();
  });
  
