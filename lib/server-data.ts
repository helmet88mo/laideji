/**
 * 生产环境静态数据 — 替代 Prisma 数据库查询
 * 数据来源：prisma/seed.ts 完整种子数据
 */
interface MockData {
  majors: Record<string, unknown>[]
  universities: Record<string, unknown>[]
  careers: Record<string, unknown>[]
  regrets: Record<string, unknown>[]
  employmentStats: Record<string, unknown>[]
  careerPaths: Record<string, unknown>[]
  salaries: Record<string, unknown>[]
  universityMajors: Record<string, unknown>[]
}

const DATA: MockData = {
  majors: [
    { id:"cs",code:"080901",name:"计算机科学与技术",degree:"工学学士",category:"工学",description:"计算机科学与技术是研究计算机系统设计、开发与应用的学科，涵盖硬件、软件、网络、人工智能等方向。",courses:[{name:"公共必修",courses:["高等数学","线性代数","概率论","离散数学"]},{name:"专业核心",courses:["数据结构","操作系统","计算机网络","算法设计"]}],hardPoints:"离散数学、算法设计",abilities:[{name:"逻辑思维",value:90},{name:"编程能力",value:95},{name:"数学基础",value:75}],relatedMajors:[{name:"软件工程",difference:"更侧重工程实践"},{name:"人工智能",difference:"数学要求更高"}],aiRisk:"基础编程被AI替代风险高，系统设计护城河深",aiRiskLevel:2,employmentRate:93.5,matchRate:78.2},
    { id:"se",code:"080902",name:"软件工程",degree:"工学学士",category:"工学",description:"培养掌握软件开发和项目管理能力的高级工程人才。",courses:[{name:"核心",courses:["软件工程导论","需求工程","软件测试","项目管理"]}],hardPoints:"需求工程、架构设计",abilities:[{name:"编程能力",value:90},{name:"团队协作",value:85},{name:"沟通表达",value:75}],relatedMajors:[{name:"计算机科学",difference:"更侧重理论和底层"}],aiRisk:"基础编码易被替代",aiRiskLevel:2,employmentRate:94.1,matchRate:80.5},
    { id:"ai",code:"080717",name:"人工智能",degree:"工学学士",category:"工学",description:"聚焦机器学习、深度学习、NLP、CV等方向。",courses:[{name:"核心",courses:["机器学习","深度学习","NLP","计算机视觉"]}],hardPoints:"数学推导、模型调参",abilities:[{name:"数学基础",value:95},{name:"编程能力",value:85},{name:"创新能力",value:85}],relatedMajors:[{name:"计算机科学",difference:"AI更专精算法"}],aiRisk:"算法研究护城河深",aiRiskLevel:1,employmentRate:96.8,matchRate:88.5},
    { id:"elec",code:"080601",name:"电气工程及其自动化",degree:"工学学士",category:"工学",description:"研究电能的产生、传输和应用，国家电网主要对口专业。",courses:[{name:"核心",courses:["电力系统分析","电力电子","电机学","高电压技术"]}],hardPoints:"电磁场、电机学",abilities:[{name:"动手实践",value:85},{name:"数学基础",value:80}],relatedMajors:[{name:"自动化",difference:"更侧重控制"}],aiRisk:"强电方向替代风险低",aiRiskLevel:1,employmentRate:92.3,matchRate:76.8},
    { id:"civil",code:"081001",name:"土木工程",degree:"工学学士",category:"工学",description:"涵盖房屋建筑、桥梁、隧道等基础设施建设。",courses:[{name:"核心",courses:["结构力学","混凝土结构","钢结构","土力学"]}],hardPoints:"三大力学",abilities:[{name:"空间想象",value:85},{name:"动手实践",value:80}],relatedMajors:[{name:"建筑学",difference:"偏设计和美学"}],aiRisk:"设计决策难以自动化",aiRiskLevel:3,employmentRate:88.5,matchRate:71.2},
    { id:"comm",code:"080703",name:"通信工程",degree:"工学学士",category:"工学",description:"5G/6G时代的核心专业，华为中兴主要招聘专业。",courses:[{name:"核心",courses:["信号与系统","通信原理","数字信号处理"]}],hardPoints:"信号与系统、电磁场",abilities:[{name:"数学基础",value:85},{name:"逻辑思维",value:80}],relatedMajors:[{name:"电子信息",difference:"偏硬件"}],aiRisk:"协议设计不易替代",aiRiskLevel:2,employmentRate:91.5,matchRate:75.3},
    { id:"mech",code:"080202",name:"机械工程",degree:"工学学士",category:"工学",description:"工业之母，涵盖设计、制造、自动化方向。",courses:[{name:"核心",courses:["机械设计","机械制造","工程力学","CAD"]}],hardPoints:"工程力学、机械制图",abilities:[{name:"动手实践",value:85},{name:"空间想象",value:85}],relatedMajors:[{name:"自动化",difference:"偏控制"}],aiRisk:"智能制造是升级方向",aiRiskLevel:3,employmentRate:89.8,matchRate:70.5},
    { id:"ds",code:"080910",name:"数据科学与大数据技术",degree:"工学学士",category:"工学",description:"从海量数据中提取洞见的交叉学科。",courses:[{name:"核心",courses:["数据挖掘","机器学习","大数据平台","Python"]}],hardPoints:"统计理论、特征工程",abilities:[{name:"数学基础",value:85},{name:"编程能力",value:80}],relatedMajors:[{name:"统计学",difference:"偏理论"}],aiRisk:"高级分析难以替代",aiRiskLevel:2,employmentRate:92.0,matchRate:82.5},
    { id:"math",code:"070101",name:"数学与应用数学",degree:"理学学士",category:"理学",description:"科学之母。培养扎实的数学理论基础。",courses:[{name:"核心",courses:["数学分析","高等代数","概率论","实变函数"]}],hardPoints:"数学分析、实变函数",abilities:[{name:"数学基础",value:100},{name:"逻辑思维",value:95}],relatedMajors:[{name:"统计学",difference:"偏应用"}],aiRisk:"纯数学研究难以替代",aiRiskLevel:1,employmentRate:86.5,matchRate:68.8},
    { id:"physics",code:"070201",name:"物理学",degree:"理学学士",category:"理学",description:"探索自然界的根本规律。",courses:[{name:"核心",courses:["量子力学","电动力学","热力学","固体物理"]}],hardPoints:"量子力学、电动力学",abilities:[{name:"数学基础",value:95},{name:"逻辑思维",value:95}],relatedMajors:[{name:"应用物理",difference:"偏工程"}],aiRisk:"创造性思维难替代",aiRiskLevel:1,employmentRate:84.2,matchRate:62.5},
    { id:"stat",code:"071201",name:"统计学",degree:"理学学士",category:"理学",description:"收集、分析、解释数据的科学。",courses:[{name:"核心",courses:["数理统计","回归分析","多元统计","时间序列"]}],hardPoints:"数理统计推导",abilities:[{name:"数学基础",value:88},{name:"编程能力",value:75}],relatedMajors:[{name:"数据科学",difference:"偏工程"}],aiRisk:"AutoML有进展但复杂推断需人类",aiRiskLevel:2,employmentRate:90.5,matchRate:79.2},
    { id:"chem",code:"070301",name:"化学",degree:"理学学士",category:"理学",description:"研究物质组成和变化的中心科学。",courses:[{name:"核心",courses:["有机化学","无机化学","分析化学","物理化学"]}],hardPoints:"有机化学、物理化学",abilities:[{name:"动手实验",value:90},{name:"记忆能力",value:80}],relatedMajors:[{name:"化工",difference:"偏工业生产"}],aiRisk:"AI辅助药物设计",aiRiskLevel:2,employmentRate:85.8,matchRate:66.3},
    { id:"finance",code:"020301K",name:"金融学",degree:"经济学学士",category:"经济学",description:"研究资金融通和管理。",courses:[{name:"核心",courses:["货币银行学","投资学","公司金融","金融工程"]}],hardPoints:"金融工程、投资学",abilities:[{name:"数学基础",value:80},{name:"沟通表达",value:85}],relatedMajors:[{name:"经济学",difference:"更宏观"}],aiRisk:"量化交易替代传统岗",aiRiskLevel:3,employmentRate:88.7,matchRate:72.3},
    { id:"trade",code:"020401",name:"国际经济与贸易",degree:"经济学学士",category:"经济学",description:"研究跨国商品和服务流动规律。",courses:[{name:"核心",courses:["国际贸易","国际金融","国际商法","外贸函电"]}],hardPoints:"外贸实务、外语能力",abilities:[{name:"英语能力",value:85},{name:"沟通表达",value:80}],relatedMajors:[{name:"经济学",difference:"偏理论"}],aiRisk:"基础报关面临自动化",aiRiskLevel:4,employmentRate:83.5,matchRate:60.2},
    { id:"acct",code:"120203K",name:"会计学",degree:"管理学学士",category:"管理学",description:"商业的语言，负责财务核算和审计。",courses:[{name:"核心",courses:["基础会计","中级财务会计","审计学","税法"]}],hardPoints:"中级财务会计、CPA",abilities:[{name:"细节把控",value:90},{name:"记忆能力",value:75}],relatedMajors:[{name:"财务管理",difference:"偏投融资"}],aiRisk:"基础记账被RPA替代",aiRiskLevel:4,employmentRate:90.2,matchRate:82.1},
    { id:"ba",code:"120201K",name:"工商管理",degree:"管理学学士",category:"管理学",description:"学习企业运营的方方面面。",courses:[{name:"核心",courses:["管理学","战略管理","市场营销","人力资源管理"]}],hardPoints:"知识面广需深耕",abilities:[{name:"沟通表达",value:88},{name:"领导力",value:80}],relatedMajors:[{name:"市场营销",difference:"偏消费者"}],aiRisk:"中层管理难替代",aiRiskLevel:4,employmentRate:87.3,matchRate:65.8},
    { id:"hr",code:"120206",name:"人力资源管理",degree:"管理学学士",category:"管理学",description:"研究组织中人的问题。",courses:[{name:"核心",courses:["组织行为学","招聘","绩效管理","薪酬管理"]}],hardPoints:"劳动法、绩效设计",abilities:[{name:"沟通表达",value:92},{name:"共情能力",value:85}],relatedMajors:[{name:"心理学",difference:"偏理论"}],aiRisk:"员工关系需高情商",aiRiskLevel:3,employmentRate:88.0,matchRate:72.5},
    { id:"med",code:"100201K",name:"临床医学",degree:"医学学士",category:"医学",description:"直面疾病和病人的医学。",courses:[{name:"核心",courses:["人体解剖学","生理学","病理学","药理学","内科学","外科学"]}],hardPoints:"人体解剖、临床实习",abilities:[{name:"记忆能力",value:95},{name:"动手实践",value:85},{name:"抗压能力",value:90}],relatedMajors:[{name:"口腔医学",difference:"专精口腔"}],aiRisk:"临床判断难以替代",aiRiskLevel:1,employmentRate:96.2,matchRate:91.8},
    { id:"dent",code:"100301K",name:"口腔医学",degree:"医学学士",category:"医学",description:"医学中的黄金专业，收入上限高。",courses:[{name:"核心",courses:["口腔解剖","口腔内科","口腔外科","正畸学"]}],hardPoints:"精细操作",abilities:[{name:"动手实践",value:95},{name:"审美能力",value:70}],relatedMajors:[{name:"临床医学",difference:"全科vs专科"}],aiRisk:"手工操作难替代",aiRiskLevel:1,employmentRate:97.5,matchRate:93.2},
    { id:"pharm",code:"100701",name:"药学",degree:"理学学士",category:"医学",description:"连接化学、生物学和医学的桥梁。",courses:[{name:"核心",courses:["药物化学","药剂学","药理学","药物分析"]}],hardPoints:"有机化学、药理学",abilities:[{name:"动手实验",value:88},{name:"记忆能力",value:85}],relatedMajors:[{name:"制药工程",difference:"偏工程放大"}],aiRisk:"AI加速筛选",aiRiskLevel:2,employmentRate:89.2,matchRate:74.5},
    { id:"eng",code:"050201",name:"英语",degree:"文学学士",category:"文学",description:"培养英语语言能力和跨文化交际能力。",courses:[{name:"核心",courses:["综合英语","翻译","英美文学","语言学"]}],hardPoints:"语言学、专八",abilities:[{name:"英语能力",value:95},{name:"写作能力",value:80}],relatedMajors:[{name:"翻译",difference:"偏口笔译"}],aiRisk:"基础翻译被AI替代",aiRiskLevel:5,employmentRate:78.5,matchRate:45.3},
    { id:"cnlit",code:"050101",name:"汉语言文学",degree:"文学学士",category:"文学",description:"研究中国语言和文学，公务员热门专业。",courses:[{name:"核心",courses:["现代汉语","古代汉语","中国古代文学","现当代文学"]}],hardPoints:"古代汉语、文学理论",abilities:[{name:"写作能力",value:92},{name:"阅读理解",value:90}],relatedMajors:[{name:"新闻学",difference:"偏采编"}],aiRisk:"深度创作需人类",aiRiskLevel:4,employmentRate:82.3,matchRate:58.5},
    { id:"law",code:"030101K",name:"法学",degree:"法学学士",category:"法学",description:"研究法律和法律现象。法考通过率10-15%。",courses:[{name:"核心",courses:["法理学","宪法","民法","刑法","诉讼法"]}],hardPoints:"民法体系庞大、法考",abilities:[{name:"记忆能力",value:90},{name:"逻辑思维",value:85},{name:"写作能力",value:85}],relatedMajors:[{name:"知识产权",difference:"专精知产"}],aiRisk:"法庭辩论是核心竞争力",aiRiskLevel:2,employmentRate:82.3,matchRate:64.5},
    { id:"soc",code:"030302",name:"社会学",degree:"法学学士",category:"法学",description:"研究社会结构、关系与变迁。",courses:[{name:"核心",courses:["社会学理论","社会研究方法","社会统计学"]}],hardPoints:"理论抽象、统计方法",abilities:[{name:"逻辑思维",value:82},{name:"社会洞察",value:85}],relatedMajors:[{name:"社工",difference:"偏实务"}],aiRisk:"定性分析需人类",aiRiskLevel:3,employmentRate:80.5,matchRate:55.2},
    { id:"edu",code:"040101",name:"教育学",degree:"教育学学士",category:"教育学",description:"研究教育现象和规律。",courses:[{name:"核心",courses:["教育学原理","教育心理学","课程与教学论"]}],hardPoints:"教育哲学、统计测量",abilities:[{name:"沟通表达",value:90},{name:"共情能力",value:85}],relatedMajors:[{name:"心理学",difference:"偏心理机制"}],aiRisk:"情感连接无法替代",aiRiskLevel:2,employmentRate:86.8,matchRate:72.5},
    { id:"psych",code:"071101",name:"心理学",degree:"理学学士",category:"教育学",description:"研究人类心理和行为规律。",courses:[{name:"核心",courses:["普通心理学","发展心理学","社会心理学","认知心理学"]}],hardPoints:"心理统计、实验设计",abilities:[{name:"共情能力",value:90},{name:"沟通表达",value:85}],relatedMajors:[{name:"神经科学",difference:"偏脑科学"}],aiRisk:"深度治疗需人格魅力",aiRiskLevel:2,employmentRate:83.5,matchRate:68.2},
    { id:"agri",code:"090101",name:"农学",degree:"农学学士",category:"农学",description:"研究农作物生产与育种。",courses:[{name:"核心",courses:["作物栽培学","作物育种学","遗传学","植物生理学"]}],hardPoints:"田间试验周期长",abilities:[{name:"动手实践",value:85},{name:"细心耐心",value:80}],relatedMajors:[{name:"园艺",difference:"偏蔬菜花卉"}],aiRisk:"智慧农业是方向",aiRiskLevel:3,employmentRate:87.5,matchRate:70.0},
    { id:"design",code:"130501",name:"设计学",degree:"艺术学学士",category:"艺术学",description:"涵盖视觉传达、产品设计、数字媒体。",courses:[{name:"核心",courses:["设计素描","品牌设计","交互设计","用户体验"]}],hardPoints:"创意持续培养",abilities:[{name:"创造力",value:95},{name:"审美能力",value:92}],relatedMajors:[{name:"美术学",difference:"偏纯艺"}],aiRisk:"高级创意难替代",aiRiskLevel:4,employmentRate:81.5,matchRate:62.8},
  ],
  universities: [
    { id:"tsinghua",code:"10003",name:"清华大学",level:"985",type:"综合",province:"北京",city:"北京",baoYanRate:58.3,description:"中国最顶尖高等学府之一，以工科见长。"},
    { id:"pku",code:"10001",name:"北京大学",level:"985",type:"综合",province:"北京",city:"北京",baoYanRate:55.1,description:"以文理医见长。"},
    { id:"fudan",code:"10246",name:"复旦大学",level:"985",type:"综合",province:"上海",city:"上海",baoYanRate:45.2,description:"文理医经管全面发展。"},
    { id:"sjtu",code:"10248",name:"上海交通大学",level:"985",type:"综合",province:"上海",city:"上海",baoYanRate:42.5,description:"工科、医学、商科见长。"},
    { id:"zju",code:"10335",name:"浙江大学",level:"985",type:"综合",province:"浙江",city:"杭州",baoYanRate:35.6,description:"华东最强综合性大学。"},
    { id:"nju",code:"10284",name:"南京大学",level:"985",type:"综合",province:"江苏",city:"南京",baoYanRate:38.2,description:"文理底蕴深厚。"},
    { id:"ustc",code:"10358",name:"中国科学技术大学",level:"985",type:"理工",province:"安徽",city:"合肥",baoYanRate:48.5,description:"理科和前沿工科著称。"},
    { id:"whu",code:"10486",name:"武汉大学",level:"985",type:"综合",province:"湖北",city:"武汉",baoYanRate:28.4,description:"测绘、法学全国领先。"},
    { id:"hust",code:"10487",name:"华中科技大学",level:"985",type:"理工",province:"湖北",city:"武汉",baoYanRate:30.2,description:"工科和医学突出。"},
    { id:"sysu",code:"10558",name:"中山大学",level:"985",type:"综合",province:"广东",city:"广州",baoYanRate:32.5,description:"华南第一学府。"},
    { id:"scu",code:"10610",name:"四川大学",level:"985",type:"综合",province:"四川",city:"成都",baoYanRate:26.8,description:"西南最强，口腔医学全国第一。"},
    { id:"xjtu",code:"10698",name:"西安交通大学",level:"985",type:"综合",province:"陕西",city:"西安",baoYanRate:31.5,description:"C9成员，能动电气强势。"},
    { id:"hit",code:"10213",name:"哈尔滨工业大学",level:"985",type:"理工",province:"黑龙江",city:"哈尔滨",baoYanRate:33.2,description:"航天机器人顶尖。"},
    { id:"xmu",code:"10384",name:"厦门大学",level:"985",type:"综合",province:"福建",city:"厦门",baoYanRate:28.8,description:"中国最美大学之一。"},
    { id:"tju",code:"10056",name:"天津大学",level:"985",type:"理工",province:"天津",city:"天津",baoYanRate:26.5,description:"化工精仪全国顶尖。"},
    { id:"uestc",code:"10614",name:"电子科技大学",level:"985",type:"理工",province:"四川",city:"成都",baoYanRate:27.8,description:"电子信息领域标杆。"},
    { id:"csu",code:"10533",name:"中南大学",level:"985",type:"综合",province:"湖南",city:"长沙",baoYanRate:25.5,description:"有色金属医学强势。"},
    { id:"scut",code:"10561",name:"华南理工大学",level:"985",type:"理工",province:"广东",city:"广州",baoYanRate:24.2,description:"建筑轻工突出。"},
    { id:"szu",code:"10590",name:"深圳大学",level:"省重点",type:"综合",province:"广东",city:"深圳",baoYanRate:5.8,description:"互联网科技资源丰富。"},
    { id:"nuaa",code:"10287",name:"南京航空航天大学",level:"211",type:"理工",province:"江苏",city:"南京",baoYanRate:22.5,description:"航空航天特色鲜明。"},
  ],
  careers: [
    { id:"c1",title:"后端开发工程师",industry:"互联网",city:"深圳",experience:"3年",education:"计算机科学本科",timeline:[{time:"09:30",activity:"到工位，看CI/CD"},{time:"10:00",activity:"站会"},{time:"10:30",activity:"写代码"},{time:"14:00",activity:"需求评审"},{time:"19:00",activity:"专注编码"},{time:"21:30",activity:"下班"}],salary:"税前22k/月+年终2-4个月",expense:"房租4k+生活4k",monthlyJoy:"支付模块零bug上线",monthlyWorry:"需求频繁变更",adviceToSelf:"大二就要去实习",satisfaction:7,majorId:"cs"},
    { id:"c2",title:"前端开发工程师",industry:"互联网",city:"杭州",experience:"2年",education:"软件工程本科",timeline:[{time:"09:00",activity:"到工位看技术群"},{time:"10:00",activity:"写React组件"}],salary:"税前18k/月",expense:"房租3.5k+生活4k",monthlyJoy:"Dashboard获得好评",monthlyWorry:"产品经理不懂技术",adviceToSelf:"全栈才是未来",satisfaction:8,majorId:"se"},
    { id:"c3",title:"算法工程师",industry:"AI",city:"北京",experience:"2年",education:"AI硕士",timeline:[{time:"09:00",activity:"查看模型训练loss"},{time:"10:00",activity:"读顶会论文"},{time:"14:00",activity:"实现新算法"},{time:"21:00",activity:"明早看结果"}],salary:"税前28k/月+年终3-6月",expense:"房租6k+生活2k",monthlyJoy:"新模型提升2.3个点",monthlyWorry:"领域更新太快",adviceToSelf:"数学基础太重要",satisfaction:8,majorId:"ai"},
    { id:"c4",title:"投行分析师",industry:"金融",city:"上海",experience:"2年",education:"金融硕士",timeline:[{time:"08:00",activity:"到办公室"},{time:"09:00",activity:"做DCF估值"},{time:"22:00",activity:"发完Pitchbook"},{time:"01:00",activity:"打车回家"}],salary:"税前30k+Bonus",expense:"房租8k+社交5k",monthlyJoy:"项目成功Close",monthlyWorry:"每天16小时",adviceToSelf:"早开始Networking",satisfaction:5,majorId:"finance"},
    { id:"c5",title:"住院医师",industry:"医疗",city:"北京",experience:"2年",education:"临床医学硕士",timeline:[{time:"07:30",activity:"到科室"},{time:"08:00",activity:"随主任查房"},{time:"20:00",activity:"值班急诊"}],salary:"税前8k+夜班费",expense:"房租3k+生活2k",monthlyJoy:"病人好转出院",monthlyWorry:"收入确实低",adviceToSelf:"真爱就坚持",satisfaction:6,majorId:"med"},
    { id:"c6",title:"执业律师",industry:"法律",city:"北京",experience:"4年",education:"法学本科",timeline:[{time:"09:00",activity:"开庭前沟通"},{time:"10:30",activity:"庭审辩论"},{time:"16:00",activity:"接待新客户"}],salary:"税前20k+案源提成",expense:"房租4k+社交2k",monthlyJoy:"找到对方证据漏洞",monthlyWorry:"案源不稳定",adviceToSelf:"早去律所实习",satisfaction:7,majorId:"law"},
    { id:"c7",title:"电网工程师",industry:"电力",city:"南京",experience:"3年",education:"电气工程本科",timeline:[{time:"08:00",activity:"到变电站"},{time:"09:00",activity:"巡检设备"},{time:"17:30",activity:"准时下班"}],salary:"税前12k+年终3-6月",expense:"房租2k+生活2k",monthlyJoy:"年终奖5个月",monthlyWorry:"升迁靠年头",adviceToSelf:"主动学新技术",satisfaction:8,majorId:"elec"},
    { id:"c8",title:"数据分析师",industry:"互联网",city:"杭州",experience:"2年",education:"统计学本科",timeline:[{time:"10:00",activity:"写SQL拉数据"},{time:"11:00",activity:"AB测试分析"},{time:"15:00",activity:"做用户分群"}],salary:"税前15k",expense:"房租3k+生活3k",monthlyJoy:"模型留住15%用户",monthlyWorry:"业务方不理解统计",adviceToSelf:"SQL要精通",satisfaction:7,majorId:"stat"},
    { id:"c9",title:"建筑设计师",industry:"建筑",city:"上海",experience:"4年",education:"建筑学硕士",timeline:[{time:"09:00",activity:"打开CAD"},{time:"11:00",activity:"甲方又改方案"},{time:"22:30",activity:"交图"}],salary:"税前15k+项目奖金",expense:"房租5k+生活3k",monthlyJoy:"项目通过审批",monthlyWorry:"地产下行",adviceToSelf:"学参数化设计",satisfaction:6,majorId:"civil"},
    { id:"c10",title:"外贸经理",industry:"外贸",city:"广州",experience:"5年",education:"国贸本科",timeline:[{time:"09:00",activity:"和欧洲客户电话"},{time:"10:30",activity:"去工厂验样"},{time:"16:00",activity:"回复询盘"}],salary:"底薪10k+提成年25-40万",expense:"房租3k+应酬3k",monthlyJoy:"签了500万大客户",monthlyWorry:"汇率波动",adviceToSelf:"产品知识是核心",satisfaction:7,majorId:"trade"},
    { id:"c11",title:"小学语文教师",industry:"教育",city:"成都",experience:"3年",education:"汉语言文学本科",timeline:[{time:"07:30",activity:"准备课件"},{time:"08:30",activity:"带早读"},{time:"17:00",activity:"放学"},{time:"18:00",activity:"下班回家"}],salary:"税前7k+绩效",expense:"房租1.5k+生活2k",monthlyJoy:"学生写最喜欢语文老师",monthlyWorry:"非教学事务多",adviceToSelf:"多练粉笔字",satisfaction:9,majorId:"cnlit"},
    { id:"c12",title:"HR人才发展",industry:"科技",city:"深圳",experience:"3年",education:"人力资源本科",timeline:[{time:"09:00",activity:"看面试安排"},{time:"10:00",activity:"面试候选人"},{time:"14:00",activity:"设计培训方案"}],salary:"税前13k",expense:"房租3.5k+生活3k",monthlyJoy:"方案获CEO认可",monthlyWorry:"裁员季夹在中间",adviceToSelf:"多学组织行为学",satisfaction:7,majorId:"hr"},
  ],
  regrets: [
    { id:"r1",grade:"大一",category:"study",content:"以为大学就是放松的，大一上GPA从3.8掉到2.5才醒悟——保研资格直接丢了。",tags:["GPA","挂科","保研"],isLate:false,remedy:"还有三个学期可以拉回来！"},
    { id:"r2",grade:"大一",category:"study",content:"没重视四级，裸考400分没过。后来发现保研要六级，而四级不过不能考六级。",tags:["四级","英语"],isLate:false,remedy:"每天30分钟背单词，还有至少3次机会。"},
    { id:"r3",grade:"大一",category:"life",content:"花钱没概念，一学期花完全年生活费。网贷欠了2万，兼职还了一年。",tags:["理财","网贷"],isLate:false,remedy:"从今天开始记账！"},
    { id:"r4",grade:"大一",category:"social",content:"加了6个社团，每天忙到11点但全是在搬桌子，什么能力都没锻炼到。",tags:["社团","时间管理"],isLate:false,remedy:"精简到2个以内。"},
    { id:"r5",grade:"大二",category:"career",content:"大二暑假在家躺了两个月。开学才知道室友去大厂实习拿到return offer。",tags:["实习","暑假"],isLate:false,remedy:"距离大三暑假还有一年！"},
    { id:"r6",grade:"大二",category:"study",content:"六级考了三次都没过，每次只准备两周就裸考。最后一次差5分。",tags:["六级","英语"],isLate:false,remedy:"认真准备3个月，每天1小时。"},
    { id:"r7",grade:"大二",category:"life",content:"没有运动习惯，大学胖了30斤。体测不及格差点影响毕业。",tags:["健康","运动"],isLate:false,remedy:"现在开始每天运动30分钟。"},
    { id:"r8",grade:"大二",category:"career",content:"放弃了数模竞赛觉得太难。后来发现面试官看到数模经历会主动加分。",tags:["竞赛","简历"],isLate:false,remedy:"大三还有挑战杯、互联网+。"},
    { id:"r9",grade:"大三",category:"career",content:"既想考研又想秋招，结果两头空。考研差10分，秋招只拿了一个不满意的offer。",tags:["考研","秋招","冲突"],isLate:false,remedy:"选一个主线，另一个做保底。"},
    { id:"r10",grade:"大三",category:"career",content:"以为自己很厉害不需要实习，简历写满精通，面试被问项目问题哑口无言。",tags:["实习","简历"],isLate:false,remedy:"做个人项目或给开源贡献代码。"},
    { id:"r11",grade:"大三",category:"study",content:"考研选了一个只招5人的名校王牌专业。成绩不低但排第7。",tags:["考研择校","信息差"],isLate:false,remedy:"立刻做报录比调研！"},
    { id:"r12",grade:"大三",category:"life",content:"学校心理咨询是免费的但我从没去过。焦虑失眠了一整学期。",tags:["心理健康"],isLate:false,remedy:"今天就预约，这不是软弱。"},
    { id:"r13",grade:"大四",category:"career",content:"大四才发现除了毕业证什么都没有。投了80份简历只收到3个面试。",tags:["简历空白"],isLate:true,remedy:"还有春招、社招、考公多条路。"},
    { id:"r14",grade:"大四",category:"life",content:"四年一眨眼过去了，最遗憾的不是成绩不好，而是没有探索自己真正喜欢什么。",tags:["自我认知"],isLate:false,remedy:"探索自己是一生的事业。"},
    { id:"r15",grade:"大四",category:"career",content:"签了三方才发现起薪比同学低了30%，因为面试不会谈薪资。",tags:["薪资谈判"],isLate:false,remedy:"面试前一定做薪资调研！"},
  ],
  employmentStats: [
    { majorId:"cs",industry:"互联网/科技",ratio:42.5},{ majorId:"cs",industry:"金融科技",ratio:15.3},{ majorId:"cs",industry:"制造业信息化",ratio:12.8},
    { majorId:"se",industry:"互联网",ratio:45},{ majorId:"se",industry:"金融IT",ratio:15},
    { majorId:"ai",industry:"AI Lab",ratio:35},{ majorId:"ai",industry:"AI创业",ratio:25},{ majorId:"ai",industry:"金融量化",ratio:15},
    { majorId:"finance",industry:"银行业",ratio:28.5},{ majorId:"finance",industry:"证券基金",ratio:22.3},{ majorId:"finance",industry:"保险",ratio:15.8},
    { majorId:"med",industry:"公立医院",ratio:62.5},{ majorId:"med",industry:"私立医院",ratio:18.2},
    { majorId:"law",industry:"律所",ratio:35.5},{ majorId:"law",industry:"企业法务",ratio:25.2},{ majorId:"law",industry:"公检法",ratio:22.8},
  ],
  careerPaths: [
    { majorId:"cs",title:"初级开发工程师",level:"entry",salary:"8k-15k",skills:["一门语言","数据结构","Git","SQL"]},
    { majorId:"cs",title:"高级开发工程师",level:"mid",salary:"18k-35k",skills:["系统设计","分布式","性能调优"]},
    { majorId:"cs",title:"架构师/CTO",level:"senior",salary:"35k-120k",skills:["架构设计","技术战略","商业思维"]},
    { majorId:"med",title:"住院医师",level:"entry",salary:"5k-10k",skills:["临床基础","病历书写"]},
    { majorId:"med",title:"主治医师",level:"mid",salary:"12k-25k",skills:["独立诊疗","急重症"]},
    { majorId:"law",title:"实习律师",level:"entry",salary:"4k-8k",skills:["法律检索","文书起草","法考"]},
    { majorId:"law",title:"执业律师",level:"mid",salary:"12k-30k",skills:["独立办案","庭审"]},
  ],
  salaries: [
    { majorId:"cs",cityTier:"tier1",year0:12,year3:22,year5:35,year10:55},
    { majorId:"cs",cityTier:"tier2",year0:8,year3:15,year5:22,year10:35},
    { majorId:"finance",cityTier:"tier1",year0:10,year3:20,year5:35,year10:60},
    { majorId:"med",cityTier:"tier1",year0:6,year3:12,year5:22,year10:40},
    { majorId:"law",cityTier:"tier1",year0:7,year3:15,year5:28,year10:50},
  ],
  universityMajors: [
    { universityId:"tsinghua",majorId:"cs",admissionScore:685,admissionRank:120,year:2025,subjectReq:"物理"},
    { universityId:"pku",majorId:"cs",admissionScore:682,admissionRank:150,year:2025,subjectReq:"物理"},
    { universityId:"sjtu",majorId:"cs",admissionScore:678,admissionRank:300,year:2025,subjectReq:"物理"},
    { universityId:"zju",majorId:"cs",admissionScore:672,admissionRank:500,year:2025,subjectReq:"物理"},
    { universityId:"szu",majorId:"cs",admissionScore:598,admissionRank:18000,year:2025,subjectReq:"物理"},
    { universityId:"pku",majorId:"law",admissionScore:675,admissionRank:200,year:2025,subjectReq:"不限"},
    { universityId:"pku",majorId:"finance",admissionScore:680,admissionRank:150,year:2025,subjectReq:"不限"},
  ],
}

export default DATA

/** 根据 ID 获取专业详情 */
export function getMajorById(id: string) {
  const m = DATA.majors.find((mj) => mj.id === id)
  if (!m) return null
  return {
    ...m,
    courses: JSON.parse(JSON.stringify(m.courses)),
    abilities: JSON.parse(JSON.stringify(m.abilities)),
    relatedMajors: JSON.parse(JSON.stringify(m.relatedMajors)),
    employmentStats: DATA.employmentStats.filter((s) => s.majorId === id),
    careerPaths: DATA.careerPaths.filter((p) => p.majorId === id),
    salaries: DATA.salaries.filter((s) => s.majorId === id),
    careerDays: DATA.careers.filter((c) => (c as Record<string,unknown>).majorId === id),
  }
}

/** 根据 ID 获取院校详情 */
export function getUniversityById(id: string) {
  const u = DATA.universities.find((un) => un.id === id)
  if (!u) return null
  const ums = DATA.universityMajors.filter((um) => um.universityId === id)
  return {
    ...u,
    majors: ums.map((um) => {
      const major = DATA.majors.find((m) => m.id === um.majorId)
      return { id: um.majorId + "_" + u.id, major: major || null, admissionScore: um.admissionScore, admissionRank: um.admissionRank, year: um.year, subjectReq: um.subjectReq }
    }),
    _count: { majors: ums.length },
  }
}

/** 根据 ID 获取职业详情 */
export function getCareerById(id: string) {
  const c = DATA.careers.find((ca) => ca.id === id)
  if (!c) return null
  return {
    ...c,
    major: DATA.majors.find((m) => m.id === (c as Record<string,unknown>).majorId) || null,
  }
}
