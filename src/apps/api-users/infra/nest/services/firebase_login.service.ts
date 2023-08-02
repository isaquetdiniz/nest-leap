import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseConnectorService } from '@/libs/firebase/nest/service';
import { FirebaseException } from '@/libs/firebase/exceptions';
import { Injectable } from '@nestjs/common';

type Params = {
  email: string;
  password: string;
};

type Result = {
  accessToken: string;
  refreshToken: string;
};

export interface IFirebaseLogin {
  login(loginParams: Params): Promise<Result>;
}

@Injectable()
export class FirebaseLogin implements IFirebaseLogin {
  constructor(private readonly firebaseInstance: FirebaseConnectorService) {}

  async login(loginParams: Params): Promise<Result> {
    try {
      const { email, password } = loginParams;

      const connectApp = await this.firebaseInstance.connectApp();

      const firebaseAuth = getAuth(connectApp);
      const firebaseUser = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );

      const accessToken = await firebaseUser.user.getIdToken();
      const refreshToken = firebaseUser.user.refreshToken;

      return { accessToken, refreshToken };
    } catch (error) {
      throw new FirebaseException(error);
    }
  }
}
