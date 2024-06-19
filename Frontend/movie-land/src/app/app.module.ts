import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

import { CarouselModule } from '@coreui/angular';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { MiniCardComponent } from './mini-card/mini-card.component';
import { CardComponent } from './card/card.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CommentCardComponent } from './comment-card/comment-card.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    MainPageComponent,
    MainCarouselComponent,
    MiniCardComponent,
    CardComponent,
    MovieDetailComponent,
    NotFoundComponent,
    CommentCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    CarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
