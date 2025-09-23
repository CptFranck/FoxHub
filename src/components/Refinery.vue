<script setup lang="ts">
  import { Recipe } from '@/class/Recipe.ts'
  import { Resource } from '@/class/Resource.ts'
  import { ref } from 'vue'

  defineOptions({
    name: 'RefineryComponent'
  });

  const refiningOption = ref([
    new Recipe([ {resource : new Resource("Salvage", 0), ratio: 2 }],
      [{resource: new Resource("Basic Material", 0), ratio: 1 }]),
    new Recipe([{ resource: new Resource("Salvage", 0), ratio: 5 }],
      [{ resource: new Resource("Diesel", 0), ratio: 1 }])
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
  // const orderPrivacy = ref(false);

</script>
<template>
  <div>
<!--    {{ Object.values(refiningOption).map(ro => ro.inputs.resource).map(i => i.resource.name + ":" + i.resource.quantity).join(', ') }}-->
<!--    {{ Object.values(refiningOption).map(ro => ro.outputs.resource).map(o => o.resource.name + ":" + o.resource.quantity).join(', ') }}-->
<!--        {{ Object.values(refiningOption).map(ro => ro.inputs[0].resource).map(r => r.name ).join(', ') }}-->
    {{  Object.values(refiningOption).map(ro => "r").join(', ') }}
    <table>
      <thead>
      <tr>
        <th>Ressource</th>
        <th>Ratio</th>
        <th>Produced</th>
        <th>Output limit</th>
        <th>Time</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(recipe, kr) in refiningOption" :key="kr">
        <td>
          <p v-for="(input, ki) in recipe.inputs" :key="ki">
            {{input.resource.name}}
            <input type="number"
                   v-model.number="input.resource.quantity"
                   @input="recipe.updateOutputValue()"
                   min="0"
            >
          </p>
        </td>
        <td>
          {{ Object.values(recipe.inputs).map(i => i.ratio + ' ' + i.resource.name).join(', ') }}
          →
          {{ Object.values(recipe.outputs).map(o => o.ratio + ' ' + o.resource.name).join(', ') }}
        </td>
        <td>
          <p v-for="(output, ko) in recipe.outputs" :key="ko">
            {{output.resource.name}}
            <input type="number"
                   v-model.number="output.resource.quantity"
                   @input="recipe.updateInputValue()"
                   min="0"
            >
          </p>
        </td>
<!--        <td>/{{ orderPrivacy ? recipe.personalOutputLimit : recipe.publicStockpileLimit }}</td>-->
<!--        <td>{{ new Date(recipe.time)}}</td>-->
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
  text-align: center;
}
</style>


