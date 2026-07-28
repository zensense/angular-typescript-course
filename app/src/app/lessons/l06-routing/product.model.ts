export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Mechanical Keyboard', price: 89.99, description: 'Tactile switches, hot-swappable.' },
  { id: 2, name: 'Ultrawide Monitor', price: 349.0, description: '34" curved, 144Hz.' },
  { id: 3, name: 'USB-C Dock', price: 59.5, description: '10-port dock with 100W passthrough.' },
];
