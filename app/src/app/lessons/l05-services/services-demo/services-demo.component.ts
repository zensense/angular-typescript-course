import { Component } from '@angular/core';
import { LoggerService } from '../logger.service';
import { CounterStoreService } from '../counter-store.service';

@Component({
  selector: 'app-services-demo',
  standalone: true,
  imports: [],
  templateUrl: './services-demo.component.html',
})
export class ServicesDemoComponent {
  // Constructor injection: Angular sees these parameter types and supplies
  // the already-created singleton instances automatically. You never write
  // `new LoggerService()` yourself — Angular's injector does it once and
  // hands the same instance to whoever asks.
  constructor(
    private logger: LoggerService,
    public counterStore: CounterStoreService, // `public` so the template can read it directly
  ) {
    this.logger.log('ServicesDemoComponent created');
  }

  get history(): string[] {
    return this.logger.getHistory();
  }

  increment(): void {
    this.counterStore.increment();
    this.logger.log(`Counter incremented to ${this.counterStore.getCount()}`);
  }
}
