<script setup lang="ts">
import { Recipe } from '@/class/Recipe.ts'
  import { Resource } from '@/class/Resource.ts'
  import { ref } from 'vue'
  import Duration from 'ts-time/Duration'
  import RefineryRow from '@/components/Refinery/RefineryRow.vue'

  defineOptions({
    name: 'RefineryComponent'
  });

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

  const orderPrivacy = ref(false);

  const refiningOption = ref<Recipe[]>([
    new Recipe([{resource : new Resource("Salvage", 0), ratio: 2 }],
              [{resource: new Resource("Basic Material", 0), ratio: 1 }],
              Duration.ofMs(480)),
    new Recipe([{ resource: new Resource("Salvage", 0), ratio: 5 }],
              [{ resource: new Resource("Diesel", 0), ratio: 1 }],
              Duration.ofSeconds(12))
  ]);

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
        <RefineryRow v-for="(recipe, kr) in refiningOption" :key="kr" :recipe="recipe" />
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
</style>


