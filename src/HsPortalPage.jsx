import { useEffect, useMemo, useState } from 'react'
import './hs-portal.css'

const BASE = import.meta.env.BASE_URL
const toUrl = (path = '/') => path === '/' ? BASE : `${BASE}${path.replace(/^\//, '')}`
const formatPrice = (value) => new Intl.NumberFormat('ru-RU').format(value)

const IMG = {
  hero: 'https://images.unsplash.com/photo-1772311291041-9e5385477579?auto=format&fit=crop&w=2400&q=88',
  interior: 'https://images.unsplash.com/photo-1764837599929-100bd5890c57?auto=format&fit=crop&w=1800&q=88',
  forest: 'https://images.unsplash.com/photo-1568707126892-99e6470ce9bf?auto=format&fit=crop&w=1800&q=88',
  projectA: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=86',
  projectB: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=86',
  projectC: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=86',
}

const projectCards = [
  { place: 'Николино', title: 'Панорамный портал в гостиную', size: '5 200 × 2 700 мм', system: 'Schüco', budget: 'от 1 480 000 ₽', image: IMG.projectA },
  { place: 'Истра', title: 'HS-портал с выходом на террасу', size: '6 000 × 2 800 мм', system: 'Reynaers', budget: 'от 1 960 000 ₽', image: IMG.projectB },
  { place: 'Рублёво-Успенское', title: 'Раздвижная система в сад', size: '4 500 × 2 600 мм', system: 'ALUTECH', budget: 'от 1 230 000 ₽', image: IMG.projectC },
]

function LineIcon({ type }) {
  const icons = {
    diamond: <><path d="M3 9 7 4h10l4 5-9 11L3 9Z"/><path d="m7 4 5 16 5-16M3 9h18"/></>,
    home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>,
    shield: <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z"/>,
    leaf: <><path d="M20 4C12 4 6 7 5 13c-.5 3 2 6 5 5 6-1 9-7 10-14Z"/><path d="M5 20c2-5 6-8 11-11"/></>,
    people: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20c.4-4 2.6-6 6-6s5.6 2 6 6M14 15c3 0 5 1.8 5 5"/></>,
    heart: <path d="M20 8c0 6-8 11-8 11S4 14 4 8c0-4 5-5 8-1 3-4 8-3 8 1Z"/>,
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true">{icons[type] || icons.shield}</svg>
}

function Header() {
  const [open, setOpen] = useState(false)
  const nav = [
    ['Продукция', '/profilnye-sistemy/'],
    ['Проекты', '/proekty/'],
    ['О компании', '/o-kompanii/'],
    ['Как мы работаем', '/montazh/'],
    ['Блог', '/blog/'],
    ['Контакты', '/kontakty/'],
  ]
  return <header className="hs-header">
    <a href={toUrl('/')} className="hs-brand" aria-label="NORD — главная"><strong>NORD</strong><span>панорамные решения</span></a>
    <nav className={open ? 'hs-nav is-open' : 'hs-nav'} aria-label="Основная навигация">
      {nav.map(([label, href]) => <a href={toUrl(href)} key={href} onClick={() => setOpen(false)}>{label}</a>)}
    </nav>
    <div className="hs-header__right"><a className="hs-phone" href="tel:+74951234567">+7 (495) 123-45-67<small>Ежедневно с 9:00 до 21:00</small></a><a className="hs-btn hs-btn--dark hs-header__cta" href={toUrl('/kontakty/')}>Получить консультацию →</a></div>
    <button className="hs-menu" type="button" aria-label="Открыть меню" aria-expanded={open} onClick={() => setOpen(!open)}><span/><span/></button>
  </header>
}

function Hero() {
  return <>
    <section className="hs-hero">
      <img src={IMG.hero} alt="Современный загородный дом с панорамным HS-порталом" fetchPriority="high" />
      <div className="hs-hero__veil"/>
      <div className="hs-shell hs-hero__content">
        <p className="hs-kicker">АЛЮМИНИЕВЫЕ HS-ПОРТАЛЫ</p>
        <h1>Пространство<br/>без лишних границ</h1>
        <p className="hs-hero__lead">Панорамные алюминиевые HS-порталы для вашего дома и террасы в Москве и Московской области.</p>
        <div className="hs-actions"><a className="hs-btn hs-btn--dark" href="#calculator">Рассчитать стоимость →</a><a className="hs-btn hs-btn--light" href="#projects">Смотреть проекты</a></div>
      </div>
      <div className="hs-hero__caption">Гармония дома<br/>и природы <span>→</span></div>
    </section>
    <div className="hs-benefit-strip">
      <div className="hs-shell hs-benefit-strip__grid">
        <span><LineIcon type="diamond"/><b>Премиальные<br/>европейские системы</b></span>
        <span><LineIcon type="home"/><b>Идеально для дома<br/>и террасы в Москве и МО</b></span>
        <span><LineIcon type="shield"/><b>Профессиональный монтаж<br/>с гарантией</b></span>
        <span><LineIcon type="leaf"/><b>Больше света,<br/>больше жизни</b></span>
      </div>
    </div>
  </>
}

function ProductIntro() {
  const [tab, setTab] = useState('how')
  const tabs = [
    ['how', 'Как это работает'],
    ['construction', 'Конструкция'],
    ['where', 'Где используется'],
    ['systems', 'Профильные системы'],
  ]

  const content = {
    how: <div className="hs-tab-content hs-tab-content--steps">
      <article><b>01</b><div className="hs-mech-icon hs-mech-icon--handle"><i/></div><h3>Поверните ручку</h3><p>Ручка переводит створку в режим подъёма.</p></article>
      <article><b>02</b><div className="hs-mech-icon hs-mech-icon--lift"><i/></div><h3>Створка приподнимается</h3><p>Механизм освобождает створку от прижима к уплотнениям.</p></article>
      <article><b>03</b><div className="hs-mech-icon hs-mech-icon--slide"><i/></div><h3>Створка плавно сдвигается</h3><p>Полотно легко уходит в сторону по направляющей.</p></article>
      <aside className="hs-system-list"><small>Ведущие профильные системы</small><a href={toUrl('/profilnye-sistemy/schueco-ase-80-hi/')}><strong>SCHÜCO</strong><span>Для крупных проёмов</span></a><a href={toUrl('/profilnye-sistemy/reynaers-masterpatio/')}><strong>REYNAERS</strong><span>Большие створки</span></a><a href={toUrl('/profilnye-sistemy/aluprof-mb-77hs/')}><strong>ALUPROF</strong><span>Баланс характеристик</span></a><a href={toUrl('/profilnye-sistemy/alutech-alt-sl160/')}><strong>ALUTECH</strong><span>Рациональное решение</span></a></aside>
    </div>,
    construction: <div className="hs-tab-copy"><h3>Тёплый алюминий, стеклопакет и точная геометрия</h3><p>Профиль состоит из внутренней и наружной алюминиевой части с терморазрывом. Для жилых помещений подбираем энергоэффективный стеклопакет, безопасное стекло и фурнитуру под фактический вес створки.</p><div className="hs-tab-metrics"><span><b>до 600 кг</b>вес створки*</span><span><b>до 3,6 м</b>высота*</span><span><b>50+ мм</b>толщина заполнения*</span></div><small>*Предельные значения зависят от выбранной системы и расчёта конкретного изделия.</small></div>,
    where: <div className="hs-use-grid">{['Загородный дом','Выход на террасу','Кухня и гостиная','Бассейн / SPA'].map((item, index) => <article key={item}><b>0{index + 1}</b><h3>{item}</h3><p>{index === 0 ? 'Панорамные проёмы в современных коттеджах.' : index === 1 ? 'Широкий переход без распашной двери.' : index === 2 ? 'Больше света и визуально больше пространства.' : 'Остекление зон отдыха и зимних садов.'}</p></article>)}</div>,
    systems: <div className="hs-systems-tab">{[
      ['Schüco','ASE 80.HI','до 500 кг'],['Reynaers','MasterPatio','до 600 кг'],['Aluprof','MB-77HS','до 400 кг'],['ALUTECH','ALT SL160','до 440 кг'],
    ].map(([brand, model, weight]) => <article key={brand}><strong>{brand}</strong><span>{model}</span><b>{weight}</b></article>)}</div>,
  }

  return <section className="hs-product" id="about">
    <div className="hs-product__visual"><img src={IMG.interior} alt="Панорамный HS-портал в интерьере загородного дома" loading="lazy" /></div>
    <div className="hs-product__content">
      <p className="hs-kicker">О HS-ПОРТАЛАХ</p>
      <h2>Больше, чем просто окна</h2>
      <p className="hs-product__lead">HS-порталы — это раздвижные алюминиевые конструкции большого формата, которые объединяют интерьер с природой. Они дают максимум света, визуально расширяют пространство и обеспечивают комфорт в любое время года.</p>
      <div className="hs-tabs" role="tablist">{tabs.map(([value, label]) => <button key={value} type="button" className={tab === value ? 'is-active' : ''} onClick={() => setTab(value)} role="tab" aria-selected={tab === value}>{label}</button>)}</div>
      {content[tab]}
    </div>
  </section>
}

function Process() {
  const steps = [
    ['01','Консультация и замер'],['02','Проектирование и подбор решения'],['03','Производство под ваш проект'],['04','Доставка и профессиональный монтаж'],['05','Гарантия и сервисное обслуживание'],
  ]
  return <section className="hs-process" id="process"><div className="hs-shell"><div className="hs-process__heading"><h2>Полный цикл под ваш проект</h2><p>Берём на себя все этапы — от консультации до сервисного обслуживания.</p><a href={toUrl('/montazh/')}>Узнать подробнее →</a></div><div className="hs-process__steps">{steps.map(([num, title]) => <article key={num}><b>{num}</b><span>{title}</span></article>)}</div></div></section>
}

function Calculator() {
  const [width, setWidth] = useState(4000)
  const [height, setHeight] = useState(2700)
  const [scheme, setScheme] = useState(2)
  const [tier, setTier] = useState('comfort')
  const area = useMemo(() => width * height / 1_000_000, [width, height])
  const rate = { base: 75000, comfort: 95000, premium: 120000 }[tier]
  const factor = { 2: 1, 3: 1.07, 4: 1.12 }[scheme]
  const total = Math.round(area * rate * factor / 10000) * 10000
  const tierName = { base: 'Стандарт', comfort: 'Комфорт', premium: 'Премиум' }[tier]

  return <section className="hs-calc-section" id="calculator"><div className="hs-shell">
    <div className="hs-calc-title"><div><p className="hs-kicker">РАССЧИТАЙТЕ ВАШ HS-ПОРТАЛ</p><h2>Простой расчёт за 2 минуты</h2></div><p>Узнайте ориентировочную стоимость вашего проекта. Точная смета — после замера.</p></div>
    <div className="hs-calculator">
      <figure className="hs-calculator__image"><img src={IMG.forest} alt="Панорамный портал для загородного дома" loading="lazy"/><figcaption>Современная классика<br/>для загородной жизни</figcaption></figure>
      <div className="hs-calculator__fields">
        <fieldset><legend>1. Размеры проёма</legend><label><span>Ширина, мм</span><output>{width}</output><input type="range" min="2500" max="8000" step="100" value={width} onChange={e => setWidth(Number(e.target.value))}/><small><i>2500</i><i>8000</i></small></label><label><span>Высота, мм</span><output>{height}</output><input type="range" min="2200" max="3500" step="50" value={height} onChange={e => setHeight(Number(e.target.value))}/><small><i>2200</i><i>3500</i></small></label></fieldset>
        <fieldset><legend>2. Схема открывания</legend><div className="hs-choice-row">{[2,3,4].map(n => <button type="button" key={n} className={scheme === n ? 'is-active' : ''} onClick={() => setScheme(n)}><span className={`hs-scheme hs-scheme--${n}`}/><b>{n} секции</b></button>)}</div></fieldset>
        <fieldset><legend>3. Комплектация</legend><div className="hs-choice-row hs-choice-row--tiers">{[['base','Стандарт','от 75 000 ₽/м²'],['comfort','Комфорт','от 95 000 ₽/м²'],['premium','Премиум','от 120 000 ₽/м²']].map(([value, title, price]) => <button type="button" key={value} className={tier === value ? 'is-active' : ''} onClick={() => setTier(value)}><b>{title}</b><small>{price}</small></button>)}</div></fieldset>
      </div>
      <aside className="hs-calculator__summary"><p>Ваш расчёт</p><dl><div><dt>Размер</dt><dd>{width} × {height} мм</dd></div><div><dt>Площадь</dt><dd>{area.toFixed(1).replace('.', ',')} м²</dd></div><div><dt>Схема</dt><dd>{scheme} секции</dd></div><div><dt>Комплектация</dt><dd>{tierName}</dd></div></dl><span>Ориентировочная стоимость</span><strong>от {formatPrice(total)} ₽</strong><small>В стоимость ориентировочно входят профиль, стеклопакет, фурнитура, изготовление, доставка и монтаж. Итог зависит от объекта.</small><a className="hs-btn hs-btn--dark hs-btn--full" href={toUrl('/kontakty/')}>Получить точную смету →</a><button className="hs-btn hs-btn--outline hs-btn--full" type="button" onClick={() => window.print()}>Сохранить расчёт в PDF</button></aside>
    </div>
  </div></section>
}

function Projects() {
  return <section className="hs-projects" id="projects"><div className="hs-shell"><div className="hs-section-head"><div><p className="hs-kicker">РЕАЛИЗОВАННЫЕ ПРОЕКТЫ</p><h2>Наши проекты</h2></div><a href={toUrl('/proekty/')}>Смотреть все проекты →</a></div><div className="hs-project-grid">{projectCards.map((project) => <article className="hs-project-card" key={project.title}><div className="hs-project-card__image"><img src={project.image} alt={project.title} loading="lazy"/><span>{project.place}</span></div><div className="hs-project-card__body"><h3>{project.title}</h3><p>Московская область</p><div><span>{project.size}</span><span>{project.system}</span><span>2 створки</span></div><strong>{project.budget}</strong><a href={toUrl('/kontakty/')} aria-label={`Обсудить проект ${project.title}`}>→</a></div></article>)}</div></div></section>
}

function TrustAndFaq() {
  const [open, setOpen] = useState(0)
  const faq = [
    ['Подходит ли HS-портал для нашего климата?','Да, для жилых объектов используются тёплые алюминиевые системы и энергоэффективные стеклопакеты. Конкретная конфигурация подбирается по проекту.'],
    ['Сколько занимает изготовление и монтаж?','Срок зависит от профиля, стеклопакета, окраски и сложности монтажа. Точный график фиксируется после замера и согласования комплектации.'],
    ['Можно ли установить портал в готовый проём?','Да, если геометрия и несущая часть проёма позволяют корректно установить конструкцию. Перед заказом обязательно выполняется инженерный замер.'],
    ['Что входит в стоимость?','Профильная система, стеклопакет, фурнитура и производство. Доставка, монтаж и дополнительные опции уточняются в смете конкретного объекта.'],
    ['Какое остекление лучше выбрать?','Зависит от стороны света, размера стекла, требований к теплу, солнцезащите, безопасности и шумоизоляции.'],
  ]
  const trust = [
    ['diamond','Честные цены и прозрачные сметы','Фиксируем состав решения до старта работ.'],
    ['people','Опыт и экспертиза','Проектируем большие панорамные конструкции.'],
    ['shield','Профессиональный монтаж','Монтажный узел так же важен, как сам профиль.'],
    ['heart','Гарантия и поддержка','Регулировка и сервис после установки.'],
  ]
  return <>
    <section className="hs-trust"><div className="hs-shell"><h2>Почему нам доверяют</h2><div className="hs-trust__grid">{trust.map(([icon,title,text]) => <article key={title}><LineIcon type={icon}/><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
    <section className="hs-bottom"><div className="hs-shell hs-bottom__grid"><div className="hs-faq"><h2>Частые вопросы</h2>{faq.map(([q,a],index) => <article key={q} className={open === index ? 'is-open' : ''}><button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}><span>{q}</span><b>{open === index ? '−' : '+'}</b></button><div><p>{a}</p></div></article>)}</div><div className="hs-consult"><img src={IMG.interior} alt="Панорамный портал с видом на участок" loading="lazy"/><div className="hs-consult__overlay"><p className="hs-kicker">КОНСУЛЬТАЦИЯ</p><h2>Обсудим ваш проект?</h2><p>Поможем подобрать оптимальное решение, рассчитаем стоимость и ответим на вопросы.</p><div><a className="hs-btn hs-btn--dark" href={toUrl('/kontakty/')}>Оставить заявку →</a><a className="hs-btn hs-btn--light" href="https://wa.me/74951234567">Написать в WhatsApp</a></div></div></div></div></section>
  </>
}

function Footer() {
  return <footer className="hs-footer"><div className="hs-shell hs-footer__grid"><a href={toUrl('/')} className="hs-brand"><strong>NORD</strong><span>панорамные решения</span></a><nav><a href={toUrl('/profilnye-sistemy/')}>Продукция</a><a href={toUrl('/proekty/')}>Проекты</a><a href={toUrl('/o-kompanii/')}>О компании</a><a href={toUrl('/blog/')}>Блог</a><a href={toUrl('/kontakty/')}>Контакты</a></nav><div className="hs-footer__contact"><a href="tel:+74951234567">+7 (495) 123-45-67</a><small>Ежедневно с 9:00 до 21:00</small></div><a className="hs-btn hs-btn--dark" href={toUrl('/kontakty/')}>Получить консультацию →</a></div><div className="hs-shell hs-footer__legal"><span>© 2026 NORD. Панорамные решения для современной архитектуры.</span><a href="#">Политика конфиденциальности</a></div></footer>
}

export default function HsPortalPage() {
  useEffect(() => {
    document.title = 'Алюминиевые HS-порталы под ключ в Москве и МО | NORD'
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', 'Панорамные алюминиевые HS-порталы для дома и террасы. Понятное объяснение конструкции, профильные системы, калькулятор стоимости, проекты и монтаж под ключ.')
  }, [])
  return <div className="hs-page"><Header/><main><Hero/><ProductIntro/><Process/><Calculator/><Projects/><TrustAndFaq/></main><Footer/></div>
}
