import * as firebaseAdmin from 'firebase-admin';
import { FirebaseException } from '@/libs/firebase/exceptions';
import { Injectable } from '@nestjs/common';

type Params = string;

type Result = {
  firebaseId: string;
  email?: string;
  name?: string;
} | null;

export interface IGetAuthUserByToken {
  get(token: Params): Promise<Result>;
}

@Injectable()
export class FirebaseGetAuthUserByToken implements IGetAuthUserByToken {
  async get(token: Params): Promise<Result> {
    try {
      const subjectUserFirebase = await firebaseAdmin
        .auth()
        .verifyIdToken(token);

      const { email, uid } = subjectUserFirebase;

      const userFirebase = await firebaseAdmin.auth().getUser(uid);

      return {
        email,
        firebaseId: uid,
        name: userFirebase.displayName ?? email,
      };
    } catch (error) {
      throw new FirebaseException(error);
    }
  }
}
