import { Pipe, PipeTransform } from '@angular/core';

// A pipe transforms a value for DISPLAY, right inside a template, using
// `value | pipeName`. It never mutates the original value or component
// state — it's a pure function from input to output (by default, Angular
// only re-runs it when the input reference changes, which is fast).
@Pipe({
  name: 'shout',
  standalone: true,
})
export class ShoutPipe implements PipeTransform {
  // Extra arguments after the value come from `| shout:arg1:arg2` in the template.
  transform(value: string, times = 1): string {
    return value.toUpperCase() + '!'.repeat(times);
  }
}
