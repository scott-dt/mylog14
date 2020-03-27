import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';
const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    if (this.platform.is('hybrid')) {
      await SplashScreen.hide();
      await StatusBar.setStyle({ style: StatusBarStyle.Light });
    }
  }
}
