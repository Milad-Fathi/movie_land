import { Component, OnInit } from '@angular/core';
import { Comment } from '../api-interface';
import { GlobalService } from 'src/app/services/global.service';
import { CommentService } from 'src/app/services/comment.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-comment-input-box',
  templateUrl: './comment-input-box.component.html',
  styleUrls: ['./comment-input-box.component.scss']
})
export class CommentInputBoxComponent implements OnInit{

  constructor(
    private router:Router,
    private globalService:GlobalService,
    private CommentService:CommentService
  ){}
  data: any = {
    id: null,
    date: '6/21/2024',
    text: null,
  }
  comment: any

  ngOnInit(): void {
    console.log(this.router.url.split('/')[2])
    // this.CommentService.addComment().subscribe((res:any)=>{this.comment = res})
  }
  addComment(){
    this.CommentService.addComment(+this.router.url.split('/')[2], this.data).subscribe(
      (response)=>{
        console.log("comment_test")
        console.log(response)
        this.comment = response
        window.alert("نظر شما با موفقیت ثبت شد.")

      }
    )

  }
}
