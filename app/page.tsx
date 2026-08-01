"use client";

import { useMemo, useState } from "react";

type View = "overview" | "analysis" | "intel" | "campaign" | "franchisee" | "store" | "people" | "customer" | "tasks" | "knowledge";

const menu: { id: View; label: string; icon: string }[] = [
  { id: "overview", label: "今日经营", icon: "⌂" },
  { id: "analysis", label: "AI智能分析", icon: "⌁" },
  { id: "intel", label: "市场机会", icon: "◎" },
  { id: "campaign", label: "活动运营", icon: "◇" },
  { id: "franchisee", label: "加盟商经营", icon: "◫" },
  { id: "store", label: "门店运营", icon: "□" },
  { id: "customer", label: "客户与服务", icon: "○" },
];

const stores = [
  { name: "静安大悦城店", sales: "¥286,420", change: "-18.2%", score: 72, risk: "重点关注", color: "red" },
  { name: "徐汇港汇店", sales: "¥352,680", change: "+12.6%", score: 92, risk: "表现优秀", color: "green" },
  { name: "浦东世纪汇店", sales: "¥298,150", change: "+3.4%", score: 86, risk: "经营稳定", color: "blue" },
  { name: "虹桥天地店", sales: "¥241,890", change: "-6.8%", score: 78, risk: "需要观察", color: "orange" },
];

const evidence = [
  ["销售数据", "静安店近4周销售环比 -18.2%", "更新于 08-01 09:30"],
  ["库存数据", "核心SKU「清润套装」缺货5天", "更新于 07-31 22:00"],
  ["巡查记录", "陈列完整度 68分，2项重复问题", "巡查于 07-29"],
  ["活动执行", "物料确认任务逾期2天", "记录于 07-25"],
  ["运营手册", "《商品陈列手册》第3.2节", "2026版 · 已确认"],
];

function Stat({ title, value, note, tone }: { title: string; value: string; note: string; tone?: string }) {
  return <div className="stat-card"><div className="stat-top"><span>{title}</span><i className={tone || "indigo"}>↗</i></div><strong>{value}</strong><small>{note}</small></div>;
}

function Overview({ go }: { go: (v: View) => void }) {
  return <>
    <section className="decision-hero">
      <div className="decision-copy"><div className="eyebrow">TODAY'S OPERATING DECISION</div><h1>今天先处理什么，系统已经帮你排好了</h1><p>从经营数据和市场变化中发现问题与机会，结合企业知识给出行动建议，并持续追踪结果。</p><div className="scan-meta"><span>42家门店</span><span>36个加盟商</span><span>18条市场情报</span><span>12份企业文档</span></div></div>
      <div className="decision-count"><div><b>3</b><span>重要经营问题</span></div><div><b>2</b><span>可利用市场机会</span></div><div><b>6</b><span>逾期行动</span></div></div>
      <div className="ask-bar"><span>✦</span><input readOnly value="今天最应该优先处理什么？"/><button onClick={() => go("analysis")}>开始分析</button></div>
    </section>
    <section className="mini-kpis"><span>本月销售额 <b>¥12.86M</b><i>同比 +8.4%</i></span><span>目标达成 <b>78.6%</b><i>差距 ¥3.50M</i></span><span>活跃会员 <b>48,236</b><i>新增 2,148</i></span><span>数据更新 <b>09:30</b><i>6个数据源</i></span></section>
    <section className="story-grid">
      <article className="priority-card">
        <div className="story-label danger">首要经营问题</div><div className="story-head"><div><h2>静安大悦城店销售连续下降</h2><p>销售 × 库存 × 巡查 × 活动执行</p></div><strong>-18.2%</strong></div>
        <div className="reason-chain"><div><span>销售</span><b>连续4周下降</b><small>主要集中在2个核心SKU</small></div><i>→</i><div><span>库存</span><b>缺货5天</b><small>区域同品类仍增长4.6%</small></div><i>＋</i><div><span>执行</span><b>陈列68分</b><small>物料任务逾期2天</small></div></div>
        <div className="knowledge-proof"><span>▤</span><div><b>企业知识依据</b><p>《商品陈列手册》第3.2节要求核心活动商品保持主陈列面完整，并每日确认安全库存。</p></div></div>
        <div className="ai-judgement"><b>AI判断</b><p>缺货与执行偏差在销售下降期间共同出现，建议优先核实；当前证据不足以认定单一原因或员工责任。</p></div>
        <div className="story-actions"><button className="primary" onClick={()=>go("analysis")}>查看完整交叉分析</button><button className="secondary">创建改善行动</button></div>
      </article>
      <article className="opportunity-card">
        <div className="story-label success">首要市场机会</div><div className="op-source"><span>已确认</span>上海文旅发布 · 2小时前</div><h2>上海西岸亲子艺术节</h2><p className="op-desc">目标客群与高价值会员高度重合，距离徐汇港汇店3.2公里，具备快速转化为门店活动的条件。</p>
        <div className="match-score"><div><b>38%</b><span>目标会员重合度</span></div><div><b>3家</b><span>建议覆盖门店</span></div><div><b>10天</b><span>活动准备周期</span></div></div>
        <div className="op-plan"><small>AI推荐方向</small><b>亲子共创体验＋会员礼遇</b><p>清润系列 · 家庭套装 · 社群邀约</p></div>
        <button className="primary full" onClick={()=>go("intel")}>核实依据并生成活动</button>
      </article>
    </section>
    <section className="panel loop-panel"><div className="panel-title"><div><b>行动闭环</b><em>任务完成不等于问题解决</em></div><button onClick={()=>go("customer")}>查看全部行动 →</button></div><div className="loop-flow"><div><span>3</span><b>待人工确认</b><small>AI分析与市场情报</small></div><i>→</i><div><span>2</span><b>加盟商协同</b><small>等待反馈与确认</small></div><i>→</i><div><span>11</span><b>门店执行中</b><small>整改、活动与培训</small></div><i>→</i><div><span>428</span><b>C端反馈</b><small>参与、购买与评价</small></div><i>→</i><div><span>6</span><b>等待结果验证</b><small>比较行动前后变化</small></div></div></section>
  </>;
}

function Analysis() {
  const [question,setQuestion]=useState("为什么静安大悦城店本月销售下降？请结合库存、巡查、员工培训、活动执行和运营手册分析。");
  const prompts=["为什么静安大悦城店本月销售下降？请结合库存、巡查、员工培训、活动执行和运营手册分析。","哪些加盟商本周需要重点维护？","整改完成后，哪些门店的经营指标得到改善？"];
  return <div className="analysis-layout"><section className="analysis-main"><div className="page-head"><div className="eyebrow">AI OPERATIONS COPILOT</div><h1>智能交叉分析</h1><p>同时理解经营数据与企业文档，给出有依据、可追溯的运营建议。</p></div><div className="question-box"><div className="mini-label">分析问题</div><textarea value={question} onChange={e=>setQuestion(e.target.value)}/><div className="chips">{prompts.map(p=><button onClick={()=>setQuestion(p)} key={p}>{p.slice(0,14)}…</button>)}</div><button className="primary">✦ 重新分析</button></div>
    <div className="answer"><div className="answer-head"><span className="ai-avatar">AI</span><div><b>运营分析结论</b><small>已调用 5个数据模块 · 2份企业文档</small></div><em>可信度：中高</em></div>
      <div className="conclusion"><b>结论摘要</b><p>静安店的销售下降主要集中在两个核心商品。当前证据显示，<strong>商品缺货、陈列执行不完整与活动物料逾期</strong>在相同时间段共同出现；但现有数据不足以认定单一原因或员工责任。</p></div>
      <h3>关键发现与交叉分析</h3>
      <div className="finding"><span>01</span><div><b>销售 × 库存</b><p>销售降幅中的约61%来自「清润套装」与「焕亮精华」，两款商品分别缺货5天和3天。缺货期间同类门店相关品类仍增长4.6%。</p></div><em>高相关</em></div>
      <div className="finding"><span>02</span><div><b>陈列 × 商品销量</b><p>7月29日巡查记录显示核心展位陈列面不足，且为近两次重复问题。整改完成后的数据观察期尚不足。</p></div><em>待验证</em></div>
      <div className="finding"><span>03</span><div><b>活动执行 × 经营结果</b><p>门店物料确认任务逾期2天，会员邀约完成率仅54%，低于区域均值23个百分点。</p></div><em>中相关</em></div>
      <div className="doc-quote"><span>▤</span><div><b>企业文档依据</b><p>《商品陈列手册》第3.2节：核心活动商品应保持主陈列面完整，并每日确认安全库存与物料状态。</p></div><button>查看原文</button></div>
      <h3>建议行动</h3><div className="actions"><button><span>1</span><b>核实并补齐库存</b><small>商品运营 · 今日完成</small></button><button><span>2</span><b>发起陈列复查</b><small>区域经理 · 48小时内</small></button><button><span>3</span><b>补做会员邀约</b><small>店长 · 本周完成</small></button></div>
      <div className="guardrail"><b>人工确认提示</b><p>AI仅提供相关性线索。销售下降还可能受客流、商圈变化等因素影响，不能依据巡查照片直接判定员工责任。</p></div>
    </div></section><aside className="evidence"><div className="evidence-head"><b>分析证据</b><em>5项引用</em></div>{evidence.map(e=><div className="evidence-item" key={e[0]}><span>✓</span><div><b>{e[0]}</b><p>{e[1]}</p><small>{e[2]}</small></div></div>)}<div className="scope"><b>本次分析范围</b><p>对象：静安大悦城店</p><p>周期：2026.07.01—07.31</p><p>比较：华东同类型门店</p></div></aside></div>;
}

function Intel({ go }: {go:(v:View)=>void}) {
  const [status,setStatus]=useState("全部情报");
  const news=[
    {type:"本地事件",title:"上海西岸亲子艺术节8月中旬开幕",source:"上海文旅发布",time:"2小时前",state:"已确认",rel:"高",desc:"预计覆盖亲子家庭与年轻女性客群，距徐汇港汇店3.2公里。"},
    {type:"商圈动态",title:"静安大悦城启动夏日会员消费季",source:"商场官方公众号",time:"5小时前",state:"部分确认",rel:"高",desc:"商场将提供会员积分加倍，具体品牌联合权益仍待确认。"},
    {type:"竞品动态",title:"竞品推出七夕限定礼盒及达人探店活动",source:"用户上传截图",time:"昨天",state:"待确认",rel:"中",desc:"截图未包含完整活动规则，建议核实价格与覆盖门店。"},
    {type:"天气变化",title:"周末高温预警，预计最高温度39℃",source:"上海市气象服务",time:"1小时前",state:"已确认",rel:"中",desc:"可能降低午间客流，清凉类商品及晚间活动存在机会。"},
  ];
  return <><div className="page-head row"><div><div className="eyebrow">MARKET INTELLIGENCE</div><h1>市场情报中心</h1><p>从外部变化中发现机会，核实后再转化为运营活动。</p></div><button className="primary">＋ 添加网页或资料</button></div><div className="intel-summary"><div><span>今日新情报</span><b>18</b><small>较昨日 +6</small></div><div><span>待人工确认</span><b>7</b><small>需要运营核实</small></div><div><span>高关联机会</span><b>5</b><small>涉及 12家门店</small></div><div><span>已转入活动</span><b>3</b><small>本月累计 11</small></div></div>
    <div className="filterbar">{["全部情报","已确认","部分确认","待确认","已过期"].map(x=><button className={status===x?"active":""} onClick={()=>setStatus(x)} key={x}>{x}</button>)}<span/><button>筛选：华东区域⌄</button></div>
    <div className="intel-grid"><section className="news-list">{news.filter(n=>status==="全部情报"||n.state===status).map((n,i)=><article className="news" key={n.title}><div className="news-top"><em>{n.type}</em><span className={`state s${i}`}>{n.state}</span><small>{n.time}</small></div><h3>{n.title}</h3><p>{n.desc}</p><div className="news-bottom"><span>来源：{n.source}</span><b>品牌关联度：{n.rel}</b><button onClick={()=>go("campaign")}>{n.state==="已确认"?"转入活动中心 →":"查看并核实 →"}</button></div></article>)}</section>
      <aside className="intel-ai"><div className="ai-icon">✦</div><b>AI机会扫描</b><p>基于今日18条情报、会员客群和门店数据，发现一个值得优先评估的机会。</p><div className="opportunity"><em>推荐机会</em><h3>亲子艺术节联动活动</h3><p>目标客群与品牌高价值会员重合度约 <b>38%</b>，徐汇、静安、浦东3家门店具备覆盖优势。</p><ul><li>建议活动：亲子体验＋会员礼遇</li><li>适合商品：清润系列、家庭套装</li><li>准备周期：约10天</li></ul><button className="primary" onClick={()=>go("campaign")}>查看活动建议</button></div><small>情报机会必须经人工核实后才能进入活动中心。</small></aside></div>
  </>;
}

function Campaign() {
  const [tab,setTab]=useState("方案概览");
  return <><div className="page-head row"><div><div className="eyebrow">CAMPAIGN STUDIO</div><h1>亲子艺术节 · 门店联动活动</h1><p><span className="confirmed">已确认情报</span> 来源：上海文旅发布 · 活动准备期10天</p></div><div><button className="secondary">保存草稿</button><button className="primary">提交人工审核</button></div></div>
    <div className="campaign-tabs">{["方案概览","目标客群","门店与商品","内容素材","执行任务","效果指标"].map(x=><button className={tab===x?"active":""} onClick={()=>setTab(x)} key={x}>{x}</button>)}</div>
    <div className="campaign-grid"><section><div className="panel campaign-card"><div className="campaign-cover"><span>夏日艺术灵感</span><h2>亲子共创 · 美好相伴</h2><p>品牌会员亲子体验日</p></div><div className="campaign-info"><div><small>活动目标</small><b>会员激活＋亲子客群拉新</b></div><div><small>建议时间</small><b>8月15日—8月17日</b></div><div><small>覆盖门店</small><b>徐汇、静安、浦东 3家</b></div><div><small>预算建议</small><b>¥36,000</b></div></div></div>
      <div className="panel"><div className="panel-title"><b>AI活动策略</b><em>基于情报、会员、商品与门店数据</em></div><div className="strategy"><span>01</span><div><b>活动机制</b><p>会员携亲子到店参与艺术共创体验，完成互动可领取清润系列体验装；消费满额获得限定礼盒。</p></div></div><div className="strategy"><span>02</span><div><b>顾客分层</b><p>优先触达近180天购买家庭护理产品、具备亲子偏好且已授权营销的2,846名会员。</p></div></div><div className="strategy"><span>03</span><div><b>门店差异化</b><p>徐汇店承担主会场；静安店需先完成库存与陈列整改，确认后才能参与；浦东店侧重社群邀约。</p></div></div></div>
    </section><aside><div className="panel readiness"><div className="panel-title"><b>活动准备度</b><em>68%</em></div>{[["情报核实",100],["目标与客群",90],["商品库存",62],["内容素材",45],["门店任务",40]].map(x=><div key={String(x[0])}><span>{x[0]}</span><i><i style={{width:`${x[1]}%`}}/></i><b>{x[1]}%</b></div>)}</div><div className="panel risk"><b>AI风险提醒</b><p>静安店核心商品库存不足，不建议在库存确认前发布顾客邀约。</p><p>活动涉及未成年人现场照片，需配置拍摄授权确认。</p></div><div className="panel docs-used"><b>已引用企业资料</b><p>▤ 《品牌活动规范》2026版</p><p>▤ 《会员触达与隐私规范》</p><p>▤ 《门店活动执行手册》</p></div></aside></div>
  </>;
}

function Franchisee() {
  const [selected,setSelected]=useState(0);
  const fs=[{name:"上海启悦商业管理有限公司",contact:"周明远",stores:3,status:"重点维护",sales:"-11.8%",tickets:2,last:"25天前"},{name:"杭州知润零售有限公司",contact:"陈晓雯",stores:2,status:"重点成长",sales:"+16.2%",tickets:0,last:"3天前"},{name:"苏州美邻商贸有限公司",contact:"王海",stores:4,status:"正常维护",sales:"+4.7%",tickets:1,last:"8天前"}];
  const f=fs[selected];
  return <><div className="page-head row"><div><div className="eyebrow">FRANCHISEE SUCCESS</div><h1>加盟商中心</h1><p>连接合作背景、门店经营、服务记录与市场变化，辅助总部精准维护。</p></div><button className="primary">＋ 新增加盟商资料</button></div><div className="franchise-layout"><section className="panel f-list"><div className="list-search">⌕ 搜索加盟商、联系人或门店</div>{fs.map((x,i)=><button className={selected===i?"active":""} onClick={()=>setSelected(i)} key={x.name}><span className="company-avatar">{x.name.slice(0,1)}</span><div><b>{x.name}</b><small>{x.contact} · {x.stores}家门店</small></div><em>{x.status}</em></button>)}</section>
    <section className="f-detail"><div className="panel company-head"><div className="company-avatar big">启</div><div><div><h2>{f.name}</h2><em className="pill red">{f.status}</em></div><p>合作始于2022年 · 华东区域 · 负责人：林倩</p></div><button className="secondary">记录沟通</button></div>
      <div className="f-stats"><div><small>关联门店</small><b>{f.stores}家</b></div><div><small>本月销售变化</small><b className={f.sales.startsWith("-")?"negative":"positive"}>{f.sales}</b></div><div><small>未结工单</small><b>{f.tickets}项</b></div><div><small>最近正式联系</small><b>{f.last}</b></div></div>
      <div className="panel partner-voice"><div className="panel-title"><div><b>加盟商反馈与异议</b><em>人工补充 · 7月31日</em></div><button>＋ 记录反馈</button></div><div><span>周先生</span><p>“静安店近期受商场楼层施工影响，午间客流明显减少。库存问题确实存在，但销售下降不能只归因于门店执行，希望总部协助核实商场客流并协调到货。”</p><em>该反馈将作为下一次AI分析的人工证据，不自动覆盖原始数据。</em></div></div>
      <div className="panel ai-maintain"><div className="panel-title"><div><span className="spark">✦</span><b>AI加盟商维护建议</b></div><em>已纳入加盟商反馈 · 09:30</em></div><div className="maintain-summary"><b>建议本周优先回访</b><p>关联门店销售下降与商品缺货、活动支持不足处于同一时间段；2个服务工单即将超时，且距离上次正式回访已25天。</p></div><div className="maintain-columns"><div><b>已确认事实</b><ul><li>3家门店中2家销售连续下降</li><li>2个工单超过预期处理时长</li><li>加盟商补充商场施工影响客流</li></ul></div><div><b>建议沟通重点</b><ul><li>先说明未结工单处理进度</li><li>联合核实商品与商场客流影响</li><li>确认下一阶段活动支持需求</li></ul></div></div><div className="talk-script"><small>建议沟通话术</small><p>“周总，我们已将您反馈的商场施工情况纳入复盘。此次希望和您一起核实客流、库存与活动执行三方面影响，再逐项确认总部可提供的支持和完成时间。”</p></div><div className="guardrail"><b>待人工确认</b><p>商场施工对客流的影响尚待数据核实。AI不对加盟商合作态度或经营责任作自动判断。</p></div><div className="action-row"><button className="primary">创建维护任务</button><button className="secondary">生成回访提纲</button><button className="secondary">查看引用依据</button></div></div>
    </section></div></>;
}

function Generic({view}:{view:View}) {
  const cfg:Record<string,[string,string,string[]]>= {
    store:["门店中心","终端经营、巡查整改与现场执行",["门店经营概览","巡查与整改","商品库存","活动执行"]],
    people:["员工与培训","从员工表现发现能力短板并验证培训改善",["员工表现","课程计划","培训任务","改善验证"]],
    customer:["消费者运营","基于授权数据完成顾客分群、触达与反馈闭环",["会员分群","流失召回","活动响应","投诉与评价"]],
    tasks:["任务与工单","把分析建议转化为有人负责、有时限、可复盘的行动",["待办任务","巡查整改","服务工单","完成确认"]],
    knowledge:["企业知识库","让AI结合制度、手册和历史方案给出有依据的建议",["运营制度","陈列手册","活动方案","培训资料"]],
  }; const c=cfg[view];
  return <><div className="page-head"><div className="eyebrow">OPERATIONS MODULE</div><h1>{c[0]}</h1><p>{c[1]}</p></div><div className="generic-grid">{c[2].map((x,i)=><div className="panel generic-card" key={x}><span>0{i+1}</span><h3>{x}</h3><p>{i===0?"查看关键数据、趋势变化与AI摘要。":"与其他模块数据关联，支持进一步交叉分析。"}</p><button>进入查看 →</button></div>)}</div><div className="panel data-preview"><div className="panel-title"><b>演示数据概览</b><em>模拟数据 · 可替换为企业真实系统接口</em></div><div className="preview-chart">{[64,82,46,91,70,76,58,88,68,94,73,86].map((h,i)=><i key={i} style={{height:`${h}%`}}/> )}</div></div></>;
}

export default function Home() {
  const [view,setView]=useState<View>("overview");
  const [securityOpen,setSecurityOpen]=useState(false);
  const title=useMemo(()=>menu.find(x=>x.id===view)?.label||"经营工作台",[view]);
  return <div className="app-shell"><aside className="sidebar"><div className="brand"><span>NE</span><div><b>NEXUS AI</b><small>智能运营中台</small></div></div><nav>{menu.map(m=><button key={m.id} className={view===m.id?"active":""} onClick={()=>setView(m.id)}><i>{m.icon}</i>{m.label}</button>)}</nav><div className="nav-sub"><small>系统能力</small><button onClick={()=>setView("knowledge")}><i>▤</i>企业知识库</button><button onClick={()=>setSecurityOpen(true)}><i>⌾</i>数据与权限</button></div><div className="sidebar-foot"><div className="system"><i className="online"/><span><b>数据连接正常</b><small>最近同步 09:30</small></span></div><div className="profile"><span>林</span><div><b>林倩</b><small>总部运营负责人</small></div><i>⌄</i></div></div></aside>
    <main><header><div className="breadcrumb">AI智能运营中台 <span>/</span> {title}</div><div className="header-actions"><button className="role-chip"><span>总部运营负责人</span><small>华东区域</small><i>⌄</i></button><button className="safe-chip" onClick={()=>setSecurityOpen(true)}>✓ 已脱敏 · 6个数据源</button><button title="通知">♢<i className="notice"/></button><button className="ai-entry" onClick={()=>setView("analysis")}>✦ 问AI</button></div></header><div className="content">{view==="overview"&&<Overview go={setView}/>} {view==="analysis"&&<Analysis/>} {view==="intel"&&<Intel go={setView}/>} {view==="campaign"&&<Campaign/>} {view==="franchisee"&&<Franchisee/>} {["store","people","customer","tasks","knowledge"].includes(view)&&<Generic view={view}/>}</div></main>
    {securityOpen&&<div className="drawer-backdrop" onClick={()=>setSecurityOpen(false)}><aside className="security-drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><div><div className="eyebrow">DATA SAFETY</div><h2>本次数据范围与脱敏</h2></div><button onClick={()=>setSecurityOpen(false)}>×</button></div><div className="safe-banner"><span>✓</span><div><b>数据已完成权限过滤与脱敏</b><p>无权限数据不会进入AI分析上下文。</p></div></div><h3>当前访问身份</h3><div className="safe-grid"><div><small>角色</small><b>总部运营负责人</b></div><div><small>组织范围</small><b>华东区域</b></div><div><small>可访问门店</small><b>42家</b></div><div><small>数据更新</small><b>08-01 09:30</b></div></div><h3>敏感数据处理</h3>{[["C端顾客","姓名匿名化、手机号脱敏、详细地址不进入AI"],["加盟商","联系人脱敏；合同金额与回款未纳入本次分析"],["员工","仅展示授权范围；小样本自动隐藏个人明细"],["企业文档","仅检索允许AI使用且当前角色有权查看的文档"]].map(x=><div className="safe-row" key={x[0]}><span>✓</span><div><b>{x[0]}</b><p>{x[1]}</p></div></div>)}<h3>AI本次可用范围</h3><div className="scope-tags"><span>销售</span><span>库存</span><span>巡查</span><span>活动</span><span>脱敏会员</span><span>内部运营文档</span></div><div className="excluded"><b>未纳入AI分析</b><p>完整手机号、身份证、详细地址、合同金额、个人证件、禁止AI处理的机密文档。</p></div></aside></div>}
  </div>;
}
