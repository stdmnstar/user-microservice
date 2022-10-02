import { SQS } from 'aws-sdk';

const sqs = new SQS();

export class SqsService {
  async sendMessages(queueUrl: string, messages: string[] | number[]): Promise<void> {
    messages.forEach(async (message) => {
      try {
        await sqs
          .sendMessage({
            QueueUrl: queueUrl,
            MessageBody: message.toString(),
            MessageAttributes: {
              AttributeNameHere: {
                StringValue: 'Attribute Value Here',
                DataType: 'String',
              },
            },
          })
          .promise();
      } catch (error) {
        throw new Error(error as string);
      }
    });
  }

  getUrl(queueName: string, invokedFunctionArn: string): string {
    const region = invokedFunctionArn.split(':')[3];
    const accountId = invokedFunctionArn.split(':')[4];
    return `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`;
  }
}
