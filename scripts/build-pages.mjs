import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const root = new URL('../', import.meta.url).pathname
const dist = join(root, 'dist')
const source = await readFile(join(dist, 'index.html'), 'utf8')
const origin = 'https://kssafonova.github.io/gdetotaknado'

const routes = [
  ['/hs-portaly/', 'Алюминиевые HS-порталы для дома и террасы | NORD', 'Что такое HS-портал, как он открывается, где применяется, какой бывает порог и какие профильные системы подходят для больших проёмов.'],
  ['/profilnye-sistemy/', 'Профильные системы для HS-порталов | NORD', 'Сравнение Schüco, Reynaers, Aluprof и ALUTECH для панорамных подъёмно-раздвижных порталов.'],
  ['/profilnye-sistemy/schueco-ase-80-hi/', 'Schüco ASE 80.HI — HS-порталы | NORD', 'Schüco ASE 80.HI для больших панорамных проёмов: возможности системы, применение и проектирование под частный дом.'],
  ['/profilnye-sistemy/reynaers-masterpatio/', 'Reynaers MasterPatio — HS-порталы | NORD', 'Reynaers MasterPatio для крупных подъёмно-раздвижных створок и современной загородной архитектуры.'],
  ['/profilnye-sistemy/aluprof-mb-77hs/', 'Aluprof MB-77HS — HS-порталы | NORD', 'Aluprof MB-77HS: тёплая алюминиевая подъёмно-раздвижная система для частных домов и террас.'],
  ['/profilnye-sistemy/alutech-alt-sl160/', 'ALUTECH ALT SL160 — HS-порталы | NORD', 'ALUTECH ALT SL160 для больших панорамных проёмов: применение, возможности и подбор под проект.'],
  ['/proekty/', 'Проекты панорамных HS-порталов | NORD', 'Примеры панорамных HS-порталов для домов в Москве и Московской области: размеры, профильные системы и ориентиры бюджета.'],
  ['/stoimost/', 'Стоимость HS-портала — цены и факторы расчёта | NORD', 'От чего зависит стоимость алюминиевого HS-портала: площадь, схема открывания, профиль, стеклопакет, порог и монтаж.'],
  ['/kalkulyator/', 'Калькулятор стоимости HS-портала | NORD', 'Предварительный расчёт стоимости алюминиевого HS-портала по ширине, высоте, схеме открывания и уровню комплектации.'],
  ['/montazh/', 'Производство и монтаж HS-порталов под ключ | NORD', 'Полный цикл проекта HS-портала: консультация, инженерный замер, проектирование, производство, доставка, монтаж и сервис.'],
  ['/o-kompanii/', 'О компании NORD — панорамные решения', 'Подход к проектированию алюминиевых HS-порталов: сравнение систем, понятная смета и полный цикл работ.'],
  ['/kontakty/', 'Контакты NORD — расчёт HS-портала', 'Отправьте размеры проёма, план или фотографию для предварительного подбора и расчёта HS-портала.'],
  ['/blog/', 'Блог об HS-порталах и панорамном остеклении | NORD', 'Понятные материалы о HS-порталах, низких порогах, профильных системах и проектировании больших проёмов.'],
  ['/blog/chto-takoe-hs-portal/', 'Что такое HS-портал: простое объяснение | NORD', 'Как работает подъёмно-раздвижной HS-портал и чем отличается от обычной раздвижной двери.'],
  ['/blog/nizkii-porog-hs-portala/', 'Низкий порог HS-портала: что предусмотреть | NORD', 'Как сделать аккуратный низкий порог HS-портала и почему важно заранее спроектировать основание и водоотвод.'],
  ['/blog/kak-vybrat-profil-hs/', 'Как выбрать профиль для HS-портала | NORD', 'Как сравнивать Schüco, Reynaers, Aluprof и ALUTECH для конкретного панорамного проёма.'],
]

const escape = (value) => value.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')

for (const [route, title, description] of routes) {
  const canonical = `${origin}${route}`
  let html = source
    .replace(/<title>.*?<\/title>/s, `<title>${escape(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escape(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escape(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
  const file = join(dist, route.replace(/^\//,''), 'index.html')
  await mkdir(dirname(file), { recursive:true })
  await writeFile(file, html)
}

await copyFile(join(dist,'index.html'), join(dist,'404.html'))
console.log(`Generated ${routes.length} clean URL pages`)
