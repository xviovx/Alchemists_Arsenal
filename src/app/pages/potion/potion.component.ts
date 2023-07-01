import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PotionService } from '../../services/potion.service';
import { Potion } from '../../potion';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-potion',
  templateUrl: './potion.component.html',
  styleUrls: ['./potion.component.css'],
  animations: [
    trigger('scaleUpAndFadeIn', [
      state('void', style({ transform: 'scale(0)', opacity: 0 })),
      transition('void => *', [
        animate('0.5s ease-in-out', keyframes([
          style({ transform: 'scale(0)', opacity: 0, offset: 0 }),
          style({ transform: 'scale(1.2)', offset: 0.3 }),
          style({ transform: 'scale(1)', opacity: 1, offset: 1.0 }),
        ]))
      ])
    ])
  ]
})
export class PotionComponent implements OnInit {
  potions: Potion[] = [];
  filteredPotions: Potion[] = [];
  showModal = false;
  selectedPotion: Potion = { name: '', location: '', description: '', quantity: 0, image: '', cardHovered: false };
  searchText = '';

  constructor(private potionService: PotionService) {}

  ngOnInit() {
    this.potionService.getAllPotions()
      .subscribe(
        (potions: Potion[]) => {
          this.potions = potions;
          this.filteredPotions = potions;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  viewPotion(potion: Potion) {
    this.showModal = true;
    this.selectedPotion = potion;
  }

  closeModal() {
    this.showModal = false;
  }

  filterPotions() {
    this.filteredPotions = this.potions.filter((potion) => {
      return potion.name.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  addPotion(form: NgForm) {
    const newPotion: Potion = form.value;
    this.potionService.addPotion(newPotion)
      .subscribe(
        (potion: Potion) => {
          // If the potion was added successfully, update the UI
          this.potions.push(potion);
          this.filteredPotions = this.potions;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
