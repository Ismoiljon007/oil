<template>
  <Toaster />
  <main class="p-4">
    <Card class="xl:col-span-2">
      <CardHeader class="flex flex-row items-center">
        <div class="grid gap-2">
          <CardTitle>Buyurtmalar</CardTitle>
        </div>
        <Dialog>
          <DialogTrigger as-child>
            <Button as-child size="sm" class="ml-auto gap-1">
              <div class="flex pointer select-none">
                <span>Buyurtma qo'shish</span>
                <ArrowUpRight class="h-4 w-4" />
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent class="fixed">
            <DialogHeader>
              <DialogTitle>Buyurtma qo'shish</DialogTitle>
            </DialogHeader>
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="text-left">Mijoz qidirish</Label>
                <Input
                  @input="serachCustomer()"
                  v-model="search"
                  id="name"
                  type="text"
                  class="col-span-3"
                />
              </div>
              <div
                class="flex items-center gap-4 cursor-pointer"
                @click="addOrder(item.id)"
                v-for="item in customers?.data"
                :key="item"
              >
                <Avatar class="hidden h-9 w-9 sm:flex">
                  <AvatarFallback>{{
                    item.name?.slice(0, 1).toUpperCase()
                  }}</AvatarFallback>
                </Avatar>
                <div class="grid gap-1">
                  <p class="text-sm font-medium leading-none">
                    {{ item.name }}
                  </p>
                  <p class="text-sm text-muted-foreground">{{ item.number }}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Xolati</TableHead>
              <TableHead>Mijoz ismi</TableHead>
              <TableHead>Mijoz telefon raqami</TableHead>
              <TableHead class="text-left">Savdolar</TableHead>
              <TableHead class="text-right">action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in orders?.data" :key="item">
              <TableCell>{{ item.id }}</TableCell>
              <TableCell>
                <Badge v-if="item.status">Active</Badge>
                <Badge
                  class="cursor-pointer"
                  @click="updateOrder(item.id)"
                  v-else
                  variant="destructive"
                  >Active qilish
                </Badge>
              </TableCell>
              <TableCell>{{ item.customer.name }}</TableCell>
              <TableCell>{{ item.customer.number }}</TableCell>
              <TableCell class="text-left" v-if="item.trades.length">
                <Dialog class="flex flex-col w-screen">
                  <DialogTrigger as-child>
                    <Button as-child size="sm" class="ml-auto gap-1">
                      <div class="flex pointer select-none">
                        <span>Savdolarnni ko'rish</span>
                        <ArrowUpRight class="h-4 w-4" />
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    class="w-full grid grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]"
                  >
                    <DialogHeader class="p-6 pb-0">
                      <DialogTitle>Savdolar</DialogTitle>
                    </DialogHeader>
                    <div class="grid gap-4 py-4 overflow-y-auto px-6">
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
                          <TableRow v-for="el in item.trades" :key="el">
                            <TableCell>{{ el.id }}</TableCell>
                            <TableCell>{{ el.product_id }}</TableCell>
                            <TableCell>{{ el.amount }}</TableCell>
                            <TableCell>{{ el.price }}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell class="text-left" v-else>
                <Dialog>
                  <DialogTrigger as-child>
                    <Button @click="orderId = item.id" as-child size="sm" class="ml-auto gap-1">
                      <div class="flex pointer select-none">
                        <span>Savdo qilish</span>
                        <ArrowUpRight class="h-4 w-4" />
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent class="fixed">
                    <DialogHeader>
                      <DialogTitle>Savdo qilish</DialogTitle>
                    </DialogHeader>
                    <div class="grid gap-4 py-4">
                      <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="name" class="text-left"
                          >Maxsulot idsi</Label
                        >
                        <Input
                          v-model="productId"
                          id="name"
                          type="number"
                          class="col-span-3"
                        />
                      </div>
                      <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="price" class="text-left">Narxi</Label>
                        <Input
                          v-model="price"
                          id="price"
                          type="number"
                          class="col-span-3"
                        />
                      </div>
                      <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="amount" class="text-left">Miqdor</Label>
                        <Input
                          v-model="amount"
                          id="amount"
                          type="number"
                          class="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" @click="buyOrder()">Sotish</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell class="flex h-full items-center justify-end gap-2">
                <button class="flex" @click="deleteOrder(item.id)">
                  <Trash2 class="w-[18px] h-[18px] hover:stroke-red-500" />
                </button>
              </TableCell>
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
  Trash2,
  PencilLine,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useStore } from "~~/store/store";
import services from "~/services/services";
import { useToast } from "@/components/ui/toast/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toast";
const { toast } = useToast();
const store: any = useStore();
const orders = ref<any>(null);
async function getOrders() {
  const res: any = await services.getOrders(store.token);
  orders.value = res;
}
onMounted(() => {
  getOrders();
});
const search = ref<string>("");
const customers = ref<string>("");
async function addOrder(id: number | string) {
  try {
    const res: any = await services.addOrder(store.token, id);
    toast({
      description: "Success",
      class: "border-lime-500 bg-lime-500 text-white",
    });
    getOrders();
  } catch (err) {
    toast({
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
      variant: "destructive",
      action: h(
        ToastAction,
        {
          altText: "Try again",
        },
        {
          default: () => "Try again",
        }
      ),
    });
  }
}
async function deleteOrder(id: string | number) {
  try {
    const res: any = await services.deleteOrder(store.token, id);
    toast({
      description: "Success",
      class: "border-lime-500 bg-lime-500 text-white",
    });
    getOrders();
  } catch (err) {
    toast({
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
      variant: "destructive",
      action: h(
        ToastAction,
        {
          altText: "Try again",
        },
        {
          default: () => "Try again",
        }
      ),
    });
  }
}
async function updateOrder(id: string | number) {
  try {
    const res: any = await services.updateOrder(store.token, id);
    toast({
      description: "Success",
      class: "border-lime-500 bg-lime-500 text-white",
    });
    getOrders();
  } catch (err) {
    toast({
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
      variant: "destructive",
      action: h(
        ToastAction,
        {
          altText: "Try again",
        },
        {
          default: () => "Try again",
        }
      ),
    });
  }
}
async function serachCustomer() {
  const res: any = await services.searchUser(store.token, search.value);
  customers.value = res;
}
const productId = ref<number | string>(0);
const price = ref<number | string>(0);
const amount = ref<number | string>(0);
const orderId = ref<number | string>(0);
interface buyOrderInter {
  product_id: number | string;
  amount: number | string;
  price: number | string;
  order_id: number | string;
}
async function buyOrder() {
  const body: buyOrderInter = {
    product_id: productId.value,
    amount: amount.value,
    price: price.value,
    order_id: orderId.value,
  };
  try {
    const res: any = await services.buyOrder(store.token, body);
    toast({
      description: "Success",
      class: "border-lime-500 bg-lime-500 text-white",
    });
    getOrders();
  } catch (err) {
    toast({
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
      variant: "destructive",
      action: h(
        ToastAction,
        {
          altText: "Try again",
        },
        {
          default: () => "Try again",
        }
      ),
    });
  }
}
</script>

<style scoped></style>
