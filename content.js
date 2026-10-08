export const features = [
  {
    id: 'workspace', title: '项目工作台', summary: '每轮创作，都有上下文',
    kicker: 'PROJECT CONTEXT', heading: '接着你的工程，\n继续创作。',
    description: '需求、文件和讨论都留在项目里。聊到哪里、改到哪里，并排就能看到，下一轮不必从头解释。',
    bullets: ['按项目保留对话', '带着文件与专家讨论', '对话与成果并排查看'],
    screen: {
      title: '乐易 · 项目工作台',
      caption: '同一项需求中，左侧保留对话，中间展开讨论，右侧查看实际工程改动。',
      date: '界面采集 · 2026.10.01', image: 'assets/product-workspace.png',
      alt: '乐易真实项目工作台，左侧聊天历史、中间四机器人协作对话、右侧 AlertView.cs 代码差异',
      width: 1280, height: 800,
    },
  },
  {
    id: 'experts', title: '专家协作', summary: '让不同专长，一起推进',
    kicker: 'YOUR AI CREW', heading: '不同专长，\n围绕同一个目标。',
    description: '围绕同一个需求，安排专家独立分析并接续交付。每份结论都有文件依据，助手汇总分歧，让后续工作接着前面的分析推进。',
    bullets: ['按需求安排专家', '独立分析，接续交付', '汇总分歧与待验证项'],
    screen: {
      title: '乐易 · 专家协作与交付',
      caption: '本轮 5 项协作任务已交付；每位专家的分析与助手汇总都能逐项查看。',
      date: '界面采集 · 2026.09.30', image: 'assets/product-collaboration.png',
      alt: '乐易真实专家协作页面，展示五项已交付任务、源码依据与助手汇总的专家结论',
      width: 1280, height: 720,
    },
  },
  {
    id: 'unity', title: '工程改动', summary: '具体改了什么，看得清',
    kicker: 'CHANGES YOU CAN REVIEW', heading: '改了哪里，\n一眼能核对。',
    description: '把确认过的需求推进到实际代码和限定范围的场景操作。改动有差异、实施有说明、复查有记录，方便你决定是否接受。',
    bullets: ['逐行对照代码差异', '查看实施与复查说明', '核对工程检查结果'],
    screen: {
      title: '乐易 · 工程差异与复查',
      caption: '输入逻辑的代码差异与专家复查并排呈现；示例任务仍待人工验收。',
      date: '界面采集 · 2026.09.29', image: 'assets/product-code.png',
      alt: '乐易真实研发成果页面，显示 GameController.cs 的逐行代码差异、专家完成记录与待人工验收状态',
      width: 1488, height: 1055,
    },
  },
  {
    id: 'iteration', title: '构建试玩', summary: '把体验，带回下一轮',
    kicker: 'PLAY. REFINE. REPEAT.', heading: '好不好玩，\n由你说了算。',
    description: '打开构建亲手试玩，把操作体验和发现的问题保留下来。好想法值得反复打磨，让这一轮的反馈成为下一轮修改的起点。',
    bullets: ['打开构建后的游戏', '保存试玩步骤与观察', '由你决定接受或继续修改'],
    screen: {
      title: '乐易 · 构建结果与试玩记录',
      caption: 'macOS Player 构建成功并保存了试玩观察；完整玩法清单仍待人工核对。',
      date: '界面采集 · 2026.10.02', image: 'assets/product-validation.jpg',
      alt: '乐易真实构建验收页面，展示成功的 macOS 构建、试玩观察输入区和已保存的人工反馈',
      width: 1440, height: 900,
    },
  },
];

export const roles = [
  {
    id: 'game-designer',
    name: '玩法策划',
    tag: '明确需求',
    description: '把想法拆成玩家行为、规则和可检查的目标。',
    output: '玩法边界 · 验收步骤',
  },
  {
    id: 'gameplay-programmer',
    name: '玩法程序',
    tag: '实现逻辑',
    description: '读取工程，处理 C# 玩法、输入和状态逻辑。',
    output: '代码改动 · 实施说明',
  },
  {
    id: 'unity-specialist',
    name: 'Unity 专家',
    tag: '接入场景',
    description: '在允许范围内处理场景、游戏对象与组件。',
    output: '场景操作 · 工程检查',
  },
  {
    id: 'unity-ui-specialist',
    name: '界面专家',
    tag: '打磨交互',
    description: '检查按钮、布局、界面状态与输入反馈。',
    output: '界面改动 · 交互核对',
  },
  {
    id: 'qa-lead',
    name: '测试专家',
    tag: '复查结果',
    description: '对照真实改动和检查证据，列出还需试玩的内容。',
    output: '复查记录 · 待验证项',
  },
];

export const faqs = [
  {
    question: '适合什么样的创作任务？',
    answer: '适合已有 Unity 工程中的原型验证与小步迭代，例如修改玩法逻辑、调整界面交互、处理限定范围的场景和组件、导入并绑定资源。先明确一个可验证的小目标，更容易判断这一轮有没有做好。',
  },
  {
    question: '可以从零开始做游戏吗？',
    answer: '可以从现有模板创建独立工程，再逐步推进玩法、界面、资源和构建。目前适合小范围原型与迭代，还不能一句话交付完整商业游戏。画廊中的高质量场景用于展示创作方向，不代表已完成的游戏。',
  },
  {
    question: '修改不满意，可以恢复吗？',
    answer: '有记录快照的任务支持恢复本次改动。恢复前会核对文件是否被后续编辑，发现冲突会停止。接入工程时，建议先使用独立副本。',
  },
  {
    question: '现在可以怎样使用？',
    answer: '目前面向本机小范围研发试用，已验证本地工程修改、macOS 构建和部分试玩操作。公司目标工程、多人协作与其他目标设备仍需进一步验证。下方列出了开始前需要准备的环境。',
  },
];
