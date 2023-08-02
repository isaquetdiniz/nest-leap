import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';

export type Params = {
  userId?: string;
  userDeviceToken: string;
  notification: {
    title: string;
    body: string;
  };
};

export type Result = {
  result: 'success' | 'failure';
};

@Injectable()
export class FirebasePushNotificationService {
  async send(props: Params): Promise<Result> {
    try {
      const { notification, userDeviceToken, userId } = props;

      await firebaseAdmin.messaging().send({
        token: userDeviceToken,
        notification: {
          title: notification.title,
          body: notification.body,
        },
        data: {
          ...(userId && { userId }),
        },
      });

      return { result: 'success' };
    } catch (error) {
      return { result: 'failure' };
    }
  }
}
