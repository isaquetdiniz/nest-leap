import * as firebaseAdmin from 'firebase-admin';
import { App } from 'firebase-admin/app';
import { initializeApp, FirebaseApp } from 'firebase/app';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FirebaseConfig } from '@/libs/firebase/config';
import { MissingEnvVarException } from '@/core/application';

@Injectable()
export class FirebaseService {
  projectId: string;
  privateKey: string;
  privateKeyId: string;
  clientEmail: string;
  type: string;
  clientId: string;
  authUri: string;
  tokenUri: string;
  authProviderCertUrl: string;
  clientCertUrl: string;
  apiKey: string;
  authDomain: string;
  storageBucket: string;
  appId: string;
  measurementId: string;

  constructor(private readonly configService: ConfigService) {
    const envValidationMap = [
      { property: 'projectId', envVariable: 'FIREBASE_PROJECT_ID' },
      {
        property: 'privateKey',
        envVariable: 'FIREBASE_PRIVATE_KEY',
        transformer: (privateKey) => privateKey.replace(/\\n/gi, '\n'),
      },
      { property: 'privateKeyId', envVariable: 'FIREBASE_PRIVATE_KEY_ID' },
      { property: 'clientEmail', envVariable: 'FIREBASE_CLIENT_EMAIL' },
      { property: 'type', envVariable: 'FIREBASE_TYPE' },
      { property: 'clientId', envVariable: 'FIREBASE_CLIENT_ID' },
      { property: 'authUri', envVariable: 'FIREBASE_AUTH_URI' },
      { property: 'tokenUri', envVariable: 'FIREBASE_TOKEN_URI' },
      {
        property: 'authProviderCertUrl',
        envVariable: 'FIREBASE_AUTH_PROVIDER',
      },
      { property: 'clientCertUrl', envVariable: 'FIREBASE_CLIENT_CERT_URL' },
      { property: 'apiKey', envVariable: 'FIREBASE_WEB_API_KEY' },
      { property: 'authDomain', envVariable: 'FIREBASE_WEB_AUTH_DOMAIN' },
      { property: 'storageBucket', envVariable: 'FIREBASE_WEB_STORAGE_BUCKET' },
      { property: 'appId', envVariable: 'FIREBASE_WEB_APP_ID' },
      { property: 'measurementId', envVariable: 'FIREBASE_WEB_MEASUREMENT_ID' },
    ];

    envValidationMap.forEach(({ property, envVariable, transformer }) => {
      const value = this.configService.get<FirebaseConfig>(envVariable);

      if (!value) {
        throw new MissingEnvVarException(envVariable);
      }

      this[property] = transformer?.(value) ?? value;
    });
  }

  getAppConfig(): FirebaseApp {
    const app = initializeApp({
      apiKey: this.apiKey,
      authDomain: this.authDomain,
      projectId: this.projectId,
      storageBucket: this.storageBucket,
      appId: this.appId,
    });

    return app;
  }

  getServerConfig(): App {
    const server = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        clientEmail: this.clientEmail,
        privateKey: this.privateKey,
        projectId: this.projectId,
      }),
    });

    return server;
  }
}
