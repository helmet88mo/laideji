import type { TrackPlan, PlanConflict } from "@/types"

export const SEMESTER_LABELS: Record<string, string> = {
  s1: "大一上", s2: "大一下", s3: "大二上", s4: "大二下",
  s5: "大三上", s6: "大三下", s7: "大四上", s8: "大四下",
}

/** 获取指定轨道的计划模板 */
export function getTrackPlan(trackId: string): TrackPlan | undefined {
  return TRACK_PLANS[trackId]
}

/** 获取全部 4 条轨道计划 */
export function getAllTrackPlans(): TrackPlan[] {
  return Object.values(TRACK_PLANS)
}

/** 给定已完成的里程碑 ID 集合，返回活跃的冲突列表 */
export function findConflicts(completedIds: string[]): PlanConflict[] {
  const completedSet = new Set(completedIds)
  return PLAN_CONFLICTS.filter((c) => completedSet.has(c.milestoneA) && completedSet.has(c.milestoneB))
}

export const TRACK_PLANS: Record<string, TrackPlan> = {
  // ============================================================
  // 本科就业
  // ============================================================
  employment: {
    trackId: "employment",
    trackLabel: "本科就业",
    icon: "💼",
    semesters: [
      {
        semesterId: "s1", semesterLabel: "大一上", milestones: [
          { id: "emp-s1-m1", title: "了解本专业就业方向", description: "查阅本专业近3年就业报告，了解主流去向行业和岗位类型", category: "规划" },
          { id: "emp-s1-m2", title: "建立GPA意识", description: "了解绩点计算方式，设定本学期GPA目标（建议3.0+），就业时GPA仍是重要参考", category: "学业" },
          { id: "emp-s1-m3", title: "通过英语四级（CET-4）", description: "报名并认真准备四级考试，500分以上为佳", category: "证书" },
          { id: "emp-s1-m4", title: "参加1个实践类社团", description: "选择一个与职业发展相关的社团（如职协、创协），最多2个以免分散精力", category: "实践" },
        ],
      },
      {
        semesterId: "s2", semesterLabel: "大一下", milestones: [
          { id: "emp-s2-m1", title: "保持GPA 3.0+", description: "避免「大一综合征」导致绩点滑坡——很多公司校招会看整体GPA", category: "学业" },
          { id: "emp-s2-m2", title: "学习一门编程语言", description: "Python 或 JavaScript，不管什么专业，基础编程能力都是职场加分项", category: "技能" },
          { id: "emp-s2-m3", title: "完成第一份简历草稿", description: "即使现在几乎空白也没关系——定期更新简历能帮你看到自己还缺什么", category: "规划" },
          { id: "emp-s2-m4", title: "暑假规划", description: "提前规划暑假：是学车、兼职、还是参加学校的暑期实践项目？不要白白浪费", category: "实践" },
        ],
      },
      {
        semesterId: "s3", semesterLabel: "大二上", milestones: [
          { id: "emp-s3-m1", title: "通过英语六级（CET-6）", description: "四级之后立即准备六级，很多企业网申直接筛六级成绩", category: "证书" },
          { id: "emp-s3-m2", title: "明确目标行业（2-3个）", description: "结合专业和兴趣，圈定2-3个目标行业，开始关注行业动态和头部企业", category: "规划" },
          { id: "emp-s3-m3", title: "学习Excel/PPT高级技能", description: "Excel（VLOOKUP/数据透视表）和PPT是职场通用硬通货——比泡社团有用100倍", category: "技能" },
          { id: "emp-s3-m4", title: "参加一个竞赛项目", description: "挑战杯、互联网+、数学建模等，竞赛经历是简历上的重要亮点", category: "实践" },
        ],
      },
      {
        semesterId: "s4", semesterLabel: "大二下", milestones: [
          { id: "emp-s4-m1", title: "找到第一份实习", description: "大二暑假是找实习的黄金窗口！关注实习僧/Boss直聘/企业官网，提前2个月投递", category: "实习" },
          { id: "emp-s4-m2", title: "完善简历", description: "用STAR法则重写简历（情境-任务-行动-结果），找学长学姐或就业指导中心帮忙修改", category: "规划" },
          { id: "emp-s4-m3", title: "确定是否需要考证", description: "根据目标行业确定：教资/初级会计/证券从业/软考等，不是所有证都值得考", category: "证书" },
          { id: "emp-s4-m4", title: "建立LinkedIn/脉脉账号", description: "完善个人资料，关注目标企业的招聘动态，开始建立职场人脉", category: "人脉" },
        ],
      },
      {
        semesterId: "s5", semesterLabel: "大三上", milestones: [
          { id: "emp-s5-m1", title: "深度行业研究", description: "针对目标行业做深度调研：主要企业、薪资水平、晋升路径、行业趋势", category: "规划" },
          { id: "emp-s5-m2", title: "提升面试技能", description: "学习结构化面试技巧，准备常见行为面试问题，模拟群面（无领导小组讨论）", category: "技能" },
          { id: "emp-s5-m3", title: "第二份实习（目标企业相关）", description: "如果暑假没实习或者想换方向，大三上可以利用课余时间做远程/兼职实习", category: "实习" },
          { id: "emp-s5-m4", title: "开始准备校招信息库", description: "整理目标企业的校招时间线、岗位要求、笔试面试题型——信息差就是优势", category: "规划" },
        ],
      },
      {
        semesterId: "s6", semesterLabel: "大三下", milestones: [
          { id: "emp-s6-m1", title: "大三暑假实习（可转正）", description: "这是最重要的实习！很多大厂的暑期实习生转正率超过50%，全力以赴", category: "实习", conflicts: ["pg-s6-m2", "cs-s6-m1"] },
          { id: "emp-s6-m2", title: "刷笔试题库", description: "针对目标企业的笔试：行测/性格测试/专业技术题，提前2个月刷题", category: "技能" },
          { id: "emp-s6-m3", title: "参加企业宣讲会", description: "线下或线上宣讲会是了解企业文化、获取内推码的好机会", category: "人脉" },
          { id: "emp-s6-m4", title: "最终确定求职方向", description: "综合前两年的探索，锁定1-2个具体岗位方向（如：产品经理、后端开发、市场管培）", category: "规划" },
        ],
      },
      {
        semesterId: "s7", semesterLabel: "大四上", milestones: [
          { id: "emp-s7-m1", title: "秋招全面出击", description: "9-11月是校招黄金期！网申→笔试→群面→单面→终面，每周至少投递10家企业", category: "求职", conflicts: ["pg-s7-m1", "cs-s7-m2"] },
          { id: "emp-s7-m2", title: "准备多版本简历", description: "根据不同岗位方向调整简历侧重点，一份简历投所有是最大的浪费", category: "求职" },
          { id: "emp-s7-m3", title: "拿到至少1个offer", description: "目标：在12月之前至少拿到一个offer作为保底，减少焦虑", category: "求职" },
          { id: "emp-s7-m4", title: "毕业设计开题", description: "不要因为求职完全放弃学业——确保毕业设计顺利进行，顺利毕业是前提", category: "学业" },
        ],
      },
      {
        semesterId: "s8", semesterLabel: "大四下", milestones: [
          { id: "emp-s8-m1", title: "春招补录（如需）", description: "如果秋招不满意，2-4月是春招补录窗口。岗位少但竞争也相对小", category: "求职" },
          { id: "emp-s8-m2", title: "签署三方协议", description: "拿到满意offer后签署三方，了解薪资结构、五险一金、试用期等条款", category: "入职" },
          { id: "emp-s8-m3", title: "完成毕业设计/答辩", description: "确保顺利毕业——学位证是入职的前提条件", category: "学业" },
          { id: "emp-s8-m4", title: "入职前技能储备", description: "根据offer岗位的JD，针对性学习工作中会用到的工具和技能，快速上手", category: "技能" },
        ],
      },
    ],
  },

  // ============================================================
  // 考研深造
  // ============================================================
  postgraduate: {
    trackId: "postgraduate",
    trackLabel: "考研深造",
    icon: "📚",
    semesters: [
      {
        semesterId: "s1", semesterLabel: "大一上", milestones: [
          { id: "pg-s1-m1", title: "了解本专业考研方向", description: "查阅本专业考研可以报考的一级学科和二级学科方向，了解学硕vs专硕的区别", category: "规划" },
          { id: "pg-s1-m2", title: "打好数学基础", description: "考研数学（一/二/三）是拉开差距的关键——大一的高数、线代、概率论每一门都认真学", category: "学业" },
          { id: "pg-s1-m3", title: "保持英语学习习惯", description: "英语一/二的阅读理解难度高，需要长期积累。每天背30个单词，大一开始不晚", category: "学业" },
          { id: "pg-s1-m4", title: "了解保研政策", description: "查询本校保研率、保研条件（GPA排名、竞赛加分、论文加分），保研比考研轻松太多", category: "规划" },
        ],
      },
      {
        semesterId: "s2", semesterLabel: "大一下", milestones: [
          { id: "pg-s2-m1", title: "GPA冲进前30%", description: "保研标准通常要求专业前30%（985/211更高），从大一就开始认真对待每门考试", category: "学业" },
          { id: "pg-s2-m2", title: "通过四级（500+）", description: "四级高分是六级的基础，考研复试也会参考英语水平", category: "证书" },
          { id: "pg-s2-m3", title: "了解目标院校", description: "浏览2-3所目标院校的研究生院官网，了解招生简章、专业目录、报录比", category: "规划" },
        ],
      },
      {
        semesterId: "s3", semesterLabel: "大二上", milestones: [
          { id: "pg-s3-m1", title: "通过六级（480+）", description: "六级高分在考研复试中是一个加分项，部分学校有六级分数要求", category: "证书" },
          { id: "pg-s3-m2", title: "确定目标院校和专业", description: "锁定3-5所目标院校（冲稳保），了解各校报录比、专业课考试科目", category: "规划" },
          { id: "pg-s3-m3", title: "参加学科竞赛", description: "挑战杯/数学建模/大创项目——竞赛获奖是保研加分项，也是考研复试的亮点", category: "实践" },
        ],
      },
      {
        semesterId: "s4", semesterLabel: "大二下", milestones: [
          { id: "pg-s4-m1", title: "评估保研可能性", description: "根据GPA排名评估：如果能进前20%，全力保研；如果差距大，提前规划考研", category: "规划" },
          { id: "pg-s4-m2", title: "开始准备考研英语", description: "系统背考研词汇（5500词），每周做1篇真题阅读，培养语感", category: "备考" },
          { id: "pg-s4-m3", title: "联系目标院校学长学姐", description: "通过考研论坛/知乎/QQ群找到目标院校在读研究生，了解真实备考经验", category: "人脉" },
        ],
      },
      {
        semesterId: "s5", semesterLabel: "大三上", milestones: [
          { id: "pg-s5-m1", title: "正式启动考研复习", description: "制定全年复习计划：3-6月基础、7-9月强化、10-11月冲刺、12月模考", category: "备考" },
          { id: "pg-s5-m2", title: "系统复习数学/专业课", description: "跟着考研名师网课（张宇/汤家凤/李永乐）过第一轮，教材+课后题全部刷完一遍", category: "备考" },
          { id: "pg-s5-m3", title: "关注夏令营信息（保研路线）", description: "如果走保研路线，大三下4-6月是各大高校夏令营申请高峰期", category: "规划" },
        ],
      },
      {
        semesterId: "s6", semesterLabel: "大三下", milestones: [
          { id: "pg-s6-m1", title: "结束第一轮复习", description: "6月前完成数学、英语、专业课的第一轮系统复习，政治7月开始即可", category: "备考" },
          { id: "pg-s6-m2", title: "进入第二轮强化", description: "7-9月：数学刷题（660/1000题）、英语真题精读、专业课背诵——每天学习8-10小时", category: "备考", conflicts: ["emp-s6-m1", "cs-s6-m1"] },
          { id: "pg-s6-m3", title: "参加夏令营/联系导师", description: "保研路线：参加目标院校夏令营。考研路线：初试后再联系导师即可", category: "规划" },
        ],
      },
      {
        semesterId: "s7", semesterLabel: "大四上", milestones: [
          { id: "pg-s7-m1", title: "考研冲刺阶段", description: "10-11月：真题模考+政治背诵+查漏补缺。每天保持10-12小时高效学习", category: "备考", conflicts: ["emp-s7-m1", "cs-s7-m2"] },
          { id: "pg-s7-m2", title: "考研报名确认", description: "10月网上报名，11月现场/网上确认——错过任何一个环节都意味着一年白费", category: "报名" },
          { id: "pg-s7-m3", title: "12月参加初试", description: "调整好心态和作息，考前一周不要再学新内容，巩固已有的知识即可", category: "考试" },
        ],
      },
      {
        semesterId: "s8", semesterLabel: "大四下", milestones: [
          { id: "pg-s8-m1", title: "准备复试", description: "2-3月：准备英语口语、专业课面试、综合面试。联系导师表达研究兴趣", category: "复试" },
          { id: "pg-s8-m2", title: "参加复试/调剂", description: "3-4月参加复试。如果初试成绩不理想，立即准备调剂——信息战、速度战", category: "复试" },
          { id: "pg-s8-m3", title: "完成毕业设计", description: "确保毕业设计不影响录取——部分学校要求录取前拿到学位证", category: "学业" },
          { id: "pg-s8-m4", title: "考研失败Plan B", description: "如果不幸未能上岸：春招补录/二战评估/申请港澳或海外硕士——不要钻牛角尖", category: "备选" },
        ],
      },
    ],
  },

  // ============================================================
  // 考公/考编
  // ============================================================
  civil_service: {
    trackId: "civil_service",
    trackLabel: "考公/考编",
    icon: "🏛️",
    semesters: [
      {
        semesterId: "s1", semesterLabel: "大一上", milestones: [
          { id: "cs-s1-m1", title: "了解公务员考试体系", description: "了解国考、省考、选调生的区别，以及不同岗位对专业的要求", category: "规划" },
          { id: "cs-s1-m2", title: "确认专业是否符合报考要求", description: "查询近3年国考和省考职位表，了解你的专业对应哪些岗位、竞争比例如何", category: "规划" },
          { id: "cs-s1-m3", title: "保持GPA", description: "选调生通常要求党员+学生干部+成绩前50%，GPA太低会失去资格", category: "学业" },
        ],
      },
      {
        semesterId: "s2", semesterLabel: "大一下", milestones: [
          { id: "cs-s2-m1", title: "提交入党申请书", description: "入党流程需要2-3年——大一提交申请书是最佳时机，越早越好", category: "身份" },
          { id: "cs-s2-m2", title: "竞选班委/学生会", description: "选调生普遍要求'学生干部经历'，班长/团支书/学生会部长均可", category: "身份" },
          { id: "cs-s2-m3", title: "培养申论写作基础", description: "公务员考试申论占50%——平时多读人民日报评论、半月谈，培养官方语感", category: "技能" },
        ],
      },
      {
        semesterId: "s3", semesterLabel: "大二上", milestones: [
          { id: "cs-s3-m1", title: "成为入党积极分子", description: "参加党课培训，按时提交思想汇报，争取早日成为预备党员", category: "身份" },
          { id: "cs-s3-m2", title: "持续积累时政知识", description: "每天花15分钟浏览时政要闻（学习强国APP），行测常识判断和申论都依赖时政积累", category: "备考" },
          { id: "cs-s3-m3", title: "选修公文写作相关课程", description: "如果有公文写作、行政管理类选修课，建议选修——对申论和日后工作都有帮助", category: "技能" },
          { id: "cs-s3-m4", title: "了解选调生政策", description: "定向选调vs普通选调的区别、报考条件、发展路径——选调生是应届生进入体制的最佳通道", category: "规划" },
        ],
      },
      {
        semesterId: "s4", semesterLabel: "大二下", milestones: [
          { id: "cs-s4-m1", title: "成为预备党员", description: "如果流程顺利，大二下学期应该成为预备党员", category: "身份" },
          { id: "cs-s4-m2", title: "评估国考vs省考vs选调", description: "根据自己专业、家乡、目标城市综合评估：国考（中央部委）、省考（省市机关）、选调（基层培养）", category: "规划" },
          { id: "cs-s4-m3", title: "开始行测基础学习", description: "行测5大模块：常识判断、言语理解、数量关系、判断推理、资料分析——了解题型和难度", category: "备考" },
        ],
      },
      {
        semesterId: "s5", semesterLabel: "大三上", milestones: [
          { id: "cs-s5-m1", title: "系统学习行测", description: "按模块系统学习行测解题技巧，推荐粉笔/中公/华图教材，每天2小时", category: "备考" },
          { id: "cs-s5-m2", title: "开始申论训练", description: "每周写1-2篇申论大作文，找学长学姐或老师批改。申论无法速成，必须长期积累", category: "备考" },
          { id: "cs-s5-m3", title: "确保按期转正为正式党员", description: "预备期满1年申请转正——确保在大四报考选调生之前拿到正式党员身份", category: "身份" },
        ],
      },
      {
        semesterId: "s6", semesterLabel: "大三下", milestones: [
          { id: "cs-s6-m1", title: "进入刷题强化阶段", description: "每天一套行测真题（限时120分钟）+ 申论小题练习。暑假是黄金备考期，每天6-8小时", category: "备考", conflicts: ["emp-s6-m1", "pg-s6-m2"] },
          { id: "cs-s6-m2", title: "关注国考职位表", description: "10月国考公告发布后，第一时间筛选符合条件的岗位——选岗比备考更重要", category: "报名" },
          { id: "cs-s6-m3", title: "模拟面试训练", description: "结构化面试是很多人的短板——提前了解面试流程，找同学组队练习", category: "备考" },
        ],
      },
      {
        semesterId: "s7", semesterLabel: "大四上", milestones: [
          { id: "cs-s7-m1", title: "参加国考笔试", description: "11月底国考笔试（行测+申论），考前1周调整作息、保持状态", category: "考试" },
          { id: "cs-s7-m2", title: "参加省考/选调笔试", description: "12月-次年1月各省省考、定向选调集中笔试——多报几个省份分散风险", category: "考试", conflicts: ["emp-s7-m1", "pg-s7-m1"] },
          { id: "cs-s7-m3", title: "准备面试", description: "笔试通过后立即准备面试：报班或自学，结构化面试/无领导小组讨论——面试翻盘很常见", category: "考试" },
        ],
      },
      {
        semesterId: "s8", semesterLabel: "大四下", milestones: [
          { id: "cs-s8-m1", title: "参加面试/体检/政审", description: "1-4月密集面试期——保持手机畅通，提前准备政审材料，体检前一周清淡饮食", category: "入职" },
          { id: "cs-s8-m2", title: "毕业设计完成", description: "确保不影响毕业和入职——对于已经上岸的同学，顺利毕业最重要", category: "学业" },
          { id: "cs-s8-m3", title: "考公失败Plan B", description: "如果国考省考都未上岸：事业单位考试/三支一扶/西部计划/国企招聘——体制内不止公务员一条路", category: "备选" },
        ],
      },
    ],
  },

  // ============================================================
  // 出国留学
  // ============================================================
  abroad: {
    trackId: "abroad",
    trackLabel: "出国留学",
    icon: "✈️",
    semesters: [
      {
        semesterId: "s1", semesterLabel: "大一上", milestones: [
          { id: "ab-s1-m1", title: "了解留学基本概念", description: "了解授课型硕士vs研究型硕士、PhD申请的区别，以及主流留学国家（美英澳加港新）的特点", category: "规划" },
          { id: "ab-s1-m2", title: "GPA从一开始就重视", description: "留学申请GPA是硬指标——英美名校通常要求3.5+/4.0（85分+），从大一开始每门课都不能放松", category: "学业" },
          { id: "ab-s1-m3", title: "评估家庭经济预算", description: "了解各国留学费用（学费+生活费）：美国50-70万/年，英国40-50万，德国/法国部分公立免学费", category: "规划" },
        ],
      },
      {
        semesterId: "s2", semesterLabel: "大一下", milestones: [
          { id: "ab-s2-m1", title: "开始背单词（托福/雅思）", description: "每天背30-50个托福/雅思核心词汇，大一打好词汇基础——不要等到大三才开始", category: "语言" },
          { id: "ab-s2-m2", title: "通过四级（600+）", description: "四级高分代表英语基础扎实，后续托福/雅思备考会轻松很多", category: "证书" },
          { id: "ab-s2-m3", title: "了解目标国家院校", description: "浏览QS/THE排名，了解目标专业在不同国家的排名和申请难度", category: "规划" },
        ],
      },
      {
        semesterId: "s3", semesterLabel: "大二上", milestones: [
          { id: "ab-s3-m1", title: "参加托福/雅思培训", description: "报班或自学，系统学习考试技巧。建议先考一次摸底，了解自己的真实水平", category: "语言" },
          { id: "ab-s3-m2", title: "通过六级（550+）", description: "六级550+对申请部分港校/中外合作项目有帮助", category: "证书" },
          { id: "ab-s3-m3", title: "初步确定目标国家和学校", description: "锁定3-5所目标院校（2所冲刺+2所匹配+1所保底），了解各校申请要求和截止日期", category: "规划" },
          { id: "ab-s3-m4", title: "开始参与科研/项目", description: "联系本院教授参与科研课题——推荐信需要至少1封来自学术导师", category: "背景" },
        ],
      },
      {
        semesterId: "s4", semesterLabel: "大二下", milestones: [
          { id: "ab-s4-m1", title: "首考托福（目标90+）或雅思（目标6.5+）", description: "大二结束前拿到一个可用分数，后续只需要刷分提高", category: "语言" },
          { id: "ab-s4-m2", title: "确定是否需要考GRE/GMAT", description: "美国理工科需要GRE（325+为佳）、商科需要GMAT（700+），英国大部分不需要", category: "规划" },
          { id: "ab-s4-m3", title: "暑假海外交流/暑校", description: "如果条件允许，参加目标学校的Summer School——实地体验+拿推荐信的双重收益", category: "背景" },
        ],
      },
      {
        semesterId: "s5", semesterLabel: "大三上", milestones: [
          { id: "ab-s5-m1", title: "托福刷到100+ / 雅思刷到7.0+", description: "大三上学期必须拿到满意的语言成绩——大四再考就来不及了", category: "语言" },
          { id: "ab-s5-m2", title: "准备GRE/GMAT（如需）", description: "GRE词汇+数学+写作，备考周期3-6个月，建议大三上开始", category: "考试" },
          { id: "ab-s5-m3", title: "联系推荐人", description: "提前和2-3位教授/实习主管沟通推荐信事宜——好的推荐信需要时间酝酿", category: "文书" },
          { id: "ab-s5-m4", title: "保持科研/实习产出", description: "论文发表、项目结题、实习证明——所有材料在大三结束前尽量到位", category: "背景" },
        ],
      },
      {
        semesterId: "s6", semesterLabel: "大三下", milestones: [
          { id: "ab-s6-m1", title: "完成GRE/GMAT考试", description: "最晚大三下6月前出分——暑假开始准备文书，不再为标化考试花时间", category: "考试", conflicts: ["cs-s6-m1"] },
          { id: "ab-s6-m2", title: "开始撰写个人陈述（PS/SOP）", description: "7-8月暑假：反复打磨个人陈述，讲好你的故事——为什么选这个专业、为什么选这个学校", category: "文书" },
          { id: "ab-s6-m3", title: "准备简历（CV/Resume）", description: "学术型CV：强调科研经历、论文、GPA。专业型Resume：强调实习经历、项目成果", category: "文书" },
          { id: "ab-s6-m4", title: "确认推荐信到位", description: "确保推荐人已经提交推荐信——很多学校是推荐人直接提交，学生看不到内容", category: "文书" },
        ],
      },
      {
        semesterId: "s7", semesterLabel: "大四上", milestones: [
          { id: "ab-s7-m1", title: "提交留学申请", description: "9-12月：美国早申10-11月截止，英国rolling制早申早录，香港12月截止——注意时差！", category: "申请", conflicts: ["emp-s7-m1"] },
          { id: "ab-s7-m2", title: "准备面试（如需）", description: "部分学校和专业有视频面试或真人面试——提前准备常见问题，模拟练习", category: "申请" },
          { id: "ab-s7-m3", title: "申请奖学金", description: "CSC国家公派、学校奖学金、企业奖学金——多渠道申请，减轻经济压力", category: "申请" },
        ],
      },
      {
        semesterId: "s8", semesterLabel: "大四下", milestones: [
          { id: "ab-s8-m1", title: "等待offer+选择学校", description: "1-4月集中放榜——综合考虑排名、地理位置、费用、就业前景做出选择", category: "决策" },
          { id: "ab-s8-m2", title: "办理签证", description: "拿到offer后立即准备签证材料：I-20（美国）/CAS（英国）/学生签证——预留2-3个月", category: "手续" },
          { id: "ab-s8-m3", title: "完成毕业设计", description: "确保顺利毕业——offer通常conditional on degree completion", category: "学业" },
          { id: "ab-s8-m4", title: "行前准备", description: "机票、住宿、外汇、行李、疫苗——提前2个月准备，不要手忙脚乱", category: "手续" },
        ],
      },
    ],
  },
}

/** 跨轨道冲突：如果两边里程碑都已标记完成，应显示警告 */
export const PLAN_CONFLICTS: PlanConflict[] = [
  {
    milestoneA: "emp-s6-m1", milestoneB: "pg-s6-m2",
    trackALabel: "本科就业", trackBLabel: "考研深造",
    semesterLabel: "大三下",
    reason: "暑期实习与考研第二轮强化在时间上高度重叠（7-9月），同时推进极易两头落空。建议选择一条主线。",
  },
  {
    milestoneA: "emp-s6-m1", milestoneB: "cs-s6-m1",
    trackALabel: "本科就业", trackBLabel: "考公/考编",
    semesterLabel: "大三下",
    reason: "暑期实习需要大量时间投入，与公务员备考刷题黄金期（7-8月）严重冲突。",
  },
  {
    milestoneA: "pg-s6-m2", milestoneB: "cs-s6-m1",
    trackALabel: "考研深造", trackBLabel: "考公/考编",
    semesterLabel: "大三下",
    reason: "考研和考公的备考周期高度重叠，考试内容完全不同，同时准备成功率极低。",
  },
  {
    milestoneA: "emp-s7-m1", milestoneB: "pg-s7-m1",
    trackALabel: "本科就业", trackBLabel: "考研深造",
    semesterLabel: "大四上",
    reason: "秋招和考研冲刺在9-12月完全冲突，时间和精力无法兼顾。建议大四开学前做出选择。",
  },
  {
    milestoneA: "emp-s7-m1", milestoneB: "cs-s7-m2",
    trackALabel: "本科就业", trackBLabel: "考公/考编",
    semesterLabel: "大四上",
    reason: "秋招面试与省考/选调笔试在11-12月高度重叠，同时准备容易顾此失彼。",
  },
  {
    milestoneA: "pg-s7-m1", milestoneB: "cs-s7-m2",
    trackALabel: "考研深造", trackBLabel: "考公/考编",
    semesterLabel: "大四上",
    reason: "考研冲刺和考公冲刺在时间上完全冲突，两者的复习内容也完全不同。",
  },
  {
    milestoneA: "emp-s7-m1", milestoneB: "ab-s7-m1",
    trackALabel: "本科就业", trackBLabel: "出国留学",
    semesterLabel: "大四上",
    reason: "秋招面试和留学申请材料准备在9-12月时间重叠，建议选择一条主线。",
  },
  {
    milestoneA: "cs-s6-m1", milestoneB: "ab-s6-m1",
    trackALabel: "考公/考编", trackBLabel: "出国留学",
    semesterLabel: "大三下",
    reason: "考公刷题与GRE/GMAT备考在大三下学期时间冲突，两种考试内容差异极大。",
  },
]
