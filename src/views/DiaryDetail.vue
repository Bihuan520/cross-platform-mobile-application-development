<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>日記內容</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
        <!-- 日記內容將顯示於此 -->

        <!-- 若找不到日記，顯示錯誤訊息 -->
        <div v-if="!diary" style="text-align:center; margin-top: 2rem;">
        <p>找不到此篇日記 😢</p>
        </div>

        <!-- 找到日記，顯示完整內容 -->
        <div v-else>
        <h1>{{ diary.title }}</h1>
        <p style="color: gray;">
        📅 {{ diary.date }}
        <ion-badge :color="diary.color">{{ diary.mood }}</ion-badge>
        </p>
        <hr />
        <p>{{ diary.content }}</p>
        </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
    import {
    IonPage, IonHeader, IonToolbar, IonTitle,
    IonContent, IonButtons, IonBackButton
    } from '@ionic/vue';
    import { useRoute } from 'vue-router';
    import { ref } from 'vue';

    const route = useRoute();

    // ① 與 HomePage 相同的日記資料（暫時重複，下週學完 API 後才統一管理
    const allDiaries = [
        { id: 1, title: '開學第一天', date: '2023-09-12', content: '終於升上大三了！', mood: '開心', color: 'success' },
        { id: 2, title: 'Vue 3 好難懂', date: '2023-09-18', content: '原來 ref 要加 .value 啊...', mood: '傷心', color: 'secondary' },
        { id: 3, title: '好想吃火鍋', date: '2023-09-25', content: '天氣變冷了，晚餐去吃學校後門的火鍋。', mood: '嚇到', color: 'danger' },
        { id: 4, title: '今天天氣好好', date: '2026-03-20', content: '太陽好大好熱', mood: '驚訝', color: 'danger' }
    ];

    // ② 從路由參數取出 id，並轉型為數字
    const currentId = Number(route.params.id);

    // ③ 用 find() 在陣列中找到對應的日記
    const diary = ref(allDiaries.find(d => d.id === currentId) || null);
</script>