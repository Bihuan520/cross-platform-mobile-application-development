import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/diaries';

export const useDiaryStore = defineStore('diary', () => {
  // ① State
  const diaries = ref([]);
  const isLoading = ref(false);
 
  // ② Actions
  const fetchDiaries = async () => {
    try {
      isLoading.value = true; // 開啟載入動畫

      // 向 API 請求資料
      // const respone = await axios.get('https://jsonplaceholder.typicode.com/posts')
      const respone = await axios.get(BASE_URL)
      
      // axios 會把結果放在 .data 裡面
      diaries.value = respone.data
    
    } catch (error) {
      console.error('抓取失敗：', error);
    } finally {
      isLoading.value = false; // 關閉載入動畫
    }

    diaries.value.reverse();
  };

  const create = async (payload) => {
    const res = await axios.post(BASE_URL, payload);
    diaries.value.push(res.data);   // 🆕 本地即時新增，不需重新 fetchDiaries
    return res.data;
  };

  const remove = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    diaries.value = diaries.value.filter(d => d.id !== Number(id)); // 🆕 本地即時刪除
  };

  const update = async (id, payload) => {
    const res = await axios.put(`${BASE_URL}/${id}`, payload);
    const idx = diaries.value.findIndex(d => d.id === Number(id));
    if (idx !== -1) diaries.value[idx] = res.data; // 🆕 本地即時替換
    return res.data;
  };
  return { diaries, isLoading, fetchDiaries, create, remove, update };
});