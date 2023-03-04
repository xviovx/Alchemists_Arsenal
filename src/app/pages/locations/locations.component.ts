import { Component } from '@angular/core';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent {
  locations = [
    {
      title: "Whiterun",
      description: "From the proud warriors of Jorrvaskr to the wise mages of Dragonsreach, the beating heart of Skyrim and one of the most storied and beloved cities in all of Tamriel. With its towering walls, bustling marketplaces, and grand castle, Whiterun exudes an air of power and majesty that is unmatched by any other city in the province.",
      imageUrl: "../../../assets/locations/Whiterun.webp"
    },
    {
      title: "Solitude",
      description: "Situated on the rugged northern coast of Skyrim, Solitude stands as a bastion of strength and stability amidst the wilds of the province. Its formidable walls and towering castle have withstood countless sieges and battles, earning it a well-deserved reputation as one of the most impregnable fortresses in all of Tamriel.",
      imageUrl: "../../../assets/locations/Solitude.webp"
    },
    {
      title: "Dawnstar",
      description: "The sleepy yet charming town that lies nestled amidst the snowy peaks of northern Skyrim. From the imposing Dark Brotherhood Sanctuary to the mysterious Pale Lady's cave, there are countless secrets and treasures to uncover in and around this idyllic hamlet.",
      imageUrl: "../../../assets/locations/Dawnstar.webp"
    }
  ]
}
