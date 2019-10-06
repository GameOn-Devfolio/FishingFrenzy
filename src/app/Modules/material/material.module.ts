import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatChipsModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatCardModule,
  MatGridListModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatTableModule
} from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  exports: [
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    MatTabsModule
  ]
})
export class MaterialModule {}
