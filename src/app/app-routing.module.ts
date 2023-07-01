import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { HelpComponent } from './pages/help/help.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FindComponent } from './pages/find/find.component';
import { PotionComponent } from './pages/potion/potion.component';
import { WhiterunItemsComponent } from './pages/location_items/whiterun-items/whiterun-items.component';
import { SolitudeItemsComponent } from './pages/location_items/solitude-items/solitude-items.component';
import { DawnstarItemsComponent } from './pages/location_items/dawnstar-items/dawnstar-items.component';
import { WhiterunPotionsComponent } from './pages/location_potions/whiterun-potions/whiterun-potions.component';
import { SolitudePotionsComponent } from './pages/location_potions/solitude-potions/solitude-potions.component';
import { DawnstarPotionsComponent } from './pages/location_potions/dawnstar-potions/dawnstar-potions.component';
import { WhiterunCraftingComponent } from './pages/crafting/crafting-whiterun/whiterun-crafting.component';
import { SolitudeCraftingComponent } from './pages/crafting/crafting-solitude/solitude-crafting.component';
import { DawnstarCraftingComponent } from './pages/crafting/crafting-dawnstar/dawnstar-crafting.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'inventory',
    component: InventoryComponent
  },
  {
    path: 'crafting',
    component: WhiterunCraftingComponent
  },
  {
    path: 'craftingSolitude',
    component: SolitudeCraftingComponent
  },
  {
    path: 'craftingDawnstar',
    component: DawnstarCraftingComponent
  },
  {
    path: 'locations',
    component: LocationsComponent
  },
  {
    path: 'whiterun_items',
    component: WhiterunItemsComponent
  },
  {
    path: 'solitude_items',
    component: SolitudeItemsComponent
  },
  {
    path: 'dawnstar_items',
    component: DawnstarItemsComponent
  },
  {
    path: 'whiterun_potions',
    component: WhiterunPotionsComponent
  },
  {
    path: 'solitude_potions',
    component: SolitudePotionsComponent
  },
  {
    path: 'dawnstar_potions',
    component: DawnstarPotionsComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'find',
    component: FindComponent
  },
  {
    path: 'potion',
    component: PotionComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
