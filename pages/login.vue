<script setup lang="ts">
definePageMeta({
  layout: "without",
});
import auth from "~/services/auth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toast";
const { toast } = useToast();
const router = useRouter();
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const username = ref<string>("");
const password = ref<string>("");
async function login() {
  try {
    const res: any = await auth.login(username.value, password.value);
    localStorage.setItem("auth", res.access_token);
    toast({
      description: "Success",
      class: "border-lime-500 bg-lime-500 text-white",
    });
    window.location.href = "/";
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
  } finally {
  }
}
</script>

<template>
  <Toaster />
  <main class="grow">
    <div class="login flex items-center justify-center h-full">
      <form class="w-full max-w-sm" @submit.prevent="login()">
        <Card class="w-full">
          <CardHeader>
            <CardTitle class="text-2xl">Login</CardTitle>
            <CardDescription>
              Profilingizga kirish uchun pastga foydalanuvchi usernamemingizni
              kiriting.
            </CardDescription>
          </CardHeader>
          <CardContent class="grid gap-4">
            <div class="grid gap-2">
              <Label for="login">Username</Label>
              <Input v-model="username" id="login" type="login" required />
            </div>
            <div class="grid gap-2">
              <Label for="password">Parol</Label>
              <Input
                v-model="password"
                id="password"
                type="password"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button class="w-full">Kirish</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  </main>
</template>
