import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatContentPipe } from './format-content.pipe';

@NgModule({
  declarations: [FormatContentPipe],
  imports: [CommonModule],
  exports: [FormatContentPipe]
})
export class PipesModule { }
