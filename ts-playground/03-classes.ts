// ============================================================
// 03 — Classes: the backbone of Angular components & services
// ============================================================
// Every Angular component, service, directive, and pipe is a TypeScript
// class with a decorator on top (@Component, @Injectable, etc). Get
// comfortable with plain classes first — the Angular-specific parts
// (decorators) are covered once you get to the `app/` project.

// ---- 1. A basic class ----
class Animal {
  name: string;         // property declaration
  private sound: string; // `private` = only accessible inside this class

  constructor(name: string, sound: string) {
    this.name = name;
    this.sound = sound;
  }

  makeSound(): string {
    return `${this.name} says ${this.sound}`;
  }
}

const dog = new Animal("Rex", "Woof");
console.log(dog.makeSound());
// console.log(dog.sound); // Error — `sound` is private

// ---- 2. Shorthand: parameter properties ----
// Instead of declaring a field AND assigning it in the constructor, TS lets
// you do both in the constructor signature. This is the style Angular code
// uses constantly for constructor-injected dependencies.
class Vehicle {
  constructor(
    public make: string,
    public model: string,
    private topSpeed: number,
  ) {}

  describe(): string {
    return `${this.make} ${this.model}, top speed ${this.topSpeed}mph`;
  }
}
const car = new Vehicle("Toyota", "Corolla", 120);
console.log(car.describe());

// ---- 3. Access modifiers ----
// public    (default) — accessible anywhere
// private   — only inside the declaring class
// protected — inside the declaring class AND subclasses
// readonly  — can be set in the constructor, never reassigned after

class BankAccount {
  private balance = 0;
  readonly accountId: string;

  constructor(accountId: string) {
    this.accountId = accountId;
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Deposit must be positive");
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

// ---- 4. Getters and setters ----
class Temperature {
  private _celsius = 0;

  get celsius(): number {
    return this._celsius;
  }
  set celsius(value: number) {
    this._celsius = value;
  }
  get fahrenheit(): number {
    return this._celsius * 9 / 5 + 32;
  }
}
const temp = new Temperature();
temp.celsius = 100;             // calls the setter
console.log(temp.fahrenheit);   // calls the getter -> 212

// ---- 5. Inheritance ----
class Shape {
  constructor(protected name: string) {}
  area(): number {
    return 0;
  }
  describe(): string {
    return `${this.name} has area ${this.area()}`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super("Circle"); // must call super() before using `this` in a subclass
  }
  override area(): number {
    return Math.PI * this.radius ** 2;
  }
}
console.log(new Circle(2).describe());

// ---- 6. Abstract classes ----
// Can't be instantiated directly — they exist to be extended, and can force
// subclasses to implement certain methods.
abstract class Repository<T> {
  protected items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }
  abstract findById(id: number): T | undefined; // must be implemented by subclasses
}

interface Task {
  id: number;
  title: string;
}
class TaskRepository extends Repository<Task> {
  findById(id: number): Task | undefined {
    return this.items.find((t) => t.id === id);
  }
}
const repo = new TaskRepository();
repo.add({ id: 1, title: "Learn TypeScript" });
console.log(repo.findById(1));

// ---- 7. Implementing an interface on a class ----
interface Comparable {
  compareTo(other: this): number;
}
class Money implements Comparable {
  constructor(public cents: number) {}
  compareTo(other: Money): number {
    return this.cents - other.cents;
  }
}

// ---- 8. Static members ----
class MathUtils {
  static PI = 3.14159;
  static square(n: number): number {
    return n * n;
  }
}
console.log(MathUtils.square(5)); // called on the class, not an instance

// ============================================================
// EXERCISE 1: Write a `Stack<T>` class with a private `items: T[]`, and
// methods `push(item: T): void`, `pop(): T | undefined`, `peek(): T |
// undefined`, and `get size(): number` (a getter). Make it generic so it
// works for a Stack<number> or Stack<string>.
// ============================================================

// EXERCISE 2: Create an abstract class `Employee` with an abstract method
// `calculatePay(): number`, then two subclasses `SalariedEmployee` (fixed
// monthly pay) and `HourlyEmployee` (hourlyRate * hoursWorked). Implement
// `calculatePay()` on each.

// EXERCISE 3: Give `BankAccount` (above) a `withdraw(amount: number): void`
// method that throws if `amount` is more than the current balance.
