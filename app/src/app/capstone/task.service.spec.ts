import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    localStorage.clear(); // this service persists to localStorage — start each test clean
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('starts empty', () => {
    expect(service.tasks()).toEqual([]);
    expect(service.totalCount()).toBe(0);
  });

  it('adds a task', () => {
    service.add('Write tests', 'medium');
    expect(service.tasks().length).toBe(1);
    expect(service.tasks()[0].title).toBe('Write tests');
    expect(service.tasks()[0].done).toBe(false);
  });

  it('ignores blank titles', () => {
    service.add('   ', 'low');
    expect(service.tasks().length).toBe(0);
  });

  it('toggles a task done/undone', () => {
    service.add('Ship it', 'high');
    const id = service.tasks()[0].id;

    service.toggle(id);
    expect(service.tasks()[0].done).toBe(true);

    service.toggle(id);
    expect(service.tasks()[0].done).toBe(false);
  });

  it('removes a task', () => {
    service.add('Temporary', 'low');
    const id = service.tasks()[0].id;
    service.remove(id);
    expect(service.tasks().length).toBe(0);
  });

  it('filters by active/completed', () => {
    service.add('Task A', 'low');
    service.add('Task B', 'low');
    // New tasks are prepended (newest first), so tasks()[0] is 'Task B' here.
    service.toggle(service.tasks()[0].id); // mark Task B done

    service.setFilter('completed');
    expect(service.tasks().map((t) => t.title)).toEqual(['Task B']);

    service.setFilter('active');
    expect(service.tasks().map((t) => t.title)).toEqual(['Task A']);

    service.setFilter('all');
    expect(service.tasks().length).toBe(2);
  });

  it('computes activeCount independent of the current filter', () => {
    service.add('Task A', 'low');
    service.add('Task B', 'low');
    service.toggle(service.tasks()[0].id);
    service.setFilter('completed'); // tasks() is now filtered, but activeCount() should not be
    expect(service.activeCount()).toBe(1);
  });
});
