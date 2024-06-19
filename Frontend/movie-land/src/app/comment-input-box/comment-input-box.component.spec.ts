import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentInputBoxComponent } from './comment-input-box.component';

describe('CommentInputBoxComponent', () => {
  let component: CommentInputBoxComponent;
  let fixture: ComponentFixture<CommentInputBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentInputBoxComponent]
    });
    fixture = TestBed.createComponent(CommentInputBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
