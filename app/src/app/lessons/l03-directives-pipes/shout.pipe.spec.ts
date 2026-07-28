import { ShoutPipe } from './shout.pipe';

// Pipes are the easiest thing in Angular to unit test: most are pure
// functions, so you don't need TestBed, a fixture, or anything
// Angular-specific at all — just instantiate the class and call the method.
describe('ShoutPipe', () => {
  let pipe: ShoutPipe;

  beforeEach(() => {
    pipe = new ShoutPipe();
  });

  it('uppercases the input', () => {
    expect(pipe.transform('hello')).toBe('HELLO!');
  });

  it('adds one "!" by default', () => {
    expect(pipe.transform('hi')).toBe('HI!');
  });

  it('repeats "!" the requested number of times', () => {
    expect(pipe.transform('hi', 3)).toBe('HI!!!');
  });
});
