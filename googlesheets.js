// 1. Handle OAuth callback and fetch the access token when the page loads
window.onload = function() {
  // Check if Firebase user ID exists in localStorage before OAuth flow
  const loggedInUserId = localStorage.getItem('loggedInUserId');
  if (!loggedInUserId) {
    console.error('No logged in user found!');
    return;
  }

  // Handle Google OAuth flow
  const authCode = getAuthCodeFromUrl();
  if (authCode) {
    // Exchange the authorization code for an access token
    getAccessToken(authCode);
  }
};


// 2. Get authorization code from URL (part of the OAuth flow)
function getAuthCodeFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('code');
}

// 3. Exchange the authorization code for an access token
async function getAccessToken(authCode) {
  const clientId = '456280299055-skrfapun7iq2tce6nc2fjn7qvo605s9p.apps.googleusercontent.com';  // Replace with actual Google Client ID
  const clientSecret = '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';  // Replace with actual Google Client Secret
  const redirectUri = 'https://thaoannguyen145.github.io/sophiahere/homepage.html';  // Updated redirect URI
  const tokenUrl = 'https://oauth2.googleapis.com/token';

  const bodyData = {
    code: authCode,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  };

  try {
    // Make the POST request to get the access token
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(bodyData),
    });

    // Parse the JSON response
    const data = await response.json();  // Ensure the response is parsed into JSON

    if (data.error) {
      console.error('Error:', data.error_description);
    } else {
      console.log('Access Token:', data.access_token);

      // Store the access token in localStorage for later use
      //localStorage.setItem('google_access_token', data.access_token);

      // Display the Google Sheet input field
      document.getElementById('sheetInputSection').style.display = 'block';  // Show Google Sheet input field
    }
  } catch (error) {
    console.error('Error fetching the access token:', error);
  }
}

// 4. Show the input field when the 'Upload Google Sheet' button is clicked
document.getElementById('showInputBtn').addEventListener('click', function() {
    document.getElementById('sheetInputSection').style.display = 'block';
});

// 5. Trigger the Google Sheet fetch process when the user clicks the 'Fetch Google Sheet' button
document.getElementById('fetchSheetBtn').addEventListener('click', function() {
  const accessToken = localStorage.getItem('google_access_token');  // Get the access token from Firebase login
  if (accessToken) {
    fetchGoogleSheetData(accessToken);  // Call the function to fetch data
  } else {
    console.error('No access token found. Please sign in.');
  }
});

// 6. Fetch the Google Sheet data (after user submits the URL)
function fetchGoogleSheetData(accessToken) {
  const googleSheetUrl = document.getElementById('sheetLink').value;
  const spreadsheetId = getSpreadsheetId(googleSheetUrl);  // Extract the spreadsheet ID from the URL

  if (!spreadsheetId) {
    console.error('Invalid Google Sheets URL');
    return;
  }

  // Google Sheets API URL to fetch columns F and J
  const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/F:J?access_token=${accessToken}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (!data || !data.values || data.values.length === 0) {
        console.error('No data found in the specified columns.');
        return;
      }

      // If the data is successfully fetched, now retrieve the sheet's metadata (name)
      const metadataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?access_token=${accessToken}`;

      return fetch(metadataUrl);
    })
    .then(response => response.json())
    .then(metadata => {
      const fileName = metadata.properties.title;  // Get the file (spreadsheet) name
      console.log('Google Sheet Name:', fileName);

      // Display the file name as a clickable link
      const fileLink = document.createElement('a');
      fileLink.href = "#";
      fileLink.innerText = fileName;
      fileLink.addEventListener('click', function() {
        // You can trigger any action, like navigating to a quiz page
        alert(`You clicked on: ${fileName}`);
      });

      // Clear previous content and display the file name
      document.getElementById('sheetData').innerHTML = '';  // Clear previous content
      document.getElementById('sheetData').appendChild(fileLink);  // Display the file name as a link
    })
    .catch(error => console.error('Error fetching Google Sheets data:', error));
}

// 7. Function to extract the spreadsheet ID from the Google Sheet URL
function getSpreadsheetId(googleSheetUrl) {
  const regex = /spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
  const match = googleSheetUrl.match(regex);
  return match ? match[1] : null;
}
