<template>
    <div>
        <RouterView />
        
        <NotificationComponent />
    </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NotificationComponent from './components/NotificationComponent.vue';

</script>
