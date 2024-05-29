<template>
  <main class="p-4">
    <Card class="xl:col-span-2">
      <CardHeader class="flex flex-row items-center">
        <div class="grid gap-2">
          <CardTitle>Mahsulotlar</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Mahsulot nomi</TableHead>
              <TableHead>Miqdor turi</TableHead>
              <TableHead>Miqdor</TableHead>
              <TableHead>Narxi</TableHead>
              <TableHead>Sana</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in products" :key="item">
              <TableCell>{{ item.id }}</TableCell>
              <TableCell>{{ item.name }}</TableCell>
              <TableCell>{{ item.amount_type }}</TableCell>
              <TableCell>{{ item.amount }}</TableCell>
              <TableCell>{{ item.price }}so'm</TableCell>
              <TableCell>{{ item.date }}</TableCell>
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
const products = ref<any>(null);
async function getProducts() {
  const res: any = await services.getProducts(store.token);
  products.value = res;
}
onMounted(() => {
  getProducts();
});
</script>

<style scoped></style>
