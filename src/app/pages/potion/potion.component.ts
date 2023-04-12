import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PotionService } from '../../services/potion.service';
import { Potion } from '../../potion';

@Component({
  selector: 'app-potion',
  templateUrl: './potion.component.html',
  styleUrls: ['./potion.component.css']
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
