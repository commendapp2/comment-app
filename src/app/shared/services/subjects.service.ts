import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

import { CommentModel } from "../models/comment.model";

@Injectable({providedIn: 'root'})
export class SubjectsService {
  indexCommentSubject = new BehaviorSubject<number>(null);
  indexComment: number;

  showPopupSubject = new BehaviorSubject<boolean>(null);
  showPopup: boolean;

  currentCommentSubject = new BehaviorSubject<CommentModel>(null);
  currentComment: CommentModel;

  editCommentModeSubject = new BehaviorSubject<boolean>(null);
  editCommentMode: boolean; 

  commentsSubject = new BehaviorSubject<CommentModel[]>(null);
  comments: CommentModel[] = [
    {
      title: 'Title 1',
      type: 'Low',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam fuga rerum, officiis, consequuntur necessitatibus deserunt quaerat mollitia tempora a exercitationem vel blanditiis molestiae culpa omnis nisi? Quis dicta rem possimus.',
      date: new Date(2021, 3, 9, 10, 38, 25)
    },
    {
      title: 'Title 2',
      type: 'Medium',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam fuga rerum, officiis, consequuntur necessitatibus deserunt quaerat mollitia tempora a exercitationem vel blanditiis molestiae culpa omnis nisi? Quis dicta rem possimus.',
      date: new Date(2021, 3, 9, 11, 40, 34)
    },    
    {
      title: 'Title 3',
      type: 'High',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam fuga rerum, officiis, consequuntur necessitatibus deserunt quaerat mollitia tempora a exercitationem vel blanditiis molestiae culpa omnis nisi? Quis dicta rem possimus.',
      date: new Date(2021, 3, 9, 13, 35, 56)
    }
  ];

  constructor(private router: Router){
    this.comments.sort((a:any, b:any) => b.date - a.date);
    this.commentsSubject.next(this.comments);
  }

  disableEditCommentMode() {
    this.editCommentMode = false;
    this.editCommentModeSubject.next(this.editCommentMode);
  }

  enableEditCommentMode() {
    this.editCommentMode = true;
    this.editCommentModeSubject.next(this.editCommentMode);
  }

  submitComment(post: CommentModel) {
    this.comments.push(post);
    this.comments.sort((a:any, b:any) => b.date - a.date);
    this.commentsSubject.next(this.comments); 
  }

  showPopupPrompt() {
    this.showPopup = true;
    this.showPopupSubject.next(this.showPopup);
  }
  
  hidePopupPrompt() {
    this.showPopup = false;
    this.showPopupSubject.next(this.showPopup);
  }

  assignCommentIndexFromManageComments(index: number) {
    this.indexComment = index;
    this.indexCommentSubject.next(this.indexComment);
  }

  openCurrentComment(index: number) {
    if(index >= this.comments.length || isNaN(index)){
      this.router.navigate(['/manage-comments']);
      return
    }
    this.currentComment = this.comments[index];
    this.currentCommentSubject.next(this.currentComment);
    this.router.navigate(['/manage-comments/' + index]);

    this.indexComment = index;
    this.indexCommentSubject.next(this.indexComment);
  }

  deleteCommentEl() {
    this.comments.splice(this.indexComment, 1);
    this.commentsSubject.next(this.comments);
    this.hidePopupPrompt();
    this.router.navigate(['/comments']);    
  }
}