<script setup lang="ts">
import json5 from 'json5'
import { hideEmptyKeys, hideLocationData, loading } from '#imports'
import { Message } from '@arco-design/web-vue'

const IS_SAFARI = /Apple Computer/.test(globalThis.navigator?.vendor)

const serialized = computed(() => {
  try {
    return JSON.stringify(
      ast.value,
      (key: string, value: unknown) => {
        if (key === 'parseDiagnostics') return
        if (hideEmptyKeys.value && value == null) return
        if (
          [
            ...(hideLocationData.value ? ['loc', 'start', 'end', 'span'] : []),
            ...hideKeys.value.filter((v) => !!v),
          ].includes(key)
        )
          return
        if (typeof value === 'function') return `function ${value.name}(...)`
        if (typeof value === 'bigint') return `(BigInt) ${value}n`
        return value
      },
      2
    )
    // eslint-disable-next-line unicorn/catch-error-name
  } catch (err) {
    console.error(err)
    error.value = err
  }
})

const hideKeysValue = ref(JSON.stringify(hideKeys.value))

watchEffect(() => {
  try {
    hideKeys.value = json5.parse(hideKeysValue.value)
  } catch (error) {
    console.error(error)
    hideKeys.value = []
  }
})

function stringifyError(error: unknown) {
  if (error instanceof Error) {
    if (IS_SAFARI)
      return `${error}\n${error.stack
        ?.split('\n')
        .map((line) => {
          const [fn, file] = line.split('@', 2)
          return `${' '.repeat(4)}at ${fn} (${file})`
        })
        .join('\n')}`
    return error.stack
  }
  return String(error)
}

function print() {
  Message.success('请在控制台查看')
  // eslint-disable-next-line no-console
  console.info(ast.value)
}
</script>

<template>
  <div w-full h-full flex style="flex-direction: column">
    <div flex items-center p-1em>
      <a-form :layout="'inline'" :model="{}">
        <a-form-item label=" Hide empty keys">
          <a-checkbox v-model="hideEmptyKeys" />
        </a-form-item>
        <a-form-item label="Hide location data">
          <a-checkbox v-model="hideLocationData" />
        </a-form-item>
        <a-form-item label=" Hide keys:">
          <a-input v-model="hideKeysValue" />
        </a-form-item>
        <a-button @click="print" type="primary"> 控制台输出 </a-button>
      </a-form>
    </div>
    <div flex="~ 1" min-h-0 min-w-0>
      <div v-if="loading === 'load'">Loading parser...</div>
      <div v-else-if="loading === 'parse'">Parsing...</div>
      <div v-else-if="error" overflow-scroll text-red>
        <pre v-text="stringifyError(error)" />
      </div>
      <MonacoEditor
        v-else
        min-w-0
        flex-1
        lang="json"
        :model-value="serialized"
        :options="{
          automaticLayout: true,
          theme: isDark ? 'vs-dark' : 'vs',
          readOnly: true,
          fontSize: 14,
          tabSize: 2,
          minimap: {
            enabled: false,
          },
        }"
      />
    </div>
  </div>
</template>
