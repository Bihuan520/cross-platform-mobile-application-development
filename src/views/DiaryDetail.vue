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
        <!-- 載入中 -->
        <div v-if="isLoading" style="text-align:center; margin-top:50px;">
          <ion-spinner name="crescent"></ion-spinner>
          <p>載入日記中...</p>
        </div>

        <!-- 若找不到日記，顯示錯誤訊息 -->
        <div v-else-if="!diary" style="text-align:center; margin-top: 2rem;">
          <p>找不到此篇日記 😢</p>
        </div>

        <!-- 找到日記，顯示完整內容 -->
        <div v-else>
          <h1>{{ diary.title }}</h1>
          <p style="color: gray;">
          📅 {{ diary.date }}
          <ion-badge :color="diary.color">{{ diary.mood }}</ion-badge>
          </p>
          <hr/>
          <p>{{ diary.content }}</p>
        </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
    import {
    IonPage, IonHeader, IonToolbar, IonTitle,
    IonContent, IonButtons, IonBackButton,
    IonBadge, IonSpinner
    } from '@ionic/vue';
    import { useRoute } from 'vue-router';
    import { ref } from 'vue';
    import axios from 'axios';
    import { onIonViewWillEnter } from '@ionic/vue';

    const route = useRoute();
    const diary = ref(null); // 等資料回來才填入
    const isLoading = ref(false); // 控制載入動畫
    
    // 向 server 抓取單篇日記的函式
    const fetchDiary = async () => {
      try {
        isLoading.value = true;
        const id = route.params.id; // 從路由取得 :id 參數

        const response = await axios.get(`http://localhost:3000/diaries/${id}`);
        diary.value = response.data;

      } catch (error) {
        console.error("抓取日記失敗：", error);
      }finally {
        isLoading.value = false;
      }
    }

    onIonViewWillEnter(() => {
      fetchDiary();
    });
</script>