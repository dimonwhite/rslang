import { blackGradient } from '@/constants';
import { getSvg } from '@/utils';
import promoPlanet from '@/assets/img/promoPlanet.png';
import promoBg from '@/assets/img/promoBg.jpg';

export default class PromoPageView {
  constructor() {
    this.main = document.querySelector('#main');
    this.vantages = [
      {
        svg: 'promoGame',
        title: 'Игры',
        desc: 'Изучая слова в процессе игры, забудешь о скуке!',
      },
      {
        svg: 'promoHour',
        title: 'Методика интервального повторения',
        desc: 'Мы используем одну из самых эффективных методик изучения слов. Попробуй и уже завтра удивишь бабулю у подъезда фразой - ‘How are you, Aleksnadra Petrovna?’',
      },
      {
        svg: 'promoSettings',
        title: 'Настрой под себя',
        desc: 'Hard or light? Определись с темпом.',
      },
      {
        svg: 'promoStatistic',
        title: 'Статистика',
        desc: 'Отслеживай и анализируй свой прогресс.',
      },
      {
        svg: 'promoSpeak',
        title: 'Произношение',
        desc: 'Слушай и тренируй свое произношение.',
      },
    ];
  }

  create() {
    document.body.classList.add('promoPage');
    document.body.style.backgroundImage = `${blackGradient}, url("${promoBg}")`;

    const vantagesHtml = this.vantages.reduce((html, item) => `${html}
        <div class="promoPage__vantages__item">
          ${getSvg(item.svg)}
          <div class="promoPage__vantages__item--text">
            <div class="promoPage__vantages__item--title">
              ${item.title}
            </div>
            <div class="promoPage__vantages__item--desc">
              ${item.desc}
            </div>
          </div>
        </div>
      `, '');

    this.main.innerHTML = `
      <div class="promoPage__title">
        Это твоя возможность <span class="upper">начать</span> <br>изучать английский язык
      </div>
      <img src="${promoPlanet}" alt="Планета" class="promoPage__planet">
      <video class="promoPage__video" src="//dimonwhite.ru/promovideo.mp4" controls preload></video>
      <div class="promoPage__desc">
        Игровое приложение, которое поможет вам в изучении  английского языка.  В основу приложения заложен  принцип интервального
        повторения на основе известной методики Лейтнера. Слова, которые вы успешно выучили, переходят на следующий уровень повторения, при каждом 
        правильном повторении уровень увеличивается, а с ним увеличивается и интервал следующего повторения. При допущенной ошибке
        прогресс изучения  слова обнуляется и весь процесс для него начинается заново. Алгоритм повторения такой: первый раз успешно выученное вами 
        слово будет повторяться на следующий день, затем ещё раз на следующий день, далее интервал повторения будет каждый раз удваиваться. Если допустите ошибку, 
        то данный алгоритм будет повторяться заново, что гарантирует достижение результата в изучении. Также пользователь может сам выбрать интервал повторения в зависимости от сложности слова 
        нажатием кнопок: "Снова", "Трудно", "Хорошо", "Легко"; в этом случае слова будут повторяться: на текущей тренировке, через 3 дня, через 11 дней, через 27 дней соответственно.
        <br><br>Для закрепления изученных слов и изучения новых, присутствует 
        6 различных красочных игр, в которых вам предстоит проверить себя в  написании, аудировании и произношении английских слов. Это поможет сделать обучение 
        английскому языку весёлым и захватывающим.
      </div>
      <div class="promoPage__vantages">
        ${vantagesHtml}
      </div>
    `;
  }
}
