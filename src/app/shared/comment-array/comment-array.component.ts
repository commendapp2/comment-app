import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CommentModel } from '../models/comment.model';
import { SubjectsService } from '../services/subjects.service';
import { Animations } from '../animations/animations';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-comment-array',
  templateUrl: './comment-array.component.html',
  styles: [],
  animations: [ Animations.addComment ]
})

export class CommentArrayComponent implements OnInit, OnDestroy {
  private commentSub: Subscription;
  private editCommentModeSub: Subscription;
  private showPopupSub: Subscription;
  comments: CommentModel[];
  editCommentMode: boolean;
  showPopup: boolean;

  constructor(
    private subjects: SubjectsService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.commentSub = this.subjects.commentsSubject.subscribe((comments) => {
      this.comments = comments;
    });

    this.editCommentModeSub = this.subjects.editCommentModeSubject.subscribe((boolean) => {
      this.editCommentMode = boolean;
    });

    this.showPopupSub = this.subjects.showPopupSubject.subscribe((boolean) => {
      this.showPopup = boolean;
    });
  }

  ngOnDestroy() {
    this.commentSub.unsubscribe();
    this.editCommentModeSub.unsubscribe();
    this.showPopupSub.unsubscribe();
  }

  onOpenCurrentComment(index: number){
    this.subjects.openCurrentComment(index);
  }

  onEditComment(index: number) {
    this.subjects.assignCommentIndexFromManageComments(index);
    this.router.navigate(['/manage-comments/'+index]);
  }

  onDeleteComment(index: number) {
    this.subjects.assignCommentIndexFromManageComments(index);
    this.subjects.showPopupPrompt();
  }
}
