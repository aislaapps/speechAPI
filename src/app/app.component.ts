import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpeechRecognitionService } from './speech-recognition.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  showSearchButton: boolean;
  stopListeningButton: boolean;
  speechData: string;

  title = 'app';

  constructor(private speechRecognitionService: SpeechRecognitionService) {
    this.showSearchButton = true;
    this.stopListeningButton = false;
    this.speechData = "";
  }

  ngOnInit() {
    console.log("hello there")
  }

  ngOnDestroy() {
    this.speechRecognitionService.DestroySpeechObject();
  }


  activateSpeechSearch(): void {
    this.showSearchButton = false;

    this.speechRecognitionService.record()
        .subscribe(
        //listener
        (value) => {
            this.speechData = value;
            console.log('listener.speechData:', value);
        },
        //error
        (err) => {
            console.log(err);
            if (err.error == "no-speech") {
                console.log("--restarting service--");
                this.activateSpeechSearch();
            }
        },
        //completion
        () => {
            this.showSearchButton = true;
            console.log("--complete--");
            if (!this.stopListeningButton) {
              this.activateSpeechSearch();
            }
        });
  }

  deActivateSpeechSearch(): void {
    this.showSearchButton = true;
    this.stopListeningButton = true;
    this.speechRecognitionService.DestroySpeechObject();
  }

}
