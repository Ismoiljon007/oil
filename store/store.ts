import { defineStore } from "pinia";

export const useStore = defineStore("store", () => {
  let token = ref<string | null | undefined>("");
  return token;
});
