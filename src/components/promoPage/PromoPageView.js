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
      <div class="promoPage__vantages">
        ${vantagesHtml}
      </div>
    `;
  }
}
