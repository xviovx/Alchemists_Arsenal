import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

//materials
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';

//components
import { HomeComponent } from './pages/home/home.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { HelpComponent } from './pages/help/help.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { FindComponent } from './pages/find/find.component';
import { QuantityInputComponent } from './quantity-input/quantity-input.component';
import { PotionComponent } from './pages/potion/potion.component';
import { HttpClientModule } from '@angular/common/http';
import { WhiterunItemsComponent } from './pages/location_items/whiterun-items/whiterun-items.component';
import { SolitudeItemsComponent } from './pages/location_items/solitude-items/solitude-items.component';
import { DawnstarItemsComponent } from './pages/location_items/dawnstar-items/dawnstar-items.component';
import { WhiterunPotionsComponent } from './pages/location_potions/whiterun-potions/whiterun-potions.component';
import { SolitudePotionsComponent } from './pages/location_potions/solitude-potions/solitude-potions.component';
import { DawnstarPotionsComponent } from './pages/location_potions/dawnstar-potions/dawnstar-potions.component';
import { WhiterunCraftingComponent } from './pages/crafting/crafting-whiterun/whiterun-crafting.component';
import { SolitudeCraftingComponent } from './pages/crafting/crafting-solitude/solitude-crafting.component';
import { DawnstarCraftingComponent } from './pages/crafting/crafting-dawnstar/dawnstar-crafting.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InventoryComponent,
    LocationsComponent,
    HelpComponent,
    NotFoundComponent,
    FindComponent,
    QuantityInputComponent,
    PotionComponent,
    WhiterunItemsComponent,
    SolitudeItemsComponent,
    DawnstarItemsComponent,
    FilterPipe,
    WhiterunPotionsComponent,
    SolitudePotionsComponent,
    DawnstarPotionsComponent,
    WhiterunCraftingComponent,
    SolitudeCraftingComponent,
    DawnstarCraftingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatSidenavModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent] // the first initial component
})
export class AppModule { }
