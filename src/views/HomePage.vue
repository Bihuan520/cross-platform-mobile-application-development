<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-title>李璨宏的專屬日記</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <!-- 如果正在載入，顯示這個區塊 -->
       <div v-if="isLoading" style="text-align: center; margin-top: 50px;">
        <ion-spinner name="crescent"></ion-spinner>
        <p>正在努力抓取日記中...</p>
       </div>

       <!-- 如果沒有正在載入，才顯示迴圈卡片 -->
      <template v-else>
      <ion-card v-for="diary in diaries" :key="diary.id" :router-link="'/detail/' + diary.id">
        <ion-card-header>
          <ion-card-subtitle>{{ diary.date }} 
            <ion-badge :color='diary.color'>{{ diary.mood }}</ion-badge>
          </ion-card-subtitle>
          <ion-card-title>{{ diary.title }} </ion-card-title>
          </ion-card-header>
        <ion-card-content>{{ diary.content }}</ion-card-content>
      </ion-card>
      </template>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button router-link="/add">
          <ion-icon :icon="addIcon" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { 
    IonPage, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonCard, IonCardHeader, IonCardTitle, 
    IonCardSubtitle, IonCardContent, onIonViewWillEnter,
    IonFab, IonFabButton, IonIcon
  } from '@ionic/vue';
  import axios from 'axios';
  import { add as addIcon } from 'ionicons/icons';
  
  // 原本寫死的資料，改成空陣列
  const diaries = ref([]);

  // 建立一個變數來控制 Loading 動畫
  const isLoading = ref(false);

  const fetchDiaries = async () => {
    try {
      isLoading.value = true; // 開啟載入動畫

      // 向 API 請求資料
      // const respone = await axios.get('https://jsonplaceholder.typicode.com/posts')
      const respone = await axios.get('http://localhost:3000/diaries')
      
      // axios 會把結果放在 .data 裡面
      diaries.value = respone.data
    
    } catch (error) {
      console.error('抓取失敗：', error);
    } finally {
      isLoading.value = false; // 關閉載入動畫
    }

    diaries.value.reverse();
  }

  onIonViewWillEnter(() => {
    fetchDiaries();
  })
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
