const { consumeMessages } = require('../services/queue.service');
const CommunicationLog = require('../models/CommunicationLog');
const connectDB = require('../config/db.config');

const BATCH_SIZE = 2;
const BATCH_INTERVAL = 5000;

let messageQueue = [];
let isProcessing = false;

const processBatch = async (messages) => {
  console.log(`[x] Processing batch of ${messages.length} messages`);
  for (const message of messages) {
    await handleMessage(message);
  }
  console.log(`[x] Batch processing complete`);
};

const handleMessage = async (message) => {
  try {
    console.log(`[x] Received message: ${JSON.stringify(message)}`);
    if (message.type === 'UPDATE_COMMUNICATION_LOG') {
      const { id, status } = message.payload;
      console.log(`[x] Updating CommunicationLog with id: ${id}, status: ${status}`);
      await CommunicationLog.findByIdAndUpdate(id, { status });
      console.log(`[x] Successfully updated CommunicationLog with id: ${id}`);
    } else {
      console.log(`[x] Unhandled message type: ${message.type}`);
    }
  } catch (err) {
    console.error(`[x] Error handling message: ${err}`);
  }
};

const startBatchProcessor = () => {
  setInterval(async () => {
    if (messageQueue.length > 0 && !isProcessing) {
      isProcessing = true;
      console.log(`[x] Batch interval reached. Processing messages in queue. Queue length: ${messageQueue.length}`);
      const messagesToProcess = messageQueue.splice(0, BATCH_SIZE);
      await processBatch(messagesToProcess);
      isProcessing = false;
    } else if (messageQueue.length === 0) {
      console.log(`[x] Batch interval reached. No messages to process.`);
    }
  }, BATCH_INTERVAL);
};

const startConsumer = async () => {
  try {
    console.log('[x] Connecting to database...');
    await connectDB();
    console.log('[x] Connected to database');
    console.log('[x] Starting to consume messages...');
    consumeMessages((message) => {
      console.log(`[x] Message received: ${JSON.stringify(message)}`);
      messageQueue.push(message);
      console.log(`[x] Message queued. Current queue length: ${messageQueue.length}`);
    });
    startBatchProcessor();
  } catch (err) {
    console.error(`[x] Error starting consumer: ${err}`);
  }
};

startConsumer();
