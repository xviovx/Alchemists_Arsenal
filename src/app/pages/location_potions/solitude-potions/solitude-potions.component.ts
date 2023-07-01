import { Component, OnInit } from '@angular/core';
import { Potion } from "../../../potion";
import { PotionService } from '../../../services/potion.service';

@Component({
  selector: 'app-solitude-potions',
  templateUrl: './solitude-potions.component.html',
  styleUrls: ['./solitude-potions.component.css']
})
export class SolitudePotionsComponent implements OnInit {

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
            this.potions = items.filter(potion => potion.location === 'Solitude');
          },
          (error) => {
            console.log(error)
          }
        );
    }

    getSolitudePotionCount(): number {
      return this.potions.length;
    }

}
