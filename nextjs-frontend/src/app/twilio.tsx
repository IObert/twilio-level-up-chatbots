"use server";

import AccessToken, { SyncGrant } from "twilio/lib/jwt/AccessToken";

const {
  TWILIO_API_KEY = "",
  TWILIO_API_SECRET = "",
  TWILIO_ACCOUNT_SID = "",
  SYNC_SERVICE_SID = "",
} = process.env;

export async function fetchToken() {
  const syncGrant = new SyncGrant({
    serviceSid: SYNC_SERVICE_SID,
  });

  const token = new AccessToken(
    TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY,
    TWILIO_API_SECRET,
    {
      identity: "user",
    }
  );

  token.addGrant(syncGrant);

  return token.toJwt();
}
