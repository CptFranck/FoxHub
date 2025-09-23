import { Resource } from '@/class/Resource.ts'
import Duration, { HOUR_DURATION, MINUTE_DURATION, SECOND_DURATION } from 'ts-time/Duration'

function isInt(value : number): boolean {
  return value % 1 === 0
}

function removeFloat(value : number): number {
  return value - (value % 1)
}

export function formatDuration(duration: Duration): string {
  const days = Math.floor(duration.ms / Duration.ofDays(1).ms);
  const hours = Math.floor((duration.ms % Duration.ofDays(1).ms) / HOUR_DURATION.ms);
  const minutes = Math.floor((duration.ms % HOUR_DURATION.ms) / MINUTE_DURATION.ms);
  const seconds = Math.floor((duration.ms % MINUTE_DURATION.ms) / SECOND_DURATION.ms);

  const parts : string[] = [];
  parts.push(`${days}d`);
  parts.push(`${hours}h`);
  parts.push(`${minutes}m`);
  parts.push(`${seconds}s`);

  return parts.join(" ") || "0s";
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
