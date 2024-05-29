<script setup lang="ts">
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-vue-next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useStore } from "~~/store/store";
import statistics from "~/services/statistics";
import services from "~/services/services";
const store = useStore();
const expenses = ref<any>(0);
const inComes = ref<any>(0);
const profit = ref<any>(0);
async function getExpenses() {
  const res = await statistics.getStatisitcs(store.token);
  expenses.value = res;
}
async function getInComes() {
  const res = await statistics.getInComes(store.token);
  inComes.value = res;
}
async function getProfit() {
  const res = await statistics.getProfit(store.token);
  profit.value = res;
}
const customers = ref<any>(null);
async function getCustomers() {
  const res: any = await services.getCustomers(store.token);
  customers.value = res;
}
const supplies = ref<any>(null);
async function getSuupplies() {
  const res: any = await services.getSupplies(store.token);
  supplies.value = res;
}
const products = ref<any>(null);
async function getProducts() {
  const res: any = await statistics.getProductsStatistic(store.token);
  products.value = res;
}
const customerseStatistic = ref<any>(null);
async function getCustomersStatittic() {
  const res: any = await statistics.getCustomersStatittic(store.token);
  customerseStatistic.value = res;
}
onMounted(() => {
  getProducts();
  getExpenses();
  getCustomersStatittic();
  getInComes();
  getProfit();
  getCustomers();
  getSuupplies();
});
</script>

<template>
  <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
    <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      <Card>
        <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <CardTitle class="text-sm font-medium">Xarajatlar</CardTitle>
          <DollarSign class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ expenses }}so'm</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <CardTitle class="text-sm font-medium">Daromadlar</CardTitle>
          <DollarSign class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ inComes }}so'm</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <CardTitle class="text-sm font-medium">Sof foyda</CardTitle>
          <DollarSign class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ profit }}so'm</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <CardTitle class="text-sm font-medium">Jami mahsulotlar</CardTitle>
          <Activity class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ products }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <CardTitle class="text-sm font-medium">Mijozlar</CardTitle>
          <Activity class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">+{{ customerseStatistic }}</div>
        </CardContent>
      </Card>
    </div>
    <div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <Card class="xl:col-span-2">
        <CardHeader class="flex flex-row items-center">
          <div class="grid gap-2">
            <CardTitle>Ta'minot</CardTitle>
          </div>
          <Button as-child size="sm" class="ml-auto gap-1">
            <NuxtLink to="/supplies">
              barcha ta'minotlar
              <ArrowUpRight class="h-4 w-4" />
            </NuxtLink>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Ta'mino nomi</TableHead>
                <TableHead>Miqdor turi</TableHead>
                <TableHead>Miqdor</TableHead>
                <TableHead>Narxi</TableHead>
                <TableHead>Sana</TableHead>
                <TableHead class="text-right">Xolati</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="item in supplies?.data" :key="item">
                <TableCell>{{ item.id }}</TableCell>
                <TableCell>{{ item.name }}</TableCell>
                <TableCell>{{ item.amount_type }}</TableCell>
                <TableCell>{{ item.amount }}</TableCell>
                <TableCell>{{ item.price }}so'm</TableCell>
                <TableCell>{{ item.date }}</TableCell>
                <TableCell class="text-right">
                  <Badge v-if="item.status">Active</Badge>
                  <Badge v-else variant="destructive">Active emas</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Mijozlar</CardTitle>
        </CardHeader>
        <CardContent class="grid gap-8">
          <div
            class="flex items-center gap-4"
            v-for="item in customers?.data"
            :key="item"
          >
            <Avatar class="hidden h-9 w-9 sm:flex">
              <AvatarFallback>{{
                item.name?.slice(0, 1).toUpperCase()
              }}</AvatarFallback>
            </Avatar>
            <div class="grid gap-1">
              <p class="text-sm font-medium leading-none">{{ item.name }}</p>
              <p class="text-sm text-muted-foreground">{{ item.number }}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </main>
</template>
