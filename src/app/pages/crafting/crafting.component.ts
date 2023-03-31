import { Component } from '@angular/core';

@Component({
  selector: 'app-crafting',
  templateUrl: './crafting.component.html',
  styleUrls: ['./crafting.component.css']
})
export class CraftingComponent {
  craft(): void {
    // Add your crafting logic here
  }

  onLocationSelect(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    const dropdown = document.getElementById('locationDropdown');
    if (dropdown?.classList) {
      if (value !== '') {
        dropdown.classList.add('selected');
      } else {
        dropdown.classList.remove('selected');
      }
    }
  }

}

