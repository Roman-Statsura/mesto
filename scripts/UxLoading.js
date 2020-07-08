class UxLoading {
    constructor(isLoading, container, animation){
        this.isLoading = isLoading;
        this.container = container;
        this.animation = animation;
    }
    renderLoading = () => {
        if (this.isLoading === true){
            this.container.classList.add('places-list_novisible');
            this.animation.classList.add('spinner_visible');
        }
        else {
            this.container.classList.remove('places-list_novisible');
            this.animation.classList.remove('spinner_visible');
        }
    }
}