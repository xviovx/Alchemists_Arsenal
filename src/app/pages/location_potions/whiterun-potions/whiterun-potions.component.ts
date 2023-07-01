import { Component, OnInit } from '@angular/core';
import { Potion } from "../../../potion";
import { PotionService } from '../../../services/potion.service';

@Component({
  selector: 'app-whiterun-potions',
  templateUrl: './whiterun-potions.component.html',
  styleUrls: ['./whiterun-potions.component.css']
})
export class WhiterunPotionsComponent implements OnInit {

    potions: Potion[] = [];

    locationOptions = ['Whiterun', 'Solitude', 'Dawnstar'];

    showModal = false;
    selectedPotion: Potion = { _id: '', name: '', location: '', quantity: 0, image: '', description: '', cardHovered: false};
    selectedQuantity = 0;

    constructor(private potionService: PotionService) {} // Inject PotionService here

    ngOnInit() {
      this.potionService.getAllPotions()
        .subscribe(
          (items: Potion[]) => {
            this.potions = items.filter(potion => potion.location === 'Whiterun');
          },
          (error) => {
            console.log(error)
          }
        );
    }

    getWhiterunPotionCount(): number {
      return this.potions.length;
    }

}
