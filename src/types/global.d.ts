export {};

declare global {
  interface Window {
    Cypress?: boolean;
    store?: any;
  }
}
