<template>
<ValidationProvider :name="label" :rules="rules" v-slot="{ errors }" :vid="vid">
    <v-text-field v-model="innerValue" :dense="dense" :label="label" v-bind="$attrs" v-on="$listeners" :error-messages="errors" autocomplete="off">
      <template #append>
        <slot name="append" />
      </template>
      <template #append-outer>
        <slot name="append-outer" />
      </template>
      <template #default>
        <slot name="default" />
      </template>
      <template #label>
        <slot name="label" />
      </template>
      <template #message>
        <slot name="message" />
      </template>
      <template #prepend>
        <slot name="prepend" />
      </template>
      <template #prepend-inner>
        <slot name="prepend-inner" />
      </template>
       <template #progress>
        <slot name="progress" />
      </template>
    </v-text-field>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";
export default {
  components: {
    ValidationProvider,
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    rules: {
      type: [Object, String],
      default: "",
    },
    value: {
      type: [String, Number],
    },
    roles: {
      type: Array,
      default: null
    },
    dense: {
      type: Boolean,
      default: false
    },
    vid: {
      type: String,
    }
  },
  data: () => ({
    innerValue: "",
  }),
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit("input", newVal);
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal;
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  },
};
</script>