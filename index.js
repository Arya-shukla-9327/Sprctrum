const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();
const APP_ID = '75a1ed3d7aef48bb8c9f3b66cc00bdad';
const APP_CERTIFICATE = '6765dac1da314d19928c0c5e4d457f40';

app.get('/rtcToken', (req, res) => {
    const channelName = req.query.channelName;
    const uid = req.query.uid || 0;
    const role = RtcRole.PUBLISHER; // Broadcaster role
    const expirationTimeInSeconds = 3600 * 24; // 24 hours
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpiredTs);
    return res.json({ 'rtcToken': token });
});

app.listen(3000, () => console.log('Token Server is running on port 3000'));
