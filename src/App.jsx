import { useMemo, useState } from 'react'

const heroImage = 'https://images.unsplash.com/photo-1772311291041-9e5385477579?auto=format&fit=crop&w=2200&q=88'
const interiorImage = 'https://images.unsplash.com/photo-1764837599929-100bd5890c57?auto=format&fit=crop&w=1800&q=86'
const forestHouse = 'https://images.unsplash.com/photo-1568707126892-99e6470ce9bf?auto=format&fit=crop&w=1800&q=86'
const projectImage2 = 'https://images.unsplash.com/photo-1764837599929-100bd5890c57?auto=format&fit=crop&w=1500&q=84'
const projectImage3 = 'https://images.unsplash.com/photo-1772311291041-9e5385477579?auto=format&fit=crop&w=1500&q=84'

const formatPrice = (value) => new Intl.NumberFormat('ru-RU').format(value)

const profiles = [
  { brand: 'SCHÜCO', model: 'ASE 80.HI', note: 'Для крупных проёмов и минималистичной архитектуры', weight: 'до 500 кг' },
  { brand: 'REYNAERS', model: 'MasterPatio', note: 'Большие створки и высокая герметичность', weight: 'до 600 кг' },
  { brand: 'ALUPROF', model: 'MB-77HS', note: 'Сбалансированное решение для частного дома', weight: 'до 400 кг' },
  { brand: 'ALUTECH', model: 'ALT SL160', note: 'Рациональное решение для больших проёмов', weight: 'до 440 кг' },
]

const projectExamples = [
  { place: 'Новая Рига', title: 'Панорамный выход на террасу', size: '5 800 × 2 700 мм', system: 'Schüco', budget: 'от 1 480 000 ₽', image: forestHouse },
  { place: 'Истра', title: 'HS-портал для гостиной', size: '6 000 × 2 800 мм', system: 'Reynaers', budget: 'от 1 960 000 ₽', image: projectImage2 },
  { place: 'Рублёво-Успенское', title: 'Раздвижная система в сад', size: '4 500 × 2 700 мм', system: 'ALUTECH', budget: 'от 1 230 000 ₽', image: projectImage3 },
]

function Icon({ name }) {
  const paths = {
    sun: <><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></>,
    shield: <path d="M12 3l7 3v5c0 5-3.1 8.1-7 10-3.9-1.9-7-5-7-10V6l7-3Z"/>,
    ruler: <><path d="M4 7h16v10H4z"/><path d="M7 7v3M10 7v2M13 7v3M16 7v2"/></>,
    tool: <path d="M14 6a4 4 0 0 0-5 5L3 17l4 4 6-6a4 4 0 0 0 5-5l-3 3-3-3 2-4Z"/>,
    leaf: <><path d="M20 4C12 4 6 7 5 13c-.5 3 2 6 5 5 6-1 9-7 10-14Z"/><path d="M5 20c2-5 6-8 11-11"/></>,
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">{paths[name] || paths.shield}</svg>
}

function Header() {
  const [open, setOpen] = useState(false)
  const nav = [['О HS-порталах','#about'],['Проекты','#projects'],['Стоимость','#calculator'],['Как мы работаем','#process'],['FAQ','#faq']]
  return <header className="site-header">
    <a href="#top" className="brand" aria-label="NORD — наверх"><strong>NORD</strong><span>панорамные решения</span></a>
    <nav className={open ? 'nav nav--open' : 'nav'} aria-label="Основная навигация">{nav.map(([label,href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav>
    <a className="button button--dark header-cta" href="#calculator">Рассчитать проект <span>→</span></a>
    <button className="menu-button" aria-label="Открыть меню" aria-expanded={open} onClick={() => setOpen(v => !v)}><span/><span/></button>
  </header>
}

function Hero() {
  return <section className="hero" id="top">
    <img className="hero__image" src={heroImage} alt="Современный загородный дом с панорамным раздвижным остеклением" fetchPriority="high" />
    <div className="hero__wash"/><Header/>
    <div className="container hero__content">
      <p className="eyebrow">АЛЮМИНИЕВЫЕ HS-ПОРТАЛЫ</p>
      <h1>Пространство<br/>без лишних границ</h1>
      <p className="hero__lead">Панорамные раздвижные системы для дома и террасы в Москве и Московской области.</p>
      <div className="hero__actions"><a className="button button--dark" href="#calculator">Рассчитать стоимость <span>→</span></a><a className="button button--light" href="#projects">Смотреть проекты</a></div>
      <div className="hero__facts"><span><Icon name="ruler"/> Большие проёмы</span><span><Icon name="shield"/> Тёплые алюминиевые системы</span><span><Icon name="tool"/> Монтаж под ключ</span></div>
    </div>
  </section>
}

function About() {
  return <section className="section about" id="about"><div className="container">
    <div className="section-heading section-heading--split"><div><p className="eyebrow">ПОНЯТНО О HS-ПОРТАЛАХ</p><h2>Панорамная дверь, которая легко сдвигается</h2></div><p>HS-портал — это большая стеклянная конструкция для широких проёмов. Створка слегка приподнимается, освобождает уплотнение и плавно движется по направляющей. Поэтому даже тяжёлое стекло открывается без рывков и не занимает место в комнате.</p></div>
    <div className="about-grid">
      <div className="mechanics card"><div className="card-title-row"><h3>Как открывается</h3><span>3 простых движения</span></div><div className="steps-visual">
        <article><b>01</b><div className="handle-demo"><span className="handle"/></div><h4>Поверните ручку</h4><p>Механизм снимает нагрузку с уплотнения.</p></article>
        <article><b>02</b><div className="lift-demo"><span/></div><h4>Створка приподнимается</h4><p>Буквально на несколько миллиметров.</p></article>
        <article><b>03</b><div className="slide-demo"><span/><i>→</i></div><h4>Плавно сдвигается</h4><p>Вдоль соседней части остекления.</p></article>
      </div></div>
      <figure className="about-photo card card--image"><img src={interiorImage} alt="Панорамный портал между гостиной и террасой" loading="lazy"/><figcaption>Дом и терраса становятся единым пространством</figcaption></figure>
    </div>
    <div className="feature-row">
      <article className="threshold card"><div><p className="eyebrow">ПОРОГ</p><h3>Аккуратный переход между домом и террасой</h3><p>В зависимости от системы порог можно сделать низким или практически скрыть в уровень чистого пола. Мы заранее учитываем основание и водоотвод, чтобы решение было не только красивым, но и практичным.</p></div><div className="threshold-diagram" aria-label="Схема низкого порога"><span>ИНТЕРЬЕР</span><i/><b>порог</b><i/><span>ТЕРРАСА</span></div></article>
      <article className="benefits card"><p className="eyebrow">ЧТО ВЫ ПОЛУЧАЕТЕ</p><div className="benefit-list"><span><Icon name="sun"/><b>Больше света</b><small>панорамное стекло от пола до потолка</small></span><span><Icon name="ruler"/><b>Большие створки</b><small>решения для проёмов около 3 м и выше</small></span><span><Icon name="shield"/><b>Комфорт круглый год</b><small>тёплый алюминий и энергоэффективное стекло</small></span><span><Icon name="leaf"/><b>Ближе к природе</b><small>широкий проход без распашной двери</small></span></div></article>
    </div>
    <div className="applications"><div className="applications__text"><p className="eyebrow">ГДЕ ПРИМЕНЯЕТСЯ</p><h3>Для дома, террасы и больших панорамных проёмов</h3></div><div className="applications__items">{['Загородный дом','Выход на террасу','Гостиная / кухня','Бассейн / SPA'].map((label,i)=><span key={label}><b>0{i+1}</b>{label}</span>)}</div></div>
    <div className="profiles"><div className="profiles__intro"><p className="eyebrow">ПРОФИЛЬНЫЕ СИСТЕМЫ</p><h3>Подбираем систему под проект, а не проект под один бренд</h3><p>Смотрим на размеры проёма, архитектуру, бюджет и требования к комфорту — затем сравниваем подходящие варианты.</p></div><div className="profiles__grid">{profiles.map(p=><article key={p.brand} className="profile-card"><strong>{p.brand}</strong><span>{p.model}</span><p>{p.note}</p><small>{p.weight} на створку*</small></article>)}</div><p className="microcopy">*Предельные параметры зависят от конкретной конфигурации, стеклопакета и расчёта конструкции.</p></div>
  </div></section>
}

function Process() {
  const steps=[['01','Консультация','понимаем задачу и бюджет'],['02','Точный замер','проверяем проём и уровни'],['03','Проектирование','подбираем систему и узлы'],['04','Производство','изготавливаем под ваш размер'],['05','Монтаж и сервис','устанавливаем и настраиваем']]
  return <section className="process" id="process"><div className="container process__inner"><div className="process__title"><p className="eyebrow">ОТ ИДЕИ ДО РЕЗУЛЬТАТА</p><h2>Полный цикл под ваш проект</h2></div><div className="process__steps">{steps.map(([n,t,d])=><div key={n}><b>{n}</b><strong>{t}</strong><span>{d}</span></div>)}</div></div></section>
}

function Calculator() {
  const [width,setWidth]=useState(4000), [height,setHeight]=useState(2700), [scheme,setScheme]=useState('two'), [tier,setTier]=useState('comfort')
  const [extras,setExtras]=useState({threshold:true,solar:false,mosquito:false})
  const area=useMemo(()=>(width*height)/1_000_000,[width,height])
  const rate={rational:75000,comfort:95000,premium:120000}[tier]
  const schemeFactor={two:1,three:1.07,four:1.12}[scheme]
  const extrasCost=(extras.threshold?area*3500:0)+(extras.solar?area*6500:0)+(extras.mosquito?65000:0)
  const total=Math.round(((area*rate*schemeFactor)+extrasCost)/10000)*10000
  const downloadEstimate=()=>{const content=`Предварительный расчёт HS-портала\nРазмер: ${width} × ${height} мм\nПлощадь: ${area.toFixed(1)} м²\nСхема: ${scheme==='two'?'2 секции':scheme==='three'?'3 секции':'4 секции'}\nКомплектация: ${tier}\nОриентировочная стоимость: ${formatPrice(total)} ₽\n\nРасчёт предварительный. Точная стоимость определяется после замера и подбора системы.`;const blob=new Blob([content],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='hs-portal-estimate.txt';a.click();URL.revokeObjectURL(url)}
  const toggleExtra=(key)=>setExtras(prev=>({...prev,[key]:!prev[key]}))
  return <section className="section calculator-section" id="calculator"><div className="container">
    <div className="section-heading section-heading--split calculator-heading"><div><p className="eyebrow">КАЛЬКУЛЯТОР</p><h2>Прикиньте стоимость своего HS-портала</h2></div><p>Цена появится сразу — без регистрации и номера телефона. Это ориентир для планирования бюджета; точную смету фиксируем после замера и выбора системы.</p></div>
    <div className="calculator card">
      <div className="calculator__visual"><img src={forestHouse} alt="Пример панорамного HS-портала в загородном доме" loading="lazy"/><div className={`portal-overlay portal-overlay--${scheme}`} aria-hidden="true"><i/><i/><i/><i/></div><span>{area.toFixed(1).replace('.',',')} м²</span></div>
      <div className="calculator__controls">
        <fieldset><legend>1. Размеры проёма</legend><label>Ширина <output>{width} мм</output><input type="range" min="2500" max="8000" step="100" value={width} onChange={e=>setWidth(Number(e.target.value))}/></label><label>Высота <output>{height} мм</output><input type="range" min="2200" max="3500" step="50" value={height} onChange={e=>setHeight(Number(e.target.value))}/></label></fieldset>
        <fieldset><legend>2. Схема открывания</legend><div className="choice-grid choice-grid--3">{[['two','2 секции'],['three','3 секции'],['four','4 секции']].map(([value,label])=><button type="button" key={value} className={scheme===value?'choice is-active':'choice'} onClick={()=>setScheme(value)}><span className={`scheme scheme--${value}`}/>{label}</button>)}</div></fieldset>
        <fieldset><legend>3. Уровень решения</legend><div className="choice-grid choice-grid--3 tier-grid">{[['rational','Рациональный','от 75 000 ₽/м²'],['comfort','Комфорт','от 95 000 ₽/м²'],['premium','Максимум','от 120 000 ₽/м²']].map(([value,label,price])=><button type="button" key={value} className={tier===value?'choice is-active':'choice'} onClick={()=>setTier(value)}><strong>{label}</strong><small>{price}</small></button>)}</div></fieldset>
        <fieldset className="extras"><legend>Дополнительно</legend><div>{[['threshold','Низкий порог'],['solar','Солнцезащитное стекло'],['mosquito','Москитная система']].map(([key,label])=><button type="button" key={key} className={extras[key]?'pill is-active':'pill'} onClick={()=>toggleExtra(key)}><span>{extras[key]?'✓':'+'}</span>{label}</button>)}</div></fieldset>
      </div>
      <aside className="calculator__summary"><p className="eyebrow">ВАШ РАСЧЁТ</p><dl><div><dt>Размер</dt><dd>{width} × {height} мм</dd></div><div><dt>Площадь</dt><dd>{area.toFixed(1).replace('.',',')} м²</dd></div><div><dt>Схема</dt><dd>{scheme==='two'?'2 секции':scheme==='three'?'3 секции':'4 секции'}</dd></div></dl><span className="estimate-label">Ориентировочный бюджет</span><strong className="estimate">≈ {formatPrice(total)} ₽</strong><small>Расчёт ориентировочный и не является публичной офертой. Итог зависит от профиля, стеклопакета, монтажа и особенностей объекта.</small><a className="button button--dark button--full" href="#contact">Получить точный расчёт <span>→</span></a><button className="button button--outline button--full" type="button" onClick={downloadEstimate}>Сохранить расчёт</button></aside>
    </div>
  </div></section>
}

function Projects() {
  return <section className="section projects" id="projects"><div className="container"><div className="section-heading section-heading--split"><div><p className="eyebrow">ПРОЕКТЫ И БЮДЖЕТЫ</p><h2>Наши проекты</h2></div><p>Формат карточек для реальных объектов: размеры, профильная система и бюджет. Демонстрационные примеры нужно заменить фактическими проектами компании перед боевой публикацией.</p></div><div className="project-grid">{projectExamples.map((p,idx)=><article className="project-card" key={p.title}><div className="project-card__image"><img src={p.image} alt={p.title} loading="lazy"/><span>{p.place}</span></div><div className="project-card__body"><p>Проект {String(idx+1).padStart(2,'0')}</p><h3>{p.title}</h3><div><span>{p.size}</span><span>{p.system}</span></div><strong>{p.budget}</strong><a href="#contact" aria-label={`Обсудить похожий проект: ${p.title}`}>Обсудить похожий проект <span>→</span></a></div></article>)}</div></div></section>
}

function Trust() {
  const items=[['Честное сравнение','Не привязываем проект к одному профилю: показываем несколько подходящих вариантов и разницу в цене.'],['Проектируем весь узел','Учитываем не только раму, но и порог, основание, примыкания и водоотвод.'],['Один подрядчик','Замер, проектирование, производство, доставка, монтаж и регулировка — в одном процессе.'],['Понятная смета','После инженерного замера фиксируем состав решения и стоимость в коммерческом предложении.']]
  return <section className="trust section"><div className="container trust__inner"><div className="trust__title"><p className="eyebrow">ПОЧЕМУ НАМ ДОВЕРЯЮТ</p><h2>Не просто продаём профиль. Собираем решение под ваш проём.</h2></div><div className="trust-grid">{items.map(([t,d],i)=><article key={t}><b>0{i+1}</b><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
}

function FAQ() {
  const [open,setOpen]=useState(0)
  const items=[['Будет ли холодно зимой?','Для жилых помещений используются тёплые алюминиевые системы с терморазрывом и энергоэффективные стеклопакеты. Конкретную конфигурацию подбирают по размеру проёма, стороне света и условиям объекта.'],['Можно ли сделать порог почти вровень с полом?','Да, многие HS-системы позволяют сделать низкий или практически скрытый порог. Важно заранее спроектировать основание и отвод воды со стороны террасы.'],['Насколько тяжело открывать большую створку?','Специальные каретки принимают основную нагрузку, поэтому правильно изготовленная и отрегулированная створка движется плавно. Для особенно больших порталов доступна автоматизация.'],['Сколько времени занимает проект?','Срок зависит от выбранной системы, цвета, стеклопакета и сложности монтажа. Точный график формируется после замера и согласования комплектации.'],['От чего больше всего зависит цена?','От площади, количества подвижных створок, профильной системы, стеклопакета, типа порога, окраски и монтажных условий. Поэтому цена за квадратный метр — только первый ориентир.']]
  return <section className="section faq" id="faq"><div className="container faq__grid"><div><p className="eyebrow">FAQ</p><h2>Частые вопросы</h2><p>Объясняем без сложной технической терминологии. Если у вас уже есть проект дома — можно сразу прислать план или размеры проёма.</p></div><div className="accordion">{items.map(([q,a],i)=><article className={open===i?'is-open':''} key={q}><button type="button" onClick={()=>setOpen(open===i?-1:i)} aria-expanded={open===i}><span>{q}</span><b>{open===i?'−':'+'}</b></button><div><p>{a}</p></div></article>)}</div></div></section>
}

function Contact() {
  const [status,setStatus]=useState('idle'), [form,setForm]=useState({name:'',phone:'',comment:''})
  const submit=async(e)=>{e.preventDefault();setStatus('sending');try{const res=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,source:'hs-landing'})});if(!res.ok)throw new Error('network');setStatus('sent');setForm({name:'',phone:'',comment:''})}catch{setStatus('demo')}}
  return <section className="contact" id="contact"><div className="container contact__grid"><div><p className="eyebrow">ОБСУДИМ ВАШ ПРОЕКТ</p><h2>Пришлите размеры проёма — подберём несколько вариантов</h2><p>Можно начать с плана дома, визуализации, фотографии или просто ширины и высоты проёма.</p></div><form onSubmit={submit}><label>Имя<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Как к вам обращаться"/></label><label>Телефон<input required inputMode="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+7 999 000-00-00"/></label><label className="wide">Комментарий<textarea value={form.comment} onChange={e=>setForm({...form,comment:e.target.value})} placeholder="Например: проём 4 × 2,7 м, выход на террасу"/></label><button className="button button--dark" disabled={status==='sending'}>{status==='sending'?'Отправляем…':'Получить консультацию →'}</button>{status==='sent'&&<p className="form-note success">Заявка отправлена. Свяжемся с вами по указанному номеру.</p>}{status==='demo'&&<p className="form-note">Демо-форма готова к подключению к CRM/API. В репозитории есть серверный endpoint <code>/api/leads</code>.</p>}</form></div></section>
}

function Footer() {
  return <footer><div className="container footer__inner"><a href="#top" className="brand brand--footer"><strong>NORD</strong><span>панорамные решения</span></a><nav><a href="#about">О HS-порталах</a><a href="#calculator">Стоимость</a><a href="#projects">Проекты</a><a href="#faq">FAQ</a></nav><p>Москва и Московская область<br/><small>Демонстрационная версия сайта. Контакты и реальные проекты подключаются перед публикацией.</small></p></div></footer>
}

export default function App(){return <><Hero/><About/><Process/><Calculator/><Projects/><Trust/><FAQ/><Contact/><Footer/></>}
