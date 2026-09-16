import { useMemo, useState } from 'react'
import Home from './App.jsx'

const BASE = import.meta.env.BASE_URL
const toUrl = (path = '/') => path === '/' ? BASE : `${BASE}${path.replace(/^\//,'')}`
const normalizePath = () => {
  const base = BASE.replace(/\/$/,'')
  let path = window.location.pathname
  if (base && path.startsWith(base)) path = path.slice(base.length) || '/'
  if (!path.startsWith('/')) path = `/${path}`
  return path !== '/' && !path.endsWith('/') ? `${path}/` : path
}
const money = (v) => new Intl.NumberFormat('ru-RU').format(v)

const images = {
  hero:'https://images.unsplash.com/photo-1772311291041-9e5385477579?auto=format&fit=crop&w=2200&q=88',
  interior:'https://images.unsplash.com/photo-1764837599929-100bd5890c57?auto=format&fit=crop&w=1800&q=86',
  forest:'https://images.unsplash.com/photo-1568707126892-99e6470ce9bf?auto=format&fit=crop&w=1800&q=86',
}

const profiles = {
  'schueco-ase-80-hi': {brand:'Schüco', model:'ASE 80.HI', weight:'до 500 кг', height:'до 3,5 м', note:'Для крупных проёмов, минималистичной архитектуры и проектов с высокими требованиями к комфорту.'},
  'reynaers-masterpatio': {brand:'Reynaers', model:'MasterPatio', weight:'до 600 кг', height:'до 3,6 м', note:'Для особенно больших створок, тонкой архитектуры и сложных панорамных решений.'},
  'aluprof-mb-77hs': {brand:'Aluprof', model:'MB-77HS', weight:'до 400 кг', height:'до 3,2 м', note:'Сбалансированное решение для частного дома с хорошим набором характеристик.'},
  'alutech-alt-sl160': {brand:'ALUTECH', model:'ALT SL160', weight:'до 440 кг', height:'до 3,4 м', note:'Рациональное решение для больших проёмов и загородного строительства.'},
}

const projects = [
  {place:'Новая Рига', title:'Панорамный выход на террасу', size:'5 800 × 2 700 мм', system:'Schüco ASE 80.HI', budget:'от 1 480 000 ₽', image:images.forest},
  {place:'Истра', title:'HS-портал для гостиной', size:'6 000 × 2 800 мм', system:'Reynaers MasterPatio', budget:'от 1 960 000 ₽', image:images.interior},
  {place:'Рублёво-Успенское', title:'Раздвижная система в сад', size:'4 500 × 2 700 мм', system:'ALUTECH ALT SL160', budget:'от 1 230 000 ₽', image:images.hero},
]

function GlobalHeader({home=false}){
  const [open,setOpen]=useState(false)
  const nav=[['HS-порталы','/hs-portaly/'],['Проекты','/proekty/'],['Стоимость','/stoimost/'],['Как мы работаем','/montazh/'],['Блог','/blog/'],['Контакты','/kontakty/']]
  return <header className={`global-header ${home?'global-header--home':''}`}>
    <a className="global-brand" href={toUrl('/')}><strong>NORD</strong><span>панорамные решения</span></a>
    <nav className={open?'global-nav is-open':'global-nav'}>{nav.map(([label,path])=><a key={path} href={toUrl(path)}>{label}</a>)}</nav>
    <a className="global-cta" href={toUrl('/kalkulyator/')}>Рассчитать проект →</a>
    <button className="global-menu" aria-label="Меню" onClick={()=>setOpen(!open)}><span/><span/></button>
  </header>
}

function GlobalFooter(){return <footer className="global-footer"><div className="mp-container global-footer__grid">
  <a className="global-brand global-brand--footer" href={toUrl('/')}><strong>NORD</strong><span>панорамные решения</span></a>
  <nav><a href={toUrl('/hs-portaly/')}>HS-порталы</a><a href={toUrl('/profilnye-sistemy/')}>Профильные системы</a><a href={toUrl('/proekty/')}>Проекты</a><a href={toUrl('/stoimost/')}>Стоимость</a></nav>
  <nav><a href={toUrl('/montazh/')}>Как мы работаем</a><a href={toUrl('/o-kompanii/')}>О компании</a><a href={toUrl('/blog/')}>Блог</a><a href={toUrl('/kontakty/')}>Контакты</a></nav>
  <div><b>Москва и Московская область</b><p>Демонстрационная версия: телефон, реквизиты и реальные кейсы заменяются перед публикацией.</p></div>
</div></footer>}

function PageHero({eyebrow,title,lead,image=images.hero,compact=false}){return <section className={`mp-hero ${compact?'mp-hero--compact':''}`}>
  <img src={image} alt="Панорамный алюминиевый HS-портал"/>
  <div className="mp-hero__shade"/>
  <div className="mp-container mp-hero__content"><p className="mp-eyebrow">{eyebrow}</p><h1>{title}</h1><p>{lead}</p><div className="mp-hero__actions"><a className="mp-button mp-button--dark" href={toUrl('/kalkulyator/')}>Рассчитать стоимость →</a><a className="mp-button mp-button--light" href={toUrl('/proekty/')}>Смотреть проекты</a></div></div>
</section>}

function CTA(){return <section className="mp-cta"><div className="mp-container mp-cta__grid"><div><p className="mp-eyebrow">ОБСУДИМ ВАШ ПРОЕКТ</p><h2>Достаточно размеров проёма или фотографии</h2><p>Подберём несколько вариантов и объясним разницу в стоимости простым языком.</p></div><div className="mp-cta__actions"><a className="mp-button mp-button--dark" href={toUrl('/kontakty/')}>Получить консультацию →</a><a className="mp-button mp-button--outline" href={toUrl('/kalkulyator/')}>Сначала прикинуть цену</a></div></div></section>}

function ProductPage(){return <><PageHero eyebrow="АЛЮМИНИЕВЫЕ HS-ПОРТАЛЫ" title="Панорамная дверь для больших проёмов" lead="HS-портал объединяет интерьер с террасой или садом: много стекла, широкий проход и створки, которые не занимают место в помещении."/>
<section className="mp-section"><div className="mp-container"><div className="mp-split-title"><div><p className="mp-eyebrow">КАК ЭТО РАБОТАЕТ</p><h2>Большая створка открывается лёгким движением</h2></div><p>При повороте ручки створка слегка приподнимается, освобождает уплотнения и плавно едет по направляющей. При закрывании она опускается обратно и плотно прижимается.</p></div>
<div className="mp-three-steps">{[['01','Поверните ручку','Механизм подготавливает створку к движению.'],['02','Створка приподнимается','Нагрузка переходит на роликовые каретки.'],['03','Плавно сдвигается','Проём открывается без распашной двери.']].map(([n,t,d])=><article key={n}><b>{n}</b><span className="mp-step-icon">{n==='01'?'↻':n==='02'?'↑':'→'}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
<div className="mp-info-grid"><article className="mp-photo-card"><img src={images.interior} alt="HS-портал с низким порогом"/><div><p className="mp-eyebrow">НИЗКИЙ ПОРОГ</p><h3>Переход между домом и террасой выглядит аккуратно</h3><p>Порог можно сделать низким или практически скрыть в уровень пола. Для этого заранее проектируем основание и водоотвод.</p></div></article><article className="mp-card"><p className="mp-eyebrow">ГДЕ ИСПОЛЬЗУЮТ</p><h3>Там, где нужен большой светлый проём</h3><ul className="mp-list"><li>выход из гостиной на террасу</li><li>загородный дом или коттедж</li><li>кухня-столовая с выходом в сад</li><li>бассейн, SPA или зимний сад</li><li>пентхаус или квартира с террасой</li></ul></article></div>
<div className="mp-stats"><span><strong>до 3,6 м</strong>высота створки в отдельных системах</span><span><strong>до 600 кг</strong>вес створки в отдельных системах</span><span><strong>0–25 мм</strong>низкий порог в зависимости от системы</span><span><strong>4 системы</strong>сравниваем под один проект</span></div>
</div></section>
<SystemPreview/><CTA/></>}

function SystemPreview(){return <section className="mp-section mp-section--soft"><div className="mp-container"><div className="mp-split-title"><div><p className="mp-eyebrow">ПРОФИЛЬНЫЕ СИСТЕМЫ</p><h2>Подбираем систему под проект</h2></div><p>Не заставляем клиента выбирать бренд заранее. Сначала смотрим на размер проёма, архитектуру, бюджет и условия эксплуатации.</p></div><div className="mp-system-grid">{Object.entries(profiles).map(([slug,p])=><a className="mp-system-card" href={toUrl(`/profilnye-sistemy/${slug}/`)} key={slug}><span>{p.brand}</span><strong>{p.model}</strong><p>{p.note}</p><div><b>{p.weight}</b><b>{p.height}</b></div><small>Подробнее →</small></a>)}</div><div className="mp-center"><a className="mp-text-link" href={toUrl('/profilnye-sistemy/')}>Сравнить все профильные системы →</a></div></div></section>}

function SystemsPage(){return <><PageHero compact eyebrow="ПРОФИЛЬНЫЕ СИСТЕМЫ" title="Не один бренд — несколько решений под ваш проём" lead="Сравниваем Schüco, Reynaers, Aluprof и ALUTECH по возможностям, архитектуре и бюджету." image={images.interior}/><SystemPreview/><section className="mp-section"><div className="mp-container"><div className="mp-split-title"><div><p className="mp-eyebrow">КАК ВЫБИРАЕМ</p><h2>Смотрим не только на логотип профиля</h2></div><p>Для большого HS важны габариты, масса стекла, схема открывания, ветровая нагрузка, порог, стеклопакет и монтажный узел. Поэтому окончательное решение принимается после расчёта конкретного изделия.</p></div><div className="mp-feature-grid">{['Размер и вес створок','Низкий порог и водоотвод','Тепло и стеклопакет','Архитектура и видимая ширина','Фурнитура и ресурс','Бюджет проекта'].map((t,i)=><article key={t}><b>0{i+1}</b><h3>{t}</h3></article>)}</div></div></section><CTA/></>}

function ProfilePage({slug}){const p=profiles[slug];if(!p)return <NotFound/>;return <><PageHero compact eyebrow={`${p.brand.toUpperCase()} · HS`} title={`${p.brand} ${p.model}`} lead={p.note} image={images.interior}/><section className="mp-section"><div className="mp-container"><div className="mp-profile-summary"><div><p className="mp-eyebrow">КЛЮЧЕВЫЕ ВОЗМОЖНОСТИ</p><h2>Для каких проектов подходит</h2><p>Эта система рассматривается как один из вариантов для панорамных выходов на террасу, больших проёмов гостиной и современной загородной архитектуры.</p></div><div className="mp-profile-numbers"><span><strong>{p.weight}</strong>масса одной створки*</span><span><strong>{p.height}</strong>высота створки*</span></div></div><div className="mp-note">*Предельные параметры зависят от конкретной конфигурации, стеклопакета, ветровой нагрузки и расчёта производителя.</div><div className="mp-feature-grid"><article><b>01</b><h3>Подбираем стеклопакет</h3><p>По теплу, солнцезащите, безопасности и массе.</p></article><article><b>02</b><h3>Проектируем порог</h3><p>Учитываем чистовой пол и наружный водоотвод.</p></article><article><b>03</b><h3>Проверяем геометрию</h3><p>Чтобы большая створка работала плавно и стабильно.</p></article></div></div></section><CTA/></>}

function ProjectsPage(){return <><PageHero compact eyebrow="РЕАЛИЗОВАННЫЕ РЕШЕНИЯ" title="Проекты HS-порталов" lead="Показываем формат, размеры, выбранную систему и ориентир бюджета — чтобы было проще сравнить свой проект." image={images.forest}/><section className="mp-section"><div className="mp-container"><div className="mp-project-grid">{projects.map(p=><article className="mp-project" key={p.title}><img src={p.image} alt={p.title}/><div><span>{p.place}</span><h2>{p.title}</h2><p>{p.size} · {p.system}</p><strong>{p.budget}</strong><a href={toUrl('/kontakty/')}>Обсудить похожий проект →</a></div></article>)}</div><p className="mp-note">Пока это демонстрационные примеры интерфейса. Перед коммерческой публикацией карточки нужно заменить фактическими объектами и подтверждёнными бюджетами.</p></div></section><CTA/></>}

function PricePage(){return <><PageHero compact eyebrow="СТОИМОСТЬ" title="Сколько стоит алюминиевый HS-портал" lead="Площадь даёт первый ориентир, но итоговая цена зависит от схемы, профиля, стекла, порога и условий монтажа."/><section className="mp-section"><div className="mp-container"><div className="mp-price-table"><div><span>Рациональное решение</span><strong>ориентир от 75 000 ₽/м²</strong><p>Базовый ориентир для предварительной оценки.</p></div><div><span>Комфорт</span><strong>ориентир от 95 000 ₽/м²</strong><p>Популярный уровень для частного дома.</p></div><div><span>Максимум возможностей</span><strong>ориентир от 120 000 ₽/м²</strong><p>Премиальные системы, большие размеры и сложные опции.</p></div></div><div className="mp-split-title mp-top-gap"><div><p className="mp-eyebrow">ЧТО ВЛИЯЕТ НА СМЕТУ</p><h2>Одинаковая площадь — не всегда одинаковая цена</h2></div><p>Разница появляется из-за количества подвижных створок, выбранного профиля, стеклопакета, цвета, низкого порога, москитной системы, автоматики и монтажа.</p></div><div className="mp-feature-grid">{['Размер проёма','Схема открывания','Профильная система','Стеклопакет','Низкий порог','Монтаж и логистика'].map((t,i)=><article key={t}><b>0{i+1}</b><h3>{t}</h3></article>)}</div><div className="mp-center mp-top-gap"><a className="mp-button mp-button--dark" href={toUrl('/kalkulyator/')}>Рассчитать свой проём →</a></div></div></section></>}

function CalculatorPage(){const [w,setW]=useState(4000),[h,setH]=useState(2700),[scheme,setScheme]=useState(2),[tier,setTier]=useState('comfort');const area=useMemo(()=>(w*h)/1e6,[w,h]);const rate={base:75000,comfort:95000,premium:120000}[tier];const factor={2:1,3:1.07,4:1.12}[scheme];const total=Math.round(area*rate*factor/10000)*10000;return <><PageHero compact eyebrow="КАЛЬКУЛЯТОР" title="Прикиньте бюджет своего портала" lead="Без телефона и регистрации: укажите размер, схему и уровень решения — ориентир появится сразу." image={images.interior}/><section className="mp-section"><div className="mp-container"><div className="mp-calculator"><div className="mp-calc-fields"><fieldset><legend>1. Размеры проёма</legend><label>Ширина <output>{w} мм</output><input type="range" min="2500" max="8000" step="100" value={w} onChange={e=>setW(+e.target.value)}/></label><label>Высота <output>{h} мм</output><input type="range" min="2200" max="3500" step="50" value={h} onChange={e=>setH(+e.target.value)}/></label><p>Площадь: <b>{area.toFixed(1).replace('.',',')} м²</b></p></fieldset><fieldset><legend>2. Схема открывания</legend><div className="mp-options">{[2,3,4].map(n=><button className={scheme===n?'is-active':''} onClick={()=>setScheme(n)} key={n}>{n} секции</button>)}</div></fieldset><fieldset><legend>3. Уровень решения</legend><div className="mp-options">{[['base','Рационально'],['comfort','Комфорт'],['premium','Максимум']].map(([v,t])=><button className={tier===v?'is-active':''} onClick={()=>setTier(v)} key={v}>{t}</button>)}</div></fieldset></div><aside><span>Ориентировочная стоимость</span><strong>≈ {money(total)} ₽</strong><p>{w} × {h} мм · {area.toFixed(1).replace('.',',')} м²</p><small>Расчёт предварительный и не является публичной офертой. Точная стоимость определяется после замера и выбора системы.</small><a className="mp-button mp-button--dark" href={toUrl('/kontakty/')}>Получить точную смету →</a></aside></div></div></section></>}

function InstallationPage(){const steps=[['01','Консультация','Разбираем задачу, проём, архитектуру и бюджет.'],['02','Инженерный замер','Проверяем геометрию, уровни пола и условия монтажа.'],['03','Проектирование','Выбираем профиль, стекло, порог и монтажные узлы.'],['04','Производство','Изготавливаем конструкцию по согласованным размерам.'],['05','Доставка и монтаж','Организуем логистику, подъём стекла и профессиональную установку.'],['06','Настройка и сервис','Регулируем створки и передаём рекомендации по эксплуатации.']];return <><PageHero compact eyebrow="ПОЛНЫЙ ЦИКЛ" title="От проёма до готового портала" lead="Один процесс для проектирования, изготовления, доставки, монтажа и последующей настройки."/><section className="mp-section"><div className="mp-container"><div className="mp-process-grid">{steps.map(([n,t,d])=><article key={n}><b>{n}</b><h2>{t}</h2><p>{d}</p></article>)}</div><div className="mp-info-grid mp-top-gap"><article className="mp-card"><p className="mp-eyebrow">ПОЧЕМУ ЭТО ВАЖНО</p><h3>Большой портал зависит не только от профиля</h3><p>Даже дорогая система будет работать плохо, если основание прогибается, рама установлена с перекосом или вода не отводится от низкого порога.</p></article><article className="mp-card"><p className="mp-eyebrow">ОДНА ОТВЕТСТВЕННОСТЬ</p><h3>Не собираем проект из несвязанных подрядчиков</h3><p>Конструкция, стекло, доставка и монтаж должны быть согласованы между собой ещё до производства.</p></article></div></div></section><CTA/></>}

function AboutPage(){return <><PageHero compact eyebrow="О КОМПАНИИ" title="Подбираем решение под проект, а не проект под один профиль" lead="Наша задача — сравнить подходящие системы и собрать понятное решение по архитектуре, характеристикам и бюджету."/><section className="mp-section"><div className="mp-container"><div className="mp-split-title"><div><p className="mp-eyebrow">ПОЧЕМУ НАМ ДОВЕРЯЮТ</p><h2>Доверие строится на прозрачности проекта</h2></div><p>Для дорогого панорамного остекления недостаточно фразы «премиальное качество». Клиент должен понимать, что ему предлагают, за что он платит и кто отвечает за результат.</p></div><div className="mp-feature-grid">{[['01','Несколько вариантов','Показываем подходящие системы и объясняем разницу.'],['02','Понятная смета','Разделяем конструкцию, стекло, опции, доставку и монтаж.'],['03','Полный цикл','Один процесс от замера до настройки готового портала.'],['04','Инженерный подход','Учитываем порог, воду, основание и реальную геометрию проёма.']].map(([n,t,d])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}</div></div></section><CTA/></>}

function ContactsPage(){return <><PageHero compact eyebrow="КОНТАКТЫ" title="Обсудим ваш проём" lead="Можно начать с размеров, плана дома, визуализации или фотографии. Этого достаточно для первого подбора." image={images.interior}/><section className="mp-section"><div className="mp-container mp-contact-grid"><div><h2>Что прислать для предварительного расчёта</h2><ul className="mp-list"><li>ширину и высоту проёма</li><li>фото или визуализацию фасада</li><li>город / район объекта</li><li>желательную схему открывания</li></ul><p className="mp-note">Контактные данные в текущей версии демонстрационные и должны быть заменены перед публикацией.</p></div><form className="mp-form" onSubmit={e=>e.preventDefault()}><label>Имя<input placeholder="Как к вам обращаться"/></label><label>Телефон<input placeholder="+7 999 000-00-00" inputMode="tel"/></label><label>Комментарий<textarea placeholder="Например: проём 4 × 2,7 м, выход на террасу"/></label><button className="mp-button mp-button--dark">Получить консультацию →</button></form></div></section></>}

const articles={
 'chto-takoe-hs-portal':{title:'Что такое HS-портал и чем он отличается от обычной раздвижной двери',lead:'Простое объяснение механики, областей применения и ограничений.'},
 'nizkii-porog-hs-portala':{title:'Низкий порог HS-портала: что важно предусмотреть',lead:'Почему красивый переход в уровень пола начинается с основания и водоотвода.'},
 'kak-vybrat-profil-hs':{title:'Как выбрать профильную систему для HS-портала',lead:'Почему сравнивать системы только по бренду и цене за квадратный метр недостаточно.'},
}
function BlogPage(){return <><PageHero compact eyebrow="БЛОГ" title="Понятно о панорамных раздвижных системах" lead="Без перегруза терминами: ответы на вопросы, которые возникают до заказа HS-портала."/><section className="mp-section"><div className="mp-container"><div className="mp-blog-grid">{Object.entries(articles).map(([slug,a])=><a href={toUrl(`/blog/${slug}/`)} key={slug}><span>ГИД ПО HS</span><h2>{a.title}</h2><p>{a.lead}</p><small>Читать →</small></a>)}</div></div></section></>}
function ArticlePage({slug}){const a=articles[slug];if(!a)return <NotFound/>;return <><PageHero compact eyebrow="ГИД ПО HS" title={a.title} lead={a.lead}/><article className="mp-article"><p>HS-портал — это подъёмно-раздвижная конструкция для больших стеклянных проёмов. В отличие от простой раздвижки створка перед движением слегка приподнимается, поэтому уплотнения не мешают ходу, а тяжёлое полотно движется плавно.</p><h2>Что важно для реального проекта</h2><p>Выбор системы начинается не с бренда. Сначала определяют размер и схему проёма, требования к порогу, стеклопакету, теплоизоляции и внешнему виду. Затем проверяют, какие профильные системы допускают нужные размеры и массу створок.</p><h2>Почему монтаж так же важен, как профиль</h2><p>Большая конструкция требует стабильного основания, точной геометрии и продуманного отвода воды. Особенно это важно для низкого или скрытого порога.</p><div className="mp-note">Материал носит ознакомительный характер. Предельные размеры и характеристики всегда проверяются по документации конкретной системы и расчёту изделия.</div></article><CTA/></>}

function NotFound(){return <><section className="mp-empty"><div><span>404</span><h1>Страница не найдена</h1><p>Возможно, адрес изменился. Вернитесь на главную или откройте каталог HS-порталов.</p><a className="mp-button mp-button--dark" href={toUrl('/')}>На главную →</a></div></section></>}

export default function RouterApp(){
  const path=normalizePath()
  if(path==='/') return <><GlobalHeader home/><div className="home-route"><Home/></div></>
  let page
  if(path==='/hs-portaly/') page=<ProductPage/>
  else if(path==='/profilnye-sistemy/') page=<SystemsPage/>
  else if(path.startsWith('/profilnye-sistemy/')) page=<ProfilePage slug={path.split('/')[2]}/>
  else if(path==='/proekty/') page=<ProjectsPage/>
  else if(path==='/stoimost/') page=<PricePage/>
  else if(path==='/kalkulyator/') page=<CalculatorPage/>
  else if(path==='/montazh/') page=<InstallationPage/>
  else if(path==='/o-kompanii/') page=<AboutPage/>
  else if(path==='/kontakty/') page=<ContactsPage/>
  else if(path==='/blog/') page=<BlogPage/>
  else if(path.startsWith('/blog/')) page=<ArticlePage slug={path.split('/')[2]}/>
  else page=<NotFound/>
  return <div className="multipage-site"><GlobalHeader/>{page}<GlobalFooter/></div>
}
