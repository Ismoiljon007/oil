import { useStore } from "~/store/store";

export default defineNuxtRouteMiddleware((to: any, from: any) => {
  const store: any = useStore();

  if (to.path != "/login" && !localStorage.getItem("auth")) {
    return navigateTo("/login");
  }
  if (localStorage.getItem("auth") && to.path == "/login") {
    return navigateTo("/");
  }
});
