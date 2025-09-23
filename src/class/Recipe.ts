import { Resource } from '@/class/Resource.ts'

export interface RecipeEntry {
  resource: Resource;
  ratio: number;
}

export class Recipe {
  inputs: RecipeEntry[];
  outputs: RecipeEntry[];
  // time : ;
  // personalOutputLimit: number;
  // publicStockpileLimit: number;

  constructor(
    inputs: RecipeEntry[],
    outputs: RecipeEntry[]
  ) {
    this.inputs = inputs;
    this.outputs = outputs;
  }

  updateOutputValue() {
    const cycle = this.computeMaxProdCycle();
    this.outputs.forEach(output => (cycle * output.ratio % 1 === 0)
      && (output.resource.quantity = cycle * output.ratio))
  }

  updateInputValue() {
    const cycle = this.computeMinProdCycle();
    this.inputs.forEach(input => (cycle * input.ratio % 1 === 0)
      && (input.resource.quantity = cycle * input.ratio))
  }

  private computeMaxProdCycle() : number{
    let cycles = Infinity;
    for (const key in this.inputs) {
      const entry = this.inputs[key];
      const possibleCycles = entry.resource.quantity / entry.ratio;
      if (possibleCycles < cycles) cycles = possibleCycles;
    }
    return cycles;
  }

  private computeMinProdCycle() : number{
    let minimumCycles = 0;
    for (const key in this.outputs) {
      const output = this.outputs[key];
      const possibleCycles = output.resource.quantity * output.ratio;
      if (minimumCycles < possibleCycles ) minimumCycles = possibleCycles;
    }
    return minimumCycles;
  }
}
