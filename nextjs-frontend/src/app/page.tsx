"use client";

import { useState, useEffect } from "react";
import { Client, SyncClient } from "twilio-sync";
import { fetchToken } from "./twilio";

export default function Home() {
  const [state, setState] = useState<any>({});

  useEffect(() => {
    let syncClient: SyncClient;
    fetchToken().then(async (token) => {
      syncClient = new Client(token);
      syncClient.on("tokenAboutToExpire", async () => {
        const token = await fetchToken();
        syncClient.updateToken(token);
      });
      syncClient.on("connectionError", (error: any) => {
        console.error(error);
      });
      syncClient.on("connectionStateChanged", async (state: string) => {
        if (state === "connected") {
          const doc = await syncClient.document("state");
          setState(doc.data);
          doc.on("updated", (event: any) => {
            if (event.data) setState(event.data);
          });
        }
      });
    });

    return () => {
      syncClient && syncClient.shutdown();
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold mt-32">Twilio Sync</h1>
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-4xl font-bold">State</h2>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </main>
  );
}
