import { Component, OnInit } from '@angular/core';

import { SubjectsService } from '../services/subjects.service';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styles: [
  ]
})
export class ConfirmationPopupComponent implements OnInit {

  constructor(
   private subjects: SubjectsService
  ) { }

  ngOnInit(): void {
  }

  onConfirmationForDelete() {
    this.subjects.deleteCommentEl();
  }

  onCancelForDelete() {
    this.subjects.hidePopupPrompt();
  }
}
