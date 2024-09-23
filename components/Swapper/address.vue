<script setup lang="ts">
import {
  SwitchRoot,
  SwitchThumb,
  CollapsibleContent,
  CollapsibleRoot,
} from 'radix-vue'
import useFormState from './formState'

const formState = useFormState()

// const open = ref(false)

const openWarn = ref(false)
</script>
<template>
  <fieldset>
    <CollapsibleRoot v-model:open="formState.externalAddress">
      <div class="flex items-center gap-4">
        <SwitchRoot
          id="another address"
          v-model:checked="formState.externalAddress"
          class="relative h-[16px] w-[32px] cursor-default rounded-full bg-zinc-200 outline-1 outline-offset-2 focus-within:outline focus-within:outline-black data-[state=checked]:bg-zinc-400"
        >
          <SwitchThumb
            class="my-auto block size-5 -translate-y-0.5 rounded-full border border-zinc-300 bg-white shadow-md transition-transform will-change-transform data-[state=checked]:translate-x-[12px]"
          />
        </SwitchRoot>
        <label
          class="select-none text-sm font-medium leading-none"
          for="another address"
        >
          Send to another address
        </label>
      </div>

      <CollapsibleContent>
        <div>
          <label class="hidden" hidden for="address">Address</label>
          <input
            id="address"
            v-model="formState.address"
            name="address"
            type="text"
            :disabled="!formState.externalAddress"
            class="mt-4 w-full rounded-sm bg-zinc-100 p-1 font-medium hover:bg-zinc-200/70"
            placeholder="Enter the address here"
          />

          <p
            v-if="formState.errors?.address?._errors"
            class="mt-4 block text-sm text-red-700"
          >
            {{ formState.errors?.address?._errors[0] }}
          </p>

          <CollapsibleRoot v-model:open="openWarn">
            <button
              type="button"
              class="mt-4 w-full rounded-md border border-yellow-200 bg-yellow-50 p-1 text-left text-sm text-yellow-900"
              @click="openWarn = !openWarn"
            >
              <IconWarning
                class="mx-1 inline size-4 fill-yellow-900 align-text-bottom"
              />
              <span class="inline align-middle"
                >Please be careful with the address you enter.</span
              >
              <CollapsibleContent>
                <div class="mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Porro, molestiae reiciendis numquam maxime inventore obcaecati
                  eos ipsa laborum ut tempora neque recusandae non, aliquam
                  ipsum necessitatibus hic quaerat? Perferendis, facilis?
                </div>
              </CollapsibleContent>
            </button>
          </CollapsibleRoot>
        </div>
      </CollapsibleContent>
    </CollapsibleRoot>
  </fieldset>
</template>
