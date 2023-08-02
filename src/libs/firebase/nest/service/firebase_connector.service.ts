import { App } from 'firebase-admin/app';
import { FirebaseApp } from 'firebase/app';
import { FirebaseService } from '@/libs/firebase/nest/service';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class FirebaseConnectorService implements OnModuleInit {
  server: null | App = null;
  app: null | FirebaseApp = null;

  constructor(private readonly firebaseService: FirebaseService) {}

  async onModuleInit() {
    try {
      await this.connectServer();
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  async connectServer(): Promise<App> {
    if (this.server !== null) {
      return this.server;
    }

    this.server = await this.firebaseService.getServerConfig();

    return this.server;
  }

  async connectApp(): Promise<FirebaseApp> {
    if (this.app !== null) {
      return this.app;
    }

    this.app = await this.firebaseService.getAppConfig();

    return this.app;
  }
}
