<script setup lang="ts">
import { Recipe } from '@/class/Recipe.ts'
  import { Resource } from '@/class/Resource.ts'
  import { ref } from 'vue'
  import Duration from 'ts-time/Duration'
  import RefineryRow from '@/components/Refinery/RefineryRow.vue'
import { usePrivacyStore } from '@/stores/privacy.ts'

  defineOptions({
    name: 'RefineryComponent'
  });

  const orderPrivacy = usePrivacyStore();

  const refiningOption = ref<Recipe[]>([
    new Recipe([{resource : new Resource("Salvage", 0), ratio: 2 }],
              [{resource: new Resource("Basic Material", 0), ratio: 1 }],
              Duration.ofMs(480),
              12500),
    new Recipe([{ resource: new Resource("Salvage", 0), ratio: 5 }],
              [{ resource: new Resource("Diesel", 0), ratio: 1 }],
              Duration.ofSeconds(12),
      6000)
  ]);

</script>

<template>
  <div>
    <button @click="orderPrivacy.toggle()">
      {{ orderPrivacy.privacy }}
    </button>
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
        <RefineryRow v-for="(recipe, kr) in refiningOption"
                     :key="kr"
                     :recipe="recipe"
                     :orderPrivacy="orderPrivacy.privacy"
        />
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


