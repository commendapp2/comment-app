import { trigger, state, style, transition, animate } from '@angular/animations';

export const Animations = {
  addComment: trigger('addComment', [
    state('in', style({
      opacity: 1,
      transform: 'translateX(0)'
    })),
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'translateX(-100px)'
      }),
      animate(330),
    ])
  ])
}
