<template>
  <Toaster />
  <main class="p-4">
    <Card class="xl:col-span-2">
      <CardHeader class="flex flex-row items-center">
        <div class="grid gap-2">
          <CardTitle>Ta'minot</CardTitle>
        </div>
        <Dialog>
          <DialogTrigger as-child>
            <Button as-child size="sm" class="ml-auto gap-1">
              <div class="flex pointer select-none">
                <span>Ta'minot qo'shish</span>
                <ArrowUpRight class="h-4 w-4" />
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent class="fixed">
            <DialogHeader>
              <DialogTitle>Ta'minot qo'shish</DialogTitle>
            </DialogHeader>
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="text-left">Nomi</Label>
                <Input
                  v-model="suppliesName"
                  id="name"
                  type="text"
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
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="amount_type" class="text-left">Miqdor turi</Label>
                <Input
                  v-model="amountType"
                  id="amount_type"
                  type="text"
                  class="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" @click="addSupplies()">Qo'shish</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
              <TableHead class="text-right">action</TableHead>
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
              <TableCell class="text-right flex items-center gap-2">
                <Dialog>
                  <DialogTrigger as-child>
                    <Button
                      @click="
                        (orderId = item.id),
                          (suppliesName = item.name),
                          (price = item.price),
                          (amount = item.amount),
                          (amountType = item.amount_type);
                        statusItem = item.status;
                      "
                      as-child
                      size="sm"
                      class="ml-auto gap-1"
                    >
                      <div class="flex pointer select-none">
                        <span>Tahrirlash</span>
                        <ArrowUpRight class="h-4 w-4" />
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent class="fixed">
                    <DialogHeader>
                      <DialogTitle>Ta'minot tahrirlash</DialogTitle>
                    </DialogHeader>
                    <div class="grid gap-4 py-4">
                      <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="name" class="text-left">Nomi</Label>
                        <Input
                          v-model="suppliesName"
                          id="name"
                          type="text"
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
                      <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="amount_type" class="text-left"
                          >Miqdor turi</Label
                        >
                        <Input
                          v-model="amountType"
                          id="amount_type"
                          type="text"
                          class="col-span-3"
                        />
                      </div>
                      <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="status" class="text-left">status</Label>
                        <Input
                          id="status"
                          type="checkbox"
                          @change="statusItem = $event.target.checked"
                          class="w-[18px] h-[18px]"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" @click="activeSupplies()"
                        >Yangilash</Button
                      >
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <button class="flex" @click="deleteSpplies(item.id)">
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
const supplies = ref<any>(null);
async function getSuupplies() {
  const res: any = await services.getSupplies(store.token);
  supplies.value = res;
}
onMounted(() => {
  getSuupplies();
});
const suppliesName = ref<string>("");
const price = ref<number>(0);
const amount = ref<number>(0);
const orderId = ref<number | string>(0);
const amountType = ref<string>("");
const statusItem = ref<boolean | string>(false);
interface suppliesAdd {
  name: string;
  price: number;
  amount: number;
  amount_type: string;
  category: string;
}
async function addSupplies() {
  const body: suppliesAdd = {
    name: suppliesName.value,
    price: price.value,
    amount: amount.value,
    amount_type: amountType.value,
    category: "string",
  };
  try {
    const res: any = await services.addSupplies(store.token, body);

    toast({
      description: "Success",
      class: "border-lime-500 bg-lime-500 text-white",
    });
    getSuupplies();
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
async function activeSupplies() {
  interface activeAdd {
    name: string;
    price: number;
    amount: number;
    amount_type: string;
    category: string;
    status: boolean | string;
    id: number | string;
  }
  const body: activeAdd = {
    name: suppliesName.value,
    price: price.value,
    amount: amount.value,
    amount_type: amountType.value,
    category: "string",
    status: statusItem.value,
    id: orderId.value,
  };
  try {
    const res: any = await services.activeSupplies(store.token, body);
    toast({
      description: "Success",
      class: "border-lime-500 bg-lime-500 text-white",
    });
    getSuupplies();
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
async function deleteSpplies(id: number | string) {
  try {
    const res: any = await services.deleteSupplies(store.token, id);
    toast({
      description: "Success",
      class: "border-lime-500 bg-lime-500 text-white",
    });
    getSuupplies();
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
