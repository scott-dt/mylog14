import { Component, OnDestroy } from '@angular/core';
import { GeolocationService } from '../services/geolocation.service';
import { ToastController } from '@ionic/angular';
import { GeolocationPosition } from '@capacitor/core';
import {formatDate} from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-tab-playground',
  templateUrl: 'tab-playground.page.html',
  styleUrls: ['tab-playground.page.scss']
})

export class TabPlaygroundPage implements OnDestroy {
  feature = '功能名稱';
  defaultDisplay = 'No data';
  destroy$: Subject<boolean> = new Subject<boolean>();
  geoInfoMap = new Map();

  constructor(
    private geolocation: GeolocationService,
    private toastController: ToastController,
  ) {
    this.geoInfoMap.set('00_lastUpdateTime', this.defaultDisplay);
    this.geoInfoMap.set('01_accuracy', this.defaultDisplay);
    this.geoInfoMap.set('02_altitude', this.defaultDisplay);
    this.geoInfoMap.set('03_altitudeAccuracy', this.defaultDisplay);
    this.geoInfoMap.set('04_heading', this.defaultDisplay);
    this.geoInfoMap.set('05_latitude', this.defaultDisplay);
    this.geoInfoMap.set('06_longitude', this.defaultDisplay);
    this.geoInfoMap.set('07_speed', this.defaultDisplay);
    this.geoInfoMap.set('08_totalResultReceived', 0);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  async presentToast(msg: string, color?: string) {
    const toastColor = color ? color : 'primary';
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: toastColor,
    });
    toast.present();
  }

  onClickGetCurrentPosition() {
    this.geolocation.getCurrentPosition().then(val => {
      const longitude = val.coords.longitude;
      const latitude = val.coords.latitude;
      const accuracy = val.coords.accuracy;
      const speed = val.coords.speed;
      const msg = `Longituge: ${longitude}\n` +
                  `Latitude : ${latitude}\n` +
                  `Accuracy : ${accuracy}\n` +
                  `Speed    : ${speed}\n`;
      this.presentToast(msg);
    }).catch(err => {
      this.presentToast(`Error code: ${err.code}\nMessage: ${err.message}`, 'danger');
    });
  }

  onClickWatch() {
    const parse = (input: any) => {
      return (input) ? input.toString() : 'null';
    };
    const locationSource$ = this.geolocation.watchPosition().pipe(takeUntil(this.destroy$.asObservable()));
    locationSource$.subscribe((position: GeolocationPosition) => {
      console.log(position);
      this.geoInfoMap.set('00_lastUpdateTime', formatDate(new Date(), 'yyyy-MM-dd HH:mm:SS.s', 'en', '+0800'));
      this.geoInfoMap.set('01_accuracy', parse(position.coords.accuracy));
      this.geoInfoMap.set('02_altitude', parse(position.coords.altitude));
      this.geoInfoMap.set('03_altitudeAccuracy', parse(position.coords.altitudeAccuracy));
      this.geoInfoMap.set('04_heading', parse(position.coords.heading));
      this.geoInfoMap.set('05_latitude', parse(position.coords.latitude));
      this.geoInfoMap.set('06_longitude', parse(position.coords.longitude));
      this.geoInfoMap.set('07_speed', parse(position.coords.speed));
      this.geoInfoMap.set('08_totalResultReceived', this.geoInfoMap.get('08_totalResultReceived') + 1);
    });
    this.presentToast('開始更新地理資訊');
  }

  onClickUnwatch() {
    this.destroy$.next(true);
    this.presentToast('停止更新地理資訊');
  }
}
