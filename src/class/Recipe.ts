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

  computeMaxProdCycle() : number{
    let cycles = Infinity;
    for (const key in this.inputs) {
      const entry = this.inputs[key];
      const possibleCycles = entry.resource.quantity / entry.ratio;
      if (possibleCycles < cycles) cycles = possibleCycles;
    }
    return cycles;
  }

  computeMinProdCycle() : number{
    let minimumCycles = 0;
    for (const key in this.outputs) {
      const output = this.outputs[key];
      const possibleCycles = output.resource.quantity * output.ratio;
      if (minimumCycles < possibleCycles ) minimumCycles = possibleCycles;
    }
    return minimumCycles;
  }
}
