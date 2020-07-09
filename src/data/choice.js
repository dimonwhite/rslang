const choice = {
  ru: {
    j: [
      ['абсолютный', 'абсурдный', 'активный', 'авантюрный', 'аварийный', 'автобусный', 'автоматный', 'автономный', 'авторский', 'агатовый', 'агентурный', 'аграрный', 'адекватный', 'алый', 'адресный'],
      ['баварский', 'багажный', 'багдадский', 'багровый', 'базарный', 'базисный', 'базовый', 'байковый', 'балетный', 'балканский', 'балконный', 'балтийский'],
      ['вагонный', 'важный', 'вакантный', 'вакуумный', 'валовый', 'вальяжный', 'валютный', 'ванный', 'варварский', 'вареный', 'варикозный', 'ватный', 'ваучерный', 'вафельный', 'вахтенный'],
      ['гавайский', 'гадкий', 'гаечный', 'газетный', 'газовый', 'галантный', 'гаубичный', 'гениальный', 'генный', 'гербовый', 'германский', 'геройский', 'гибельный', 'гибкий', 'гиблый'],
      ['давешний', 'давний', 'давнишний', 'давящий', 'далекий', 'дальний', 'дамский', 'данный', 'дареный', 'дармовой', 'даровой', 'датский', 'дачный', 'дверной', 'движимый'],
      ['еврейский', 'египетский', 'единичный', 'единый', 'едкий', 'ежегодный', 'ежедневный', 'ежовый', 'ездовой', 'елейный', 'еловый', 'елочный', 'емкий', 'ерундовый', 'ершовый'],
      ['жадный', 'жалкий', 'жалобный', 'жареный', 'жаркий', 'жгучий', 'желанный', 'железистый', 'железный', 'желтенький', 'желтоватый', 'желторотый', 'желтушный', 'желтый', 'желудочный'],
      ['забавный', 'забитый', 'заблудший', 'заботливый', 'забытый', 'заведомый', 'заветный', 'завидный', 'зависимый', 'завитой', 'заводной', 'заводский', 'заводской', 'заволжский', 'завтрашний'],
      ['ивовый', 'игольчатый', 'игорный', 'игральный', 'игривый', 'игровой', 'игрушечный', 'идеальный', 'идейный', 'идентичный', 'идиотский', 'иезуитский', 'избитый', 'избранный', 'избыточный'],
      ['кабельный', 'кабинетный', 'каверзный', 'кавказский', 'кадетский', 'кадмиевый', 'кадровый', 'кажущийся', 'казанский', 'казахский', 'казацкий', 'казачий', 'казенный', 'каковой', 'каленый'],
      ['лавинный', 'лавровый', 'лаврский', 'лагерный', 'ладный', 'лазерный', 'лазоревый', 'лазурный', 'лайковый', 'лакейский', 'лаковый', 'лакомый', 'лаконичный', 'ламповый', 'ласковый'],
      ['магазинный', 'магический', 'магнитный', 'мажорный', 'мазутный', 'макаронный', 'маковый', 'малый', 'маленький', 'малиновый', 'маловатый', 'малоимущий', 'малолетний', 'малорослый', 'мамаев'],
      ['набитый', 'набожный', 'наболевший', 'наборный', 'наваристый', 'навесной', 'наводящий', 'навозный', 'навязчивый', 'нагловатый', 'наглый', 'наглядный', 'нагой', 'наградной', 'нагрудный'],
      ['обвальный', 'обветшалый', 'обвислый', 'обгорелый', 'обдуманный', 'обеденный', 'обезьяний', 'обжитой', 'обзорный', 'обидный', 'обидчивый', 'обиженный', 'обильный', 'обитаемый', 'областной'],
      ['павлиний', 'павший', 'пагубный', 'падкий', 'падучий', 'падший', 'пакостный', 'паленый', 'палубный', 'палый', 'пальмовый', 'палящий', 'памятный', 'панельный', 'панический'],
      ['работящий', 'рабочий', 'рабский', 'равный', 'радиальный', 'радоновый', 'радостный', 'радужный', 'радушный', 'разбитной', 'разбитый', 'разбойный', 'разверстый', 'развеселый', 'развитый'],
      ['саблезубый', 'садистский', 'садовый', 'салонный', 'сальный', 'самобытный', 'самоварный', 'самолетный', 'самоходный', 'санаторный', 'санитарный', 'санный', 'сановный', 'саперный', 'сапожный'],
      ['табачный', 'таджикский', 'таежный', 'тазовый', 'тайный', 'тайский', 'тактичный', 'талый', 'таможенный', 'тамошний', 'танковый', 'танцующий', 'татарский', 'твердый', 'твидовый'],
      ['убежденный', 'убиенный', 'убитый', 'убогий', 'убойный', 'уборочный', 'убыточный', 'уважаемый', 'уверенный', 'увесистый', 'увечный', 'увядший', 'угарный', 'углекислый', 'угловатый'],
      ['фабричный', 'фальшивый', 'фамильный', 'фанатичный', 'фанерный', 'фараонов', 'фарфоровый', 'фатальный', 'фашистский', 'фаянсовый', 'феодальный', 'фермерский', 'фетровый', 'фиброзный', 'фиговый'],
      ['холодный', 'хамелеон', 'хамский', 'хаотичный', 'хвалебный', 'хваленый', 'хвастливый', 'хваткий', 'хвойный', 'хворый', 'хвостатый', 'хвостовой', 'хилый', 'химический', 'хиппи'],
      ['царский', 'цветастый', 'цветистый', 'цветной', 'цветовой', 'цветочный', 'цветущий', 'целебный', 'целевой', 'целинный', 'целостный', 'целый', 'цельный', 'цементный', 'цензурный'],
      ['чайный', 'чарующий', 'часовой', 'частичный', 'частный', 'частый', 'чахлый', 'чахоточный', 'чванливый', 'чеканный', 'чекистский', 'чековый', 'человечий', 'человечный', 'червивый'],
      ['шалый', 'шальной', 'шампанский', 'шариковый', 'шаровой', 'шаткий', 'шахматный', 'шахтерский', 'шахтный', 'шашлычный', 'шведский', 'швейный', 'шейный', 'шелковый', 'шелудивый'],
      ['щедрый', 'щекотливый', 'щелочной', 'щелястый', 'щенячий', 'щербатый', 'щетинистый', 'щитовидный', 'щупленький'],
      ['эбонитовый', 'экономный', 'экспертный', 'экспортный', 'экстренный', 'эластичный', 'элегантный', 'элитарный', 'элитный', 'эллинский', 'энергичный', 'энный', 'эпический', 'эпохальный', 'эстонский'],
      ['яблоневый', 'яблочный', 'явный', 'явочный', 'явственный', 'ягодный', 'ядерный', 'ядовитый', 'ядреный', 'язвенный', 'языковой', 'языческий', 'яичный', 'якутский', 'яловый'],
    ],
    r: [
      ['абсолютно', 'адекватно', 'азартно', 'аккуратно', 'активно'],
      ['бдительно', 'бегло', 'бедно', 'безбожно', 'безвинно', 'бездарно', 'бездумно', 'беззаботно', 'беззвучно', 'безмерно', 'безмолвно', 'безобразно', 'безопасно', 'безумно', 'безупречно'],
      ['важно', 'вальяжно', 'вброд', 'вверх', 'вверху', 'вволю', 'ввысь', 'вглубь', 'вдалеке', 'вдали', 'вдаль', 'вдвое', 'вдвоем', 'вдвойне', 'вдобавок'],
      ['гадко', 'галантно', 'гениально', 'героически', 'геройски', 'гибко', 'гладко', 'глубоко', 'глупо', 'глухо', 'глуховато', 'гневно', 'гнусно', 'голодно', 'гораздо'],
      ['давеча', 'давненько', 'давно', 'далее', 'далеко', 'далековато', 'двадцатью', 'дважды', 'деланно', 'деликатно', 'дерзко', 'десятью', 'детально', 'детски', 'дешево'],
      ['единодушно', 'единожды', 'единолично', 'ежегодно', 'ежедневно', 'ежемесячно', 'ежечасно', 'ехидно'],
      ['жадно', 'жалко', 'жалобно', 'жарко', 'железно', 'желчно', 'женски', 'жестко', 'жестоко', 'живописно', 'живьем', 'жизненно', 'жирно', 'жутко', 'жутковато'],
      ['забавно', 'заботливо', 'заведомо', 'завсегда', 'завтра', 'загадочно', 'загодя', 'задарма', 'задаром', 'задолго', 'задорно', 'задумчиво', 'задушевно', 'заживо', 'законно'],
      ['играючи', 'игриво', 'идеально', 'идейно', 'идиотски', 'извне', 'издавна', 'издалека', 'издали', 'издревле', 'изначально', 'изнутри', 'изредка', 'изрядно', 'изумленно'],
      ['каменно', 'капризно', 'картинно', 'кверху', 'кисло', 'кишмя', 'классно', 'книзу', 'коварно', 'комфортно', 'конкретно', 'коротко', 'корректно', 'крадучись', 'крайне'],
      ['лаконично', 'ласково', 'легально', 'легко', 'легонько', 'лениво', 'лестно', 'ловко', 'логически', 'логично', 'ложно', 'лукаво', 'любезно', 'любовно', 'любопытно'],
      ['маленько', 'маловато', 'мастерски', 'мгновенно', 'медленно', 'мелко', 'мелодично', 'мельком', 'менее', 'мерзко', 'мерно', 'мертвенно', 'метко', 'методично', 'мимолетно'],
      ['не ахти', 'на бис', 'набекрень', 'набок', 'навек', 'навеки', 'наверняка', 'наверх', 'наверху', 'навеселе', 'навечно', 'навзничь', 'навзрыд', 'навсегда', 'навстречу'],
      ['обалдело', 'обидно', 'обиженно', 'обильно', 'облегченно', 'ободряюще', 'образно', 'обратно', 'обреченно', 'объективно', 'обыденно', 'обычно', 'огорченно', 'одинаково', 'одиноко'],
      ['по-божески', 'панически', 'паршиво', 'пестро', 'печально', 'пешком', 'письменно', 'плавно', 'пламенно', 'планомерно', 'плачевно', 'плашмя', 'плоско', 'плотно', 'плохо'],
      ['равнодушно', 'равномерно', 'радикально', 'радостно', 'радушно', 'развязно', 'раздельно', 'разумно', 'ранее', 'рановато', 'рассеянно', 'растерянно', 'реально', 'ревниво', 'регулярно'],
      ['самолично', 'сбоку', 'свежо', 'светло', 'свирепо', 'свободно', 'свойски', 'свысока', 'связно', 'сгоряча', 'сдавленно', 'сдержанно', 'сдуру', 'сегодня', 'сейчас'],
      ['тайком', 'тайно', 'тактично', 'талантливо', 'творчески', 'театрально', 'теперь', 'терпеливо', 'терпимо', 'тесно', 'технически', 'типично', 'тихонечко', 'тихонько', 'тогда'],
      ['убежденно', 'убито', 'убого', 'уверенно', 'угнетающе', 'угрюмо', 'удачно', 'удивленно', 'удобно', 'удрученно', 'ужасно', 'уклончиво', 'украдкой', 'умело', 'умеренно'],
      ['фактически', 'фальшиво', 'фатально', 'физически', 'формально'],
      ['хамски', 'хаотично', 'характерно', 'хитро', 'хищно', 'хлестко', 'хлопотливо', 'хмуро', 'ходко', 'хозяйски', 'холодно', 'хорошенько', 'хорошо', 'храбро', 'хрипло'],
      ['царственно', 'целиком', 'цепко', 'церемонно', 'цинично'],
      ['частенько', 'частично', 'часто', 'чересчур', 'черно', 'чертовски', 'честно', 'четко', 'четырежды', 'чинно', 'чисто', 'чрезмерно', 'чудесно', 'чудно', 'чудовищно'],
      ['шестью', 'шибко', 'шикарно', 'широко', 'шумно'],
    ],
    v: [
      ['адресовать', 'арендовать', 'арестовать', 'атаковать', 'ахать', 'ахнуть'],
      ['бабахнуть', 'багроветь', 'базарить', 'балдеть', 'баловать', 'баловаться', 'барабанить', 'барахлить', 'басить', 'бастовать', 'баюкать', 'бдеть', 'бегать', 'бежать', 'белеть'],
      ['важничать', 'валить', 'валиться', 'валять', 'валяться', 'варить', 'вариться', 'ваять', 'вбегать', 'вбежать', 'вбивать', 'вбирать', 'вбить', 'ввалиться', 'ввергнуть'],
      ['гавкать', 'гавкнуть', 'гадать', 'гадить', 'газануть', 'газировать', 'газовать', 'галдеть', 'гаркнуть', 'гарцевать', 'гасить', 'гаситься', 'гаснуть', 'гибнуть', 'гладить'],
      ['давать', 'даваться', 'давить', 'давиться', 'дарить', 'даровать', 'датировать', 'даться', 'двигать', 'двигаться', 'двинуть', 'двинуться', 'двоиться', 'девать', 'деваться'],
      ['едать', 'ежиться', 'ездить', 'езжать', 'екнуть', 'елозить', 'ерзать', 'ерничать'],
      ['жаждать', 'жалеть', 'жалить', 'жаловать', 'жаловаться', 'жарить', 'жариться', 'жаться', 'жахнуть', 'ждать', 'жевать', 'желать', 'желтеть', 'женить', 'жениться'],
      ['забавлять', 'забегать', 'забежать', 'забивать', 'забиваться', 'забирать', 'забираться', 'забить', 'забиться', 'заблестеть', 'заблеять', 'заболевать', 'заболеть', 'заболотить', 'заботить'],
      ['играть', 'играться', 'избавить', 'избавиться', 'избавлять', 'избаловать', 'избегать', 'избегнуть', 'избежать', 'избивать', 'избирать', 'избираться', 'избить', 'избрать', 'изваять'],
      ['казать', 'казаться', 'казнить', 'казниться', 'калечить', 'каменеть', 'кануть', 'канючить', 'капать', 'капнуть', 'карать', 'караться', 'караулить', 'каркать'],
      ['лавировать', 'ладить', 'ладиться', 'лазать', 'лазить', 'лакать', 'лакомиться', 'лапать', 'ласкать', 'ластиться', 'латать', 'лаять', 'лаяться', 'лгать', 'лежать'],
      ['мазать', 'мазнуть', 'макать', 'малевать', 'манить', 'марать', 'мариновать', 'мастерить', 'материть', 'материться', 'махать', 'махнуть', 'маять', 'маяться', 'маячить'],
      ['набегать', 'набегаться', 'набежать', 'набивать', 'набиваться', 'набирать', 'набираться', 'набить', 'набиться', 'наблюдать', 'наболтать', 'набрать', 'набраться', 'набрести', 'набросать'],
      ['обалдеть', 'обвалиться', 'обвести', 'обветрить', 'обветшать', 'обвешать', 'обвинить', 'обвинять', 'обвиняться', 'обвиснуть', 'обвить', 'обводить', 'обворовать', 'обвязать', 'обгадить'],
      ['падать', 'паковать', 'пасть', 'палить', 'пальнуть', 'памятовать', 'паниковать', 'парировать', 'парить', 'париться', 'пасовать', 'пасти', 'пастись', 'пахать', 'пахнуть'],
      ['работать', 'равнять', 'равняться', 'радировать', 'радовать', 'радоваться', 'разбавить', 'разбавлять', 'разбивать', 'разбирать', 'разбить', 'разбиться', 'разболтать', 'разбомбить', 'разбросать'],
      ['садануть', 'садить', 'садиться', 'саднить', 'сажать', 'салютовать', 'сбавить', 'сбавлять', 'сбегать', 'сбегаться', 'сбежать', 'сбежаться', 'сберечь', 'сбивать', 'сбиваться'],
      ['таить', 'таиться', 'талдычить', 'танцевать', 'таранить', 'тараторить', 'тарахтеть', 'таращить', 'таращиться', 'таскать', 'таскаться', 'тасовать', 'тачать', 'тащить', 'тащиться'],
      ['убавить', 'убавиться', 'убаюкивать', 'убегать', 'убедить', 'убедиться', 'убежать', 'убеждать', 'убеждаться', 'уберечь', 'уберечься', 'убивать', 'убиваться', 'убирать', 'убираться'],
      ['хаживать', 'халтурить', 'хамить', 'хапать', 'харкать', 'харкнуть', 'хаять', 'хвалить', 'хвалиться', 'хвастать', 'хвастаться', 'хватануть', 'хватать', 'хвататься', 'хватить'],
      ['цапнуть', 'царапать', 'царапаться', 'царапнуть', 'царить', 'цвести', 'цедить', 'целить', 'целиться', 'целовать', 'целоваться', 'ценить', 'цениться', 'цепенеть', 'цеплять'],
      ['чавкать', 'чадить', 'частить', 'чахнуть', 'чаять', 'чеканить', 'чернеть', 'чернить', 'черпать', 'чертить', 'чесать', 'чесаться', 'честь', 'чинить', 'чиниться'],
      ['шагать', 'шагнуть', 'шалить', 'шарахаться', 'шарахнуть', 'шарить', 'шаркать', 'шаркнуть', 'шастать', 'шатать', 'шататься', 'швырнуть', 'швырять', 'швыряться', 'шевелить'],
      ['эвакуировать', 'экзаменовать', 'экономить', 'электризовать', 'эмалировать', 'эмигрировать'],
    ],
    n: [
      ['абажур', 'абвер', 'аберрация', 'абзац', 'абитуриент', 'абонемент', 'абонент', 'абориген', 'аборт', 'абразив', 'абрек', 'абрикос', 'абсолют', 'абстракция', 'абсурд', 'абсцесс', 'абхазец', 'авангард', 'аванс', 'авансцена'],
      ['бабай', 'бабенка', 'бабка', 'бабник', 'бабочка', 'бабуин', 'бабуля', 'бабуся', 'бабушка', 'багаж', 'багажник', 'багор', 'багрец', 'бадан', 'бадья', 'базар', 'базис', 'байдарка', 'байка', 'байрам'],
      ['вавилон', 'вагон', 'вагонетка', 'вагончик', 'важность', 'вазелин', 'вазон', 'вазочка', 'вакансия', 'вакса', 'вакуум', 'вакханалия', 'вакцина', 'вакцинация', 'валежник', 'валек', 'валенок', 'валериана', 'валерьяна', 'валерьянка'],
      ['габарит', 'гавань', 'гадалка', 'гадание', 'гаденыш', 'гадина', 'гадливость', 'гадость', 'гадюка', 'гаечка', 'газель', 'газета', 'газетенка', 'газетка', 'газетчик', 'газик', 'газировка', 'газон', 'газопровод', 'газпром'],
      ['давило', 'давка', 'давление', 'давность', 'дальность', 'дальтоник', 'дамба', 'дамка', 'дамочка', 'данность', 'дантист', 'дармоед', 'дарование', 'датчанин', 'датчик', 'дачка', 'дачник', 'двадцатка', 'дверка'],
      ['евангелие', 'евангелист', 'евнух', 'евразия', 'еврей', 'еврейка', 'еврейство', 'европа', 'европеец', 'егерь', 'египтянин', 'единение', 'единица', 'единорог', 'единство', 'ежевика', 'елочка', 'ельник', 'емкость', 'епархия'],
      ['жабра', 'жаворонок', 'жадность', 'жажда', 'жакет', 'жакетка', 'жалоба', 'жалование', 'жалованье', 'жалость', 'жалюзи', 'жандарм', 'жаргон', 'жаровня', 'жасмин', 'жатва', 'жвачка', 'желание', 'желающий', 'желвак'],
      ['забава', 'забастовка', 'забвение', 'забег', 'забияка', 'забой', 'забор', 'заборчик', 'забота', 'забрало', 'забулдыга', 'забытье', 'завал', 'завалинка', 'заварка', 'заваруха', 'заварушка', 'заведение', 'заведующий', 'заверение'],
      ['ивняк', 'иврит', 'иголка', 'иголочка', 'играющий', 'игрище', 'игрок', 'игрушка', 'идеал', 'идеализм', 'идеалист', 'идейка', 'идеолог', 'идеология', 'идиллия', 'идиот', 'идиотизм', 'идиотка', 'иезуит', 'иерархия'],
      ['кабак', 'кабала', 'кабан', 'кабанчик', 'кабаре', 'кабачок', 'кабель', 'кабина', 'кабинет', 'кабинетик', 'кабинка', 'каблук', 'каблучок', 'кавалер', 'кавалерист', 'кавалерия', 'кавалькада', 'кавардак', 'каверза', 'каверна'],
      ['лабаз', 'лабиринт', 'лаборант', 'лаборантка', 'лавина', 'лавка', 'лавочка', 'лавочник', 'лавра', 'лавчонка', 'лагерник', 'лагерь', 'лагуна', 'ладан', 'ладонь', 'ладоша', 'ладошка', 'ладушка', 'ладья', 'лазарет'],
      ['мавзолей', 'магазин', 'мост', 'магистр', 'магистраль', 'магистрат', 'магия', 'магнат', 'магнезия', 'магнетизм', 'магний', 'магнит', 'магнитофон', 'магнолия', 'мадам', 'мадонна', 'мажор', 'мазанка', 'мазок', 'мир'],
      ['набат', 'набег', 'набережная', 'наблюдение', 'набоб', 'набор', 'наборщик', 'набросок', 'наваждение', 'навал', 'навар', 'наведение', 'навершие', 'навес', 'навет', 'навигация', 'навис', 'наводка', 'наводнение', 'наводчик'],
      ['оазис', 'обаяние', 'обвал', 'обвинение', 'обвинитель', 'обвиняемый', 'обвод', 'обгон', 'обедня', 'обезьяна', 'обезьянка', 'обелиск', 'обертка', 'обещание', 'обжигала', 'обжора', 'обжорство', 'обзор', 'обивка', 'обида'],
      ['павиан', 'павильон', 'павлин', 'паводок', 'пагода', 'падаль', 'падение', 'падчерица', 'пазуха', 'пайка', 'пайщик', 'пакгауз', 'пакет', 'пакетик', 'пакля', 'пакостник', 'пакость', 'паладин', 'паланкин'],
      ['работа', 'работенка', 'работка', 'работник', 'работница', 'работничек', 'работяга', 'рабство', 'рабфак', 'рабыня', 'раввин', 'равенство', 'равнина', 'равновесие', 'равнодушие', 'радар', 'раджа', 'радиант', 'радиатор', 'радиация'],
      ['сабля', 'саботаж', 'саван', 'саванна', 'саврас', 'сагиб', 'саддукей', 'садизм', 'садик', 'садист', 'садовник', 'садовод', 'садок', 'саженец', 'саженка', 'сажень', 'сазан', 'сайгак', 'саквояж', 'саксаул'],
      ['табак', 'табакерка', 'табачник', 'табачок', 'табель', 'таблетка', 'таблеточка', 'таблица', 'табличка', 'табло', 'табор', 'табун', 'табунщик', 'табурет', 'табуретка', 'таверна', 'таганок', 'таджик', 'тазик', 'таинство'],
      ['убеждение', 'убежище', 'убийство', 'убийца', 'убитый', 'ублюдок', 'убогость', 'уборка', 'уборная', 'уборщик', 'уборщица', 'убранство', 'убыль', 'убыток', 'уважение', 'увалень', 'увеличение', 'уверение', 'увертюра'],
      ['фабрика', 'фабрикант', 'фабула', 'фаворит', 'фаворитка', 'фазан', 'факел', 'факир', 'фактор', 'фактура', 'факультет', 'фаланга', 'фальцет', 'фальшивка', 'фальшь', 'фамилия', 'фанат', 'фанатизм', 'фанатик', 'фанера'],
      ['хабар', 'хакер', 'халат', 'халатик', 'халатность', 'халва', 'халдей', 'халтура', 'халтурщик', 'халява', 'хамство', 'хандра', 'ханжа', 'ханжество', 'хапуга', 'харакири', 'характер', 'хариус', 'харчевня', 'харчо'],
      ['цапля', 'царапина', 'царевич', 'царевна', 'царизм', 'царица', 'царствие', 'царство', 'цветение', 'цветник', 'цветок', 'цветочек', 'целина', 'целитель', 'целковый', 'целлофан', 'целомудрие', 'целость', 'цельность', 'цемент'],
      ['чабан', 'чавканье', 'чаевые', 'чаепитие', 'чаинка', 'чайка', 'чайник', 'чайхана', 'чакра', 'чалка', 'чалма', 'чарка', 'чародей', 'чародейка', 'часик', 'часовенка', 'часовня', 'часовщик', 'часок', 'частица'],
      ['шабаш', 'шаблон', 'шавка', 'шажок', 'шайба', 'шайка', 'шайтан', 'шакал', 'шалава', 'шаланда', 'шалаш', 'шалашик', 'шалман', 'шалопай', 'шалость', 'шалун', 'шаман', 'шаманка', 'шампунь', 'шампур'],
      ['щавель', 'щебенка', 'щебень', 'щебет', 'щегол', 'щеголь', 'щегольство', 'щедрость', 'щеколда', 'щекотка', 'щелканье', 'щелкун', 'щелок', 'щелочка', 'щелочь', 'щелчок', 'щенок', 'щепка', 'щепотка', 'щепоть'],
      ['эвакуация', 'эвенк', 'эвкалипт', 'эволюция', 'эвфемизм', 'эгида', 'эгоизм', 'эгоист', 'эдельвейс', 'эйфория', 'экватор', 'эквивалент', 'экзамен', 'экзарх', 'экзекуция', 'экзема', 'экземпляр', 'экзерсис', 'экзотика', 'экипаж'],
      ['юбилей', 'юбиляр', 'юбочка', 'ювелир', 'югослав', 'южанин', 'юморист', 'юнеско', 'юнкер', 'юность'],
      ['ябеда', 'яблоко', 'яблонька', 'яблоня', 'яблочко', 'яблочник', 'явление', 'ягель', 'ягненок', 'ягода', 'ягодица', 'ягодка', 'язычник', 'язычок', 'ящик', 'янтарь', 'яичница', 'якорь', 'ямочка', 'ямщик'],
    ],
    other:
      ['такой', 'хоть', 'если не', 'тем самым', 'вместо', 'много', 'время', 'немного', 'внутри', 'также', 'так', 'среди', 'несколько', 'никто', 'один', 'еще', 'вперед', 'будь то', 'однако', 'позади', 'своя', 'над', 'потому что', 'многие', 'всего', 'едва', 'против', 'под', 'весь', 'вопреки', 'через', 'всего лишь', 'хотя', 'ради'],
  },
  en: [
    ['abnormal', 'abrupt', 'absent', 'abstract', 'absurd', 'abundant', 'academic', 'accountable', 'accurate', 'active', 'actual', 'acute', 'addictive', 'adequate', 'adjacent', 'administrative'],
    ['bad', 'bald', 'bankrupt', 'bare', 'basic', 'beautiful', 'beloved', 'beneficial', 'best', 'bilingual', 'biodegradable', 'biological', 'bitter', 'bizarre', 'black', 'blank'],
    ['cancerous', 'capable', 'capitalist', 'cardboard', 'casual', 'cautious', 'cellular', 'centigrade', 'certain', 'chaotic', 'charitable', 'cheerful', 'chief', 'chronic', 'civic', 'civilian'],
    ['deaf', 'deceased', 'decent', 'deceptive', 'decisive', 'definite', 'definitive', 'deliberate', 'delicate', 'delicious', 'dense', 'desperate', 'devastating', 'devoid', 'different', 'digital'],
    ['eager', 'earnest', 'earthen', 'easy', 'effective', 'efficient', 'elaborate', 'elastic', 'electric', 'electromagnetic', 'electronic', 'elegant', 'elementary', 'eligible', 'elusive', 'empirical'],
    ['fabulous', 'factual', 'faint', 'fair', 'fake', 'familiar', 'famous', 'fancy', 'fantastic', 'fashionable', 'fatal', 'federal', 'feeble', 'female', 'feminine', 'fertile'],
    ['generous', 'genetic', 'gentle', 'genuine', 'giant', 'glad', 'glamorous', 'global', 'gorgeous', 'gracious', 'gradual', 'grand', 'grateful', 'great', 'green', 'grim'],
    ['habitual', 'handy', 'hardy', 'harsh', 'hearty', 'hesitant', 'high', 'homogeneous', 'horizontal', 'horrible', 'horrified', 'horrifying', 'hospitable', 'hostile', 'huge', 'humane'],
    ['ideal', 'identical', 'ideological', 'idle', 'ignorant', 'immediate', 'immense', 'immune', 'impatient', 'impending', 'imperial', 'impersonal', 'impolite', 'inadvertent', 'inclusive', 'incorrect'],
    ['jagged', 'jealous', 'joint', 'junior', 'jealous', 'junior', 'joint', 'jagged', 'justly', 'jog', 'justify', 'jail', 'journey', 'judge'],
    ['keen', 'key', 'known', 'kill', 'kidnap', 'kneel', 'keep', 'kilometer', 'kid', 'kit', 'knight', 'kerosene', 'knowledge', 'keyboard'],
    ['lame', 'large', 'latter', 'leading', 'legal', 'legitimate', 'liable', 'linguistic', 'literary', 'lively', 'local', 'lone', 'loose', 'loud', 'low', 'loyal'],
    ['mad', 'magic', 'magical', 'magnificent', 'mainstream', 'majestic', 'major', 'male', 'managerial', 'mandatory', 'many', 'marine', 'martial', 'masculine', 'massive', 'mature'],
    ['narrow', 'nasty', 'native', 'natural', 'naughty', 'naval', 'necessary', 'needy', 'negative', 'negligible', 'nervous', 'neutral', 'noble', 'normal', 'notorious', 'nuclear'],
    ['obsolete', 'obvious', 'odd', 'old', 'ongoing', 'opposite', 'ordinary', 'organic', 'oriented', 'original', 'outmoded', 'outraged', 'outright', 'outspoken', 'outstretched', 'overall'],
    ['pale', 'parallel', 'particular', 'passive', 'pathological', 'perfect', 'permanent', 'persistent', 'pessimistic', 'phenomenal', 'physical', 'pink', 'plain', 'pleasant', 'poignant', 'polar'],
    ['quiet', 'quite', 'qualify', 'quit', 'quote', 'quality', 'quarter', 'quantity', 'quarrel', 'quantum'],
    ['racial', 'radical', 'radioactive', 'random', 'rapid', 'raw', 'real', 'realistic', 'rear', 'recent', 'reckless', 'red', 'regular', 'relevant', 'religious', 'reluctant'],
    ['sacred', 'sandy', 'satisfactory', 'satisfied', 'saturated', 'savage', 'scarce', 'secluded', 'senior', 'sensible', 'sensitive', 'sensory', 'separate', 'several', 'severe', 'shallow'],
    ['talkative', 'technical', 'temperate', 'temporary', 'tender', 'tense', 'terrible', 'terrific', 'terrified', 'theoretical', 'thick', 'thin', 'thorough', 'tidy', 'tight', 'timid'],
    ['ugly', 'ultimate', 'underground', 'underlying', 'unfortunate', 'unique', 'upcoming', 'upper', 'upright', 'urban', 'urgent', 'usual'],
    ['vague', 'vain', 'valid', 'various', 'vast', 'vegetarian', 'vehement', 'viable', 'vicious', 'vigorous', 'violent', 'viral', 'virgin', 'virtual', 'visual', 'vital'],
    ['wavy', 'weak', 'weary', 'weird', 'wet', 'whatsoever', 'wicked', 'wide', 'widespread', 'wild', 'winding', 'wooded', 'wooden', 'worse', 'worthwhile'],
  ],
};

export default choice;