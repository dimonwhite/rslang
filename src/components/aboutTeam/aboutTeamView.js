import { createElement } from '../../utils';
import starShip from '../../assets/img/aboutTeam/starship.png';
import helmet from '../../assets/img/aboutTeam/helmet.png';
import personal from '../../data/personal';

export default class AboutTeamView {
  constructor() {
    this.root = document.querySelector('.main');
  }

  renderMainLayout() {
    const introText = `Приветствуем тебя на борту научно-развлекательного лингвистического круизного звездолета "<span class="span_yellow">po</span><span class="span_red">BEDA</span>"! <br>
    У нас ты сможешь приятно провести время, подтянуть <strike class="clingon">клингонский</strike> английский язык и увидеть неизведанные уголки галактики. <br>
    А сейчас самое время познакомиться с командой нашего звездолета!`;
    document.body.style.backgroundImage = 'none';
    this.root.innerHTML = `
    <div class="about__container">
    <div id='stars'></div>
    <div id='stars2'></div>
    <div id='stars3'></div>
    <header class="about__header">
      <h1 class="about__title anaglyph">О команде</h1>
      <div class="about__title__image"><img class="starship-image" src=${starShip}></div>
      <h3 class="about__subtitle">
      ${introText}
      </h3>
    </header>
    <section class="about__info">
      <div class="about__info__wrapper"></div>
    </section>
    <a href="#/games" class="btn btn__exit">Выход</a>
    `;
    this.info = this.root.querySelector('.about__info__wrapper');
  }

  createCard(data) {
    this.card = createElement({ tag: 'div', class: 'about__card' });
    this.card.innerHTML = `
    <div class="about__card__image">
      <div class="image__wrapper">
        <img class="photo helmet" src=${helmet} alt="avatar image">
        <img class="photo portrait" src=${data.photo} alt="avatar image">
      </div>
    </div>
    <div class="about__card__info">
    <div class="about__card__title">${data.name}</div>
    <div class="about__card__position">${data.position}</div>
    <div class="about__card__cv">${data.cv}</div>
    <div class="about__card__fund">Вклад в проект: ${data.fund}</div>
    </div>
    `;
  }

  appendCards() {
    personal.forEach((el) => {
      this.createCard(el);
      this.info.append(this.card);
    });
  }

  init() {
    this.renderMainLayout();
    this.appendCards();
  }
}
