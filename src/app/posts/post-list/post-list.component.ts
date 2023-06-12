import { Component, OnDestroy, OnInit } from "@angular/core";
import {Subscription} from 'rxjs';
import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  selector:'app-post-list',
  templateUrl:'./post-list.component.html',
  styleUrls:['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy{
  // posts = [
  //   {title:'first post', content:"this is the first post\'s content"},
  //   {title:'second post', content:"this is the second post\'s content"},
  //   {title:'third post', content:"this is the third post\'s content"}
  // ]

  posts :  Post[] = []
  private postsSub:Subscription;

  constructor(public postsService: PostsService) {}


  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
