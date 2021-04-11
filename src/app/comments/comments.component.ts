import { Component, OnInit } from '@angular/core';

import { SubjectsService } from '../shared/services/subjects.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styles: []
})
export class CommentsComponent implements OnInit {

  constructor(
    private subjects: SubjectsService
  ){}

  ngOnInit(): void {
    this.subjects.disableEditCommentMode();
  }
}
