import { Component } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { map, filter, tap } from 'rxjs/operators';
import { storage } from 'firebase/app';

@Component({
  selector: 'app-root',
  template: `
  <div id="hero" class="let-hero">
    <div class="let-container let-container-centerall">
      <h1 class="let-title">
        Cloud Storage for Firebase
      </h1>
      <h2 class="let-titlesmall">
        comes to AngularFire!
      </h2>
    </div>
  </div>

  <div class="let-container let-container-main">
    <h2>
      Upload a file!
    </h2>

    <div class="uploadForm">
      <label for="file">File:</label>
      <input #file name="file" type="file" (change)="previewFile($event)" />
      <button (click)="uploadFile($event)">Upload</button>

      <app-progress-bar 
        [percentage]="uploadPercent | async">
      </app-progress-bar>

      <a [href]="uploadURL | async">{{uploadURL | async}}</a>

      <div class="preview">
        <img [src]="previewURL | async" />
      </div>

    </div>

  </div>
  `,
  styleUrls: ['./app.module.css'],
})
export class AppComponent {
  title = 'app';
  previewURL: Observable<any>;
  file: Blob;
  uploadPercent: Observable<number>;
  uploadURL: Observable<string>
  constructor(private storage: AngularFireStorage) {}

  previewFile(event) {
    const reader = new FileReader();
    this.file = event.target.files[0];
    this.previewURL = fromEvent(reader, 'load').pipe(map(e => reader.result))
    reader.readAsDataURL(this.file);
  }

  uploadFile() {
    const randomId = Math.random().toString(36).substring(7);
    const task = this.storage.upload(randomId, this.file);

    this.uploadPercent = task.snapshotChanges()
      .pipe(
        map(s => s.bytesTransferred / s.totalBytes * 100)
      );

    this.uploadURL = task.snapshotChanges()
      .pipe(
        filter(s => s.bytesTransferred === s.totalBytes),
        map(s => s.downloadURL),
        tap(console.log),
      )
    
  }
}
