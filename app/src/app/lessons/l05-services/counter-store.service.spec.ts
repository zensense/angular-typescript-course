import { TestBed } from '@angular/core/testing';
import { CounterStoreService } from './counter-store.service';

// TestBed builds a small Angular testing "module" so injectable services
// (and their own dependencies, if any) can be constructed the same way
// Angular would construct them in the real app.
describe('CounterStoreService', () => {
  let service: CounterStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterStoreService);
  });

  it('starts at zero', () => {
    expect(service.getCount()).toBe(0);
  });

  it('increments the count', () => {
    service.increment();
    service.increment();
    expect(service.getCount()).toBe(2);
  });

  it('resets the count back to zero', () => {
    service.increment();
    service.reset();
    expect(service.getCount()).toBe(0);
  });
});
