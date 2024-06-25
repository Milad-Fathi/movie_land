import { Component } from '@angular/core';
import { movie } from '../api-interface';

@Component({
  selector: 'app-mini-card',
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.scss']
})
export class MiniCardComponent {
  movies: movie[] = [
    {
      id: 1,
      image_address: 'assets/img/mov_10916_65199-b.jpg',
      title: 'سگ را بجنبان',
      genre: 'action',
      rating: '8.2',
      description: 'perfect film'
    },
    {
      id: 2,
      image_address: 'assets/img/17-1-22-109592346969.jpg',
      title: 'ماجرای نیمروز',
      genre: 'historical',
      rating: '7.0',
      description: 'good film'

    },
    {
      id: 3,
      image_address: 'assets/img/1394111008570371269954210.jpg',
      title: 'ایستاده در غبار',
      genre: 'action',
      rating: '7.2',
      description: 'perfect film'

    },
    {
      id: 4,
      image_address: 'assets/img/USUAL-SUSPECT-modernfilm.ir_.jpg',
      title: 'usual suspect',
      genre: 'neo-nevar',
      rating: '7.8',
      description: 'perfect film'

    },
    {
      id: 5,
      image_address: 'assets/img/images.jpg',
      title: 'spider man',
      genre: 'action',
      rating: '8.2',
      description: 'perfect film'

    },
    {
      id: 6,
      image_address: 'assets/img/Mansour-Movie.jpg',
      title: 'منصور',
      genre: 'historical',
      rating: '9.2',
      description: 'a cool movie in world'

    },
  ]
}
