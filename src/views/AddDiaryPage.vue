<template>
  <ion-page>
    <ion-header>
    <ion-toolbar>
        <ion-buttons slot="start">
        <ion-back-button default-href="/" />
        </ion-buttons>
        <ion-title>新增日記</ion-title>
        <ion-buttons slot="end">
        <ion-button :disabled="isLoading" @click="submitDiary">儲存</ion-button>
        </ion-buttons>
    </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-item>
            <ion-label position="stacked">標題</ion-label>
            <ion-input v-model="form.title" placeholder="今天發生什麼事？" />
        </ion-item>
        <ion-item>
            <ion-label position="stacked">日期</ion-label>
            <ion-input type=date v-model="form.date"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="stacked">心情</ion-label>
            <ion-select :value="form.mood" @ionChange="onMoodChange">
                <ion-select-option v-for="(color, m) in moodColors" :key="m" :value="m">{{ m }}</ion-select-option>
            </ion-select>
        </ion-item>
        <ion-item>
            <ion-label position="stacked">內容</ion-label>
            <ion-textarea v-model="form.content" :rows="6" placeholder="寫下今天的心情..."></ion-textarea>
        </ion-item>
    </ion-content>
  </ion-page>
</template>
<style scoped>
    ion-label {
    font-size: 20px !important;
    font-weight:bold;
    }
</style>

<script setup lang="ts">
    import {IonPage, IonHeader, IonContent,
        IonToolbar, IonTitle, IonButtons, IonButton,
        IonBackButton, IonItem, IonLabel, IonInput,
        IonSelect, IonSelectOption, IonTextarea,
    } from '@ionic/vue';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    import { useDiaryStore } from '@/stores/diary';
    const diaryStore = useDiaryStore();
    const isLoading = ref(false);

    const moodColors = {
        '開心': 'success',
        '普通': 'medium',
        '難過': 'danger',
        '興奮': 'warning',
        '疲倦': 'tertiary',
        '生氣': 'danger',
        '放鬆': 'primary',
        '緊張': 'warning',
        '孤單': 'light',
        '滿足': 'success',
        '焦慮': 'secondary',
        '期待': 'primary',
        '驚訝': 'warning',
        '無聊': 'medium',
        '感激': 'success',
        '害怕': 'danger',
        '安心': 'success',
        '困惑': 'secondary',
        '自信': 'primary',
        '羞愧': 'tertiary',
        '懷念': 'light',
        '幸福': 'success',
    };


    const form = ref({
        title: '',
        date: new Date().toISOString().slice(0, 10), // 預設今天
        content: '',
        mood: '開心',
        color: 'success',
    });

    const onMoodChange = (e) => {
        form.value.mood = e.target.value;
        form.value.color = moodColors[form.value.mood] || 'medium';
    };

    const router = useRouter();

    const submitDiary = async () => {
    if (!form.value.title || !form.value.content) return;
    try {
        isLoading.value = true;
        await diaryStore.create(form.value);
        router.back(); // 新增完畢，返回首頁
    } catch (error) {
        console.error('新增失敗：', error);
    } finally {
        isLoading.value = false;
    }
    };
</script>