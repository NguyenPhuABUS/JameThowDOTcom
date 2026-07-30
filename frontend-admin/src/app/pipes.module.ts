import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatContentPipe } from './format-content.pipe';
import { TruncatePipe } from './truncate.pipe';
@NgModule({
  declarations: [FormatContentPipe,TruncatePipe],
  imports: [CommonModule],
  exports: [FormatContentPipe,TruncatePipe]
})
export class PipesModule { }
