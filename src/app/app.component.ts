import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private meta: Meta) { }

  ngOnInit(): void {
    if (environment.production) {
      this.meta.addTag({
        name: "http-equiv=Content-Security-Policy", content: `default-src 'none';
              frame-src 'self';
              script-src 'self';
              style-src 'self' 'unsafe-inline';
              font-src 'self';
              img-src 'self' data:;
              connect-src 'self'`});
    }
  }
  title = 'mh-sap-project';
}