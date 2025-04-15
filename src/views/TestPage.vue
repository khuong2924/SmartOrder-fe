<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Quản lý cẩm nang du lịch</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link
        v-for="item in managementItems"
        :key="item.path"
        :to="item.path"
        class="block"
      >
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border-t-4 border-teal-500" style="border-color: #00aaaa;">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-700">{{ item.title }}</h2>
            <component :is="item.icon" class="w-8 h-8" style="color: #00aaaa;"></component>
          </div>
          <p class="mt-2 text-gray-600">{{ item.description }}</p>
          <div class="mt-4 flex justify-end">
            <span class="text-sm font-medium" style="color: #00aaaa;">Chỉnh sửa →</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { MapPin, Globe, FolderTree, FileText, Tag, Image } from 'lucide-vue-next';

const managementItems = ref([
  {
    title: 'Khu vực',
    path: '/regions',
    icon: MapPin
  },
  {
    title: 'Quốc gia',
    description: '',
    path: '/countries',
    icon: Globe
  },
  {
    title: 'Loại cẩm nang',
    description: '',
    path: '/categories',
    icon: FolderTree
  },
  {
    title: 'Bài viết',
    description: '',
    path: '/articles',
    icon: FileText
  },
  {
    title: 'Tags',
    description: '',
    path: '/tags',
    icon: Tag
  },
  {
    title: 'Media',
    description: '',
    path: '/media',
    icon: Image
  }
]);
</script>
