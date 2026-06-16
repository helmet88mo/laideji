import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const db = new PrismaClient()

// ========== 辅助函数 ==========
function j(v: unknown) { return JSON.stringify(v) }

// ========== 专业数据 ==========
interface MajorSeed {
  code: string; name: string; degree: string; category: string
  description: string; courses: { name: string; courses: string[] }[]
  hardPoints: string; abilities: { name: string; value: number }[]
  relatedMajors: { name: string; difference: string }[]
  aiRisk: string; aiRiskLevel: number; employmentRate: number; matchRate: number
  careerPaths: { title: string; level: string; salary: string; skills: string[] }[]
  employmentStats: { industry: string; ratio: number; cityDistribution?: { city: string; ratio: number }[] }[]
  salaries: { cityTier: string; year0: number; year3: number; year5: number; year10: number }[]
}

const ALL_MAJORS: MajorSeed[] = [
  // ====== 工学 (8个) ======
  {
    code: "080901", name: "计算机科学与技术", degree: "工学学士", category: "工学",
    description: "计算机科学与技术是研究计算机系统设计、开发与应用的学科，涵盖硬件、软件、网络、人工智能等方向。是当前就业面最广、薪资水平最高的专业之一。",
    courses: [
      { name: "公共必修", courses: ["高等数学", "线性代数", "概率论与数理统计", "大学物理", "大学英语"] },
      { name: "专业基础", courses: ["离散数学", "数据结构", "计算机组成原理", "操作系统", "计算机网络"] },
      { name: "专业核心", courses: ["算法设计与分析", "数据库系统", "编译原理", "软件工程"] },
      { name: "选修方向", courses: ["人工智能", "机器学习", "Web开发", "移动开发", "网络安全", "云计算"] },
    ],
    hardPoints: "离散数学（抽象思维的门槛）、算法设计与分析（面试核心）、操作系统（概念繁多且抽象）",
    abilities: [{ name: "数学基础", value: 75 }, { name: "逻辑思维", value: 90 }, { name: "英语能力", value: 70 }, { name: "动手实践", value: 85 }, { name: "编程能力", value: 95 }, { name: "团队协作", value: 60 }],
    relatedMajors: [{ name: "软件工程", difference: "更侧重软件开发流程、项目管理和工程实践" }, { name: "人工智能", difference: "更聚焦ML/DL、NLP、CV等AI方向，数学要求更高" }],
    aiRisk: "基础编程（CRUD）被AI替代风险高（60%），但系统架构设计、复杂算法设计护城河深（<20%）。建议：不要做「代码翻译工」，要成为「问题解决者」。", aiRiskLevel: 2, employmentRate: 93.5, matchRate: 78.2,
    careerPaths: [
      { title: "初级开发工程师", level: "entry", salary: "8k-15k/月", skills: ["一门主流语言", "数据结构与算法", "Git", "Linux基础", "SQL"] },
      { title: "中级开发工程师", level: "mid", salary: "18k-35k/月", skills: ["系统设计", "分布式系统", "性能调优", "跨团队协作"] },
      { title: "高级/架构师", level: "senior", salary: "35k-60k/月", skills: ["架构设计", "技术规划", "团队管理", "业务理解"] },
      { title: "技术总监/CTO", level: "expert", salary: "60k-120k/月", skills: ["技术战略", "组织建设", "商业思维"] },
    ],
    employmentStats: [
      { industry: "互联网/科技", ratio: 42.5, cityDistribution: [{ city: "北京", ratio: 22 }, { city: "深圳", ratio: 18 }, { city: "杭州", ratio: 15 }, { city: "上海", ratio: 14 }, { city: "成都", ratio: 8 }] },
      { industry: "金融科技", ratio: 15.3 }, { industry: "制造业/信息化", ratio: 12.8 }, { industry: "体制内/国企", ratio: 10.2 }, { industry: "教育/科研", ratio: 7.5 },
    ],
    salaries: [{ cityTier: "tier1", year0: 12, year3: 22, year5: 35, year10: 55 }, { cityTier: "tier2", year0: 8, year3: 15, year5: 22, year10: 35 }, { cityTier: "tier3", year0: 5, year3: 10, year5: 15, year10: 22 }],
  },
  {
    code: "080902", name: "软件工程", degree: "工学学士", category: "工学",
    description: "软件工程专业培养掌握软件开发和项目管理能力的高级工程人才，更加强调软件开发流程、需求分析、测试和团队协作。",
    courses: [
      { name: "专业基础", courses: ["离散数学", "数据结构", "操作系统", "计算机网络"] },
      { name: "专业核心", courses: ["软件工程导论", "需求工程", "软件设计与体系结构", "软件测试", "软件项目管理", "人机交互"] },
      { name: "选修方向", courses: ["Web全栈开发", "移动开发", "DevOps", "微服务架构"] },
    ],
    hardPoints: "需求工程（理解用户真正想要什么）、大型项目架构设计、软件测试方法论",
    abilities: [{ name: "逻辑思维", value: 85 }, { name: "编程能力", value: 90 }, { name: "沟通表达", value: 75 }, { name: "团队协作", value: 85 }, { name: "动手实践", value: 90 }],
    relatedMajors: [{ name: "计算机科学与技术", difference: "更侧重计算机理论和底层，学术保研路径更宽" }],
    aiRisk: "基础编码被替代风险高，但项目管理和需求分析能力是AI的弱项。", aiRiskLevel: 2, employmentRate: 94.1, matchRate: 80.5,
    careerPaths: [
      { title: "软件开发工程师", level: "entry", salary: "8k-14k/月", skills: ["Java/Python/Go", "Spring/React", "Agile/Scrum", "Git"] },
      { title: "高级软件工程师", level: "mid", salary: "18k-35k/月", skills: ["系统架构", "技术选型", "代码审查", "Mentoring"] },
      { title: "技术经理", level: "senior", salary: "35k-55k/月", skills: ["项目管理", "团队领导", "技术规划"] },
    ],
    employmentStats: [{ industry: "互联网", ratio: 45 }, { industry: "金融IT", ratio: 15 }, { industry: "制造业", ratio: 12 }, { industry: "外包服务", ratio: 18 }],
    salaries: [{ cityTier: "tier1", year0: 11, year3: 20, year5: 32, year10: 50 }, { cityTier: "tier2", year0: 7, year3: 13, year5: 20, year10: 32 }],
  },
  {
    code: "080717", name: "人工智能", degree: "工学学士", category: "工学",
    description: "人工智能专业聚焦机器学习、深度学习、自然语言处理、计算机视觉等方向，是当前最热门的前沿交叉学科。数学要求极高。",
    courses: [
      { name: "数学基础", courses: ["高等数学", "线性代数", "概率论", "最优化方法", "信息论"] },
      { name: "专业核心", courses: ["机器学习", "深度学习", "自然语言处理", "计算机视觉", "强化学习", "数据挖掘"] },
      { name: "工具与平台", courses: ["Python", "PyTorch/TensorFlow", "CUDA", "Linux"] },
    ],
    hardPoints: "数学推导能力（概率+线性代数+优化），模型调参经验（需要大量实验），论文阅读（领域更新极快）",
    abilities: [{ name: "数学基础", value: 95 }, { name: "逻辑思维", value: 90 }, { name: "编程能力", value: 85 }, { name: "英语能力", value: 80 }, { name: "创新能力", value: 85 }],
    relatedMajors: [{ name: "计算机科学", difference: "AI更专精算法和模型，计科覆盖更广的系统知识" }, { name: "数据科学", difference: "数据科学偏分析应用，AI偏算法研发" }],
    aiRisk: "AI从业者本身就是造AI的人——但低端数据标注和调参工作会被自动化。高端算法研究护城河极深。", aiRiskLevel: 1, employmentRate: 96.8, matchRate: 88.5,
    careerPaths: [
      { title: "算法工程师", level: "entry", salary: "15k-25k/月", skills: ["Python", "PyTorch", "经典ML算法", "英文论文阅读"] },
      { title: "高级算法工程师", level: "mid", salary: "30k-60k/月", skills: ["模型设计", "分布式训练", "领域SOTA追踪", "顶会论文发表"] },
      { title: "AI科学家/研究员", level: "senior", salary: "60k-120k/月", skills: ["研究方向定义", "团队领导", "学术影响力"] },
    ],
    employmentStats: [{ industry: "互联网大厂AI Lab", ratio: 35 }, { industry: "AI创业公司", ratio: 25 }, { industry: "金融量化", ratio: 15 }, { industry: "自动驾驶", ratio: 10 }, { industry: "医疗AI", ratio: 8 }],
    salaries: [{ cityTier: "tier1", year0: 18, year3: 35, year5: 55, year10: 90 }, { cityTier: "tier2", year0: 12, year3: 22, year5: 35, year10: 55 }],
  },
  {
    code: "080601", name: "电气工程及其自动化", degree: "工学学士", category: "工学",
    description: "电气工程是研究电能的产生、传输、分配和应用的学科，涵盖电力系统、电机、电力电子等方向。是国家电网等央企招聘的主要对口专业。",
    courses: [
      { name: "专业基础", courses: ["电路原理", "电磁场", "模拟电子技术", "数字电子技术", "自动控制原理"] },
      { name: "专业核心", courses: ["电力系统分析", "电力电子技术", "电机学", "高电压技术", "继电保护"] },
    ],
    hardPoints: "电磁场（物理+数学的双重挑战）、电机学（抽象难懂）、电力系统暂态分析",
    abilities: [{ name: "数学基础", value: 80 }, { name: "逻辑思维", value: 75 }, { name: "动手实践", value: 85 }, { name: "工程意识", value: 80 }],
    relatedMajors: [{ name: "自动化", difference: "更侧重控制和信息处理，电气更侧重电力系统" }],
    aiRisk: "电力系统的安全性和可靠性要求极高，AI辅助决策而非替代。硬件+强电方向替代风险低。", aiRiskLevel: 1, employmentRate: 92.3, matchRate: 76.8,
    careerPaths: [
      { title: "电气工程师", level: "entry", salary: "6k-10k/月", skills: ["电力系统基础", "AutoCAD", "电气设备调试"] },
      { title: "高级电气工程师", level: "mid", salary: "12k-20k/月", skills: ["电力系统设计", "项目管理", "注册电气工程师"] },
      { title: "技术总监", level: "senior", salary: "25k-40k/月", skills: ["技术管理", "行业资源", "大型项目管理"] },
    ],
    employmentStats: [{ industry: "国家电网/南方电网", ratio: 35 }, { industry: "发电集团", ratio: 20 }, { industry: "电气设备制造", ratio: 18 }, { industry: "新能源", ratio: 15 }],
    salaries: [{ cityTier: "tier1", year0: 8, year3: 14, year5: 22, year10: 35 }, { cityTier: "tier2", year0: 6, year3: 10, year5: 16, year10: 25 }],
  },
  {
    code: "081001", name: "土木工程", degree: "工学学士", category: "工学",
    description: "土木工程涵盖房屋建筑、桥梁、隧道、道路等基础设施建设。是国民经济的支柱产业之一，虽然行业周期波动大，但永远不会消失。",
    courses: [
      { name: "专业基础", courses: ["理论力学", "材料力学", "结构力学", "土力学", "流体力学"] },
      { name: "专业核心", courses: ["混凝土结构设计", "钢结构设计", "基础工程", "土木工程施工", "工程概预算"] },
    ],
    hardPoints: "三大力学（理论+材料+结构）、结构设计规范繁多、工地实习条件艰苦",
    abilities: [{ name: "数学基础", value: 75 }, { name: "空间想象", value: 85 }, { name: "动手实践", value: 80 }, { name: "抗压能力", value: 75 }],
    relatedMajors: [{ name: "建筑学", difference: "建筑学偏设计和美学，土木偏结构和施工" }, { name: "水利工程", difference: "更聚焦水坝、水电站等水利设施" }],
    aiRisk: "结构计算已被软件替代，但设计决策和现场管理难以自动化。BIM技术是升级方向。", aiRiskLevel: 3, employmentRate: 88.5, matchRate: 71.2,
    careerPaths: [
      { title: "结构工程师", level: "entry", salary: "5k-8k/月", skills: ["结构力学", "CAD/PKPM", "规范理解"] },
      { title: "项目经理", level: "mid", salary: "12k-22k/月", skills: ["项目管理", "一级建造师", "成本控制"] },
    ],
    employmentStats: [{ industry: "建筑施工企业", ratio: 40 }, { industry: "设计院", ratio: 25 }, { industry: "房地产开发", ratio: 20 }, { industry: "政府/事业单位", ratio: 10 }],
    salaries: [{ cityTier: "tier1", year0: 7, year3: 12, year5: 20, year10: 35 }, { cityTier: "tier2", year0: 5, year3: 9, year5: 15, year10: 25 }],
  },
  {
    code: "080703", name: "通信工程", degree: "工学学士", category: "工学",
    description: "通信工程研究信号的产生、传输、交换和处理，是5G/6G时代的核心专业。华为、中兴等通信巨头的主要招聘专业。",
    courses: [{ name: "核心课程", courses: ["信号与系统", "通信原理", "数字信号处理", "电磁场与电磁波", "信息论与编码"] }],
    hardPoints: "信号与系统（数学要求高）、电磁场（物理+数学的噩梦）、通信原理公式繁多",
    abilities: [{ name: "数学基础", value: 85 }, { name: "逻辑思维", value: 80 }, { name: "动手实践", value: 75 }],
    relatedMajors: [{ name: "电子信息工程", difference: "更偏硬件和电路设计" }],
    aiRisk: "通信协议和算法设计不易被替代，但基础测试岗位会被自动化。", aiRiskLevel: 2, employmentRate: 91.5, matchRate: 75.3,
    careerPaths: [
      { title: "通信工程师", level: "entry", salary: "8k-12k/月", skills: ["通信协议", "信号处理", "MATLAB"] },
      { title: "高级系统工程师", level: "mid", salary: "18k-30k/月", skills: ["5G协议栈", "网络规划", "系统仿真"] },
    ],
    employmentStats: [{ industry: "通信设备商", ratio: 35 }, { industry: "运营商", ratio: 25 }, { industry: "互联网", ratio: 20 }],
    salaries: [{ cityTier: "tier1", year0: 10, year3: 18, year5: 30, year10: 50 }, { cityTier: "tier2", year0: 7, year3: 12, year5: 20, year10: 32 }],
  },
  {
    code: "080202", name: "机械工程", degree: "工学学士", category: "工学",
    description: "机械工程是工业之母，涵盖设计、制造、自动化等方向。制造业升级背景下不乏机会，智能制造和机器人是升级方向。",
    courses: [{ name: "核心课程", courses: ["机械设计", "机械制造", "工程力学", "控制工程", "CAD/CAM"] }],
    hardPoints: "工程力学（物理+数学）、机械制图（空间想象力要求高）",
    abilities: [{ name: "数学基础", value: 75 }, { name: "动手实践", value: 85 }, { name: "空间想象", value: 85 }],
    relatedMajors: [{ name: "自动化", difference: "更侧重控制和电子" }, { name: "车辆工程", difference: "更聚焦汽车方向" }],
    aiRisk: "传统CAD效率被AI提升，但复杂系统设计难以替代。智能制造和机器人是升级方向。", aiRiskLevel: 3, employmentRate: 89.8, matchRate: 70.5,
    careerPaths: [
      { title: "机械设计工程师", level: "entry", salary: "6k-10k/月", skills: ["CAD/SolidWorks", "机械制图", "公差分析"] },
      { title: "高级机械工程师", level: "mid", salary: "15k-25k/月", skills: ["结构设计", "有限元分析", "项目管理"] },
    ],
    employmentStats: [{ industry: "汽车/新能源", ratio: 30 }, { industry: "装备制造", ratio: 25 }, { industry: "消费电子", ratio: 20 }],
    salaries: [{ cityTier: "tier1", year0: 7, year3: 12, year5: 18, year10: 28 }, { cityTier: "tier2", year0: 5, year3: 9, year5: 14, year10: 22 }],
  },
  {
    code: "080910", name: "数据科学与大数据技术", degree: "工学学士", category: "工学",
    description: "数据科学是从海量数据中提取洞见的交叉学科，融合统计学、计算机科学和领域知识。几乎每个行业都需要数据人才。",
    courses: [
      { name: "数学统计", courses: ["高等数学", "线性代数", "概率论", "数理统计", "多元统计分析"] },
      { name: "计算机", courses: ["Python", "SQL", "数据结构", "分布式计算"] },
      { name: "核心", courses: ["数据挖掘", "机器学习", "数据可视化", "大数据平台(Hadoop/Spark)"] },
    ],
    hardPoints: "统计理论（假设检验、贝叶斯）、特征工程（依赖领域经验）、大数据平台配置",
    abilities: [{ name: "数学基础", value: 85 }, { name: "编程能力", value: 80 }, { name: "逻辑思维", value: 85 }, { name: "商业理解", value: 70 }],
    relatedMajors: [{ name: "统计学", difference: "更侧重数理理论，数据科学更偏工程应用" }, { name: "计算机科学", difference: "更偏系统开发，数据科学更偏分析建模" }],
    aiRisk: "基础报表和ETL工作面临自动化，但高级分析和决策建模难以替代。", aiRiskLevel: 2, employmentRate: 92.0, matchRate: 82.5,
    careerPaths: [
      { title: "数据分析师", level: "entry", salary: "8k-15k/月", skills: ["SQL", "Python", "Tableau", "统计学基础"] },
      { title: "数据科学家", level: "mid", salary: "20k-40k/月", skills: ["机器学习", "AB测试", "业务建模"] },
    ],
    employmentStats: [{ industry: "互联网", ratio: 40 }, { industry: "金融", ratio: 25 }, { industry: "咨询", ratio: 15 }, { industry: "零售/电商", ratio: 12 }],
    salaries: [{ cityTier: "tier1", year0: 12, year3: 22, year5: 35, year10: 55 }, { cityTier: "tier2", year0: 8, year3: 15, year5: 24, year10: 38 }],
  },

  // ====== 理学 (4个) ======
  {
    code: "070101", name: "数学与应用数学", degree: "理学学士", category: "理学",
    description: "数学是科学之母。本专业培养扎实的数学理论基础和抽象思维能力。毕业生在金融、IT、教育、科研等领域都有广阔出路。",
    courses: [
      { name: "基础", courses: ["数学分析", "高等代数", "解析几何", "概率论", "数理统计"] },
      { name: "进阶", courses: ["实变函数", "泛函分析", "拓扑学", "抽象代数", "偏微分方程"] },
      { name: "应用", courses: ["数值分析", "数学建模", "运筹学", "Python/Matlab"] },
    ],
    hardPoints: "数学分析（ε-δ语言的抽象思维转折）、实变函数（天书级别的抽象层次）、泛函分析",
    abilities: [{ name: "数学基础", value: 100 }, { name: "逻辑思维", value: 95 }, { name: "抽象思维", value: 95 }, { name: "编程能力", value: 65 }],
    relatedMajors: [{ name: "统计学", difference: "更侧重数据分析和应用，纯数学更侧重理论证明" }, { name: "应用数学", difference: "更侧重计算和建模，基础数学更侧重理论" }],
    aiRisk: "纯数学研究本质上是对未知的探索，AI只能作为辅助工具，短期无法替代数学家。", aiRiskLevel: 1, employmentRate: 86.5, matchRate: 68.8,
    careerPaths: [
      { title: "中学/大学教师", level: "entry", salary: "5k-10k/月", skills: ["教师资格证", "教学能力"] },
      { title: "量化研究员", level: "mid", salary: "25k-60k/月", skills: ["Python/C++", "统计建模", "金融市场知识"] },
      { title: "算法工程师/数据科学家", level: "mid", salary: "20k-45k/月", skills: ["机器学习", "深度学习", "运筹优化"] },
    ],
    employmentStats: [{ industry: "教育", ratio: 30 }, { industry: "金融/量化", ratio: 25 }, { industry: "IT/互联网", ratio: 25 }, { industry: "科研", ratio: 12 }],
    salaries: [{ cityTier: "tier1", year0: 10, year3: 22, year5: 40, year10: 65 }, { cityTier: "tier2", year0: 6, year3: 14, year5: 25, year10: 40 }],
  },
  {
    code: "070201", name: "物理学", degree: "理学学士", category: "理学",
    description: "物理学探索自然界的根本规律。培养严密的逻辑推理和数学建模能力。毕业生在高科技行业、金融、教育等领域具有极强的适应能力。",
    courses: [
      { name: "基础", courses: ["力学", "热学", "电磁学", "光学", "原子物理学"] },
      { name: "理论", courses: ["理论力学", "电动力学", "量子力学", "热力学与统计物理", "固体物理"] },
      { name: "实验", courses: ["普通物理实验", "近代物理实验"] },
    ],
    hardPoints: "量子力学（反直觉）、电动力学（数学要求极高）、四大力学并称物理系'四大天书'",
    abilities: [{ name: "数学基础", value: 95 }, { name: "逻辑思维", value: 95 }, { name: "动手实验", value: 75 }, { name: "编程建模", value: 70 }],
    relatedMajors: [{ name: "应用物理学", difference: "更侧重工程技术应用，物理学更侧重理论" }, { name: "天文学", difference: "更侧重天体物理和观测" }],
    aiRisk: "物理研究中的创造性思维和理论建构难以被AI替代。", aiRiskLevel: 1, employmentRate: 84.2, matchRate: 62.5,
    careerPaths: [
      { title: "中学教师", level: "entry", salary: "5k-9k/月", skills: ["教师资格证"] },
      { title: "半导体工程师", level: "mid", salary: "15k-30k/月", skills: ["固体物理", "半导体工艺", "仿真软件"] },
      { title: "量化研究员", level: "mid", salary: "25k-60k/月", skills: ["数学建模", "编程", "金融知识"] },
    ],
    employmentStats: [{ industry: "教育", ratio: 28 }, { industry: "半导体/电子", ratio: 22 }, { industry: "金融", ratio: 18 }, { industry: "IT", ratio: 15 }],
    salaries: [{ cityTier: "tier1", year0: 9, year3: 20, year5: 38, year10: 60 }, { cityTier: "tier2", year0: 6, year3: 12, year5: 22, year10: 35 }],
  },
  {
    code: "071201", name: "统计学", degree: "理学学士", category: "理学",
    description: "统计学是收集、分析、解释数据的科学。在大数据和AI时代，统计学的应用场景前所未有地广阔。",
    courses: [
      { name: "数学基础", courses: ["数学分析", "高等代数", "概率论"] },
      { name: "核心", courses: ["数理统计", "回归分析", "多元统计分析", "时间序列分析", "抽样调查", "非参数统计"] },
      { name: "计算", courses: ["R语言", "Python", "SQL", "统计计算"] },
    ],
    hardPoints: "数理统计（理论推导繁琐）、多元统计（矩阵运算密集）、实际数据清洗（脏数据比模型更头疼）",
    abilities: [{ name: "数学基础", value: 88 }, { name: "逻辑思维", value: 85 }, { name: "编程能力", value: 75 }, { name: "商业理解", value: 70 }],
    relatedMajors: [{ name: "数学", difference: "更侧重理论和证明，统计学更侧重数据分析和建模" }, { name: "数据科学", difference: "更侧重工程实现和大数据平台" }],
    aiRisk: "自动化机器学习（AutoML）在标准化任务上有进展，但复杂统计推断和因果分析仍需人类。", aiRiskLevel: 2, employmentRate: 90.5, matchRate: 79.2,
    careerPaths: [
      { title: "数据分析师", level: "entry", salary: "8k-14k/月", skills: ["SQL", "Excel/R/Python", "统计学知识"] },
      { title: "高级数据分析师/数据科学家", level: "mid", salary: "18k-35k/月", skills: ["机器学习", "AB测试", "业务分析"] },
    ],
    employmentStats: [{ industry: "互联网", ratio: 30 }, { industry: "金融/保险", ratio: 30 }, { industry: "医药", ratio: 15 }, { industry: "政府统计", ratio: 10 }],
    salaries: [{ cityTier: "tier1", year0: 10, year3: 20, year5: 33, year10: 52 }, { cityTier: "tier2", year0: 7, year3: 13, year5: 22, year10: 35 }],
  },
  {
    code: "070301", name: "化学", degree: "理学学士", category: "理学",
    description: "化学是研究物质组成、结构、性质和变化的中心科学。在新能源、新材料、制药等领域有不可替代的地位。",
    courses: [
      { name: "基础", courses: ["无机化学", "有机化学", "分析化学", "物理化学", "结构化学"] },
      { name: "实验", courses: ["无机实验", "有机实验", "分析实验", "物化实验"] },
    ],
    hardPoints: "有机化学（反应机理记忆量大）、物理化学（热力学+量子）、实验室安全（危险化学品管理）",
    abilities: [{ name: "动手实验", value: 90 }, { name: "记忆能力", value: 80 }, { name: "逻辑思维", value: 75 }, { name: "耐心细致", value: 85 }],
    relatedMajors: [{ name: "化工", difference: "更侧重工业生产放大，化学更侧重基础研究" }, { name: "材料科学", difference: "更侧重固体材料和工程应用" }],
    aiRisk: "AI辅助药物分子设计和材料筛选，但合成路线设计和实验操作难以自动化。", aiRiskLevel: 2, employmentRate: 85.8, matchRate: 66.3,
    careerPaths: [
      { title: "化学分析师", level: "entry", salary: "5k-8k/月", skills: ["仪器分析", "标准方法", "实验室安全"] },
      { title: "研发工程师", level: "mid", salary: "10k-20k/月", skills: ["有机合成", "工艺开发", "项目管理"] },
    ],
    employmentStats: [{ industry: "制药/生物技术", ratio: 30 }, { industry: "化工/材料", ratio: 25 }, { industry: "检测/环保", ratio: 20 }, { industry: "教育", ratio: 15 }],
    salaries: [{ cityTier: "tier1", year0: 6, year3: 12, year5: 20, year10: 32 }, { cityTier: "tier2", year0: 4.5, year3: 8, year5: 14, year10: 22 }],
  },

  // ====== 经济学 (2个) ======
  {
    code: "020301K", name: "金融学", degree: "经济学学士", category: "经济学",
    description: "金融学研究资金的融通和管理，涵盖银行、证券、保险、投资等多个领域。是一个与钱打交道的专业。",
    courses: [
      { name: "基础", courses: ["高等数学", "线性代数", "概率论", "微观经济学", "宏观经济学"] },
      { name: "核心", courses: ["货币银行学", "国际金融", "投资学", "公司金融", "金融市场学", "金融工程"] },
    ],
    hardPoints: "金融工程（数学建模+编程）、投资学（理论和实战差距大）、CFA/FRM证书备考",
    abilities: [{ name: "数学基础", value: 80 }, { name: "逻辑思维", value: 80 }, { name: "英语能力", value: 75 }, { name: "沟通表达", value: 85 }],
    relatedMajors: [{ name: "经济学", difference: "更宏观，研究经济运行规律" }, { name: "会计学", difference: "更侧重财务核算和审计" }],
    aiRisk: "量化交易和智能投顾正在替代传统岗位，但高净值客户关系管理难以替代。", aiRiskLevel: 3, employmentRate: 88.7, matchRate: 72.3,
    careerPaths: [
      { title: "银行柜员/客户经理", level: "entry", salary: "6k-12k/月", skills: ["金融产品知识", "客户服务"] },
      { title: "投资分析师", level: "mid", salary: "15k-30k/月", skills: ["财务分析", "行业研究", "估值建模"] },
      { title: "基金经理/VP", level: "senior", salary: "40k-100k/月", skills: ["投资策略", "组合管理", "客户管理"] },
    ],
    employmentStats: [{ industry: "银行业", ratio: 28.5 }, { industry: "证券/基金", ratio: 22.3 }, { industry: "保险", ratio: 15.8 }, { industry: "企业财务", ratio: 18.2 }],
    salaries: [{ cityTier: "tier1", year0: 10, year3: 20, year5: 35, year10: 60 }, { cityTier: "tier2", year0: 7, year3: 12, year5: 20, year10: 35 }],
  },
  {
    code: "020401", name: "国际经济与贸易", degree: "经济学学士", category: "经济学",
    description: "国际经济与贸易专业研究跨国商品和服务流动的规律，培养具备国际视野和外贸实操能力的复合型人才。",
    courses: [
      { name: "经济学基础", courses: ["微观经济学", "宏观经济学", "计量经济学"] },
      { name: "核心", courses: ["国际贸易理论", "国际金融", "国际商法", "国际市场营销", "外贸英语函电"] },
    ],
    hardPoints: "外贸实务（单证操作繁杂）、国际商法（法规记忆量大）、外语能力（口语和写作是硬门槛）",
    abilities: [{ name: "英语能力", value: 85 }, { name: "沟通表达", value: 80 }, { name: "商业敏感度", value: 75 }, { name: "跨文化理解", value: 80 }],
    relatedMajors: [{ name: "经济学", difference: "更侧重理论分析和政策研究" }, { name: "国际商务", difference: "更侧重跨国企业管理" }],
    aiRisk: "基础外贸单证操作和报关流程面临自动化，但客户开发和商务谈判难以替代。跨境电商是增量方向。", aiRiskLevel: 4, employmentRate: 83.5, matchRate: 60.2,
    careerPaths: [
      { title: "外贸业务员", level: "entry", salary: "5k-10k/月", skills: ["英语", "外贸流程", "客户开发"] },
      { title: "外贸经理", level: "mid", salary: "15k-30k/月", skills: ["市场开拓", "供应链管理", "大客户维护"] },
    ],
    employmentStats: [{ industry: "外贸公司", ratio: 35 }, { industry: "跨境电商", ratio: 25 }, { industry: "跨国公司", ratio: 18 }, { industry: "物流/货代", ratio: 15 }],
    salaries: [{ cityTier: "tier1", year0: 7, year3: 14, year5: 25, year10: 40 }, { cityTier: "tier2", year0: 5, year3: 10, year5: 18, year10: 28 }],
  },

  // ====== 管理学 (3个) ======
  {
    code: "120203K", name: "会计学", degree: "管理学学士", category: "管理学",
    description: "会计学是商业的语言，负责企业财务核算、审计和税务。就业面广但竞争激烈，CPA证书是核心竞争力。",
    courses: [{ name: "核心课程", courses: ["基础会计", "中级财务会计", "高级财务会计", "审计学", "税法", "财务管理", "管理会计"] }],
    hardPoints: "中级财务会计（分录地狱）、审计学（概念抽象）、CPA考试（6门科目通过率10-20%）",
    abilities: [{ name: "记忆能力", value: 75 }, { name: "逻辑思维", value: 70 }, { name: "细节把控", value: 90 }, { name: "职业道德", value: 85 }],
    relatedMajors: [{ name: "财务管理", difference: "更侧重企业资金管理和投融资决策" }, { name: "审计学", difference: "更侧重外部审计和鉴证业务" }],
    aiRisk: "基础记账和发票审核正在被RPA和AI替代。审计判断、税务筹划和财务分析仍有较高壁垒。", aiRiskLevel: 4, employmentRate: 90.2, matchRate: 82.1,
    careerPaths: [
      { title: "审计助理", level: "entry", salary: "5k-8k/月", skills: ["会计准则", "审计程序", "Excel"] },
      { title: "注册会计师", level: "mid", salary: "15k-25k/月", skills: ["CPA持证", "审计项目管理", "税务筹划"] },
      { title: "财务总监", level: "senior", salary: "30k-60k/月", skills: ["财务管理", "战略规划", "合规"] },
    ],
    employmentStats: [{ industry: "会计师事务所", ratio: 35 }, { industry: "企业财务", ratio: 40 }, { industry: "银行/金融", ratio: 15 }],
    salaries: [{ cityTier: "tier1", year0: 6, year3: 12, year5: 22, year10: 40 }, { cityTier: "tier2", year0: 4.5, year3: 8, year5: 15, year10: 28 }],
  },
  {
    code: "120201K", name: "工商管理", degree: "管理学学士", category: "管理学",
    description: "工商管理是管理学的基础专业，学习企业运营的方方面面：战略、营销、人力资源、财务。适合未来想走管理路线或创业的学生。",
    courses: [
      { name: "核心", courses: ["管理学原理", "组织行为学", "战略管理", "市场营销", "人力资源管理", "财务管理", "运营管理"] },
      { name: "工具", courses: ["管理统计学", "管理信息系统", "商业数据分析"] },
    ],
    hardPoints: "知识面广但深度不足（需要主动在某方向深耕）、案例分析能力（需要大量阅读和实践）",
    abilities: [{ name: "沟通表达", value: 88 }, { name: "领导力", value: 80 }, { name: "分析能力", value: 75 }, { name: "商业敏感度", value: 78 }],
    relatedMajors: [{ name: "市场营销", difference: "更聚焦市场和消费者" }, { name: "人力资源管理", difference: "更聚焦人和组织" }],
    aiRisk: "基础数据分析和管理报表面临自动化。中层管理者的判断、协调和决策能力难以替代。", aiRiskLevel: 4, employmentRate: 87.3, matchRate: 65.8,
    careerPaths: [
      { title: "管理培训生", level: "entry", salary: "6k-10k/月", skills: ["综合管理能力", "沟通协调"] },
      { title: "部门经理", level: "mid", salary: "15k-30k/月", skills: ["团队管理", "业务规划", "跨部门协调"] },
    ],
    employmentStats: [{ industry: "各行业企业管理岗", ratio: 40 }, { industry: "咨询", ratio: 18 }, { industry: "互联网运营", ratio: 20 }, { industry: "创业", ratio: 10 }],
    salaries: [{ cityTier: "tier1", year0: 8, year3: 16, year5: 28, year10: 50 }, { cityTier: "tier2", year0: 5.5, year3: 11, year5: 20, year10: 35 }],
  },
  {
    code: "120206", name: "人力资源管理", degree: "管理学学士", category: "管理学",
    description: "人力资源管理是研究组织中'人'的问题的学科，涵盖招聘、培训、绩效、薪酬、员工关系等模块。每个组织都需要HR。",
    courses: [{ name: "核心", courses: ["组织行为学", "人力资源管理概论", "招聘与录用", "培训与开发", "绩效管理", "薪酬管理", "劳动关系"] }],
    hardPoints: "劳动法（法规复杂且频繁更新）、绩效体系设计（理论与实践的鸿沟）、薪资谈判",
    abilities: [{ name: "沟通表达", value: 92 }, { name: "共情能力", value: 85 }, { name: "组织协调", value: 82 }, { name: "商业理解", value: 70 }],
    relatedMajors: [{ name: "工商管理", difference: "更宽泛的管理知识" }, { name: "心理学", difference: "更侧重心理理论和测量" }],
    aiRisk: "简历筛选和基础面试排期已自动化。但员工关系、文化建设和组织发展需要高情商介入。", aiRiskLevel: 3, employmentRate: 88.0, matchRate: 72.5,
    careerPaths: [
      { title: "HR专员", level: "entry", salary: "5k-8k/月", skills: ["招聘流程", "员工关系", "HR系统"] },
      { title: "HR经理", level: "mid", salary: "12k-22k/月", skills: ["人才发展", "薪酬设计", "组织发展"] },
    ],
    employmentStats: [{ industry: "各类企业", ratio: 60 }, { industry: "人力资源服务", ratio: 20 }, { industry: "咨询", ratio: 12 }],
    salaries: [{ cityTier: "tier1", year0: 6, year3: 12, year5: 22, year10: 38 }, { cityTier: "tier2", year0: 4, year3: 8, year5: 15, year10: 26 }],
  },

  // ====== 医学 (3个) ======
  {
    code: "100201K", name: "临床医学", degree: "医学学士", category: "医学",
    description: "临床医学是直接面对疾病和病人的医学分支，培养具备诊断、治疗和预防疾病能力的医生。学习周期长、投入大，但职业稳定性高。",
    courses: [
      { name: "基础医学", courses: ["人体解剖学", "组织胚胎学", "生理学", "生物化学", "病理学", "药理学", "免疫学"] },
      { name: "临床医学", courses: ["诊断学", "内科学", "外科学", "妇产科学", "儿科学", "神经病学"] },
    ],
    hardPoints: "人体解剖学（海量记忆）、病理学（抽象概念）、临床实习（高压+长时间工作）、执业医师资格考试",
    abilities: [{ name: "记忆能力", value: 95 }, { name: "动手实践", value: 85 }, { name: "沟通表达", value: 80 }, { name: "抗压能力", value: 90 }],
    relatedMajors: [{ name: "口腔医学", difference: "专注于口腔，工作强度相对低" }, { name: "基础医学", difference: "偏科研，主要做实验室研究" }],
    aiRisk: "AI辅助诊断在发展，但医生的临床判断和手术操作在可预见的未来难以被替代。", aiRiskLevel: 1, employmentRate: 96.2, matchRate: 91.8,
    careerPaths: [
      { title: "住院医师", level: "entry", salary: "5k-10k/月", skills: ["临床诊疗基础", "病历书写", "医患沟通"] },
      { title: "主治医师", level: "mid", salary: "12k-25k/月", skills: ["独立诊疗", "急重症处理", "专科深造"] },
      { title: "副主任/主任医师", level: "senior", salary: "25k-50k/月", skills: ["疑难杂症", "科室管理", "学术科研"] },
    ],
    employmentStats: [{ industry: "公立医院", ratio: 62.5 }, { industry: "私立/民营医院", ratio: 18.2 }, { industry: "医药企业", ratio: 8.3 }],
    salaries: [{ cityTier: "tier1", year0: 6, year3: 12, year5: 22, year10: 40 }, { cityTier: "tier2", year0: 4.5, year3: 9, year5: 18, year10: 30 }],
  },
  {
    code: "100301K", name: "口腔医学", degree: "医学学士", category: "医学",
    description: "口腔医学是医学中的黄金专业，工作强度相对临床低，收入上限高，口腔健康需求持续增长。",
    courses: [{ name: "核心课程", courses: ["口腔解剖生理学", "口腔内科学", "口腔颌面外科学", "口腔修复学", "口腔正畸学"] }],
    hardPoints: "口腔解剖（精细结构记忆）、动手操作要求极高（在毫米级空间操作）",
    abilities: [{ name: "动手实践", value: 95 }, { name: "记忆能力", value: 80 }, { name: "沟通表达", value: 75 }, { name: "审美能力", value: 70 }],
    relatedMajors: [{ name: "临床医学", difference: "全科诊疗vs口腔专科" }],
    aiRisk: "AI辅助诊断辅助医生，但精细的手工操作难以被机器替代。", aiRiskLevel: 1, employmentRate: 97.5, matchRate: 93.2,
    careerPaths: [
      { title: "口腔全科医生", level: "entry", salary: "6k-10k/月", skills: ["口腔诊疗基础", "根管治疗"] },
      { title: "口腔专科医生", level: "mid", salary: "20k-50k/月", skills: ["正畸/种植专科", "美学修复"] },
    ],
    employmentStats: [{ industry: "公立口腔医院", ratio: 30 }, { industry: "私立口腔诊所", ratio: 45 }, { industry: "综合医院口腔科", ratio: 20 }],
    salaries: [{ cityTier: "tier1", year0: 7, year3: 15, year5: 25, year10: 45 }, { cityTier: "tier2", year0: 5, year3: 10, year5: 18, year10: 30 }],
  },
  {
    code: "100701", name: "药学", degree: "理学学士", category: "医学",
    description: "药学是研究药物设计、合成、分析、药效评价的学科。是连接化学、生物学和医学的桥梁。医药行业是国家战略性产业。",
    courses: [
      { name: "化学基础", courses: ["有机化学", "分析化学", "物理化学", "生物化学"] },
      { name: "核心", courses: ["药物化学", "药剂学", "药理学", "药物分析", "药事管理"] },
    ],
    hardPoints: "有机化学（合成路线设计）、药理学（受体机制复杂）、新药研发周期极长（10年+、10亿美元+）",
    abilities: [{ name: "动手实验", value: 88 }, { name: "记忆能力", value: 85 }, { name: "逻辑思维", value: 75 }, { name: "英语能力", value: 70 }],
    relatedMajors: [{ name: "临床医学", difference: "更侧重疾病诊断和治疗" }, { name: "制药工程", difference: "更侧重药物生产的工程化放大" }],
    aiRisk: "AI加速药物筛选和分子设计，但临床试验和监管审批无法自动化。", aiRiskLevel: 2, employmentRate: 89.2, matchRate: 74.5,
    careerPaths: [
      { title: "药剂师", level: "entry", salary: "5k-8k/月", skills: ["药品管理", "处方审核"] },
      { title: "研发工程师", level: "mid", salary: "12k-25k/月", skills: ["药物分析", "制剂开发", "注册法规"] },
    ],
    employmentStats: [{ industry: "制药企业", ratio: 40 }, { industry: "医院药房", ratio: 25 }, { industry: "医药商业", ratio: 18 }, { industry: "CRO", ratio: 12 }],
    salaries: [{ cityTier: "tier1", year0: 7, year3: 14, year5: 24, year10: 38 }, { cityTier: "tier2", year0: 5, year3: 10, year5: 17, year10: 26 }],
  },

  // ====== 文学 (2个) ======
  {
    code: "050201", name: "英语", degree: "文学学士", category: "文学",
    description: "英语专业培养英语语言能力和跨文化交际能力。AI翻译工具的发展正在改变行业格局，需要主动叠加其他技能。",
    courses: [{ name: "核心课程", courses: ["综合英语", "英语写作", "翻译理论与实践", "英美文学", "语言学"] }],
    hardPoints: "语言学（理论抽象）、文学（大量阅读）、专八考试",
    abilities: [{ name: "英语能力", value: 95 }, { name: "沟通表达", value: 85 }, { name: "写作能力", value: 80 }, { name: "跨文化理解", value: 82 }],
    relatedMajors: [{ name: "翻译", difference: "更侧重口译笔译训练" }, { name: "商务英语", difference: "更侧重商务场景应用" }],
    aiRisk: "AI翻译正在快速进步，基础翻译岗位大幅减少。纯语言能力竞争力下降，需叠加法律/技术/商务等技能。", aiRiskLevel: 5, employmentRate: 78.5, matchRate: 45.3,
    careerPaths: [
      { title: "翻译/编辑", level: "entry", salary: "5k-8k/月", skills: ["英语专八", "CAT工具"] },
      { title: "海外运营/商务", level: "mid", salary: "12k-20k/月", skills: ["跨文化沟通", "商务谈判"] },
    ],
    employmentStats: [{ industry: "教育培训", ratio: 35 }, { industry: "外贸/跨境电商", ratio: 25 }, { industry: "翻译/出版", ratio: 15 }],
    salaries: [{ cityTier: "tier1", year0: 6, year3: 12, year5: 20, year10: 30 }, { cityTier: "tier2", year0: 4, year3: 8, year5: 14, year10: 22 }],
  },
  {
    code: "050101", name: "汉语言文学", degree: "文学学士", category: "文学",
    description: "汉语言文学是研究中国语言和文学的学科。培养深厚的人文素养、文字表达能力和批判性思维。是公务员考试的热门专业。",
    courses: [
      { name: "语言", courses: ["现代汉语", "古代汉语", "语言学概论"] },
      { name: "文学", courses: ["中国古代文学", "中国现当代文学", "外国文学", "文学理论"] },
      { name: "写作", courses: ["基础写作", "应用写作", "创意写作"] },
    ],
    hardPoints: "古代汉语（文言文阅读量大）、文学理论（哲学思辨）、写作能力（需要长期积累）",
    abilities: [{ name: "写作能力", value: 92 }, { name: "阅读理解", value: 90 }, { name: "沟通表达", value: 82 }, { name: "逻辑思维", value: 70 }],
    relatedMajors: [{ name: "新闻学", difference: "更侧重新闻采编和传播" }, { name: "对外汉语", difference: "更侧重对外汉语教学" }],
    aiRisk: "AI文字生成能力强，但深度内容创作、文学批评和文化研究仍需人类。公务员和教师是主要出路。", aiRiskLevel: 4, employmentRate: 82.3, matchRate: 58.5,
    careerPaths: [
      { title: "文案/编辑", level: "entry", salary: "5k-8k/月", skills: ["写作能力", "内容策划"] },
      { title: "公务员/事业编", level: "entry", salary: "6k-10k/月", skills: ["申论写作", "政策解读"] },
      { title: "教师", level: "entry", salary: "5k-9k/月", skills: ["教师资格证", "教学能力"] },
    ],
    employmentStats: [{ industry: "教育", ratio: 30 }, { industry: "公务员/事业编", ratio: 25 }, { industry: "传媒/出版", ratio: 20 }, { industry: "企业文秘/宣传", ratio: 18 }],
    salaries: [{ cityTier: "tier1", year0: 6, year3: 12, year5: 20, year10: 32 }, { cityTier: "tier2", year0: 4, year3: 8, year5: 14, year10: 24 }],
  },

  // ====== 法学 (2个) ======
  {
    code: "030101K", name: "法学", degree: "法学学士", category: "法学",
    description: "法学研究法律、法律现象及其规律性。培养能在法律相关领域工作的专业人才。法考（通过率10-15%）是核心职业门槛。",
    courses: [
      { name: "核心", courses: ["法理学", "宪法学", "民法学", "刑法学", "民事诉讼法学", "刑事诉讼法学", "行政法学", "经济法学", "国际法学"] },
    ],
    hardPoints: "法理学（哲学思辨）、民法（体系庞大）、法律职业资格考试（超低通过率）、法律文书写作",
    abilities: [{ name: "记忆能力", value: 90 }, { name: "逻辑思维", value: 85 }, { name: "写作能力", value: 85 }, { name: "沟通表达", value: 80 }],
    relatedMajors: [{ name: "知识产权", difference: "更聚焦专利、商标、著作权" }, { name: "政治学", difference: "偏政治理论和公共管理" }],
    aiRisk: "基础文书起草和案例检索已被AI辅助。法庭辩论、复杂案件策略制定仍是人类核心竞争力。", aiRiskLevel: 2, employmentRate: 82.3, matchRate: 64.5,
    careerPaths: [
      { title: "律师助理", level: "entry", salary: "4k-8k/月", skills: ["法律检索", "文书起草", "通过法考"] },
      { title: "执业律师", level: "mid", salary: "12k-30k/月", skills: ["独立办案", "庭审能力", "客户开发"] },
      { title: "合伙人/高级法务", level: "senior", salary: "30k-80k/月", skills: ["业务开拓", "团队管理", "行业专业度"] },
    ],
    employmentStats: [{ industry: "律师事务所", ratio: 35.5 }, { industry: "企业法务", ratio: 25.2 }, { industry: "公务员/公检法", ratio: 22.8 }],
    salaries: [{ cityTier: "tier1", year0: 7, year3: 15, year5: 28, year10: 50 }, { cityTier: "tier2", year0: 5, year3: 10, year5: 18, year10: 30 }],
  },
  {
    code: "030302", name: "社会学", degree: "法学学士", category: "法学",
    description: "社会学研究社会结构、社会关系和社会变迁。培养宏观视角和实证研究能力。在数据分析、用户研究、公共政策等领域有独特优势。",
    courses: [
      { name: "理论", courses: ["社会学概论", "西方社会学理论", "中国社会思想史"] },
      { name: "方法", courses: ["社会研究方法", "社会统计学", "质性研究方法", "SPSS/Stata应用"] },
      { name: "分支", courses: ["经济社会学", "组织社会学", "城市社会学", "社会分层与流动"] },
    ],
    hardPoints: "社会学理论（概念抽象、学派林立）、定量研究（统计方法）、田野调查（时间投入大）",
    abilities: [{ name: "逻辑思维", value: 82 }, { name: "数据分析", value: 75 }, { name: "写作能力", value: 80 }, { name: "社会洞察", value: 85 }],
    relatedMajors: [{ name: "社会工作", difference: "更侧重实务和助人" }, { name: "人类学", difference: "更侧重文化和田野调查" }],
    aiRisk: "大数据分析自动化部分定量研究，但定性分析和理论构建仍需人类。", aiRiskLevel: 3, employmentRate: 80.5, matchRate: 55.2,
    careerPaths: [
      { title: "用户研究员", level: "entry", salary: "8k-14k/月", skills: ["定性/定量研究方法", "用户访谈"] },
      { title: "数据分析师", level: "mid", salary: "15k-28k/月", skills: ["SQL/Stata", "调查设计", "报告撰写"] },
    ],
    employmentStats: [{ industry: "互联网/科技", ratio: 25 }, { industry: "市场调研/咨询", ratio: 22 }, { industry: "政府/事业单位", ratio: 20 }, { industry: "NGO/社会组织", ratio: 15 }],
    salaries: [{ cityTier: "tier1", year0: 8, year3: 15, year5: 25, year10: 38 }, { cityTier: "tier2", year0: 5, year3: 10, year5: 16, year10: 26 }],
  },

  // ====== 教育学 (2个) ======
  {
    code: "040101", name: "教育学", degree: "教育学学士", category: "教育学",
    description: "教育学是研究教育现象和规律的科学。毕业出路包括教师、教育管理、教育科技、教育培训等。教师资格证是重要敲门砖。",
    courses: [
      { name: "理论", courses: ["教育学原理", "中国教育史", "外国教育史", "教育心理学", "课程与教学论"] },
      { name: "方法", courses: ["教育研究方法", "教育统计与测量", "教育技术学"] },
    ],
    hardPoints: "教育哲学（抽象思辨）、教育统计测量（数学要求）、教师资格证考试",
    abilities: [{ name: "沟通表达", value: 90 }, { name: "组织协调", value: 82 }, { name: "共情能力", value: 85 }, { name: "写作能力", value: 75 }],
    relatedMajors: [{ name: "心理学", difference: "更侧重心理机制和测量" }, { name: "教育技术学", difference: "更侧重技术手段应用于教育" }],
    aiRisk: "AI辅助个性化教学，但教育中的情感连接和价值观引导无法被替代。", aiRiskLevel: 2, employmentRate: 86.8, matchRate: 72.5,
    careerPaths: [
      { title: "中小学教师", level: "entry", salary: "5k-9k/月", skills: ["教师资格证", "教学能力"] },
      { title: "教育培训管理", level: "mid", salary: "12k-20k/月", skills: ["课程设计", "运营管理"] },
    ],
    employmentStats: [{ industry: "中小学", ratio: 45 }, { industry: "培训机构", ratio: 25 }, { industry: "教育科技", ratio: 15 }, { industry: "政府教育部门", ratio: 10 }],
    salaries: [{ cityTier: "tier1", year0: 6, year3: 12, year5: 20, year10: 30 }, { cityTier: "tier2", year0: 4.5, year3: 8, year5: 14, year10: 22 }],
  },
  {
    code: "071101", name: "心理学", degree: "理学学士", category: "教育学",
    description: "心理学是研究人类心理和行为规律的科学。随着社会对心理健康的重视，心理咨询、组织心理学方向需求旺盛。",
    courses: [
      { name: "基础", courses: ["普通心理学", "发展心理学", "社会心理学", "认知心理学", "人格心理学"] },
      { name: "方法", courses: ["心理统计", "心理测量学", "实验心理学", "SPSS/R"] },
      { name: "应用", courses: ["心理咨询", "变态心理学", "管理心理学"] },
    ],
    hardPoints: "心理统计（数理基础）、实验设计（方法论）、心理咨询（需要大量临床实践和个人督导）",
    abilities: [{ name: "共情能力", value: 90 }, { name: "沟通表达", value: 85 }, { name: "逻辑思维", value: 75 }, { name: "数据分析", value: 70 }],
    relatedMajors: [{ name: "教育学", difference: "更侧重教育过程" }, { name: "神经科学", difference: "更侧重脑和生物的层面" }],
    aiRisk: "基础心理测量和简单咨询有AI替代风险，但深度心理治疗依赖治疗师的人格魅力。", aiRiskLevel: 2, employmentRate: 83.5, matchRate: 68.2,
    careerPaths: [
      { title: "心理教师/咨询师", level: "entry", salary: "5k-8k/月", skills: ["心理咨询技术", "测量评估"] },
      { title: "HR/组织发展", level: "mid", salary: "12k-22k/月", skills: ["人才测评", "组织诊断"] },
      { title: "用户体验研究员", level: "mid", salary: "15k-28k/月", skills: ["用户研究", "实验设计"] },
    ],
    employmentStats: [{ industry: "教育/学校", ratio: 30 }, { industry: "心理咨询机构", ratio: 25 }, { industry: "互联网/科技", ratio: 20 }, { industry: "企业HR", ratio: 18 }],
    salaries: [{ cityTier: "tier1", year0: 7, year3: 14, year5: 24, year10: 38 }, { cityTier: "tier2", year0: 5, year3: 10, year5: 16, year10: 25 }],
  },

  // ====== 农学 (1个) ======
  {
    code: "090101", name: "农学", degree: "农学学士", category: "农学",
    description: "农学是研究农作物生产与育种的科学。在国家粮食安全和农业现代化的背景下，现代农业科技人才需求稳步增长。",
    courses: [
      { name: "基础", courses: ["植物学", "生物化学", "遗传学", "植物生理学"] },
      { name: "核心", courses: ["作物栽培学", "作物育种学", "耕作学", "种子学", "农业生态学"] },
    ],
    hardPoints: "田间试验（受自然条件影响大、周期长）、遗传育种（经典+分子生物学）、农业政策与市场",
    abilities: [{ name: "动手实践", value: 85 }, { name: "细心耐心", value: 80 }, { name: "科学思维", value: 75 }],
    relatedMajors: [{ name: "园艺", difference: "更侧重蔬菜、果树、花卉" }, { name: "植物保护", difference: "更侧重病虫害防治" }],
    aiRisk: "精准农业和智慧农业（无人机、传感器、AI决策）是升级方向。基础田间管理部分自动化。", aiRiskLevel: 3, employmentRate: 87.5, matchRate: 70.0,
    careerPaths: [
      { title: "农业技术员", level: "entry", salary: "4k-7k/月", skills: ["作物栽培", "田间管理"] },
      { title: "农业项目经理", level: "mid", salary: "10k-18k/月", skills: ["项目管理", "技术推广"] },
    ],
    employmentStats: [{ industry: "农业企业", ratio: 30 }, { industry: "农技推广", ratio: 25 }, { industry: "种子/农药公司", ratio: 20 }, { industry: "科研机构", ratio: 15 }],
    salaries: [{ cityTier: "tier1", year0: 5, year3: 10, year5: 16, year10: 26 }, { cityTier: "tier2", year0: 4, year3: 7, year5: 12, year10: 20 }],
  },

  // ====== 艺术学 (1个) ======
  {
    code: "130501", name: "设计学", degree: "艺术学学士", category: "艺术学",
    description: "设计学涵盖视觉传达、环境设计、产品设计、数字媒体等方向。在数字经济时代，UI/UX设计师需求旺盛。",
    courses: [
      { name: "基础", courses: ["设计素描", "色彩构成", "立体构成", "设计史"] },
      { name: "核心", courses: ["品牌设计", "交互设计", "用户体验设计", "设计心理学"] },
      { name: "工具", courses: ["Figma/Sketch", "Adobe套件(PS/AI/AE)", "C4D/Blender"] },
    ],
    hardPoints: "创意能力的持续培养（不是技能而是思维）、客户需求理解与沟通、设计趋势快速迭代",
    abilities: [{ name: "创造力", value: 95 }, { name: "审美能力", value: 92 }, { name: "沟通表达", value: 75 }, { name: "细节把控", value: 85 }],
    relatedMajors: [{ name: "美术学", difference: "更侧重纯艺术创作" }, { name: "数字媒体艺术", difference: "更侧重动画、影视和交互" }],
    aiRisk: "AI图像生成（Midjourney/DALL-E）冲击基础设计岗位。但高级创意设计和设计策略难以替代。", aiRiskLevel: 4, employmentRate: 81.5, matchRate: 62.8,
    careerPaths: [
      { title: "初级设计师", level: "entry", salary: "6k-10k/月", skills: ["设计软件", "版式配色基础"] },
      { title: "资深设计师", level: "mid", salary: "15k-28k/月", skills: ["设计策略", "项目管理", "用户研究"] },
      { title: "设计总监", level: "senior", salary: "30k-55k/月", skills: ["品牌策略", "团队管理", "商业思维"] },
    ],
    employmentStats: [{ industry: "互联网/科技", ratio: 35 }, { industry: "广告/传媒", ratio: 25 }, { industry: "品牌/零售", ratio: 20 }, { industry: "自由职业", ratio: 15 }],
    salaries: [{ cityTier: "tier1", year0: 8, year3: 16, year5: 28, year10: 45 }, { cityTier: "tier2", year0: 5, year3: 10, year5: 18, year10: 28 }],
  },
]

async function main() {
  console.log("🌱 Seeding database...")

  // ====== 创建演示用户 ======
  const demoPassword = await bcrypt.hash("Demo1234", 12)
  const demoUser = await db.user.upsert({
    where: { email: "demo@laideji.com" },
    update: { password: demoPassword },
    create: {
      email: "demo@laideji.com",
      name: "小明",
      password: demoPassword,
      grade: "大一",
      province: "广东",
      targetPath: "undecided",
    },
  })
  console.log("  ✅ Demo user: demo@laideji.com / Demo1234")

  // 演示用户学期计划进度
  await db.semesterPlan.upsert({
    where: { userId: demoUser.id },
    create: {
      userId: demoUser.id,
      planData: JSON.stringify({
        "emp-s1-m1": true, "emp-s1-m2": true, "emp-s1-m3": true,
        "pg-s1-m1": true, "pg-s1-m2": true,
        "cs-s1-m1": true, "cs-s1-m2": true,
        "ab-s1-m1": true, "ab-s1-m2": true,
      }),
    },
    update: {},
  })
  console.log("  ✅ Demo plan data seeded")

  // ====== 检查是否需要全量重种 ======
  const existingMajorCount = await db.major.count()
  if (existingMajorCount >= ALL_MAJORS.length) {
    console.log(`  ℹ️ 已有 ${existingMajorCount} 个专业，跳过专业数据种子。如需重种请手动清库。`)
    await db.$disconnect()
    return
  }

  // 清空内容表（保留用户相关表）
  console.log("  🧹 清理旧数据...")
  await db.salary.deleteMany()
  await db.employmentStat.deleteMany()
  await db.careerPath.deleteMany()
  await db.careerDay.deleteMany()
  await db.regret.deleteMany()
  await db.universityMajor.deleteMany()
  await db.university.deleteMany()
  await db.major.deleteMany()

  // ====== 写入专业 ======
  console.log(`  📚 写入 ${ALL_MAJORS.length} 个专业...`)
  for (const m of ALL_MAJORS) {
    await db.major.create({
      data: {
        code: m.code, name: m.name, degree: m.degree, category: m.category,
        description: m.description, courses: j(m.courses),
        hardPoints: m.hardPoints, abilities: j(m.abilities),
        relatedMajors: j(m.relatedMajors),
        aiRisk: m.aiRisk, aiRiskLevel: m.aiRiskLevel,
        employmentRate: m.employmentRate, matchRate: m.matchRate,
      },
    })
  }

  // 写入附属数据
  for (const m of ALL_MAJORS) {
    const major = await db.major.findUnique({ where: { code: m.code } })
    if (!major) continue

    // 就业统计
    if (m.employmentStats.length > 0) {
      await db.employmentStat.createMany({
        data: m.employmentStats.map((s) => ({
          majorId: major.id, industry: s.industry, ratio: s.ratio,
          cityDistribution: s.cityDistribution ? j(s.cityDistribution) : null,
        })),
      })
    }

    // 职业路径
    if (m.careerPaths.length > 0) {
      await db.careerPath.createMany({
        data: m.careerPaths.map((p) => ({
          majorId: major.id, title: p.title, level: p.level,
          salary: p.salary, skills: j(p.skills),
        })),
      })
    }

    // 收入数据
    if (m.salaries.length > 0) {
      await db.salary.createMany({
        data: m.salaries.map((s) => ({
          majorId: major.id, cityTier: s.cityTier,
          year0: s.year0, year3: s.year3, year5: s.year5, year10: s.year10,
        })),
      })
    }
  }

  // ====== 院校 (20所) ======
  console.log("  🏫 写入院校...")
  const uniData = [
    { name: "清华大学", code: "10003", level: "985", type: "综合", province: "北京", city: "北京", baoYanRate: 58.3, description: "中国最顶尖的高等学府之一，以工科见长。" },
    { name: "北京大学", code: "10001", level: "985", type: "综合", province: "北京", city: "北京", baoYanRate: 55.1, description: "以文理医见长，法学、经济、中文、数学等全国顶尖。" },
    { name: "复旦大学", code: "10246", level: "985", type: "综合", province: "上海", city: "上海", baoYanRate: 45.2, description: "文理医经管全面发展，上海滩第一名校。" },
    { name: "上海交通大学", code: "10248", level: "985", type: "综合", province: "上海", city: "上海", baoYanRate: 42.5, description: "以工科、医学、商科见长，地处上海区位优势显著。" },
    { name: "浙江大学", code: "10335", level: "985", type: "综合", province: "浙江", city: "杭州", baoYanRate: 35.6, description: "华东最强综合性大学，计算机、控制、农学等突出。" },
    { name: "南京大学", code: "10284", level: "985", type: "综合", province: "江苏", city: "南京", baoYanRate: 38.2, description: "文理学科底蕴深厚，天文、地学、中文全国领先。" },
    { name: "中国科学技术大学", code: "10358", level: "985", type: "理工", province: "安徽", city: "合肥", baoYanRate: 48.5, description: "以理科和前沿工科著称，物理、化学、计算机等实力极强。" },
    { name: "武汉大学", code: "10486", level: "985", type: "综合", province: "湖北", city: "武汉", baoYanRate: 28.4, description: "优美校园+综合实力，测绘、法学、水利全国领先。" },
    { name: "华中科技大学", code: "10487", level: "985", type: "理工", province: "湖北", city: "武汉", baoYanRate: 30.2, description: "工科和医学突出，机械、光电、计算机实力强。" },
    { name: "中山大学", code: "10558", level: "985", type: "综合", province: "广东", city: "广州", baoYanRate: 32.5, description: "华南第一学府，医学、商科、海洋科学突出。" },
    { name: "四川大学", code: "10610", level: "985", type: "综合", province: "四川", city: "成都", baoYanRate: 26.8, description: "西南最强综合性大学，口腔医学全国第一。" },
    { name: "西安交通大学", code: "10698", level: "985", type: "综合", province: "陕西", city: "西安", baoYanRate: 31.5, description: "C9联盟成员，能动、电气、机械传统工科强势。" },
    { name: "哈尔滨工业大学", code: "10213", level: "985", type: "理工", province: "黑龙江", city: "哈尔滨", baoYanRate: 33.2, description: "航天、机器人、焊接等工科顶尖，国防七子之一。" },
    { name: "厦门大学", code: "10384", level: "985", type: "综合", province: "福建", city: "厦门", baoYanRate: 28.8, description: "中国最美大学之一，经济、化学、海洋科学突出。" },
    { name: "天津大学", code: "10056", level: "985", type: "理工", province: "天津", city: "天津", baoYanRate: 26.5, description: "中国第一所现代大学，化工、精仪、建筑全国顶尖。" },
    { name: "电子科技大学", code: "10614", level: "985", type: "理工", province: "四川", city: "成都", baoYanRate: 27.8, description: "电子信息领域标杆，通信、计算机、集成电路实力突出。" },
    { name: "中南大学", code: "10533", level: "985", type: "综合", province: "湖南", city: "长沙", baoYanRate: 25.5, description: "有色金属、医学（湘雅）、交通运输强势。" },
    { name: "华南理工大学", code: "10561", level: "985", type: "理工", province: "广东", city: "广州", baoYanRate: 24.2, description: "建筑、轻工、食品科学突出，珠三角就业优势。" },
    { name: "深圳大学", code: "10590", level: "省重点", type: "综合", province: "广东", city: "深圳", baoYanRate: 5.8, description: "虽非985/211，但地处深圳，互联网和科技企业资源丰富。" },
    { name: "南京航空航天大学", code: "10287", level: "211", type: "理工", province: "江苏", city: "南京", baoYanRate: 22.5, description: "航空航天特色鲜明，力学、控制、机械实力强。" },
  ]

  for (const u of uniData) {
    await db.university.create({ data: u })
  }

  // 关联院校-专业（抽样——主要为热门工科和综合类院校添加计算机、金融、法学等专业）
  const cs = await db.major.findUnique({ where: { code: "080901" } })
  const se = await db.major.findUnique({ where: { code: "080902" } })
  const ai = await db.major.findUnique({ where: { code: "080717" } })
  const finance = await db.major.findUnique({ where: { code: "020301K" } })
  const law = await db.major.findUnique({ where: { code: "030101K" } })
  const medicine = await db.major.findUnique({ where: { code: "100201K" } })

  if (cs && se && ai && finance && law && medicine) {
    const uniMajors: { universityCode: string; majorCode: string; score: number; rank: number; subjectReq: string }[] = [
      { universityCode: "10003", majorCode: "080901", score: 685, rank: 120, subjectReq: "物理" },
      { universityCode: "10001", majorCode: "080901", score: 682, rank: 150, subjectReq: "物理" },
      { universityCode: "10248", majorCode: "080901", score: 678, rank: 300, subjectReq: "物理" },
      { universityCode: "10335", majorCode: "080901", score: 672, rank: 500, subjectReq: "物理" },
      { universityCode: "10358", majorCode: "080901", score: 675, rank: 380, subjectReq: "物理" },
      { universityCode: "10487", majorCode: "080901", score: 650, rank: 3000, subjectReq: "物理" },
      { universityCode: "10614", majorCode: "080901", score: 645, rank: 4000, subjectReq: "物理" },
      { universityCode: "10590", majorCode: "080901", score: 598, rank: 18000, subjectReq: "物理" },
      { universityCode: "10003", majorCode: "080717", score: 688, rank: 80, subjectReq: "物理" },
      { universityCode: "10358", majorCode: "080717", score: 680, rank: 200, subjectReq: "物理" },
      { universityCode: "10001", majorCode: "020301K", score: 680, rank: 150, subjectReq: "不限" },
      { universityCode: "10246", majorCode: "020301K", score: 672, rank: 350, subjectReq: "不限" },
      { universityCode: "10001", majorCode: "030101K", score: 675, rank: 200, subjectReq: "不限" },
      { universityCode: "10284", majorCode: "030101K", score: 660, rank: 800, subjectReq: "不限" },
      { universityCode: "10610", majorCode: "100201K", score: 665, rank: 600, subjectReq: "化学+生物" },
      { universityCode: "10533", majorCode: "100201K", score: 655, rank: 1200, subjectReq: "化学+生物" },
      { universityCode: "10486", majorCode: "080901", score: 655, rank: 2500, subjectReq: "物理" },
      { universityCode: "10213", majorCode: "080901", score: 648, rank: 3500, subjectReq: "物理" },
      { universityCode: "10561", majorCode: "080901", score: 635, rank: 6000, subjectReq: "物理" },
    ]

    for (const um of uniMajors) {
      const uni = await db.university.findUnique({ where: { code: um.universityCode } })
      if (!uni) continue
      await db.universityMajor.create({
        data: {
          universityId: uni.id, majorId: (await db.major.findUnique({ where: { code: um.majorCode } }))!.id,
          admissionScore: um.score, admissionRank: um.rank, year: 2025, subjectReq: um.subjectReq,
        },
      })
    }
  }

  // ====== 职业一天预览 (12个) ======
  console.log("  💼 写入职业预览...")
  const careerData = [
    { title: "后端开发工程师", industry: "互联网", city: "深圳", experience: "3年", education: "计算机科学 本科", satisfaction: 7, majorCode: "080901",
      timeline: [{ time: "08:30", activity: "闹钟响了三遍才起床，昨晚修bug到凌晨1点" }, { time: "09:30", activity: "到工位，看昨晚的CI/CD流水线" }, { time: "10:00", activity: "每日站会" }, { time: "10:30", activity: "写代码，今天重构用户模块接口" }, { time: "12:00", activity: "食堂吃饭，吐槽产品经理又改需求" }, { time: "14:00", activity: "需求评审会，2小时" }, { time: "16:00", activity: "继续写代码，被测试打断3次" }, { time: "19:00", activity: "晚上效率最高，专注写代码" }, { time: "21:00", activity: "合入代码，写CR意见" }, { time: "23:00", activity: "躺床上刷B站，充实但也很累" }],
      salary: "税前22k/月，到手约16k，年终奖2-4个月", expense: "房租4k（合租），吃饭2k，通勤+其他2k，存8k",
      monthlyJoy: "独立负责的支付模块上线后零bug运行了一个月，Leader在周会上表扬了",
      monthlyWorry: "产品经理又双叒改了需求，改动量很大，上线时间不变",
      adviceToSelf: "大二暑假就该去实习的，不要等到大三。大学里多写项目少刷算法题。" },
    { title: "前端开发工程师", industry: "互联网", city: "杭州", experience: "2年", education: "软件工程 本科", satisfaction: 8, majorCode: "080902",
      timeline: [{ time: "08:00", activity: "起床，骑车20分钟到公司" }, { time: "09:00", activity: "到工位，喝咖啡，看技术群" }, { time: "09:30", activity: "查看Jira上的需求和Bug" }, { time: "10:00", activity: "写React组件，调样式——今天完成Dashboard改版" }, { time: "12:00", activity: "外卖到了，边吃边看教程" }, { time: "14:00", activity: "跨部门需求对齐会" }, { time: "15:30", activity: "遇到浏览器兼容问题" }, { time: "17:00", activity: "终于修好了Safari的bug" }, { time: "18:30", activity: "公司健身房跑步" }, { time: "20:30", activity: "下班回家" }],
      salary: "税前18k/月，到手约13k", expense: "房租3.5k，吃饭+生活4k，存5k",
      monthlyJoy: "做的Dashboard得到了设计团队好评",
      monthlyWorry: "产品经理不懂技术可行性，沟通成本大",
      adviceToSelf: "大学里除了前端还要学后端，全栈才是未来。GitHub要有开源项目。" },
    { title: "算法工程师", industry: "人工智能", city: "北京", experience: "2年", education: "人工智能 硕士", satisfaction: 8, majorCode: "080717",
      timeline: [{ time: "09:00", activity: "到公司，查看昨晚模型训练loss曲线" }, { time: "10:00", activity: "读新出的顶会论文，看看SOTA有没有更新" }, { time: "11:00", activity: "和团队讨论新模型架构方案" }, { time: "14:00", activity: "写代码实现新算法，调参" }, { time: "18:00", activity: "提交训练任务到GPU集群，预估跑8小时" }, { time: "20:00", activity: "写技术文档和实验报告" }, { time: "21:00", activity: "下班——模型在云上跑着，明早看结果" }],
      salary: "税前28k/月，到手约20k，年终奖3-6个月", expense: "房租6k（一居室），吃饭2k，存10k+",
      monthlyJoy: "新模型在benchmark上提升了2.3个点，Leader说可以做技术分享",
      monthlyWorry: "领域更新太快，不持续读论文就会被淘汰——永远在学习",
      adviceToSelf: "数学基础太重要了。大学里高数、线代、概率论每一门都要认真学。" },
    { title: "投资银行分析师", industry: "金融", city: "上海", experience: "2年", education: "金融学 硕士", satisfaction: 5, majorCode: "020301K",
      timeline: [{ time: "07:00", activity: "起床，快速洗漱换西装" }, { time: "08:00", activity: "到办公室，检查邮件" }, { time: "08:30", activity: "晨会，MD分配任务" }, { time: "09:00", activity: "做财务模型——DCF估值，Excel就是命" }, { time: "12:30", activity: "午饭在工位解决，边吃边改PPT" }, { time: "14:00", activity: "和客户电话会议" }, { time: "16:00", activity: "VP说Pitchbook今晚必须发" }, { time: "22:00", activity: "发完Pitchbook，开始做行业研究" }, { time: "01:00", activity: "打车回家" }],
      salary: "税前30k/月 + Bonus（6-12个月）", expense: "房租8k（陆家嘴），置装+社交5k",
      monthlyJoy: "主导的并购项目成功Close了",
      monthlyWorry: "连续三周每天16小时，身体吃不消",
      adviceToSelf: "投行很看重人脉和实习经历。CPA/CFA越早考越好。" },
    { title: "三甲医院住院医师", industry: "医疗", city: "北京", experience: "2年", education: "临床医学 硕士", satisfaction: 6, majorCode: "100201K",
      timeline: [{ time: "06:30", activity: "起床" }, { time: "07:30", activity: "到科室，查房前准备" }, { time: "08:00", activity: "随主任查房" }, { time: "09:30", activity: "开医嘱、写病程记录" }, { time: "12:00", activity: "午饭15分钟" }, { time: "14:00", activity: "处理新入院病人" }, { time: "18:00", activity: "今天值班" }, { time: "20:00", activity: "处理急诊会诊" }, { time: "02:00", activity: "终于躺下，但随时可能被叫醒" }],
      salary: "税前8k/月 + 夜班费，到手约7k", expense: "房租3k，吃饭2k，基本月光",
      monthlyJoy: "重症病人好转出院，家属握着我的手说谢谢",
      monthlyWorry: "收入确实低。同龄学计算机的在攒首付，我还在为房租发愁",
      adviceToSelf: "如果真爱医学就坚持。如果只是家里逼的——尽早转行。" },
    { title: "执业律师（诉讼方向）", industry: "法律服务", city: "北京", experience: "4年", education: "法学 本科", satisfaction: 7, majorCode: "030101K",
      timeline: [{ time: "08:00", activity: "起床，边吃早餐边回顾开庭案子" }, { time: "09:00", activity: "到律所，开庭前最后沟通" }, { time: "10:00", activity: "去法院开庭" }, { time: "10:30", activity: "庭审——举证、质证、辩论" }, { time: "14:00", activity: "回律所，整理庭审记录" }, { time: "16:00", activity: "接待新客户——离婚纠纷" }, { time: "18:00", activity: "写另一案子的起诉状" }, { time: "21:30", activity: "下班，脑子还在想明天的案子" }],
      salary: "税前20k/月，年底按案源提成", expense: "房租4k，社交2k，存6k",
      monthlyJoy: "庭审时找到对方证据致命漏洞，法官明显偏向我们",
      monthlyWorry: "案源不稳定，忙的时候案子堆成山，淡的时候心慌",
      adviceToSelf: "法考是起点不是终点。大学里早去律所实习，了解不同方向。" },
    { title: "电气工程师（国家电网）", industry: "电力", city: "南京", experience: "3年", education: "电气工程 本科", satisfaction: 8, majorCode: "080601",
      timeline: [{ time: "08:00", activity: "到变电站，开晨会分配任务" }, { time: "09:00", activity: "巡检设备，检查变压器和开关柜" }, { time: "10:30", activity: "处理一条馈线保护动作，排查故障原因" }, { time: "12:00", activity: "食堂午饭，和同事聊天" }, { time: "14:00", activity: "写故障分析报告" }, { time: "16:00", activity: "参加安全培训——电力行业安全第一" }, { time: "17:30", activity: "准时下班（电网的好处）" }],
      salary: "税前12k/月 + 年终3-6个月 + 各种福利", expense: "房租2k（单位有宿舍补贴），吃喝2k，存7k+",
      monthlyJoy: "年终奖发了5个月，加上公积金一年攒了15万",
      monthlyWorry: "升迁靠熬年头，技术性不如互联网强，有点担心温水煮青蛙",
      adviceToSelf: "电气进电网性价比很高，但要主动学习新技术（智能电网、新能源）。" },
    { title: "数据分析师", industry: "互联网", city: "杭州", experience: "2年", education: "统计学 本科", satisfaction: 7, majorCode: "071201",
      timeline: [{ time: "09:30", activity: "到公司，检查数据看板和报警" }, { time: "10:00", activity: "写SQL提取数据，给产品经理拉一份用户行为分析" }, { time: "11:00", activity: "做AB测试显著性检验" }, { time: "14:00", activity: "跨部门数据需求评审会" }, { time: "15:00", activity: "用Python做用户分群模型" }, { time: "18:00", activity: "做数据可视化Dashboard" }, { time: "19:30", activity: "下班——今天不用加班" }],
      salary: "税前15k/月，到手约11k", expense: "房租3k，生活3k，存5k",
      monthlyJoy: "做的用户流失预测模型帮助产品留住了15%的流失用户",
      monthlyWorry: "业务方对数据的理解有限，经常需要反复解释统计概念",
      adviceToSelf: "SQL一定要精通，Python/R至少精通一门。实际工作中数据清洗占80%时间。" },
    { title: "建筑设计师", industry: "建筑设计", city: "上海", experience: "4年", education: "建筑学 硕士", satisfaction: 6, majorCode: "081001",
      timeline: [{ time: "09:00", activity: "到设计院，打开CAD和Revit" }, { time: "09:30", activity: "继续昨晚没画完的施工图" }, { time: "11:00", activity: "甲方打电话来又要改方案——已经是第8版了" }, { time: "14:00", activity: "修改设计方案，重做效果图" }, { time: "18:00", activity: "团队内部方案评审" }, { time: "20:00", activity: "继续改图——这一行的常态" }, { time: "22:30", activity: "终于交图，打车回家" }],
      salary: "税前15k/月 + 项目奖金", expense: "房租5k（上海），生活3k",
      monthlyJoy: "经过半年反复修改，项目终于通过了规划审批",
      monthlyWorry: "地产下行周期项目越来越少，设计费被压得很低",
      adviceToSelf: "建筑是周期行业。大学里多学参数化设计和BIM，提升数字化竞争力。" },
    { title: "外贸业务经理", industry: "外贸", city: "广州", experience: "5年", education: "国贸 本科", satisfaction: 7, majorCode: "020401",
      timeline: [{ time: "08:30", activity: "到办公室，先看邮件——国外客户有时差" }, { time: "09:00", activity: "和欧洲客户电话会议，讨论下一季订单" }, { time: "10:30", activity: "去工厂查看生产进度，确认样品质量" }, { time: "14:00", activity: "处理报关和物流问题" }, { time: "16:00", activity: "在阿里巴巴国际站回复询盘" }, { time: "18:00", activity: "和潜在客户吃饭——广交会期间的商务应酬" }, { time: "21:00", activity: "回家，手机上继续回复海外消息" }],
      salary: "底薪10k + 提成，年收入约25-40万", expense: "房租3k，应酬3k，存10k+",
      monthlyJoy: "签了一个欧洲大客户，年订单额超过500万",
      monthlyWorry: "汇率波动和贸易政策不确定性——人民币升值就少赚很多",
      adviceToSelf: "英语是基础，产品和行业知识才是核心竞争力。大学里多学外贸实务。" },
    { title: "小学语文教师", industry: "教育", city: "成都", experience: "3年", education: "汉语言文学 本科", satisfaction: 9, majorCode: "050101",
      timeline: [{ time: "07:30", activity: "到校，准备今天的课件" }, { time: "08:00", activity: "早读——带学生朗读课文" }, { time: "08:30", activity: "第一节语文课——今天讲《背影》" }, { time: "10:00", activity: "第二节语文课——作文指导" }, { time: "12:00", activity: "陪学生吃午饭，管理午休" }, { time: "14:00", activity: "批改作业和作文——52本" }, { time: "16:00", activity: "教研组备课会议" }, { time: "17:00", activity: "放学——和家长沟通个别学生情况" }, { time: "18:00", activity: "下班回家——寒暑假是最大的福利" }],
      salary: "税前7k/月 + 绩效 + 十三薪", expense: "房租1.5k（成都），吃喝2k，存3k+",
      monthlyJoy: "一个平时内向的学生在作文里写'我最喜欢的老师是语文老师'",
      monthlyWorry: "家长群消息永远回不完，非教学事务占比越来越高",
      adviceToSelf: "当老师不只是教书，更是育人。大学里多练粉笔字和普通话。" },
    { title: "HR 人才发展专员", industry: "科技", city: "深圳", experience: "3年", education: "人力资源管理 本科", satisfaction: 7, majorCode: "120206",
      timeline: [{ time: "09:00", activity: "到公司，查看今天的面试安排" }, { time: "10:00", activity: "面试3个产品经理候选人" }, { time: "12:00", activity: "和新入职员工一起吃午饭" }, { time: "14:00", activity: "设计Q3培训方案" }, { time: "16:00", activity: "和部门经理讨论绩效评估结果" }, { time: "18:30", activity: "组织新员工入职培训活动" }, { time: "20:00", activity: "整理明天的面试安排，下班" }],
      salary: "税前13k/月，到手约9.5k", expense: "房租3.5k（深圳），生活3k，存3k",
      monthlyJoy: "设计的管培生培养方案得到了CEO的认可，将在全公司推广",
      monthlyWorry: "裁员季——HR既要执行又要安抚，夹在公司和个人之间很难",
      adviceToSelf: "HR不只是招聘。大学里多学组织行为学和劳动法。" },
  ]

  for (const cd of careerData) {
    const major = await db.major.findUnique({ where: { code: cd.majorCode } })
    await db.careerDay.create({
      data: {
        title: cd.title, industry: cd.industry, city: cd.city,
        experience: cd.experience, education: cd.education,
        timeline: j(cd.timeline), salary: cd.salary, expense: cd.expense,
        monthlyJoy: cd.monthlyJoy, monthlyWorry: cd.monthlyWorry,
        adviceToSelf: cd.adviceToSelf, satisfaction: cd.satisfaction,
        majorId: major?.id ?? null,
      },
    })
  }

  // ====== 后悔清单 (25条) ======
  console.log("  💔 写入后悔清单...")
  const regretData = [
    { grade: "大一", category: "study", content: "以为大学就是放松的，大一上学期GPA从3.8掉到2.5才醒悟——保研资格直接从大一开始就丢了。", tags: ["GPA", "挂科", "保研"], isLate: false, remedy: "大一还有三个学期可以拉回来！从下学期开始认真对待每一门课。" },
    { grade: "大一", category: "study", content: "没重视四级考试，裸考400分没过。后来发现保研要求六级，四级不过不能考六级。", tags: ["四级", "英语", "保研"], isLate: false, remedy: "每天30分钟背单词+刷真题，你还有至少3次考试机会。" },
    { grade: "大一", category: "life", content: "花钱没概念，一个学期花完了全年的生活费预算。网贷欠了2万，靠兼职还了整整一年。", tags: ["理财", "网贷"], isLate: false, remedy: "从今天开始记账。已经负债了，跟家里坦白比以贷养贷好一万倍。" },
    { grade: "大一", category: "social", content: "加了6个社团和学生会，每天都忙到晚上11点——但全是搬桌子打杂，什么能力都没锻炼到。", tags: ["社团", "时间管理"], isLate: false, remedy: "下学期精简到2个以内。把时间还给学习和实习。" },
    { grade: "大一", category: "study", content: "没有主动了解专业到底学什么、将来做什么。大二才发现自己根本不喜欢，但因为信息差错过了转专业窗口。", tags: ["转专业", "信息差"], isLate: true, remedy: "转专业窗口已关闭，但你可以考研跨考或辅修。很多人毕业做的都不是本专业。" },
    { grade: "大二", category: "career", content: "大二暑假在家躺了两个月。开学才知道室友去了大厂实习拿到了return offer，心态直接崩了。", tags: ["实习", "暑假"], isLate: false, remedy: "距离大三暑假还有一年！现在就开始关注实习信息准备简历。" },
    { grade: "大二", category: "study", content: "六级考了三次都没过，因为每次都只准备两周就去裸考。最后一次差5分——但保研申请已截止。", tags: ["六级", "英语"], isLate: false, remedy: "认真准备3个月，每天1小时——六级是可以系统性拿下的。" },
    { grade: "大二", category: "life", content: "没有建立运动习惯，大学四年胖了30斤。体测不及格差点影响毕业——更糟的是形成了不健康的生活方式。", tags: ["健康", "运动"], isLate: false, remedy: "现在开始每天运动30分钟，大三大四养成好习惯完全来得及。" },
    { grade: "大二", category: "career", content: "放弃了参加数学建模竞赛的机会，觉得太难了。后来发现面试官看到数模经历会主动加分——错失了一个含金量极高的项目。", tags: ["竞赛", "简历"], isLate: false, remedy: "大三还有机会！关注挑战杯、互联网+、美赛等参赛渠道。" },
    { grade: "大三", category: "career", content: "既想考研又想秋招，结果两头抓两头空。考研差10分过线，秋招也只拿了一个不满意的offer。", tags: ["考研", "秋招", "时间冲突"], isLate: false, remedy: "考研和秋招本质冲突，选一个作为主线，另一个只做最低限度保底。" },
    { grade: "大三", category: "career", content: "以为自己很厉害不需要实习，简历写满'熟练''精通'，面试被问实际项目问题就哑口无言了。", tags: ["实习", "简历", "面试"], isLate: false, remedy: "大四上还有春招！现在开始做一个完整的个人项目，或给开源项目贡献代码。" },
    { grade: "大三", category: "study", content: "考研选了一个只招5个人的名校王牌专业。成绩不低但排第7。如果选另一个学校早就是第一名了。", tags: ["考研择校", "信息差"], isLate: false, remedy: "立刻做详细的报录比调研！看实际招生人数、复试淘汰率、录取分数线。" },
    { grade: "大三", category: "career", content: "以为进了名校就高枕无忧，结果秋招发现身边同学都有2-3段大厂实习，自己简历一片空白。", tags: ["实习", "竞争"], isLate: false, remedy: "补实习或做个人项目。名校是敲门砖但不是通行证，真正竞争力是你的能力和经验。" },
    { grade: "大三", category: "life", content: "学校心理咨询服务是免费的但我从没去过。焦虑失眠了整整一学期，如果早点求助也许不会那么痛苦。", tags: ["心理健康", "求助"], isLate: false, remedy: "大多数高校提供免费心理咨询服务。如果有困扰，今天就预约——这不是软弱。" },
    { grade: "大四", category: "career", content: "到了大四才发现自己除了毕业证什么都没有——没实习、没项目、没竞赛、没技能。投了80份简历只收到3个面试。", tags: ["简历空白", "焦虑"], isLate: true, remedy: "还有春招、社招、考公、二战多条路。路比别人更长但你不是没机会。" },
    { grade: "大四", category: "life", content: "四年大学一眨眼就过去了，最遗憾的不是成绩不好，而是没有认真探索自己真正喜欢什么、擅长什么。", tags: ["自我认知", "迷茫"], isLate: false, remedy: "探索自己是一生的事业。很多人30岁才找到真正想做的事。" },
    { grade: "大四", category: "career", content: "签了三方才发现起薪比同期同学低了30%，因为面试时不会谈薪资。多问几句话就能多几千块——但我没有。", tags: ["薪资谈判", "信息差"], isLate: false, remedy: "面试前一定做薪资调研！去脉脉/看准网/OfferShow了解行业薪资水平。" },
    { grade: "大四", category: "study", content: "毕业论文拖到最后一刻才动手，东拼西凑写了三周，查重率45%被退回重写，差点延期毕业。", tags: ["毕业论文", "拖延症"], isLate: false, remedy: "不要重蹈覆辙！提前2个月开始准备毕业论文，导师的意见要认真对待。" },
    { grade: "大一", category: "career", content: "完全忽视了英语口语。找实习面试时被要求英文自我介绍，当场卡壳说不出完整句子——那个实习机会是外企。", tags: ["英语口语", "面试"], isLate: false, remedy: "每天跟读TED演讲10分钟。大二大三的同学现在开始练完全来得及。" },
    { grade: "大二", category: "social", content: "整个大二只和室友说话，没参加任何社交活动。毕业时发现认识的人不超过20个——大学的人脉红利我完全没有吃到。", tags: ["社交", "人脉"], isLate: false, remedy: "主动参加1-2个高质量社团或活动。大学人脉不是功利，是信息渠道和互相支持的网络。" },
    { grade: "大三", category: "career", content: "放弃了申请海外交换的机会因为怕英语不够好。后来发现申请难度没那么高，而且交换经历在简历上是巨大亮点。", tags: ["交换", "勇气"], isLate: true, remedy: "大三下是大部分交换项目的最后申请窗口。如果来不及——考虑短期暑期项目。" },
    { grade: "大二", category: "life", content: "谈恋爱谈了两年半，分手时发现除了这段关系，自己什么也没剩下——没有自己的朋友圈子，没有自己的兴趣爱好。", tags: ["恋爱", "自我"], isLate: false, remedy: "恋爱不是大学的全部。保持自己的社交圈和爱好，健康的关系是两个完整的人在一起。" },
    { grade: "大一", category: "career", content: "不懂选课策略，选修课全是'水课'。后来发现选一些硬核选修课（如Python编程、数据可视化）在找工作时有巨大帮助。", tags: ["选课", "规划"], isLate: false, remedy: "下学期选课时重新评估：哪些课能真正提升你的技能和竞争力？" },
    { grade: "大四", category: "life", content: "大学四年读了不到10本书（除了教材）。现在工作了才发现知识面太窄，很多常识性的东西都不了解。", tags: ["阅读", "通识"], isLate: false, remedy: "读书是一生的事。从今天开始每个月读1本书——一年就是12本，毕业前还能读很多。" },
    { grade: "大三", category: "career", content: "一直想做产品经理但从没真正学过相关技能。如果从大一开始每个学期做一个产品分析、学一个工具，大四时竞争力会完全不同。", tags: ["技能积累", "复利"], isLate: false, remedy: "种一棵树最好的时间是十年前，其次是现在。从今天开始每天学一点。" },
  ]

  await db.regret.createMany({
    data: regretData.map((r) => ({
      grade: r.grade, category: r.category, content: r.content,
      tags: j(r.tags), isLate: r.isLate, remedy: r.remedy ?? null,
    })),
  })

  console.log(`✅ 种子完成！${ALL_MAJORS.length}个专业 · ${uniData.length}所院校 · ${careerData.length}个职业预览 · ${regretData.length}条后悔清单`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => db.$disconnect())
