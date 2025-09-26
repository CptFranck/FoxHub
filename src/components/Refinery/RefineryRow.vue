<script setup lang="ts">
import { formatDuration, Recipe } from '@/class/Recipe.ts'
import { Privacy } from '@/class/PrivacyEnum.ts'

  defineProps<{
    recipe: Recipe
    orderPrivacy: Privacy
  }>()

</script>

<template>
  <tr>
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
    <td v-if="orderPrivacy === Privacy.PERSONAL">{{ recipe.personalOutputLimit }}</td>
    <td v-if="orderPrivacy === Privacy.PUBLIC">{{ Recipe.publicStockpileLimit }}</td>
    <td>{{ formatDuration(recipe.processTime)}}</td>
  </tr>
</template>

<style scoped>
  td {
    padding: 8px;
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
