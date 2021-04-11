import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CommentArrayComponent } from './comment-array/comment-array.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';
import { ShortenPipe } from './pipes/shorten.pipe';

@NgModule({
	declarations: [
		CommentArrayComponent,
		CommentFormComponent,
		ConfirmationPopupComponent,
		ShortenPipe
	],
	imports: [
		CommonModule,
		ReactiveFormsModule
	],
	exports: [
		CommentArrayComponent,
		CommentFormComponent,
		ConfirmationPopupComponent,
		ShortenPipe
	]
})
export class SharedModule{}