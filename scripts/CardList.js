class CardList {
    constructor(container,popupZoom,createNewCard,api,userId,improveUx,animation){
        this.container = container;
        this.popupZoom = popupZoom;
        this.createNewCard = createNewCard;
        this.api = api;
        this.userId = userId;
        this.improveUx = improveUx;
        this.animation = animation;
    }
    addCard(event){
        this.container.appendChild(event);
        }
    render() {
        /**
         * Можно лучше:
         * Вызов renderLoading() лучше будет переместить в uxLoading().
         * Желательно, чтобы класс CardList знал поменьше о данной функции, например, он не должен знать,
         * что функция возвращает экземпляр класса, который имеет метод .renderLoading()
         */
      this.improveUx(true, this.container, this.animation)
      this.api.getCards()
        .then(res => {
          res.forEach((item) => {
              /**
               * Можно лучше:
               * Вызов createCard() лучше переместить в createNewCard()
               */
              this.container.appendChild(this.createNewCard(item.name, item.link, item.likes, item._id, item.owner._id, this.popupZoom, this.api, this.userId.dataset.about));
          })
        })
        .catch(err => console.log(err))
        .finally( ()=> this.improveUx(false, this.container, this.animation))
    }
}
