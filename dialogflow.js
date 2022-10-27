const dialogflow = require("@google-cloud/dialogflow-cx");
const {SessionsClient} = require('@google-cloud/dialogflow-cx');
const config = require("./config");

const credentials = {
  client_email: config.GOOGLE_CLIENT_EMAIL,
  private_key: config.GOOGLE_PRIVATE_KEY,
  query: 'Hello',
  languageCode: config.DF_LANGUAGE_CODE,
};

/*const sessionClient = new dialogflow.SessionsClient({
  projectId: config.GOOGLE_PROJECT_ID,
  credentials,
});*/
const location = config.GOOGLE_Location
const sessionClient = new SessionsClient({
  apiEndpoint: 'us-east1-dialogflow.googleapis.com',
  credentials,
  query: 'Hello',
  languageCode: config.DF_LANGUAGE_CODE,
})

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function sendToDialogFlow(msg, session, params) {
  let textToDialogFlow = msg;
  try {
    const sessionPath = sessionClient.projectLocationAgentSessionPath(
      config.GOOGLE_PROJECT_ID,
      config.GOOGLE_Location,
      config.GOOGLE_AGENT_ID,
      session
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: textToDialogFlow,
          languageCode: config.DF_LANGUAGE_CODE,
        },
      },
      queryParams: {
        payload: {
          data: params,
        },
      },
    };
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    console.log("INTENT EMPAREJADO: ", result.intent.displayName);
    let defaultResponses = [];
    if (result.action !== "input.unknown") {
      result.fulfillmentMessages.forEach((element) => {
        defaultResponses.push(element);
      });
    }
    if (defaultResponses.length === 0) {
      result.fulfillmentMessages.forEach((element) => {
        if (element.platform === "PLATFORM_UNSPECIFIED") {
          defaultResponses.push(element);
        }
      });
    }
    result.fulfillmentMessages = defaultResponses;
    console.log(JSON.stringify(result, null, " "));
    return result;
    // console.log("se enviara el resultado: ", result);
  } catch (e) {
    console.log("error");
    console.log(e);
  }
}

module.exports = {
  sendToDialogFlow,
};

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
 /*const {SessionsClient} = require('@google-cloud/dialogflow-cx');
 const dialogflow = require("@google-cloud/dialogflow-cx");
 
 const config = require("./config");
 const projectId = config.GOOGLE_PROJECT_ID;
 const location = config.GOOGLE_Location;
 const agentId = config.GOOGLE_AGENT_ID;
 const query = 'Hello';
 const languageCode = config.DF_LANGUAGE_CODE

// Imports the Google Cloud Some API library


//const client = new SessionsClient({apiEndpoint: 'us-east1-dialogflow.googleapis.com'})

/*async function detectIntentText() {
  const sessionId = Math.random().toString(36).substring(7);
  const sessionPath = client.projectLocationAgentSessionPath(
    projectId,
    location,
    agentId,
    sessionId
  );
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
      },
      languageCode,
    },
  };
  const [response] = await client.detectIntent(request);
  for (const message of response.queryResult.responseMessages) {
    if (message.text) {
      console.log(`Agent Response: ${message.text.text}`);
    }
  }
  if (response.queryResult.match.intent) {
    console.log(
      `Matched Intent: ${response.queryResult.match.intent.displayName}`
    );
  }
  console.log(
    `Current Page: ${response.queryResult.currentPage.displayName}`
  );
}

detectIntentText()*/
