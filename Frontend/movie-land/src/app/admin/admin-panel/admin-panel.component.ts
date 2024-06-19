import { Component } from '@angular/core';
import { movie } from 'src/app/api-interface';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {
  movies: movie[] = [
  {
    id: 11,
    title: "زنگ ها برای که به صدا در می آیند",
    genre: "Commedy",
    rating: "8.6",
    description: "توضیحات خفن در مورد یه فیلم آشغال",
    image_address: "assets/img/ac-image-6D1646204108bf.jpg"
  },
  {
    id: 12,
    title: "خفن ترین",
    genre: "Commedy",
    rating: "8.6",
    description: "برای تست",
    image_address: "assets/img/ac-image-6D1646204108bf.jpg"
  },
  {
    id: 13,
    title: "زنگ ها برای که به صدا در می آیند",
    genre: "Commedy",
    rating: "8.6",
    description: "توضیحات خفن در مورد یه فیلم آشغال",
    image_address: "assets/img/ac-image-6D1646204108bf.jpg"
  }
]

}
