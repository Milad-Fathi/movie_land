import { Component, OnInit } from '@angular/core';
import { Comment } from '../api-interface';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit{
  comments: Comment[] = []

  constructor(
    private CommentService:CommentService
  ){}

  ngOnInit(): void {
    this.CommentService.getAllComments().subscribe((res:any)=>{this.comments = res}) 
  }
  
}
