<script setup lang="ts">
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-vue-next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import services from "~/services/services";
import { useStore } from "~/store/store";
const store: any = useStore();
const route: any = useRoute();
function logout() {
  localStorage.clear();
  window.location.href = "/login";
}
function getUserInfo() {
  try {
    const res: any = services.getUserInfo(store.token);
  } catch (err) {
    localStorage.clear();
    window.location.href = "/login";
  }
}
onMounted(() => {
  getUserInfo();
});
watch(route.params, (newValue: any, oldValue: any) => {
  getUserInfo();
});
</script>

<template>
  <div
    class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
  >
    <div class="hidden border-r bg-muted/40 md:block">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <NuxtLink to="/" class="flex items-center gap-2 font-semibold">
            <Package2 class="h-6 w-6" />
            <span class="">Oil</span>
          </NuxtLink>
        </div>
        <div class="flex-1">
          <nav class="aside grid items-start px-2 text-sm font-medium lg:px-4">
            <NuxtLink
              to="/"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Home class="h-4 w-4" />
              Bosh sahifa
            </NuxtLink>
            <NuxtLink
              to="/supplies"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ShoppingCart class="h-4 w-4" />
              Ta'minot
            </NuxtLink>
            <NuxtLink
              to="/products"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Package class="h-4 w-4" />
              Mahsulotlar
            </NuxtLink>
            <NuxtLink
              to="/orders"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Package class="h-4 w-4" />
              Buyurtmalar
            </NuxtLink>
            <NuxtLink
              to="/trades"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Package class="h-4 w-4" />
              Savdolar
            </NuxtLink>
            <NuxtLink
              to="/customers"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users class="h-4 w-4" />
              Mijozlar
            </NuxtLink>
          </nav>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <header
        class="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6"
      >
        <Sheet>
          <SheetTrigger as-child>
            <Button variant="outline" size="icon" class="shrink-0 md:hidden">
              <Menu class="h-5 w-5" />
              <span class="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" class="flex flex-col">
            <nav class="grid gap-2 text-lg font-medium">
              <NuxtLink
                to="/"
                class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home class="h-4 w-4" />
                Bosh sahifa
              </NuxtLink>
              <NuxtLink
                to="/supplies"
                class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ShoppingCart class="h-4 w-4" />
                Ta'minot
              </NuxtLink>
              <NuxtLink
                to="/products"
                class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Package class="h-4 w-4" />
                Mahsulotlar
              </NuxtLink>
              <NuxtLink
                to="/orders"
                class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Package class="h-4 w-4" />
                Buyurtmalar
              </NuxtLink>
              <NuxtLink
                to="/trades"
                class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Package class="h-4 w-4" />
                Savdolar
              </NuxtLink>
              <NuxtLink
                to="/customers"
                class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users class="h-4 w-4" />
                Mijozlar
              </NuxtLink>
            </nav>
          </SheetContent>
        </Sheet>
        <div class="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="secondary" size="icon" class="rounded-full">
                <CircleUser class="h-5 w-5" />
                <span class="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem @click="logout()">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <NuxtPage />
    </div>
  </div>
</template>
