const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();

// --- AAPKE UPDATED CREDENTIALS ---
const APP_ID = '75a1ed3d7aef48bb8c9f3b66cc00bdad';
const APP_CERTIFICATE = '6765dac1da314d19928c0c5e4d457f40';

app.get('/rtcToken', (req, res) => {
    const channelName = req.query.channelName;
    if (!channelName) {
        return res.status(400).json({ 'error': 'channel name is required' });
    }

    // Humne Android app mein 100 aur 200 UIDs fix kiye hain
    const uid = req.query.uid || 0;
    const role = RtcRole.PUBLISHER; 
    
    // Token 24 ghante ke liye valid rahega
    const expirationTimeInSeconds = 3600 * 24; 
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // Token Generate karne ka logic
    const token = RtcTokenBuilder.buildTokenWithUid(
        APP_ID, 
        APP_CERTIFICATE, 
        channelName, 
        parseInt(uid), 
        role, 
        privilegeExpiredTs
    );

    console.log(`Token generated for Channel: ${channelName}, UID: ${uid}`);
    
    return res.json({ 'rtcToken': token });
});

// Root route taaki Render check kar sake ki server zinda hai
app.get('/', (req, res) => {
    res.send('Spectrum Token Server is Online!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
