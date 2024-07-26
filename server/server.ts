import Fastify from "fastify";
import FastifyBodyParser from "@fastify/formbody";
import twilio, { twiml } from "twilio";
import { maskPhone } from "maskdata";

const fastify = Fastify({});

const {
  TWILIO_API_KEY = "",
  TWILIO_API_SECRET = "",
  TWILIO_ACCOUNT_SID = "",
  SYNC_SERVICE_SID = "",
} = process.env;

const client = twilio(TWILIO_API_KEY, TWILIO_API_SECRET, {
  accountSid: TWILIO_ACCOUNT_SID,
});

const questions = [
  "Hello, I'm Credric. How can I assist you today? 🤖 You can ask me about Twilio or our API Usage.",
  "Sure, please select the API you would like to know more about: \n1. SMS API \n2. Voice API \n3. Verify API",
  "The SMS API allows you to send SMS messages. What would you like to know about the SMS API? \n1. How to send an SMS message \n2. How to receive an SMS message",
];

const state = {}; // option 1 in-app object

fastify
  .register(FastifyBodyParser)
  .register(require("@fastify/cookie"), {
    secret: "my-secret",
    hook: "onRequest",
    parseOptions: {},
  })
  .get("/", async () => {
    return { questions };
  })
  .all("/sms", async (request, reply) => {
    const syncService = await client.sync.v1.services(SYNC_SERVICE_SID).fetch();
    const stateDoc = syncService.documents()("state");
    let { data } = await stateDoc.fetch();

    // @ts-ignore
    const { From, Body } = request.body;
    const from = maskPhone(From.replace("whatsapp:", ""));
    console.log(`Incoming message from ${from}`);
    // let state = Number(request?.cookies.state); // option 2 set cookie for reply
    const twimlRes = new twiml.MessagingResponse();

    if (!data[from]) {
      //option 1 in-app object
      // state = 0;
      data[from] = 0;
    }
    data[from]++;
    // option 2 set cookie for reply
    // reply.setCookie("state", `${state + (1)}`);

    twimlRes.message(questions[data[from] % 3]);
    reply.header("Content-Type", "text/xml");
    reply.send(twimlRes.toString());

    // state[From] = state[From] + (1); //option 1
    stateDoc.update({ data: { ...data } }); // option 3 twilio sync
  });

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
