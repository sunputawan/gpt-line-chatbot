import { messagingApi, middleware } from '@line/bot-sdk'
import dotenv from 'dotenv'
dotenv.config();

const lineConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.SECRET_TOKEN,
}

export const client = new messagingApi.MessagingApiClient({
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

export const middlewareComponent = middleware(lineConfig);