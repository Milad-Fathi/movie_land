import { Component } from '@angular/core';
import { Comment } from '../api-interface';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent {
  comments: Comment[] = [
    {
      id: 1,
      date: "2023/10/01",
      text: "string",
  
    },
    {
      id: 2,
      date: "2023/10/01",
      text: "string",
  
    },
    {
      id: 3,
      date: "2023/10/01",
      text: "string",
  
    },
    {
      id: 4,
      date: "2023/10/01",
      text: "string",
  
    },
    {
      id: 5,
      date: "2023/10/01",
      text: "string",
  
    },
  ]
  
}
