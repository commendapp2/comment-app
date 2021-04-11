import { Component, OnInit } from '@angular/core';

import { SubjectsService } from '../shared/services/subjects.service';

@Component({
  selector: 'app-manage-comments',
  templateUrl: './manage-comments.component.html',
  styles: []
})
export class ManageCommentsComponent implements OnInit {

  constructor(
    private subjects: SubjectsService
  ){}

  ngOnInit(): void {
    this.subjects.enableEditCommentMode();
  }
}