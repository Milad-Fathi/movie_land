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
      image_address: 'assets/img/ac-image-6D1646204108bf.jpg',
      title: 'inception',
      genre: 'action',
      rating: '8.2',
      description: 'perfect film'
    },
    {
      image_address: 'assets/img/17-1-22-109592346969.jpg',
      title: 'ماجرای نیمروز',
      genre: 'historical',
      rating: '7.0',
      description: 'good film'

    },
    {
      image_address: 'assets/img/1394111008570371269954210.jpg',
      title: 'ایستاده در غبار',
      genre: 'action',
      rating: '7.2',
      description: 'perfect film'

    },
    {
      image_address: 'assets/img/USUAL-SUSPECT-modernfilm.ir_.jpg',
      title: 'usual suspect',
      genre: 'neo-nevar',
      rating: '7.8',
      description: 'perfect film'

    },
    {
      image_address: 'assets/img/ac-image-6D1646204108bf.jpg',
      title: 'inception',
      genre: 'action',
      rating: '8.2',
      description: 'perfect film'

    },
    {
      image_address: 'assets/img/Screenshot 2024-01-11 105630.png',
      title: 'our-or',
      genre: 'comedy',
      rating: '9.2',
      description: 'the most funny and cool movie in world'

    },
    
  ]
}
