<script setup lang="ts">
import { code } from '#imports'

const language = computed(() => {
  if (typeof currentParser.value.editorLanguage === 'string') {
    return currentParser.value.editorLanguage
  }
  return currentParser.value.editorLanguage(options.value)
})
</script>

<template>
  <main h-screen flex style="flex-direction: column">
    <NavBar mb-1 />
    <div class="app-content">
      <a-card title="源代码">
        <CodeEditor v-model="code" :language="language" />
      </a-card>
      <a-card title="解析"> <AstViewer /></a-card>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.app-content {
  flex: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 1em;
  grid-column-gap: 1em;
  box-sizing: border-box;
  overflow: hidden;
  :deep(.arco-card) {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    .arco-card-header {
      flex-shrink: 0;
    }
    .arco-card-body {
      flex: auto;
      overflow: auto;
      padding: 0;
    }
  }
}
</style>
