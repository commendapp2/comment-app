import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CommentType } from 'src/app/shared/models/comment-type.model';
import { CommentModel } from 'src/app/shared/models/comment.model';
import { SubjectsService } from 'src/app/shared/services/subjects.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styles: [
  ]
})
export class CommentFormComponent implements OnInit, OnDestroy {
  @Input() editCommentDetails: CommentModel;
  private editCommentModeSub: Subscription;
  private indexCommentSub: Subscription;
  editCommentMode: boolean;
  indexComment: number;
  commentForm: FormGroup;
  commentTypes: CommentType[] = [
    { value: 'Low', type: 'Low' },
    { value: 'Medium', type: 'Medium' },
    { value: 'High', type: 'High' },
  ];

  constructor(
    private subjects: SubjectsService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.editCommentModeSub = this.subjects.editCommentModeSubject.subscribe((boolean) => {
      this.editCommentMode = boolean;
    });

    this.indexCommentSub = this.subjects.indexCommentSubject.subscribe((index) => {
      this.indexComment = index;
    });

    this.commentForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      type: new FormControl('', Validators.required),
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      date: new FormControl('')
    });

    if (this.editCommentMode) {
      this.commentForm.patchValue({
        title: this.editCommentDetails.title,
        type: this.editCommentDetails.type,
        content: this.editCommentDetails.content
      })
    }    
  }

  ngOnDestroy() {
    this.editCommentModeSub.unsubscribe();
    this.indexCommentSub.unsubscribe();
  }

  onSubmitComment(commentForm) {
    if (!commentForm.valid) {
      return;
    }

    const title: string = commentForm.controls['title'].value;
    const type = commentForm.controls['type'].value;
    const content = commentForm.controls['content'].value;
    const date = new Date();
    const post: CommentModel = {
      title: title,
      type: type,
      content: content,
      date: date
    };

    this.subjects.submitComment(post);
    commentForm.reset();
  }

  onDeleteComment() {
    this.subjects.showPopupPrompt();
  }

  onChangeComment(){
    this.subjects.comments[this.indexComment].title = this.commentForm.controls['title'].value;
    this.subjects.comments[this.indexComment].type = this.commentForm.controls['type'].value;
    this.subjects.comments[this.indexComment].content = this.commentForm.controls['content'].value;
    this.router.navigate(['/comments']);
  }
}
