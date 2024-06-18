import { Component } from '@angular/core';
import { movie } from '../api-interface';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  movies: movie[] = [
    {
      id: 9,
      image_address: 'assets/img/ac-image-6D1646204108bf.jpg',
      title: 'inception',
      genre: 'action',
      rating: '8.2',
      description: 'perfect film'
    },
    {
      id: 8,
      image_address: 'assets/img/USUAL-SUSPECT-modernfilm.ir_.jpg',
      title: 'usual suspect',
      genre: 'neo-nevar',
      rating: '7.8',
      description: 'perfect film'
    },
    {
      id: 7,
      image_address: 'assets/img/1394111008570371269954210.jpg',
      title: 'ایستاده در غبار',
      genre: 'action',
      rating: '7.2',
      description: 'perfect film'
    },
  ]
}
