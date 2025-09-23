<script setup lang="ts">
import { formatDuration, Recipe } from '@/class/Recipe.ts'
  import { Resource } from '@/class/Resource.ts'
  import { ref } from 'vue'
  import Duration from 'ts-time/Duration'

  defineOptions({
    name: 'RefineryComponent'
  });

  const orderPrivacy = ref(false);

  const refiningOption = ref([
    new Recipe([{resource : new Resource("Salvage", 0), ratio: 2 }],
              [{resource: new Resource("Basic Material", 0), ratio: 1 }],
              Duration.ofMs(480)),
    new Recipe([{ resource: new Resource("Salvage", 0), ratio: 5 }],
              [{ resource: new Resource("Diesel", 0), ratio: 1 }],
              Duration.ofSeconds(12))
  ]);
  // basicMaterial: {
  //   inputs: { resource : salvage,  value: 0 },
  //   outputs: [{ name: "Basic Material", type: "basicMaterial", value: 0 }],
  //   // time: { h: 0, min: 0, sec: 0, ms: 48 },
  //   personalOutputLimit: 12500,
  //   publicStockpileLimit: 32000,
  // },
  // diesel: {
  //   inputs: { salvage: 5 },
  //   outputs: { gas: 1 },
  //   time: { h: 0, min: 0, sec: 12, ms: 0 },
  //   personalOutputLimit: 6000,
  //   publicStockpileLimit: 32000,
  // },
  // };

</script>
<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>Ressource</th>
        <th>Ratio</th>
        <th>Produced</th>
        <th>Output limit</th>
        <th>Process Time</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(recipe, kr) in refiningOption" :key="kr">
        <td>
          <span v-for="(input, ki) in recipe.inputs" :key="ki" class="cell-item">
            <span class="cell-label">{{ input.resource.name }}</span>
            <input type="number"
                   v-model.number="input.resource.quantity"
                   @input="recipe.updateOutputValue()"
                   min="0"
            >
          </span>
        </td>
        <td>
          {{ Object.values(recipe.inputs).map(i => i.ratio).join(' + ') }}
          →
          {{ Object.values(recipe.outputs).map(o => o.ratio).join(' + ') }}
        </td>
        <td>
          <span v-for="(output, ko) in recipe.outputs" :key="ko" class="cell-item" >
            <span class="cell-label">{{ output.resource.name }}</span>
            <input type="number"
                   v-model.number="output.resource.quantity"
                   @input="recipe.updateInputValue()"
                   min="0"
            >
          </span>
        </td>
        <td>/...</td>
        <td>{{ formatDuration(recipe.processTime)}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

table {
  margin-top: 1rem;
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  border: none;
  vertical-align: middle; /* aligne le contenu au centre verticalement */
  white-space: nowrap;
  text-align: left;
}

.cell-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.cell-label {
  flex: 1;
  text-align: left;
}

</style>


