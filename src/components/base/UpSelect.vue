<template>
  <ValidationProvider
    :name="label"
    :rules="rules"
    v-slot="{ errors }"
    :vid="vid"
  >
    <v-select
      v-model="innerValue"
      :dense="dense"
      :label="label"
      v-bind="$attrs"
      v-on="$listeners"
      :error-messages="errors"
    >
      <!-- wrapping 콤포넌트의 모든 템플릿을 상속 받기 -->
      <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </v-select>
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
      default: "",
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
      default: null,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    vid: {
      type: String,
    },
  },
  data() {
    return {
      innerValue: null,
    };
  },
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
