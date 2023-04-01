import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from "@angular/core";

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})

export class AlertMessageComponent implements OnInit {
  @Input()
  errorMessage: string | undefined;
  @Input()
  successMessage: string | undefined;
  @Input()
  warningMessage: string | undefined;

  @Output() successMessageChange = new EventEmitter<string | undefined>();
  @Output() warningMessageChange = new EventEmitter<string | undefined>();
  @Output() errorMessageChange = new EventEmitter<string | undefined>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['errorMessage'] !== undefined)
      this.errorMessage = changes['errorMessage'].currentValue;

    if (changes['successMessage'] !== undefined)
      this.successMessage = changes['successMessage'].currentValue;

    if (changes['warningMessage'] !== undefined)
      this.warningMessage = changes['warningMessage'].currentValue;
  }

  clearSuccessMessage() {
    this.successMessage = undefined;
    this.successMessageChange.emit(undefined);
  }

  clearWarningMessage() {
    this.warningMessage = undefined;
    this.warningMessageChange.emit(undefined);
  }

  clearErrorMessage() {
    this.errorMessage = undefined;
    this.errorMessageChange.emit(undefined);
  }
}

