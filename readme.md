# Twilio Level Up Webinar Sample Code

Welcome! This repository contains the sample code from the Twilio Level Up webinar held on July 31, 2024. The project is designed to demonstrate how to integrate Twilio with a web application to store and display real-time data.

## Project Structure

This repository consists of two sub-projects:

1. **Server**: A webhook server that is invoked by Twilio to store data in the Sync document. This server handles the backend operations and ensures that data received from Twilio is properly stored and managed.
2. **Next.js Frontend**: A Next.js application that shows live updates of the Sync data on a website. This frontend provides a user-friendly interface to visualize the real-time data being stored in Twilio Sync.

## Prerequisites

Before you start, make sure you have the following:

1. **Twilio Account**: Sign up for a free Twilio account [here](https://www.twilio.com/try-twilio).
2. **Node.js**: Ensure Node.js is installed on your machine. You can download it from [here](https://nodejs.org/).

## Setup

Follow these steps to set up the project:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/IObert/twilio-level-up-chatbots
   cd twilio-level-up-chatbots/server # or twilio-level-up-chatbots/nextjs-frontend
   ```

2. **Install the project's dependencies**:
   We're using `pnpm` as the package manager. If you don't have `pnpm` installed, you can install it using:
   ```bash
   npm install -g pnpm
   ```
   Then, install the project dependencies:
   ```bash
   pnpm install
   ```

3. **Set up environment variables**:
   You will need to create a `.env` file, in both of the projet folders, to store your Twilio credentials and other important settings. Use the `.env.example` file as a template. Create a new file called `.env` and add the following:

   ```plaintext
   TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxx"
   TWILIO_API_KEY="SKxxxxxxxxxxxx"
   TWILIO_API_SECRET="xxxxxxxxxxxxxxxxxxxx"
   TWILIO_AUTH_TOKEN="xxxxxxxxxxxxxxxxxxxx"
   SYNC_SERVICE_SID="ISxxxxxxxxxxxx"
   ```

   - Replace `ACxxxxxxxxxxxx` with your Twilio Account SID.
   - Replace `SKxxxxxxxxxxxx` with your Twilio API Key.
   - Replace `xxxxxxxxxxxxxxxxxxxx` with your Twilio API Secret.
   - Replace `xxxxxxxxxxxxxxxxxxxx` with your Twilio Auth Token.
   - Replace `ISxxxxxxxxxxxx` with your Twilio Sync Service SID.

   If you don't have these values, you can obtain them from your [Twilio Console](https://www.twilio.com/console).

4. **Create a Sync Service**:
   You need a Sync Service SID to run this project. Follow these steps    to create one:

   - Log in to your Twilio Console and navigate to the [Sync section](https://www.twilio.com/console)
   - Click on "Create Service".
   - Give your Sync service a name and click "Create".
   - Copy the `Service SID` that starts with `IS` and update the `SYNC_SERVICE_SID` in your `.env` file with this value.

5. **Add a Sync Document** Within the Sync service, you should create a new "Document Object" named `state` and initialize it with an empty object `{}`. This is important for the application to manage its state correctly. Here’s how you can do it:
   
   - In the Sync service dashboard, go to the "Documents" section.
   - Click on "Create Document".
   - Name the document `state`.
   - Initialize it with `{}` (an empty object) and click "Create".


5. **Run the development server**:
   Now we are ready to run the development server. Execute the following command:
   ```bash
   cd server
   pnpm dev
   ```

6. **View the application**:
   Open your web browser and go to [http://localhost:3000](http://localhost:3000). You should see the application running successfully.



## Additional Resources

Certainly! Making the "Additional Resources" section more organized and descriptive will help users navigate through the resources and understand the context. Here’s a nicer and more helpful version:

---

## Additional Resources

To help you better understand the concepts and tools used in this project, here are some valuable resources:

### General Concepts
- **Chatbots**
  - [What is a Chatbot?](https://www.twilio.com/docs/glossary/what-is-chatbot): An introduction to chatbots and their functionalities.
- **Finite-state Machines**
  - [Finite-state Machine on Wikipedia](https://en.wikipedia.org/wiki/Finite-state_machine): Detailed information on finite-state machines and their applications.

### Twilio-Specific Resources
- **State Management with Cookies**
  - [Store Application State in a Cookie](https://www.twilio.com/docs/serverless/functions-assets/quickstart/cookies-state#store-application-state-in-a-cookie): Guide on how to store application state in a cookie using Twilio.
  - [How do Twilio Cookies Work?](https://help.twilio.com/articles/223136287-How-do-Twilio-cookies-work): Detailed information on the workings of Twilio cookies.
- **Twilio Sync**
  - [TwilioSync Documentation](https://www.twilio.com/docs/sync): Comprehensive documentation for Twilio Sync, including setup and usage.
  - [Objects Overview](https://www.twilio.com/docs/sync/objects-overview): Detailed overview of different objects in Twilio Sync and how they function.

- **Twilio Conversations**
  - [Twilio Conversations](https://www.twilio.com/docs/conversations): Documentation and guides on setting up and using Twilio Conversations for building messaging applications.

- **Twilio AI Assistants**
  - [Twilio AI Assistants (Alpha)](https://www.twilio.com/docs/alpha/ai-assistants): Learn more about Twilio’s AI Assistants and their capabilities (Note: This feature is in alpha).

By exploring these resources, you’ll gain a deeper understanding of the technologies and methodologies used in this project, which will help you in customizing and extending its functionality as needed.

---

Feel free to explore the links and deepen your knowledge on each topic. If you have any questions or run into issues, don’t hesitate to reach out for help!