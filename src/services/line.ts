import { Client } from '@line/bot-sdk'

export const sendMessageToGroup = async (groupId: string, text: string) => {
    const client = new Client({
        channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!,
        channelSecret: process.env.LINE_CHANNEL_SECRET!,
    })

    try {
        await client.pushMessage(groupId, {
            type: 'text',
            text,
        })
    } catch (error) {
        console.error('Gửi tin thất bại:', error)
    }
}
