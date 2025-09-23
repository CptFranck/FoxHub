import { Resource } from '@/class/Resource.ts'
import Duration from 'ts-time/Duration'

function isInt(value : number): boolean {
  return value % 1 === 0
}

function removeFloat(value : number): number {
  return value - (value % 1)
}

export interface RecipeEntry {
  resource: Resource;
  ratio: number;
}

export class Recipe {
  inputs: RecipeEntry[];
  outputs: RecipeEntry[];
  time : Duration;
  processTime : Duration;
  // personalOutputLimit: number;
  // static publicStockpileLimit: number = 32000;

  constructor(
    inputs: RecipeEntry[],
    outputs: RecipeEntry[],
    time: Duration,
    // personalOutputLimit: number
  ) {
    this.inputs = inputs;
    this.outputs = outputs;
    this.time = time;
    this.processTime = Duration.of(0);
    this.updateOutputValue();
    // this.personalOutputLimit = personalOutputLimit;
  }

  updateOutputValue() {
    let cycle = this.computeMaxProdCycle();
    if(!isInt(cycle)) cycle = removeFloat(cycle);
    this.processTime = this.time.multiply(cycle);
    this.outputs.forEach(output => output.resource.quantity = cycle * output.ratio);
  }

  updateInputValue() {
    const cycle = this.computeMinProdCycle();
    this.processTime = this.time.multiply(cycle);
    this.inputs.forEach(input => input.resource.quantity = cycle * input.ratio)
  }

  private computeMaxProdCycle() : number{
    let cycles = Infinity;
    for (const key in this.inputs) {
      const entry = this.inputs[key];
      const possibleCycles = entry.resource.quantity / entry.ratio;
      if (possibleCycles < cycles) cycles = possibleCycles;
    }
    if (cycles < 0) cycles = 0;
    return cycles;
  }

  private computeMinProdCycle() : number{
    let minCycles = 0;
    for (const key in this.outputs) {
      const output = this.outputs[key];
      const possibleCycles = output.resource.quantity * output.ratio;
      if (minCycles < possibleCycles ) minCycles = possibleCycles;
    }
    if (minCycles < 0) minCycles = 0;
    return minCycles;
  }
}
