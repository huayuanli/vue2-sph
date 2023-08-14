import Mock from "mockjs";
import banners from '@/mock/banner.json'
import floors from '@/mock/floors.json'
    
Mock.mock('/mock/banner', { code: 200, data: banners })

Mock.mock('/mock/floor', { code: 200, data: floors })