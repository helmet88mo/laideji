// 学科门类
export const MAJOR_CATEGORIES = [
  { value: '工学', label: '工学', color: 'bg-blue-100 text-blue-800' },
  { value: '理学', label: '理学', color: 'bg-indigo-100 text-indigo-800' },
  { value: '文学', label: '文学', color: 'bg-purple-100 text-purple-800' },
  { value: '经济学', label: '经济学', color: 'bg-amber-100 text-amber-800' },
  { value: '管理学', label: '管理学', color: 'bg-teal-100 text-teal-800' },
  { value: '法学', label: '法学', color: 'bg-red-100 text-red-800' },
  { value: '医学', label: '医学', color: 'bg-rose-100 text-rose-800' },
  { value: '教育学', label: '教育学', color: 'bg-orange-100 text-orange-800' },
  { value: '农学', label: '农学', color: 'bg-green-100 text-green-800' },
  { value: '艺术学', label: '艺术学', color: 'bg-pink-100 text-pink-800' },
  { value: '历史学', label: '历史学', color: 'bg-yellow-100 text-yellow-800' },
  { value: '哲学', label: '哲学', color: 'bg-gray-100 text-gray-800' },
  { value: '军事学', label: '军事学', color: 'bg-emerald-100 text-emerald-800' },
]

// 院校层次
export const UNIVERSITY_LEVELS = [
  { value: '985', label: '985', color: 'bg-red-100 text-red-700' },
  { value: '211', label: '211', color: 'bg-orange-100 text-orange-700' },
  { value: '双一流', label: '双一流', color: 'bg-blue-100 text-blue-700' },
  { value: '省重点', label: '省重点', color: 'bg-green-100 text-green-700' },
  { value: '普通本科', label: '普通本科', color: 'bg-gray-100 text-gray-700' },
  { value: '专科', label: '专科', color: 'bg-slate-100 text-slate-700' },
]

// 院校类型
export const UNIVERSITY_TYPES = [
  '综合', '理工', '师范', '医药', '农林', '财经', '政法', '艺术', '体育', '语言', '民族', '军事',
]

// 中国省份
export const PROVINCES = [
  '北京', '上海', '广东', '江苏', '浙江', '山东', '湖北', '湖南', '四川', '重庆',
  '天津', '河北', '山西', '辽宁', '吉林', '黑龙江', '安徽', '福建', '江西', '河南',
  '内蒙古', '广西', '海南', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆',
]

// 城市等级
export const CITY_TIERS: Record<string, string> = {
  tier1: '一线城市（北上广深）',
  tier2: '新一线/二线城市',
  tier3: '三线及以下城市',
}

// 年级
export const GRADES = [
  { value: '高一', label: '高一' },
  { value: '高二', label: '高二' },
  { value: '高三', label: '高三' },
  { value: '大一', label: '大一' },
  { value: '大二', label: '大二' },
  { value: '大三', label: '大三' },
  { value: '大四', label: '大四' },
  { value: '已毕业', label: '已毕业' },
]

// 后悔清单分类
export const REGRET_CATEGORIES = [
  { value: 'study', label: '学业', color: 'bg-blue-100 text-blue-700' },
  { value: 'social', label: '社交/人脉', color: 'bg-purple-100 text-purple-700' },
  { value: 'career', label: '职业/实习', color: 'bg-amber-100 text-amber-700' },
  { value: 'life', label: '生活/习惯', color: 'bg-green-100 text-green-700' },
  { value: 'other', label: '其他', color: 'bg-gray-100 text-gray-700' },
]

// 后悔清单年级
export const REGRET_GRADES = [
  { value: '大一', label: '大一' },
  { value: '大二', label: '大二' },
  { value: '大三', label: '大三' },
  { value: '大四', label: '大四' },
]

// 目标路径
export const TARGET_PATHS = [
  { value: 'employment', label: '本科就业', icon: '💼' },
  { value: 'postgraduate', label: '考研深造', icon: '📚' },
  { value: 'civil_service', label: '考公/考编', icon: '🏛️' },
  { value: 'abroad', label: '出国留学', icon: '✈️' },
  { value: 'undecided', label: '还没想好', icon: '🤔' },
]

// 职业路径级别
export const CAREER_LEVEL_LABELS: Record<string, string> = {
  entry: '初级（0-2年）',
  mid: '中级（3-5年）',
  senior: '高级（5-8年）',
  expert: '专家/管理（8年+）',
}

// 能力维度
export const ABILITY_DIMENSIONS = [
  '数学基础',
  '英语能力',
  '逻辑思维',
  '动手实践',
  '沟通表达',
  '编程能力',
  '记忆能力',
  '写作能力',
  '创新能力',
  '团队协作',
]

// 新手引导阶段
export const GUIDE_PHASES = {
  post_gaokao: {
    title: '高考后暑假 · 过渡准备',
    description: '高考结束到大学报到前的 3 个月，是你为大学生活做准备的最佳窗口期。',
    tasks: [
      {
        taskId: 'know_major',
        title: '深入了解你的专业',
        description: '阅读专业百科，了解你将学习的内容和未来的职业方向',
        duration: '约 2 小时',
      },
      {
        taskId: 'preview_careers',
        title: '预览 3 个相关职业的日常',
        description: '看看你专业对应岗位的"一天预览"，对未来的工作内容有直观认知',
        duration: '约 1 小时',
      },
      {
        taskId: 'english_keep',
        title: '保持英语学习节奏',
        description: '每天 30 分钟英语，大一上学期就可以报考四级',
        duration: '每天 30 分钟',
      },
      {
        taskId: 'drivers_license',
        title: '考取驾照（如果条件允许）',
        description: '大学期间时间相对自由，驾照是性价比最高的证书之一',
        duration: '约 1-2 个月',
      },
      {
        taskId: 'life_skills',
        title: '掌握一项独立生活技能',
        description: '基础理财、做饭、洗衣服、就医流程——独立生活的必备技能',
        duration: '持续',
      },
      {
        taskId: 'set_goals',
        title: '写下你的大学四年初步目标',
        description: '不用很完美，但有一个方向比没有方向好 100 倍。以后可以调整',
        duration: '约 1 小时',
      },
    ],
  },
  freshman_year1: {
    title: '大一上学期 · 入学适应',
    description: '进入大学的前 3 个月，是建立良好习惯、避免迷失的关键期。',
    tasks: [
      {
        taskId: 'know_school',
        title: '了解你的学校',
        description: '查清楚：保研率、转专业政策、辅修/双学位条件——这些信息错过就来不及了',
        duration: '约 2 小时',
      },
      {
        taskId: 'know_curriculum',
        title: '了解本专业培养方案',
        description: '看一遍大学四年的课程地图，知道每学期要学什么',
        duration: '约 1 小时',
      },
      {
        taskId: 'connect_seniors',
        title: '联系 3 位学长学姐',
        description: '加微信聊一聊，他们会告诉你哪些课值得上、哪些坑不要踩',
        duration: '第一周',
      },
      {
        taskId: 'set_semester_goals',
        title: '设定本学期最小可行目标',
        description: '不超过 3 个目标——少而精，比多而废要好',
        duration: '约 30 分钟',
      },
      {
        taskId: 'gpa_awareness',
        title: '建立 GPA 意识',
        description: '了解绩点怎么算、对保研/留学/求职的影响——从第一学期就认真对待',
        duration: '持续',
      },
      {
        taskId: 'club_limit',
        title: '社团/组织适度参与',
        description: '建议不超过 2 个，大二下学期之前退出管理层，留时间给更重要的事',
        duration: '持续',
      },
    ],
  },
}

// 霍兰德测评题目
export const HOLLAND_QUESTIONS = [
  // R - 现实型 (Realistic)
  { dimension: 'R', question: '我喜欢动手操作工具或机器', inverted: false },
  { dimension: 'R', question: '我喜欢户外工作或与动植物打交道', inverted: false },
  { dimension: 'R', question: '我喜欢修理或组装东西', inverted: false },
  { dimension: 'R', question: '比起抽象概念，我更喜欢处理具体的问题', inverted: false },
  { dimension: 'R', question: '我善于协调身体动作（如运动、手工）', inverted: false },
  // I - 研究型 (Investigative)
  { dimension: 'I', question: '我喜欢探索和分析复杂的问题', inverted: false },
  { dimension: 'I', question: '我对科学研究和实验感兴趣', inverted: false },
  { dimension: 'I', question: '我喜欢独立思考和解决问题', inverted: false },
  { dimension: 'I', question: '我对数据分析和理论推导有耐心', inverted: false },
  { dimension: 'I', question: '我喜欢阅读学术或科普类书籍', inverted: false },
  // A - 艺术型 (Artistic)
  { dimension: 'A', question: '我喜欢通过写作、绘画、音乐等方式表达自己', inverted: false },
  { dimension: 'A', question: '我重视创造力和想象力', inverted: false },
  { dimension: 'A', question: '我喜欢不按常规、自由灵活的工作方式', inverted: false },
  { dimension: 'A', question: '我对美感和设计有独特的感受', inverted: false },
  { dimension: 'A', question: '我喜欢尝试新想法和原创性工作', inverted: false },
  // S - 社会型 (Social)
  { dimension: 'S', question: '我喜欢帮助他人解决问题或困难', inverted: false },
  { dimension: 'S', question: '我喜欢教学、培训或指导他人', inverted: false },
  { dimension: 'S', question: '我善于倾听和理解他人的感受', inverted: false },
  { dimension: 'S', question: '我对社会公益和志愿服务感兴趣', inverted: false },
  { dimension: 'S', question: '我擅长与人合作和团队沟通', inverted: false },
  // E - 企业型 (Enterprising)
  { dimension: 'E', question: '我喜欢领导和组织团队活动', inverted: false },
  { dimension: 'E', question: '我对商业、管理和创业感兴趣', inverted: false },
  { dimension: 'E', question: '我善于说服和影响他人', inverted: false },
  { dimension: 'E', question: '我喜欢竞争和挑战有难度的目标', inverted: false },
  { dimension: 'E', question: '我做事果断，敢于承担风险', inverted: false },
  // C - 常规型 (Conventional)
  { dimension: 'C', question: '我喜欢按计划有条理地完成任务', inverted: false },
  { dimension: 'C', question: '我重视细节和准确性', inverted: false },
  { dimension: 'C', question: '我善于整理文档、数据或档案', inverted: false },
  { dimension: 'C', question: '我喜欢稳定的工作环境和明确的规则', inverted: false },
  { dimension: 'C', question: '我对财务管理和预算规划有耐心', inverted: false },
]

// 霍兰德维度标签
export const HOLLAND_LABELS: Record<string, { label: string; description: string; color: string }> = {
  R: { label: '现实型', description: '动手操作，喜欢具体任务', color: '#ef4444' },
  I: { label: '研究型', description: '喜欢思考、分析、探索', color: '#3b82f6' },
  A: { label: '艺术型', description: '创造表达，追求美感', color: '#8b5cf6' },
  S: { label: '社会型', description: '帮助他人，善于沟通', color: '#10b981' },
  E: { label: '企业型', description: '领导影响，追求成就', color: '#f59e0b' },
  C: { label: '常规型', description: '有条理，注重细节', color: '#6b7280' },
}
