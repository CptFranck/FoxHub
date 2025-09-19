import { Resource } from '@/class/Resource.ts'

interface RecipeEntry {
  resource: Resource;
  ratio: number;
}

export class Recipe {
  inputs: Record<string, RecipeEntry>;
  outputs: Record<string, RecipeEntry>;
  // time : ;
  // personalOutputLimit: number;
  // publicStockpileLimit: number;

  constructor(
    inputs: Record<string, RecipeEntry>,
    outputs: Record<string, RecipeEntry>
  ) {
    this.inputs = inputs;
    this.outputs = outputs;
  }

  refine() {
    const cycles = this.computeMaximumCycle();

    for (const key in this.outputs) {
      const entry = this.outputs[key];
      entry.resource.quantity += entry.ratio * cycles;
    }

    for (const key in this.inputs) {
      const entry = this.inputs[key];
      entry.resource.quantity -= entry.ratio * cycles;
    }
  }

  private computeMaximumCycle() : number{
    let cycles = Infinity;
    for (const key in this.inputs) {
      const entry = this.inputs[key];
      const possibleCycles = entry.resource.quantity / entry.ratio;
      if (possibleCycles < cycles) cycles = possibleCycles;
    }
    return cycles;
  }
}
