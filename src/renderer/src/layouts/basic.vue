<template>
    <div>
        <header class="flex gap-4">
            <router-link to="/analytics">analytics</router-link>
            <router-link to="/workspace">workspace</router-link>
        </header>
        <main>
            <RouterView />
        </main>
    </div>
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()

watchEffect(() => {
    const { fullPath, matched } = route
    if (fullPath === matched[0].path) {
        router.replace(matched[0].children[0].path)
    }
})

</script>

<style scoped></style>
