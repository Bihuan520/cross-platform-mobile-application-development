<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-title>李璨宏的專屬日記</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-card v-for="diary in diaries" :key="diary.id" :router-link="'/detail/' + diary.id">
        <ion-card-header>
          <ion-card-subtitle>{{ diary.date }} 
            <ion-badge :color='diary.color'>{{ diary.mood }}</ion-badge>
          </ion-card-subtitle>
          <ion-card-title>{{ diary.title }} </ion-card-title>
          </ion-card-header>
        <ion-card-content>{{ diary.content }}</ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { 
    IonPage, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonCard, IonCardHeader, IonCardTitle, 
    IonCardSubtitle, IonCardContent
  } from '@ionic/vue';
  
  const diaries = ref([
    { id: 1, title: '開學第一天', date: '2023-09-12', content: '終於升上大三了！', mood: '開心', color: 'success' },
    { id: 2, title: 'Vue 3 好難懂', date: '2023-09-18', content: '原來 ref 要加 .value 啊...', mood: '傷心', color: 'secondary' },
    { id: 3, title: '好想吃火鍋', date: '2023-09-25', content: '天氣變冷了，晚餐去吃學校後門的火鍋。', mood: '嚇到', color: 'danger' },
     { id: 4, title: '今天天氣好好', date: '2026-03-20', content: '太陽好大好熱', mood: '驚訝', color: 'danger' }
  ]);
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
