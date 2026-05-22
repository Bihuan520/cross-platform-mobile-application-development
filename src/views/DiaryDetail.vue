<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button :router-link="`/edit/${route.params.id}`">✏️ 編輯</ion-button>
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
          <ion-item lines="none">
            <div class="left">
          📅 {{ diary.date }}
            <ion-badge :color="diary.color">{{ diary.mood }}</ion-badge>
          </div>
          <ion-button slot="end" fill="clear" color="dark" @click="deleteDiary">
            <ion-icon :icon="trashOutline"></ion-icon>
          </ion-button>
        </ion-item>
          <h1>{{ diary.title }}</h1>
          <hr/>
          <p>{{ diary.content }}</p>
        </div>
    </ion-content>
  </ion-page>
</template>
<style scoped>
.left {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>

<script setup lang="ts">
    import {
    IonPage, IonHeader, IonToolbar, IonTitle,
    IonContent, IonButton, IonButtons, IonBackButton,
    IonBadge, IonSpinner
    } from '@ionic/vue';
    import { trashOutline } from 'ionicons/icons';
    import { useRoute, useRouter } from 'vue-router';
    import { ref } from 'vue';
    import axios from 'axios';
    import { onIonViewWillEnter } from '@ionic/vue';
    import { alertController } from '@ionic/vue';

    import { useDiaryStore } from '@/stores/diary';
    const diaryStore = useDiaryStore();
    
    const router = useRouter();

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

    const deleteDiary = async () => {
      const alert = await alertController.create({
        header: '確認刪除',
        message: '確定要刪除這篇日記嗎？此操作無法復原。',
        buttons: [ 
          { text: '取消', role: 'cancel' },
          {
            text: '刪除',
            role: 'destructive',
            handler: async () => {
              const id = route.params.id;
              await diaryStore.remove(route.params.id);
              router.back(); // 刪除後返回首頁
            },
          },
        ],
      });
      await alert.present();
    };

    onIonViewWillEnter(() => {
      fetchDiary();
    });
</script>