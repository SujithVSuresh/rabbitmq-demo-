const amqp = require('amqplib')

async function receiveMessage() {
    const queue = 'task_queue';

    try{
        // connect to the rabbitmq server
        const connection = await amqp.connect('amqp://localhost')

        // Creates a channel for communication with RabbitMQ. Channels are lightweight and used for all interactions with RabbitMQ (sending/receiving messages).
        const channel = await connection.createChannel()

        //creating a task queue if it doesn't exist
        await channel.assertQueue(queue, {durable: true})

        console.log(`[*] Waiting for messages in ${queue}. To exit, press CTRL+C`);
        
        //callback function is called whenever a new message is arrived in the queue
        channel.consume(queue, (msg) => {
            if(msg != null){
                console.log(`[x] Received: ${msg.content.toString()}`)
                
                // Acknowledgement that is send back to the rabbitmq after processing the message
                channel.ack(msg)
            }
        })
    }catch(error){
        console.error('Error:', error)
    }
    
}

receiveMessage()