import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { FirebaseException } from '@/libs/firebase/exceptions';

type Params = {
  firebaseId: string;
};

@Injectable()
export class FirebaseDeleteAuthUserService {
  async delete(props: Params): Promise<void> {
    try {
      const { firebaseId } = props;

      const firebaseAuth = firebaseAdmin.auth();

      const userFirebase = await firebaseAuth.getUser(firebaseId);

      const { uid } = userFirebase;

      await firebaseAuth.deleteUser(uid);
    } catch (error) {
      throw new FirebaseException(error);
    }
  }
}
