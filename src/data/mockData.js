const generatePlaceholderImage = (seed = 0, type = 'default') => {
  const gradients = {
    avatar: ['#1a1a2e,#16213e,#0f3460', '#2d132c,#801336,#c72c41', '#1a1a1a,#2d2d2d,#404040'],
    cover: ['#0f0f0f,#1a1a2e,#16213e', '#1a1a1a,#2a2a2a,#3a3a3a', '#0d1b2a,#1b263b,#415a77'],
    image: ['#1a1a1a,#252525,#303030', '#0a0a0a,#1a1a1a,#2a2a2a', '#111111,#222222,#333333']
  }
  const gradientSet = gradients[type] || gradients.cover
  const gradientIndex = Math.abs(seed) % gradientSet.length
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g${seed}' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23${gradientSet[gradientIndex].split(',')[0].replace('#','')}'/%3E%3Cstop offset='50%25' stop-color='%23${gradientSet[gradientIndex].split(',')[1].replace('#','')}'/%3E%3Cstop offset='100%25' stop-color='%23${gradientSet[gradientIndex].split(',')[2].replace('#','')}'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g${seed})'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23555' font-size='48' font-family='system-ui'%3E%E2%97%8F%3C/text%3E%3C/svg%3E`
}

export const blogger = {
  id: 1,
  name: '墨染清秋',
  avatar: generatePlaceholderImage(1, 'avatar'),
  bio: '独立创作者 | 内容策划师 | 生活美学研究者。专注于用文字和影像记录生活中那些值得被记住的瞬间。',
  signature: '在喧嚣中寻找安静，在平凡中发现不凡。',
  tags: ['内容创作者', '生活美学', '摄影达人', '专栏作家'],
  followers: 128500,
  worksCount: 347,
  socialLinks: [
    { name: '微博', url: '#', icon: 'weibo' },
    { name: '微信', url: '#', icon: 'wechat' },
    { name: '小红书', url: '#', icon: 'xiaohongshu' },
    { name: 'B站', url: '#', icon: 'bilibili' }
  ]
}

export const imageWorks = [
  {
    id: 1,
    type: 'image',
    title: '城市夜景的诗意表达',
    description: '用镜头捕捉城市夜晚的独特魅力，霓虹与黑暗的交织。',
    cover: generatePlaceholderImage(101, 'cover'),
    images: [
      generatePlaceholderImage(102, 'image'),
      generatePlaceholderImage(103, 'image'),
      generatePlaceholderImage(104, 'image')
    ],
    tags: ['城市摄影', '夜景', '艺术'],
    views: 15680,
    likes: 3240,
    createdAt: '2024-03-15',
    hot: true
  },
  {
    id: 2,
    type: 'image',
    title: '极简静物摄影系列',
    description: '减法艺术，用最少的元素传达最丰富的情感。',
    cover: generatePlaceholderImage(201, 'cover'),
    images: [
      generatePlaceholderImage(202, 'image'),
      generatePlaceholderImage(203, 'image')
    ],
    tags: ['静物', '极简', '黑白'],
    views: 8920,
    likes: 1850,
    createdAt: '2024-03-12'
  },
  {
    id: 3,
    type: 'image',
    title: '秋日私语 | 自然之美',
    description: '秋天是大自然最美的调色盘，记录季节更替的诗意。',
    cover: generatePlaceholderImage(301, 'cover'),
    images: [
      generatePlaceholderImage(302, 'image'),
      generatePlaceholderImage(303, 'image'),
      generatePlaceholderImage(304, 'image')
    ],
    tags: ['自然', '秋天', '风景'],
    views: 21340,
    likes: 4560,
    createdAt: '2024-03-08',
    hot: true
  },
  {
    id: 4,
    type: 'image',
    title: '咖啡与阅读的午后',
    description: '一杯咖啡，一本好书，享受属于自己的宁静时光。',
    cover: generatePlaceholderImage(401, 'cover'),
    images: [
      generatePlaceholderImage(402, 'image'),
      generatePlaceholderImage(403, 'image')
    ],
    tags: ['生活', '咖啡', '阅读'],
    views: 7650,
    likes: 1280,
    createdAt: '2024-03-05'
  },
  {
    id: 5,
    type: 'image',
    title: '黑白胶片的光影艺术',
    description: '回归黑白，专注于光影与构图的纯粹表达。',
    cover: generatePlaceholderImage(501, 'cover'),
    images: [
      generatePlaceholderImage(502, 'image'),
      generatePlaceholderImage(503, 'image')
    ],
    tags: ['黑白', '胶片', '艺术'],
    views: 12890,
    likes: 2670,
    createdAt: '2024-03-02',
    hot: true
  }
]

export const videoWorks = [
  {
    id: 101,
    type: 'video',
    title: '东京街头的晨间漫步',
    description: '跟随镜头，感受东京清晨的宁静与活力。',
    cover: generatePlaceholderImage(601, 'cover'),
    videoUrl: null,
    duration: '4:32',
    tags: ['旅行', '日本', 'Vlog'],
    views: 32560,
    likes: 6890,
    createdAt: '2024-03-18',
    hot: true
  },
  {
    id: 102,
    type: 'video',
    title: '我的极简主义生活方式',
    description: '分享我如何通过断舍离找到内心的平静。',
    cover: generatePlaceholderImage(602, 'cover'),
    videoUrl: null,
    duration: '8:15',
    tags: ['生活方式', '极简主义'],
    views: 28900,
    likes: 5420,
    createdAt: '2024-03-10'
  },
  {
    id: 103,
    type: 'video',
    title: '深夜食堂：一碗治愈的拉面',
    description: '用一碗温暖的拉面，抚慰疲惫的灵魂。',
    cover: generatePlaceholderImage(603, 'cover'),
    videoUrl: null,
    duration: '6:48',
    tags: ['美食', '治愈'],
    views: 45670,
    likes: 9870,
    createdAt: '2024-03-01',
    hot: true
  }
]

export const columns = [
  {
    id: 1,
    title: '摄影进阶之路：从入门到精通',
    description: '系统讲解摄影核心知识，帮助你从新手成长为专业摄影师。课程涵盖构图、用光、后期全流程。',
    cover: generatePlaceholderImage(701, 'cover'),
    author: '墨染清秋',
    price: 199,
    originalPrice: 399,
    chapters: [
      { id: 1, title: '相机基础与参数详解', free: true, duration: '15:30', content: '本章主要讲解相机的基本操作和核心参数，包括光圈、快门、ISO的相互关系，以及如何根据场景选择合适的参数设置。' },
      { id: 2, title: '构图的艺术：黄金法则', free: true, duration: '20:45', content: '构图是摄影的灵魂。本章深入讲解三分法、对称构图、引导线等核心构图原则，以及如何在实践中灵活运用。' },
      { id: 3, title: '用光：摄影的灵魂', free: false, duration: '25:10', content: '光线决定了照片的质感。本章详解自然光、人工光的运用技巧，以及如何利用光影创造戏剧性效果。' },
      { id: 4, title: '色彩理论与调色基础', free: false, duration: '18:20', content: '理解色彩心理学，掌握照片调色的基本方法，让你的作品更具视觉冲击力。' },
      { id: 5, title: '后期处理完整流程', free: false, duration: '35:00', content: '从RAW文件导入到最终导出，完整演示专业级修图流程，包括曝光调整、色彩校正、瑕疵去除等。' },
      { id: 6, title: '实战：人像摄影技巧', free: false, duration: '28:40', content: '讲解人像摄影的构图、用光、引导模特等实用技巧，帮助你拍出专业级人像作品。' }
    ],
    status: 'completed',
    students: 2856,
    rating: 4.9,
    purchased: false
  },
  {
    id: 2,
    title: '极简主义生活方式实践指南',
    description: '通过断舍离，重新审视生活中的物品与时间，找回内心的平静与自由。',
    cover: generatePlaceholderImage(702, 'cover'),
    author: '墨染清秋',
    price: 129,
    originalPrice: 259,
    chapters: [
      { id: 1, title: '什么是真正的极简主义', free: true, duration: '12:00', content: '极简主义不是苦行僧式的生活，而是一种选择的智慧。本章帮助你理解极简主义的真正内涵。' },
      { id: 2, title: '物品断舍离：从衣柜开始', free: true, duration: '18:30', content: '衣柜是大多数人囤积物品的重灾区。本章教你如何科学整理衣柜，建立自己的胶囊衣橱。' },
      { id: 3, title: '数字极简：清理你的手机', free: false, duration: '15:45', content: '在数字时代，我们的注意力被海量信息分散。学习如何精简手机APP和信息来源。' },
      { id: 4, title: '时间管理：少即是多', free: false, duration: '22:10', content: '学会拒绝，学会专注，把时间留给真正重要的人和事。' }
    ],
    status: 'updating',
    students: 1923,
    rating: 4.8,
    purchased: false
  },
  {
    id: 3,
    title: '内容创作：从0到1打造个人品牌',
    description: '分享我的内容创作方法论，帮助你在自媒体时代找到自己的定位和声音。',
    cover: generatePlaceholderImage(703, 'cover'),
    author: '墨染清秋',
    price: 299,
    originalPrice: 599,
    chapters: [
      { id: 1, title: '找到你的独特定位', free: true, duration: '20:00', content: '在同质化严重的自媒体时代，如何找到差异化的个人定位是成功的第一步。' },
      { id: 2, title: '内容选题：爆款的底层逻辑', free: true, duration: '25:30', content: '分析爆款内容的共同特征，学习如何持续产出有价值的内容选题。' },
      { id: 3, title: '标题与封面：点击率的秘密', free: false, duration: '18:45', content: '好的标题和封面是成功的一半。本章拆解高点击率标题和封面的创作方法。' },
      { id: 4, title: '内容运营：建立忠实粉丝群', free: false, duration: '30:20', content: '不仅仅是发布内容，更重要的是建立社区和互动。学习如何培养忠实粉丝。' },
      { id: 5, title: '商业变现：从兴趣到收入', free: false, duration: '22:00', content: '分享内容创作者的主要变现方式，以及如何在保持内容质量的同时实现商业价值。' }
    ],
    status: 'completed',
    students: 3567,
    rating: 4.9,
    purchased: false
  }
]

export const messages = [
  {
    id: 1,
    username: '光影流年',
    avatar: generatePlaceholderImage(801, 'avatar'),
    content: '博主的摄影作品真的太美了，特别是那组黑白胶片系列，每一张都像艺术品一样。学习了你的构图技巧后，我的拍照水平真的提升了很多！',
    createdAt: '2024-03-18 14:30',
    likes: 45,
    reply: {
      content: '感谢你的支持！黑白摄影确实是一种很纯粹的表达方式，希望能继续看到你的作品～',
      createdAt: '2024-03-18 16:20'
    }
  },
  {
    id: 2,
    username: '清晨的咖啡',
    avatar: generatePlaceholderImage(802, 'avatar'),
    content: '非常喜欢你的极简主义生活方式专栏，让我重新思考了很多东西。以前总是买买买，现在学会了选择真正需要的东西，生活反而变得更轻松了。',
    createdAt: '2024-03-17 09:15',
    likes: 89,
    reply: null
  },
  {
    id: 3,
    username: '追光者',
    avatar: generatePlaceholderImage(803, 'avatar'),
    content: '东京那支vlog拍得太有感觉了！配乐、节奏、画面色调都完美。可以出一期vlog剪辑的教程吗？特别想学习你那种讲故事的节奏。',
    createdAt: '2024-03-16 22:45',
    likes: 123,
    reply: {
      content: '谢谢喜欢！vlog剪辑教程已经在筹备中了，会详细讲解节奏把控和情绪调动的方法，敬请期待～',
      createdAt: '2024-03-17 10:30'
    }
  },
  {
    id: 4,
    username: '阅读时光',
    avatar: generatePlaceholderImage(804, 'avatar'),
    content: '你的签名「在喧嚣中寻找安静，在平凡中发现不凡」这句话真的触动到我了。现在这个时代太浮躁了，能保持这种心态真的很难得。',
    createdAt: '2024-03-15 18:20',
    likes: 67,
    reply: null
  },
  {
    id: 5,
    username: '美食探索者',
    avatar: generatePlaceholderImage(805, 'avatar'),
    content: '深夜食堂那期看得我流口水！想知道你平时都是怎么发现这些宝藏小店的？有没有什么探店技巧可以分享？',
    createdAt: '2024-03-14 11:30',
    likes: 98,
    reply: null
  }
]

export const cooperationTypes = [
  { value: 'brand', label: '品牌合作' },
  { value: 'endorsement', label: '产品代言' },
  { value: 'content', label: '内容定制' },
  { value: 'event', label: '活动邀请' },
  { value: 'other', label: '其他合作' }
]

export const allWorks = [...imageWorks, ...videoWorks]

export function getWorkById(id) {
  return allWorks.find(w => w.id === parseInt(id))
}

export function getColumnById(id) {
  return columns.find(c => c.id === parseInt(id))
}
