<script setup lang="ts">
  defineOptions({
    name: 'RefineryComponent'
  });

  // const rawResources = {
  //   aluminum: 0,
  //   coal: 0,
  //   component: 0,
  //   copper: 0,
  //   damageComponent: 0,
  //   iron: 0,
  //   rareMaterial: 0,
  //   salvage: 0,
  //   sulfur: 0,
  //   wreckage: 0,
  // };
  //
  // const material = {
  //   basicMaterial: 0,
  //   coke: 0,
  //   constructionMaterial: 0,
  //   explosivePowder: 0,
  //   gravel: 0,
  //   heavyExplosivePowder: 0,
  //   refinedMaterials: 0,
  // };
  //
  // const technologyMaterials = {
  //   aluminiumAlloy: 0,
  //   copperAlloy: 0,
  //   ironAlloy: 0,
  // };
  //
  // const liquids = {
  //   diesel: 0,
  //   enrichedOil: 0,
  //   heavyOil: 0,
  //   oil: 0,
  //   petrol: 0,
  //   water: 0,
  // };


  const refiningOption = {
    basicMaterial: {
      inputs: { salvage: 2 },
      outputs: { basicMaterial: 1 },
      time: { h: 0, min: 0, sec: 0, ms: 48 },
      personalOutputLimit: 12500,
      publicStockpileLimit: 32000,
    },
    diesel: {
      inputs: { salvage: 5 },
      outputs: { gas: 1 },
      time: { h: 0, min: 0, sec: 12, ms: 0 },
      personalOutputLimit: 6000,
      publicStockpileLimit: 32000,
    },
  };
  const orderPrivacy = false;
</script>
<template>
  <div>
    <table border="1" cellpadding="8" cellspacing="0">
      <thead>
      <tr>
        <th>Ressource</th>
        <th>Needed</th>
        <th>Ratio</th>
        <th>Produced</th>
        <th>Ressource</th>
        <th>Output limit</th>
<!--        <th>Time</th>-->
      </tr>
      </thead>
      <tbody>
      <tr v-for="(recipe, key) in refiningOption" :key="key">
        <td><input></td>
        <td v-for="(value, input) in recipe.inputs" :key="input">{{input}}</td>
        <td>
          <p v-for="(value, input) in recipe.inputs" :key="input">{{value}} {{input}}</p>
          ->
          <p v-for="(value, output) in recipe.outputs" :key="output">{{value}} {{output}}</p>
        </td>
        <td v-for="(value, output) in recipe.outputs" :key="output">{{output}}</td>
        <td><input></td>
        <td>/{{ orderPrivacy ? recipe.personalOutputLimit : recipe.publicStockpileLimit }}</td>
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
