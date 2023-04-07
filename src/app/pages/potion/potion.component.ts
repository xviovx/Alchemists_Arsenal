import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PotionService } from '../../services/potion.service';
import { Potion } from "../../potion";

@Component({
  selector: 'app-potion',
  templateUrl: './potion.component.html',
  styleUrls: ['./potion.component.css']
})
export class PotionComponent implements OnInit{
  // potions = [
  //   { name: 'Potion of Cure Disease', location: 'Whiterun', description: "This is a medicinal brew that can heal a variety of ailments and illnesses, such as infections, plagues, and other diseases, restoring the user's health and vitality." , quantity: 1, image: '../../../assets/potions/CureDisease.webp', cardHovered: false},
  //   { name: 'Deadly Poison', location: 'Solitude', description: "This is a toxic substance that, when ingested or otherwise absorbed into the body, can cause severe harm or even death. It is often used as a weapon for assassination or murder, and its effects can range from causing convulsions and paralysis to shutting down major organs and bodily functions." , quantity: 1, image: '../../../assets/potions/DeadlyPoison.webp', cardHovered: false}
  // ]

  potions: Potion[] = [];
  filteredPotions: Potion[] = [];

  showModal = false;
  selectedPotion: { name: string, location: string, description: string, quantity: number, image: string, cardHovered: boolean } = { name: '', location: '', description: '', quantity: 0, image: '', cardHovered: false } ;

  constructor(private potionService: PotionService) {}

  ngOnInit() {
    this.potionService.getAllPotions()
    .subscribe(
      (potions: Potion[]) => {
        this.potions = potions;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  viewPotion(potion: { name: string, location: string, description: string, quantity: number, image: string, cardHovered: boolean, }) {
    this.showModal = true;
    this.selectedPotion = potion;
  }

  closeModal() {
    this.showModal = false;
  }

  searchText: string = '';

  filterPotions() {
    return this.potions.filter((potion) => {
      return potion.name.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }
}
