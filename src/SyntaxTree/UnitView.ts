import { View } from "./View";

export class UnitView implements View {
  spec: object;

  constructor(spec: object) {
    this.spec = spec;
  }

  export() {
    return this.spec;
  }
}