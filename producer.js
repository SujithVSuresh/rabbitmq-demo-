const amqp = require('amqplib')

async function sendMessage() {
    const queue = 'task_queue'
    const message = 'Hello RabbitMQ!'

    try{
        //Establishing a connection to rabbitmq server
        const connection = await amqp.connect('amqp://localhost');

        //Creating a channel
        const channel = await connection.createChannel()

        //Declares a queue named task_queue if it doesn’t already exist.
        await channel.assertQueue(queue, {durable:true})
        
        // Sends the message to the task_queue.
        channel.sendToQueue(queue, Buffer.from(message), {persistent: true})
        console.log(`[x] Sent: ${message}`)

        //Close the connection
        setTimeout(() => {
            connection.close()
        }, 500)

    } catch (error){
        console.error('Error:', error)
    }
    
}

sendMessage()