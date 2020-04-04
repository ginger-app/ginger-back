// Core
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as dynamoose from 'dynamoose';

@Injectable()
export class DynamoDB {
  static async init(options?: string) {
    const dynamoDB = new AWS.DynamoDB();

    dynamoose.AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    dynamoose.setDDB(dynamoDB);
  }
}
