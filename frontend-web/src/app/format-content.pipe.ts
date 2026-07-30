import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatContent'
})
export class FormatContentPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    // Thay thế các ký tự đặc biệt bằng các thẻ HTML tương ứng
    return value
      .replace(/\n/g, '<br>')
      .replace(/\\n/g, '<br>');
  }
}
