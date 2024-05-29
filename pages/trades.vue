<template>
  <main class="p-4">
    <Card class="xl:col-span-2">
      <CardHeader class="flex flex-row items-center">
        <div class="grid gap-2">
          <CardTitle>Savdolar</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Mahsulot idsi</TableHead>
              <TableHead>Miqdor</TableHead>
              <TableHead>Narxi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="el in trades" :key="el">
              <TableCell>{{ el.id }}</TableCell>
              <TableCell>{{ el.product_id }}</TableCell>
              <TableCell>{{ el.amount }}</TableCell>
              <TableCell>{{ el.price }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </main>
</template>

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStore } from "~~/store/store";
import services from "~/services/services";
const store: any = useStore();
const trades = ref<any>(null);
async function getTrades() {
  const res: any = await services.getTrades(store.token);
  trades.value = res;
}
onMounted(() => {
  getTrades();
});
</script>

<style scoped></style>
