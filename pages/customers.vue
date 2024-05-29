<template>
  <Toaster />
  <main class="p-4">
    <Card>
      <CardHeader>
        <CardTitle>Mijozlar</CardTitle>
        <Dialog>
          <DialogTrigger as-child>
            <Button as-child size="sm" class="ml-auto gap-1">
              <div class="flex pointer select-none">
                <span>Mijoz qo'shish</span>
                <ArrowUpRight class="h-4 w-4" />
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent class="fixed">
            <DialogHeader>
              <DialogTitle>Mijoz qo'shish</DialogTitle>
            </DialogHeader>
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="text-left">Ism</Label>
                <Input
                  v-model="username"
                  id="name"
                  type="text"
                  class="col-span-3"
                />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="price" class="text-left">Telefon raqam</Label>
                <Input
                  v-model="userphone"
                  id="price"
                  type="text"
                  class="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" @click="addUser()">Qo'shish</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent class="grid gap-8 grid-cols-2">
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
          <button class="flex" @click="deleteCustomer(item.id)">
            <Trash2 class="w-[18px] h-[18px] hover:stroke-red-500" />
          </button>
          <Dialog>
            <DialogTrigger as-child>
              <button
                @click="(username = item.name), (userphone = item.number)"
                class="flex"
              >
                <PencilLine class="w-[18px] h-[18px] hover:stroke-yellow-700" />
              </button>
            </DialogTrigger>
            <DialogContent class="fixed">
              <DialogHeader>
                <DialogTitle>Mijoz ma'lumotni tahrilash</DialogTitle>
              </DialogHeader>
              <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="name" class="text-left">Ism</Label>
                  <Input
                    v-model="username"
                    id="name"
                    type="text"
                    class="col-span-3"
                  />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="price" class="text-left">Telefon raqam</Label>
                  <Input
                    v-model="userphone"
                    id="price"
                    type="text"
                    class="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" @click="updateUser(item.id)"
                  >yangilash</Button
                >
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStore } from "~~/store/store";
import services from "~/services/services";
import { useToast } from "@/components/ui/toast/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toast";
const { toast } = useToast();
const store: any = useStore();
const customers = ref<any>(null);
async function getCustomers() {
  const res: any = await services.getCustomers(store.token);
  customers.value = res;
}
async function deleteCustomer(id: number | string) {
  try {
    const res: any = await services.deleteCustomer(store.token, id);
    toast({
      description: "Success",
      class: "border-lime-500 bg-lime-500 text-white",
    });
    getCustomers();
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

const username = ref<string | number>("");
const userphone = ref<string | number>("");
interface addUserInterface {
  name: string | number;
  number: string | number;
}
interface updateUserInterface {
  name: string | number;
  number: string | number;
  id: number | string;
}
async function addUser() {
  const body: addUserInterface = {
    name: username.value,
    number: userphone.value,
  };
  try {
    const res: any = await services.addCustomer(store.token, body);
    toast({
      description: "Success",
      class: "border-lime-500 bg-lime-500 text-white",
    });
    getCustomers();
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
async function updateUser(id: number) {
  const body: updateUserInterface = {
    name: username.value,
    number: userphone.value,
    id: id,
  };
  try {
    const res: any = await services.updateCustomer(store.token, body);
    toast({
      description: "Success",
      class: "border-lime-500 bg-lime-500 text-white",
    });
    getCustomers();
    username.value = "";
    userphone.value = "";
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
onMounted(() => {
  getCustomers();
});
</script>

<style scoped></style>
